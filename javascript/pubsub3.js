import { dynamicMatch, wait } from "./utils.js";

class cacheClass {
  constructor() {
    this.data = new Map();
  }

  evict(key) {
    // console.log("\t>evicting key ", key, " ...");
    if (!this.data.has(key)) return;
    this.data.delete(key);
  }

  set(key, value) {
    // console.log("setting key", key, " as: ", value, " ...");
    this.data.set(key, value);
  }

  get(key) {
    return this.data.get(key);
  }
}

export class RoutePubsubCache {
  constructor(opts) {
    this.subscribers = new Map();
    this.groupSubscribers = new Map();
    this.groupingCharacter = ":";
    this.globCharacter = "*";
    this.groupDelimiter = opts?.delimiter || "/";

    this.cache = new cacheClass();
    this.context = new Map();
    this.groupContext = new Map();
  }

  isGenericRoute(url) {
    return (
      url.indexOf(this.groupDelimiter + this.groupingCharacter) !== -1 ||
      url.indexOf(this.groupDelimiter + this.globCharacter) !== -1
    );
  }

  subscribe(event, callback) {
    if (!this.context.has(callback))
      this.context.set(callback, new Set([event]));

    if (!this.subscribers.has(event)) {
      this.subscribers.set(event, new Set());
    }
    this.subscribers.get(event).add(callback);
  }

  subscribeGroup(eventGroup, callback) {
    if (!this.groupContext.has(callback))
      this.groupContext.set(callback, new Set());
    this.groupContext.get(callback).add(eventGroup);

    if (
      eventGroup.indexOf(this.groupingCharacter) !== -1 &&
      eventGroup.indexOf(this.globCharacter) !== -1
    )
      throw new Error(
        "you cannot mix grouping characters with glob characters when using event groups!"
      );
    if (!this.groupSubscribers.has(eventGroup)) {
      this.groupSubscribers.set(eventGroup, new Set());
    }
    this.groupSubscribers.get(eventGroup).add(callback);
  }

  handleLonePublisher(event) {
    // nobody subscribed to me explicitly but i am broadcasted nonetheless and i might match a group
    if (!this.isGenericRoute(event)) {
      // i am just a literal route
      let matchingParentEvents = [...this.groupSubscribers.keys()].filter(
        (e) => {
          const isMatch = dynamicMatch(event, e, this.groupDelimiter);
          return isMatch;
        }
      );
      const eventParentTreeMemo = new Set();
      for (const parentEvent of matchingParentEvents) {
        const matchingChildrenEvents2 = [...this.subscribers.entries()].filter(
          ([r, _2]) => {
            return dynamicMatch(r, parentEvent, this.groupDelimiter);
          }
        );

        if (matchingChildrenEvents2.length === 0) {
          [...this.groupSubscribers.get(parentEvent)].forEach((subscriber) => {
            subscriber({
              cache: this.cache,
              routeKeys: [parentEvent, event],
            });
          });
        }

        for (const [route, subscriberList] of matchingChildrenEvents2) {
          if (!eventParentTreeMemo.has(route)) {
            subscriberList.forEach((subscriber) => {
              subscriber({
                cache: this.cache,
                routeKeys: eventParentTreeMemo.has(event)
                  ? [route]
                  : [route, event],
              });
            });
          }
          eventParentTreeMemo.add(event);
          eventParentTreeMemo.add(route);
        }
      }

    } else {
      // i am a pattern
    }
    return;
  }

  callback(subscriber, event) {
    const ownerSet = this.groupContext.get(subscriber);
    let owner = undefined;
    if (ownerSet && ownerSet.size) [owner] = [...ownerSet];

    if (!this.subscribers.has(event) && !this.groupSubscribers.has(event)) {
      this.handleLonePublisher(event);
      return;
    }

    if (!owner) {
      subscriber({
        cache: this.cache,
        routeKeys: [...(this.context.get(subscriber) || [])],
      });
      return;
    }
    let matchingChildrenEvents = [...this.subscribers.keys()].filter((e) => {
      const isMatch = dynamicMatch(e, owner, this.groupDelimiter);
      return isMatch && e === event;
    });

    subscriber({
      cache: this.cache,
      routeKeys: [
        ...this.groupContext.get(subscriber),
        ...matchingChildrenEvents,
      ],
    });
  }

  publish(event) {
    const netSubscribers = [];
    const netSubscribersMap = new Map();

    if (this.subscribers.has(event)) {
      [...this.subscribers.get(event)].forEach((subscriber) => {
        netSubscribers.push(subscriber);
      });
    }
    [...this.groupSubscribers.entries()].forEach(
      ([key, matchingSubscribers]) => {
        if (
          dynamicMatch(event, key, this.groupDelimiter) &&
          key !== this.globCharacter
        ) {
          [...matchingSubscribers].forEach((item) => {
            if (!netSubscribersMap.has(item)) {
              netSubscribers.push(item);
              netSubscribersMap.set(item, 1);
            }
          });
        }
      }
    );

    const globsubs = this.groupSubscribers.get(this.globCharacter);

    if (!!globsubs) {
      [...globsubs].forEach((subscriber) => {
        if (!netSubscribersMap.has(subscriber)) {
          netSubscribers.push(subscriber);
          netSubscribersMap.set(subscriber, 1);
        }
      });
    }

    if (
      netSubscribers.length === 0 ||
      (netSubscribers.length === 1 && !!globsubs)
    ) {
      console.warn(`event: ${event} has no subscribers attached to it`);
      return;
    }

    netSubscribers.forEach((subscriber) => {
      this.callback(subscriber, event);
    });
  }

  broadcast(url) {
    this.publish(url);
  }

  writeCache(url, data) {
    this.cache.set(url, data);
  }

  async read(url) {
    let data;
    if (this.cache.get(url)) {
      return "cached data";
    }
    await wait(0.3);
    data = "fresh data";
    this.writeCache(url, data);
    return data;
  }
}

const Routeschannel = new RoutePubsubCache({ delimiter: "/" });

export class GlobalRouteCache {
  static delimiter = "/";
  static channel = new RoutePubsubCache({ delimiter: this.delimiter });

  static isGenericRoute(url) {
    return (
      url.indexOf(this.delimiter + ":") !== -1 ||
      url.indexOf(this.delimiter + "*") !== -1
    );
  }

  static post(url) {
    //route implementation

    //middleware implementation
    this.channel.broadcast(url);
  }

  static put(url) {
    //route implementation

    //middleware implementation
    this.channel.broadcast(url);
  }

  static delete(url) {
    //route implementation

    //middleware implementation
    this.channel.broadcast(url);
  }

  static async get(url) {
    //middleware implementation
    if (this.isGenericRoute(url)) {
      this.getAll(url);
      return;
    }

    this.channel.subscribe(url, ({ cache, routeKeys }) => {
      for (const key of routeKeys) {
        cache.evict(key);
      }
    });

    //route implementation
    return await this.channel.read(url);
  }

  static getAll(url) {
    //middleware implementation
    this.channel.subscribeGroup(url, ({ cache, routeKeys }) => {
      for (const key of routeKeys) {
        if (!this.isGenericRoute(key)) {
          cache.evict(key);
        }
      }
    });
  }
}

// await GlobalRouteCache.get("/users/:user_id");
// await GlobalRouteCache.get("/users/*/200");

// await GlobalRouteCache.get("/users/123");
// await GlobalRouteCache.get("/users/123/*");
// await GlobalRouteCache.get("/users/123/news/:news_id");
// await GlobalRouteCache.get("/users/123/news/200");

// await GlobalRouteCache.get("/users/123/news");
// await GlobalRouteCache.get("/users/123/news");
// await GlobalRouteCache.get("/users/123/news/*");

// GlobalRouteCache.post("/users/4/news/5");
// GlobalRouteCache.post("/users/123");
// // GlobalRouteCache.post("/creators/123");
// console.log("------------------------------");
// GlobalRouteCache.post("/users/123/news"); //:BUGFIX: later, on here

// console.log("++++++++++++++++++++++++++++++");
// console.log(GlobalRouteCache.channel.cache);

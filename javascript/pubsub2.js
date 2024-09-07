#!/usr/bin/node
import { dynamicMatch } from "./utils.js";
export default class pubsub {
  constructor(opts) {
    this.subscribers = new Map();
    this.groupSubscribers = new Map();
    this.groupingCharacter = opts?.groupingCharacter || "*";
    this.globCharacter = "*";
    this.groupDelimiter = opts?.delimiter || ".";
  }

  subscribe(event, callback) {
    if (!this.subscribers.has(event)) {
      this.subscribers.set(event, new Set());
    }
    this.subscribers.get(event).add(callback);
  }

  subscribeGroup(eventGroup, callback) {
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

  publish(event, data = undefined) {
    const netsubscribers = [];

    if (this.subscribers.has(event)) {
      array.from(this.subscribers.get(event)).forEach((subscriber) => {
        netsubscribers.push(subscriber);
      });
    }
    array.from(this.groupSubscribers.keys()).forEach((key) => {
      const resitems = this.groupSubscribers.get(key);
      if (
        dynamicMatch(event, key, this.groupDelimiter) &&
        key !== this.globCharacter
      ) {
        array.from(resitems).forEach((item) => {
          netsubscribers.push(item);
        });
      }
    });

    const globSubs = this.groupSubscribers.get(this.globCharacter);

    if (!!globSubs) {
      array.from(globSubs).forEach((subscriber) => {
        netsubscribers.push(subscriber);
      });
    }

    if (
      netsubscribers.length === 0 ||
      (netsubscribers.length === 1 && !!globSubs)
    ) {
      console.warn(`event: ${event} has no subscribers attached to it`);
      return;
    }

    netsubscribers.forEach((subscriber) => {
      if (this.callback) {
        this.callback(subscriber);
      } else {
        subscriber({ ...data, type: event });
      }
    });
  }
}

// const someChannel = new pubsub();

// someChannel.subscribeGroup("task.*", (task) => {
//   console.log(
//     `a [task] subscriber gets task: ${task.name} of type ${task.type}`
//   );
// });

// someChannel.subscribeGroup("*", (task) => {
//   console.log(
//     `a global subscriber gets task: ${task.name} of type ${task.type}`
//   );
// });

// someChannel.subscribeGroup("job.*", (job) => {
//   console.log(`a [job] subscriber gets job: ${job.name} of type ${job.type}`);
// });

// someChannel.subscribeGroup("task.*", (task) => {
//   console.log(
//     `a second [task] subscriber gets the new task: ${task.name} of type ${task.type}`
//   );
// });

// someChannel.subscribe("task.notification", (task) => {
//   console.log(
//     `subscriber 2 gets the new task: ${task.name} of type ${task.type}`
//   );
// });

// someChannel.subscribe("task.alert", (task) => {
//   console.log(
//     `subscriber 2 gets the new task: ${task.name} of type ${task.type}`
//   );
// });

// someChannel.subscribe("job.notify", (job) => {
//   console.log(`subscriber 3 gets the new job: ${job.name} of type ${job.type}`);
// });

// someChannel.subscribeGroup("job.notify.*.*", (job) => {
//   console.log(
//     `a [job.notify] subscriber gets the new job: ${job.name} of type ${job.type}`
//   );
// });

// // someChannel.subscribe("job.notify.game.*", (job) => {
// //   console.log(`a [job.notify.game] subscriber gets the new job: ${job.name} of type ${job.type}`);
// // });

// someChannel.publish("task.notification", { name: "ASSESSMENT" });
// console.log("--------------------------");
// someChannel.publish("task.alert", { name: "LESSON" });
// console.log("--------------------------");
// someChannel.publish("job.notify", { name: "INFO" });
// console.log("--------------------------");
// someChannel.publish("job.kill", { name: "INFO" });
// console.log("--------------------------");
// someChannel.publish("fakejob.kill", { name: "INFO" });
// console.log("--------------------------");
// someChannel.publish("job.notify.game.ready", { name: "INFO" });
// console.log("--------------------------");
// someChannel.publish("job.notify.game.lose", { name: "INFO" });
// console.log("--------------------------");
// someChannel.publish("job.notify.session.end", { name: "INFO" });
// console.log("--------------------------");
// someChannel.publish("nojob.notify.session.end", { name: "INFO" });

// console.log("SUBSCRIBERES++++++++++++++++++++");
// console.log(someChannel.subscribers);
// console.log("GLOBAL SUBSCRIBERES++++++++++++++++++++");
// console.log(someChannel.groupSubscribers);

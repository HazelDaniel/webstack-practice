import { RoutePubsubCache, GlobalRouteCache } from "../pubsub3.js";

describe("RoutePubsubCache", () => {
  let cache;

  beforeEach(() => {
    cache = new RoutePubsubCache();
  });

  test("subscribe and publish", () => {
    const mockCallback = jest.fn();
    cache.subscribeGroup("/*", mockCallback);
    cache.subscribeGroup("/users/:user_id", mockCallback);
    cache.subscribe("/users/123", mockCallback);
    cache.publish("/users/123");
    cache.publish("/users/123/news");
    expect(mockCallback).toHaveBeenCalledTimes(3);
  });

  test("subscribeGroup and publish", () => {
    const mockCallback = jest.fn();
    cache.subscribeGroup("/users/:id", mockCallback);
    cache.publish("/users/123");
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  test("write and read", async () => {
    const data = await cache.read("/users/123");
    expect(data).toEqual("fresh data");
    expect(data).toBe(cache.cache.data.get("/users/123"));
  });

  test("eviction on publish", () => {
    const mockCallback = jest.fn(({ cache, routeKeys }) => {
      routeKeys.forEach((key) => cache.evict(key));
    });
    cache.subscribe("/users/123", mockCallback);
    cache.writeCache("/users/123", "user data");
    cache.publish("/users/123");
    expect(cache.cache.get("/users/123")).toBeUndefined();
  });
});

describe("GlobalRouteCache", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("get and post", async () => {
    const spy = jest.spyOn(GlobalRouteCache.channel, "broadcast");
    await GlobalRouteCache.get("/users/123");
    GlobalRouteCache.post("/users/123");
    expect(spy).toHaveBeenCalledWith("/users/123");
  });

  test("getAll with generic route", async () => {
    const spy = jest.spyOn(GlobalRouteCache.channel, "subscribeGroup");
    await GlobalRouteCache.get("/users/:id");
    expect(spy).toHaveBeenCalledWith("/users/:id", expect.any(Function));
  });

  test("cache flow test", async () => {
    //cache miss
    const data1 = await GlobalRouteCache.get("/users/123");
    expect(data1).toBe("fresh data");

    //cache hit
    const data1b = await GlobalRouteCache.get("/users/123");
    expect(data1b).toBe("cached data");

    //cache eviction
    GlobalRouteCache.post("/users/123");

    //cache miss
    const data2 = await GlobalRouteCache.channel.read("/users/123");
    expect(data2).toBe("fresh data"); // Should fetch fresh data after eviction
  });
});

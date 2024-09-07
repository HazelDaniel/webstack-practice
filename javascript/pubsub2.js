#!/usr/bin/node
import { dynamicMatch } from "./utils.js";
class pubsub {
  constructor() {
    this.subscribers = new Map();
    this.groupSubscribers = new Map();
    this.groupingCharacter = "*";
    this.globCharacter = "*";
    this.groupDelimiter = ".";
  }

  subscribe(event, callback) {
    if (!this.subscribers.has(event)) {
      this.subscribers.set(event, new Set());
    }
    this.subscribers.get(event).add(callback);
  }

  subscribeGroup(eventGroup, callback) {
    if (eventGroup.indexOf(this.groupingCharacter) === -1)
      throw new Error(
        "you need to include a grouping character for this class when using event groups!"
      );
    if (!this.groupSubscribers.has(eventGroup)) {
      this.groupSubscribers.set(eventGroup, new Set());
    }
    this.groupSubscribers.get(eventGroup).add(callback);
  }

  publish(event, data) {
    const netSubscribers = [];

    if (this.subscribers.has(event)) {
      Array.from(this.subscribers.get(event)).forEach((subscriber) => {
        netSubscribers.push(subscriber);
      });
    }
    Array.from(this.groupSubscribers.keys()).forEach((key) => {
      const resItems = this.groupSubscribers.get(key);
      if (dynamicMatch(event, key, ".") && key !== this.globCharacter) {
        Array.from(resItems).forEach((item) => {
          netSubscribers.push(item);
        });
      }
    });

    const globSubs = this.groupSubscribers.get(this.globCharacter);

    if (!!globSubs) {
      Array.from(globSubs).forEach((subscriber) => {
        netSubscribers.push(subscriber);
      });
    }

    if (
      netSubscribers.length === 0 ||
      (netSubscribers.length === 1 && !!globSubs)
    ) {
      console.warn(`EVENT: ${event} has no subscribers attached to it`);
      return;
    }

    netSubscribers.forEach((subscriber) => {
      subscriber({ ...data, type: event });
    });
  }
}

const someChannel = new pubsub();

someChannel.subscribeGroup("task.*", (task) => {
  console.log(
    `a [task] subscriber gets task: ${task.name} of type ${task.type}`
  );
});

someChannel.subscribeGroup("*", (task) => {
  console.log(
    `a global subscriber gets task: ${task.name} of type ${task.type}`
  );
});

someChannel.subscribeGroup("job.*", (job) => {
  console.log(`a [job] subscriber gets job: ${job.name} of type ${job.type}`);
});

someChannel.subscribeGroup("task.*", (task) => {
  console.log(
    `a second [task] subscriber gets the new task: ${task.name} of type ${task.type}`
  );
});

someChannel.subscribe("task.notification", (task) => {
  console.log(
    `subscriber 2 gets the new task: ${task.name} of type ${task.type}`
  );
});

someChannel.subscribe("task.alert", (task) => {
  console.log(
    `subscriber 2 gets the new task: ${task.name} of type ${task.type}`
  );
});

someChannel.subscribe("job.notify", (job) => {
  console.log(`subscriber 3 gets the new job: ${job.name} of type ${job.type}`);
});

someChannel.subscribeGroup("job.notify.*.*", (job) => {
  console.log(
    `a [job.notify] subscriber gets the new job: ${job.name} of type ${job.type}`
  );
});

// someChannel.subscribe("job.notify.game.*", (job) => {
//   console.log(`a [job.notify.game] subscriber gets the new job: ${job.name} of type ${job.type}`);
// });

someChannel.publish("task.notification", { name: "ASSESSMENT" });
console.log("--------------------------");
someChannel.publish("task.alert", { name: "LESSON" });
console.log("--------------------------");
someChannel.publish("job.notify", { name: "INFO" });
console.log("--------------------------");
someChannel.publish("job.kill", { name: "INFO" });
console.log("--------------------------");
someChannel.publish("fakejob.kill", { name: "INFO" });
console.log("--------------------------");
someChannel.publish("job.notify.game.ready", { name: "INFO" });
console.log("--------------------------");
someChannel.publish("job.notify.game.lose", { name: "INFO" });
console.log("--------------------------");
someChannel.publish("job.notify.session.end", { name: "INFO" });
console.log("--------------------------");
someChannel.publish("nojob.notify.session.end", { name: "INFO" });

// console.log("SUBSCRIBERES++++++++++++++++++++");
// console.log(someChannel.subscribers);
// console.log("GLOBAL SUBSCRIBERES++++++++++++++++++++");
// console.log(someChannel.groupSubscribers);

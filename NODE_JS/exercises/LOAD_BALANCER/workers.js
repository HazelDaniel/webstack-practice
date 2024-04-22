"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
if (worker_threads_1.isMainThread) {
    console.log("main thread spawning with id :", process.pid);
    new worker_threads_1.Worker(__filename, {
        workerData: [1, 8, 0, 3],
    });
    new worker_threads_1.Worker(__filename, {
        workerData: [0, 9, 8, 3],
    });
}
else {
    console.log(`worker thread running. process id: ${process.pid}`);
    console.log(`sorting data: ${worker_threads_1.workerData} to ${worker_threads_1.workerData.sort()}`);
}

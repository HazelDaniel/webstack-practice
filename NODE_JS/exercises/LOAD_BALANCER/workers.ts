import { isMainThread, Worker, workerData } from "worker_threads";

if (isMainThread) {
  console.log("main thread spawning with id :", process.pid);
  new Worker(__filename, {
    workerData: [1, 8, 0, 3],
  });
  new Worker(__filename, {
    workerData: [0, 9, 8, 3],
  });
} else {
  console.log(`worker thread running. process id: ${process.pid}`);

  console.log(
    `sorting data: ${workerData} to ${(workerData as Array<number>).sort()}`
  );
}

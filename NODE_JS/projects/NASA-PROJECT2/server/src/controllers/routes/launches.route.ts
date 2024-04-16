import express from "express";
import type { Request } from "express";
import {
  getLaunchById,
  getLaunches,
  isLaunchDateValid,
  isLaunchFieldsComplete,
  populateSetLaunch,
} from "../../models/launches.model";
import type { Launch, ResponseErrorBody } from "../../../types";
export const LaunchesRouter = express.Router();

LaunchesRouter.get("/", (_, res) => {
  return res.status(200).json(getLaunches());
});

LaunchesRouter.post("/", (req: Request<Launch>, res) => {
  let inputLaunch: Launch = req.body;

  let resError: Partial<ResponseErrorBody> = {};
  resError.error = "missing some fields";
  if (!isLaunchFieldsComplete(inputLaunch))
    return res.status(400).json(resError);

  resError = {};
  resError.error = "incorrect date format!";
  if (isLaunchDateValid(inputLaunch)) return res.status(400).json(resError);
  inputLaunch = populateSetLaunch(inputLaunch);

  return res.status(201).json(inputLaunch);
});

LaunchesRouter.delete(
  "/:launchId",
  (req: Request<{ launchId: string }>, res) => {
    const launchId: number = +req.params.launchId;

    if (Number.isNaN(launchId)) {
      let resError: Partial<ResponseErrorBody> = {};
      resError.error = "invalid launch id!";
      return res.status(400).json(resError);
    }
    let resLaunch: Launch | undefined;

    if ((resLaunch = getLaunchById(launchId))) {
      let resError: Partial<ResponseErrorBody> = {};
      resError.error = "launch not found!";
      return res.status(404).json(resError);
    }

    if (resLaunch) {
      (resLaunch as Launch).upcoming = false;
      (resLaunch as Launch).success = false;
    }

    return res.status(200).json(resLaunch);
  }
);

import express from "express";
import { getPlanets } from "../../models/planets.model";

export const PlanetsRouter = express.Router();

PlanetsRouter.get("/", (_, res) => {
  return res.status(200).json(getPlanets());
});

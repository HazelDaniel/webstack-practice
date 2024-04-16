import type { Launch, ResponseErrorBody } from "../../types";

export const launches: Map<string | number, Launch> = new Map();

export const launch: Launch = {
  flightNumber: 100,
  launchDate: "December 20, 2024",
  mission: "Kepler exploration X",
  rocket: "Explorer IS1",
  destination: "Kepler-442 b",
  customers: ["hazel", "SpaceX"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

export const getLaunches: () => Launch[] = () => {
  return Array.from(launches.values());
};

export const populateSetLaunch: (inputLaunch: Launch) => Launch = (
  inputLaunch
) => {
  const fixedCustomers = ["Blue Origin", "SpaceX"];

  if (inputLaunch.customers) {
    inputLaunch.customers = [...inputLaunch.customers, ...fixedCustomers];
  } else {
    inputLaunch.customers = fixedCustomers;
  }
  inputLaunch.launchDate = new Date(inputLaunch.launchDate).toISOString();
  inputLaunch.upcoming =
    new Date(inputLaunch.launchDate).getTime() > Date.now();
  inputLaunch.success = true;

  inputLaunch.flightNumber = launches.size
    ? Array.from(launches.values())[launches.size - 1].flightNumber + 1
    : 100;

  launches.set(inputLaunch.flightNumber, inputLaunch);

  return inputLaunch;
};

export const getLaunchById: (launchId: number) => Launch | undefined = (
  launchId
) => {
  return launches.get(launchId);
};

// validators
export const isLaunchFieldsComplete: (inputLaunch: Launch) => boolean = (inputLaunch: Launch) => {
  if (
    !inputLaunch.destination ||
    !inputLaunch.launchDate ||
    !inputLaunch.mission ||
    !inputLaunch.rocket
  ) {
    return false;
  }

  return true;
};

export const isLaunchDateValid: (inputLaunch: Launch) => boolean = (inputLaunch: Launch) => {
  return !isNaN(new Date(inputLaunch.launchDate).valueOf());
};

export const isInputLaunchValid: (inputLaunch: Launch) => boolean = (inputLaunch: Launch) => {
  if (!isLaunchFieldsComplete(inputLaunch) || !isLaunchDateValid(inputLaunch))
    return false;

  return true;
};

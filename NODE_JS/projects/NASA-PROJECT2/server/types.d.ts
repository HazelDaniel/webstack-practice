export interface Planet {
  koi_disposition: string;
  koi_insol: number;
  koi_prad: number;
  kepler_name: string;
}

export interface LaunchRequestBody {
  mission: string;
  rocket: string;
  launchDate: Date | string | number;
  destination: string;
}
export interface Launch extends LaunchRequestBody {
  flightNumber: number;
  customers: string[];
  upcoming: boolean;
  success: boolean;
  launchDate: string;
}

export interface ResponseErrorBody {
  error: string;
}
export interface PlanetPartial extends Partial<PlanetType>{
}

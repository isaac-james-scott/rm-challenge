import { z } from "zod";
import { type color } from "../utils/radix";

export const FUEL_TECH_TYPES = {
  battery_charging: "Battery Charging",
  battery_discharging: "Battery",
  solar_utility: "Solar",
  wind: "Wind",
  gas_steam: "Gas Steam",
  gas_ccgt: "Gas CCGT",
  gas_ocgt: "Gas OCGT",
  gas_recip: "Gas Reciprocating",
  gas_wcmg: "Gas WCMG",
  coal_black: "Black Coal",
  coal_brown: "Brown Coal",
  hydro: "Hydro",
  pumps: "Pumped Hydro",
  bioenergy_biogas: "Biogas",
  bioenergy_biomass: "Biomass",
  distillate: "Distillate",
  imports: "Imports",
  exports: "Exports",
} as const;

export const STATUS_TYPES = {
  operating: "Operating",
  committed: "Committed",
  retired: "Retired",
} as const;

export const RENEWABLE_TECHNOLOGIES = [
  "solar_utility",
  "wind",
  "hydro",
  "pumps",
  "battery_charging",
  "battery_discharging",
  "bioenergy_biogas",
  "bioenergy_biomass",
];

export const NON_RENEWABLE_TECHNOLOGIES = [
  "coal_black",
  "coal_brown",
  "gas_steam",
  "gas_ccgt",
  "gas_ocgt",
  "gas_recip",
  "gas_wcmg",
  "distillate",
];

export type FuelTechType = keyof typeof FUEL_TECH_TYPES;
export type StatusType = keyof typeof STATUS_TYPES;
export type RenewableType = "renewable" | "non-renewable";

export const getFuelTechDisplayName = (fuelTechId: string): string => {
  return FUEL_TECH_TYPES[fuelTechId as FuelTechType] || fuelTechId;
};

export const getStatusDisplayName = (statusId: string): string => {
  return STATUS_TYPES[statusId as StatusType] || statusId;
};

export const isRenewable = (fuelTechId: string): boolean => {
  return RENEWABLE_TECHNOLOGIES.includes(fuelTechId);
};

export const isNonRenewable = (fuelTechId: string): boolean => {
  return NON_RENEWABLE_TECHNOLOGIES.includes(fuelTechId);
};

export const getRenewableCategory = (
  fuelTechId: string
): RenewableType | null => {
  if (isRenewable(fuelTechId)) return "renewable";
  if (isNonRenewable(fuelTechId)) return "non-renewable";
  return null;
};

export const getFuelTechColor = (fuelTechId: string): color => {
  const colorMap: Record<string, color> = {
    solar_utility: "yellow",
    wind: "teal",
    hydro: "blue",
    pumps: "blue",
    battery_charging: "green",
    battery_discharging: "green",
    gas_steam: "orange",
    gas_ccgt: "orange",
    gas_ocgt: "orange",
    gas_recip: "orange",
    gas_wcmg: "orange",
    coal_black: "gray",
    coal_brown: "brown",
    bioenergy_biogas: "green",
    bioenergy_biomass: "green",
    distillate: "red",
  };

  return colorMap[fuelTechId] || "gray";
};

export const getStatusColor = (statusId: string): color => {
  const colorMap: Record<string, color> = {
    operating: "green",
    committed: "blue",
    retired: "red",
  };

  return colorMap[statusId] || "gray";
};

// Zod schemas for validation - making most fields optional to handle API inconsistencies
// I generated the schemas using Claude
export const unitSchema = z.object({
  code: z.string(),
  fueltech_id: z.string().optional(),
  status_id: z.string().optional(),
  capacity_registered: z.number().optional(),
  emissions_factor_co2: z.number().optional(),
  data_first_seen: z.string().optional(),
  data_last_seen: z.string().optional(),
  dispatch_type: z.string().optional(),
});

export const facilitySchema = z.object({
  code: z.string(),
  name: z.string().optional(),
  network_id: z.string().optional(),
  network_region: z.string().optional(),
  description: z.string().optional(),
  units: z.array(unitSchema).optional(),
});

export const openElectricityApiResponseSchema = z.object({
  version: z.string().optional(),
  created_at: z.string().optional(),
  success: z.boolean().optional(),
  data: z.array(facilitySchema),
  total_records: z.number().optional(),
});

export const facilitiesResponseSchema = z.object({
  message: z.string(),
  data: openElectricityApiResponseSchema,
});

export type Unit = z.infer<typeof unitSchema>;
export type Facility = z.infer<typeof facilitySchema>;
export type OpenElectricityApiResponse = z.infer<
  typeof openElectricityApiResponseSchema
>;
export type FacilitiesResponse = z.infer<typeof facilitiesResponseSchema>;

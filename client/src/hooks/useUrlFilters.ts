import { useEffect, useState } from "react";

interface FilterState {
  selectedFuelTypes: string[];
  selectedRegions: string[];
  selectedStatuses: string[];
  selectedRenewableTypes: string[];
}

interface UseUrlFiltersReturn extends FilterState {
  handleFuelTypeChange: (values: string[]) => void;
  handleRegionChange: (values: string[]) => void;
  handleStatusChange: (values: string[]) => void;
  handleRenewableTypeChange: (values: string[]) => void;
  handleClearFilters: () => void;
}

const useUrlFilters = (): UseUrlFiltersReturn => {
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedRenewableTypes, setSelectedRenewableTypes] = useState<
    string[]
  >([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    const fuelTypes = urlParams.get("fuelTypes");
    const regions = urlParams.get("regions");
    const statuses = urlParams.get("statuses");
    const renewableTypes = urlParams.get("renewableTypes");

    if (fuelTypes) {
      setSelectedFuelTypes(fuelTypes.split(",").filter(Boolean));
    }
    if (regions) {
      setSelectedRegions(regions.split(",").filter(Boolean));
    }
    if (statuses) {
      setSelectedStatuses(statuses.split(",").filter(Boolean));
    }
    if (renewableTypes) {
      setSelectedRenewableTypes(renewableTypes.split(",").filter(Boolean));
    }
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams();

    if (selectedFuelTypes.length > 0) {
      urlParams.set("fuelTypes", selectedFuelTypes.join(","));
    }
    if (selectedRegions.length > 0) {
      urlParams.set("regions", selectedRegions.join(","));
    }
    if (selectedStatuses.length > 0) {
      urlParams.set("statuses", selectedStatuses.join(","));
    }
    if (selectedRenewableTypes.length > 0) {
      urlParams.set("renewableTypes", selectedRenewableTypes.join(","));
    }

    const newUrl = urlParams.toString();
    const currentUrl = window.location.search.substring(1);

    if (newUrl !== currentUrl) {
      const url = newUrl
        ? `${window.location.pathname}?${newUrl}`
        : window.location.pathname;
      window.history.replaceState({}, "", url);
    }
  }, [
    selectedFuelTypes,
    selectedRegions,
    selectedStatuses,
    selectedRenewableTypes,
  ]);

  const handleFuelTypeChange = (values: string[]) => {
    setSelectedFuelTypes(values);
  };

  const handleRegionChange = (values: string[]) => {
    setSelectedRegions(values);
  };

  const handleStatusChange = (values: string[]) => {
    setSelectedStatuses(values);
  };

  const handleRenewableTypeChange = (values: string[]) => {
    setSelectedRenewableTypes(values);
  };

  const handleClearFilters = () => {
    setSelectedFuelTypes([]);
    setSelectedRegions([]);
    setSelectedStatuses([]);
    setSelectedRenewableTypes([]);
  };

  return {
    selectedFuelTypes,
    selectedRegions,
    selectedStatuses,
    selectedRenewableTypes,
    handleFuelTypeChange,
    handleRegionChange,
    handleStatusChange,
    handleRenewableTypeChange,
    handleClearFilters,
  };
};

export default useUrlFilters;

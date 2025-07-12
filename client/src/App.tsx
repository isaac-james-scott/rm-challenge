import {
  useEffect,
  useState,
  useMemo,
  useCallback,
  type ReactNode,
} from "react";
import { Flex } from "@radix-ui/themes";
import {
  type Facility,
  getRenewableCategory,
  type Unit,
  getFuelTechDisplayName,
  getStatusDisplayName,
} from "../../lib/schemas/facilities";
import Layout from "./components/Layout";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";
import FacilitiesTable from "./components/FacilitiesTable/FacilitiesTable";
import Pagination from "./components/FacilitiesTable/Pagination";
import Filters from "./components/Filters/Filters";
import useFacilitiesQuery from "./hooks/useFacilitiesQuery";
import useUrlFilters from "./hooks/useUrlFilters";

function App() {
  const { data, isLoading, error } = useFacilitiesQuery();
  const {
    selectedFuelTypes,
    selectedRegions,
    selectedStatuses,
    selectedRenewableTypes,
    handleFuelTypeChange,
    handleRegionChange,
    handleStatusChange,
    handleRenewableTypeChange,
    handleClearFilters,
  } = useUrlFilters();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const filterUnits = useCallback(
    (units: Unit[] | undefined): Unit[] => {
      if (!units) return [];

      return units.filter((unit) => {
        if (selectedRenewableTypes.length > 0) {
          if (!unit.fueltech_id) return false;
          const category = getRenewableCategory(unit.fueltech_id);
          if (!category || !selectedRenewableTypes.includes(category))
            return false;
        }

        if (selectedFuelTypes.length > 0) {
          if (
            !unit.fueltech_id ||
            !selectedFuelTypes.includes(unit.fueltech_id)
          )
            return false;
        }

        if (selectedStatuses.length > 0) {
          if (!unit.status_id || !selectedStatuses.includes(unit.status_id))
            return false;
        }

        return true;
      });
    },
    [selectedFuelTypes, selectedStatuses, selectedRenewableTypes]
  );

  const filteredFacilities = useMemo(() => {
    return (
      data?.data.data
        ?.filter((facility: Facility) => {
          if (selectedRegions.length > 0) {
            if (
              !facility.network_region ||
              !selectedRegions.includes(facility.network_region)
            ) {
              return false;
            }
          }

          const filteredUnits = filterUnits(facility.units);
          return filteredUnits.length > 0;
        })
        .map((facility) => ({
          ...facility,
          units: filterUnits(facility.units),
        })) || []
    );
  }, [data?.data.data, selectedRegions, filterUnits]);

  const paginationData = useMemo(() => {
    const totalItems = filteredFacilities.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return {
      totalItems,
      totalPages,
      startIndex,
      endIndex,
    };
  }, [filteredFacilities.length, currentPage, itemsPerPage]);

  const { totalItems, totalPages, startIndex, endIndex } = paginationData;

  const currentFacilities = useMemo(() => {
    return filteredFacilities.slice(startIndex, endIndex);
  }, [filteredFacilities, startIndex, endIndex]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedFuelTypes,
    selectedRegions,
    selectedStatuses,
    selectedRenewableTypes,
  ]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const activeFilters = useMemo(() => {
    const filters: string[] = [];

    if (selectedRenewableTypes.length > 0) {
      filters.push(
        ...selectedRenewableTypes.map((type) =>
          type === "renewable" ? "Renewable" : "Non-Renewable"
        )
      );
    }

    if (selectedFuelTypes.length > 0) {
      filters.push(
        ...selectedFuelTypes.map((type) => getFuelTechDisplayName(type))
      );
    }

    if (selectedRegions.length > 0) {
      filters.push(...selectedRegions);
    }

    if (selectedStatuses.length > 0) {
      filters.push(
        ...selectedStatuses.map((status) => getStatusDisplayName(status))
      );
    }

    return filters;
  }, [
    selectedFuelTypes,
    selectedRegions,
    selectedStatuses,
    selectedRenewableTypes,
  ]);

  const subtitle = useMemo(() => {
    if (!data) return undefined;

    return `${
      data?.data.total_records || data?.data.data.length
    } facilities total | ${
      filteredFacilities.length !== (data?.data.data.length || 0)
        ? `${filteredFacilities.length} filtered | `
        : ""
    }Showing ${Math.min(startIndex + 1, totalItems)}-${Math.min(
      endIndex,
      totalItems
    )} of ${totalItems}`;
  }, [data, filteredFacilities.length, startIndex, endIndex, totalItems]);

  let content: ReactNode;

  if (isLoading) {
    content = <LoadingState />;
  } else if (error) {
    content = <ErrorState error={error.message} />;
  } else {
    content = (
      <Flex direction="column" className="h-full">
        <div className="flex-shrink-0 px-5 pt-5">
          <Filters
            facilities={data?.data.data || []}
            selectedFuelTypes={selectedFuelTypes}
            selectedRegions={selectedRegions}
            selectedStatuses={selectedStatuses}
            selectedRenewableTypes={selectedRenewableTypes}
            onFuelTypeChange={handleFuelTypeChange}
            onRegionChange={handleRegionChange}
            onStatusChange={handleStatusChange}
            onRenewableTypeChange={handleRenewableTypeChange}
            onClearFilters={handleClearFilters}
          />
        </div>
        <div className="flex-1 overflow-y-auto px-5">
          <FacilitiesTable
            facilities={currentFacilities}
            activeFilters={activeFilters}
            onClearFilters={handleClearFilters}
          />
        </div>
        <div className="flex-shrink-0 px-5 pb-5">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </Flex>
    );
  }

  return (
    <Layout title="Grid Data" subtitle={subtitle}>
      {content}
    </Layout>
  );
}

export default App;

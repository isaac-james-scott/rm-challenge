import { Flex, Button } from "@radix-ui/themes";
import { type Facility } from "../../../../lib/schemas/facilities";
import RenewableFilter from "./RenewableFilter";
import FuelTypeFilter from "./FuelTypeFilter";
import RegionFilter from "./RegionFilter";
import StatusFilter from "./StatusFilter";
import ShareButton from "./ShareButton";

interface FiltersProps {
  facilities: Facility[];
  selectedFuelTypes: string[];
  selectedRegions: string[];
  selectedStatuses: string[];
  selectedRenewableTypes: string[];
  onFuelTypeChange: (values: string[]) => void;
  onRegionChange: (values: string[]) => void;
  onStatusChange: (values: string[]) => void;
  onRenewableTypeChange: (values: string[]) => void;
  onClearFilters: () => void;
}

const Filters = ({
  facilities,
  selectedFuelTypes,
  selectedRegions,
  selectedStatuses,
  selectedRenewableTypes,
  onFuelTypeChange,
  onRegionChange,
  onStatusChange,
  onRenewableTypeChange,
  onClearFilters,
}: FiltersProps) => {
  const hasActiveFilters =
    selectedFuelTypes.length > 0 ||
    selectedRegions.length > 0 ||
    selectedStatuses.length > 0 ||
    selectedRenewableTypes.length > 0;

  return (
    <Flex gap="2" align="center" justify="between" wrap="wrap" className="mb-4">
      <Flex gap="2" wrap="wrap">
        <RenewableFilter
          selectedRenewableTypes={selectedRenewableTypes}
          onRenewableTypeChange={onRenewableTypeChange}
        />

        <FuelTypeFilter
          facilities={facilities}
          selectedFuelTypes={selectedFuelTypes}
          onFuelTypeChange={onFuelTypeChange}
        />

        <RegionFilter
          facilities={facilities}
          selectedRegions={selectedRegions}
          onRegionChange={onRegionChange}
        />

        <StatusFilter
          facilities={facilities}
          selectedStatuses={selectedStatuses}
          onStatusChange={onStatusChange}
        />
        {hasActiveFilters && (
          <Button variant="soft" size="2" onClick={onClearFilters}>
            Clear filters
          </Button>
        )}
      </Flex>

      <ShareButton />
    </Flex>
  );
};

export default Filters;

import { DropdownMenu, Button, Checkbox, Flex, Text } from "@radix-ui/themes";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
  type Facility,
  getFuelTechDisplayName,
} from "../../../../lib/schemas/facilities";

interface FuelTypeFilterProps {
  facilities: Facility[];
  selectedFuelTypes: string[];
  onFuelTypeChange: (values: string[]) => void;
}

const FuelTypeFilter = ({
  facilities,
  selectedFuelTypes,
  onFuelTypeChange,
}: FuelTypeFilterProps) => {
  const fuelTypes = Array.from(
    new Set(
      facilities.flatMap(
        (facility) =>
          facility.units
            ?.map((unit) => unit.fueltech_id)
            .filter((fuelType): fuelType is string => Boolean(fuelType)) || []
      )
    )
  ).sort();

  const handleFuelTypeToggle = (fuelType: string) => {
    if (selectedFuelTypes.includes(fuelType)) {
      onFuelTypeChange(selectedFuelTypes.filter((type) => type !== fuelType));
    } else {
      onFuelTypeChange([...selectedFuelTypes, fuelType]);
    }
  };

  const getFuelTypeDisplayText = () => {
    if (selectedFuelTypes.length === 0) return "All fuel types";
    if (selectedFuelTypes.length === 1)
      return getFuelTechDisplayName(selectedFuelTypes[0]);
    return `${selectedFuelTypes.length} fuel types selected`;
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="outline" size="2">
          <Flex align="center" gap="2">
            <Text size="2">{getFuelTypeDisplayText()}</Text>
            <ChevronDownIcon />
          </Flex>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {fuelTypes.map((fuelType) => (
          <DropdownMenu.Item
            key={fuelType}
            onSelect={(e) => e.preventDefault()}
          >
            <Flex
              align="center"
              gap="2"
              onClick={() => handleFuelTypeToggle(fuelType)}
            >
              <Checkbox checked={selectedFuelTypes.includes(fuelType)} />
              <Text>{getFuelTechDisplayName(fuelType)}</Text>
            </Flex>
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default FuelTypeFilter;

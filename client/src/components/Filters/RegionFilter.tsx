import { DropdownMenu, Button, Checkbox, Flex, Text } from "@radix-ui/themes";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { type Facility } from "../../../../lib/schemas/facilities";

interface RegionFilterProps {
  facilities: Facility[];
  selectedRegions: string[];
  onRegionChange: (values: string[]) => void;
}

const RegionFilter = ({
  facilities,
  selectedRegions,
  onRegionChange,
}: RegionFilterProps) => {
  const regions = Array.from(
    new Set(
      facilities
        .map((facility) => facility.network_region)
        .filter((region): region is string => Boolean(region))
    )
  ).sort();

  const handleRegionToggle = (region: string) => {
    if (selectedRegions.includes(region)) {
      onRegionChange(selectedRegions.filter((r) => r !== region));
    } else {
      onRegionChange([...selectedRegions, region]);
    }
  };

  const getRegionDisplayText = () => {
    if (selectedRegions.length === 0) return "All regions";
    if (selectedRegions.length === 1) return selectedRegions[0];
    return `${selectedRegions.length} regions selected`;
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="outline" size="2">
          <Flex align="center" gap="2">
            <Text size="2">{getRegionDisplayText()}</Text>
            <ChevronDownIcon />
          </Flex>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {regions.map((region) => (
          <DropdownMenu.Item key={region} onSelect={(e) => e.preventDefault()}>
            <Flex
              align="center"
              gap="2"
              onClick={() => handleRegionToggle(region)}
            >
              <Checkbox checked={selectedRegions.includes(region)} />
              <Text>{region}</Text>
            </Flex>
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default RegionFilter;

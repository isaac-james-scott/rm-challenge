import { DropdownMenu, Button, Checkbox, Flex, Text } from "@radix-ui/themes";
import { ChevronDownIcon } from "@radix-ui/react-icons";

interface RenewableFilterProps {
  selectedRenewableTypes: string[];
  onRenewableTypeChange: (values: string[]) => void;
}

const RenewableFilter = ({
  selectedRenewableTypes,
  onRenewableTypeChange,
}: RenewableFilterProps) => {
  const renewableOptions = [
    { value: "renewable", label: "Renewable" },
    { value: "non-renewable", label: "Non-Renewable" },
  ];

  const handleRenewableToggle = (renewableType: string) => {
    if (selectedRenewableTypes.includes(renewableType)) {
      onRenewableTypeChange(
        selectedRenewableTypes.filter((r) => r !== renewableType)
      );
    } else {
      onRenewableTypeChange([...selectedRenewableTypes, renewableType]);
    }
  };

  const getRenewableDisplayText = () => {
    if (selectedRenewableTypes.length === 0) return "All energy types";
    if (selectedRenewableTypes.length === 1) {
      return selectedRenewableTypes[0] === "renewable"
        ? "Renewable"
        : "Non-Renewable";
    }
    return "Renewable & Non-Renewable";
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="outline" size="2">
          <Flex align="center" gap="2">
            <Text size="2">{getRenewableDisplayText()}</Text>
            <ChevronDownIcon />
          </Flex>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {renewableOptions.map((option) => (
          <DropdownMenu.Item
            key={option.value}
            onSelect={(e) => e.preventDefault()}
          >
            <Flex
              align="center"
              gap="2"
              onClick={() => handleRenewableToggle(option.value)}
            >
              <Checkbox
                checked={selectedRenewableTypes.includes(option.value)}
              />
              <Text>{option.label}</Text>
            </Flex>
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default RenewableFilter;

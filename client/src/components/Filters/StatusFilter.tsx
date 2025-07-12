import { DropdownMenu, Button, Checkbox, Flex, Text } from "@radix-ui/themes";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
  type Facility,
  getStatusDisplayName,
} from "../../../../lib/schemas/facilities";

interface StatusFilterProps {
  facilities: Facility[];
  selectedStatuses: string[];
  onStatusChange: (values: string[]) => void;
}

const StatusFilter = ({
  facilities,
  selectedStatuses,
  onStatusChange,
}: StatusFilterProps) => {
  const statuses = Array.from(
    new Set(
      facilities.flatMap(
        (facility) =>
          facility.units
            ?.map((unit) => unit.status_id)
            .filter((status): status is string => Boolean(status)) || []
      )
    )
  ).sort();

  const handleStatusToggle = (status: string) => {
    if (selectedStatuses.includes(status)) {
      onStatusChange(selectedStatuses.filter((s) => s !== status));
    } else {
      onStatusChange([...selectedStatuses, status]);
    }
  };

  const getStatusDisplayText = () => {
    if (selectedStatuses.length === 0) return "All statuses";
    if (selectedStatuses.length === 1)
      return getStatusDisplayName(selectedStatuses[0]);
    return `${selectedStatuses.length} statuses selected`;
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="outline" size="2">
          <Flex align="center" gap="2">
            <Text size="2">{getStatusDisplayText()}</Text>
            <ChevronDownIcon />
          </Flex>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {statuses.map((status) => (
          <DropdownMenu.Item key={status} onSelect={(e) => e.preventDefault()}>
            <Flex
              align="center"
              gap="2"
              onClick={() => handleStatusToggle(status)}
            >
              <Checkbox checked={selectedStatuses.includes(status)} />
              <Text>{getStatusDisplayName(status)}</Text>
            </Flex>
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default StatusFilter;

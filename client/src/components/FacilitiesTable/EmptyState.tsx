import { Flex, Text, Button } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

interface EmptyStateProps {
  activeFilters: string[];
  onClearFilters: () => void;
}

const EmptyState = ({ activeFilters, onClearFilters }: EmptyStateProps) => {
  const hasFilters = activeFilters.length > 0;

  return (
    <Flex
      direction="column"
      gap="2"
      align="center"
      justify="center"
      className="h-full"
    >
      <MagnifyingGlassIcon className="w-12 h-12 text-neutral-400 mb-4" />

      <Text size="4" weight="medium" className="text-white mb-2">
        No facilities found
      </Text>

      {hasFilters ? (
        <Flex direction="column" gap="4">
          <Text size="2" className="text-neutral-400 mb-4 max-w-md">
            No facilities match your current filters: {activeFilters.join(", ")}
          </Text>
          <Button variant="soft" size="2" onClick={onClearFilters}>
            Clear all filters
          </Button>
        </Flex>
      ) : (
        <Text size="2" className="text-neutral-400 max-w-md">
          No facilities are available to display at this time.
        </Text>
      )}
    </Flex>
  );
};

export default EmptyState;

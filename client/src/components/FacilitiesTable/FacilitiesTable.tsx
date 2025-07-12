import { EyeOpenIcon } from "@radix-ui/react-icons";
import { Badge, Box, Flex, IconButton, Table, Text } from "@radix-ui/themes";
import { useState } from "react";
import {
  type Facility,
  getFuelTechColor,
  getFuelTechDisplayName,
  getStatusColor,
  getStatusDisplayName,
} from "../../../../lib/schemas/facilities";
import EmptyState from "./EmptyState";
import FacilityDetailsModal from "./FacilityDetailsModal";
import { formatCapacity, getMostRecentUpdate } from "./utils";

interface FacilitiesTableProps {
  facilities: Facility[];
  activeFilters?: string[];
  onClearFilters?: () => void;
}

const FacilitiesTable = ({
  facilities,
  activeFilters = [],
  onClearFilters,
}: FacilitiesTableProps) => {
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (facility: Facility) => {
    setSelectedFacility(facility);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFacility(null);
  };

  if (facilities.length === 0) {
    return (
      <EmptyState
        activeFilters={activeFilters}
        onClearFilters={onClearFilters || (() => {})}
      />
    );
  }

  return (
    <>
      <Table.Root
        variant="surface"
        size="3"
        className="w-full max-h-full overflow-scroll"
        style={{
          scrollbarWidth: "none",
        }}
      >
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell width="16%">
              Facility
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell width="9%">Network</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell width="24%">
              Units & Technology
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell width="16%">Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell width="14%">
              Total Capacity
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell width="11%">
              Last Updated
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell width="10%">Details</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {facilities.map((facility: Facility) => {
            const totalCapacity =
              facility.units?.reduce(
                (sum, unit) => sum + (unit.capacity_registered || 0),
                0
              ) || 0;

            const unitsByTech =
              facility.units?.reduce((acc, unit) => {
                const techType = unit.fueltech_id || "unknown";
                if (!acc[techType]) {
                  acc[techType] = [];
                }
                acc[techType].push(unit);
                return acc;
              }, {} as Record<string, typeof facility.units>) || {};

            const unitsByStatus =
              facility.units?.reduce((acc, unit) => {
                const status = unit.status_id || "unknown";
                if (!acc[status]) {
                  acc[status] = [];
                }
                acc[status].push(unit);
                return acc;
              }, {} as Record<string, typeof facility.units>) || {};

            const lastUpdated = getMostRecentUpdate(facility);

            return (
              <Table.Row key={facility.code}>
                <Table.Cell width="16%">
                  <Box className="py-3">
                    <Text size="3" weight="medium" className="text-white">
                      {facility.name || "Unknown Facility"}
                    </Text>
                    <Text size="2" className="text-neutral-400 block mt-1">
                      {facility.code}
                    </Text>
                  </Box>
                </Table.Cell>

                <Table.Cell width="9%">
                  <Box className="py-3 flex items-center">
                    <Badge variant="soft" size="2" color="gray">
                      {facility.network_region || "N/A"}
                    </Badge>
                  </Box>
                </Table.Cell>

                <Table.Cell width="24%">
                  <Box className="py-3">
                    <Flex gap="2" wrap="wrap">
                      {Object.entries(unitsByTech).map(([techType, units]) => (
                        <Badge
                          key={techType}
                          color={getFuelTechColor(techType)}
                          variant="soft"
                          size="2"
                        >
                          {getFuelTechDisplayName(techType)}{" "}
                          {units.length <= 1 ? undefined : `(${units.length})`}
                        </Badge>
                      ))}
                    </Flex>
                  </Box>
                </Table.Cell>

                <Table.Cell width="16%">
                  <Box className="py-3">
                    <Flex gap="2" wrap="wrap">
                      {Object.entries(unitsByStatus).map(([status, units]) => (
                        <Badge
                          key={status}
                          color={getStatusColor(status)}
                          variant="soft"
                          size="2"
                        >
                          {getStatusDisplayName(status)}{" "}
                          {units.length <= 1 ? undefined : `(${units.length})`}
                        </Badge>
                      ))}
                    </Flex>
                  </Box>
                </Table.Cell>

                <Table.Cell width="14%">
                  <Box className="py-3 flex items-center">
                    <Text size="3" weight="medium" className="text-white">
                      {formatCapacity(totalCapacity)}
                    </Text>
                  </Box>
                </Table.Cell>

                <Table.Cell width="11%">
                  <Box className="py-3 flex items-center">
                    <Text size="2" className="text-neutral-300">
                      {lastUpdated}
                    </Text>
                  </Box>
                </Table.Cell>

                <Table.Cell width="10%">
                  <Box className="py-3 flex items-center justify-center">
                    <IconButton
                      variant="soft"
                      size="2"
                      onClick={() => handleViewDetails(facility)}
                      aria-label={`View details for ${
                        facility.name || facility.code
                      }`}
                    >
                      <EyeOpenIcon />
                    </IconButton>
                  </Box>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>

      <FacilityDetailsModal
        facility={selectedFacility}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default FacilitiesTable;

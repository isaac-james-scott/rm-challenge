import {
  Badge,
  Button,
  Card,
  Code,
  Dialog,
  Flex,
  Heading,
  Separator,
  Text,
} from "@radix-ui/themes";
import {
  type Facility,
  type Unit,
  getFuelTechColor,
  getFuelTechDisplayName,
  getStatusColor,
  getStatusDisplayName,
} from "../../../../lib/schemas/facilities";
import { cleanDescription, formatCapacity, formatDate } from "./utils";

interface FacilityDetailsModalProps {
  facility: Facility | null;
  isOpen: boolean;
  onClose: () => void;
}

export const FacilityDetailsModal = ({
  facility,
  isOpen,
  onClose,
}: FacilityDetailsModalProps) => {
  if (!facility) return null;

  const totalCapacity =
    facility.units?.reduce(
      (sum, unit) => sum + (unit.capacity_registered || 0),
      0
    ) || 0;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Content maxWidth="800px" className="max-h-[80vh] overflow-y-auto">
        <Flex direction="column" gap="6" p="6">
          <Dialog.Title>
            <Heading size="6">{facility.name || "Unknown Facility"}</Heading>
          </Dialog.Title>

          <Flex direction="column" gap="4">
            <Heading size="4">Facility Details</Heading>
            <Flex direction="column" gap="4">
              <Flex direction="column" gap="1">
                <Text size="2" weight="bold">
                  Code:
                </Text>
                <Code size="2" className="w-fit">
                  {facility.code}
                </Code>
              </Flex>
              <Flex direction="column" gap="1">
                <Text size="2" weight="bold">
                  Name:
                </Text>
                <Text size="2">{facility.name || "N/A"}</Text>
              </Flex>
              <Flex direction="column" gap="1">
                <Text size="2" weight="bold">
                  Network ID:
                </Text>
                <Text size="2">{facility.network_id || "N/A"}</Text>
              </Flex>
              <Flex direction="column" gap="1">
                <Text size="2" weight="bold">
                  Network Region:
                </Text>

                <Badge variant="soft" color="gray" size="1" className="w-fit">
                  {facility.network_region || "N/A"}
                </Badge>
              </Flex>
              <Flex direction="column" gap="2" className="col-span-2">
                <Text size="2" weight="bold">
                  Description:
                </Text>
                <Text size="2">{cleanDescription(facility.description)}</Text>
              </Flex>
              <Flex direction="column" gap="1">
                <Text size="2" weight="bold">
                  Total Capacity:
                </Text>
                <Text size="2" weight="medium">
                  {formatCapacity(totalCapacity)}
                </Text>
              </Flex>
              <Flex direction="column" gap="1">
                <Text size="2" weight="bold">
                  Total Units:
                </Text>
                <Text size="2" weight="medium">
                  {facility.units?.length || 0}
                </Text>
              </Flex>
            </Flex>
          </Flex>

          <Separator size="4" />

          <Flex direction="column" gap="4">
            <Heading size="4">Units ({facility.units?.length || 0})</Heading>
            {facility.units?.length ? (
              <Flex direction="column" gap="4">
                {facility.units.map((unit: Unit, index: number) => (
                  <Card key={unit.code}>
                    <Flex direction="column" gap="4">
                      <Flex justify="between" align="center">
                        <Heading size="3">Unit {index + 1}</Heading>
                        <Code size="2">{unit.code}</Code>
                      </Flex>

                      <Flex direction="column" gap="4">
                        <Flex direction="column" gap="1">
                          <Text size="2" weight="bold">
                            Fuel Technology:
                          </Text>
                          {unit.fueltech_id ? (
                            <Badge
                              variant="soft"
                              color={getFuelTechColor(unit.fueltech_id)}
                              size="1"
                              className="w-fit"
                            >
                              {getFuelTechDisplayName(unit.fueltech_id)}
                            </Badge>
                          ) : (
                            <Text size="2" color="gray">
                              N/A
                            </Text>
                          )}
                        </Flex>

                        <Flex direction="column" gap="1">
                          <Text size="2" weight="bold">
                            Status:
                          </Text>
                          {unit.status_id ? (
                            <Badge
                              variant="soft"
                              color={getStatusColor(unit.status_id)}
                              size="1"
                              className="w-fit"
                            >
                              {getStatusDisplayName(unit.status_id)}
                            </Badge>
                          ) : (
                            <Text size="2" color="gray">
                              N/A
                            </Text>
                          )}
                        </Flex>

                        <Flex direction="column" gap="1">
                          <Text size="2" weight="bold">
                            Registered Capacity:
                          </Text>
                          <Text size="2">
                            {formatCapacity(unit.capacity_registered)}
                          </Text>
                        </Flex>

                        <Flex direction="column" gap="1">
                          <Text size="2" weight="bold">
                            Dispatch Type:
                          </Text>
                          <Text size="2">{unit.dispatch_type || "N/A"}</Text>
                        </Flex>

                        <Flex direction="column" gap="1">
                          <Text size="2" weight="bold">
                            CO₂ Emissions Factor:
                          </Text>
                          <Text size="2">
                            {unit.emissions_factor_co2
                              ? `${unit.emissions_factor_co2.toLocaleString()} kg/MWh`
                              : "N/A"}
                          </Text>
                        </Flex>

                        <Flex direction="column" gap="1">
                          <Text size="2" weight="bold">
                            First Seen:
                          </Text>
                          <Text size="2">
                            {formatDate(unit.data_first_seen)}
                          </Text>
                        </Flex>

                        <Flex direction="column" gap="1" className="col-span-2">
                          <Text size="2" weight="bold">
                            Last Updated:
                          </Text>
                          <Text size="2">
                            {formatDate(unit.data_last_seen)}
                          </Text>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Card>
                ))}
              </Flex>
            ) : (
              <Text size="2" color="gray">
                No units available
              </Text>
            )}
          </Flex>

          <Flex gap="3" justify="end">
            <Dialog.Close>
              <Button variant="soft">Close</Button>
            </Dialog.Close>
          </Flex>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default FacilityDetailsModal;

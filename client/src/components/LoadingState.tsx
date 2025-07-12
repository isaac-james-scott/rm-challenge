import { Flex, Text, Skeleton, Box, Table } from "@radix-ui/themes";

const LoadingState = () => {
  return (
    <Flex direction="column" className="h-full">
      <div className="flex-shrink-0 pt-5">
        <Box className="mb-4 p-4 bg-gray-2 rounded-lg">
          <Flex gap="4" align="center">
            <Skeleton>
              <div className="w-32 h-8 bg-gray-4"></div>
            </Skeleton>
            <Skeleton>
              <div className="w-28 h-8 bg-gray-4"></div>
            </Skeleton>
            <Skeleton>
              <div className="w-24 h-8 bg-gray-4"></div>
            </Skeleton>
            <Skeleton>
              <div className="w-20 h-8 bg-gray-4"></div>
            </Skeleton>
          </Flex>
        </Box>
      </div>

      <div className="flex-1 overflow-y-auto px-5">
        <Table.Root variant="surface" size="3" className="w-full">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell width="16%">
                Facility
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell width="9%">
                Network
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell width="24%">
                Units & Technology
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell width="16%">
                Status
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell width="14%">
                Total Capacity
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell width="11%">
                Last Updated
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell width="10%">
                Details
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {Array.from({ length: 10 }).map((_, index) => (
              <Table.Row key={index}>
                <Table.Cell width="16%">
                  <Box className="py-3">
                    <Skeleton>
                      <Text size="3" weight="medium">
                        Loading facility name...
                      </Text>
                    </Skeleton>
                    <Box className="mt-1">
                      <Skeleton>
                        <Text size="2">FACILITY_CODE</Text>
                      </Skeleton>
                    </Box>
                  </Box>
                </Table.Cell>

                <Table.Cell width="9%">
                  <Box className="py-3 flex items-center">
                    <Skeleton>
                      <div className="w-12 h-6 bg-gray-4 rounded"></div>
                    </Skeleton>
                  </Box>
                </Table.Cell>

                <Table.Cell width="24%">
                  <Box className="py-3">
                    <Flex gap="2" wrap="wrap">
                      <Skeleton>
                        <div className="w-16 h-6 bg-gray-4 rounded"></div>
                      </Skeleton>
                      <Skeleton>
                        <div className="w-20 h-6 bg-gray-4 rounded"></div>
                      </Skeleton>
                      {index % 3 === 0 && (
                        <Skeleton>
                          <div className="w-14 h-6 bg-gray-4 rounded"></div>
                        </Skeleton>
                      )}
                    </Flex>
                  </Box>
                </Table.Cell>

                <Table.Cell width="16%">
                  <Box className="py-3">
                    <Flex gap="2" wrap="wrap">
                      <Skeleton>
                        <div className="w-18 h-6 bg-gray-4 rounded"></div>
                      </Skeleton>
                    </Flex>
                  </Box>
                </Table.Cell>

                <Table.Cell width="14%">
                  <Box className="py-3 flex items-center">
                    <Skeleton>
                      <Text size="3" weight="medium">
                        000.00 MW
                      </Text>
                    </Skeleton>
                  </Box>
                </Table.Cell>

                <Table.Cell width="11%">
                  <Box className="py-3 flex items-center">
                    <Skeleton>
                      <Text size="2">
                        {index % 4 === 0
                          ? "Today"
                          : index % 4 === 1
                          ? "Yesterday"
                          : index % 4 === 2
                          ? "3 days ago"
                          : "15 Dec"}
                      </Text>
                    </Skeleton>
                  </Box>
                </Table.Cell>

                <Table.Cell width="10%">
                  <Box className="py-3 flex items-center justify-center">
                    <Skeleton>
                      <div className="w-8 h-8 bg-gray-4 rounded-md"></div>
                    </Skeleton>
                  </Box>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </div>

      <div className="flex-shrink-0 px-5 pb-5">
        <Flex
          justify="between"
          align="center"
          className="mt-6 pt-4 border-t border-neutral-800"
        >
          <Skeleton>
            <Text size="2">Page 1 of 10</Text>
          </Skeleton>

          <Flex gap="2">
            <Skeleton>
              <div className="w-16 h-8 bg-gray-4 rounded"></div>
            </Skeleton>
            <Skeleton>
              <div className="w-8 h-8 bg-gray-4 rounded"></div>
            </Skeleton>
            <Skeleton>
              <div className="w-8 h-8 bg-gray-4 rounded"></div>
            </Skeleton>
            <Skeleton>
              <div className="w-8 h-8 bg-gray-4 rounded"></div>
            </Skeleton>
            <Skeleton>
              <div className="w-12 h-8 bg-gray-4 rounded"></div>
            </Skeleton>
          </Flex>
        </Flex>
      </div>
    </Flex>
  );
};

export default LoadingState;

import { Flex, Text } from "@radix-ui/themes";

interface ErrorStateProps {
  error: string;
}

const ErrorState = ({ error }: ErrorStateProps) => {
  return (
    <Flex className="p-5 flex-1" align="center" justify="center">
      <Text className="text-red-400">Error: {error}</Text>
    </Flex>
  );
};

export default ErrorState;

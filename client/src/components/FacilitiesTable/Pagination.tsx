import { Flex, Text, Button } from "@radix-ui/themes";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const renderPaginationButtons = () => {
    const buttons = [];
    const maxButtons = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    buttons.push(
      <Button
        key="prev"
        variant="outline"
        size="2"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </Button>
    );

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          variant={i === currentPage ? "soft" : "outline"}
          size="2"
          onClick={() => onPageChange(i)}
        >
          {i}
        </Button>
      );
    }

    buttons.push(
      <Button
        key="next"
        variant="outline"
        size="2"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
    );

    return buttons;
  };

  return (
    <Flex justify="between" align="center" wrap="wrap" gap="2" className="pt-4">
      <Text size="2" className="text-neutral-400">
        Page {currentPage} of {totalPages}
      </Text>

      <Flex gap="2">{renderPaginationButtons()}</Flex>
    </Flex>
  );
};

export default Pagination;

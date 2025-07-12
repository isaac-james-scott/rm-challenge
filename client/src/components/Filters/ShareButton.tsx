import { Button, Flex, Text } from "@radix-ui/themes";
import { Share2Icon, CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const ShareButton = () => {
  const [shareStatus, setShareStatus] = useState<
    "idle" | "copying" | "copied" | "error"
  >("idle");

  const handleShareUrl = async () => {
    setShareStatus("copying");

    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareStatus("copied");

      setTimeout(() => {
        setShareStatus("idle");
      }, 2000);
    } catch (err) {
      setShareStatus("error");
      console.error("Failed to copy URL:", err);

      setTimeout(() => {
        setShareStatus("idle");
      }, 2000);
    }
  };

  const getShareButtonText = () => {
    switch (shareStatus) {
      case "copying":
        return "Copying...";
      case "copied":
        return "Copied!";
      case "error":
        return "Error";
      default:
        return "Share";
    }
  };

  const getShareButtonIcon = () => {
    switch (shareStatus) {
      case "copied":
        return <CheckIcon />;
      case "copying":
        return <Share2Icon className="animate-pulse" />;
      case "error":
        return <Share2Icon />;
      default:
        return <Share2Icon />;
    }
  };

  return (
    <Button
      variant="soft"
      size="2"
      onClick={handleShareUrl}
      color={
        shareStatus === "copied"
          ? "green"
          : shareStatus === "error"
          ? "red"
          : undefined
      }
    >
      <Flex align="center" gap="2">
        {getShareButtonIcon()}
        <Text size="2">{getShareButtonText()}</Text>
      </Flex>
    </Button>
  );
};

export default ShareButton;

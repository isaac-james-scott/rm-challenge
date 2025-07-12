import { LightningBoltIcon } from "@radix-ui/react-icons";
import { Flex, Heading, Text } from "@radix-ui/themes";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const Layout = ({ children, title, subtitle }: LayoutProps) => {
  return (
    <div className="w-full h-full grid grid-rows-[auto_1fr_auto] gap-4">
      <nav className="flex flex-col p-5 border-b border-neutral-800">
        <Flex align="center" gap="1">
          <Heading size="6" className="text-white">
            {title}
          </Heading>
          <LightningBoltIcon width={18} height={18} />
        </Flex>
        {subtitle && (
          <Text size="2" className="text-neutral-400">
            {subtitle}
          </Text>
        )}
      </nav>

      <main className="flex-1 overflow-scroll">{children}</main>

      <footer className="flex p-5 border-t border-neutral-800 items-center justify-center">
        <Text size="2" className="text-neutral-500">
          Powered by Open Electricity
        </Text>
      </footer>
    </div>
  );
};

export default Layout;

"use client";
import { AppShell, Group, Text } from "@mantine/core";
import classes from "./Layout.module.css";
type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <div className={classes.header}>
          <Group justify="space-between">
            <Text size="xl" fw="bold">
              {"Secret Gifter 🎁"}
            </Text>

            {/* <ActionIcon
              variant="transparent"
              color="gray"
              mx="md"
              aria-label="Github"
              component="a"
              href="https://github.com/n4ze3m/shotty-fun"
              target="_blank"
            >
              <IconBrandGithub size={24} />
            </ActionIcon> */}
          </Group>
        </div>
      </AppShell.Header>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

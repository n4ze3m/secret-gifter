"use client";
import {
  AppShell,
  Avatar,
  Group,
  Menu,
  Text,
  UnstyledButton,
  rem,
} from "@mantine/core";
import classes from "./Layout.module.css";
import React from "react";
import cx from "clsx";
import { IconChevronDown, IconLogout } from "@tabler/icons-react";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { Notifications } from "@mantine/notifications";

type Props = {
  children: React.ReactNode;
  user?: User;
};

export const DashboardLayout = ({ children, user }: Props) => {
  const [userMenuOpened, setUserMenuOpened] = React.useState(false);

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <div className={classes.header}>
          <Group justify="space-between">
            <Text component={Link} href="/dashboard" size="xl" fw="bold">
              {"Secret Gifter 🎁"}
            </Text>
            <Menu
              width={260}
              position="bottom-end"
              transitionProps={{ transition: "pop-top-right" }}
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
              withinPortal
            >
              <Menu.Target>
                <UnstyledButton
                  className={cx(classes.user, {
                    [classes.userActive]: userMenuOpened,
                  })}
                >
                  <Group gap={7}>
                    <Avatar
                      src={user?.user_metadata.avatar_url}
                      alt={user?.email}
                      radius="xl"
                      size={20}
                    />
                    <Text fw={500} size="sm" lh={1} mr={3}>
                      {user?.email}
                    </Text>
                    <IconChevronDown
                      style={{ width: rem(12), height: rem(12) }}
                      stroke={1.5}
                    />
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Settings</Menu.Label>

                <Menu.Item
                  leftSection={
                    <IconLogout
                      style={{ width: rem(16), height: rem(16) }}
                      stroke={1.5}
                    />
                  }
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </div>
      </AppShell.Header>

      <AppShell.Main>
        <div className={classes.main}>
          <Notifications />
          {children}
        </div>
      </AppShell.Main>
    </AppShell>
  );
};

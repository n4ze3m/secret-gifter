"use client";
import { Button, Group, Text } from "@mantine/core";
import { useRouter } from "next/navigation";

export const DashboardBody = () => {
  const router = useRouter();
  return (
    <div>
      <Group justify="space-between">
        <Text size="xl" c="gary">
          All Gift Events
        </Text>
        <Button color="teal" onClick={() => router.push("/dashboard/new")}>
          New Gift Event
        </Button>
      </Group>
    </div>
  );
};

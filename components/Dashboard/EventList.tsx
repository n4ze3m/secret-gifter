"use client";
import { Card, Center, Group, SimpleGrid, Text } from "@mantine/core";
import classes from "./EventList.module.css";
import {
  IconCalendar,
  IconCalendarBolt,
  IconMoneybag,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import Link from "next/link";

type Props = {
  events: {
    id: string;
    name: string;
    description: string;
    event_date: string;
    currency: string;
    budget: number;
  }[];
};

export const IconWithText = ({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div
    style={{
      display: "flex",
    }}
  >
    {icon}
    <Text ml="xs" fz="xs">
      {children}
    </Text>
  </div>
);

export const EventList: React.FC<Props> = ({ events }) => {
  if (!events.length) {
    return (
      <Center>
        <div className={classes.noEvents}>
          <IconCalendarBolt
          size={50}
          />
          <Text fz="lg" fw={700}>
            You don't have any events yet
          </Text>
        </div>
      </Center>
    );
  }

  return (
    <SimpleGrid
      my={{ base: "md", sm: "xl" }}
      cols={{ base: 1, sm: 2, lg: 3 }}
      spacing={{ base: 10, sm: "xl" }}
      verticalSpacing={{ base: "md", sm: "xl" }}
    >
      {events.map((event) => (
        <Card
          component={Link}
          href={`/dashboard/event/${event.id}`}
          withBorder
          padding="lg"
          className={classes.card}
          key={event.id}
        >
          <Text fz="lg" fw={700} className={classes.title}>
            {event.name}
          </Text>

          <Text mt="sm" mb="md" c="dimmed" fz="xs" lineClamp={1}>
            {event.description || "N/A"}
          </Text>

          <Group>
            <IconWithText icon={<IconCalendar size={18} />}>
              {dayjs(event.event_date).format("DD MMM YYYY")}
            </IconWithText>

            <IconWithText icon={<IconMoneybag size={18} />}>
              {`${event.budget} ${event.currency}`}
            </IconWithText>
          </Group>
        </Card>
      ))}
    </SimpleGrid>
  );
};

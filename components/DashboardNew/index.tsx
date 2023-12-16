"use client";

// @ts-ignore
import { useFormStatus } from "react-dom";

import {
  TextInput,
  Paper,
  Container,
  Button,
  Alert,
  Title,
  Textarea,
  Group,
  Select,
  NumberInput,
} from "@mantine/core";
import classes from "./DashboardNew.module.css";
import React from "react";
import { DatePickerInput } from "@mantine/dates";

const Submit = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" loading={pending} fullWidth mt="xl" color="teal">
      Create Event
    </Button>
  );
};

export function DashboardNew({
  onAction,
  status,
}: {
  onAction: (formData: FormData) => void;
  status?: {
    type: string;
    message: string;
  };
}) {
  const [currencySymbols] = React.useState([
    "USD",
    "EUR",
    "GBP",
    "CNY",
    "JPY",
    "INR",
    "CAD",
    "AUD",
  ]);

  return (
    <Container size={720} my={40}>
      <Title ta="center" className={classes.title}>
        Create a new Gift Event
      </Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        {status?.message && status?.type && (
          <Alert
            color={status?.type === "success" ? "teal" : "red"}
            title={status?.message}
            mb="md"
          />
        )}

        <form action={onAction}>
          <TextInput
            name="name"
            label="Event Name"
            placeholder="Office Secret Santa 2K23"
            mb="md"
            required
          />

          <Textarea
            name="description"
            label="Event Description"
            mb="md"
            placeholder="A description of the event will be helpful for your participants"
          />

          <Group grow preventGrowOverflow={false} wrap="nowrap" mb="md">
            <Select
              name="currency"
              label="Currency"
              placeholder="USD"
              defaultValue="USD"
              data={currencySymbols}
              required
            />
            <NumberInput
              name="budget"
              label="Budget"
              placeholder="100"
              style={{ width: "100%" }}
              required
            />
          </Group>

          <DatePickerInput
            label="Event Date"
            placeholder="Select event date"
            name="event_date"
            value={new Date()}
            required
            mb="md"
          />

          <Submit />
        </form>
      </Paper>
    </Container>
  );
}

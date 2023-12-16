"use client";
import "react-dom";

// @ts-ignore
import { useFormStatus } from "react-dom";

import {
  TextInput,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Alert,
} from "@mantine/core";
import classes from "./Authentication.module.css";

const Submit = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" loading={pending} fullWidth mt="xl" color="teal">
      Send me a magic link
    </Button>
  );
};

export function Authentication({
  onAction,
  status,
}: {
  onAction: (formData: FormData) => void;
  status?: {
    type: string;
    message: string;
  };
}) {
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Ready to get started?
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Organize a Secret Santa event
      </Text>

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
            name="email"
            label="Email"
            placeholder="you@example.com"
            required
          />

          <Submit />
        </form>
      </Paper>
    </Container>
  );
}

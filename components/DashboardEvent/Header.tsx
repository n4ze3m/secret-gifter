"use client";
import { Button, Group, Modal, Text, TextInput } from "@mantine/core";
import { IconWithText } from "../Dashboard/EventList";
import { IconCalendar, IconMoneybag } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { showNotification } from "@mantine/notifications";

type Props = {
  data: any;
};

export const DashboardEventHeader = ({ data }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [loading2, setLoading2] = useState(false);

  const handleAddParticipant = async (values: any) => {
    try {
      setLoading(true);
      const response = await fetch("/api/member", {
        method: "POST",
        body: JSON.stringify({
          event_id: data.id,
          name: values.name,
          email: values.email,
        }),
      });
      if (response.status !== 200) {
        const message = await response.text();
        showNotification({
          title: "Error",
          message,
          color: "red",
        });
      }
      router.refresh();
      close();
    } catch (error) {
      console.log(error);
    }
    form.reset();
    setLoading(false);
  };

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
    },
  });

  const notify = async () => {
    try {
      setLoading2(true);
      const response = await fetch("/api/member/assign", {
        method: "POST",
        body: JSON.stringify({
          event_id: data.id,
        }),
      });
      if (response.status !== 200) {
        const message = await response.text();
        showNotification({
          title: "Error",
          message,
          color: "red",
        });
      }
      router.refresh();
    } catch (error) {
      console.log(error);
    }
    setLoading2(false);
  };

  return (
    <>
      <Group justify="space-between">
        <div>
          <Text size="xl" fw="bold">
            {data.name}
          </Text>
          <Group mt="md">
            <IconWithText icon={<IconCalendar size={18} />}>
              {dayjs(data.event_date).format("DD MMM YYYY")}
            </IconWithText>

            <IconWithText icon={<IconMoneybag size={18} />}>
              {`${data.budget} ${data.currency}`}
            </IconWithText>
          </Group>
        </div>

        <Group>
          <Button
            data-disabled={data.members.length < 3 || data.notified}
            color="blue"
            variant="outline"
            loading={loading2}
            onClick={() => {
              if (
                confirm("Are you sure you want to notify all participants?")
              ) {
                notify();
              }
            }}
          >
            {data.notified
              ? "Already Notified"
              : "Randomize & Send Secret Gifter Mails"}
          </Button>
          <Button
            data-disabled={data.notified}
            color="teal"
            variant="outline"
            onClick={open}
          >
            Add Participants
          </Button>
        </Group>
      </Group>
      <Modal opened={opened} onClose={close} title="Add New Participant">
        <form
          onSubmit={form.onSubmit((values) => {
            handleAddParticipant(values);
          })}
        >
          <TextInput
            label="Name"
            placeholder="Enter name"
            mb="sm"
            required
            {...form.getInputProps("name")}
          />

          <TextInput
            label="Email"
            placeholder="Enter email"
            type="email"
            mb="sm"
            required
            {...form.getInputProps("email")}
          />

          <Button loading={loading} fullWidth type="submit" color="teal">
            Add
          </Button>
        </form>
      </Modal>
    </>
  );
};

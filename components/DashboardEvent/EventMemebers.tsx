"use client";
import { ActionIcon, Alert } from "@mantine/core";
import classes from "./DashboardEvent.module.css";
import { DataTable } from "mantine-datatable";
import { IconInfoCircle } from "@tabler/icons-react";
import { IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

type Props = {
  data: any;
};

export const DashboardEventMembers = ({ data }: Props) => {
  const router = useRouter();

  const deleteMember = async (id: number) => {
    try {
      await fetch("/api/member", {
        method: "DELETE",
        body: JSON.stringify({
          id,
        }),
      });
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.event}>
      {
        // if members less than 3
        data.members.length < 3 && (
          <Alert
            icon={<IconInfoCircle size={20} />}
            color="yellow"
            title="You need at least 3 participants to start this gift event."
          />
        )
      }

      <DataTable
        mt="md"
        withTableBorder
        borderRadius="sm"
        withColumnBorders
        striped
        minHeight={data.members.length === 0 ? 160 : 0}
        noRecordsText="No members yet"
        highlightOnHover
        records={data.members}
        columns={[
          {
            accessor: "name",
            title: "Name",
            textAlign: "center",
          },
          {
            accessor: "email",
            textAlign: "center",
            title: "Email",
          },
          {
            title: "Action",
            textAlign: "center",
            accessor: "action",
            render: (row: any) => {
              return (
                <ActionIcon
                  variant="transparent"
                  color="red"
                  onClick={() => {
                    if (confirm("Are you sure?")) {
                      deleteMember(row.id);
                    }
                  }}
                >
                  <IconTrash size={18} />
                </ActionIcon>
              );
            },
          },
        ]}
      />
    </div>
  );
};

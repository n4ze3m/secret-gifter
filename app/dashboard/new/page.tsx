import { DashboardNew } from "@/components/DashboardNew";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardNewPage({
  searchParams,
}: {
  searchParams: { message: string; type: string };
}) {
  const onAction = async (formData: FormData) => {
    "use server";
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    if (
      !formData.get("name") ||
      !formData.get("budget") ||
      !formData.get("currency") ||
      !formData.get("event_date")
    ) {
      return redirect(
        "/dashboard/new?message=Please fill out all fields&type=error"
      );
    }

    const { data, error } = await supabase
      .from("events")
      .insert({
        name: formData.get("name"),
        description: formData.get("description"),
        budget: formData.get("budget"),
        currency: formData.get("currency"),
        event_date: formData.get("event_date"),
      })
      .select("id");

    if (error) {
      return redirect(
        "/dashboard/new?message=Could not create event&type=error"
      );
    }

    return redirect(`/dashboard/event/${data[0].id}`);
  };

  return (
    <div>
      <DashboardNew status={searchParams} onAction={onAction} />
    </div>
  );
}

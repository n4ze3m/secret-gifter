import { DashboardBody } from "@/components/Dashboard";
import { EventList } from "@/components/Dashboard/EventList";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Dashboard() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: events } = await supabase.from("events").select("*");

  return (
    <div>
      <DashboardBody />
      <EventList events={events || []} />
    </div>
  );
}

import { DashboardEventMembers } from "@/components/DashboardEvent/EventMemebers";
import { DashboardEventHeader } from "@/components/DashboardEvent/Header";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Dashboard({
  params,
}: {
  params: { slug: string };
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: events } = await supabase
    .from("events")
    .select(`*, members(*)`)
    .eq("id", params.slug)
    .single();

  if (!events) {
    return redirect("/dashboard");
  }
  return (
    <div>
      <DashboardEventHeader data={events} />
      <DashboardEventMembers data={events} />
    </div>
  );
}

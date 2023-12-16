import { DashboardLayout } from "@/components/Layout/Dashboard";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Dashboard / Secret Gifter",
  description: "A Secret Santa app for your friends and family 🎅",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return redirect("/auth");
  }
  return <DashboardLayout user={session?.user}>{children}</DashboardLayout>;
}

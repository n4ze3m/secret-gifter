import { Layout } from "@/components/Layout";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Index() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return redirect("/dashboard");
  } else {
    return redirect("/auth");
  }

  return <Layout>under construction</Layout>;
}

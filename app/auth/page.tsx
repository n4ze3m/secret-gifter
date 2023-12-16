import {  cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Authentication } from "@/components/Authentication/Authentication";
import { Layout } from "@/components/Layout";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string; type: string };
}) {
  const onAction = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signInWithOtp({
      email,
    });

    if (error) {
      console.error(error);
      return redirect("/auth?message=Could not authenticate user&type=error");
    }

    return redirect(
      "/auth?message=Check your email for the login link&type=success"
    );
  };

  return (
    <Layout>
      <Authentication onAction={onAction} status={searchParams} />
    </Layout>
  );
}

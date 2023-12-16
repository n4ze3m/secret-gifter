import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // check same email in event
  const { data: members } = await supabase
    .from("members")
    .select("*")
    .eq("email", body.email)
    .eq("event_id", body.event_id);

  if (members && members?.length > 0) {
    return new NextResponse("Email already exists in this event", {
      status: 400,
    });
  }

  await supabase.from("members").insert(body);
  return new NextResponse("Success!");
}

export async function DELETE(request: NextRequest) {
  const body = await request.json();
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  await supabase.from("members").delete().match({ id: body.id });
  return new NextResponse("Success!");
}

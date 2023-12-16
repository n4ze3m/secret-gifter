import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Resend } from "resend";
import { assignSecretSanta } from "@/utils/assign";
import { htmlTemplate } from "@/utils/email/template";
import dayjs from "dayjs";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data: events } = await supabase
      .from("events")
      .select(`*, members(*)`)
      .eq("id", body.event_id)
      .single();

    if (!events) {
      return new NextResponse("Event not found", { status: 404 });
    }

    if (events.notified) {
      return new NextResponse("Already notified", { status: 400 });
    }

    if (events.members.length < 3) {
      return new NextResponse("Not enough members", { status: 400 });
    }

    const assignments = assignSecretSanta(events.members);

    for (const assignment of assignments) {
      const html = htmlTemplate(
        assignment.receiver.name,
        `${events.budget} ${events.currency}`,
        dayjs(events.date).format("MMMM D, YYYY")
      );
      await resend.emails.send({
        from: "Secret Gifter 🎁 <gifter@hello.wayto.website>",
        to: [assignment.giver.email],
        subject: "You are Secret Santa!",
        html,
      });
    }

    const status = await supabase
      .from("events")
      .update({ notified: true })
      .eq("id", body.event_id);

    const logs = assignments.map((assignment) => {
      return {
        giver_id: assignment.giver.id,
        receiver_id: assignment.receiver.id,
        event_id: events.id,
      };
    });

    await supabase.from("logs").insert(logs);

    console.log("status", status);

    return new NextResponse("Success!");
  } catch (error: any) {
    return new NextResponse(error?.message || "Internal Server error", {
      status: 500,
    });
  }
}

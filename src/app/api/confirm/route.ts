import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const intent_id = searchParams.get("intent_id");

    if (!intent_id) {
      return NextResponse.json(
        { error: "Intent ID is required" },
        { status: 400 }
      );
    }

    await prisma.ticket.update({
      where: { intent_id },
      data: {
        paid: "PAID",
      },
    });

    return NextResponse.json({ success: "Payment confirmed" }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

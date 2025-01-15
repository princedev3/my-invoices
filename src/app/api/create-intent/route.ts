import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const POST = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "id not found" }, { status: 400 });
    }
    const findTicket = await prisma.ticket.findUnique({
      where: {
        id: id,
      },
    });
    if (!findTicket) {
      return NextResponse.json({ message: "order not found" }, { status: 404 });
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount: (findTicket.value * 100).toFixed(0),
      currency: "eur",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    await prisma.ticket.update({
      where: {
        id: id,
      },
      data: {
        intent_id: paymentIntent.id,
      },
    });
    return NextResponse.json(
      { client_secret: paymentIntent.client_secret },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};

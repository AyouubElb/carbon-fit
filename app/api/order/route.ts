import { NextRequest } from "next/server";
import { createOrder } from "@/lib/services/order";
import { OrderPayload } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const orderData = (await request.json()) as OrderPayload;
    const result = await createOrder(orderData);
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    let message = "An unexpected error occurred";

    if (err instanceof Error) {
      message = err.message;
    }
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
}

import { env } from "@/lib/env";
import { logger } from "@/lib/logger";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { Stripe } from "stripe";

export async function constructStripeEvent(
  body: string,
): Promise<Stripe.Event> {
  const headerList = headers();

  const stripeSignature = headerList.get("stripe-signature");

  let event: Stripe.Event | null = null;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      stripeSignature ?? "",
      env.STRIPE_WEBHOOK_SECRET ?? "",
    );
  } catch {
    logger.error("Request Failed - STRIPE_WEBHOOK_SECRET may be invalid");
    throw new Error("Invalid webhook signature");
  }

  return event;
}

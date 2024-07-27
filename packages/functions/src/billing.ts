import { Util } from "@sst-monorepo/core/util";
import { Billing } from "@sst-monorepo/core/billing";
import Stripe from "stripe";
import { Resource } from "sst";

export const main = Util.handler(async (event) => {
  const { storage, source } = JSON.parse(event.body || "{}");
  const amount = Billing.compute(storage);
  const description = "Scratch storage";

  const stripe = new Stripe(Resource.StripeSecretKey.value, {
    apiVersion: "2024-06-20",
  });
  await stripe.charges.create({
    source,
    amount,
    description,
    currency: "usd",
  });

  return JSON.stringify({
    status: true,
  });
});

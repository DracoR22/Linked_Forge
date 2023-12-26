import getCurrentUserStripe from "@/actions/get-current-user-stripe";
import db from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { NextResponse } from "next/server";

const dashboardUrl = absoluteUrl(`/dashboard`);

export async function GET() {
  try {
    const currentUser = await getCurrentUserStripe()

    if (!currentUser || !currentUser.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userSubscription = await db.userSubscription.findUnique({
      where: {
        userId: currentUser.id
      }
    })

    if (userSubscription && userSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: dashboardUrl,
      })

      return new NextResponse(JSON.stringify({ url: stripeSession.url }))
    }

    const stripeSession = await stripe.checkout.sessions.create({
     success_url: dashboardUrl,
     cancel_url: dashboardUrl,
     payment_method_types: ['card', 'us_bank_account'],
     mode: 'subscription',
     billing_address_collection: 'auto',
     customer_email: currentUser.email,
     line_items: [
        {
            price_data: {
                currency: 'USD',
                product_data: {
                    name: 'LinkForgeAI Pro',
                    description: 'Prepare for the pinnacle of AI with an unlimited experience'
                },
                unit_amount: 2999,
                recurring: {
                    interval: 'month'
                }
            },
            quantity: 1
        }
     ],
     metadata: {
        userId: currentUser.id
     }
    })

    return new NextResponse(JSON.stringify({ url: stripeSession.url }))
  } catch (error) {
    console.log("[STRIPE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
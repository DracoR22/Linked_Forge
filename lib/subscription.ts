import getCurrentUserServer from "@/actions/get-current-user-server";
import db from "./db";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const currentUser = await getCurrentUserServer()

  if (!currentUser) {
  return false
  }

  const userSubscription = await db.userSubscription.findUnique({
    where: {
      userId: currentUser.id,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  })

  if (!userSubscription) {
    return false;
  }

  const isValid =
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()

  return !!isValid;
};
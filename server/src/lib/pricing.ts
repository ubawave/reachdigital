export type Pricing = {
  months: number;
  rental: number;
  production: number;
  serviceFee: number;
  total: number;
};

const SERVICE_FEE = 15000;

/**
 * Pricing model (Naira):
 *   months    = max(1, ceil(days / 30))
 *   rental    = monthlyPrice * months
 *   production = 10% of rental
 *   serviceFee = flat ₦15,000
 */
export function computePricing(
  monthlyPrice: number,
  startDate: Date,
  endDate: Date,
): Pricing {
  const ms = endDate.getTime() - startDate.getTime();
  const days = Math.max(1, Math.ceil(ms / (1000 * 60 * 60 * 24)));
  const months = Math.max(1, Math.ceil(days / 30));
  const rental = monthlyPrice * months;
  const production = Math.round(rental * 0.1);
  const serviceFee = SERVICE_FEE;
  const total = rental + production + serviceFee;

  return { months, rental, production, serviceFee, total };
}

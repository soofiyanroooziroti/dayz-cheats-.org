export type ProductPlanId = 'monthly' | 'lifetime';

export interface ProductPlan {
  id: ProductPlanId;
  label: string;
  priceUsd: number;
  priceNote: string;
}

const cheatAndUgcPlans: ProductPlan[] = [
  { id: 'monthly', label: '1 Month', priceUsd: 35, priceNote: 'USD · 31 days (P31D)' },
  { id: 'lifetime', label: 'Lifetime', priceUsd: 150, priceNote: 'USD · lifetime (P99Y)' },
];

const spooferPlans: ProductPlan[] = [
  { id: 'monthly', label: '1 Month', priceUsd: 50, priceNote: 'USD · 31 days (P31D)' },
  { id: 'lifetime', label: 'Lifetime', priceUsd: 150, priceNote: 'USD · lifetime (P99Y)' },
];

export function getProductPlans(productSlug: string): ProductPlan[] {
  if (productSlug === 'hwid-spoofer') {
    return spooferPlans.map((plan) => ({ ...plan }));
  }
  return cheatAndUgcPlans.map((plan) => ({ ...plan }));
}

export function getDefaultPlan(productSlug: string): ProductPlan {
  const plans = getProductPlans(productSlug);
  return plans.find((p) => p.id === 'monthly') ?? plans[0]!;
}

export function formatPlanPrice(usd: number): string {
  return `$${usd}`;
}

/** Plan is chosen on partner checkout — internal /go/ path only. */
export function checkoutUrlWithPlan(baseUrl: string, _planId: ProductPlanId): string {
  return baseUrl;
}

export function getProductFromPrice(productSlug: string): number {
  return getDefaultPlan(productSlug).priceUsd;
}

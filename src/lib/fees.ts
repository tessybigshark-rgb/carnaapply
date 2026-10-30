
import { z } from "zod";

export const MIN_FEE = 49;
export const MAX_FEE = 300;

export const MIN_SALARY_USD = 300;
export const MAX_SALARY_USD = 10000;

const salarySchema = z.number()
  .finite()
  .min(MIN_SALARY_USD)
  .max(MAX_SALARY_USD);

export function calculateApplicationFee(
  salaryUsd: number
): number {

  const result = salarySchema.safeParse(salaryUsd);

  if (!result.success) {
    throw new Error(
      "Salary must be between $300 and $10,000 USD."
    );
  }

  const fee = Math.round(
    MIN_FEE +
    ((salaryUsd - MIN_SALARY_USD) /
    (MAX_SALARY_USD - MIN_SALARY_USD)) *
    (MAX_FEE - MIN_FEE)
  );

  if (fee < MIN_FEE || fee > MAX_FEE) {
    throw new Error("Invalid application fee.");
  }

  return fee;
}

export const exchangeRates = {
  MAD: 10,
  BIF: 2857.14,
  ZMW: 26
};

export function convertFee(
  feeUsd: number,
  currency: keyof typeof exchangeRates
) {
  return Math.round(
    feeUsd * exchangeRates[currency]
  );
}

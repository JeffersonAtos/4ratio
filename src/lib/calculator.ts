export interface CalculatorInputs {
  // Direct costs
  materials: number;
  labor: number;
  otherDirect: number;
  // Fixed costs allocation (%)
  rent: number;
  admin: number;
  tech: number;
  ownerSalary: number;
  // Tax
  taxRate: number;
  vatSeparate: boolean;
  // Channel fees (%)
  paymentProcessing: number;
  marketplace: number;
  salesCommission: number;
  badDebt: number;
  // Margin & Market
  desiredMargin: number;
  competitorPrice: number;
}

export interface PricingResult {
  directCosts: number;
  fixedCostsPercent: number;
  fixedCostsAmount: number;
  taxPercent: number;
  taxAmount: number;
  channelFeesPercent: number;
  channelFeesAmount: number;
  totalRealCost: number;
  breakevenPrice: number;
  suggestedPrice: number;
  marginAmount: number;
  effectiveMargin: number;
  vsCompetitor: number | null;
  deductionWarning: boolean;
  scenarios: {
    conservative: { margin: number; price: number };
    current: { margin: number; price: number };
    aggressive: { margin: number; price: number };
  };
}

export const DEFAULT_INPUTS: CalculatorInputs = {
  materials: 0,
  labor: 0,
  otherDirect: 0,
  rent: 0,
  admin: 0,
  tech: 0,
  ownerSalary: 0,
  taxRate: 0,
  vatSeparate: false,
  paymentProcessing: 0,
  marketplace: 0,
  salesCommission: 0,
  badDebt: 0,
  desiredMargin: 20,
  competitorPrice: 0,
};

export function calculatePricing(inputs: CalculatorInputs): PricingResult {
  const directCosts = inputs.materials + inputs.labor + inputs.otherDirect;

  const fixedCostsPercent =
    inputs.rent + inputs.admin + inputs.tech + inputs.ownerSalary;

  // If VAT is charged separately, it doesn't eat into the price
  const effectiveTaxRate = inputs.vatSeparate ? 0 : inputs.taxRate;

  const channelFeesPercent =
    inputs.paymentProcessing +
    inputs.marketplace +
    inputs.salesCommission +
    inputs.badDebt;

  const totalDeductionsPct =
    fixedCostsPercent + effectiveTaxRate + channelFeesPercent;

  // Prevent division by zero or negative denominator
  const clampedDeductions = Math.min(totalDeductionsPct, 99);
  const clampedWithMargin = Math.min(
    totalDeductionsPct + inputs.desiredMargin,
    99
  );

  const breakevenPrice =
    directCosts > 0 ? directCosts / (1 - clampedDeductions / 100) : 0;

  const suggestedPrice =
    directCosts > 0 ? directCosts / (1 - clampedWithMargin / 100) : 0;

  // Calculate actual amounts based on suggestedPrice (what the user will actually charge)
  const fixedCostsAmount = suggestedPrice * (fixedCostsPercent / 100);
  const taxAmount = suggestedPrice * (effectiveTaxRate / 100);
  const channelFeesAmount = suggestedPrice * (channelFeesPercent / 100);
  const totalRealCost = directCosts + fixedCostsAmount + taxAmount + channelFeesAmount;

  const marginAmount = suggestedPrice - totalRealCost;
  const effectiveMargin =
    suggestedPrice > 0 ? (marginAmount / suggestedPrice) * 100 : 0;

  // Warning when deductions + margin are dangerously high
  const deductionWarning = totalDeductionsPct + inputs.desiredMargin >= 85;

  const vsCompetitor =
    inputs.competitorPrice > 0
      ? ((suggestedPrice - inputs.competitorPrice) / inputs.competitorPrice) *
        100
      : null;

  // Scenarios: -10%, current, +10% margin
  const conservativeMargin = Math.max(inputs.desiredMargin - 10, 0);
  const aggressiveMargin = Math.min(inputs.desiredMargin + 10, 99 - totalDeductionsPct);

  const calcPrice = (margin: number) =>
    directCosts > 0
      ? directCosts / (1 - Math.min(totalDeductionsPct + margin, 99) / 100)
      : 0;

  return {
    directCosts,
    fixedCostsPercent,
    fixedCostsAmount,
    taxPercent: effectiveTaxRate,
    taxAmount,
    channelFeesPercent,
    channelFeesAmount,
    totalRealCost,
    breakevenPrice,
    suggestedPrice,
    marginAmount,
    effectiveMargin,
    vsCompetitor,
    deductionWarning,
    scenarios: {
      conservative: {
        margin: conservativeMargin,
        price: calcPrice(conservativeMargin),
      },
      current: {
        margin: inputs.desiredMargin,
        price: suggestedPrice,
      },
      aggressive: {
        margin: aggressiveMargin,
        price: calcPrice(aggressiveMargin),
      },
    },
  };
}

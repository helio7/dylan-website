export enum PaymentDetailMode {
  AUTO = 'auto',
  EXPIRES = 'expires',
  ON_SITE = 'on_site',
  ON_DEMAND = 'on_demand',
}

export interface Expense {
  codename: string;
  displayName: string;
  baseCost: number;
  taxesPercent: number;
  paymentDetails: {
    mode: string,
    monthDay?: number,
  };
}

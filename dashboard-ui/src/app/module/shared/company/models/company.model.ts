export interface Company {
  regcode: number;
  sepa: string;
  name: string;
  regtype: string;
  companyType: string;
  registeredDate: string;
  terminatedDate: null;
  address: string;
  postalIndex: number;
  financialStatements: FinancialStatement[];
}

export interface FinancialStatement {
  statementFileId: number;
  regcode: number;
  statementYear: number;
  createdAt: string;
  employeeCount: number;
  currency: 'EUR' | 'LVL';
  incomeStatementEntity: [IncomeStatement | null];
  balanceStatementEntity: [BalanceStatement | null];
  cashFlowStatementEntity: [CashFlowStatement | null];
}

export interface BalanceStatement {
  balanceStatementFileId: number | null;
  statementId: number | null;
  cash: number | null;
  marketableSecurities: number | null;
  accountsReceivable: number | null;
  inventories: number | null;
  totalCurrentAssets: number | null;
  investments: number | null;
  fixedAssets: number | null;
  intangibleAssets: number | null;
  totalNonCurrentAssets: number | null;
  totalAssets: number | null;
  futureHousingRepairsPayments: number | null;
  currentLiabilities: number | null;
  nonCurrentLiabilities: number | null;
  provisions: number | null;
  equity: number | null;
  totalEquities: number | null;
}

export interface IncomeStatement {
  incomeStatementFileId: number | null;
  statementId: number | null;
  netTurnover: number | null;
  byNatureInventoryChange: number | null;
  byNatureLongTermInvestmentExpenses: number | null;
  byNatureOtherOperatingRevenues: number | null;
  byNatureMaterialExpenses: number | null;
  byNatureLabourExpenses: number | null;
  byNatureDepreciationExpenses: number | null;
  byFunctionCostOfGoodsSold: number | null;
  byFunctionGrossProfit: number | null;
  byFunctionSellingExpenses: number | null;
  byFunctionAdministrativeExpenses: number | null;
  byFunctionOtherOperatingRevenues: number | null;
  otherOperatingExpenses: number | null;
  equityInvestmentEarnings: number | null;
  otherLongTermInvestmentEarnings: number | null;
  otherInterestRevenues: number | null;
  investmentFairValueAdjustments: number | null;
  interestExpenses: number | null;
  extraRevenues: number | null;
  extraExpenses: number | null;
  incomeBeforeIncomeTaxes: number | null;
  provisionForIncomeTaxes: number | null;
  incomeAfterIncomeTaxes: number | null;
  otherTaxes: number | null;
  extraDividends: number | null;
  netIncome: number | null;
}

export interface CashFlowStatement {
  cashFlowStatementFileId: number | null;
  statementId: number | null;
  cfoDmCashReceivedFromCustomers: number | null;
  cfoDmCashPaidToSuppliersEmployees: number | null;
  cfoDmOtherCashReceivedPaid: number | null;
  cfoDmOperatingCashFlow: number | null;
  cfoDmInterestPaid: number | null;
  cfoDmIncomeTaxesPaid: number | null;
  cfoDmExtraItemsCashFlow: number | null;
  cfoDmNetOperatingCashFlow: number | null;
  cfoImIncomeBeforeIncomeTaxes: number | null;
  cfoImIncomeBeforeChangesInWorkingCapital: number | null;
  cfoImOperatingCashFlow: number | null;
  cfoImInterestPaid: number | null;
  cfoImIncomeTaxesPaid: number | null;
  cfoImExtraItemsCashFlow: number | null;
  cfoImNetOperatingCashFlow: number | null;
  cfiAcquisitionOfStocksShares: number | null;
  cfiSaleProceedsFromStocksShares: number | null;
  cfiAcquisitionOfFixedAssetsIntangibleAssets: number | null;
  cfiSaleProceedsFromFixedAssetsIntangibleAssets: number | null;
  cfiLoansMade: number | null;
  cfiRepaymentsOfLoansReceived: number | null;
  cfiInterestReceived: number | null;
  cfiDividendsReceived: number | null;
  cfiNetInvestingCashFlow: number | null;
  cffProceedsFromStocksBondsIssuanceOrContributedCapital: number | null;
  cffLoansReceived: number | null;
  cffSubsidiesGrantsDonationsReceived: number | null;
  cffRepaymentsOfLoansMade: number | null;
  cffRepaymentsOfLeaseObligations: number | null;
  cffDividendsPaid: number | null;
  cffNetFinancingCashFlow: number | null;
  effectOfExchangeRateChange: number | null;
  netIncrease: number | null;
  atBeginningOfYear: number | null;
  atEndOfYear: number | null;
}

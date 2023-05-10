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
  financialStatements: unknown[];
}

package org.xapik.crypto.users.companies.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "cash_flow_statements")
public class CashFlowStatementEntity {

    @Id
    @Column
    private Long cashFlowStatementFileId;

    @Column
    private Long statementId;

    @Column
    private Long cfoDmCashReceivedFromCustomers;
    @Column
    private Long cfoDmCashPaidToSuppliersEmployees;
    @Column
    private Long cfoDmOtherCashReceivedPaid;
    @Column
    private Long cfoDmOperatingCashFlow;
    @Column
    private Long cfoDmInterestPaid;
    @Column
    private Long cfoDmIncomeTaxesPaid;
    @Column
    private Long cfoDmExtraItemsCashFlow;
    @Column
    private Long cfoDmNetOperatingCashFlow;
    @Column
    private Long cfoImIncomeBeforeIncomeTaxes;
    @Column
    private Long cfoImIncomeBeforeChangesInWorkingCapital;
    @Column
    private Long cfoImOperatingCashFlow;
    @Column
    private Long cfoImInterestPaid;
    @Column
    private Long cfoImIncomeTaxesPaid;
    @Column
    private Long cfoImExtraItemsCashFlow;
    @Column
    private Long cfoImNetOperatingCashFlow;
    @Column
    private Long cfiAcquisitionOfStocksShares;
    @Column
    private Long cfiSaleProceedsFromStocksShares;
    @Column
    private Long cfiAcquisitionOfFixedAssetsIntangibleAssets;
    @Column
    private Long cfiSaleProceedsFromFixedAssetsIntangibleAssets;
    @Column
    private Long cfiLoansMade;
    @Column
    private Long cfiRepaymentsOfLoansReceived;
    @Column
    private Long cfiInterestReceived;
    @Column
    private Long cfiDividendsReceived;
    @Column
    private Long cfiNetInvestingCashFlow;
    @Column
    private Long cffProceedsFromStocksBondsIssuanceOrContributedCapital;
    @Column
    private Long cffLoansReceived;
    @Column
    private Long cffSubsidiesGrantsDonationsReceived;
    @Column
    private Long cffRepaymentsOfLoansMade;
    @Column
    private Long cffRepaymentsOfLeaseObligations;
    @Column
    private Long cffDividendsPaid;
    @Column
    private Long cffNetFinancingCashFlow;
    @Column
    private Long effectOfExchangeRateChange;
    @Column
    private Long netIncrease;
    @Column
    private Long atBeginningOfYear;
    @Column
    private Long atEndOfYear;

}

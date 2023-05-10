package org.xapik.crypto.users.companies.models;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "income_statements")
public class IncomeStatementEntity {

    @Id
    @Column
    private Long incomeStatementFileId;

    @Column
    private Long statementId;

    @Column
    private Long netTurnover;
    @Column
    private Long byNatureInventoryChange;
    @Column
    private Long byNatureLongTermInvestmentExpenses;
    @Column
    private Long byNatureOtherOperatingRevenues;
    @Column
    private Long byNatureMaterialExpenses;
    @Column
    private Long byNatureLabourExpenses;
    @Column
    private Long byNatureDepreciationExpenses;
    @Column
    private Long byFunctionCostOfGoodsSold;
    @Column
    private Long byFunctionGrossProfit;
    @Column
    private Long byFunctionSellingExpenses;
    @Column
    private Long byFunctionAdministrativeExpenses;
    @Column
    private Long byFunctionOtherOperatingRevenues;
    @Column
    private Long otherOperatingExpenses;
    @Column
    private Long equityInvestmentEarnings;
    @Column
    private Long otherLongTermInvestmentEarnings;
    @Column
    private Long otherInterestRevenues;
    @Column
    private Long investmentFairValueAdjustments;
    @Column
    private Long interestExpenses;
    @Column
    private Long extraRevenues;
    @Column
    private Long extraExpenses;
    @Column
    private Long incomeBeforeIncomeTaxes;
    @Column
    private Long provisionForIncomeTaxes;
    @Column
    private Long incomeAfterIncomeTaxes;
    @Column
    private Long otherTaxes;
    @Column
    private Long extraDividends;
    @Column
    private Long netIncome;

}

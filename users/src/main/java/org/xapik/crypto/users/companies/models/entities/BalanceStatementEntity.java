package org.xapik.crypto.users.companies.models.entities;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "balance_statements")
public class BalanceStatementEntity {

    @Id
    @Column
    private Long balanceStatementFileId;

    @Column
    private Long statementId;

    @Column
    private Long cash;
    @Column
    private Long marketableSecurities;
    @Column
    private Long accountsReceivable;
    @Column
    private Long inventories;
    @Column
    private Long totalCurrentAssets;
    @Column
    private Long investments;
    @Column
    private Long fixedAssets;
    @Column
    private Long intangibleAssets;
    @Column
    private Long totalNonCurrentAssets;
    @Column
    private Long totalAssets;
    @Column
    private Long futureHousingRepairsPayments;
    @Column
    private Long currentLiabilities;
    @Column
    private Long nonCurrentLiabilities;
    @Column
    private Long provisions;
    @Column
    private Long equity;
    @Column
    private Long totalEquities;

}

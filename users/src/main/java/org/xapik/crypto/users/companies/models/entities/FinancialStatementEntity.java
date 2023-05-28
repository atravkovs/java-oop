package org.xapik.crypto.users.companies.models.entities;

import lombok.Data;
import org.hibernate.annotations.BatchSize;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Data
@Entity
@Table(name = "financial_statements")
public class FinancialStatementEntity {

    @Id
    @Column
    private Long statementFileId;

    @Column(name = "regcode")
    private Long regcode;

    @Column
    private Long statementYear;
    @Column
    private Date createdAt;
    @Column
    private Long employeeCount;
    @Column
    private String currency;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "statementId")
    @BatchSize(size = 999)
    private Set<IncomeStatementEntity> incomeStatementEntity;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "statementId")
    @BatchSize(size = 999)
    private Set<BalanceStatementEntity> balanceStatementEntity;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "statementId")
    @BatchSize(size = 999)
    private Set<CashFlowStatementEntity> cashFlowStatementEntity;

}

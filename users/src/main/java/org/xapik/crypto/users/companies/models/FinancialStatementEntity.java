package org.xapik.crypto.users.companies.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

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

    @OneToMany(mappedBy = "statementId")
    private Set<IncomeStatementEntity> incomeStatementEntity;

    @OneToMany(mappedBy = "statementId")
    private Set<BalanceStatementEntity> balanceStatementEntity;

    @OneToMany(mappedBy = "statementId")
    private Set<CashFlowStatementEntity> cashFlowStatementEntity;

}

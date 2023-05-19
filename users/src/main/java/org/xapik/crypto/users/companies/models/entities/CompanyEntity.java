package org.xapik.crypto.users.companies.models.entities;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Data
@Entity
@Table(name = "register")
public class CompanyEntity {

    @Id
    @Column
    private Long regcode;

    @Column
    private String sepa;

    @Column
    private String name;

    @Column
    private String regtype;

    @Column
    private String companyType;

    @Column
    private Date registeredDate;

    @Column
    private Date terminatedDate;

    @Column
    private String address;

    @Column
    private Integer postalIndex;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "regcode")
    private Set<FinancialStatementEntity> financialStatements;

}

package org.xapik.crypto.users.companies.models;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

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
}

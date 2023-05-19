package org.xapik.crypto.users.companies.models.entities;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "company_type")
public class CompanyTypeEntity {

    @Id
    @Column
    private String code;

    @Column
    private String text;

}

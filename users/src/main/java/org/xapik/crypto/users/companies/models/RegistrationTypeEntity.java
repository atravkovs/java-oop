package org.xapik.crypto.users.companies.models;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "reg_type")
public class RegistrationTypeEntity {

    @Id
    @Column
    private String code;

    @Column
    private String text;

}

package org.xapik.crypto.users.companies.models.entities;

import lombok.Data;
import org.hibernate.annotations.BatchSize;

import javax.persistence.*;
import java.util.Set;

@Data
@Entity
@Table(name = "company_set")
public class CompanySetEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long setId;

    @Column
    private String userEmail;

    @Column
    private String name;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "company_set_companies", joinColumns = @JoinColumn(name = "set_id"), inverseJoinColumns = @JoinColumn(name = "regcode"))
    @BatchSize(size = 999)
    private Set<CompanyEntity> companies;

}

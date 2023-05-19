package org.xapik.crypto.users.companies;

import org.springframework.data.jpa.repository.JpaRepository;
import org.xapik.crypto.users.companies.models.entities.CompanyTypeEntity;

public interface CompanyTypeRepository extends JpaRepository<CompanyTypeEntity, String> {
}

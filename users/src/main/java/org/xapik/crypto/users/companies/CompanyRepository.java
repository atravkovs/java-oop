package org.xapik.crypto.users.companies;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.xapik.crypto.users.companies.models.CompanyEntity;


public interface CompanyRepository extends JpaRepository<CompanyEntity, Long> {

    Page<CompanyEntity> findAllByNameIsLike(Pageable page, String name);

}

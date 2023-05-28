package org.xapik.crypto.users.companies;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.xapik.crypto.users.companies.models.entities.CompanySetEntity;

public interface CompanySetRepository extends JpaRepository<CompanySetEntity, Long>, JpaSpecificationExecutor<CompanySetEntity> {
    interface Specs {
        static Specification<CompanySetEntity> ownedByUser(String email) {
            return (set, cq, cb) -> cb.equal(set.get("userEmail"), email);
        }
    }
}

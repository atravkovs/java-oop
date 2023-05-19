package org.xapik.crypto.users.companies;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.relational.core.sql.In;
import org.xapik.crypto.users.companies.models.RangeDto;
import org.xapik.crypto.users.companies.models.entities.CompanyEntity;


public interface CompanyRepository extends JpaRepository<CompanyEntity, Long>, JpaSpecificationExecutor<CompanyEntity> {

    interface Specs {
        static Specification<CompanyEntity> containsRegcode(String regcode) {
            return (company, cq, cb) -> cb.like(company.get("sepa"), "%" + regcode + "%");
        }

        static Specification<CompanyEntity> containsName(String name) {
            return (company, cq, cb) -> cb.like(company.get("name"), "%" + name + "%");
        }

        static Specification<CompanyEntity> isActive(Boolean isActive) {
            return (company, cq, cb) -> {
                if (isActive) {
                    return cb.isNull(company.get("terminatedDate"));
                }

                return cb.isNotNull(company.get("terminatedDate"));
            };
        }

        static Specification<CompanyEntity> hasCompanyType(String companyType) {
            return (company, cq, cb) -> cb.equal(company.get("companyType"), companyType);
        }

        static Specification<CompanyEntity> hasEmployeesInRange(RangeDto employeeRange) {
            return (company, cq, cb) -> {
                if (employeeRange.getTo() != 0) {
                    return cb.between(company.join("financialStatements").get("employeeCount"), employeeRange.getFrom(), employeeRange.getTo());
                }

                return cb.greaterThan(company.join("financialStatements").get("employeeCount"), employeeRange.getFrom());
            };
        }

        static Specification<CompanyEntity> hasIncomeInRange(RangeDto incomeRange) {
            return (company, cq, cb) -> {
                if (incomeRange.getTo() != 0) {
                    return cb.between(company.join("financialStatements").join("incomeStatementEntity").get("netIncome"), incomeRange.getFrom(), incomeRange.getTo());
                }

                return cb.greaterThan(company.join("financialStatements").join("incomeStatementEntity").get("netIncome"), incomeRange.getFrom());
            };
        }
    }

}

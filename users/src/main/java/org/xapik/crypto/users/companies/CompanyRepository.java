package org.xapik.crypto.users.companies;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.xapik.crypto.users.companies.models.dtos.RangeDto;
import org.xapik.crypto.users.companies.models.entities.CompanyEntity;



public interface CompanyRepository extends JpaRepository<CompanyEntity, Long>, JpaSpecificationExecutor<CompanyEntity> {

    @Query("""
            select c from CompanyEntity c
            INNER JOIN FinancialStatementEntity f
                ON f.regcode = c.regcode
            WHERE f.statementYear = :year
            ORDER BY f.employeeCount DESC""")
    Page<CompanyEntity> findTopByEmployeeCount(Pageable pageable, Long year);

    @Query("""
            select c from CompanyEntity c
            INNER JOIN FinancialStatementEntity f
                ON f.regcode = c.regcode
            INNER JOIN IncomeStatementEntity  i
                ON i.statementId = f.statementFileId
            WHERE f.statementYear = :year
            GROUP BY c
            ORDER BY i.netIncome DESC""")
    Page<CompanyEntity> findTopByNetIncome(Pageable pageable, Long year);

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

        static Specification<CompanyEntity> financialStatementCountAbove(Long greaterThan) {
            return (company, cq, cb) -> {
                var q2 = cq.subquery(Long.class);

                return cb.gt(q2.select(cb.count(q2.correlate(company).join("financialStatements"))), greaterThan);
            };
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

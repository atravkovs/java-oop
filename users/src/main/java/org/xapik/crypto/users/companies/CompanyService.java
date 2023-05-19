package org.xapik.crypto.users.companies;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.xapik.crypto.users.companies.models.dtos.CompanyQueryDto;
import org.xapik.crypto.users.companies.models.entities.CompanyEntity;
import org.xapik.crypto.users.companies.models.exceptions.CompanyNotFoundException;
import org.xapik.crypto.users.companies.models.dtos.CompanySimpleDto;
import org.xapik.crypto.users.companies.models.comparison.CompanyDatasetDto;
import org.xapik.crypto.users.companies.models.comparison.ComparisonDto;
import org.xapik.crypto.users.companies.models.entities.CompanyTypeEntity;
import org.xapik.crypto.users.companies.models.exceptions.CompanyTopTypeNotRecognizedException;
import org.xapik.crypto.users.comparison.DatasetType;
import org.xapik.crypto.users.comparison.GenerateDatasetFactory;
import org.xapik.crypto.users.comparison.IGenerateDataset;
import org.xapik.crypto.users.tops.CompanyTopFactory;
import org.xapik.crypto.users.tops.CompanyTopType;

import static org.springframework.data.jpa.domain.Specification.where;
import static org.xapik.crypto.users.companies.CompanyRepository.Specs.*;

import java.util.List;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class CompanyService {

    private final CompanyRepository companyRepository;
    private final GenerateDatasetFactory datasetFactory;
    private final CompanyTypeRepository companyTypeRepository;
    private final CompanyTopFactory companyTopFactory;

    public Page<CompanySimpleDto> getCompanies(CompanyQueryDto companyQuery) {
        var pageable = Pageable.ofSize(companyQuery.getPageSize()).withPage(companyQuery.getPageNumber());

        Specification<CompanyEntity> query = where(null);

        if (companyQuery.getSearch() != null) {
            query = query.and(
                    containsRegcode(companyQuery.getSearch())
                            .or(containsName(companyQuery.getSearch()))
            );
        }

        if (companyQuery.getActiveCompanies() != null && companyQuery.getActiveCompanies()) {
            query = query.and(isActive(true));
        }

        if (companyQuery.getHasStats() != null && companyQuery.getHasStats()) {
            query = query.and(financialStatementCountAbove(1L));
        }

        if (companyQuery.getCompanyType() != null && !companyQuery.getCompanyType().equals("ALL")) {
            query = query.and(hasCompanyType(companyQuery.getCompanyType()));
        }

        var employeeRange = companyQuery.getEmployeeRange();
        if (employeeRange.getFrom() != 0 || employeeRange.getTo() != 0) {
            query = query.and(hasEmployeesInRange(employeeRange));
        }

        var incomeRange = companyQuery.getIncomeRange();
        if (incomeRange.getFrom() != 0 || incomeRange.getTo() != 0) {
            query = query.and(hasIncomeInRange(incomeRange));
        }

        Page<CompanyEntity> companies = this.companyRepository.findAll(query, pageable);

        return companies.map(CompanySimpleDto::fromCompanyEntity);
    }

    public CompanyEntity getCompanyDetails(Long regcode) {
        return this.companyRepository.findById(regcode).orElseThrow(() -> new CompanyNotFoundException(regcode));
    }

    public ComparisonDto compareCompanies(List<Long> regcodes) {
        List<CompanyEntity> companies = regcodes.stream().map(this::getCompanyDetails).toList();

        ComparisonDto comparisonDto = new ComparisonDto();
        comparisonDto.setEmployeeCount(mapCompaniesToDataset(companies, DatasetType.EMPLOYEE_COUNT));
        comparisonDto.setIncomeBeforeTaxes(mapCompaniesToDataset(companies, DatasetType.INCOME_BEFORE_TAXES));

        return comparisonDto;
    }

    public List<CompanyEntity> getTopCompanies(String category, Long year) {
        try {
            CompanyTopType companyTopType = CompanyTopType.valueOf(category.toUpperCase());
            var topFactory = companyTopFactory.makeCompanyTop(companyTopType);
            return topFactory.getCompanyTop(year);
        } catch (IllegalArgumentException e) {
            throw new CompanyTopTypeNotRecognizedException(category);
        }
    }

    public List<CompanyTypeEntity> getCompanyTypes() {
        return companyTypeRepository.findAll();
    }

    private List<CompanyDatasetDto> mapCompaniesToDataset(List<CompanyEntity> companyEntities, DatasetType datasetType) {
        return companyEntities.stream().map(company -> mapCompanyToDataset(company, datasetType)).toList();
    }

    private CompanyDatasetDto mapCompanyToDataset(CompanyEntity company, DatasetType datasetType) {
        IGenerateDataset datasetBuilder = this.datasetFactory.makeDatasetBuilder(datasetType);

        var companyDataset = new CompanyDatasetDto();
        companyDataset.setTitle(company.getName());
        companyDataset.setData(datasetBuilder.generateDataset(company));

        return companyDataset;
    }


}

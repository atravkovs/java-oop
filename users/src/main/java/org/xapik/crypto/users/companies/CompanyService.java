package org.xapik.crypto.users.companies;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.xapik.crypto.users.companies.models.dtos.CompanyQueryDto;
import org.xapik.crypto.users.companies.models.dtos.CompanySetDto;
import org.xapik.crypto.users.companies.models.dtos.CompanySetSimpleDto;
import org.xapik.crypto.users.companies.models.entities.CompanyEntity;
import org.xapik.crypto.users.companies.models.entities.CompanySetEntity;
import org.xapik.crypto.users.companies.models.exceptions.CompanyNotFoundException;
import org.xapik.crypto.users.companies.models.dtos.CompanySimpleDto;
import org.xapik.crypto.users.companies.models.comparison.CompanyDatasetDto;
import org.xapik.crypto.users.companies.models.comparison.ComparisonDto;
import org.xapik.crypto.users.companies.models.entities.CompanyTypeEntity;
import org.xapik.crypto.users.companies.models.exceptions.CompanySetException;
import org.xapik.crypto.users.companies.models.exceptions.CompanyTopTypeNotRecognizedException;
import org.xapik.crypto.users.companies.models.requests.CompanySetCreateRequest;
import org.xapik.crypto.users.comparison.DatasetType;
import org.xapik.crypto.users.comparison.GenerateDatasetFactory;
import org.xapik.crypto.users.comparison.IGenerateDataset;
import org.xapik.crypto.users.tops.CompanyTopFactory;
import org.xapik.crypto.users.tops.CompanyTopType;

import static org.springframework.data.jpa.domain.Specification.where;
import static org.xapik.crypto.users.companies.CompanyRepository.Specs.*;
import static org.xapik.crypto.users.companies.CompanySetRepository.Specs.*;

import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class CompanyService {

    private final CompanyRepository companyRepository;
    private final GenerateDatasetFactory datasetFactory;
    private final CompanyTypeRepository companyTypeRepository;
    private final CompanyTopFactory companyTopFactory;
    private final CompanySetRepository companySetRepository;

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

        var postIndexes = companyQuery.getPostIndexes();
        if (postIndexes != null && !postIndexes.isEmpty()) {
            Specification<CompanyEntity> subquery = where(null);
            for (String postIndex : postIndexes) {
                subquery = subquery.or(hasPostIndexIn(postIndex));
            }
            query = query.and(subquery);
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


    public Page<CompanySetDto> getSetPage(Integer page, Integer pageSize, String userEmail) {
        var pageable = Pageable.ofSize(pageSize).withPage(page);
        var query = where(ownedByUser(userEmail));
        var sets = this.companySetRepository.findAll(query, pageable);
        return sets.map(CompanySetDto::fromCompanySetEntity);
    }

    public List<CompanySetSimpleDto> getAllSets(String userEmail) {
        var query = where(ownedByUser(userEmail));
        var sets = this.companySetRepository.findAll(query);
        return sets.stream().map(CompanySetSimpleDto::fromCompanySetEntity).collect(Collectors.toList());
    }

    public CompanySetDto createSet(CompanySetCreateRequest request, String email) {
        var companies = companyRepository.findAllById(request.getRegCodes());
        var set = new CompanySetEntity();
        set.setName(request.getName());
        set.setCompanies(new HashSet<>(companies));
        set.setUserEmail(email);

        var entity = companySetRepository.save(set);
        return CompanySetDto.fromCompanySetEntity(entity);
    }

    public CompanySetDto addCompanyToSet(Long setId, Long regCode, String userEmail) {
        var existingSet = getUserSetById(setId, userEmail);
        if (existingSet.getCompanies().stream().anyMatch(x -> x.getRegcode().equals(regCode))) {
            throw new CompanySetException(CompanySetException.companyAlreadyInSetMsg);
        }
        var company = this.companyRepository.findById(regCode).orElseThrow(() -> new CompanyNotFoundException(regCode));
        existingSet.getCompanies().add(company);

        var entity = this.companySetRepository.save(existingSet);
        return CompanySetDto.fromCompanySetEntity(entity);
    }

    public CompanySetDto removeCompanyFromSet(Long setId, Long regCode, String userEmail) {
        var existingSet = getUserSetById(setId, userEmail);
        if (existingSet.getCompanies().stream().noneMatch(x -> x.getRegcode().equals(regCode))) {
            throw new CompanySetException(CompanySetException.companyNotInSetMsg);
        }

        var newCompanies = existingSet.getCompanies().stream().filter(x -> !x.getRegcode().equals(regCode)).collect(Collectors.toSet());
        existingSet.setCompanies(newCompanies);

        var entity = companySetRepository.save(existingSet);
        return CompanySetDto.fromCompanySetEntity(entity);
    }

    public void deleteCompanySet(Long setId, String userEmail) {
        var existingSet = getUserSetById(setId, userEmail);
        this.companySetRepository.delete(existingSet);
    }

    private CompanySetEntity getUserSetById(Long setId, String userEmail) {
        var maybeSet = companySetRepository.findById(setId);
        var existingSet = maybeSet.orElseThrow(() -> new CompanySetException(CompanySetException.setDoesNotExistMsg));
        if (!existingSet.getUserEmail().equals(userEmail)) {
            throw new CompanySetException(CompanySetException.setDoesNotExistMsg);
        }
        return existingSet;
    }
}

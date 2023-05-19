package org.xapik.crypto.users.companies;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.xapik.crypto.users.companies.models.CompanyEntity;
import org.xapik.crypto.users.companies.models.CompanyNotFoundException;
import org.xapik.crypto.users.companies.models.CompanySimpleDto;
import org.xapik.crypto.users.companies.models.comparison.CompanyDatasetDto;
import org.xapik.crypto.users.companies.models.comparison.ComparisonDto;
import org.xapik.crypto.users.companies.models.comparison.YearDataDto;
import org.xapik.crypto.users.comparison.DatasetType;
import org.xapik.crypto.users.comparison.GenerateDatasetFactory;
import org.xapik.crypto.users.comparison.IGenerateDataset;

import java.util.List;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;
    private final GenerateDatasetFactory datasetFactory;

    @Autowired
    public CompanyService(
            CompanyRepository companyRepository,
            GenerateDatasetFactory datasetFactory
    ) {
        this.companyRepository = companyRepository;
        this.datasetFactory = datasetFactory;
    }

    public Page<CompanySimpleDto> getCompanies(int pageNumber, int pageSize, String search) {
        var pageable = Pageable.ofSize(pageSize).withPage(pageNumber);
        var likeSearch = '%' + search + '%';

        if (search == null) {
            return this.companyRepository.findAll(pageable).map(CompanySimpleDto::fromCompanyEntity);
        }

        return this.companyRepository.findAllByNameIsLike(pageable, likeSearch).map(CompanySimpleDto::fromCompanyEntity);
    }

    public CompanyEntity getCompanyDetails(Long regcode) {
        return this.companyRepository.findById(regcode).orElseThrow(() -> new CompanyNotFoundException(regcode));
    }

    public ComparisonDto compareCompanies(List<Long> regcodes) {
        List<CompanyEntity> companies = regcodes.stream()
                .map(this::getCompanyDetails)
                .toList();

        ComparisonDto comparisonDto = new ComparisonDto();
        comparisonDto.setEmployeeCount(mapCompaniesToDataset(companies, DatasetType.EMPLOYEE_COUNT));
        comparisonDto.setIncomeBeforeTaxes(mapCompaniesToDataset(companies, DatasetType.INCOME_BEFORE_TAXES));

        return comparisonDto;
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

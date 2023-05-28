package org.xapik.crypto.users.companies;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.xapik.crypto.users.companies.models.comparison.YearDataDto;
import org.xapik.crypto.users.companies.models.entities.CompanyEntity;
import org.xapik.crypto.users.companies.models.entities.CompanyTypeEntity;
import org.xapik.crypto.users.companies.models.exceptions.CompanyNotFoundException;
import org.xapik.crypto.users.companies.models.exceptions.CompanyTopTypeNotRecognizedException;
import org.xapik.crypto.users.comparison.DatasetType;
import org.xapik.crypto.users.comparison.GenerateDatasetFactory;
import org.xapik.crypto.users.comparison.IGenerateDataset;
import org.xapik.crypto.users.tops.CompanyTopFactory;
import org.xapik.crypto.users.tops.CompanyTopType;
import org.xapik.crypto.users.tops.ICompanyTop;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.*;


@SpringBootTest
class CompanyServiceTest {


    @MockBean
    private CompanyRepository companyRepository;
    @MockBean
    private GenerateDatasetFactory datasetFactory;
    @MockBean
    private CompanyTypeRepository companyTypeRepository;
    @MockBean
    private CompanyTopFactory companyTopFactory;

    @Autowired
    private CompanyService companyService;

    @Test
    void getCompanyDetails() {
        var mockCompany = mockCompanyEntity();
        given(companyRepository.findById(anyLong())).willReturn(Optional.of(mockCompany));

        var company = companyService.getCompanyDetails(1234L);

        assertEquals(mockCompany, company);
    }

    @Test
    void getCompanyDetails_Exception() {
        given(companyRepository.findById(anyLong())).willReturn(Optional.empty());

        assertThrows(CompanyNotFoundException.class, () -> {
            companyService.getCompanyDetails(1234L);
        });
    }

    @Test
    void compareCompanies() {
        var mockCompany = mockCompanyEntity();
        given(companyRepository.findById(anyLong())).willReturn(Optional.of(mockCompany));
        given(datasetFactory.makeDatasetBuilder(any(DatasetType.class))).willReturn(new MockDataset());

        var comparedCompanies = companyService.compareCompanies(List.of(1234L));

        assertEquals(1, comparedCompanies.getEmployeeCount().size());
        assertEquals(1, comparedCompanies.getIncomeBeforeTaxes().size());
    }

    @Test
    void getTopCompanies() {
        given(companyTopFactory.makeCompanyTop(any(CompanyTopType.class))).willReturn(new MockTop());

        var topCompanies = companyService.getTopCompanies("employee", 2020L);

        assertEquals(0, topCompanies.size());
    }

    @Test
    void getTopCompanies_Exception() {
        given(companyTopFactory.makeCompanyTop(any(CompanyTopType.class))).willReturn(new MockTop());

        assertThrows(CompanyTopTypeNotRecognizedException.class, () -> {
          companyService.getTopCompanies("employeezz", 2020L);
        });
    }

    @Test
    void getCompanyTypes() {
        given(companyTypeRepository.findAll()).willReturn(List.of(mockCompanyTypeEntity()));

        var companyTypes = companyService.getCompanyTypes();

        assertIterableEquals(List.of(mockCompanyTypeEntity()), companyTypes);
    }

    private CompanyEntity mockCompanyEntity() {
        CompanyEntity company = new CompanyEntity();
        company.setRegcode(12321L);
        company.setSepa("2342234");
        company.setName("Test Company");
        company.setRegtype("SIA");
        company.setCompanyType("SIA");
        company.setRegisteredDate(new Date());
        company.setTerminatedDate(null);
        company.setAddress("Riga");
        company.setPostalIndex(1088);

        return company;
    }

    private CompanyTypeEntity mockCompanyTypeEntity() {
        CompanyTypeEntity companyTypeEntity = new CompanyTypeEntity();
        companyTypeEntity.setCode("TEST");
        companyTypeEntity.setText("Test");

        return companyTypeEntity;
    }

    private class MockDataset implements IGenerateDataset {

        @Override
        public List<YearDataDto> generateDataset(CompanyEntity company) {
            return List.of();
        }
    }

    private class MockTop implements ICompanyTop {

        @Override
        public List<CompanyEntity> getCompanyTop(Long year) {
            return List.of();
        }
    }
}
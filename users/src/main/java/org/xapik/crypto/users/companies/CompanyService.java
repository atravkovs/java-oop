package org.xapik.crypto.users.companies;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.xapik.crypto.users.companies.models.CompanyEntity;
import org.xapik.crypto.users.companies.models.CompanyNotFoundException;
import org.xapik.crypto.users.companies.models.CompanySimpleDto;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;

    @Autowired
    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
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

}

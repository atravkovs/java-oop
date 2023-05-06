package org.xapik.crypto.users.companies;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.xapik.crypto.users.companies.models.CompanyEntity;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;

    @Autowired
    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    public Page<CompanyEntity> getCompanies(int pageNumber, int pageSize, String search) {
        var pageable = Pageable.ofSize(pageSize).withPage(pageNumber);
        var likeSearch = '%' + search + '%';

        if (search == null) {
            return this.companyRepository.findAll(pageable);
        }

        return this.companyRepository.findAllByNameIsLike(pageable, likeSearch);
    }

}

package org.xapik.crypto.users.tops;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.xapik.crypto.users.companies.CompanyRepository;
import org.xapik.crypto.users.companies.models.entities.CompanyEntity;

import java.util.List;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class IncomeCompanyTop implements ICompanyTop {

    private final CompanyRepository companyRepository;

    @Override
    public List<CompanyEntity> getCompanyTop(Long year) {
        var pageable = Pageable.ofSize(25).withPage(0);

        return companyRepository.findTopByNetIncome(pageable, year).stream().toList();
    }
}

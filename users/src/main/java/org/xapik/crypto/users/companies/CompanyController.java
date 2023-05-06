package org.xapik.crypto.users.companies;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.xapik.crypto.users.companies.models.CompanyEntity;
import org.xapik.crypto.users.users.model.UserEntity;

@CrossOrigin
@RestController
public class CompanyController {

    private final CompanyService companyService;

    @Autowired
    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @GetMapping("/companies")
    public Page<CompanyEntity> getCompanies(@RequestParam(defaultValue = "0") Integer page,
                                            @RequestParam(defaultValue = "20") Integer pageSize,
                                            @RequestParam(required = false) String search) {
        return this.companyService.getCompanies(page, pageSize, search);
    }

}

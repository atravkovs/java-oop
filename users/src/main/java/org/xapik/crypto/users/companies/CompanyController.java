package org.xapik.crypto.users.companies;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import org.xapik.crypto.users.companies.models.CompanyQueryDto;
import org.xapik.crypto.users.companies.models.entities.CompanyEntity;
import org.xapik.crypto.users.companies.models.CompanySimpleDto;
import org.xapik.crypto.users.companies.models.comparison.ComparisonDto;
import org.xapik.crypto.users.companies.models.entities.CompanyTypeEntity;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(("/companies"))
public class CompanyController {

    private final CompanyService companyService;

    @Autowired
    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @GetMapping
    public Page<CompanySimpleDto> getCompanies(@RequestParam(defaultValue = "0") Integer page,
                                               @RequestParam(defaultValue = "20") Integer pageSize,
                                               @RequestParam(required = false) String search,
                                               @RequestParam(required = false) Boolean activeCompanies,
                                               @RequestParam(required = false) String companyType

    ) {
        CompanyQueryDto companyQueryDto = new CompanyQueryDto();
        companyQueryDto.setSearch(search);
        companyQueryDto.setPageSize(pageSize);
        companyQueryDto.setPageNumber(page);
        companyQueryDto.setActiveCompanies(activeCompanies);
        companyQueryDto.setCompanyType(companyType);

        return this.companyService.getCompanies(companyQueryDto);
    }

    @GetMapping("/{regcode}")
    public CompanyEntity getCompany(@PathVariable("regcode") Long regcode) {
        return this.companyService.getCompanyDetails(regcode);
    }

    @GetMapping("/compare")
    public ComparisonDto compareCompanies(@RequestParam List<Long> regcodes) {
        return this.companyService.compareCompanies(regcodes);
    }

    @GetMapping("/types")
    public List<CompanyTypeEntity> getCompanyTypes() {
        return this.companyService.getCompanyTypes();
    }

}

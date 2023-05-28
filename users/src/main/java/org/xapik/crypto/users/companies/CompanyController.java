package org.xapik.crypto.users.companies;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import org.xapik.crypto.users.companies.models.dtos.CompanyQueryDto;
import org.xapik.crypto.users.companies.models.dtos.RangeDto;
import org.xapik.crypto.users.companies.models.entities.CompanyEntity;
import org.xapik.crypto.users.companies.models.dtos.CompanySimpleDto;
import org.xapik.crypto.users.companies.models.comparison.ComparisonDto;
import org.xapik.crypto.users.companies.models.entities.CompanyTypeEntity;

import java.util.List;
import java.util.Set;

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
                                               @RequestParam(required = false) Boolean hasStats,
                                               @RequestParam(required = false) String companyType,
                                               @RequestParam(defaultValue = "0") Integer employeeFrom,
                                               @RequestParam(defaultValue = "0") Integer employeeTo,
                                               @RequestParam(defaultValue = "0") Integer incomeFrom,
                                               @RequestParam(defaultValue = "0") Integer incomeTo,
                                               @RequestParam(required = false) List<String> postIndexes
    ) {
        CompanyQueryDto companyQueryDto = new CompanyQueryDto();
        companyQueryDto.setSearch(search);
        companyQueryDto.setPageSize(pageSize);
        companyQueryDto.setPageNumber(page);
        companyQueryDto.setActiveCompanies(activeCompanies);
        companyQueryDto.setCompanyType(companyType);
        companyQueryDto.setHasStats(hasStats);
        companyQueryDto.setEmployeeRange(new RangeDto(employeeFrom, employeeTo));
        companyQueryDto.setIncomeRange(new RangeDto(incomeFrom, incomeTo));
        companyQueryDto.setPostIndexes(postIndexes);

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

    @GetMapping("/top/{category}/{year}")
    public List<CompanyEntity> getTopCompanies(@PathVariable() String category, @PathVariable() Long year) {
        return this.companyService.getTopCompanies(category, year);
    }

}

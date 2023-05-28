package org.xapik.crypto.users.companies;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.xapik.crypto.users.companies.models.dtos.*;
import org.xapik.crypto.users.companies.models.entities.CompanyEntity;
import org.xapik.crypto.users.companies.models.comparison.ComparisonDto;
import org.xapik.crypto.users.companies.models.entities.CompanyTypeEntity;
import org.xapik.crypto.users.companies.models.exceptions.CompanySetException;
import org.xapik.crypto.users.companies.models.requests.CompanySetAddCompanyRequest;
import org.xapik.crypto.users.companies.models.requests.CompanySetCreateRequest;
import org.xapik.crypto.users.users.model.GenericError;

import javax.validation.Valid;
import java.security.Principal;
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

    @GetMapping("/sets")
    public Page<CompanySetDto> getUserSets(Principal principal, @RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "20") Integer pageSize) {
        return this.companyService.getSetPage(page, pageSize, principal.getName());
    }

    @GetMapping("/sets/fullList")
    public List<CompanySetSimpleDto> getAllUserSets(Principal principal) {
        return this.companyService.getAllSets(principal.getName());
    }

    @PostMapping("/sets/create")
    public CompanySetDto saveUser(Principal principal, @Valid @RequestBody CompanySetCreateRequest companySet) {
        return this.companyService.createSet(companySet, principal.getName());
    }

    @PutMapping("/sets/addCompany")
    public ResponseEntity<?> addCompanyToSet(Principal principal, @Valid @RequestBody CompanySetAddCompanyRequest request) {
        try {
            return ResponseEntity.ok(this.companyService.addCompanyToSet(request.getSetId(), request.getRegCode(), principal.getName()));
        } catch (CompanySetException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new GenericError(e.getLocalizedMessage()));
        }
    }

    @DeleteMapping("/sets/{setId}/{regCode}")
    public ResponseEntity<?> removeCompanyFromSet(Principal principal, @PathVariable("setId") Long setId, @PathVariable("regCode") Long regCode) {
        try {
            return ResponseEntity.ok(this.companyService.removeCompanyFromSet(setId, regCode, principal.getName()));
        } catch (CompanySetException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new GenericError(e.getLocalizedMessage()));
        }
    }

    @DeleteMapping("/sets/{setId}")
    public ResponseEntity<?> deleteCompanySet(Principal principal, @PathVariable("setId") Long setId) {
        try {
            this.companyService.deleteCompanySet(setId, principal.getName());
            return ResponseEntity.ok(null);
        } catch (CompanySetException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new GenericError(e.getLocalizedMessage()));
        }
    }
}

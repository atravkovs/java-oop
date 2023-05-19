package org.xapik.crypto.users.companies.models;

import lombok.Data;

@Data
public class CompanyQueryDto {

    private Integer pageNumber;
    private Integer pageSize;
    private String search;
    private Boolean activeCompanies;
    private Boolean hasStats;
    private String companyType;
    private RangeDto employeeRange;
    private RangeDto incomeRange;

}

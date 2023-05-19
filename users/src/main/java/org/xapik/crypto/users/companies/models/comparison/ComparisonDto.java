package org.xapik.crypto.users.companies.models.comparison;

import lombok.Data;

import java.util.List;

@Data
public class ComparisonDto {

    private List<CompanyDatasetDto> employeeCount;
    private List<CompanyDatasetDto> incomeBeforeTaxes;

}

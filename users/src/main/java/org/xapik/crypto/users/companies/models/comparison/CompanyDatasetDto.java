package org.xapik.crypto.users.companies.models.comparison;

import lombok.Data;

import java.util.List;

@Data
public class CompanyDatasetDto {

    private String title;
    private List<YearDataDto> data;

}

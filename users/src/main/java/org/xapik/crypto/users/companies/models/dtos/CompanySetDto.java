package org.xapik.crypto.users.companies.models.dtos;

import lombok.Data;
import org.xapik.crypto.users.companies.models.entities.CompanySetEntity;

import java.util.List;

@Data
public class CompanySetDto {

    private Long setId;
    private String name;
    private List<CompanySimpleDto> companies;

    public static CompanySetDto fromCompanySetEntity(CompanySetEntity companySetEntity) {
        CompanySetDto companySetDto = new CompanySetDto();
        companySetDto.setSetId(companySetEntity.getSetId());
        companySetDto.setName(companySetEntity.getName());
        companySetDto.setCompanies(companySetEntity.getCompanies().stream().map(CompanySimpleDto::fromCompanyEntity).toList());

        return companySetDto;
    }

}

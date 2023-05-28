package org.xapik.crypto.users.companies.models.dtos;

import lombok.Data;
import org.xapik.crypto.users.companies.models.entities.CompanySetEntity;

@Data
public class CompanySetSimpleDto {

    private Long setId;
    private String name;

    public static CompanySetSimpleDto fromCompanySetEntity(CompanySetEntity companySetEntity) {
        CompanySetSimpleDto companySetDto = new CompanySetSimpleDto();
        companySetDto.setSetId(companySetEntity.getSetId());
        companySetDto.setName(companySetEntity.getName());
        return companySetDto;
    }

}

package org.xapik.crypto.users.companies.models.dtos;

import lombok.Data;
import org.xapik.crypto.users.companies.models.entities.CompanyEntity;

import java.util.Date;

@Data
public class CompanySimpleDto {

    private Long regcode;
    private String sepa;
    private String name;
    private String regtype;
    private String companyType;
    private Date registeredDate;
    private Date terminatedDate;
    private String address;
    private Integer postalIndex;
    private Integer financialStatementCount;

    public static CompanySimpleDto fromCompanyEntity(CompanyEntity companyEntity) {
        CompanySimpleDto companySimpleDto = new CompanySimpleDto();
        companySimpleDto.setRegcode(companyEntity.getRegcode());
        companySimpleDto.setSepa(companyEntity.getSepa());
        companySimpleDto.setName(companyEntity.getName());
        companySimpleDto.setRegtype(companyEntity.getRegtype());
        companySimpleDto.setRegisteredDate(companyEntity.getRegisteredDate());
        companySimpleDto.setTerminatedDate(companyEntity.getTerminatedDate());
        companySimpleDto.setAddress(companyEntity.getAddress());
        companySimpleDto.setPostalIndex(companyEntity.getPostalIndex());
        companySimpleDto.setFinancialStatementCount(companyEntity.getFinancialStatements().size());

        return companySimpleDto;
    }

}

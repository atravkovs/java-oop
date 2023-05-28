package org.xapik.crypto.users.companies.models.requests;


import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class CompanySetAddCompanyRequest {
    @NotNull
    private Long setId;

    @NotNull
    private Long regCode;
}

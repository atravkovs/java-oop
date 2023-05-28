package org.xapik.crypto.users.companies.models.requests;


import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.*;
import java.util.List;

@Data
public class CompanySetCreateRequest {
    private List<Long> regCodes;

    @NotEmpty
    @Length(min = 3, max = 255)
    private String name;
}

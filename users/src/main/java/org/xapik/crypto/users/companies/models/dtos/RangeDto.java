package org.xapik.crypto.users.companies.models.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RangeDto {
    private Integer from;
    private Integer to;
}

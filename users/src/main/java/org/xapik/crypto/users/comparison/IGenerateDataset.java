package org.xapik.crypto.users.comparison;

import org.xapik.crypto.users.companies.models.entities.CompanyEntity;
import org.xapik.crypto.users.companies.models.comparison.YearDataDto;

import java.util.List;

public interface IGenerateDataset {

    List<YearDataDto> generateDataset(CompanyEntity company);

}

package org.xapik.crypto.users.tops;

import org.xapik.crypto.users.companies.models.entities.CompanyEntity;

import java.util.List;

public interface ICompanyTop {

    List<CompanyEntity> getCompanyTop(Long year);

}

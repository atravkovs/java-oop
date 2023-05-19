package org.xapik.crypto.users.tops;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class CompanyTopFactory {

    private final EmployeeCompanyTop employeeCompanyTop;
    private final IncomeCompanyTop incomeCompanyTop;

    public ICompanyTop makeCompanyTop(CompanyTopType companyTopType) {
        return switch (companyTopType) {
            case EMPLOYEE -> employeeCompanyTop;
            case INCOME -> incomeCompanyTop;
        };
    }

}

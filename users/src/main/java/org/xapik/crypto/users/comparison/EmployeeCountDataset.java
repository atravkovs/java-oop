package org.xapik.crypto.users.comparison;

import org.xapik.crypto.users.companies.models.CompanyEntity;
import org.xapik.crypto.users.companies.models.FinancialStatementEntity;
import org.xapik.crypto.users.companies.models.comparison.YearDataDto;

import java.util.List;

public class EmployeeCountDataset implements IGenerateDataset {
    @Override
    public List<YearDataDto> generateDataset(CompanyEntity company) {
        return company.getFinancialStatements()
                .stream()
                .map(this::mapFinancialStatementToYearData)
                .toList();
    }

    private YearDataDto mapFinancialStatementToYearData(FinancialStatementEntity financialStatement) {
        YearDataDto yearDataDto = new YearDataDto();
        yearDataDto.setYear(financialStatement.getStatementYear());
        yearDataDto.setValue(financialStatement.getEmployeeCount());

        return yearDataDto;
    }
}

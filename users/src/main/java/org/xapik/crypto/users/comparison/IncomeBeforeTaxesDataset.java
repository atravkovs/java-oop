package org.xapik.crypto.users.comparison;

import org.xapik.crypto.users.companies.models.CompanyEntity;
import org.xapik.crypto.users.companies.models.FinancialStatementEntity;
import org.xapik.crypto.users.companies.models.IncomeStatementEntity;
import org.xapik.crypto.users.companies.models.comparison.YearDataDto;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

public class IncomeBeforeTaxesDataset implements IGenerateDataset {
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

        Optional<IncomeStatementEntity> incomeStatementEntity = financialStatement.getIncomeStatementEntity()
                .stream()
                .findFirst();

        try {
            yearDataDto.setValue(
                    incomeStatementEntity
                            .orElseThrow()
                            .getIncomeBeforeIncomeTaxes()
            );
        } catch (NoSuchElementException e) {
            yearDataDto.setValue(null);
        }

        return yearDataDto;
    }
}

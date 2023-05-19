package org.xapik.crypto.users.comparison;

import org.springframework.stereotype.Service;

@Service
public class GenerateDatasetFactory {

    public IGenerateDataset makeDatasetBuilder(DatasetType datasetType) {
        return switch (datasetType) {
            case EMPLOYEE_COUNT -> new EmployeeCountDataset();
            case INCOME_BEFORE_TAXES -> new IncomeBeforeTaxesDataset();
        };
    }

}

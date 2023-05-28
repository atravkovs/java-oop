const fs = require("fs");
const { parse } = require("csv");

// statement_id;file_id;cash;marketable_securities;accounts_receivable;inventories;total_current_assets;investments;fixed_assets;intangible_assets;total_non_current_assets;total_assets;future_housing_repairs_payments;current_liabilities;non_current_liabilities;provisions;equity;total_equities

fs.createReadStream("./data/balance_sheets.csv")
  .pipe(parse({ delimiter: ";", from_line: 2 }))
  .on("data", function (row) {
    const [
      statement_id,
      file_id,
      cash,
      marketable_securities,
      accounts_receivable,
      inventories,
      total_current_assets,
      investments,
      fixed_assets,
      intangible_assets,
      total_non_current_assets,
      total_assets,
      future_housing_repairs_payments,
      current_liabilities,
      non_current_liabilities,
      provisions,
      equity,
      total_equities,
    ] = row;

    console.log([
      statement_id,
      cash,
      marketable_securities,
      accounts_receivable,
      inventories,
      total_current_assets,
      investments,
      fixed_assets,
      intangible_assets,
      total_non_current_assets,
      total_assets,
      future_housing_repairs_payments,
      current_liabilities,
      non_current_liabilities,
      provisions,
      equity,
      total_equities,
    ]);
  })
  .on("end", function () {
    console.log("finished");
  })
  .on("error", function (error) {
    console.log(error.message);
  });

const fs = require("fs");
const { parse } = require("csv");

// statement_id;file_id;net_turnover;by_nature_inventory_change;by_nature_long_term_investment_expenses;by_nature_other_operating_revenues;by_nature_material_expenses;by_nature_labour_expenses;by_nature_depreciation_expenses;by_function_cost_of_goods_sold;by_function_gross_profit;by_function_selling_expenses;by_function_administrative_expenses;by_function_other_operating_revenues;other_operating_expenses;equity_investment_earnings;other_long_term_investment_earnings;other_interest_revenues;investment_fair_value_adjustments;interest_expenses;extra_revenues;extra_expenses;income_before_income_taxes;provision_for_income_taxes;income_after_income_taxes;other_taxes;extra_dividends;net_income

fs.createReadStream("./data/income_statements.csv")
  .pipe(parse({ delimiter: ";", from_line: 2 }))
  .on("data", function (row) {
    const [
      statement_id,
      file_id,
      net_turnover,
      by_nature_inventory_change,
      by_nature_long_term_investment_expenses,
      by_nature_other_operating_revenues,
      by_nature_material_expenses,
      by_nature_labour_expenses,
      by_nature_depreciation_expenses,
      by_function_cost_of_goods_sold,
      by_function_gross_profit,
      by_function_selling_expenses,
      by_function_administrative_expenses,
      by_function_other_operating_revenues,
      other_operating_expenses,
      equity_investment_earnings,
      other_long_term_investment_earnings,
      other_interest_revenues,
      investment_fair_value_adjustments,
      interest_expenses,
      extra_revenues,
      extra_expenses,
      income_before_income_taxes,
      provision_for_income_taxes,
      income_after_income_taxes,
      other_taxes,
      extra_dividends,
      net_income,
    ] = row;

    console.log([
      statement_id,
      net_turnover,
      by_nature_inventory_change,
      by_nature_long_term_investment_expenses,
      by_nature_other_operating_revenues,
      by_nature_material_expenses,
      by_nature_labour_expenses,
      by_nature_depreciation_expenses,
      by_function_cost_of_goods_sold,
      by_function_gross_profit,
      by_function_selling_expenses,
      by_function_administrative_expenses,
      by_function_other_operating_revenues,
      other_operating_expenses,
      equity_investment_earnings,
      other_long_term_investment_earnings,
      other_interest_revenues,
      investment_fair_value_adjustments,
      interest_expenses,
      extra_revenues,
      extra_expenses,
      income_before_income_taxes,
      provision_for_income_taxes,
      income_after_income_taxes,
      other_taxes,
      extra_dividends,
      net_income,
    ]);
  })
  .on("end", function () {
    console.log("finished");
  })
  .on("error", function (error) {
    console.log(error.message);
  });

const fs = require("fs");
const { parse } = require("csv");

// statement_id;file_id;cfo_dm_cash_received_from_customers;cfo_dm_cash_paid_to_suppliers_employees;cfo_dm_other_cash_received_paid;cfo_dm_operating_cash_flow;cfo_dm_interest_paid;cfo_dm_income_taxes_paid;cfo_dm_extra_items_cash_flow;cfo_dm_net_operating_cash_flow;cfo_im_income_before_income_taxes;cfo_im_income_before_changes_in_working_capital;cfo_im_operating_cash_flow;cfo_im_interest_paid;cfo_im_income_taxes_paid;cfo_im_extra_items_cash_flow;cfo_im_net_operating_cash_flow;cfi_acquisition_of_stocks_shares;cfi_sale_proceeds_from_stocks_shares;cfi_acquisition_of_fixed_assets_intangible_assets;cfi_sale_proceeds_from_fixed_assets_intangible_assets;cfi_loans_made;cfi_repayments_of_loans_received;cfi_interest_received;cfi_dividends_received;cfi_net_investing_cash_flow;cff_proceeds_from_stocks_bonds_issuance_or_contributed_capital;cff_loans_received;cff_subsidies_grants_donations_received;cff_repayments_of_loans_made;cff_repayments_of_lease_obligations;cff_dividends_paid;cff_net_financing_cash_flow;effect_of_exchange_rate_change;net_increase;at_beginning_of_year;at_end_of_year

fs.createReadStream("./data/cash_flow_statements.csv")
  .pipe(parse({ delimiter: ";", from_line: 2 }))
  .on("data", function (row) {
    const [
      statement_id,
      file_id,
      cfo_dm_cash_received_from_customers,
      cfo_dm_cash_paid_to_suppliers_employees,
      cfo_dm_other_cash_received_paid,
      cfo_dm_operating_cash_flow,
      cfo_dm_interest_paid,
      cfo_dm_income_taxes_paid,
      cfo_dm_extra_items_cash_flow,
      cfo_dm_net_operating_cash_flow,
      cfo_im_income_before_income_taxes,
      cfo_im_income_before_changes_in_working_capital,
      cfo_im_operating_cash_flow,
      cfo_im_interest_paid,
      cfo_im_income_taxes_paid,
      cfo_im_extra_items_cash_flow,
      cfo_im_net_operating_cash_flow,
      cfi_acquisition_of_stocks_shares,
      cfi_sale_proceeds_from_stocks_shares,
      cfi_acquisition_of_fixed_assets_intangible_assets,
      cfi_sale_proceeds_from_fixed_assets_intangible_assets,
      cfi_loans_made,
      cfi_repayments_of_loans_received,
      cfi_interest_received,
      cfi_dividends_received,
      cfi_net_investing_cash_flow,
      cff_proceeds_from_stocks_bonds_issuance_or_contributed_capital,
      cff_loans_received,
      cff_subsidies_grants_donations_received,
      cff_repayments_of_loans_made,
      cff_repayments_of_lease_obligations,
      cff_dividends_paid,
      cff_net_financing_cash_flow,
      effect_of_exchange_rate_change,
      net_increase,
      at_beginning_of_year,
      at_end_of_year,
    ] = row;

    console.log([
      statement_id,
      cfo_dm_cash_received_from_customers,
      cfo_dm_cash_paid_to_suppliers_employees,
      cfo_dm_other_cash_received_paid,
      cfo_dm_operating_cash_flow,
      cfo_dm_interest_paid,
      cfo_dm_income_taxes_paid,
      cfo_dm_extra_items_cash_flow,
      cfo_dm_net_operating_cash_flow,
      cfo_im_income_before_income_taxes,
      cfo_im_income_before_changes_in_working_capital,
      cfo_im_operating_cash_flow,
      cfo_im_interest_paid,
      cfo_im_income_taxes_paid,
      cfo_im_extra_items_cash_flow,
      cfo_im_net_operating_cash_flow,
      cfi_acquisition_of_stocks_shares,
      cfi_sale_proceeds_from_stocks_shares,
      cfi_acquisition_of_fixed_assets_intangible_assets,
      cfi_sale_proceeds_from_fixed_assets_intangible_assets,
      cfi_loans_made,
      cfi_repayments_of_loans_received,
      cfi_interest_received,
      cfi_dividends_received,
      cfi_net_investing_cash_flow,
      cff_proceeds_from_stocks_bonds_issuance_or_contributed_capital,
      cff_loans_received,
      cff_subsidies_grants_donations_received,
      cff_repayments_of_loans_made,
      cff_repayments_of_lease_obligations,
      cff_dividends_paid,
      cff_net_financing_cash_flow,
      effect_of_exchange_rate_change,
      net_increase,
      at_beginning_of_year,
      at_end_of_year,
    ]);
  })
  .on("end", function () {
    console.log("finished");
  })
  .on("error", function (error) {
    console.log(error.message);
  });

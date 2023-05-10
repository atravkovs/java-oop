create table financial_statements
(
    statement_file_id bigint primary key,
    regcode           bigint    not null,
    statement_year    int       not null,
    created_at        timestamp not null,
    employee_count    int       null,
    currency          nchar(3)  not null,
    foreign key (regcode) references register (regcode)
);

/*They store it as integer, so we can also store it as int instead of money which is a floating point number
-they have net turonver as 0 by default; we could aslo do so OR have it as null
-maybe not all of them need to be bigint*/
create table income_statements
(
    statement_id                            bigint not null,
    income_statement_file_id                bigint primary key,
    net_turnover                            bigint null,
    by_nature_inventory_change              bigint null,
    by_nature_long_term_investment_expenses bigint null,
    by_nature_other_operating_revenues      bigint null,
    by_nature_material_expenses             bigint null,
    by_nature_labour_expenses               bigint null,
    by_nature_depreciation_expenses         bigint null,
    by_function_cost_of_goods_sold          bigint null,
    by_function_gross_profit                bigint null,
    by_function_selling_expenses            bigint null,
    by_function_administrative_expenses     bigint null,
    by_function_other_operating_revenues    bigint null,
    other_operating_expenses                bigint null,
    equity_investment_earnings              bigint null,
    other_long_term_investment_earnings     bigint null,
    other_interest_revenues                 bigint null,
    investment_fair_value_adjustments       bigint null,
    interest_expenses                       bigint null,
    extra_revenues                          bigint null,
    extra_expenses                          bigint null,
    income_before_income_taxes              bigint null,
    provision_for_income_taxes              bigint null,
    income_after_income_taxes               bigint null,
    other_taxes                             bigint null,
    extra_dividends                         bigint null,
    net_income                              bigint null,
    foreign key (statement_id) references financial_statements (statement_file_id)
);

create table balance_statements
(
    statement_id                    bigint not null,
    balance_statement_file_id       bigint primary key,
    cash                            bigint null,
    marketable_securities           bigint null,
    accounts_receivable             bigint null,
    inventories                     bigint null,
    total_current_assets            bigint null,
    investments                     bigint null,
    fixed_assets                    bigint null,
    intangible_assets               bigint null,
    total_non_current_assets        bigint null,
    total_assets                    bigint null,
    future_housing_repairs_payments bigint null,
    current_liabilities             bigint null,
    non_current_liabilities         bigint null,
    provisions                      bigint null,
    equity                          bigint null,
    total_equities                  bigint null,
    foreign key (statement_id) references financial_statements (statement_file_id)
);

create table cash_flow_statements
(
    statement_id                                                   bigint not null,
    cash_flow_statement_file_id                                    bigint primary key,
    cfo_dm_cash_received_from_customers                            bigint null,
    cfo_dm_cash_paid_to_suppliers_employees                        bigint null,
    cfo_dm_other_cash_received_paid                                bigint null,
    cfo_dm_operating_cash_flow                                     bigint null,
    cfo_dm_interest_paid                                           bigint null,
    cfo_dm_income_taxes_paid                                       bigint null,
    cfo_dm_extra_items_cash_flow                                   bigint null,
    cfo_dm_net_operating_cash_flow                                 bigint null,
    cfo_im_income_before_income_taxes                              bigint null,
    cfo_im_income_before_changes_in_working_capital                bigint null,
    cfo_im_operating_cash_flow                                     bigint null,
    cfo_im_interest_paid                                           bigint null,
    cfo_im_income_taxes_paid                                       bigint null,
    cfo_im_extra_items_cash_flow                                   bigint null,
    cfo_im_net_operating_cash_flow                                 bigint null,
    cfi_acquisition_of_stocks_shares                               bigint null,
    cfi_sale_proceeds_from_stocks_shares                           bigint null,
    cfi_acquisition_of_fixed_assets_intangible_assets              bigint null,
    cfi_sale_proceeds_from_fixed_assets_intangible_assets          bigint null,
    cfi_loans_made                                                 bigint null,
    cfi_repayments_of_loans_received                               bigint null,
    cfi_interest_received                                          bigint null,
    cfi_dividends_received                                         bigint null,
    cfi_net_investing_cash_flow                                    bigint null,
    cff_proceeds_from_stocks_bonds_issuance_or_contributed_capital bigint null,
    cff_loans_received                                             bigint null,
    cff_subsidies_grants_donations_received                        bigint null,
    cff_repayments_of_loans_made                                   bigint null,
    cff_repayments_of_lease_obligations                            bigint null,
    cff_dividends_paid                                             bigint null,
    cff_net_financing_cash_flow                                    bigint null,
    effect_of_exchange_rate_change                                 bigint null,
    net_increase                                                   bigint null,
    at_beginning_of_year                                           bigint null,
    at_end_of_year                                                 bigint null,
    foreign key (statement_id) references financial_statements (statement_file_id)
);
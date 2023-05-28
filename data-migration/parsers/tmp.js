const mysql = require("mysql");
const fs = require("fs");
const { parse } = require("csv");

// regcode;sepa;name;name_before_quotes;name_in_quotes;name_after_quotes;without_quotes;regtype;regtype_text;type;type_text;registered;terminated;closed;address;index;addressid;region;city;atvk;reregistration_term

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "users",
});

con.connect(function (err) {
  if (err) throw err;

  console.log("Connected!");

  let i = 0;
  let j = 0;

  const sql = `INSERT INTO balance_statements (
    statement_id,
    balance_statement_file_id,
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
    total_equities
    ) VALUES ?`;

  const values = [];

  fs.createReadStream("./data/balance_sheets.csv")
    .pipe(parse({ delimiter: ";", from_line: 2 }))
    .on("data", function (row) {
      const [
        statement_id,
        balance_statement_file_id,
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

      const value = [
        statement_id,
        balance_statement_file_id,
        cash || null,
        marketable_securities || null,
        accounts_receivable || null,
        inventories || null,
        total_current_assets || null,
        investments || null,
        fixed_assets || null,
        intangible_assets || null,
        total_non_current_assets || null,
        total_assets || null,
        future_housing_repairs_payments || null,
        current_liabilities || null,
        non_current_liabilities || null,
        provisions || null,
        equity || null,
        total_equities || null,
      ];

      i++;

      const valuesIndex = Math.ceil(i / 1000);
      if (!values[valuesIndex]) {
        values[valuesIndex] = [];
      }

      values[valuesIndex].push(value);

      if (i % 1000 === 0) {
        con.query(sql, [values[valuesIndex]], function (err, result) {
          if (err) throw err;
          j++;

          if (j % 10 === 0) {
            console.log(`${j}*1000 records processed`);
          }
        });
      }
    })
    .on("end", function () {
      console.log("finished");
    })
    .on("error", function (error) {
      console.log(error.message);
    });
});

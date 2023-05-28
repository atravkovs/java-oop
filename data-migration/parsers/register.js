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

  const sql =
    "INSERT INTO register (regcode, sepa, name, regtype, company_type, registered_date, terminated_date, address, postal_index) VALUES ?";

  const values = [];

  fs.createReadStream("./data/register.csv")
    .pipe(parse({ delimiter: ";", from_line: 2 }))
    .on("data", function (row) {
      const [
        regcode,
        sepa,
        name,
        name_before_quotes,
        name_in_quotes,
        name_after_quotes,
        without_quotes,
        regtype,
        regtype_text,
        type,
        type_text,
        registered,
        terminated,
        closed,
        address,
        index,
        addressid,
        region,
        city,
        atvk,
        reregistration_term,
      ] = row;

      const value = [
        regcode,
        !!sepa ? sepa : null,
        name,
        regtype,
        type,
        !!registered ? registered : null,
        !!terminated ? terminated : null,
        address,
        !!index ? index : null,
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

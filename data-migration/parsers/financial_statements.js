const fs = require("fs");
const { parse } = require("csv");

// id;file_id;legal_entity_registration_number;source_schema;source_type;year;year_started_on;year_ended_on;employees;rounded_to_nearest;currency;created_at

fs.createReadStream("./data/financial_statements.csv")
  .pipe(parse({ delimiter: ";", from_line: 2 }))
  .on("data", function (row) {
    const [
      id,
      file_id,
      legal_entity_registration_number,
      source_schema,
      source_type,
      year,
      year_started_on,
      year_ended_on,
      employees,
      rounded_to_nearest,
      currency,
      created_at,
    ] = row;

    console.log([id, legal_entity_registration_number, year, employees]);
  })
  .on("end", function () {
    console.log("finished");
  })
  .on("error", function (error) {
    console.log(error.message);
  });

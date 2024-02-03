import { connectKnex } from "./knex.mjs";

async function tableExists(tableName) {
  return connectKnex.schema.hasTable(tableName);
}

async function createTab(tableName, tableSpec) {
  const exists = await tableExists(tableName);
  if (exists) return;
  try {
    await connectKnex.schema.createTable(tableName, function (table) {
      table.increments("id").primary(); // auto-incrementing integer, primary key
      tableSpec.forEach((column) => {
        if (column.len) {
          table[column.columnType](column.columnName, column.len);
        } else {
          table[column.columnType](column.columnName);
        }
      });
    });
    console.log(`Table ${tableName} created successfully.`);
  } catch (error) {
    console.error(`Error creating table ${tableName}:`, error);
    throw error; // Rethrow the error to propagate it to the caller
  }
}

export async function handleTablesCreation() {
  const tableMeasurements = [
    { columnName: "temperature", columnType: "integer", len: null },
    {
      columnName: "pressure",
      columnType: "integer",
      len: null,
    },
    { columnName: "humidity", columnType: "integer", len: null },
    {
      columnName: "measurementDate",
      columnType: "string",
      len: 40,
    },
  ];
  const tablePhotos = [
    {
      columnName: "title",
      columnType: "string",
      len: 35,
    },
    {
      columnName: "date",
      columnType: "string",
      len: 40,
    },
  ];

  const tablesSpecs = [
    { tableName: "measurements", columnsSpec: tableMeasurements },
    {
      tableName: "measurements1",
      columnsSpec: tableMeasurements,
    },
    {
      tableName: "photos",
      columnsSpec: tablePhotos,
    },
  ];

  for (let tablesSpec of tablesSpecs) {
    try {
      await createTab(tablesSpec.tableName, tablesSpec.columnsSpec);
    } catch (error) {
      console.error(
        `Error handling table creation for ${tablesSpec.tableName}:`,
        error
      );
    }
  }
}

import db from "#db/client";
import seedEmployeeData from "#db/data";
import { createEmployee } from "#db/queries/employees";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  for (let i = 0; i < seedEmployeeData.length ; i++) {
    const employee = seedEmployeeData[i];
    await createEmployee({name : employee.name, birthday : employee.birthday, salary : employee.salary});
  }
}

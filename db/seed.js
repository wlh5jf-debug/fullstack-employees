import db from "#db/client";
import { createEmployee } from "#db/queries/employees"
await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  // TODO
  const employees = [
    { name: "Alice Johnson", birthday: "1985-02-14", salary: 72000 },
    { name: "Robert Smith", birthday: "1990-07-22", salary: 68000 },
    { name: "Maria Rodriguez", birthday: "1988-11-03", salary: 75000 },
    { name: "James Lee", birthday: "1992-04-18", salary: 64000 },
    { name: "Sofia Martinez", birthday: "1983-09-29", salary: 81000 },
    { name: "Daniel Kim", birthday: "1987-01-12", salary: 70000 },
    { name: "Emily Davis", birthday: "1995-06-07", salary: 59000 },
    { name: "Michael Brown", birthday: "1989-12-25", salary: 77000 },
    { name: "Isabella Wilson", birthday: "1993-03-16", salary: 65000 },
    { name: "William Thompson", birthday: "1984-08-30", salary: 83000 },
  ];

  for (const employee of employees) {
    await createEmployee(employee);
  }

}

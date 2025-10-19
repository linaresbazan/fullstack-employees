import db from "#db/client";

/** @returns the employee created according to the provided details */
export async function createEmployee({ name, birthday, salary }) {
  const sql = `
    INSERT INTO employees (name, birthday, salary) 
    VALUES ($1, $2, $3) RETURNING *`;
  const values = [name, birthday, salary];
  const { rows: employee } = await db.query(sql, values);
  return employee[0];
}

// === Part 2 ===

/** @returns all employees */
export async function getEmployees() {
  const sql = `SELECT * FROM employees`;
  const { rows: employees } = await db.query(sql);
  return employees;
}

/**
 * @returns the employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function getEmployee(id) {
  const sql = `SELECT * FROM employees WHERE id = $1`;
  const values = [id];
  const { rows: employees } = await db.query(sql, values);
  if (!employees) return undefined;
  return employees[0];
}

/**
 * @returns the updated employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function updateEmployee({ id, name, birthday, salary }) {
  const sql = `UPDATE employees
    SET name = $1, birthday = $2, salary = $3
    WHERE id = $4
    RETURNING *`;
  const values = [name, birthday, salary, id];
  const { rows: employees } = await db.query(sql, values);
  if (!employees) return undefined;
  return employees[0];
}

/**
 * @returns the deleted employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function deleteEmployee(id) {
  const sql = `DELETE FROM employees WHERE id = $1 RETURNING *`;
  const values = [id];
  const { rows: employees } = await db.query(sql, values);
  if (!employees) return undefined;
  return employees[0];
}

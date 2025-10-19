import express from "express";
import { createEmployee, deleteEmployee, getEmployee, getEmployees, updateEmployee } from "#db/queries/employees";
const router = express.Router();
export default router;

router.get('/', async (req, res) => {
  const employees = await getEmployees();

  return res.status(200).send(employees);
});

router.post('/', async (req, res) => {
  if (!req.body) return res.status(400).send("Body is required");

  const { name, birthday, salary } = req.body;

  if (!name || !birthday || !salary) return res.status(400).send("Name, birthday, and salary are required.");

  const employee = await createEmployee({ name: name, birthday: birthday, salary: salary });
  return res.status(201).send(employee);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (id != parseInt(id) || id < 0) return res.status(400).send("The provided id is not a positive integer.");

  const employee = await getEmployee(id);
  if (!employee) return res.status(404).send("Employee does not exist");

  return res.status(200).send(employee);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (id != parseInt(id) || id < 0) return res.status(400).send("The provided id is not a positive integer.");

  const employee = await deleteEmployee(id);
  if (!employee) return res.status(404).send("Employee does not exist");

  return res.status(204).send("");
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const idNum = parseInt(id);

  if (id != parseInt(id) || id < 0) return res.status(400).send("The provided id is not a positive integer.");

  if (!req.body) return res.status(400).send("Body is required");

  const { name, birthday, salary } = req.body;

  if (!name || !birthday || !salary) return res.status(400).send("Name, birthday, and salary are required.");

  const employee = await updateEmployee({id: id, name: name, birthday: birthday, salary: salary});
  if (!employee) return res.status(404).send("Employee does not exist");

  return res.status(200).send(employee);
});
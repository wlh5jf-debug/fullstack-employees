import express from "express";
const router = express.Router();
export default router;

import { createEmployee, deleteEmployee, getEmployee, getEmployees, updateEmployee } from "#db/queries/employees"

router.get("/", async (req, res) => {
    const employees = await getEmployees();
    res.send(employees);
});

router.post("/", async (req, res) => {
    if (!req.body) return res.status(400).send("Request must have a body.");

    const { name, birthday, salary} = req.body;
    if (!name || !birthday || !salary)
        return res
       .status(400)
       .send("Request body must have: name, birthday, salary");

    const employee = await createEmployee({ name, birthday, salary });
    res.status(201).send(employee);
});

router.param("id", async (req, res, next, id) => {
    if (!/^\d+$/.test(id))
        return res.status(400).send("ID must be a positive integer.");

    const employee = await getEmployee(id);
    if (!employee) return res.status(404).send("Employee not found.");

    req.employee = employee;
    next();
});

router.get("/:id", (req,res) => {
    res.send(req.employee);
});

router.put("/:id", async (req, res) => {
    if (!req.body) return res.status(400).send("Request must have a body.");

    const {name, birthday, salary} = req.body;
     if (!name || !birthday || !salary)
        return res
       .status(400)
       .send("Request body must have: name, birthday, salary");

    const employee = await updateEmployee({
        id: req.employee.id,
        name,
        birthday,
        salary,
    });
    res.send(employee);
});

router.delete("/:id", async (req, res) => {
    await deleteEmployee(req.employee.id);
    res.sendStatus(204);
})

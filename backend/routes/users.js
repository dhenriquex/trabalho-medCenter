import express from "express";
import { addCliente, addMedico, deleteUser, getUsers, updateUser } from "../controllers/user.js";

const router = express.Router()

router.get("/", getUsers)

router.post("/medicos", addMedico)
router.post("/clientes",addCliente)

router.put("/:id", updateUser)

router.delete("/:id", deleteUser)

export default router
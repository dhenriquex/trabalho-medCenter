import express from "express";
import {  addCliente, 
  addMedico, 
  deleteUser, 
  buscarMedico,
  buscarCliente,
  updateUser  } from "../controllers/user.js";

const router = express.Router()

router.get("/medicos/busca", buscarMedico);
router.get("/clientes/busca", buscarCliente);

router.post("/medicos", addMedico)
router.post("/clientes",addCliente)

router.put("/:id", updateUser)

router.delete("/:id", deleteUser)

export default router
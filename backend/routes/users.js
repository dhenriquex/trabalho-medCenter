import express from "express";
import {  
  addCliente, 
  addMedico, 
  deleteUser, 
  buscarMedico,
  buscarCliente,
  updateUser,
  login,
  exames,
  consultas
} from "../controllers/user.js";

const router = express.Router();

router.post("/login", login);
router.get("/medicos/busca", buscarMedico);
router.get("/clientes/busca", buscarCliente);
router.get("/exames", exames);
router.get("/consultas", consultas);

router.post("/medicos", addMedico);
router.post("/clientes", addCliente);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
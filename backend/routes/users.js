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
  consultas,
  perfilCliente,
  autenticarToken,
  dashboardMedico,
} from "../controllers/user.js";

const router = express.Router();

router.post("/login", login);
router.get("/medicos/busca", buscarMedico);
router.get("/clientes/busca", buscarCliente);
router.get("/exames", exames);
router.get("/consultas", consultas);
router.get("/perfil-clientes", autenticarToken, perfilCliente);
router.get("/dashboard", autenticarToken, dashboardMedico);
router.post("/medicos", addMedico);
router.post("/clientes", addCliente);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;

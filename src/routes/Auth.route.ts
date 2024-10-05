import "reflect-metadata";
import { Router } from "express";
import AuthController from "../controller/Auth.controller";
import { authMiddleware } from "../middleware/Auth.middleware";
import PermissaoMiddleware from "../middleware/Permissao.middleware";

const router = Router();

router.post("/cadastrar", AuthController.cadastrar);
router.post("/entrar", AuthController.login);
router.post("/alterar-senha", authMiddleware, AuthController.atualizarSenha);
router.post("/permissao", AuthController.darPermissao);
router.get(
  "/info",
  authMiddleware,
  PermissaoMiddleware.setIdUsuario,
  AuthController.verInfo
);

export default router;

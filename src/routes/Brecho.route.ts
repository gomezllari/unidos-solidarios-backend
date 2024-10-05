import { Router } from "express";
import BrechoController from "../controller/Brecho.controller";
import { authMiddleware } from "../middleware/Auth.middleware";
import PermissaoMiddleware from "../middleware/Permissao.middleware";

const router = Router();

router.get("/", BrechoController.getRoupas);
router.put(
  "/:id",
  authMiddleware,
  PermissaoMiddleware.setIdUsuario,
  PermissaoMiddleware.validaPermissao,
  BrechoController.atualizaRoupa
);
router.post(
  "/",
  authMiddleware,
  PermissaoMiddleware.setIdUsuario,
  PermissaoMiddleware.validaPermissao,
  BrechoController.insereNovaRoupa
);
router.delete(
  "/:roupaId",
  authMiddleware,
  PermissaoMiddleware.setIdUsuario,
  PermissaoMiddleware.validaPermissao,
  BrechoController.removeRoupa
);
router.post(
  "/interesses/:roupaId",
  authMiddleware,
  PermissaoMiddleware.setIdUsuario,
  BrechoController.insereInteresse
);
router.delete(
  "/interesses/:roupaId",
  authMiddleware,
  PermissaoMiddleware.setIdUsuario,
  BrechoController.deletarInteresse
);
router.get(
  "/interesses",
  authMiddleware,
  PermissaoMiddleware.setIdUsuario,
  BrechoController.buscaInteresses
);

export default router;

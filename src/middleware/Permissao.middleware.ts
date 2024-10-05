import { NextFunction, Request, Response } from "express";
import { configDataSource } from "../db/config";
import { UsuarioEntity } from "../model/entitities/Usuario.entity";
import jwt from "jsonwebtoken";
import { PermissoesEnum } from "../model/enum/Permissoes.enum";

export class PermissaoMiddleware {
  async validaPermissao(req: Request, res: Response, next: NextFunction) {
    const repo = configDataSource.getRepository(UsuarioEntity);

    const usuarioExistente = await repo.findOneBy({ id: req.usuario?.id });

    if (
      usuarioExistente?.permissoes === PermissoesEnum.ADMIN ||
      usuarioExistente?.permissoes === PermissoesEnum.DEV
    ) {
      next();
    } else {
      res.status(401).json({ error: "Você não tem permissão de acessar" });
    }
  }

  async setIdUsuario(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization as string;

    const tokenJwt = authHeader.split(" ")[1];
    const decoded = jwt.decode(tokenJwt);

    req.usuario = { id: decoded?.id };
    console.log(decoded.id);
    next();
  }
}

export default new PermissaoMiddleware();

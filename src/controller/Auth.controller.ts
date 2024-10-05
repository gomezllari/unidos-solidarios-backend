import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UsuarioEntity } from "../model/entitities/Usuario.entity";
import { configDataSource } from "../db/config";
import { PermissoesEnum } from "../model/enum/Permissoes.enum";

const jwtSecret: string = process.env.JWT_SECRET || "secret-uni-ads";
const masterKey = process.env.MASTER_KEY || "teste";

export class AuthController {
  async cadastrar(req: Request, res: Response): Promise<void> {
    const { nome, usuario, senha } = req.body;

    if (!nome || !usuario || !senha) {
      res.status(400).json({ error: "Nome, usuário e senha são obrigatórios" });
      return;
    }

    try {
      const repo = configDataSource.getRepository(UsuarioEntity);
      const usuarioExistente = await repo.findOneBy({ usuario });
      if (usuarioExistente) {
        res.status(400).json({ error: "Nome de usuário já está em uso" });
        return;
      }

      const senhaCrypt = await bcrypt.hash(senha, 10);

      const novoUsuario = repo.create({
        nome,
        usuario,
        senha: senhaCrypt,
        permissoes: PermissoesEnum.USUARIO,
      });
      await repo.save(novoUsuario);

      res.status(201).json({ message: "Usuário registrado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao registrar usuário" });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    const { usuario, senha } = req.body;

    if (!usuario || !senha) {
      res.status(400).json({ error: "Email e senha são obrigatórios" });
      return;
    }

    try {
      const repo = configDataSource.getRepository(UsuarioEntity);
      const usuarioBuscado = await repo.findOneBy({ usuario });
      if (!usuarioBuscado) {
        res.status(400).json({ error: "Credenciais inválidas" });
        return;
      }

      const isPasswordValid = await bcrypt.compare(senha, usuarioBuscado.senha);
      if (!isPasswordValid) {
        res.status(400).json({ error: "Credenciais inválidas" });
        return;
      }

      const token = jwt.sign(
        { id: usuarioBuscado.id, usuario: usuarioBuscado.usuario },
        jwtSecret,
        {
          expiresIn: "365d",
        }
      );

      res.status(200).json({ message: "Login bem-sucedido", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao fazer login" });
    }
  }

  async atualizarSenha(req: Request, res: Response) {
    const { senhaAntiga, novaSenha } = req.body;
    const idUsuario = req.usuario?.id;

    if (!senhaAntiga || !novaSenha) {
      res
        .status(400)
        .json({ error: "A senha antiga e a nova senha são obrigatórias" });
      return;
    }

    try {
      const userRepository = configDataSource.getRepository(UsuarioEntity);

      const usuario = await userRepository.findOneBy({ id: idUsuario });
      if (!usuario) {
        res.status(404).json({ error: "Usuário não encontrado" });
        return;
      }

      const isOldPasswordValid = await bcrypt.compare(
        senhaAntiga,
        usuario.senha
      );
      if (!isOldPasswordValid) {
        res.status(400).json({ error: "Senha antiga inválida" });
        return;
      }

      const hashedNewPassword = await bcrypt.hash(novaSenha, 10);

      usuario.senha = hashedNewPassword;
      await userRepository.save(usuario);

      res.status(200).json({ message: "Senha alterada com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao alterar senha" });
    }
  }

  async darPermissao(req: Request, res: Response) {
    const { usuario } = req.body;
    try {
      if (req.headers.key !== masterKey) {
        res.status(401).json({ message: "Não autorizado" });
        return;
      }
      const repo = configDataSource.getRepository(UsuarioEntity);
      const usuarioBuscado = await repo.findOneBy({ usuario });
      if (!usuarioBuscado) throw new Error();
      usuarioBuscado.permissoes = PermissoesEnum.ADMIN;

      await repo.save(usuarioBuscado);
      res.status(200).json({ message: "Permissão dada" });
    } catch (error) {
      console.error(error);
      res.status(404).json({ error: "Usuário não encontrado" });
    }
  }

  async verInfo(req: Request, res: Response) {
    try {
      const repo = configDataSource.getRepository(UsuarioEntity);
      const usuarioBuscado = await repo.findOneBy({ id: req.usuario.id });
      console.log(usuarioBuscado);
      if (!usuarioBuscado) throw new Error();

      res.status(200).json({
        permissao: usuarioBuscado.permissoes,
        nome: usuarioBuscado.nome,
        usuario: usuarioBuscado.usuario,
      });
    } catch (error) {
      console.error(error);
      res.status(404).json({ error: "Usuário não encontrado" });
    }
  }
}

export default new AuthController();

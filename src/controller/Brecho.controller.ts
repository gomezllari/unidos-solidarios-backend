import { Request, Response } from "express";
import { BrechoService } from "../service/Brecho.service";

class BrechoController {
  constructor() {}

  async getRoupas(req: Request, res: Response) {
    try {
      const service = new BrechoService();
      const result = await service.getRoupas();
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao buscar usuários" });
    }
  }

  async insereNovaRoupa(req: Request, res: Response) {
    try {
      const { body } = req;
      const service = new BrechoService();
      await service.insereRoupa({
        descricao: body.descricao,
        imagemBase64: body.imagemBase64,
        preco: body.preco,
        titulo: body.titulo,
      });
      res.status(200).json({ message: "Roupa inserida com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao buscar usuários" });
    }
  }

  async atualizaRoupa(req: Request, res: Response) {
    try {
      const { body } = req;
      const service = new BrechoService();
      await service.insereRoupa(
        {
          descricao: body.descricao,
          imagemBase64: body.imagemBase64,
          preco: body.preco,
          titulo: body.titulo,
        },
        Number(req.params.id)
      );
      res.status(200).json({ message: "Roupa atualizada com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao buscar usuários" });
    }
  }

  async removeRoupa(req: Request, res: Response) {
    try {
      const { roupaId } = req.params;
      const service = new BrechoService();
      await service.removeRoupa(Number(roupaId));
      res.status(200).json({ message: "Roupa removida com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao buscar usuários" });
    }
  }

  async insereInteresse(req: Request, res: Response) {
    try {
      const { roupaId } = req.params;
      const service = new BrechoService();
      await service.insereInteresse(Number(roupaId), Number(req.usuario.id));
      res.status(200).json({ message: "Interesse inserido com sucesso" });
    } catch (error) {
      res.status(500).json({ error: "Erro ao inserir interesse" });
    }
  }

  async buscaInteresses(req: Request, res: Response) {
    try {
      const service = new BrechoService();
      const interesses = await service.buscaInteresses(Number(req.usuario.id));
      res.status(200).json({ data: interesses });
    } catch (error) {
      res.status(400).json({ error: "Não foram encontrado interesses" });
    }
  }

  async deletarInteresse(req: Request, res: Response) {
    try {
      const { roupaId } = req.params;
      const service = new BrechoService();
      await service.deletarInteresse(Number(roupaId), Number(req.usuario.id));
      res.status(200).json({ message: "Interesse removido com sucesso" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro ao deletar interesse" });
    }
  }
}

export default new BrechoController();

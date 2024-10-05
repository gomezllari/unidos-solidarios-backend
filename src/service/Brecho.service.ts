import { configDataSource } from "../db/config";
import { BrechoRoupaDTO } from "../model/dto/BrechoRoupa.dto";
import { BrechoRoupaEntity } from "../model/entitities/BrechoRoupa.entity";
import { InteresseEntity } from "../model/entitities/Interesse.entity";

export class BrechoService {
  private async getRoupa(id: number) {
    const repo = configDataSource.getRepository(BrechoRoupaEntity);
    const roupa = await repo.findOneBy({ id });

    if (!roupa) throw new Error();

    return roupa;
  }

  private async atualizaRoupa(roupa: BrechoRoupaDTO, id: number) {
    const repo = configDataSource.getRepository(BrechoRoupaEntity);
    const roupaAtualizada = await this.getRoupa(id);
    roupaAtualizada.descricao = roupa.descricao;
    roupaAtualizada.imagemBase64 = roupa.imagemBase64;
    roupaAtualizada.titulo = roupa.titulo;
    roupaAtualizada.preco = roupa.preco;

    await repo.save(roupaAtualizada);
  }

  async getRoupas() {
    const repo = configDataSource.getRepository(BrechoRoupaEntity);
    return await repo.find();
  }

  async insereRoupa(roupa: BrechoRoupaDTO, idToUpdate?: number) {
    const repo = configDataSource.getRepository(BrechoRoupaEntity);
    if (idToUpdate) return this.atualizaRoupa(roupa, idToUpdate);

    const roupaNova = repo.create({
      imagemBase64: roupa.imagemBase64,
      descricao: roupa.descricao,
      titulo: roupa.titulo,
      preco: roupa.preco,
    });

    await repo.save(roupaNova);
  }

  async insereInteresse(roupaId: number, usuarioId: number) {
    const repo = configDataSource.getRepository(InteresseEntity);
    const interesses = await this.buscaInteresses(usuarioId);
    const temInteresse = interesses.some(
      (interesse) => interesse.roupa_id === roupaId
    );
    if (temInteresse) {
      throw { message: "Já possui interesse na roupa" };
    }

    const interesse = repo.create({
      roupa_id: roupaId,
      usuario_id: usuarioId,
    });

    await repo.save(interesse);
  }

  async deletarInteresse(roupaId: number, usuarioId: number) {
    const repo = configDataSource.getRepository(InteresseEntity);
    const interesses = await this.buscaInteresses(usuarioId);
    const temInteresse = interesses.find(
      (interesse) => interesse.roupa_id === roupaId
    );
    if (!temInteresse) {
      throw { message: "Não possui interesse" };
    }

    await repo.delete({ id: temInteresse.id });
  }

  async removeRoupa(roupaId: number) {
    const repo = configDataSource.getRepository(BrechoRoupaEntity);

    await repo.delete({ id: roupaId });
  }

  async buscaInteresses(usuario: number) {
    const repo = configDataSource.getRepository(InteresseEntity);
    return await repo.findBy({ usuario_id: usuario });
  }
}

export default new BrechoService();

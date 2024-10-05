import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { PermissoesEnum } from "../enum/Permissoes.enum";

@Entity({ name: "usuario" })
export class UsuarioEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { nullable: true })
  nome: string;

  @Column("varchar", { nullable: true })
  usuario: string;

  @Column("varchar", { nullable: true })
  senha: string;

  @Column("varchar", { nullable: true })
  permissoes: PermissoesEnum;
}

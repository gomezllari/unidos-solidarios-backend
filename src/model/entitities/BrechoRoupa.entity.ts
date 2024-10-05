import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("brecho_roupa")
export class BrechoRoupaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { nullable: true })
  titulo: string;

  @Column("varchar", { nullable: true })
  descricao: string;

  @Column("decimal", { nullable: true })
  preco: number;

  @Column("text", { nullable: true })
  imagemBase64: string;
}

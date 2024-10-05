import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("interesse")
export class InteresseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int", { nullable: false })
  usuario_id: number;

  @Column("int", { nullable: false })
  roupa_id: number;
}

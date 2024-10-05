import "reflect-metadata";
import { DataSource } from "typeorm";
import { BrechoRoupaEntity } from "../model/entitities/BrechoRoupa.entity";
import dotenv from "dotenv";
import { UsuarioEntity } from "../model/entitities/Usuario.entity";
import { InteresseEntity } from "../model/entitities/Interesse.entity";

dotenv.config();

export const configDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [BrechoRoupaEntity, UsuarioEntity, InteresseEntity],
  migrations: [],
  subscribers: [],
});

configDataSource
  .initialize()
  .then(() => {
    console.log("Data Source initialized successfully!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

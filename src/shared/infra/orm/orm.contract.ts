import { Connection, EntityManager } from "@mikro-orm/core";

export interface IDatabaseORM{
  start():void;
  close():void;
  getEntityManager():EntityManager;
  getConnection():any
}
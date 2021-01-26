export interface IDatabaseORM {
  connect():  Promise<void> ;
  close():  Promise<void> ;
  getConnection(): any;
}
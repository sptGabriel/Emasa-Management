import { LoadStrategy, wrap } from '@mikro-orm/core';
import { EntityRepository, EntityManager } from '@mikro-orm/postgresql';
import { Pagination } from '@shared/core/pagination';
import { IBootstrap } from '@shared/infra/bootstrap';
import { inject, injectable } from 'tsyringe';
import { Employee } from '../domain/employee.entity';
import { IEmployeeRepository } from './employeeRepository';
@injectable()
export class EmployeeRepository implements IEmployeeRepository {
  private em: EntityManager;
  constructor(@inject('bootstrap') bootstrap: IBootstrap) {
    this.em = bootstrap.getDatabaseORM().getConnection().em.fork();
  }
  public create = async (employee: Employee): Promise<Employee> => {
    if (!(employee instanceof Employee)) throw new Error(`Invalid Data Type`);
    await this.em.persist(employee).flush();
    return employee;
  };
  public update = async (matricula: string, data: any): Promise<Employee> => {
    const employee = await this.em.findOne(Employee, { matricula });
    if (!employee) throw new Error(`${data.matricula} dont exists`);
    wrap(employee).assign(data);
    await this.em.persist(employee).flush();
    return employee;
  };
  public all = async (pagination: Pagination): Promise<Employee[]> => {
    return await this.em.find(Employee, {});
  };
  public byId = async (id: string): Promise<Employee | undefined> => {
    const employee = await this.em.findOne(Employee, id);
    if (!employee) return;
    return employee;
  };
  public byMatricula = async (
    matricula: string,
  ): Promise<Employee | undefined> => {
    const employee = await this.em.findOne(Employee, { matricula });
    if (!employee) return;
    return employee;
  };
  public getEmployeeDepartament = async (matricula:string) => {
    const employee = await this.em.findOne(Employee, { matricula }, {
      populate: ['departament'],
      strategy: LoadStrategy.JOINED,
    });
    if (!employee) return;
    return employee;
  }
}


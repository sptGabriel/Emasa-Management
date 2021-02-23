import { LoadStrategy, RequestContext, wrap } from '@mikro-orm/core';
import { Pagination } from '@shared/core/pagination';
import { injectable } from 'tsyringe';
import { Employee } from '../domain/employee.entity';
import { IEmployeeRepository } from './employeeRepository';
@injectable()
export class EmployeeRepository implements IEmployeeRepository {
  private em: any;
  constructor() {
    this.em = RequestContext.getEntityManager();
  }
  public create = async (data: Employee): Promise<Employee> => {
    if (!(data instanceof Employee)) throw new Error(`Invalid Data Type`);
    await this.em.persistAndFlush(data);
    return data;
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
    console.log(matricula)
    const employee = await this.em.findOne(Employee, { matricula: matricula }, [
      'user',
    ]);
    if (!employee) return;
    return employee;
  };
  public getEmployeeDepartament = async (matricula: string) => {
    const employee = await this.em.findOne(
      Employee,
      { matricula },
      {
        populate: ['departament'],
        strategy: LoadStrategy.JOINED,
      },
    );
    if (!employee) return;
    return employee;
  };
}

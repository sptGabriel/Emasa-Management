import { wrap } from '@mikro-orm/core';
import { EntityRepository, EntityManager } from '@mikro-orm/postgresql';
import { Pagination } from '@shared/core/pagination';
import { inject, injectable } from 'tsyringe';
import { Employee } from '../domain/employee.entity';
import { IEmployeeRepository } from './employeeRepository';
@injectable()
export class EmployeeRepository implements IEmployeeRepository {
  private repository: EntityRepository<Employee>;
  constructor(@inject('EntityManager') private entityManager: EntityManager) {
    this.repository = entityManager.getRepository(Employee);
  }
  public create = async (employee: Employee): Promise<Employee> => {
    if(!(employee instanceof Employee)) throw new Error(`Invalid Data Type`)
    await this.repository.persist(employee).flush();
    return employee;
  };
  public update = async (
    matricula: string,
    data: any,
  ): Promise<Employee> => {
    const employee = await this.repository.findOne({matricula})
    if(!employee) throw new Error(`${data.matricula} dont exists`)
    wrap(employee).assign(data)
    await this.repository.persist(employee).flush();
    return employee;
  };
  public all = async (pagination: Pagination): Promise<Employee[]> => {
    return await this.repository.findAll()
  }
  public byId = async (id: string): Promise<Employee | undefined> => {
    const employee = await this.repository.findOne({ id });
    if (!employee) return;
    return employee;
  };
  public byMatricula = async (matricula: string): Promise<Employee | undefined> => {
    const employee = await this.repository.findOne({ matricula });
    if (!employee) return;
    return employee;
  }
}

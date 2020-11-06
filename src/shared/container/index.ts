import mikroConfig from '@config/mikro.config';
import { ContractController } from '@modules/contracts/ui/contract.controller';
import { DepartamentController } from '@modules/departaments/ui/departament.controller';
import { EmployeeController } from '@modules/employees/ui/employee.controller';
import { ProductsController } from '@modules/products/ui/products.controller';
import { SupplierController } from '@modules/supplier/ui/supplier.controller';
import { SuppliesController } from '@modules/supplying/ui/supplies.controller';
import { BaseController } from '@shared/core/baseController';
import { container } from 'tsyringe';

container.registerInstance('OrmConfig', mikroConfig);
container.registerSingleton<BaseController>(
  'Controllers',
  DepartamentController,
);
container.registerSingleton<BaseController>('Controllers', EmployeeController);
container.registerSingleton<BaseController>('Controllers', SupplierController);
container.registerSingleton<BaseController>('Controllers', ProductsController);
container.registerSingleton<BaseController>('Controllers', SuppliesController);
container.registerSingleton<BaseController>('Controllers', ContractController);

import mikroConfig from '@config/mikro.config';
import { AuthController } from '@modules/auth/ui/authenticate.controller';
import { ComponentController } from '@modules/components/ui/component.controller';
import { ContractController } from '@modules/contracts/ui/contract.controller';
import { DepartamentController } from '@modules/departaments/ui/departament.controller';
import { EmployeeController } from '@modules/employees/ui/employee.controller';
import { EquipmentsController } from '@modules/equipments/ui/equipment.controller';
import { ProductsController } from '@modules/products/ui/products.controller';
import { SupplierController } from '@modules/supplier/ui/supplier.controller';
import { SuppliesController } from '@modules/supplying/ui/supplies.controller';
import { UserController } from '@modules/users/ui/user.controller';
import { WithdrawalController } from '@modules/withdrawal/ui/withdrawal.controller';
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
container.registerSingleton<BaseController>(
  'Controllers',
  EquipmentsController,
);
container.registerSingleton<BaseController>('Controllers', ComponentController);
container.registerSingleton<BaseController>(
  'Controllers',
  WithdrawalController,
);
container.registerSingleton<BaseController>('Controllers', UserController);
container.registerSingleton<BaseController>('Controllers', AuthController);

import mikroConfig from '@config/mikro.config';
import { DepartamentController } from '@modules/departaments/ui/departament.controller';
import { BaseController } from '@shared/core/baseController';
import { MikroOrmClient } from '@shared/infra/orm';
import { container } from 'tsyringe'

container.registerInstance("OrmConfig", mikroConfig);
container.registerSingleton<BaseController>("Controllers",DepartamentController)
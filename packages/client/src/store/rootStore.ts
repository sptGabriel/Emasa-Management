import { types } from 'mobx-state-tree';
import { Employee } from '../models/employee';
import { UserModel } from '../models/user';

export const RootStore = types.model({
  employees: types.map(Employee),
  user: types.optional(types.map(UserModel), {})
});

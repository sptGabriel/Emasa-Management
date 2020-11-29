import { types } from 'mobx-state-tree';

export const Employee = types.model({
  id: types.identifier,
  matricula: types.optional(types.string, ''),
  departament_id: types.optional(types.string, ''),
  cargo: types.optional(types.string, ''),
  name: types.optional(types.string, '')
});

import { types, getParent } from 'mobx-state-tree';
export const CurrentUserModel = types
  .model('CurrentUserModel', {
    _id: types.identifier,
    name: types.string,
    departament_id: types.string,
    matricula: types.string,
    cargo: types.string,
    login: types.string
  })
  .views((self) => ({
    get auth() {
      return getParent(self);
    }
  }));

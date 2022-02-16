export const schema = {
  userTypes: '++id',
  users: '++id, userTypeId, username',
  parents: '++id, userId',
  students: '++id, userId',
  teachers: '++id, userId',
};

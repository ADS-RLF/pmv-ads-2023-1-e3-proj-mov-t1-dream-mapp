import * as SQLite from 'expo-sqlite';

export const Database = {
  getConnection: () => {
    
    const db = SQLite.openDatabase('dream_mapp.db');

    db.transaction((tx) => {
      tx.executeSql(
        'create table if not exists gastos (id integer primary key not null, tipo int not null, data text not null, nome real not null, sobrenome real not null, email real not null, telefone real not null);'
      );
    });

    const ExecuteQuery = (sql, params = []) =>
      new Promise((resolve, reject) => {
        db.transaction((trans) => {
          trans.executeSql(
            sql,
            params,
            (trans, results) => {
              resolve(results);
            },
            (error) => {
              reject(error);
            }
          );
        });
      });

    return ExecuteQuery;
  },
};

export default Database;

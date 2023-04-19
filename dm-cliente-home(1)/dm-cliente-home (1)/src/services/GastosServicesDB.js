import Database from './DbServices';

const DB_EXEC = Database.getConnection();

export const getGastos = async () => {
  let results = await DB_EXEC(`select * from gastos`);
  //console.log(results);
  return results.rows._array;
}

export const insertGasto = async (param) => {
  let results = await DB_EXEC(`insert into gastos(tipo, data, nome, sobrenome, email, telefone)
  values(?,?,?,?,?,?)`, [param.tipo, param.data,param.remetente,param.destinatario,param.assunto]);
  //console.log(results);
  return results.rowsAffected;
}

export const updateGasto = async (param) => {
  let results = await DB_EXEC(`update gastos set tipo=?, data=?, nome=?, sobrenome=?, email=?, telefone=?
  where id=?`, [param.tipo, param.data,param.nome,param.sobrenome,param.email,param.telefone ,param.id]);
  //console.log(results);
  return results.rowsAffected;
}

export const deleteGasto = async (id) => {
  let results = await DB_EXEC(`delete from gastos where id=?`, [id]);
  //console.log(results);
  return results.rowsAffected;
}
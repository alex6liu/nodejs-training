const db = [{
  "login": "default",
  "password": "default",
  "age": 18,
  "id": 1,
  "isDeleted": false
}];

const getAllUsers= (req) => {
  return db;
}

const getUserById= (req) => {
  const user = db.filter((item)=>{
    return item.id === parseInt(req.params.id);
  })
  return user;
}

const createUser = (req) => {
  console.log(req.body)
  req.body['id'] = db.length + 1;
  req.body['isDeleted'] = false;
  db.push(req.body);
  console.log(db)
}

const filterById = (id) => {
  return db.find((item,index)=>{
    return item.id === id
  });
}

const searchById = (id) => {
  const user = filterById(id);
  return user;
}

const updateUser = (req) => {
  const item = filterById(parseInt(req.body.id));
  console.log(req.body, item)
  return Object.assign(item,req.body);
}

const deleteById = (id) => {
  const item = filterById(parseInt(id));
  console.log(id, item)
  item.isDeleted = true;
}

const suggestUser = (login,limit)=> {
  let requestedUsers = db.filter(user => {
    return user.login.indexOf(login) !== -1;
  })
  return requestedUsers.length <= limit ? requestedUsers : requestedUsers.slice(0,limit);
}

module.exports = { getAllUsers, getUserById, createUser, searchById, deleteById, updateUser, suggestUser};
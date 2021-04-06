const express = require('express');
const bodyParser = require('body-parser');
const collection = require('./collection')

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
const port = 5000
const router = express.Router();

// postman GET http://localhost:5000/users/1
router.get('/users/:id', (req, res) => {
  const user = collection.getUserById(req);
  if (user) {
    res.status(200).send({ data: user });
  }
});

// postman GET http://localhost:5000/users
router.get("/users", (req, res) => {
  res.send(collection.getAllUsers(req));
});

// postman POST http://localhost:5000/user
// Body x-www-form-urlencoded
// login 123
// password 123123
// age 18
router.post('/user', (req, res) => {
  collection.createUser(req);
  res.status(200).send('Created user successfully');
});

// postman PUT http://localhost:5000/user
// Body x-www-form-urlencoded
// id 1
// age 99
router.put("/user", (req, res)=> {
  const user = collection.updateUser(req);
  if (user) {
    res.status(200).send('Updated successfully');
  }
});

// postman DELETE http://localhost:5000/user/1
router.delete('/user/:id', (req, res)=> {
  collection.deleteById(req.params.id);
  res.status(200).send('Deleted successfully');
});

// postman GET http://localhost:5000/suggestUsers?limit=1&login=default
router.get('/suggestUsers', (req, res)=> {
  const user = collection.suggestUser(req.query.login, req.query.limit || 10);
  res.status(200).send({ data: user });
});

router.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/', router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
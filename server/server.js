const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const cors = require('cors');
const schema = require('./schema');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,PUT,POST,DELETE,OPTIONS'
}));

app.use('/graphql', graphqlHTTP({
  schema, // 模型
  graphiql: true // 查询工具
}))

app.listen(4000, () => {
  console.log(`the port 4000 is started`)
})
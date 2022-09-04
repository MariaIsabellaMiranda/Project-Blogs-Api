const express = require('express');
const loginRouter = require('./routes/loginRouter');
const userRouter = require('./routes/userRouter');
const categoriesRouter = require('./routes/categoriesRouter');

const app = express();
app.use(express.json());

app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/categories', categoriesRouter);

module.exports = app;

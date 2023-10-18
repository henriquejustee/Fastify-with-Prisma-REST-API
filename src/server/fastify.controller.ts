import fastify from 'fastify';
import { CreateUserRouter, GetAllUsersRouter, GetUsersByIdRouter, UpdateUserRouter, DeleteUserRouter} from './routes/user.router'
const { PrismaClient } = require('@prisma/client');

const app = fastify({logger : false})
const port : any = process.env.PORT  || 3006
const prisma = new PrismaClient();

app.register(GetAllUsersRouter);
app.register(GetUsersByIdRouter);
app.register(CreateUserRouter);
app.register(UpdateUserRouter);
app.register(DeleteUserRouter);

app.listen({port : port}, (err : any, adress : any) => {
  if (err) {
    console.log(err)
  }
  console.log(`Connected at ${adress}`)
})







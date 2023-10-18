import { FastifyInstance } from 'fastify';
import { getAllUsers, getUserById, CreateUser, UpdateUser, DeleteUser } from '../controller/user.controller'


export async function GetAllUsersRouter(fastify : FastifyInstance) {
    fastify.get('/api/users', getAllUsers);
}

export async function GetUsersByIdRouter( fastify : FastifyInstance) {
    fastify.get('/api/users/:id', getUserById);
}

export async function CreateUserRouter( fastify : FastifyInstance) { 
    fastify.post('/api/users/create', CreateUser);
}

export async function UpdateUserRouter( fastify : FastifyInstance) {
    fastify.put('/api/users/update/:id', UpdateUser);
}

export async function DeleteUserRouter( fastify : FastifyInstance) {
    fastify.delete('/api/users/delete/:id', DeleteUser);
}
import { PrismaClient } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'


const prisma = new PrismaClient()

export async function getAllUsers(request : FastifyRequest, response : FastifyReply) {
    try {
        const data = await prisma.users.findMany();
        response.send(JSON.stringify({"data" : data}));
    } 
    catch(e) {
        console.log(e)
        response.send(JSON.stringify({"Error" : 'Internal server error'}));
    }
    finally {
        await prisma.$disconnect()
    }
}


export async function getUserById( request : FastifyRequest, response : FastifyReply) {
    try {
        const id = (request.params as { id: any }).id;
        console.log(id)
        const data = await prisma.users.findUnique({
            where: {
                id : Number(id)
            }
        })
        await console.log(data)
        await response.send(JSON.stringify({"data" : data}));
    } catch(e) {
        console.log(e)
        response.send(JSON.stringify({"Error" : "Internal server error"}))
    } finally {
        await prisma.$disconnect()
    }
}


export async function CreateUser(request : FastifyRequest, response : FastifyReply) {
    try {
        
     const { name, email, password } = request.body as { name: string, email: string, password: string }
     const data = await prisma.users.create({
        data : {
            name : String(name),
            email : String(email),
            password : String(password)
        }
     })
     await response.send(JSON.stringify({"info" : "user created successfully"}));

    }
    catch(e) {
        console.log(e)
        response.send(JSON.stringify({"Error" : "Internal server error"}))
    }

    finally {
        await prisma.$disconnect()
    }
}


export async function UpdateUser(request : FastifyRequest, response : FastifyReply) {
    try {
        const id = (request.params as { id: any }).id;
        const { name, password } = request.body as { id : string, name : string, email : string, password : string}

        await prisma.users.update({
            where: {
                id: Number(id)
            },
            data: {
                name: name,
                password: password
            }
        })
        await response.send(JSON.stringify({"info" : "User updated successfully"}));
    }
    catch(e) {
        console.log(e)
        response.send(JSON.stringify({"Error" : "Internal server error"}))
    }
    finally {
        await prisma.$disconnect()
    }
}


export async function DeleteUser( request : FastifyRequest, response : FastifyReply) {
    try {
        const id = (request.params as { id : any }).id;

        await prisma.users.delete({
            where : {
                id : Number(id)
            }
        })
        await response.send(JSON.stringify({"info" : "user deleted successfully"}))
    }
    catch(e) {
        console.log(e)
        response.send(JSON.stringify({"Error" : "Internal server error"}))
    }
    finally {
        prisma.$disconnect()
    }
}
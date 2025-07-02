import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt';

export async function authRegister(req: Request, res: Response) {

  const prisma = new PrismaClient();

  const { name, password, email } = req.body;

  try {

    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    })

    if (user) return res.status(400).json({
      message: "User already exists!",
    })

    const hashedPassword = await bcrypt.hash(password, 10);

    const userCreated = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })

    return res.status(201).json(
      {
        message: "Registered user",
        userCreated
      })

  } catch (error) {

    return res.status(500).json({ message: 'Erro ao buscar usuário.', error });

  }

}
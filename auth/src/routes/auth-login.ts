import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export async function authLogin(req: Request, res: Response) {

  const prisma = new PrismaClient();

  const { name, password, email } = req.body;

  try {

    const userExists = await prisma.user.findUnique({
      where: {
        email: email
      }
    })

    if (!userExists) return res.status(401).json({
      message: "Email not exists!",
    })

    const isPasswordValid = await bcrypt.compare(password, userExists.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid password',
      });
    }

    const token = jwt.sign(
      { userId: userExists.id, email: userExists.email },
      process.env.TOKEN_SECRET as string,
      { expiresIn: '1h' } 
    );

    return res.status(200).json(
      {
        message: "Login successful",
        token,
      })

  } catch (error) {

    return res.status(500).json({ message: 'Erro ao buscar usuário.', error });

  }

}
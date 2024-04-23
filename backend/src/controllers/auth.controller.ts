import { Request, Response } from "express";
import { signInSchema, userSchema } from "../zod";
import { PrismaClient } from "@prisma/client";
import { Iuser } from "../types/Iuser";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

//TODO : use bcrypt

export const Signup = async (req: Request, res: Response) => {
  try {
    const inputBody = req.body;
    const parsedInput = userSchema.safeParse(inputBody);
    if (!parsedInput.success) {
      return res.status(400).json(parsedInput.error);
    }
    const newUser: Iuser = await prisma.user.create({
      data: {
        email: inputBody.email,
        password: inputBody.password,
        name: inputBody.name,
      },
    });

    const token = jwt.sign(
      {
        email: newUser.email,
      },
      process.env.JWT_SECRET!
    );
    return res.status(200).json({
      msg: "User created successfully",
      token: token,
      email: newUser.email,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json("Error creating user");
  }
};

export const Signin = async (req: Request, res: Response) => {
  const inputPayload = req.body;
  const parsedPayload = signInSchema.safeParse(inputPayload);
  if (!parsedPayload.success) {
    return res.status(200).json("zod validation failed");
  }
  const user = await prisma.user.findUnique({
    where: {
      email: inputPayload.email,
      password: inputPayload.password,
    },
  });
  if (!user) {
    return res.status(200).json("User not found ");
  }
  const token = jwt.sign(
    {
      email: inputPayload.email,
      id: user.id,
    },
    process.env.JWT_SECRET!
  );
  return res.status(400).json({
    token: token,
    email: user.email,
  });
};

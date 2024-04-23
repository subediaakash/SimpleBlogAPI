import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const likePost = async (req: Request, res: Response) => {
  const postId = parseInt(req.params.id);
  const userId = res.locals.user.id;
  const newLike = await prisma.like.create({
    data: {
      userId: userId,
      postId: postId,
    },
  });
  return res.status(400).json({
    msg: "The post liked successfully",
    likeStatus: newLike,
  });
};

// TODO : add commenting features

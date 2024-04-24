import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { postSchema } from "../zod";
import { IPost } from "../types/Ipost";

const prisma = new PrismaClient();

export const getProfile = async (req: Request, res: Response) => {
  try {
    const email = res.locals.user.email;
    const currentUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        following: {
          select: {
            name: true,
          },
        },
      },
    });

    const username = currentUser?.name;
    const following = currentUser?.following;

    return res.status(200).json({ username, email, following });
  } catch (err) {
    return res.json({ Message: "Error occured", Error: err });
  }
};

export const CreatePost = async (req: Request, res: Response) => {
  const post: IPost = req.body;
  const parsedPost = postSchema.safeParse(post);
  if (!parsedPost.success) {
    return res.status(400).json("Zod validation failed");
  }
  try {
    const newPost = await prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        creatorId: res.locals.user.id,
      },
    });
    return res.status(200).json({ msg: "Post Created Successfully", newPost });
  } catch (error) {
    return res.send("Error occured while creating the post");
  }
};

export const UpdatePost = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.postId);
    const updatedContent = req.body;
    const updatePost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        content: updatedContent,
      },
    });
    return res
      .status(200)
      .json({ msg: "Post updated successfully", updatedPost: updatePost });
  } catch (err) {
    return res.send("Error occured during updation of post");
  }
};

export const DeletePost = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.postId);
    const postToBeDeleted = await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    return res
      .status(200)
      .json({ msg: "Post deleted successfully", deletedPost: postToBeDeleted });
  } catch (er) {}
};

export const FollowUser = async (req: Request, res: Response) => {
  const userToBeFollowedId = parseInt(req.params.userId);
  const requestingUserId = res.locals.user.id;
  console.log(userToBeFollowedId);
  console.log(requestingUserId);

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: requestingUserId,
      },
      data: {
        following: {
          connect: { id: userToBeFollowedId },
        },
      },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error following user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

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
    console.log(res.locals.user.id);

    const newPost = await prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        creatorId: res.locals.user.id,
      },
    });
    return res.status(200).json({ msg: "Post Created Successfully", newPost });
  } catch (error) {
    return res.status(400).json({
      msg: "Error occured while creating the post",
      err: error,
    });
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
    return res.json({ msg: "Error occured during updation of post", err: err });
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

export const myPosts = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user.id;
    const myPosts = await prisma.post.findMany({
      where: {
        creatorId: userId,
      },
    });
    return res.status(200).json(myPosts);
  } catch (err) {
    return res.status(404).json({ msg: "Posts not found", err: err });
  }
};

export const getPostsByFollowers = async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user.id;
    const userFollowers = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        following: true,
      },
    });

    const followedUserIds = userFollowers?.following.map((user) => user.id);

    if (!followedUserIds || followedUserIds.length === 0) {
      return res.status(404).json({ message: "No followed users found" });
    }

    const posts = await prisma.post.findMany({
      where: {
        creatorId: { in: followedUserIds },
      },
    });

    return res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts by followers:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response) => {
  const currentUserId = res.locals.user.id;

  try {
    const usersNotFollowedByCurrentUser = await prisma.user.findMany({
      where: {
        AND: [
          {
            id: {
              not: currentUserId,
            },
          },
          {
            NOT: {
              followedBy: {
                some: {
                  id: currentUserId,
                },
              },
            },
          },
        ],
      },
    });

    res.status(200).json(usersNotFollowedByCurrentUser);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getPostsByRandomUsers = async (req: Request, res: Response) => {
  const currentUserId = res.locals.user.id;

  try {
    const randomUserPosts = await prisma.post.findMany({
      where: {
        NOT: {
          creatorId: currentUserId,
        },
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    res.status(200).json(randomUserPosts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

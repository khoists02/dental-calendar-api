import { Express } from "express";
import {
  createPostHandler,
  deletePostHandler,
  getPostHandler,
  getPostsHandler,
  updatePostHandler,
} from "../controller/post.controller";
import { requiresUser, validateRequest } from "../middleware";
import {
  createPostSchema,
  deletePostSchema,
  updatePostSchema,
} from "../schema/post.schema";

const PostRoute = (app: Express) => {
  // Create a post
  app.post(
    "/api/posts",
    [requiresUser, validateRequest(createPostSchema)],
    createPostHandler
  );

  // Get all posts
  app.get("/api/posts", requiresUser, getPostsHandler);

  // Update a post
  app.put(
    "/api/posts/:postId",
    [requiresUser, validateRequest(updatePostSchema)],
    updatePostHandler
  );

  // Get a post
  app.get("/api/posts/:postId", getPostHandler);

  // Delete a post
  app.delete(
    "/api/posts/:postId",
    [requiresUser, validateRequest(deletePostSchema)],
    deletePostHandler
  );
};

export default PostRoute;

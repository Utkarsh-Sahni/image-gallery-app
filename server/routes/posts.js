import express from "express";
import multer from "multer";
import {
  getAllImages,
  addComment,
  likeImage,
  getImageById,
  getLikes,
  getComments,
  searchImages,
  downloadImage,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/images/search", searchImages);
router.get("/images",verifyToken, getAllImages);
router.get("/images/:id",verifyToken, getImageById);
router.post("/images/:id/comments",verifyToken, addComment);
router.get("/images/:id/comments",verifyToken, getComments);
router.post("/images/:id/likes", verifyToken, likeImage);
router.get("/images/:id/likes", verifyToken, getLikes);
router.get("/images/:id/download",verifyToken, downloadImage);

export default router;

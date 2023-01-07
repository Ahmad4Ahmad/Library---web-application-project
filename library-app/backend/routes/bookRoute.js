const express = require("express");
const router = express.Router();
const {createBook, getBooks, getBook, deleteBook, updateBook} = require("../controllers/bookController");
const protect = require("../middleWare/authMiddleware");
const {upload} = require("../utils/fileUpload");

router.post("/", protect, upload.single("poster"), createBook);
router.get("/", protect, getBooks);
router.get("/:id", protect, getBook);
router.delete("/:id", protect, deleteBook);
router.patch("/:id", protect, upload.single("poster"), updateBook);

module.exports = router;
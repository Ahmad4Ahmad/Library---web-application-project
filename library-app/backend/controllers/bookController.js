const asyncHandler = require("express-async-handler");
const Book = require("../models/bookModel");
const {fileSizeFormatter} = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2;

const createBook = asyncHandler(async(req, res) => 
{
    const {title, sku, category, description} = req.body;
    if(!title || !category || !description)
    {
        res.status(404);
        throw new Error("Please fill in all fields");
    }

    let fileData = {};
    if (req.file)
    {
        let uploadedFile;
        try
        {
            uploadedFile = await cloudinary.uploader.upload(req.file.path, {folder: "Library", resource_type: "image"});
        }
        catch (error)
        {
            res.status(500);
            throw new Error("Image could not be uploaded");
        }

        fileData = 
        {
            fileName: req.file.originalname,
            filePath: uploadedFile.secure_url,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2) 
        };
    }
    
    const book = await Book.create(
        {
            user: req.user.id,
            title,
            sku,
            category,
            description,
            poster: fileData
        }
    )
    
    res.status(201).json(book);
});

const getBooks = asyncHandler (async (req, res) => 
{
    const books = await Book.find({user: req.user.id}).sort("-createdAt");
    res.status(200).json(books);
});

const getBook = asyncHandler (async (req, res) =>
{
    const book = await Book.findById(req.params.id);
    if (!book)
    {
        res.status(404);
        throw new Error("Book not found");
    }

    if (book.user.toString() !== req.user.id)
    {
        res.status(401);
        throw new Error("User not authorized");
    }

    res.status(200).json(book);
});

const deleteBook = asyncHandler (async (req, res) =>
{
    const book = await Book.findById(req.params.id);
    if (!book)
    {
        res.status(404);
        throw new Error("Book not found");
    }

    if (book.user.toString() !== req.user.id)
    {
        res.status(401);
        throw new Error("User not authorized");
    }

    await book.remove();
    res.status(200).json({message: "Book deleted"});
});

const updateBook = asyncHandler(async (req, res) =>
{
    const {title, category, description} = req.body;
    const {id} = req.params;
    const book = await Book.findById(id);
    if (!book)
    {
        res.status(404);
        throw new Error("Book not found");
    }

    if (book.user.toString() !== req.user.id)
    {
        res.status(401);
        throw new Error("User not authorized");
    }

    let fileData = {};
    if (req.file)
    {
        let uploadedFile;
        try
        {
            uploadedFile = await cloudinary.uploader.upload(req.file.path, {folder: "Library", resource_type: "image"});
        }
        catch (error)
        {
            res.status(500);
            throw new Error("Image could not be uploaded");
        }

        fileData = 
        {
            fileName: req.file.originalname,
            filePath: uploadedFile.secure_url,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2) 
        };
    }

    const updatedBook = await Book.findByIdAndUpdate(
        {id: id}, 
        {
            title,
            category,
            description,
            poster: Object.keys(fileData) === 0 ? book.poster : fileData
        },
        {
            new: true,
            runValidators: true
        }
    )
    
    res.status(200).json(updatedBook);
});

module.exports = 
{
    createBook,
    getBooks,
    getBook,
    deleteBook,
    updateBook
};
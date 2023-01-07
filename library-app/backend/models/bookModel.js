const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
    {
        user:
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        title:
        {
            type: String,
            required: [true, "Please add a name"],
            trim: true
        },
        sku:
        {
            type: String,
            required: true,
            default: "SKU",
            trim: true
        },
        category:
        {
            type: String,
            required: [true, "Please add a category"],
            trim: true
        },
        description:
        {
            type: String,
            required: [true, "Please add a description"],
            trim: true
        },
        poster:
        {
            type: Object,
            default: {}
        }
    },
    {
        timesstamps: true
    }
);

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
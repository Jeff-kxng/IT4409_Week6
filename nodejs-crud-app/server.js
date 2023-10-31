const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8000; // Port 8000 by default, can be overridden by an environment variable

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb+srv://it4409:it4409-soict@lamdb-crud.qd3s7vv.mongodb.net/?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

const BlogSchema = new mongoose.Schema({
    title: String,
    content: String,
    image: String,
    email: String, // Include the "email" field
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Blog = mongoose.model("Blog", BlogSchema);

app.use(cors());
app.use(bodyParser.json());

app.get("/api/blogs", async (req, res) => {
    const blogs = await Blog.find();
    res.json({ data: blogs });
});

app.post("/api/blogs", async (req, res) => {
    const newBlog = new Blog(req.body);
    const savedBlog = await newBlog.save();
    res.json({ data: savedBlog });
});

app.put("/api/blogs/:id", async (req, res) => {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.json({ data: updatedBlog });
});

app.delete("/api/blogs/:id", async (req, res) => {
    const deletedBlog = await Blog.findByIdAndRemove(req.params.id);
    res.json({ data: deletedBlog });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

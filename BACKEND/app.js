const express = require("express")
const connection = require("./config/connection")
const Blog = require("./models/blogSchema")
const cors = require("cors")
const app = express();
connection();
const port = 8080;
app.use(express.json());

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.get("/",(req,res)=>{
    res.send("Hello world")
})

app.post("/createPost",async (req,res)=>{
    console.log(req.body.title)
    const {title,description,author,author_email} = req.body;
    console.log(title,description,author,author_email)
    if(!title || !description || !author || !author_email){
        return res.status(400).json({message:"Please fill all the fields"})
    }
    const id = Math.floor(Math.random()*1000000).toString()
    try{
        const blog =await new Blog({
            id,
            title,
            description,
            author,
            author_email,
            created_at: new Date(),
            updated_at: new Date()
        })
        await blog.save().then(()=>{
            console.log("Blog created successfully")
            return res.status(200).json({message:"Blog created successfully"})
        }).catch((err)=>{
            console.log(err)
            return res.status(500).json({message:"Internal server error"})
        })  ;
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Internal server error"})
    }
})

app.get("/getPosts",async (req,res)=>{
    try{
        const blogs = await Blog.find({}).sort({created_at:-1})
        if(blogs.length === 0){
            return res.status(404).json({message:"No blogs found"})
        }
        return res.status(200).json(blogs)
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Internal server error"})
    }
})


app.get("/getPost/:id",async (req,res)=>{
    try{
        const blog = await Blog.findOne({id:req.params.id})
        if(!blog){
            return res.status(404).json({message:"Blog not found"})
        }
        return res.status(200).json(blog)
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Internal server error"})
    }
})

app.delete("/deletePost/:id",async (req,res)=>{
    try{
        const blog = await Blog.findOneAndDelete({id:req.params.id})
        if(!blog){
            return res.status(404).json({message:"Blog not found"})
        }
        return res.status(200).json({message:"Blog deleted successfully"})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:"Internal server error"})
    }
})


app.put("/updatePost/:id",async (req,res)=>{
    const {title,description,author,author_email} = req.body;
    if(!title || !description || !author || !author_email){
        return res.status(400).json({message:"Please fill all the fields"})
    }
    try{
        const blog = await Blog.findOneAndUpdate({id:req.params.id},{
            title,
            description,
            author,
            author_email,
            updated_at: new Date()
        })
        if(!blog){
            return res.status(404).json({message:"Blog not found"})
        }
        return res.status(200).json({message:"Blog updated successfully"})
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Internal server error"})
    }
})


app.listen(port,()=>{
    console.log("Server is running on port:", port)
})
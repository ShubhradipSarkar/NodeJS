const express=require('express');
const app=express();
const users=require("./MOCK_DATA.json");
const fs=require('fs');
const mongoose=require('mongoose');

// Connect mongodb
mongoose.connect("mongodb://127.0.0.1:27017/firstDB")
.then(()=>{console.log("MongoDB connected")})
.catch((err)=>{console.log("Couldn't connect to MongoDB", err)});

// Schema
const userSchema=new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    }, 
    lastName:{
        type: String,
        required: false,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    }
})

// Model
const User=mongoose.model("User", userSchema);

// Middlewares
app.use(express.urlencoded({encoded: false}))
app.use((req, res, next)=>{
    console.log("I am middleware 1");
    fs.appendFile("api_Log.txt", `\n ${Date.now()}: ${req.method} ${req.path}`,
    (err, data)=>{next();});   // If we don't use this, our server will be struck in this line
})

// Returns HTML as response {Good for websites as it is faster}
app.get("/users", async(req, res)=>{
    const allUsers=await User.find({});
    const html = `<ul>${allUsers.map((user)=>`<li>${user.email}</li>`).join("")}</ul>`;
    return res.send(html);
})

// Returns API as json {Good to have for all devices}
app.get("/api/users", async(req, res)=>{
    const allUsers=await User.find({});
    return res.json(allUsers);
})

// same API route hits 3 different methods {get, patch, delete merged}
app.route("/api/users/:id") 
.get(async(req, res)=>{
    const UserById = await User.findById(req.params.id);
    if (!UserById) return res.status(404).json({error: "User by this id not found"});
    return res.json(UserById);
})
.patch((req, res)=>{
    // Put 
    const id = Number(req.params.id);
    const updatedUser = req.body;

    // Find the index of the user with the given ID
    const index = users.findIndex((user) => user.id === id);

    // If the user with the given ID is found, update its properties
    if (index !== -1) {
        users[index] = { ...users[index], ...updatedUser };

        // Save the updated data to the JSON file
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
            if (err) {
                return res.status(500).json({ status: "error", message: "Failed to update user" });
            }
            return res.json({ status: "success", message: "User updated successfully" });
        });
    } else {
        return res.status(404).json({ status: "error", message: "User not found" });
    }
})
.delete((req, res)=>{
    // Delete
    const id = Number(req.params.id);
    // Filter out the user with the given ID
    const filteredUsers = users.filter((user) => user.id !== id);

    // If the length changes, the user was found and deleted
    if (filteredUsers.length < users.length) {
        // Save the updated data to the JSON file
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(filteredUsers), (err) => {
            if (err) {
                return res.status(500).json({ status: "error", message: "Failed to delete user" });
            }
            return res.json({ status: "success", message: "User deleted successfully" });
        });
    } else {
        return res.status(404).json({ status: "error", message: "User not found" });
    }
    
});

// Posting a new user to the data
app.post("/api/users", async(req, res)=>{
    const body=req.body;
    console.log("body : ", body);
    
    const createdUser = await User.create({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email
    }).catch((err)=>{console.log("sob kichu fill kor chutiya")});

    console.log(createdUser);
    return res.status(201).json({msg: "success"});

});

app.listen(3000, ()=>{console.log("Server started")});


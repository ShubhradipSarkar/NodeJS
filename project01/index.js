const express=require('express');
const app=express();
const users=require("./MOCK_DATA.json");

// Returns HTML as response {Good for websites as it is faster}
app.get("/users", (req, res)=>{
    const html = `<ul>${users.map((user)=>`<li>${user.email}</li>`).join("")}</ul>`;
    return res.send(html);
})

// Returns API as json {Good to have for all devices}
app.get("/api/users", (req, res)=>{
    return res.json(users);
})

// same API route hits 3 different methods {get, patch, delete merged}
app.route("/api/users/:id") 
.get((req, res)=>{
    const id = Number(req.params.id);
    const userWanted = users.find((user)=>user.id===id); 
    return res.json(userWanted);
})
.patch((req, res)=>{
    // Put 
})
.delete((req, res)=>{
    // Delete
});

app.listen(3000, ()=>{console.log("Server started")});
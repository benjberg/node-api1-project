const express = require('express');

const server = express();

const shortid = require('shortid');

server.use(express.json());
const port = 5000;

let users = [
    {
        id: shortid.generate(), // hint: use the shortid npm package to generate it
  name: "Jane Doe", // String, required
  bio: "Not Tarzan's Wife, another Jane",  // String, required
    }
];

server.get('/', (req,res)=>{
    res.json({api: 'running'})
})

server.get('/api/users', (req,res) => {
    res.json(users)
})
server.get('/api/users/:id', (req,res) =>{
    const id = req.params.id;
    const user= users.find(user => user.id == id);
    if(user){
        res.json(user)
    } else {
        res.status(404).json({message: 'user not found'})
    }
})

server.post('/api/users', (req,res) => {
    const newUser = req.body;
    newUser.id = shortid.generate();
   if (users.push(newUser)){
     res.status(201).json(users)} else{
res.status(400).json({message: 'Please provide name and bio for the user' })
     };
})

server.delete('/api/users/:id', (req,res) =>{
    const reqId = req.params.id;
    let user= users.filter(user =>{
        return user.id === reqId;
    })[0];
const index= users.indexOf(user);
    users.splice(index, 1);
    res.json({message: `user ${reqId} deleted `})
})
server.listen(port, () => console.log('api on port 5k'))
//khai bao port
const app = require("./src/app");


const server = app.listen(3055, ()=>{
    console.log("Welcome Pro!");
})

process.on("SIGINT",() =>{
    server.close(() =>{ console.log("Exit server");})
});
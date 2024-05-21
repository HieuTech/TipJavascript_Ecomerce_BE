//khai bao port
const app = require("./src/app");

const PORT = process.env.PORT || 3056;

const server = app.listen(PORT, () => {
  console.log(`Server is on PORT : ${PORT}`);
});

process.on("SIGINT",() =>{
    server.close(() =>{ console.log("Exit server");})
});
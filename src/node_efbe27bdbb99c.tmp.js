const express = require("express");
const mongoose = require('mongoose');

const app = express();
app.use(express.json())
const port = 3000;

const Séries = mongoose.model('Séries',{
    título: String,
    descrição: String,
    imagem_url: String,
    trailer_url: String

});


app.get("/", (req, res) => {
    res.send("Hello World!")
});
app.post("/", async (req, res)=>{
    const séries = new Séries({
        título: req.body.título,
        descrição:req.body.descrição,
        imagem_url:req.body.imagem_url,
        trailer_url: req.body.trailer_url
    });

    await séries.save();
    res.send(séries);

})

app.listen(port, () =>{
    mongoose.connect("mongodb+srv://gabrielrodriguescosta2001:NxuKbtfsf3GfsMiF@bd-api.6zn7wie.mongodb.net/?retryWrites=true&w=majority&appName=bd-api");
    console.log('Programa está funcionando!')
})

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

app.get("/", async (req, res) => {
    const séries = await Séries.find()
    return res.send(séries);
});

app.delete("/:id", async(req, res)=>{
    try {
        const series = await Séries.findOneAndDelete({ _id: req.params.id });
        if (!series) {
            return res.status(404).send({ error: 'Série não encontrada' });
        }
        return res.send(series);
    } catch (error) {
        return res.status(500).send({ error: 'Erro interno do servidor' });
    }
});

app.put("/:id", async (req, res) =>{
    try {
        const série = await Séries.findByIdAndUpdate(req.params.id, {
            título: req.body.título,
            descrição: req.body.descrição,
            imagem_url: req.body.imagem_url,
            trailer_url: req.body.trailer_url
        }, { new: true });

        if (!série) {
            return res.status(404).send({ error: 'Série não encontrada' });
        }
        
        return res.send(série);
    } catch (error) {
        return res.status(500).send({ error: 'Erro interno do servidor' });
    }
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


app.get("/agrupados/:campo", async (req, res) => {
    try {
        const campo = req.params.campo;
        const sériesAgrupadas = await Séries.aggregate([
            {
                $group: {
                    _id: `$${campo}`,
                    séries: { $push: "$$ROOT" }
                }
            }
        ]);

        return res.send(sériesAgrupadas);
    } catch (error) {
        return res.status(500).send({ error: 'Erro interno do servidor' });
    }
});

app.listen(port, () =>{
    mongoose.connect("mongodb+srv://gabrielrodriguescosta2001:NxuKbtfsf3GfsMiF@bd-api.6zn7wie.mongodb.net/?retryWrites=true&w=majority&appName=bd-api");
    console.log('O programa está funcionando!');
})

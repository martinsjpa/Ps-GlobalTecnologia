
/* const para utilizar a dependecia express */
const express = require('express');

/* const para utilizar a dependecia mongoose */
const mongoose = require('mongoose');

/* const para utilizar a dependecia cors */
const cors = require('cors');

/* Inicializa o Express */
const app = express();

/* Faz a Requição do Modelo Reminder para ser utilizado no mongoDB  */
require("./Models/Reminder");

/* Permite que o app utilize o formato JSON */
app.use(express.json());

/* Define quem pode solicitar chamadas para api */
app.use((req, res, next) => {
    //Troque http://localhost:4200 pelo endereço de acesso do seu front end não coloque / no final
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

/* Const para Acessar a Tabela Employee do Banco de dados  */
const Reminder = mongoose.model('reminder');

/* Inicializa a conexão com o banco e cria/seleciona a database reminder */
mongoose.connect('mongodb://127.0.0.1/reminder', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() =>{
    console.log('MongoDB INICIOU');
}
).catch((erro) =>
{
    console.log(erro);
});




/*Define a porta que será inicializada a API*/
app.listen(8080, ()=> {
    console.log('servidor iniciado na porta 8080');
})

/*Faz um selectAll na tabela de reminder no MongoDb  */
app.get("/getReminder", (req, res) =>{
    Reminder.find({}).sort('-priority').then((reminder) => {
        return res.json(reminder);
    }).catch((erro) => {
        return res.status(200).json({
            error: true,
            message: "Nenhum Lembrete encontrado!"
        })
    })
});

/* Insere novo lembrete na tabela reminder no MongoDb */
app.post("/saveReminder", (req,res) => {
    const reminder = Reminder.create(req.body, (error) => {
        if(error)
         {
             return res.status(400).json({
                 error:true,
                 message:"error:Lembrete não cadastrado"
             })
         }
         return res.status(200).json({
            error:false,
            message:"Sucess: Lembrete Cadastrado"
        }) 
    });
})

/* Atualiza os dados de um lembrete na Tabela reminder no MongoDB */
app.put("/editReminder/:id", (req,res) => {
    const reminder = Reminder.updateOne({ _id: req.params.id}, req.body, (error) => {
        if(error)
        {
            return res.status(400).json({
                error:true,
                message:"Error: não foi possível editar o Lembrete"
            });
        }
        return res.status(200).json({
            error:false,
            message:"Lembrete editado com sucesso"
        });
    })
})

/* Deleta um colaborador na tabela reminder no MongoDB */
app.delete("/deleteReminder/:id", (req,res) => {
    const reminder = Reminder.deleteOne({ _id: req.params.id}, req.body, (error) => {
        if(error)
        {
            return res.status(400).json({
                error:true,
                message:"Error: não foi possivel excluir o Lembrete"
            });
        }
        return res.status(200).json({
            error:false,
            message:"Lembrete Excluido com sucesso"
        });
    })
})
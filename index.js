//carregar o módulo express

const { urlencoded } = require('express')
const express = require('express')

//carregar o modulo mongoose 
const mongoose = require('mongoose')

//conectar com o banco de dados revisao 
const conexao = ()=>{
    mongoose.connect('mongodb+srv://revisao:revisao1234@cluster0.mx6rm.mongodb.net/Revisaodb')
}

//conectar com a collecion revisao 
const modelo = new mongoose.Schema({
    nome:String,
    turma:String,
    disciplina:String
})
const revisao = mongoose.model('revisao',modelo)

//executar o modulo express 

const app = express()

//definir o local padrao para os arquivos ejs
app.set('views','./')

//renderizar o arquivo index.ejs na requisição / (root)
app.get ('/',async(req,res)=>{
conexao()
const resultado = await revisao.find()

    res.render('index.ejs',{resultado})
    //console.log(resultado)
})

//gravar as informações do usuario no banco de dados 
app.use(urlencoded({extended:false}))
app.post('/', async(req,res)=>{
    const dados = req.body
   // res.send(dados)
   const gravar = new revisao({
    nome:dados.nome,
    turma:dados.turma,
    disciplina:dados.disciplina
   }).save()
   res.redirect('/')
})

//ligar o servidor da porta 1010
const porta = process.env.port || 1010
app.listen (1010,()=>{
    console.log('servidor local em http://localhost:1010')
}) 


import express, { response } from "express";
import mysql from 'mysql'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import bcrypt, { hash } from 'bcrypt'
import cookieParser from "cookie-parser";

const salt = 10;

const app = express()
app.use(express.json())
app.use(cors({
    origin:["http://localhost:3000"],
    methods:["POST"],
    credentials:true
}))
app.use(cookieParser())

const db = mysql.createConnection({
    host: "localhost",
    user: "marco",
    password: "root",
    database: "user_registration"
})

app.post('/register', (req, res) => {
    const sql = "INSERT INTO login (`name`,`email`,`password`) values (?)"
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if (err) return res.json({ Error: 'Error Hashing password' })
        const values = [
            req.body.name,
            req.body.email,
            hash
        ]
        db.query(sql,[values],(err,result)=>{
            if(err) return res.json({Error:"Inserting data error in server"})
            return res.json({Status:"Success"})
        })
    })
})

app.post('/login', (req, res) => {
    const sql = "Select * from login where email = ?"
    db.query(sql,[req.body.email],(err,data)=>{
        if(err) return res.json({Error:"Login Error in Server"})
        if(data.length >0){
            bcrypt.compare(req.body.password.toString(),data[0].password,(err,response)=>{
                if(err) return res.json({Error:"Password compare error"})
                if(response){
                    const name = data[0].name
                    const token = jwt.sign({name},'jwt-security-key',{expiresIn:'1d'})
                    res.cookie('token',token)
                    return res.json({Status:"Success"})
                }else{
                    return res.json({Error:"Password not matched"})
                }
            })
        }else{
            return res.json({ Error: 'No email existed' })
        }
    })
})

const verifyUser = (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.json({Error:"You are not authenticated"})
    }else{
        jwt.verify(token,'jwt-security-key',(err,decoded)=>{
            if(err){
                return res.json({Error:"Token not correct"})
            }else{
                req.name = decoded.name
                next()
            }
        })
    }
}

app.get('/',verifyUser,(req,res)=>{
    return res.json({Status:"Success",name:req.name})
})

app.get('/logout',(req,res)=>{
    res.clearCookie('token')
    return res.json({Status:"Success"})
})


app.listen(8080, () => {
    console.log("Server is Running")
})
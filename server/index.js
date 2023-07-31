import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import conectDb from './mongoDb/connect.js';
import postRoutes from "./routes/postRoutes.js"
import dalleRoutes from "./routes/dalleRoutes.js"

//this line allows us to pool our enviorment variables from dotenv file
dotenv.config();
const app = express();
app.use(cors());
//that accepts an option object where we can set the limit to 50 mega bites
app.use(express.json({limit: '50mb'}));

app.use('/api/v1/post', postRoutes)
app.use('/api/v1/dalle', dalleRoutes)

app.get('/', async(req,res)=>{
    res.send('hello from DALL-E')
})

const startServer = async()=>{
    try{
        conectDb(process.env.MONGO_URL)
        app.listen(3000, ()=>{
            console.log("Server has started on port http://localhost:3000")
        })
    }catch(err){
        console.log(err)
    }
    
}
startServer()
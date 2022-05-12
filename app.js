require('dotenv').config();
//async errors


const express = require('express');
const app = express();

const notFoundMiddleware  = require('./middleware/not-found')
const errorMiddleware  = require('./middleware/error-handler')

//middleware
app.use(express.json())

//routes

app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products"> Products Route </a>')
})

//products route


app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
    try{
        //connectDB
        app.listen(port, console.log(`Server is listening on Port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()
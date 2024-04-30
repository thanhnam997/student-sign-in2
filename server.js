const express = require('express')
const apiRoutes = require('./routes/api.js')

const app = express()

app.use(express.json()) 

app.use('/api', apiRoutes)


app.use(function(req, res , next){
     res.status(404).send('not found')
})

app.use(function(req, res, next){
    console.error(err.stack) // for server developes
    res.status(500).send('server error') //for client 
})




const server = app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port', server.address().port)
})
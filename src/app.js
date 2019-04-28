const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geo-code')
const forcast = require('./utils/forcast')


// Defining path for Express config
const publicDirectoryPath = path.join(__dirname ,'../public')
const viewsPath = path.join(__dirname ,'../templates/views')
const partialPath = path.join(__dirname ,'../templates/partials')

// Defining Setup for handlebars engine and views location

app.set('view engine' ,'hbs')
app.set('views' ,viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serv
app.use(express.static(publicDirectoryPath))

app.get('',(req , res ) =>{
    res.render('index' ,{
        title :'Weather',
        name:'Yash'
    })
})

app.get('/help',(req , res ) =>{
    res.render('help' ,{
        title :'Help',
        name:'Yash'
    })
})

app.get('/about',(req , res ) =>{
    res.render('about' ,{
        title :'About',
        name:'Yash'
    })
})

app.get('/weather', ( req , res )=>{
    if( !req.query.address ) {
        return res.send({
            error:'Please provide location'
    })
    }
   geocode(req.query.address,(error , { longitude , latitude , location} = {}) =>{
    if ( error ){
        return res.send({
            error
    })
    }
    forcast(longitude,latitude,(error , forcastData)=>{
     if ( error ){
         return res.send({
            error
    })
    }
     res.send({
        forcast:forcastData,
        location,
        address:req.query.address

    })

})
})

})

app.get('/help/*', ( req , res )=>{
   res.render('404' ,{
       title:'404',
        name:'Yash', 
        errorMessage :'Help artical not found'
    })
})
app.get('*', ( req , res )=>{
     res.render('404' ,{
        title:'404',
        name:'Yash', 
        errorMessage :'Page Not Found'
    })
})

app.listen(3000 , () =>{
    console.log('Server is up and listening to 3000')
})
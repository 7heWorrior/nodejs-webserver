const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


const app = express()
const port = process.env.PORT || 3000
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))
app.get('',(req, res)=>{
    res.render('index',{
        name: "Manas Mahajan",
        title: "Weather"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About ME',
        name: "Manas Mahajan"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help Page',
        name: 'Manas Mahajan',
    email: 'manas.mahajan@gmail.com'
    })
})
app.get('/help/*',(req, res)=>{
    res.render('error',{
        title: 'Help Page not Found',
        name: 'Manas Mahajan'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address,(error,{longitude,latitude,location}={})=>{
        if(error){
            return res.send({ error})
        }
        forecast(latitude,longitude,(error,forcastedata)=>{
            if(error){
                return res.send({ error})
            }
            return res.send({
                forecast: forcastedata,
                location,
                address: req.query.address
            })
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
})
app.get('*',(req, res)=>{
    res.render('error',{
        title:'404:Page Not Found',
        name: 'Manas Mahajan'
    })
})

app.listen(port, () =>{
    console.log('Server is up on port ' + port)
})
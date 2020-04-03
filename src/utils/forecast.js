const request = require('request')

const forecast = (latitude,longitude,callback) =>{
    const url = 'https://api.darksky.net/forecast/f2ee419e9bb92d8f7f4ce831a077f1f4/'+latitude+','+longitude+'?units=si'
    request({url: url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to forcasting services!!',undefined)
        }else if(response.error){
            callback(response.error,undefined)
        }else{
            callback(undefined,response.body.daily.data[0].summary +' Currently the temperature is '+ response.body.currently.temperature + ' .There is '+ response.body.currently.precipProbability + '% chances of rainfall')
        }
    })
}


module.exports = forecast
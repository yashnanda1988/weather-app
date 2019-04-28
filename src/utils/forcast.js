const request = require('request')

const forecast = (latitude,longitude,callback) =>{

    const url ='https://api.darksky.net/forecast/1715e1886d2116900f675b65e8e56ea5/'+latitude+','+longitude+'?units:si'
    request({url , json:true},(error , { body })=>{
        if(error){
           callback('Unable to connect weather service !',undefined) 
        }else if (body.error){
            callback('Unable to find location !',undefined)
        }else{
            callback(undefined,'it is '+body.currently.temperature +' out there today and '+ body.currently.precipProbability +'% chance of rain')
        }
    })

}

module.exports = forecast
console.log('Client Side JS file !!!')




const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg1')
const msgTwo = document.querySelector('#msg2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const address = search.value
    msgOne.textContent = "Loading ...."
    msgTwo.textContent = " "
    fetch('http://localhost:3000/weather?address='+ address).then((response)=>{
    response.json().then((data)=>{
        // var location = document.createElement('div')
        // var forecast = document.createElement('div')
        if(data.error){
            // location.innerHTML = "<p>Location Not Found. Please try again later</p>"
            // forecast.innerHTML = "<p></p>"
            msgOne.textContent =  data.error
        }
        else{
        // location.innerHTML = "<p>Location: " + data.location + " </p>"
        // forecast.innerHTML = "<p>Forecast: " + data.forecast + "</p>"
            msgOne.textContent = data.location
            msgTwo.textContent = data.forecast
        }
        // document.getElementById('main').appendChild(location)
        // document.getElementById('main').appendChild(forecast)
    })
})
})
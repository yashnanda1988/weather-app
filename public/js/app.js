console.log('Client Side Java script loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message_1')
const messageTwo = document.querySelector('#message_2')


weatherForm.addEventListener('submit' , (event) =>{
    event.preventDefault()
    const location = search.value
    messageOne.textContent ='Loading...'
    messageTwo.textContent =''

    fetch('/weather?address='+location).then((response) => {
    response.json().then((data) =>{
        if (data.error){
            messageOne.textContent = data.error
        }else{
            console.log(data.forcast)
              messageOne.textContent = data.location
              messageTwo.textContent = data.forcast.forcast
            

        }

    })
})
  
})

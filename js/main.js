document.querySelector('button').addEventListener('click', apiRequest)

async function apiRequest(){
    const villainName = document.querySelector('input').value
    try{
        const response = await fetch(`https://villains-api-100devs.herokuapp.com/api/${villainName}`)
        const data = await response.json()

        console.log(data)
        document.querySelector('h2').innerText = data.name
    }catch(error){
        console.log(error)
    }
}
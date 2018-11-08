export const getUser = async () => {
    const response = await fetch('https://api.innovatorymm.com/api/v1/users/0808051936360726')
    const {data} = await response.json()
    return data
}

export const addNewRoute = async (route) => {

    const data = {
        startPoint : route.startPoint,
        endPoint : route.endPoint,
        note : route.note,
        expected : 1000,
        pay : 0,
        date : route.date,
        time : route.time, 
        userID : "0223024040957241"
    }

    console.log(data)

    const response = await fetch('https://api.innovatorymm.com/api/v1/routes',{
        method : 'POST',
        headers: {'content-type' : 'application/json'},
        body : JSON.stringify(data),
    })

    return response
}
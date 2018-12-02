export const getUser = async () => {
    const response = await fetch('https://api.innovatorymm.com/api/v1/users/0808051936360726')
    const {data} = await response.json()
    return data
}

export const userRegister = async(data) => {

    userData = {
        name : data.name,
        phone : data.phone,
        university : data.university,
        carModel : data.carModel,
        carNumber : data.carNumber,
        password : data.password,
        role : 'Driver',
    }

    console.log(userData)

    const response = await fetch('https://api.innovatorymm.com/api/v1/users', {
        method : 'POST',
        headers : { 'content-type' : 'application/json'},
        body : JSON.stringify(userData)
    })
    console.log(response)
    return response
}

export const login = async(data) => {

    const userData = {
        phoneNo : data.phone,
        password : data.password,
    }

    const response = await fetch('https://api.innovatorymm.com/api/v1/users/login', {
        method : 'POST',
        headers : {'content-type' : 'application/json'},
        body : JSON.stringify(userData)
    })

    return response
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

    const response = await fetch('https://api.innovatorymm.com/api/v1/routes',{
        method : 'POST',
        headers: {'content-type' : 'application/json'},
        body : JSON.stringify(data),
    })

    return response
}   
export const getUser = async (uid) => {
    const response = await fetch('https://api.innovatorymm.com/api/v1/users/'+uid)
    const {data} = await response.json()
    return data
}

export const userRegister = async(data) => {

    userData = {
        id : data.id,
        name : data.name,
        phone : data.phone,
        university : data.university,
        carModel : data.carModel,
        carNumber : data.carNumber,
        password : data.password,
        role : data.role,
        photo : data.formData,
    }

    console.log(userData)

    const response = await fetch('https://api.innovatorymm.com/api/v1/users', {
        method : 'POST',
        headers : { 'content-type' : 'application/json'},
        body : JSON.stringify(userData)
    })
    return response
}

export const photoUpload = async(formData) => {
    const response = await fetch('https://api.innovatorymm.com/api/v1/users/imageupload', {
        method : 'POST',
        headers : { 'content-type' : 'multipart/form-data' },
        body : formData,
    })
    return response
}

export const profileUpload = async(formData) => {
    const response = await fetch('https://api.innovatorymm.com/api/v1/users/profileupload', {
        method : 'POST',
        headers : { 'content-type' : 'multipart/form-data' },
        body : formData,
    })
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

export const makeTopup = async (data) => {
    const paymentData = {
        code : data.code,
        userID : data.userID,
    }
    const response = await fetch('https://api.innovatorymm.com/api/v1/payment/topup', {
        method : 'POST',
        headers : {'content-type' : 'application/json'},
        body : JSON.stringify(paymentData)
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

export const getRoutesByUser = async (uid) => {
    const response = await fetch(`https://api.innovatorymm.com/api/v1/routes/user/${uid}`)
    const data = await response.json()

    return data
}
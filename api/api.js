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
        notes : route.notes,
        date : route.date, 
        userID : route.userID,
    }
    console.log(data)
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

export const getRoutes = async () => {
    const response = await fetch(`https://api.innovatorymm.com/api/v1/routes/`)
    const data = await response.json()

    return data
}

export const requestRoute = async (request) => {

    const requestData = {
        userID: request.userID,
        startPoint: request.startPoint,
        endPoint: request.endPoint,
        routeID : request.routeID,
    }
    console.log(requestData)
    const response = await fetch('https://api.innovatorymm.com/api/v1/requests',{
        method : 'post',
        headers: {'Accept':'application/json','content-type' : 'application/json'},
        body : JSON.stringify(requestData),
    })

    return response
}

export const getRequests = async (rid) => {
    console.log(rid)
    const response = await fetch(`https://api.innovatorymm.com/api/v1/routes/${rid}/requests`)
    return response
}

export const respondRequest = async (request) => {
    const data = {
        id : request.requestID,
        status : request.status,
    }

    const response = await fetch('https://api.innovatorymm.com/api/v1/requests/respond', {
        method : 'post',
        headers : {'content-type' : 'application/json'},
        body : JSON.stringify(data)
    })

    return response
}

export const getPendingByUser = async (uid) => {
    const response = await fetch(`https://api.innovatorymm.com/api/v1/routes/pending/${uid}`)
    const data = await response.json()

    return data
}

export const setLocation = async (loc) => {

    const data = {
        id : loc.id,
        lat: loc.lat,
        long: loc.long,
    }
    const response = await fetch('https://api.innovatorymm.com/api/v1/users/latlong',{
        method : 'POST',
        headers: {'content-type' : 'application/json'},
        body : JSON.stringify(data),
    })

    return response
}

export const getLocation = async (rid) => {
    const response = await fetch(`https://api.innovatorymm.com/api/v1/routes/${rid}/latlong`)
    const data = await response.json()

    return data
}

export const rate = async (userID) => {

    const data = {
        id : userID,
    }

    const response = await fetch('https://api.innovatorymm.com/api/v1/users/latlong',{
        method : 'POST',
        headers: {'content-type' : 'application/json'},
        body : JSON.stringify(data),
    })

    return response
}
export const getRoutesByUser = async (uid) => {
    const response = await fetch(`https://api.innovatorymm.com/api/v1/routes/user/${uid}`)
    const data = await response.json()

    return data
}

export const getRequests = async (rid) => {
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

export const addNewRoute = async (route) => {

    const data = {
        startPoint : route.startPoint,
        endPoint : route.endPoint,
        notes : route.notes,
        date : route.date, 
        userID : route.userID,
    }
    const response = await fetch('https://api.innovatorymm.com/api/v1/routes',{
        method : 'POST',
        headers: {'content-type' : 'application/json'},
        body : JSON.stringify(data),
    })

    return response
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
        rating : 1,
    }

    const response = await fetch('https://api.innovatorymm.com/api/v1/users/rating',{
        method : 'POST',
        headers: {'content-type' : 'application/json'},
        body : JSON.stringify(data),
    })

    return response
}


export const endRoute = async (end) => {
    const data = {
        id : end,
    }
    const response = await fetch(`https://api.innovatorymm.com/api/v1/routes/end`,{
        method : 'POST',
        headers: {'content-type' : 'application/json'},
        body : JSON.stringify(data),
    })

    return response
}
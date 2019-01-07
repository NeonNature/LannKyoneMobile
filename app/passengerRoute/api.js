export const getRoutes = async (university) => {
    const response = await fetch(`https://api.innovatorymm.com/api/v1/routes/university/${university}`)
    const data = await response.json()

    return data
}

export const getPendingByUser = async (uid) => {
    const response = await fetch(`https://api.innovatorymm.com/api/v1/routes/pending/${uid}`)
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
    const response = await fetch('https://api.innovatorymm.com/api/v1/requests',{
        method : 'post',
        headers: {'Accept':'application/json','content-type' : 'application/json'},
        body : JSON.stringify(requestData),
    })

    return response
}
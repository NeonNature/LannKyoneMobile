export const profileUpload = async(formData) => {
    const response = await fetch('https://api.innovatorymm.com/api/v1/users/profileupload', {
        method : 'POST',
        headers : { 'content-type' : 'multipart/form-data' },
        body : formData,
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

export const getUser = async (uid) => {
    const response = await fetch('https://api.innovatorymm.com/api/v1/users/'+uid)
    const {data} = await response.json()
    return data
}

export const getRouteHistory = async(uid) => {
    const response = await fetch(`https://api.innovatorymm.com/api/v1/routes/history/${uid}`)
    const data = await response.json()

    return data
}
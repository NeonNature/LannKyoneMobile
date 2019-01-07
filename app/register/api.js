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

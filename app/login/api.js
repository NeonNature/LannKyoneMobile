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
export const getUser = async () => {
    const response = await fetch('https://api.innovatorymm.com/api/v1/users/0808051936360726')
    const {data} = await response.json()
    return data
}

export const addNewRoute = async (route) => {

    const response = await fetch('https://api.innovatorymm.com/api/v1/routes',{
        method : 'POST',
        headers: {'content-type' : 'application/json'},
        body : JSON.stringify(route)
    })

    return response
}
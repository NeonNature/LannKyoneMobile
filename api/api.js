export const getUser = async () => {
    const response = await fetch('https://api.innovatorymm.com/api/v1/users/0808051936360726')
    const {data} = await response.json()
    return data
}
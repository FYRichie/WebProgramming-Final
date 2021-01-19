export default (userData) => {
    for(let i = 0; i < userData.length; i++) {
        if(userData[i].repeat !== undefined && userData[i].repeat > 1) {
            userData[i].rRule = `FREQ=WEEKLY;COUNT=${userData[i].repeat}`
        }
    }
    return userData.filter(element => element.isSelected)
}
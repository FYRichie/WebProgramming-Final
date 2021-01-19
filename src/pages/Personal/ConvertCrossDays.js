export default (userData) => {
    for(let i = 0; i< userData.length; i++) {
        if(parseInt((userData[i].endTime - userData[i].startTime)/86400000)){return true}
    }
    
}
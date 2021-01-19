const month_list = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const month_days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const month_days_leap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function detect_leap_year(year) {
    if(year % 4 !== 0) return false
    if(year % 100 !== 0 && year % 4 === 0) return true
    if(year % 100 === 0 && year % 400 !== 0) return false
    if(year % 400 ===0) return true
}

function calculateDays(start_m, start_d, end_m, end_d, start_y, end_y) {
    let start_total = 0;
    let end_total = 0;
    if(detect_leap_year(start_y)) {
        for(let i = 0; i < start_m; i++) {
            start_total += month_days_leap[i]
        }
    }
    else {
        for(let i = 0; i < start_m; i++) {
            start_total += month_days[i]
        }
    }
    if(detect_leap_year(end_y)) {
        for(let i = 0; i < start_m; i++) {
            start_total += month_days_leap[i]
        }
    }
    else {
        for(let i = 0; i < end_m; i++) {
            end_total += month_days[i]
        }
    }
    if(detect_leap_year(start_y)) {
        return end_total - start_total + end_d - start_d + 1 + 366*(end_y - start_y)
    }
    else {
        return end_total - start_total + end_d - start_d + 1 + 365*(end_y - start_y)
    } 
}

export default (userData) => {
    const times = [];
    // console.log(userData);
    for(let i = 0; i < userData.length; i++) {
        if((userData[i].startDate.getDate() !== userData[i].endDate.getDate()) || (userData[i].startDate.getFullYear() !== userData[i].endDate.getFullYear)) {     //跨日
            const start_d = userData[i].startDate.getDate();
            const end_d = userData[i].endDate.getDate();
            const start_m_str = userData[i].startDate.toDateString().slice(4, 7);
            const end_m_str = userData[i].endDate.toDateString().slice(4, 7);
            const start_m = month_list.indexOf(start_m_str)
            const end_m = month_list.indexOf(end_m_str)
            const start_y = userData[i].startDate.getFullYear();
            const end_y = userData[i].endDate.getFullYear();
            // const start_min = userData[i].startDate.getMinutes();
            // const end_min = userData[i].endDate.getMinutes();
            // const start_h = userData[i].startDate.getHours();
            // const end_h = userData[i].endDate.getHours();
            const fragments = calculateDays(start_m, start_d, end_m, end_d, start_y, end_y)
            let template = userData[i];
            //console.log(fragments);
            if(fragments > 0 && fragments !== 1) {
                let template = userData[i];
                let day_end = new Date(start_y, start_m, start_d, 23, 59, 59, 999).getTime();
                for (let j = 0; j < fragments; j++) {
                    if(j == 0) {
                        times.push({color: template.color, endDate: new Date(day_end), id: template.id, isSelected: template.isSelected, startDate:userData[i].startDate, title: template.title});
                    }
                    else if(j !== fragments - 1) {
                        // times.push([new Date(day_end + 1000), new Date(day_end + 86400000)]);
                        times.push({color: template.color, endDate: new Date(day_end + 86400000), id: template.id, isSelected: template.isSelected, startDate:new Date(day_end + 1000), title: template.title});
                        day_end += 86400000;
                    }
                    else {
                        // times.push([new Date(day_end + 1000), userData[i].endDate]);
                        times.push({color: template.color, endDate: userData[i].endDate, id: template.id, isSelected: template.isSelected, startDate: new Date(day_end + 1000), title: template.title});
                    }
                }
                userData.splice(i, 1);
                i -= 1;
            }
        }
    }
    // console.log(userData);
    // console.log(times);
    for (let i = 0; i < times.length; i++) {
        times[i].id = userData.length + i + 1;
    }
    return [...userData, ...times];
}
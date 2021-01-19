export default (userData) => {
    let data = [];
    let Id = 0;
    const layer = userData.layer;
    for (let layerIndex = 0; layerIndex < layer.length; layerIndex++){
        const Color = layer[layerIndex].layerColor;
        const isSelected = layer[layerIndex].layerSelected;
        const event = layer[layerIndex].event;
        for (let eventIndex = 0; eventIndex < event.length; eventIndex++){
            const Name = event[eventIndex].eventName;
            const Repeat = event[eventIndex].eventRepeatEveryweek;
            const Time = event[eventIndex].eventTime;
            for (let timeIndex = 0; timeIndex < Time.length; timeIndex++){
                const startTime = new Date(Date.parse(Time[timeIndex].startTime));
                const endTime = new Date(Date.parse(Time[timeIndex].endTime));
                data.push({
                    title: Name,
                    color: Color,
                    isSelected: isSelected,
                    id: Id,
                    repeat: Repeat,
                    startDate: startTime,
                    endDate: endTime
                });
                Id += 1;
            }
        }
    }
    return data;
}
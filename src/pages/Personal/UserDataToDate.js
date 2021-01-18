export default (userData) => {
    let data = [];
    let id = 0;
    const layer = userData.layer;
    for (let layerIndex = 0; layerIndex < layer.length; layerIndex++){
        const Color = layer[layerIndex].layerColor;
        const isSelected = layer[layerIndex].layerSelected;
        const event = layer[layerIndex].event;
        for (let eventIndex = 0; eventIndex < event.length; eventIndex++){
            const Name = event[eventIndex].eventName;
            const Time = event[eventIndex].eventTime;
            for (let timeIndex = 0; timeIndex < Time.length; timeIndex++){
                const startTime = Time[timeIndex].startTime.toDate();
                const endTime = Time[timeIndex].endTime.toDate();
                data.push({
                    title: Name,
                    color: Color,
                    isSelected: isSelected,
                    id: id,
                    startDate: startTime,
                    endDate: endTime
                });
                id += 1;
            }
        }
    }
    return data;
}
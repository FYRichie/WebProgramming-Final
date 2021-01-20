export default (Time, TimeIndex) => {
    return (
        <>
            {TimeIndex + 1}.From {(new Date(Date.parse(Time.startTime))).toString().slice(0, 
                (new Date(Date.parse(Time.startTime))).toString().length - 15)}
            <br />
            To {(new Date(Date.parse(Time.endTime))).toString().slice(0,
                (new Date(Date.parse(Time.endTime))).toString.length - 15)}
            <br />
        </>
    );
}
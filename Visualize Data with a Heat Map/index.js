const req = new XMLHttpRequest();
req.open('GET', 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json', true);
req.send();
req.onload = () => {
    const rawdata = JSON.parse(req.responseText);
    const data = rawdata.map(d => [new Date(`Jan 01, ${d['Year']} 00:00:00`), new Date(`Jan 01, 0000 00:${d['Time']}`)]);
    
};

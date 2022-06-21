const req = new XMLHttpRequest();
req.open('GET', 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json', true);
req.send();
req.onload = () => {
    const rawdata = JSON.parse(req.responseText);
    const dataset = rawdata;

    const monthNumToString = {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December",
    }

    const svgHeight = 500, svgWidth = 900;
    const svgPadding = 30;

    const svg = d3.select("body")
        .append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth);

    xScale = d3.scaleLinear()
        .domain([d3.min(dataset.monthlyVariance.map(d => d.year)), d3.max(dataset.monthlyVariance.map(d => d.year))])
        .range([svgPadding, svgWidth - svgPadding]);

    yScale = d3.scaleLinear()
        .domain([d3.max(dataset.monthlyVariance.map(d => d.month)), d3.min(dataset.monthlyVariance.map(d => d.month))])
        .range([svgHeight -svgPadding, svgPadding])

    console.log(dataset["monthlyVariance"].map(d => d["month"]));

    // svg.selectAll("rect")
    //     .data(dataset)
    //     .enter()
    //     .append("rect")
    //     .attr()
    //     .attr()


};

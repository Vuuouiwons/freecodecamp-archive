const req = new XMLHttpRequest();
req.open('GET', 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json', true);
req.send();
req.onload = () => {
	const rawdata = JSON.parse(req.responseText);
	const data = rawdata.map(d => [new Date(`Jan 01, ${d['Year']} 00:00:00`), new Date(`Jan 01, 0000 00:${d['Time']}`)]);
    
    const svgHeight = 600,
        svgWidth = 700,
        svgPadding = 50;

    const svg = d3.select('body')
                    .select('div')
                    .append('svg')
                    .attr('height', svgHeight)
                    .attr('width', svgWidth);

    const tooltip = d3.select('body')
                        .append('div')
                        .attr('id', 'tooltip')
                        .style('position', 'absolute')
                        .style('z-index', '10')
                        .style('visibility', 'hidden')
                        .style('background', "#FFF")
                        .style('opacity', '0%')
                        .style('text-align', 'center')
                        .style('margin', 'auto');

    const xScale = d3.scaleTime()
                    .domain([d3.min(data, d => d[0]), d3.max(data, d => d[0])])
                    .range([svgPadding, svgWidth - svgPadding]);

    const yScale = d3.scaleTime()
                    .domain([d3.min(data, d => d[1]), d3.max(data, d => d[1])])
                    .range([svgPadding, svgHeight - svgPadding * 2]);

    svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('data-xvalue', d => d[0].getFullYear())
        .attr('data-yvalue', d => d[1])
        .attr('cx', d => xScale(d[0]))
        .attr('cy', d => yScale(d[1]) + svgPadding)
        .attr('r', 5)
        .on('mouseover', d => tooltip.text(`${d[0].getFullYear()}, ${d[1].getMinutes()}:${d[1].getSeconds()}`)
                                    .attr('data-year', d[0].getFullYear())
                                    .style('visibility', 'visible')
                                    .style('opacity', '100%')
                                    .style('transition', '300ms')
        )
        .on('mouseout', () => tooltip.style('visibility', 'hidden')
                                    .style('opacity', '0%')
                                    .style('transition', '300ms')
        );

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale)
                    .tickFormat(d => d3.timeFormat('%M:%S')(d));

    svg.append('g')
        .attr('transform', `translate(0, ${svgHeight - svgPadding})`)
        .attr('id', 'x-axis')
        .call(xAxis);

    svg.append('g')
        .attr('transform', `translate(${svgPadding}, ${svgPadding})`)
        .attr('id', 'y-axis')
        .call(yAxis);

    svg.append('g')
        .attr('id', 'legend')
        .attr('transform', `translate(${svgWidth/10 + ', ' + svgHeight/10})`);
};

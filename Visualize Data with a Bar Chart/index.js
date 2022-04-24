const req = new XMLHttpRequest();
req.open('GET', 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json', true);
req.send();
req.onload = () => {
	const rawdata = JSON.parse(req.responseText);
	const data = rawdata['data'];
	const svgWidth = 700,
		svgHeight = 500,
		svgPadding = 50;
	const barWidth = svgWidth / data.length;

	const xLabel = data.map((d, i) => {
		let tq = i;
		tq = (tq % 4) + 1;
		return [d[0].split('-')[0], d[0], `Q${tq}`];
	});

	const xDate = data.map((d) => new Date(`${d[0]} 00:00`));

	const xScale = d3.scaleLinear()
					.domain([d3.min(xLabel, d => d[0]), d3.max(xLabel, d => d[0])])
					.range([svgPadding, svgWidth - svgPadding]);

	const barXScale = d3.scaleTime()
						.domain([d3.min(xDate, d => d), d3.max(xDate, d => d)])
						.range([svgPadding, svgWidth - svgPadding]);

	const yScale = d3.scaleLinear()
					.domain([0, d3.max(data, d => d[1])])
					.range([svgHeight - svgPadding * 2, 0]);

  d3.select('body')
    .select('div')
    .append('h1')
	.attr('id', 'title')
    .style('background', '#FFF')
    .style('text-align', 'center')
    .style('margin', 'auto')
	.text('USD GDP BarChart');

  const svg = d3.select('body')
				.select('div')
				.append('svg')
				.attr('width', svgWidth)
				.attr('height', svgHeight);

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

	svg.selectAll('rect')
		.data(data)
		.enter()
		.append('rect')
		.attr('class', 'bar')
		.attr('x', (d, i) => {
			let dict = {
				1: 0,
				2: 0.25,
				3: 0.50,
				0: 0.75
			};
			return xScale(parseInt(d[0].split('-')[0]) + dict[(i + 1) % 4]);
		})
		.attr('y', d => yScale(d[1]) + svgPadding)
		.attr('width', barWidth)
		.attr('height', d => svgHeight - svgPadding * 2 - yScale(d[1]))
		.attr('data-date', d => d[0])
		.attr('data-gdp', d => d[1])
    .on('mouseover', (d, i) => {
      let tq = i;
		  tq = (tq % 4) + 1;
      tooltip.text(` GDP : $${d[1]}B | Q${tq}`);
      return tooltip.attr('data-date', d[0])
					.style('visibility', 'visible')
					.style('opacity', '100%')
					.style('transition', '300ms');
    })
    .on('mouseout', () => tooltip.style('visibility', 'hidden')
								.style('opacity', '0%')
								.style('transition', '300ms'));

	const xAxis = d3.axisBottom(barXScale);
	const yAxis = d3.axisLeft(yScale);

	svg.append('g')
		.attr("transform", `translate(0, ${svgHeight - svgPadding})`)
		.attr('id', 'x-axis')
		.call(xAxis);

	svg.append('g')
		.attr("transform", `translate(${svgPadding}, ${svgPadding})`)
		.attr('id', 'y-axis')
		.call(yAxis);
};
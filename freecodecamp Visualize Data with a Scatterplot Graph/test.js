var data = ["12:32", "21:05", "24:56", "36:30", "45:14", "71:11"];
var specifier = "%M:%S";
var svg = d3.select("svg");
var parsedData = data.map(d => d3.timeParse(specifier)(d));
var scale = d3.scaleTime()
  .domain(d3.extent(parsedData))
  .range([30, 470]);
var axis = d3.axisBottom(scale)
  .tickValues(parsedData)
  .tickFormat(d => d3.timeFormat(specifier)(d));
var gX = svg.append("g")
  .attr("transform", "translate(0,50)")
  .call(axis)
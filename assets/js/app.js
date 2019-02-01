// @TODO: YOUR CODE HERE!

var div = d3.select('#scatter').append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);


d3.csv('assets/data/data.csv').then(function (d) {
    console.log(d3.values(d))
    console.log(
        d3.max([0, d3.max(d, function (d) {
            return +d.poverty
        })])
    );
    console.log(d3.max([d]));
    
    const margin = {
    top: 20,
    right: 40,
    bottom: 30,
    left: 40
    };
    
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;


    const xScale = d3.scaleLinear()
    .domain([
        d3.min([8.5, d3.min(d, function (d) {return +d.poverty
        })]),
        d3.max([0, d3.max(d, function (d){return +d.poverty
        })])
    
    ])
    .range([0, width]);

    const yScale = d3.scaleLinear()
    .domain([
        d3.min([3.5, d3.min(d, function (d) {return +d.healthcare
        })]),
        d3.max([0, d3.max(d, function (d) {return +d.healthcare
        })])
        
    ])
    .range([height, 0]);

    const xAxis = d3.axisBottom(xScale)
    const yAxis = d3.axisLeft(yScale)


    const svg = d3.select('#scatter').append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")


    d.map(function (d) {
       console.log(d.poverty )
       poverty = d
       return poverty; })
     
    d.map(function (d) {
      console.log(d.healthcare)
        healthcare = d
        return healthcare;
    });

// x-axis
svg.append("g")
    .attr("class", "xaxis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

// y-axis
svg.append("g")
  .attr("class", "yaxis")
    .call(yAxis);

// plot the data
svg.selectAll(".dot")
    .data(d)
    .enter().append("circle")
    .attr("class", "dot")
    .attr("cx", function (data) { return xScale(data.poverty)})
    .attr("cy", function (data) { return yScale(data.healthcare)})
    .attr("r", 8)
    .attr("stroke", "black")
    .attr("fill", "gray")
    .on("mouseover", function (data){
        div.transition()
            .duration(225)
            .style("opacity", .9);
        div.html(data.state + "<br/>" + "Poverty(%)"+ data.poverty)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 30) + "px");	    
    })
    .on("mouseout", function (d) {
        div.transition()
            .duration(500)
            .style("opacity", 0);
    });
});

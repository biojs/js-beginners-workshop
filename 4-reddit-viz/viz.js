function main(){
    
    var stories = {};
    var n = 3000;
    var events = [];
    var initial = true;

    var reddit = ""; // empty for frontpage
    var reddit_url = "http://www.reddit.com/" + reddit + ".json";
    var proxy = "https://cors-anywhere.herokuapp.com/";
    
    function handleRedditData(rawData) {
        var newData = formatSingleSubreddit(rawData);
        visualize(newData);
    }
    
    function fetch(url, cb, n){
        
        d3.json(url, function(error, data){
            if (error) {
              return console.warn(error);
            }
            cb(data);
        });
        
        setTimeout(fetch, n, url, cb, n);
    };
    
    fetch( proxy + reddit_url, handleRedditData, n);
}

// Initialize tooltip
var tooltip = d3.tip().attr('class', 'd3-tip').html(function(d) { return d.title; }).direction('se').offset([0, 3]);

function formatSingleSubreddit(rawData) {
    return _.pluck(rawData.data.children, "data");
}

function visualize(redditActivitySources){
    //Viz options
    var width = 500, barHeight = 30;
    
    data = _.sortBy(redditActivitySources, function(d) { return -d.score });
    
    //var scale 
    var scale = d3.scale.linear()
        .domain([0, d3.max(data, function(d){ return d.score; })])
        .range([0, width]);
    
    var chart = d3.select("#viz")
        .attr("width", width)
        .attr("height", barHeight * data.length);
    
    // DATA JOIN
    // Join new data with old elements, if any.
    var bar = chart.selectAll("rect")
        .data(data, function(d){return d.id;});
    
    var text = chart.selectAll("text")
        .data(data, function(d){return d.id;});
    
    //UPDATE
    // Update old elements as needed.
    bar.transition()
      .duration(750)
        .attr("width", function(d){ return scale(d.score); })
        .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });
    
    text.text(function(d) {return d.score; })
        .attr("x", function(d) { return scale(d.score) - 5; })
        .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });
    
    // ENTER
    // Create new elements as needed.
    bar.enter().append("rect")
            .attr("width", 0)
            .attr("height", barHeight - 1)
            .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; })
            .on('mouseover', tooltip.show)
            .on('mouseout', tooltip.hide)
        .transition()
          .duration(750)
            .attr("width", function(d){ return scale(d.score); });
    
    text.enter().append("text")
            .attr("x", function(d) { return scale(d.score) - 5; })
            .attr("y", barHeight / 2)
            .attr("dy", ".35em")
            .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; })
            .text(function(d) {return d.score; });
    
    // EXIT
    // Remove old elements as needed.
    bar.exit().transition()
      .duration(325)
      .style("fill-opacity", 1e-6)
      .remove();
    
     text.exit().remove();
    
    // Invoke the tip in the context the visualization
    bar.call(tooltip)
}

main();


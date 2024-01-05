// const data = [
//     {width:200, height:100, fill:'purple'},
//     {width:100, height:60, fill:'pink'},
//     {width:50, height:30, fill:'red'},
// ]

// const svg = d3.select('svg');

// // elements in the dom
// const rects = svg.selectAll('rect')
// .data(data)
// .attr('width', (d, i, n)  => d.width)
// .attr('height', d =>  d.height)
// .attr('fill', d => d.fill)

// // virtual elements on the dom with enter selection
// rects.enter()
// .append('rect')
// .attr('width', (d, i, n)  => d.width)
// .attr('height', d =>  d.height)
// .attr('fill', d => d.fill)
const svg = d3.select('svg');

d3.json('planets.json').then(data => {
    const circs = svg.selectAll('circle')
        .data(data);

    // add attrs to circs alraeady on dom
    circs.attr('cy', 200)
    .attr('cx', data => data.distance)
    .attr('r', d => d.radius)
    .attr('fill', d => d.fill);

    // append the enter selection to the dom
    circs.enter()
        .append('circle')
        .attr('cy', 200)
        .attr('cx', data => data.distance)
        .attr('r', d => d.radius)
        .attr('fill', d => d.fill);
})
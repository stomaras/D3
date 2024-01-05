// // const data = [
// //     {width:200, height:100, fill:'purple'},
// //     {width:100, height:60, fill:'pink'},
// //     {width:50, height:30, fill:'red'},
// // ]

// // const svg = d3.select('svg');

// // // elements in the dom
// // const rects = svg.selectAll('rect')
// // .data(data)
// // .attr('width', (d, i, n)  => d.width)
// // .attr('height', d =>  d.height)
// // .attr('fill', d => d.fill)

// // // virtual elements on the dom with enter selection
// // rects.enter()
// // .append('rect')
// // .attr('width', (d, i, n)  => d.width)
// // .attr('height', d =>  d.height)
// // .attr('fill', d => d.fill)
// const svg = d3.select('svg');

// d3.json('planets.json').then(data => {
//     const circs = svg.selectAll('circle')
//         .data(data);

//     // add attrs to circs alraeady on dom
//     circs.attr('cy', 200)
//     .attr('cx', data => data.distance)
//     .attr('r', d => d.radius)
//     .attr('fill', d => d.fill);

//     // append the enter selection to the dom
//     circs.enter()
//         .append('circle')
//         .attr('cy', 200)
//         .attr('cx', data => data.distance)
//         .attr('r', d => d.radius)
//         .attr('fill', d => d.fill);
// })


const svg = d3.select('.canvas')
    .append('svg')
    .attr('width',600)
    .attr('height',600);

// create margins and dimensions

const margin = {top:20, right:20, bottom: 100, left:100};
const graphWidth = 600 - margin.left - margin.right;
const graphHeight = 600 - margin.top - margin.bottom;

const graph = svg.append('g').attr('width',graphWidth).attr('height', graphHeight)
    .attr('transform',`translate(${margin.left},${margin.right})`)

const xAxisGroup = graph.append('g').attr('transform', `translate(0, ${graphHeight})`);
const yAxisGroup = graph.append('g');

d3.json('menu.json').then(data => {

    const y = d3.scaleLinear()
        .domain([0,d3.max(data, d => d.orders)])
        .range([graphHeight,0]);

    const min = d3.min(data, d => d.orders);
    const max = d3.max(data, d => d.orders);
    const extent = d3.extent(data, d => d.orders);


    const x = d3.scaleBand()
        .domain(data.map(item => item.name))
        .range([0,500])
        .paddingInner(0.2)
        .paddingOuter(0.2);

    // join the data to rects
    const rects = graph.selectAll('rect').data(data)

    rects.attr('width', x.bandwidth())
    .attr('height', d => graphHeight - y(d.orders))
    .attr('fill', 'orange')
    .attr('x', (d)=> x(d.name))
    .attr('y', d => y(d.orders));

    // append the enter selection to the dom 
    rects.enter().append('rect')
    .attr('width',x.bandwidth)
    .attr('height', d => y(d.orders))
    .attr('fill', 'orange')
    .attr('x', d => x(d.name))
    .attr('y', d => y(d.orders))

    // create and call the axes
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y)
        .ticks(3).tickFormat(d => d + ' orders');

    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);
})
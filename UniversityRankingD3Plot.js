//var margin = {
//  top: 32,
//  right: 50,
//  bottom: 20,
//  left: 50
//};

var tick = 30;
var graph = {
		margin : {
				top: 30,
				right: 30,
				bottom: 50,
				left: 50
		},
		height: 800,
		width: 702*tick
};

var radialMargin = {
		top: 20,
		right: 20,
		bottom: 20,
		left: 15
};

var radialWidth = 70 - radialMargin.left - radialMargin.right;
var radialHeight = 70 - radialMargin.top - radialMargin.bottom;
var radialLabelMargin = 8;

var radialScale = d3.scale.linear()
  .domain([0, 100])
  .range([0, 100])

d3.csv('preprocessed.csv')
	.row(function(d) {
		d.TeachingRating = +d.TeachingRating;
		d.InterOutlookRating = +d.InterOutlookRating;
		d.ResearchRating = +d.ResearchRating;
		d.CitationsRating = +d.CitationsRating;
		d.IndustryIncomeRating = +d.IndustryIncomeRating;
		d.PerInterStudents = +d.PerInterStudents;
		d.PerFemaleStudents = +d.PerFemaleStudents;
		d.NumStudents = +d.NumStudents;
		d.TotalScore = +d.TotalScore;
		return d;
	})
	.get(function(error, rows) {
		var star = d3.starPlot()
			.width(radialWidth)
			.properties([
				'TeachingRating',
				'ResearchRating',
				'CitationsRating',
				'InterOutlookRating',
				'IndustryIncomeRating',
				'PerInterStudents',
				'PerFemaleStudents',
			])
			.scales(radialScale)
			.labels([
				'Tch',
				'Rch',
				'Cit',
				'IOR',
				'IIR',
				'%In',
				'%Fe',
			])
			//.title(function(d) { return d.UniversityName; })
			.margin(radialMargin)
			.labelMargin(radialLabelMargin);

		graph.svg = d3.select('body')
					.append('svg')
					.attr('width', graph.width + graph.margin.left + graph.margin.right)
					.attr('height', graph.height + graph.margin.top + graph.margin.bottom);

		var yScale = d3.scale.linear()
						.domain([100, 0])
						.range([0, graph.height])

		var xScale = d3.scale.linear()
						.domain([0,702])
						.range([0, 702*tick])

		var yAxis = d3.svg.axis()
					.orient("left")
					.scale(yScale);

		var xAxis = d3.svg.axis()
					.orient("bottom")
					.scale(xScale);

		var yAxisGroup = graph.svg.append("g")
									.attr("class", "yaxis")
									.attr("transform", "translate(" + graph.margin.left + "," + graph.margin.top+")")
									.call(yAxis);

		var xAxisGroup = graph.svg.append("g")
									.attr("class", "xaxis")
									.attr("transform", "translate(" + graph.margin.left + "," + (graph.height+graph.margin.top) + ")")
									.call(xAxis);

		rows.forEach(function(d, i) {
				star.includeLabels(true);
				var wrapper = d3.select('#target')
								.append('div')
								.attr('class', 'wrapper')
								.style('margin-left',(tick*i+graph.margin.left)+"px")
								.style('margin-top',(-(radialHeight+radialMargin.top+radialMargin.bottom)/2+(graph.margin.top+(100-d.TotalScore)*graph.height/100)+"px"))

				var svg = wrapper.append('svg')
				.attr('class', 'chart')
				.attr('width', radialWidth + radialMargin.left + radialMargin.right)
				.attr('height', radialWidth + radialMargin.top + radialMargin.bottom);

				var starG = svg.append('g')
				.datum(d)
				.call(star)
				//.call(star.interaction);

				svg.selectAll('.star-label')
					.style('display', 'none');

				svg.selectAll('g').on('mouseover', function(d) {
						svg.selectAll('.star-label')
								.style('display', 'block');
				})
				.on('mouseout', function(d) {
						svg.selectAll('.star-label')
							.style('display', 'none');
				})
		});
}); 

import { Component, ElementRef, ViewChild } from '@angular/core';
import { AnalysisService } from './analysis.service';
import { resultsModel } from './model/resultsModel';
import * as d3 from 'd3';
import { recruitStatusModel } from './model/recruitStatusModel';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent {

  @ViewChild('chart', { static: true }) private chartContainer: ElementRef;
  @ViewChild('barChart', { static: true }) private barChartContainer: ElementRef;
  responseMessage: any;
  responseCode: any;
  resultsList: resultsModel[] = [];
  recruitStatusList: recruitStatusModel[] = [];

  constructor(private analysisService: AnalysisService) {}

  ngOnInit(): void {
    this.fetchResults();
    this.fetchRecruitStatus();
  }

  fetchResults() {
    this.analysisService.fetchResults().subscribe(
      {
        next: (data: any) => {
          this.resultsList = data["resultsList"];
        },
        error: (error: any) => {
          console.log(error);
        },
        complete: () => {
          this.renderChart();
        }
      }
    )
  }

  renderChart(): void {
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(this.chartContainer.nativeElement)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear()
      .domain([0, this.resultsList.length + 1]) // Setting domain for x-axis to the size of resultsList
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(this.resultsList, d => +d.percentage) || 0]) // Setting domain for y-axis to the maximum percentage
      .range([height, 0]);

    svg.selectAll('.dot')
      .data(this.resultsList)
      .enter().append('circle')
      .attr('class', 'dot')
      .attr('cx', (d, i) => x(i + 1)) // Using index + 1 as x-coordinate
      .attr('cy', d => y(+d.percentage)) // Converting percentage string to number
      .attr('r', 5)
      .style('fill', 'steelblue');

    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d3.format('d')));

    svg.append('text') // X-axis label
    .attr('x', width / 2)
    .attr('y', height + margin.bottom - 1)
    .attr('fill', '#000')
    .style('text-anchor', 'middle')
    .style('font-size', 'small')
    .text('No. of Assessments');

    svg.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(y))
      .append('text') // Y-axis label
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', -margin.left + 10)
      .attr('fill', '#000')
      .style('text-anchor', 'middle')
      .style('font-size', 'small')
      .text('Percentage');
  }

  fetchRecruitStatus() {
    this.analysisService.fetchRecruitStatus().subscribe(
      {
        next: (data: any) => {
          this.recruitStatusList = data["recruitStatusList"];
          this.responseMessage = data["responseMessage"];
          this.responseCode = data["responseCode"];
        },
        error: (error: any) => {
          console.log(error);
        },
        complete: () => {
          this.renderBarChart();
        }
      }
    )
  }

  renderBarChart(): void {
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(this.barChartContainer.nativeElement)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Grouping data by recruitment status ('Y' and 'N')
    const dataGrouped = d3.group(this.recruitStatusList, d => d.recruited);

    // Calculating average percentage for each recruitment status
    const averageData = Array.from(dataGrouped, ([key, value]) => ({
      recruited: key,
      averagePercentage: d3.mean(value, d => +d.percentage)
    }));

    // Defining color scale for different recruitment statuses
    const colorScale = d3.scaleOrdinal<string>()
      .domain(['Y', 'N'])
      .range(['green', 'steelblue']); // Colors for 'Y' and 'N'

    // Defining x scale for recruitment status
    const x = d3.scaleBand()
      .domain(['Y', 'N'])
      .range([0, width])
      .padding(0.1);

    // Defining y scale for percentage
    const y = d3.scaleLinear()
      .domain([0, d3.max(averageData, d => d.averagePercentage) || 100]) // Ensuring domain includes 0 and extends to maximum value
      .nice()
      .range([height, 0]);

    // Add x-axis
    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .append('text') // X-axis label
      .attr('x', width / 2)
      .attr('y', 25)
      .attr('fill', '#000')
      .style('text-anchor', 'middle')
      .style('font-size', 'small')
      .text('Recruitment Status (Y-Recruited, N-Still in Pool)');

    // Add y-axis
    svg.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(y))
      .append('text') // Y-axis label
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', -margin.left + 10)
      .attr('fill', '#000')
      .style('text-anchor', 'middle')
      .style('font-size', 'small')
      .text('Average Percentage');

    // Adding bars for average percentage
    svg.selectAll('.bar')
      .data(averageData)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.recruited) || 0) // Ensuring x-coordinate is not undefined
      .attr('y', d => y(d.averagePercentage || 0)) // Ensuring y-coordinate is not undefined
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.averagePercentage || 0))
      .attr('fill', d => colorScale(d.recruited));
  }
}

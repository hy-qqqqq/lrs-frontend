<script setup>
import { ref, reactive } from "vue";
import Chart from 'chart.js/auto';
import ApexCharts from 'apexcharts';
// Components
import Sidebar from './Sidebar.vue'
</script>

<script>
export default {
  mounted() {
    this.initializeCharts();
  },
  methods: {
    initializeCharts() {
      // Initialize and update charts for orders
      this.initializePriorityCharts();
      this.initializeFactoryCharts();
      this.initializeLabCharts();
      this.initializePieCharts();
      this.initializeDonutCharts();
    },
    initializePriorityCharts() {
      // Initialize and update charts based on priority
      const priorityChartCtx = document.getElementById('priorityChart').getContext('2d');
      const priorityChart = new Chart(priorityChartCtx, {
        type: 'bar',
        data: {
          labels: ['Issued', 'Rejected', 'Completed', 'Approved'],
          datasets: [
            { label: 'Normal', data: [5, 3, 7, 9], backgroundColor: 'rgba(255, 99, 132, 0.6)' },
            { label: 'Urgent', data: [3, 2, 5, 6], backgroundColor: 'rgba(54, 162, 235, 0.6)' },
            { label: 'Emergency', data: [2, 1, 3, 4], backgroundColor: 'rgba(255, 206, 86, 0.6)' }
          ]
        },
        options: {
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    },
    initializeFactoryCharts() {
      // Initialize and update charts based on factory
      const factoryChartOptions = {
        chart: {
          height: 380,
          type: 'bar',
          stacked: true
        },
        plotOptions: {
          bar: {
            columnWidth: '30%',
            horizontal: false,
          },
        },
        series: [{
          name: 'Fab A',
          data: [14, 25, 21, 17],
          color: 'rgba(255, 99, 132, 0.6)'
        }, {
          name: 'Fab B',
          data: [13, 23, 20, 8],
          color: 'rgba(54, 162, 235, 0.6)'
        }, {
          name: 'Fab C',
          data: [11, 17, 15, 15],
          color: 'rgba(255, 206, 86, 0.6)'
        }],
        xaxis: {
          categories: ['Issued', 'Rejected', 'Completed', 'Approved'],
        },
        fill: {
          opacity: 1
        },
      };

      const factoryChart = new ApexCharts(document.querySelector("#factoryChart"), factoryChartOptions);
      factoryChart.render();
    },
    initializeLabCharts() {
      // Initialize and update charts based on lab
      const labChartOptions = {
        chart: {
          height: 380,
          type: 'bar',
          stacked: true
        },
        plotOptions: {
          bar: {
            columnWidth: '30%',
            horizontal: false,
          },
        },
        series: [
          {
            name: 'Chemistry Lab',
            data: [8, 4, 10, 15],
            color: 'rgba(255, 99, 132, 0.6)'
          },
          {
            name: 'Surface Analysis Lab',
            data: [6, 3, 8, 12],
            color: 'rgba(54, 162, 235, 0.6)'
          },
          {
            name: 'Composition Analysis Lab',
            data: [4, 2, 6, 10],
            color: 'rgba(255, 206, 86, 0.6)'
          }
        ],
        xaxis: {
          categories: ['Issued', 'Rejected', 'Completed', 'Approved'],
        },
        fill: {
          opacity: 1
        },
      };

      const labChart = new ApexCharts(document.querySelector("#labChart"), labChartOptions);
      labChart.render();
    },

    initializePieCharts() {
      // Initialize and update overall charts for issued, rejected, completed, approved
      // Initialize and update chart for used space capacity
      const usedSpaceChartCtx = document.getElementById('usedSpaceChart').getContext('2d');
      const usedSpaceChart = new Chart(usedSpaceChartCtx, {
        type: 'pie',
        data: {
          labels: ['Used Space', 'Remaining Space'],
          datasets: [{
            label: 'Storage Capacity',
            data: [70, 30], // Example data, replace with actual data
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
            ],
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false, // Prevent the chart from maintaining aspect ratio
        },
      });
    },
    initializeDonutCharts() {
      // Initialize and update overall charts for issued, rejected, completed, approved
      // Initialize and update chart for used space capacity
      const donutOptions = {
        chart: {
          type: 'donut',
          width: '100%',
          height: 250,
        },
        dataLabels: {
          enabled: false,
        },
        plotOptions: {
          pie: {
            customScale: 0.8,
            donut: {
              size: '75%',
            },
            offsetY: 20,
          },
          stroke: {
            colors: undefined
          }
        },
        colors: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(75, 192, 192, 0.6)'],
        series: [25, 12, 35, 50], // Example data for Issued, Rejected, Completed, Approved
        labels: ['Issued', 'Rejected', 'Completed', 'Approved'],
        
        legend: {
          position: 'right',
          offsetY: 80
        },
        title: {
          text: `total counts: 18`,
          position: 'up',
          style: {
            fontSize: '14px'
          }
        }
      };
      
      const donutChart = new ApexCharts(document.querySelector("#donutChart"), donutOptions);
      donutChart.render();
    }
  }
}
</script>

<template>
  <div>
    <Sidebar />
    <div class="m-6">
      <div class="ml-64 flex flex-col gap-4">
        <div class="flex justify-center">
          <div class="chart" style="margin-top: 20px; margin-right: 20px; width: 300px; height: 300px;"> <!-- Adjust chart size -->
            <h2>Overall Orders</h2>
            <div id="donutChart"></div> <!-- Add a div to hold the ApexCharts donut chart -->
          </div>
          <div class="chart pie-chart" style="margin-top: 20px; width: 300px; height: 300px;">
            <h2>Used Space Capacity</h2>
            <canvas id="usedSpaceChart" style="padding: 20px;"></canvas>
          </div>
          <div class="chart" style="margin-top: 20px; margin-left: 20px; width: 300px; height: 300px;"> 
            <h2>Chart</h2>
            <canvas id="newChart"></canvas>
          </div>
        </div>
        <div class="flex flex-row justify-between">
          <div class="chart" style="margin-right: 20px;">
            <h2>Priority</h2>
            <canvas id="priorityChart" style="width: 200px; height: 150px;"></canvas> 
          </div>
          <div class="chart" style="margin-right: 20px;">
            <h2>Factory</h2>
            <div id="factoryChart"></div> 
          </div>
          <div class="chart">
            <h2>Lab</h2>
            <div id="labChart"></div> 
          </div>
        </div>
        
        <div class="flex justify-center">
          <div class="chart" style="width: 60%;">
            <h2>系統穩定性監測</h2>
            <canvas id="systemStabilityChart"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/dashboard.css';
</style>

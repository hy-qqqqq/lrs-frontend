<script setup>
import { ref, reactive } from "vue"
import { useDisplay } from 'vuetify'
import { toast } from 'vue3-toastify'
import { Chart } from 'chart.js/auto' // Correct import
import ApexCharts from 'apexcharts'
import axios from 'axios'
// Components
import Sidebar from './Sidebar.vue'
const { smAndDown } = useDisplay()
const drawer = ref(!smAndDown.value)
</script>

<script>
// Set up Axios instance with base URL
const instance = axios.create({
  baseURL: '/',
  timeout: 20000,
});

// Function to get token from sessionStorage
const getToken = () => {
  return sessionStorage.getItem('token');
};

// Function to set Authorization header for Axios instance
const setAuthHeader = () => {
  const token = getToken();
  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

export default {
  data() {
    return {
      usedSpaceChart: null,
      priorityChart: null,
      factoryChart: null,
      labChart: null,
    };
  },
  mounted() {
    setAuthHeader();
    this.initializeCharts();
  },
  beforeUnmount() {
    this.destroyCharts();
  },
  methods: {
    initializeCharts() {
      this.initializePriorityCharts();
      this.initializeFactoryCharts();
      this.initializeLabCharts();
      this.initializeDonutCharts();
    },
    destroyCharts() {
      if (this.usedSpaceChart) {
        this.usedSpaceChart.destroy();
        this.usedSpaceChart = null;
      };
      if (this.priorityChart) this.priorityChart.destroy();
      if (this.factoryChart) this.factoryChart.destroy();
      if (this.labChart) this.labChart.destroy();
    },

    async initializePriorityCharts() {
      try {
        const response = await instance.get('/api/count_order_by_type');
        const data = response.data;

        const priorityData = {
          regular: { Issued: 0, Rejected: 0, Completed: 0, Approved: 0 },
          urgent: { Issued: 0, Rejected: 0, Completed: 0, Approved: 0 },
          emergency: { Issued: 0, Rejected: 0, Completed: 0, Approved: 0 },
        };

        data.forEach(item => {
          if (item.priority && priorityData[item.priority]) {
            priorityData[item.priority] = item.count;
          }
        });

        const priorityChartOptions = {
          chart: { height: 380, type: 'bar', stacked: true },
          plotOptions: { bar: { columnWidth: '30%', horizontal: false } },
          series: [
            { name: 'Regular', data: Object.values(priorityData.regular), color: 'rgba(255, 99, 132, 0.6)' },
            { name: 'Urgent', data: Object.values(priorityData.urgent), color: 'rgba(54, 162, 235, 0.6)' },
            { name: 'Emergency', data: Object.values(priorityData.emergency), color: 'rgba(255, 206, 86, 0.6)' },
          ],
          xaxis: { categories: ['Completed', 'Rejected', 'Issued', 'Approved'] },
          fill: { opacity: 1 },
        };

        this.priorityChart = new ApexCharts(document.querySelector("#priorityChart"), priorityChartOptions);
        this.priorityChart.render();
      } catch (error) {
        console.error('Failed to fetch priority data:', error);
      }
    },
    async initializeFactoryCharts() {
      try {
        const response = await instance.get('/api/count_order_by_type');
        const data = response.data;

        const factoryData = {
          'Fab A': { Issued: 0, Rejected: 0, Completed: 0, Approved: 0 },
          'Fab B': { Issued: 0, Rejected: 0, Completed: 0, Approved: 0 },
          'Fab C': { Issued: 0, Rejected: 0, Completed: 0, Approved: 0 },
        };

        data.forEach(item => {
          if (item.factory && factoryData[item.factory]) {
            factoryData[item.factory] = item.count;
          }
        });

        const factoryChartOptions = {
          chart: { height: 380, type: 'bar', stacked: true },
          plotOptions: { bar: { columnWidth: '30%', horizontal: false } },
          series: [
            { name: 'Fab A', data: Object.values(factoryData['Fab A']), color: 'rgba(255, 99, 132, 0.6)' },
            { name: 'Fab B', data: Object.values(factoryData['Fab B']), color: 'rgba(54, 162, 235, 0.6)' },
            { name: 'Fab C', data: Object.values(factoryData['Fab C']), color: 'rgba(255, 206, 86, 0.6)' },
          ],
          xaxis: { categories: ['Completed', 'Rejected', 'Issued', 'Approved'] },
          fill: { opacity: 1 },
        };

        this.factoryChart = new ApexCharts(document.querySelector("#factoryChart"), factoryChartOptions);
        this.factoryChart.render();
      } catch (error) {
        console.error('Failed to fetch factory data:', error);
      }
    },

    async initializeLabCharts() {
      try {
        const response = await instance.get('/api/count_order_by_type');
        const data = response.data;

        const labData = {
          chemical: { Issued: 0, Rejected: 0, Completed: 0, Approved: 0 },
          surface: { Issued: 0, Rejected: 0, Completed: 0, Approved: 0 },
          composition: { Issued: 0, Rejected: 0, Completed: 0, Approved: 0 },
        };

        data.forEach(item => {
          if (item.lab && labData[item.lab]) {
            labData[item.lab] = item.count;
          }
        });

        const labChartOptions = {
          chart: { height: 380, type: 'bar', stacked: true },
          plotOptions: { bar: { columnWidth: '30%', horizontal: false } },
          series: [
            { name: 'Chemistry Lab', data: Object.values(labData.chemical), color: 'rgba(255, 99, 132, 0.6)' },
            { name: 'Surface Analysis Lab', data: Object.values(labData.surface), color: 'rgba(54, 162, 235, 0.6)' },
            { name: 'Composition Analysis Lab', data: Object.values(labData.composition), color: 'rgba(255, 206, 86, 0.6)' },
          ],
          xaxis: { categories: ['Completed', 'Rejected', 'Issued', 'Approved'] },
          fill: { opacity: 1 },
        };

        this.labChart = new ApexCharts(document.querySelector("#labChart"), labChartOptions);
        this.labChart.render();
      } catch (error) {
        console.error('Failed to fetch lab data:', error);
      }
    },


    initializeDonutCharts() {
      // Initialize chart options
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
        series: [], // Initialize with empty array
        labels: ['Issued', 'Rejected', 'Completed', 'Approved'],
        legend: {
          position: 'right',
          offsetY: 80
        },
        title: {
          text: 'Total counts: 0', // Initialize with zero
          position: 'up',
          style: {
            fontSize: '14px'
          }
        }
      };
      
      const donutChart = new ApexCharts(document.querySelector("#donutChart"), donutOptions);
      donutChart.render();

      // Fetch data from the backend and update the chart
      instance.get('/api/count_order_by_status')
        .then(response => {
          const data = response.data;
          donutChart.updateSeries([
            data.Issued,
            data.Rejected,
            data.Completed,
            data.Approved
          ]);
          donutChart.updateOptions({
            title: {
              text: `Total counts: ${data.Issued + data.Rejected + data.Completed + data.Approved}`
            }
          });
        })
        .catch(error => {
          console.error(error);
          toast.error('Failed to fetch order counts.');
        });
    }
  }
}
</script>


<template>
<Sidebar v-model:drawer="drawer"/>

<div class="m-6">
  <div class="md:ml-64 flex flex-col gap-4">
    <div class="flex items-center gap-2">
      <v-btn v-if="smAndDown" icon="mdi-text" variant="text" @click.stop="drawer = !drawer"></v-btn>
      <h1>Dashboard</h1>
    </div>
    <div class="flex justify-center">
      <div class="chart" style="margin-top: 20px; margin-right: 20px; width: 300px; height: 300px;"> <!-- Adjust chart size -->
        <h2>Overall Orders</h2>
        <div id="donutChart"></div> <!-- Add a div to hold the ApexCharts donut chart -->
      </div>

      <!-- Removed unused canvas element -->
    </div>
    <div class="flex flex-row justify-between">
      <div class="chart" style="margin-right: 20px;">
        <h2>Priority</h2>
        <div id="priorityChart"></div>
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
  </div>
</div>
</template>

<style scoped>
@import '@/assets/dashboard.css';
</style>

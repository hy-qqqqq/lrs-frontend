<template>
  <div class="dashboard">
    <div class="main-content">
      <div class="header">
        <!-- Header content goes here -->
      </div>
      <div class="charts">
        <div class="order-charts">
          <div class="chart">
            <h2>Issued orders</h2>
            <p>Example text for issued orders...</p>
            <canvas id="issued"></canvas>
          </div>
          <div class="chart" style="margin-top: 20px;">
            <h2>Approved orders</h2>
            <p>Example text for approved orders...</p>
            <canvas id="approved"></canvas>
          </div>
        </div>
        <div class="order-charts" style="margin-left: 20px;">
          <div class="chart">
            <h2>Completed orders</h2>
            <p>Example text for completed orders...</p>
            <canvas id="completed"></canvas>
          </div>
          <div class="chart" style="margin-top: 20px;">
            <h2>Rejected orders</h2>
            <p>Example text for rejected orders...</p>
            <canvas id="rejected"></canvas>
          </div>
        </div>
        <div class="chart pie-chart" style="margin-left: 20px;">
          <h2>Used Space Capacity</h2>
          <canvas id="usedSpaceChart"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  mounted() {
    // Initialize and update charts here using chart.js or any other charting library
    this.initializeCharts();
  },
  methods: {
    initializeCharts() {
      // Initialize and update chart for orders 1
      const ordersChart1Ctx = document.getElementById('issued').getContext('2d');
      const ordersChart1 = new Chart(ordersChart1Ctx, {
        // Chart configuration for orders 1
      });

      // Initialize and update chart for orders 2
      const ordersChart2Ctx = document.getElementById('approved').getContext('2d');
      const ordersChart2 = new Chart(ordersChart2Ctx, {
        // Chart configuration for orders 2
      });

      // Initialize and update chart for orders 3
      const ordersChart3Ctx = document.getElementById('completed').getContext('2d');
      const ordersChart3 = new Chart(ordersChart3Ctx, {
        // Chart configuration for orders 3
      });

      // Initialize and update chart for orders 4
      const ordersChart4Ctx = document.getElementById('rejected').getContext('2d');
      const ordersChart4 = new Chart(ordersChart4Ctx, {
        // Chart configuration for orders 4
      });

      // Add more chart initializations as needed
      // Initialize and update chart for used space capacity
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
      });

    }
  }
}
</script>

<style scoped>
.dashboard {
  display: flex;
  height: 100vh;
}

.main-content {
  flex: 1;
  padding: 20px;
}

.header {
  /* Header styles */
}

.charts {
  display: flex;
  justify-content: space-between;
}

.order-charts {
  display: flex;
  flex-direction: column;
}

.order-charts + .order-charts {
  margin-left: 20px; /* Add margin between each order-charts wrapper */
}

.chart {
  flex: 1;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.pie-chart {
  width: 10%; /* Adjust the width of the pie chart */
  min-width: 100px; /* Set a minimum width for responsiveness */
}
</style>
<template>
  <div class="chart">
    <div class="row q-mb-md justify-between no-wrap items-center">
      <h4 class="sub_texts_dash">Sales Details</h4>
      <q-btn-dropdown flat no-caps no-wrap label="October" outline>
        <q-list>
          <q-item clickable v-close-popup>
            <q-item-section>
              <q-item-label>November</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable v-close-popup>
            <q-item-section>
              <q-item-label>December</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>
    <apexchart
      type="area"
      height="350"
      :options="chartOptions"
      :series="seriesLine"
    ></apexchart>
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts';
export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      series: [
        {
          name: 'Sales Details',
          data: [31, 40, 28, 51, 42, 90, 100],
        },
      ],
      seriesLine: [
        {
          name: 'Sales Details',
          data: [31, 40, 28, 51, 42, 90, 100],
        },
      ],
      chartOptionsLine: {
        chart: {
          id: 'chart1',
          height: 130,
          type: 'area',
          brush: {
            target: 'chart2',
            enabled: true,
          },
          selection: {
            enabled: true,
            xaxis: {
              min: new Date('19 Jun 2017').getTime(),
              max: new Date('14 Aug 2017').getTime(),
            },
          },
        },
        colors: ['#008FFB'],
        fill: {
          type: 'gradient',
          gradient: {
            opacityFrom: 0.91,
            opacityTo: 0.1,
          },
        },
        xaxis: {
          type: 'datetime',
          tooltip: {
            enabled: false,
          },
        },
        yaxis: {
          tickAmount: 2,
        },
      },
      chartOptions: {
        chart: {
          type: 'area',
          height: 350,
          toolbar: {
            show: true,
            offsetX: 0,
            offsetY: 0,
            tools: {
              download: true,
              selection: true,

              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: true | '<img src="/static/icons/reset.png" width="20">',
              customIcons: [],
            },
            autoSelected: 'pan',
          },
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'straight',
        },

        title: {
          text: '',
          align: 'left',
        },
        subtitle: {
          text: '',
          align: 'left',
        },
        labels: [],
        xaxis: {
          type: 'datetime',
          categories: [
            '2018-09-19T00:00:00.000Z',
            '2018-09-19T01:30:00.000Z',
            '2018-09-19T02:30:00.000Z',
            '2018-09-19T03:30:00.000Z',
            '2018-09-19T04:30:00.000Z',
            '2018-09-19T05:30:00.000Z',
            '2018-09-19T06:30:00.000Z',
          ],
        },
        yaxis: {
          opposite: false,
        },
        legend: {
          horizontalAlign: 'left',
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.chart {
  box-shadow: 6px 6px 54px 0px #0000000d;
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  margin-top: 3rem;
}
</style>

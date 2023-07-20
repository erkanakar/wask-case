<template>
  <div class="account-chart">
    <div class="row align-items-center">
      <div class="col-12 col-lg-6 col-xl-7 d-flex flex-row flex-wrap align-items-center">
        <div class="button-group-title">
          Select Ad Account
          <img :src="'/img/arrow-right-line.svg'" alt="">
        </div>
        <div class="button-group">
          <div
              v-for="(account, index) in accounts"
              :key="index"
              @click="showAccountData(index)"
              :class="{ active: selectedIndex === index }"
          >
            {{ account.name }}
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-6 col-xl-5 d-flex flex-row flex-wrap align-items-center">
        <div class="button-group-title">
          Select Metric
          <img :src="'/img/arrow-right-line.svg'" alt="">
        </div>
        <div class="button-group">
          <div @click="showData('clicks')" :class="{ 'active': selectedDataKey === 'clicks' }">Clicks</div>
          <div @click="showData('impressions')" :class="{ 'active': selectedDataKey === 'impressions' }">Impressions</div>
          <div @click="showData('spend')" :class="{ 'active': selectedDataKey === 'spend' }">Spend</div>
        </div>
      </div>
      <div class="col-12">
        <div v-if="selectedIndex !== null" class="account-data">
          <div class="apexcharts-container">
            <apexchart
                v-if="selectedDataKey && accounts[selectedIndex].insights.data.length > 0"
                type="area"
                :options="chartOptions"
                :series="chartSeries"
                height="400px"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {get} from "@/services/apiService"

export default {
  name: "AccountChart",
  data() {
    return {
      accounts: [],
      selectedIndex: null,
      selectedDataKey: null,
      chartOptions: {
        chart: {
          height: "200px",
          type: "area",
          stacked: false,
          width: "100%",
          background: "#FFFFFF"
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          type: "datetime",
        },
        yaxis: {
          labels: {
            formatter: function (val) {
              return parseFloat(val).toFixed(1).replace(".0", "");
            },
          },
        },
        tooltip: {
          x: {
            format: "dd MMM yyyy",
          },
          y: {
            formatter: function (val) {
              return parseFloat(val).toFixed(1).replace(".0", "");
            },
          }
        },
      },
      chartSeries: [],
    };
  },
  created() {
    this.getUserData();
  },
  methods: {
    getUserData() {
      const headers = { 'token': '2zcgJnjDyb' };
      get('/demo/myaccounts', {}, headers)
          .then((response) => {
            const responseData = response.data;
            responseData.accounts.forEach((account) => {
              this.accounts.push(account);
            });
            this.selectedIndex = 0;
            this.showData('clicks');
          })
          .catch((error) => {
            console.error('API Error:', error);
          });
    },
    showAccountData(index) {
      this.selectedIndex = index;
      this.updateChartData();
    },
    showData(key) {
      this.selectedDataKey = key;
      this.updateChartData();
    },
    updateChartData() {
      if (this.selectedIndex !== null && this.selectedDataKey) {
        const accountData = this.accounts[this.selectedIndex].insights.data;
        this.chartSeries = [
          {
            name: this.selectedDataKey,
            data: accountData.map((item) => [
              new Date(item.date_start).getTime(),
              parseFloat(item[this.selectedDataKey]),
            ]),
          },
        ];
      }
    },
  },
};
</script>

<style lang="scss">
.account-chart {
  margin: 70px 0 0 0;
  padding: 20px;
}
.apexcharts-container {
  padding: 37px 40px 37px 39px;
  border-radius: 12px;
  background: #F9FAFB;
  margin-top: 70px;
}
.button-group {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  div {
    padding: 8px 20px;
    align-items: center;
    border-radius: 200px;
    background: #F9FAFB;
    color: #D0D5DD;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 38px;
    cursor: pointer;
    transition: .3s ease;
    margin: 5px 12px;

    &:hover {
      &:not(.active) {
        color: #131313;
        transition: .3s ease;
      }
    }

    &.active {
      background: #131313;
      color: #FFF;
    }

    &:first-of-type {
      margin-left: 0 !important;
    }

    &:last-of-type {
      margin-right: 0 !important;
    }
  }
}

.button-group-title {
  color: #131313;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 38px;
  img {
    margin-left: 16px;
    margin-right: 16px;
    display: inline-block;
  }
}

@media screen and (max-width: 1366px) {
  .button-group {
    justify-content: flex-start;
    div {
      margin-right: 5px;
      margin-left: 5px;
      font-size: 13px;
      padding: 8px 12px;
    }
  }
}

@media screen and (max-width: 768px) {
  .account-chart {
    margin-top: 30px;
  }
}
</style>

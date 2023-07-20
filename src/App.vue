<script setup>
import LogoSlider from "@/components/LogoSlider/LogoSlider.vue";
import AccountChart from "@/components/AccountChart/AccountChart.vue";
</script>

<template>
  <div class="container">
    <LogoSlider />
    <div class="row align-items-center justify-content-center h-100">
      <div class="col-12 col-md-12 col-lg-11 col-xl-10 col-xxl-10">
        <h1>
          Marketing Integrations <br>
          <span>Trust WASK's smart optimization features</span>
        </h1>
        <AccountChart />
      </div>
    </div>
    <LogoSlider :reverse="true" />
  </div>
</template>

<style scoped lang="scss">
h1 {
  color: #131313;
  text-align: center;
  font-size: 48px;
  font-style: normal;
  font-weight: 600;
  line-height: 1.25em;
  letter-spacing: -0.96px;
  margin-top: 20px;
  span {
    color: #D0D5DD;
  }
}

@media screen and (max-width: 1440px) {
  h1 {
    font-size: 39px;
  }
}

@media screen and (max-width: 768px) {
  h1 {
    font-size: 27px;
  }
}
</style>

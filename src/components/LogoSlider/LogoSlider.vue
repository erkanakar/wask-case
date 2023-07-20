<template>
  <div :class="{'logo-slider': true, 'reverse-slider': reverse}">
    <div class="marquee-outer" ref="marqueeOuter">
      <div :class="{'marquee-container': true, 'reverse': reverse}" ref="marqueeContainer">
        <div v-for="(logo, index) in logos" :key="index" class="logo-box">
          <img :src="`/img/logos/${logo}`" alt="Logo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LogoSlider",
  props: {
    reverse: Boolean,
  },
  data() {
    return {
      logos: [
        "google-analytics.png",
        "wordpress.png",
        "linkedin.png",
        "woo.png",
        "yandex.png",
        "facebook.png",
        "youtube.png",
        "instagram.png",
        "shopify.png",
        "snapchat.png",
      ],
      isMarqueeInitialized: false,
    };
  },
  mounted() {
    this.initializeMarquee();
  },
  methods: {
    initializeMarquee() {
      if (this.isMarqueeInitialized) return;

      const marqueeContainer = this.$refs.marqueeContainer;
      if (!marqueeContainer) return;

      const marqueeContainerClone = marqueeContainer.cloneNode(true);

      marqueeContainer.parentNode.insertBefore(
          marqueeContainerClone,
          marqueeContainer
      );

      marqueeContainer.parentNode.insertBefore(
          marqueeContainerClone.cloneNode(true),
          marqueeContainer
      );

      this.isMarqueeInitialized = true;
    },
  },
}
</script>

<style scoped lang="scss">
.logo-slider {
  overflow: hidden;
  max-width: 133px;
  height: 852px;
  max-height: 90vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  position: fixed;
  margin: auto;
  left: 90px;
  top: 0;
  bottom: 0;

  &.reverse-slider {
    left: unset;
    right: 90px;
   }
}

.marquee-outer {
  overflow: hidden;
  flex: 1;
  position: relative;
  max-height: 100%;
}

.logo-slider:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0; background: rgb(255,255,255);
  height: 100px;
  background: linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 41%, rgba(255,255,255,1) 100%);
  z-index: 1;
}

.logo-slider:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: rgb(255,255,255);
  background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 41%, rgba(255,255,255,1) 100%);
  z-index: 1;
}

.marquee-container {
  display: flex;
  flex-direction: column;
  animation: marquee 20s linear infinite;
}

.logo-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 133px;
  height: 133px;
  padding: 40px;
  margin: 24px 0;
  background-color: #f9fafb;
  border-radius: 12px;

  img {
    max-width: 100%;
    height: auto;
  }
}

@keyframes marquee {
  0% {
    transform: translateY(-50%);
  }
  100% {
    transform: translateY(0%);
  }
}

@keyframes marquee-reverse {
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(-50%);
  }
}

.marquee-container.reverse {
  animation: marquee-reverse 20s linear infinite;
}

@media screen and (max-width: 1440px) {
  .logo-box {
    width: 90px;
    height: 90px;
    padding: 20px;
  }
}

@media screen and (max-width: 991px) {
  .logo-slider {
    width: 100%;
    top: -140px;
    left: 0;
    right: 0;
    bottom: unset;
    max-width: 100%;
    height: 133px;
    max-height: 133px;
    position: absolute;
    &:before, &:after {
      content: none;
    }

    &.reverse-slider {
      bottom: -140px;
      top: unset;
      left: 0;
      right: 0;
    }
  }
  .marquee-outer {
    display: flex;
    flex-direction: row;
  }
  .marquee-container {
    display: flex;
    flex-direction: row;

    .logo-box {
      margin: 0 24px;
    }
  }


  @keyframes marquee {
    0% {
      transform: translateX(-50%);
    }
    100% {
      transform: translateX(0%);
    }
  }

  @keyframes marquee-reverse {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-50%);
    }
  }
}
</style>
<template>
  <div class="loader">
    <div class="bg bg-black">
      <svg class="logo-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 597.6 806.4">
        <!-- <path
          class="draw-logo"
          id="logo-path"
          data-name="Path 1"
          d="M84.763,300a45.529,45.529,0,0,0-31.688,12.921l-.009-.009L37.2,328.748,9.482,356.417s-1.207,1.2-1.813,1.81c-.006.006-.012.012-.018.017A18.987,18.987,0,0,1-5.69,363.663c-10.664.118-18.855-7.748-18.965-18.213A18.247,18.247,0,0,1-6.319,326.813c10.148-.112,18.136,6.911,19.128,16.466L33.934,322.07C25.866,308.538,10.8,299.807-6.977,300c-25.612.282-45.29,20.283-45.021,45.763.272,25.694,20.383,45.254,46.566,44.963A46.86,46.86,0,0,0,26.933,377.55c.088-.085.178-.166.265-.252l.285-.285,15.235-15.206c6.542,17.268,22.741,29.1,43.1,28.875,26.209-.291,46.458-20.232,46.175-45.838-.285-25.679-20.775-45.133-47.233-44.842m1.288,63.661c-10.664.118-18.855-7.748-18.965-18.213a18.247,18.247,0,0,1,18.336-18.638c10.776-.119,19.122,7.8,19.237,18.263.115,10.429-7.934,18.469-18.608,18.587"
          fill="#f7f7f7"
          stroke="#f7f7f7"
          stroke-width="2"
          transform="translate(52 -300)"
        />-->

        <path
          class="draw-logo"
          id="logo-path"
          data-name="Path 1"
          d="M357.88,378.45c-14.12,15.78-22.71,36.63-22.71,59.47c0,49.27,39.94,89.21,89.21,89.21s89.21-39.94,89.21-89.21
	s-39.94-89.21-89.21-89.21c-25.33,0-48.2,10.56-64.44,27.51l-0.09,0.09l-124.48,125.6l-0.06,0.06
	c-16.06,15.57-37.96,25.16-62.1,25.16c-49.27,0-89.21-39.94-89.21-89.21s39.94-89.21,89.21-89.21c36.47,0,67.84,21.89,81.67,53.25"
          fill="none"
          stroke="#f7f7f7"
          stroke-width="75"
          stroke-miterlimit="10"
        />
      </svg>
    </div>
    <div class="bg bg-white">
      <svg class="logo-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 597.6 806.4">
        <path
          id="logo-path"
          data-name="Path 1"
          d="M357.88,378.45c-14.12,15.78-22.71,36.63-22.71,59.47c0,49.27,39.94,89.21,89.21,89.21s89.21-39.94,89.21-89.21
	s-39.94-89.21-89.21-89.21c-25.33,0-48.2,10.56-64.44,27.51l-0.09,0.09l-124.48,125.6l-0.06,0.06
	c-16.06,15.57-37.96,25.16-62.1,25.16c-49.27,0-89.21-39.94-89.21-89.21s39.94-89.21,89.21-89.21c36.47,0,67.84,21.89,81.67,53.25"
          fill="none"
          stroke="#2A2B2F"
          stroke-width="75"
          stroke-miterlimit="10"
        />
      </svg>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'Loader',
  components: {}
})
export default class Loader extends Vue {}
</script>

<style scoped lang='scss'>
.bg {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bg-black {
  background: #2a2b2f;
  position: fixed;
  z-index: 1001;
}

.bg-white {
  background: #fff;
  position: fixed;
  z-index: 1000;
}
// .logo-black,
// .logo-white {
//   position: fixed;
// }

svg {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(4vw + 80px);
  z-index: 1005;
}
</style>
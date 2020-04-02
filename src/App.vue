<template>
  <div id="app">
    <Loader />
    <!-- <div>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </div>-->

    <nav>
      <div class="hold-menu" @mouseenter="menuEnter" @mouseleave="menuLeave">
        <div class="menu-bar">
          <div class="line"></div>
          <div class="line"></div>
          <div class="line"></div>
        </div>
        <ul class="desktop-nav">
          <li class="nav-item">
            <router-link to="/work">Work</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/work">About</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/work">careers</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/work">Contact</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/work">Blog</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import SmoothScroll from '@/assets/js/Scroll';
import animations from '@/scripts/animations';
import Loader from '@/components/Loader.vue';
import {
  TimelineMax,
  Power4,
  Expo,
  Elastic,
  Bounce,
  onComplete,
  clearProps,
  TweenMax
} from 'gsap/all';
// import anime from 'animejs';

@Component({
  name: 'App',
  components: {
    // HelloWorld
    Loader
  }
})
export default class App extends Vue {
  // mounted() {
  //   if (!window.smoothScroll) {
  //     window.smoothScroll = SmoothScroll(document, 70, 8);
  //   }

  // }

  menuEnter(element: any, done: any) {
    animations
      .get('desktop-menu')(element, true)
      .eventCallback('onComplete', done)
      .play();
  }

  menuLeave(element: any, done: any) {
    animations
      .get('desktop-menu')(element, false)
      .eventCallback('onReverseComplete', () => {
        done();
      })
      .progress(1)
      .reverse();
  }

  logoDraw() {
    const path: any = document.querySelector('.draw-logo');
    const l = path.getTotalLength();
    const drawLogo = new TimelineMax({
      onComplete: function() {
        clearProps: 'all';
      }
    });
    drawLogo
      .addLabel('start')
      .set(path, { strokeDasharray: l, fill: 'none' })
      .fromTo(
        path,
        4,
        { strokeDashoffset: l },
        { strokeDashoffset: 0, ease: Power4.easeInOut, clearProps: 'all' },
        'start'
      );
    // .to(path, 0.5, { fill: '#f7f7f7' }, 'start+=2.5');
  }

  loaderAnim() {
    const loaderAnim = new TimelineMax({ delay: 4 });
    loaderAnim
      .addLabel('start')
      .to('.bg-black', 1.5, { height: 0, ease: Expo.easeInOut }, 'start', 0)
      .to('.logo-white', 1, { visibility: 'hidden' }, 'start+=0.8', 0)
      .to(
        '.bg-white',
        1.5,
        { height: 0, ease: Expo.easeInOut },
        'start+=1.4',
        0
      )
      .set(
        '.logo-white',
        {
          width: '120px',
          left: 117,
          top: 71,
          visibility: 'visible'
        },
        'start+=2.19'
      )
      .to(
        '.logo-black',
        1.5,
        {
          width: '120px',
          left: 117,
          top: 71,
          ease: Power4.easeInOut
        },
        'start+=1',
        0
      )
      .to('.logo-black', 0, { visibility: 'hidden' }, 'start+=2.42')
      .staggerFromTo(
        '.word',
        1.8,
        { y: 150, opacity: 0, rotation: 5 },
        {
          y: 0,
          ease: Power4.easeOut,
          opacity: 1,
          rotation: 0,
          transformOrigin: 'left 50%',
          clearProps: 'all'
        },
        0.03,
        'start+=2.4'
      );
  }
  created() {}

  private mounted() {
    //    if (!window.smoothScroll) {
    //   window.smoothScroll = SmoothScroll(document, 70, 8);
    // }
    this.loaderAnim();
    this.logoDraw();
  }
}
</script>

<style lang="scss">
@import url('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/css/bootstrap-grid.min.css');
// @import url('https://use.fontawesome.com/releases/v5.8.2/css/all.css');
@import '@/assets/css/style.scss';

#app {
  // overflow: hidden;
}

nav {
  display: flex;
  justify-content: flex-end;
  width: 95%;
  margin: 0 auto;
  position: fixed;
  top: 0;
  left: 0;
  top: 54px;

  .hold-menu {
    display: flex;
    align-items: center;
  }
  .logo {
    width: calc(4vw + 80px);
    img {
      width: 100%;
    }
  }
  .line {
    background: #fff;
    width: 30px;
    height: 2px;
    margin: 10px 0;
  }

  .menu-bar {
    order: 2;
  }

  .desktop-nav {
    display: flex;
    display: none;
    .nav-item {
      margin: 0px 20px;
      a {
        color: #fff;
        text-transform: capitalize;
        font-family: $font-family-secondary;
        font-weight: 300;
      }
    }
  }
}
</style>

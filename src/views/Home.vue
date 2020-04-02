<template>
  <div class="home">
    <div class="canvas"></div>
    <div class="title-wrap">
      <h2 class="home-title">We integrate, strategy, creativity and experience to build brands.</h2>
    </div>
  </div>
</template>

<script lang="ts" >
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as THREE from 'three-full';
import 'splitting/dist/splitting.css';
import 'splitting/dist/splitting-cells.css';
import Splitting from 'splitting';

@Component({
  name: 'Home',
  components: {}
})
export default class Home extends Vue {
  camera: any = null;
  scene: any = null;
  renderer: any = null;
  mesh: any = null;

  SEPARATION: number = 100;
  AMOUNTX: number = 50;
  AMOUNTY: number = 50;
  windowHalfX: number = window.innerWidth / 2;
  windowHalfY: number = window.innerHeight / 2;
  particles: any = null;
  count: number = 0;
  mouseX: number = 0;
  mouseY: number = 0;
  device: any = null;
  controls: any = null;

  isMobile() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      return true;
    } else {
      return false;
    }
  }

  init() {
    if (this.isMobile()) {
      this.device = 'mobile';
    } else {
      this.device = 'pc';
    }

    let container = document.querySelector('.canvas');
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      100000
    );
    this.camera.position.z = 1000;
    // this.controls = new THREE.DeviceOrientationControls(this.camera);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x2a2b2f);

    //

    var numParticles = this.AMOUNTX * this.AMOUNTY;

    var positions = new Float32Array(numParticles * 3);
    var scales = new Float32Array(numParticles);

    var i = 0,
      j = 0;

    for (var ix = 0; ix < this.AMOUNTX; ix++) {
      for (var iy = 0; iy < this.AMOUNTY; iy++) {
        positions[i] =
          ix * this.SEPARATION - (this.AMOUNTX * this.SEPARATION) / 2; // x
        positions[i + 1] = 0; // y
        positions[i + 2] =
          iy * this.SEPARATION - (this.AMOUNTY * this.SEPARATION) / 2; // z

        scales[j] = 1;

        i += 3;
        j++;
      }
    }

    var geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    let material = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(0xf7f7f7) }
      },
      vertexShader: `
			attribute float scale;
			void main() {

				vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
				gl_PointSize = scale * ( 300.0 / - mvPosition.z );
				gl_Position = projectionMatrix * mvPosition;
			}`,
      fragmentShader: `uniform vec3 color;
			void main() {
				if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;
				gl_FragColor = vec4( color, 1.0 );
			}`
    });

    //

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);

    //

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0xffffff, 0);
    (container as any).appendChild(this.renderer.domElement);

    document.addEventListener('mousemove', this.onDocumentMouseMove, false);
    document.addEventListener('touchstart', this.onDocumentTouchStart, false);
    document.addEventListener('touchmove', this.onDocumentTouchMove, false);

    //
    window.addEventListener('resize', this.onWindowResize, false);
  }

  animate() {
    requestAnimationFrame(this.animate);
    this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.05;
    this.camera.position.y += (-this.mouseY - this.camera.position.y) * 0.05;
    this.camera.lookAt(this.scene.position);

    var positions = this.particles.geometry.attributes.position.array;
    var scales = this.particles.geometry.attributes.scale.array;

    var i = 0,
      j = 0;

    for (var ix = 0; ix < this.AMOUNTX; ix++) {
      for (var iy = 0; iy < this.AMOUNTY; iy++) {
        positions[i + 1] =
          Math.sin((ix + this.count) * 0.3) * 10 +
          Math.sin((iy + this.count) * 0.5) * 10 +
          195;

        scales[j] =
          (Math.sin((ix + this.count) * 0.3) + 1) * 5 +
          (Math.sin((iy + this.count) * 0.5) + 1) * 5;

        i += 3;
        j++;
      }
    }

    this.particles.geometry.attributes.position.needsUpdate = true;
    this.particles.geometry.attributes.scale.needsUpdate = true;
    this.renderer.render(this.scene, this.camera);
    this.count += 0.1;
  }

  onDocumentMouseMove(event: any) {
    this.mouseX = event.clientX - this.windowHalfX;
    // this.mouseY = event.clientY - this.windowHalfY;
  }

  onDocumentTouchStart(event: any) {
    if (event.touches.length === 1) {
      event.preventDefault();

      this.mouseX = event.touches[0].pageX - this.windowHalfX;
      this.mouseY = event.touches[0].pageY - this.windowHalfY;
    }
  }

  onDocumentTouchMove(event: any) {
    if (event.touches.length === 1) {
      event.preventDefault();

      this.mouseX = event.touches[0].pageX - this.windowHalfX;
      this.mouseY = event.touches[0].pageY - this.windowHalfY;
    }
  }

  onWindowResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }

  mounted() {
    this.init();
    this.animate();
    const target = document.querySelector('.home-title');
    console.log(target);
    Splitting({ target: target, by: 'words' });
    console.log(Splitting());
  }

  created() {
    window.addEventListener('resize', () => {
      this.onWindowResize();
    });
  }
}
</script>

<style lang='scss'scoped>
.home {
  display: flex;
  align-items: flex-end;
  height: 100vh;
  .canvas {
    width: 100%;
    height: 100%;
  }
  .title-wrap {
    position: absolute;
    max-width: 35%;
    bottom: 121px;
    left: 10%;
    overflow: hidden;

    @media (max-width: 767.98px) {
      bottom: 100px;
      max-width: 70%;
      margin: 0 auto;
    }
  }
  h2 {
    color: #fff;
    font-size: 3.3rem;
    text-transform: initial;
    font-family: $font-family-base;
    overflow: hidden;

    @media (max-width: 767.98px) {
      font-size: 1.4rem;
      line-height: 31px;
    }
  }
}
</style>

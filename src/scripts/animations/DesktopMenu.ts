import { TimelineMax, Power4, Expo } from 'gsap';
const DesktopMenu = (element: any) => {
  // const items = Array.from(element.querySelectorAll('.nav-item'));
  const items = document.querySelectorAll('.nav-item');
  const menubar = document.querySelector('.menu-bar');
  const desktopNav = document.querySelector('.desktop-nav');
  const tl = new TimelineMax({ paused: true })
  tl.addLabel('start')
    .set(desktopNav, { display: 'flex' })
    .to(menubar, 1.5, { rotation: -360, opacity: 0, ease: Expo.easeInOut, pointEvents: 'none' }, 'start')
    .set(menubar, { visibility: 'hidden' }, 'start+=1')
    .staggerFromTo(items, 1, { x: 40, visibility: 'visible', opacity: 0 }, { opacity: 1, x: 0, ease: Expo.easeOut }, 0.1, 'start+=0.2')
  return tl;
}

export default DesktopMenu;
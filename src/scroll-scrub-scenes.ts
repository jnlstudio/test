import { createElement } from 'react';
import type { ScrollScrubScene, ScrollScrubTheme } from '@/components/scroll-scrub/scroll-scrub';
export const scrollScrubTheme: ScrollScrubTheme = { accent:'#bd343c', background:'#111113', ink:'#f2f0ef', muted:'#c6c0c1' };
export const scrollScrubScenes: ScrollScrubScene[] = [{
 id:'entrance', label:'鬼面', clip:'./assets/world/scene-01.mp4', mobileClip:'./assets/world/scene-01-mobile.mp4', poster:'./assets/world/scene-01-poster.png', mobilePoster:'./assets/world/scene-01-mobile-poster.png',
 kicker:'AFTER DARK / 鬼面半身款', title:'鬼面，隨身。', body:'一張鬼面。一抹紅。把個性掛進日常。', scroll:2.5, linger:0.15, objectPosition:'50% 43%', mobileObjectPosition:'50% 35%',
 actions:createElement('a',{href:'#details',className:'entrance-action'},'看近一點',createElement('span',{'aria-hidden':true},'↗'))
}];

// lib/gsap.js
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(Draggable, InertiaPlugin);
}

export { gsap, Draggable };

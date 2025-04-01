import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Initialize GSAP ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Store the lenis instance globally so it can be accessed by other components
let lenisInstance: Lenis | null = null;

/**
 * Initialize Lenis and connect it with GSAP ScrollTrigger
 * @returns The Lenis instance
 */
export function initLenisScroll(): Lenis {
  if (lenisInstance) return lenisInstance;

  // Create a new Lenis instance
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.8,
    touchMultiplier: 1.5,
    infinite: false,
  });

  // Connect Lenis scroll updates to ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  // Set up the animation frame loop for Lenis
  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Connect GSAP Ticker to Lenis
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000); // Convert GSAP time to milliseconds
  });

  // Disable GSAP Ticker's lag smoothing to prevent conflicts with Lenis
  gsap.ticker.lagSmoothing(0);

  // Store the instance for reuse
  lenisInstance = lenis;
  
  return lenis;
}

/**
 * Get the current Lenis instance if available
 * @returns The current Lenis instance or null
 */
export function getLenis(): Lenis | null {
  return lenisInstance;
}

/**
 * Create a GSAP animation that is linked to scroll position
 * @param element Target element or selector
 * @param animation GSAP animation object
 * @param options Additional ScrollTrigger options
 */
export function createScrollAnimation(
  element: string | Element,
  animation: gsap.TweenVars,
  options: {
    start?: string;
    end?: string;
    scrub?: boolean | number;
    markers?: boolean;
    pin?: boolean;
    anticipatePin?: boolean;
    toggleActions?: string;
    id?: string;
    once?: boolean;
  } = {}
) {
  return gsap.to(element, {
    ...animation,
    scrollTrigger: {
      trigger: element,
      start: options.start || 'top bottom',
      end: options.end || 'bottom top',
      scrub: options.scrub === true ? 1 : (options.scrub === false ? false : options.scrub),
      markers: options.markers || false,
      pin: options.pin || false,
      anticipatePin: options.anticipatePin ? 1 : 0, // Convert boolean to number (1 or 0)
      toggleActions: options.toggleActions || 'play none none none',
      id: options.id,
      once: options.once,
    },
  });
}

/**
 * Create a parallax effect on an element
 * @param element Target element or selector
 * @param strength Strength of the parallax effect (default: 0.3)
 * @param options Additional ScrollTrigger options
 */
export function createParallaxEffect(
  element: string | Element,
  strength: number = 0.3,
  options: {
    start?: string;
    end?: string;
    scrub?: boolean | number;
    markers?: boolean;
  } = {}
) {
  return createScrollAnimation(
    element,
    {
      y: (index, target) => {
        // Calculate a percentage based on element size and viewport
        const rect = target instanceof Element 
          ? target.getBoundingClientRect() 
          : document.querySelector(target as string)?.getBoundingClientRect();
          
        if (!rect) return 0;
        return -rect.height * strength;
      },
    },
    {
      start: options.start || 'top bottom',
      end: options.end || 'bottom top',
      scrub: options.scrub === true ? 1 : (options.scrub === false ? false : options.scrub),
      markers: options.markers || false,
    }
  );
}

/**
 * Create a scroll-driven progress animation
 * @param element Target element or selector 
 * @param animation Animation to apply
 * @param options ScrollTrigger options
 */
export function createScrollProgress(
  element: string | Element,
  animation: gsap.TweenVars,
  options: {
    start?: string;
    end?: string;
    scrub?: boolean | number;
    markers?: boolean;
  } = {}
) {
  return createScrollAnimation(
    element,
    animation,
    {
      start: options.start || 'top bottom',
      end: options.end || 'bottom top',
      scrub: options.scrub === true ? 1 : (options.scrub === false ? false : options.scrub),
      markers: options.markers || false,
    }
  );
}

/**
 * Create a horizontal scroll section
 * @param container The container element or selector
 * @param scrollingElement The element that will be scrolled horizontally
 * @param options Additional options for the horizontal scroll
 */
export function createHorizontalScroll(
  container: string | Element,
  scrollingElement: string | Element,
  options: {
    start?: string;
    end?: string;
    scrub?: boolean | number;
    markers?: boolean;
    pin?: boolean;
    anticipatePin?: boolean;
  } = {}
) {
  // Get elements
  const containerEl = typeof container === 'string' ? document.querySelector(container) : container;
  const scrollEl = typeof scrollingElement === 'string' ? document.querySelector(scrollingElement) : scrollingElement;
  
  // Exit if elements not found
  if (!containerEl || !scrollEl) return;
  
  // Calculate the width of the scrolling element
  const width = (scrollEl as HTMLElement).scrollWidth;
  const containerWidth = (containerEl as HTMLElement).offsetWidth;
  
  // Create horizontal scroll animation
  return gsap.to(scrollEl, {
    x: () => -(width - containerWidth),
    ease: "none",
    scrollTrigger: {
      trigger: containerEl,
      start: options.start || 'top top',
      end: options.end || `+=${width}`,
      scrub: options.scrub === true ? 1 : (options.scrub === false ? false : options.scrub),
      pin: options.pin !== undefined ? options.pin : true,
      anticipatePin: options.anticipatePin ? 1 : 0, // Convert boolean to number (1 or 0)
      markers: options.markers || false,
      invalidateOnRefresh: true,
    },
  });
} 
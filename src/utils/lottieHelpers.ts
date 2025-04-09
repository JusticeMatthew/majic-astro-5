import { DotLottieWorker } from "@lottiefiles/dotlottie-web";

const animationInstances: Map<string, DotLottieWorker> = new Map();

const SHARED_WORKER_ID = "shared-dotlottie-worker";

const loadLottie = (
  name: string,
  autoplay: boolean = true,
): DotLottieWorker | null => {
  // Initialize lottie immediately if it's not a plan animation
  if (!name.match(/^(Personal|Business|Commerce)$/)) {
    return initializeLottie(name, autoplay);
  }

  // For plan animations, use intersection observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        initializeLottie(name, autoplay);
        observer.disconnect();
      }
    });
  });

  const container = document.getElementById(`plan-${name.toLowerCase()}`);
  if (container) {
    observer.observe(container);
  }

  return null;
};

const initializeLottie = (name: string, autoplay: boolean) => {
  const canvasElement = document.getElementById(
    `lottie-container-${name}`,
  ) as HTMLCanvasElement;

  if (!canvasElement) {
    console.error(
      `Canvas element with ID "lottie-container-${name}" not found`,
    );
    return null;
  }

  const animationUrl = new URL(
    `../assets/animations/${name}.lottie`,
    import.meta.url,
  ).href;

  const lottie = new DotLottieWorker({
    canvas: canvasElement,
    src: animationUrl,
    loop: true,
    autoplay: autoplay,
    workerId: SHARED_WORKER_ID,
  });

  animationInstances.set(name, lottie);

  // Only add hover events for plan animations
  if (name.match(/^(Personal|Business|Commerce)$/)) {
    const planContainer = document.getElementById(
      `plan-${name.toLowerCase()}`,
    ) as HTMLDivElement;

    if (planContainer) {
      planContainer.addEventListener("mouseenter", () => {
        lottie.play();
      });

      planContainer.addEventListener("mouseleave", () => {
        lottie.pause();
      });
    }
  }

  return lottie;
};

const cleanupLottie = (): void => {
  animationInstances.forEach((instance, name) => {
    try {
      instance.destroy();
    } catch (e) {
      console.error(`Error destroying animation ${name}:`, e);
    }
    animationInstances.delete(name);
  });
};

export { loadLottie, cleanupLottie };

import { DotLottieWorker } from "@lottiefiles/dotlottie-web";

const animationInstances: Map<string, DotLottieWorker> = new Map();

const SHARED_WORKER_ID = "shared-dotlottie-worker";

const loadLottie = (
  name: string,
  autoplay: boolean = true,
): DotLottieWorker | null => {
  // Get the base name without the mobile- prefix if it exists
  const baseName = name.replace("mobile-", "");

  // Initialize lottie immediately if it's not a plan animation
  if (!baseName.match(/^(Personal|Business|Commerce)$/)) {
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

  const containerId = name.startsWith("mobile-")
    ? `plan-mobile-${baseName.toLowerCase()}`
    : `plan-${baseName.toLowerCase()}`;

  const container = document.getElementById(containerId);
  if (container) {
    observer.observe(container);
  }

  return null;
};

const initializeLottie = (name: string, autoplay: boolean) => {
  const baseName = name.replace("mobile-", "");
  const canvasElement = document.getElementById(
    `lottie-container-${name}`,
  ) as HTMLCanvasElement;

  if (!canvasElement) {
    console.error(
      `Canvas element with ID "lottie-container-${name}" not found`,
    );
    return null;
  }

  // Use the base name for the animation URL
  const animationUrl = new URL(
    `../assets/animations/${baseName}.lottie`,
    import.meta.url,
  ).href;

  const isMobile = name.startsWith("mobile-");

  const lottie = new DotLottieWorker({
    canvas: canvasElement,
    src: animationUrl,
    loop: true,
    // Always autoplay for mobile versions, otherwise use the passed autoplay parameter
    autoplay: isMobile ? true : autoplay,
    workerId: SHARED_WORKER_ID,
  });

  animationInstances.set(name, lottie);

  // Only add hover events for desktop plan animations
  if (baseName.match(/^(Personal|Business|Commerce)$/) && !isMobile) {
    const containerId = `plan-${baseName.toLowerCase()}`;
    const planContainer = document.getElementById(
      containerId,
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

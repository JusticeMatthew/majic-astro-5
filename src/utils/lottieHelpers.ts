import { DotLottieWorker } from "@lottiefiles/dotlottie-web";

const animationInstances: Map<string, DotLottieWorker> = new Map();

const SHARED_WORKER_ID = "shared-dotlottie-worker";

const loadLottie = (
  name: string,
  autoplay: boolean = true,
): DotLottieWorker | null => {
  const canvasElement = document.getElementById(
    `lottie-container-${name}`,
  ) as HTMLCanvasElement;

  if (!canvasElement) {
    console.error(
      `Canvas element with ID "lottie-container-${name}" not found`,
    );
    return null;
  }

  const lottie = new DotLottieWorker({
    canvas: canvasElement,
    src: `${window.location.origin}/animations/${name}.lottie`,
    loop: true,
    autoplay: autoplay,
    workerId: SHARED_WORKER_ID,
  });

  animationInstances.set(name, lottie);

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

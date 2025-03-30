import { DotLottieWorker } from "@lottiefiles/dotlottie-web";

const loadLottie = (name: string, autoplay: boolean = true) => {
  const lottie = new DotLottieWorker({
    canvas: document.getElementById(
      `lottie-container-${name}`,
    ) as HTMLCanvasElement,
    src: `${window.location.origin}/animations/${name}.lottie`,
    loop: true,
    autoplay: autoplay,
    workerId: name,
  });

  const planContainer = document.getElementById(
    `plan-${name.toLowerCase()}`,
  ) as HTMLDivElement;

  if (planContainer) {
    // Play animation on hover
    planContainer.addEventListener("mouseenter", () => {
      lottie.play();
    });

    // Pause animation when not hovering
    planContainer.addEventListener("mouseleave", () => {
      lottie.pause();
    });
  }

  return lottie;
};

export { loadLottie };

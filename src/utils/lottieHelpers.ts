import { DotLottieWorker } from "@lottiefiles/dotlottie-web";

// TODO: Add an autoplay prop that defaults to true?
const loadLottie = (name: string) => {
  const lottie = new DotLottieWorker({
    canvas: document.getElementById(
      `lottie-container-${name}`,
    ) as HTMLCanvasElement,
    src: `${window.location.origin}/animations/${name}.lottie`,
    loop: true,
    autoplay: true,
    workerId: name,
  });

  return lottie;
};

export { loadLottie };

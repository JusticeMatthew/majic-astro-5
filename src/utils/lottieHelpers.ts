import { DotLottieWorker } from "@lottiefiles/dotlottie-web";

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

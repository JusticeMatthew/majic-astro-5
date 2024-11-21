import Lottie from "lottie-web";
import { createEffect } from "solid-js";

interface LottieAnimationProps {
  selector: string;
  styles: string;
}

export default function LottieAnimation({
  selector,
  styles,
}: LottieAnimationProps) {
  createEffect(() => {
    const lottieContainer = document.getElementById(
      `lottie-container:${selector}`,
    ) as HTMLElement;

    const animation = Lottie.loadAnimation({
      container: lottieContainer,
      renderer: "canvas",
      loop: true,
      autoplay: true,
      path: `/animations/${selector}.json`,
    });

    return () => {
      animation.destroy();
    };
  });
  return <figure id={`lottie-container:${selector}`} class={styles}></figure>;
}

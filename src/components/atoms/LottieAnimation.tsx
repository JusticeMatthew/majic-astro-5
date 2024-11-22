import lottie_light from "lottie-web";
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
    let animation: any;
    const lottieContainer = document.getElementById(
      `lottie-container:${selector}`,
    ) as HTMLElement;

    animation = lottie_light.loadAnimation({
      container: lottieContainer,
      renderer: "svg",
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

import Lottie from "lottie-web";
import { onMount } from "solid-js";

interface LottieAnimationProps {
  selector: string;
  styles: string;
}

export default function LottieAnimation({
  selector,
  styles,
}: LottieAnimationProps) {
  onMount(() => {
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

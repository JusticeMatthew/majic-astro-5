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
    let animation: any;
    const lottieContainer = document.getElementById(
      `lottie-container:${selector}`,
    ) as HTMLElement;

    animation = Lottie.loadAnimation({
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

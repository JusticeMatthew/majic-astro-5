import {
  children as resolveChildren,
  createSignal,
  createEffect,
  Show,
} from "solid-js";
import lottie_light from "lottie-web";
import { pricingPlans } from "$/constants";

interface MobilePackagesProps {
  children: HTMLElement[];
}

type PlanName = "Personal" | "Business" | "Commerce";

export default function MobilePackages(props: MobilePackagesProps) {
  const resolved = resolveChildren(() => props.children);
  const childElement = resolved() as HTMLElement;
  const lottieArray = Array.from(childElement.children);
  const [activePlan, setActivePlan] = createSignal<PlanName>("Business");
  const animationCache = new Map();

  createEffect(() => {
    const activeIndex = pricingPlans.findIndex((p) => p.name === activePlan());
    const currentChild = lottieArray[activeIndex];

    if (!animationCache.has(activePlan())) {
      animationCache.set(activePlan(), currentChild);

      const animation = lottie_light.loadAnimation({
        container: currentChild,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: `/animations/${activePlan().toLowerCase()}Plan.json`,
      });

      window.addEventListener("astro:before-swap", () => {
        animation.destroy();
      });
    }
  });

  return (
    <div class="relative mt-16 flex h-auto w-full flex-col justify-between rounded-b-lg bg-light py-4 pl-4 pr-6 text-dark shadow sm:px-20 sm:py-8 md:px-32 container:hidden">
      <div class="absolute -top-12 left-0 flex h-12 w-full items-center rounded-t-lg bg-light/60 text-center">
        {pricingPlans.map(({ name }) => (
          <div
            onClick={() => setActivePlan(name as PlanName)}
            classList={{
              "flex h-full w-1/3 items-center justify-center cursor-pointer":
                true,
              "bg-light": activePlan() === name,
              "rounded-tl-lg": activePlan() === "Personal",
              "rounded-tr-lg": activePlan() === "Commerce",
            }}>
            {name}
          </div>
        ))}
      </div>
      <div class="flex flex-row justify-between tablet:px-28 tablet:container:px-32">
        {pricingPlans.map(({ name, price, monthly, recommended }, index) => (
          <Show when={activePlan() === name}>
            {
              <>
                {lottieArray[index]}
                <div class="relative ml-4 flex flex-col items-center justify-center">
                  {recommended && (
                    <div class="absolute left-0 top-1 flex w-full justify-center text-center text-light">
                      <p class="z-10 w-fit whitespace-nowrap rounded-full bg-secondary-gradient px-6 py-1 text-min md:px-10">
                        Most Popular
                      </p>
                      <figure class="absolute -top-1 mx-auto h-[34px] w-36 rounded-full bg-blurple blur md:w-44" />
                    </div>
                  )}
                  <p class="font-calistoga text-level-3">{name}</p>
                  <p class="w-full text-center font-calistoga text-level-2">
                    {price}
                  </p>
                  <p class="mt-2 w-full text-center text-min text-dark/80">
                    {monthly}
                  </p>
                </div>
              </>
            }
          </Show>
        ))}
      </div>
    </div>
  );
}

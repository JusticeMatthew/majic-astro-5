import {
  children as resolveChildren,
  createSignal,
  createEffect,
  Show,
} from "solid-js";
import lottie_light from "lottie-web";
import { pricingPlans } from "$/constants";

type PlanName = "Personal" | "Business" | "Commerce";

export default function MobilePackages() {
  const [activePlan, setActivePlan] = createSignal<PlanName>("Business");

  createEffect(() => {
    const lottieTarget = document.getElementById(
      `solid-lottie-${activePlan()}`,
    ) as HTMLElement;

    const animation = lottie_light.loadAnimation({
      container: lottieTarget,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: `/animations/${activePlan().toLowerCase()}Plan.json`,
    });

    window.addEventListener("astro:before-swap", () => {
      animation.destroy();
    });
  });

  return (
    <div class="relative mt-16 flex h-auto w-full flex-col justify-between rounded-b-lg bg-light py-4 pl-4 pr-6 text-dark shadow sm:py-8 container:hidden">
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
      <div class="flex w-full flex-col">
        {pricingPlans.map(({ name, price, monthly, recommended, services }) => (
          <Show when={activePlan() === name}>
            {
              <>
                <div class="relative flex w-full flex-row justify-around pl-4 sm:px-16 sm:py-8 md:px-32 tablet:px-44">
                  {recommended && (
                    <div class="absolute bottom-3 left-0 hidden w-full justify-center text-center text-light sm:top-1 sm:flex">
                      <p class="z-10 h-fit w-fit text-nowrap rounded-full bg-secondary-gradient px-4 py-1 text-min sm:px-6 md:px-10">
                        Most Popular
                      </p>
                      <figure class="absolute -top-1 mx-auto h-[34px] w-32 rounded-full bg-blurple blur sm:w-36 md:w-44" />
                    </div>
                  )}
                  <div class="relative mx-4 flex flex-col items-center justify-start sm:justify-center">
                    {recommended && (
                      <div class="absolute bottom-3 left-0 flex w-full justify-center text-center text-light sm:top-1 sm:hidden">
                        <p class="z-10 h-fit w-fit text-nowrap rounded-full bg-secondary-gradient px-4 py-1 text-min sm:px-6 md:px-10">
                          Most Popular
                        </p>
                        <figure class="absolute -top-1 mx-auto h-[34px] w-32 rounded-full bg-blurple blur sm:w-36 md:w-44" />
                      </div>
                    )}
                    <p class="pt-6 font-calistoga text-level-2 sm:pt-0 sm:text-level-3">
                      {name}
                    </p>
                    <p class="w-full text-center font-calistoga text-level-1 sm:text-level-2">
                      {price}
                    </p>
                    <p class="mt-2 w-full text-nowrap text-center text-min text-dark/80">
                      {monthly}
                    </p>
                  </div>
                  <figure
                    id={`solid-lottie-${name}`}
                    class="h-44 w-44 sm:h-60 sm:w-60 tablet:h-80 tablet:w-80"></figure>
                </div>
                <div class="mt-10 flex w-full flex-col items-center px-6 sm:mt-8">
                  <div class="grid w-fit grid-cols-1 gap-x-4 md:grid-cols-2">
                    {services.map((service) => (
                      <div class="mb-6 flex">
                        <img
                          src="/icons/check-icon.svg"
                          alt=""
                          width={20}
                          height={20}
                        />
                        <p class="ml-6 inline text-min sm:text-content">
                          {service}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            }
          </Show>
        ))}
      </div>
    </div>
  );
}

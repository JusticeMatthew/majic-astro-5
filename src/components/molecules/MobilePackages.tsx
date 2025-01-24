import { createSignal, createEffect, Show } from "solid-js";
import { DotLottie } from "@lottiefiles/dotlottie-web";
import pricingPlans from "$/constants/pricingPlans.ts";

type PlanName = "Personal" | "Business" | "Commerce";

export default function MobilePackages() {
  const [activePlan, setActivePlan] = createSignal<PlanName>("Business");

  createEffect(() => {
    const lottieTarget = document.getElementById(
      `solid-lottie-${activePlan()}`,
    ) as HTMLCanvasElement;

    const solidLottie = new DotLottie({
      canvas: lottieTarget,
      src: `/animations/${activePlan()}.lottie`,
      loop: true,
      autoplay: true,
    });

    return () => {
      solidLottie.destroy();
    };
  });

  return (
    <div class="bg-light text-dark container:hidden relative mt-16 flex h-auto w-full flex-col justify-between rounded-b-lg py-4 pr-6 pl-4 shadow sm:py-8">
      <div class="bg-light/60 absolute -top-12 left-0 flex h-12 w-full items-center rounded-t-lg text-center">
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
                <div class="tablet:px-44 relative flex w-full flex-row justify-around pl-4 sm:px-16 sm:py-8 md:px-32">
                  {recommended && (
                    <div class="text-light absolute bottom-3 left-0 hidden w-full justify-center text-center sm:top-1 sm:flex">
                      <p class="secondary-gradient text-min z-10 h-fit w-fit rounded-full px-4 py-1 text-nowrap sm:px-6 md:px-10">
                        Most Popular
                      </p>
                      <figure class="bg-blurple absolute -top-1 mx-auto h-[34px] w-32 rounded-full blur sm:w-36 md:w-44" />
                    </div>
                  )}
                  <div class="relative mx-4 flex flex-col items-center justify-start sm:justify-center">
                    {recommended && (
                      <div class="text-light absolute bottom-3 left-0 flex w-full justify-center text-center sm:top-1 sm:hidden">
                        <p class="secondary-gradient text-min z-10 h-fit w-fit rounded-full px-4 py-1 text-nowrap sm:px-6 md:px-10">
                          Most Popular
                        </p>
                        <figure class="bg-blurple absolute -top-1 mx-auto h-[34px] w-32 rounded-full blur sm:w-36 md:w-44" />
                      </div>
                    )}
                    <p class="font-calistoga text-level-2 sm:text-level-3 pt-6 sm:pt-0">
                      {name}
                    </p>
                    <p class="font-calistoga text-level-1 sm:text-level-2 w-full text-center">
                      {price}
                    </p>
                    <p class="text-min text-dark/80 mt-2 w-full text-center text-nowrap">
                      {monthly}
                    </p>
                  </div>
                  <canvas
                    id={`solid-lottie-${name}`}
                    class="tablet:h-80 tablet:w-80 h-44 w-44 sm:h-60 sm:w-60"></canvas>
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
                        <p class="text-min ml-6 inline sm:text-base">
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

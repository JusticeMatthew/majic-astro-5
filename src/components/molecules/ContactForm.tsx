import { z } from "astro:schema";
import { actions } from "astro:actions";
import { createSignal, createEffect } from "solid-js";
import { createForm } from "@tanstack/solid-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { toast } from "studiocms:ui/components";

export default function ContactForm({
  children,
}: {
  children: HTMLButtonElement;
}) {
  const [_, setSending] = createSignal(false);

  const form = createForm(() => ({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    validatorAdapters: zodValidator(),
    onSubmit: async ({ value }) => {
      setSending(true);
      const { error } = await actions.sendEmail(value);

      if (!error) {
        const successEvent = new CustomEvent("success");
        toast({
          title: "Success!",
          description:
            "Your message has been received and we will respond within 48 hours.",
          type: "success",
          persistent: true,
        });
        document.dispatchEvent(successEvent);
        setSending(false);
        form.reset();
      } else {
        console.log(error);
      }
    },
  }));

  createEffect(() => {
    const submitButton = document.getElementById(
      "form-submit-button",
    ) as HTMLButtonElement;

    form.useStore(({ fieldMeta }) => {
      const formErrors = Object.values(fieldMeta).flatMap(
        (field) => field.errors,
      ).length;

      submitButton.disabled = formErrors > 0;
    });
  });

  const inputContainerStyles = "mb-6 md:last:mb-0";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      class="text-dark z-30 mb-14 flex w-full flex-col">
      <div class="flex w-full flex-col md:flex-row md:gap-14">
        <div class="w-full">
          <div class={inputContainerStyles}>
            <label>
              Name
              <form.Field
                name="name"
                validatorAdapter={zodValidator()}
                validators={{
                  onChange: z.string().min(1, "We need to know your name"),
                }}
                children={(field) => (
                  <div class="relative">
                    <input
                      classList={{
                        "mt-2 h-12 w-full rounded-lg bg-slate-200 p-3 focus:outline-none sm:h-14":
                          true,
                        "ring-blurple focus-within:ring-4 hover:ring-4": field()
                          .state.meta.errors.length
                          ? false
                          : true,
                        "ring-4 ring-red-700 focus-within:ring-4": field().state
                          .meta.errors.length
                          ? true
                          : false,
                      }}
                      name={field().name}
                      value={field().state.value}
                      onBlur={field().handleBlur}
                      onInput={(e) => field().handleChange(e.target.value)}
                    />
                    {field().state.meta.errors && (
                      <span class="text-min absolute -top-5.5 left-16 text-red-700">
                        {field().state.meta.errors}
                      </span>
                    )}
                  </div>
                )}
              />
            </label>
          </div>
          <div class={inputContainerStyles}>
            <label>
              Email
              <form.Field
                name="email"
                validatorAdapter={zodValidator()}
                validators={{
                  onChangeAsyncDebounceMs: 500,
                  onChangeAsync: z.string().email("We need a valid email"),
                }}
                children={(field) => (
                  <div class="relative">
                    <input
                      classList={{
                        "mt-2 h-12 w-full rounded-lg bg-slate-200 p-3 focus:outline-none sm:h-14":
                          true,
                        "ring-blurple focus-within:ring-4 hover:ring-4": field()
                          .state.meta.errors.length
                          ? false
                          : true,
                        "ring-4 ring-red-700 focus-within:ring-4": field().state
                          .meta.errors.length
                          ? true
                          : false,
                      }}
                      name={field().name}
                      value={field().state.value}
                      onBlur={field().handleBlur}
                      onInput={(e) => field().handleChange(e.target.value)}
                    />
                    {field().state.meta.errors && (
                      <span class="text-min absolute -top-5.5 left-16 text-red-700">
                        {field().state.meta.errors}
                      </span>
                    )}
                  </div>
                )}
              />
            </label>
          </div>
        </div>
        <div class="w-full">
          <label>
            Message
            <form.Field
              name="message"
              validatorAdapter={zodValidator()}
              validators={{
                onChange: z.string().min(1, "Let us know how we can help"),
              }}
              children={(field) => (
                <div class="relative">
                  <textarea
                    classList={{
                      "mt-2 w-full resize-none rounded-lg bg-slate-200 p-3 focus:outline-none h-43":
                        true,
                      "ring-blurple focus-within:ring-4 hover:ring-4": field()
                        .state.meta.errors.length
                        ? false
                        : true,
                      "ring-4 ring-red-700 focus-within:ring-4": field().state
                        .meta.errors.length
                        ? true
                        : false,
                    }}
                    name={field().name}
                    value={field().state.value}
                    onBlur={field().handleBlur}
                    onInput={(e) => field().handleChange(e.target.value)}
                  />
                  {field().state.meta.errors && (
                    <span class="text-min absolute -top-5.5 left-24 text-red-700">
                      {field().state.meta.errors}
                    </span>
                  )}
                </div>
              )}
            />
          </label>
        </div>
      </div>
      <div class="mt-14 flex w-full justify-center">{children}</div>
    </form>
  );
}

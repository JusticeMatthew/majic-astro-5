import { createSignal } from "solid-js";
import { createForm } from "@tanstack/solid-form";

export default function ContactForm({
  children,
}: {
  children: HTMLButtonElement;
}) {
  const [sending, setSending] = createSignal(false);
  const form = createForm(() => ({
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
    onSubmit: async ({ value }) => {
      console.log("Success", value);
    },
  }));

  const styles = {
    inputContainer: "mb-6",
    input:
      "mt-2 h-12 w-full rounded-lg bg-slate-200 p-3 focus:outline-none sm:h-14 ring-blurple focus-within:ring-4 hover:ring-4",
    textArea:
      "mt-2 h-56 w-full resize-none rounded-lg bg-slate-200 p-3 focus:outline-none sm:h-72 ring-blurple focus-within:ring-4 hover:ring-4",
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      class="z-30 mb-14 flex w-full flex-col text-dark">
      <div class="flex min-h-96 w-full flex-col sm:flex-row sm:gap-16 md:gap-16">
        <div class="w-full">
          <div class={styles.inputContainer}>
            <label>
              Name
              <form.Field
                name="name"
                children={(field) => (
                  <input
                    class={styles.input}
                    name={field().name}
                    value={field().state.value}
                    onBlur={field().handleBlur}
                    onInput={(e) => field().handleChange(e.target.value)}
                  />
                )}
              />
            </label>
          </div>
          <div class={styles.inputContainer}>
            <label>
              Email
              <form.Field
                name="email"
                children={(field) => (
                  <input
                    class={styles.input}
                    name={field().name}
                    value={field().state.value}
                    onBlur={field().handleBlur}
                    onInput={(e) => field().handleChange(e.target.value)}
                  />
                )}
              />
            </label>
          </div>
          <div class={styles.inputContainer}>
            <label>
              Company
              <form.Field
                name="company"
                children={(field) => (
                  <input
                    class={styles.input}
                    name={field().name}
                    value={field().state.value}
                    onBlur={field().handleBlur}
                    onInput={(e) => field().handleChange(e.target.value)}
                  />
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
              children={(field) => (
                <textarea
                  class={styles.textArea}
                  name={field().name}
                  value={field().state.value}
                  onBlur={field().handleBlur}
                  onInput={(e) => field().handleChange(e.target.value)}
                />
              )}
            />
          </label>
        </div>
      </div>
      <div class="flex w-full justify-center">{children}</div>
    </form>
  );
}

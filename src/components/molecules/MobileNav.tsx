import navLinks from "$/constants/navLinks.ts";
import { children as resolveChildren, createSignal, onMount } from "solid-js";

interface MobileNavProps {
  children: HTMLElement[];
}

export default function MobileNav(props: MobileNavProps) {
  const [icons, setIcons] = createSignal({
    menuIcon: <></>,
    closeIcon: <></>,
    button: <></>,
  });
  const resolved = resolveChildren(() => props.children);
  const childElement = resolved() as HTMLElement;

  onMount(() => {
    setIcons({
      menuIcon: childElement.children[0],
      closeIcon: childElement.children[1],
      button: childElement.children[2],
    });
  });

  const [menuOpen, setMenuOpen] = createSignal(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen());
  };

  return (
    <div class="tablet:hidden relative">
      <button
        onClick={handleMenuToggle}
        aria-label="nav menu"
        class="p-2 active:scale-95">
        {icons().menuIcon}
      </button>
      <aside
        class={`${menuOpen() ? "-translate-x-[60%]" : "translate-x-[120%]"} fixed top-0 h-screen min-w-80 drop-shadow-lg transition-all duration-300 will-change-transform`}>
        <div class="from-dark-bg flex h-full w-[90%] justify-end bg-gradient-to-l to-transparent backdrop-blur">
          <nav class="bg-light-purple flex h-full min-w-80 flex-col">
            <button onClick={handleMenuToggle}>{icons().closeIcon}</button>
            <div class="text-dark mt-6 flex h-full w-full flex-col justify-between">
              <div class="flex w-full flex-col items-center">
                {navLinks.map(({ href, label }) => (
                  <a
                    href={href}
                    onClick={handleMenuToggle}
                    class="text-level-2 hover:bg-blurple/30 focus:bg-blurple/30 max-w-90 rounded-lg px-4 py-3 text-center active:scale-95 [&:nth-child(3)]:mb-3">
                    {label}
                  </a>
                ))}
              </div>
              <div class="mb-16 flex w-full flex-col items-center">
                {icons().button}
                <p class="mt-2 mb-1">or call:</p>
                <a href="tel:3866019344">386-601-9344</a>
              </div>
            </div>
          </nav>
        </div>
      </aside>
    </div>
  );
}

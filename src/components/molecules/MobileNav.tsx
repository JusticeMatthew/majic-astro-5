import navLinks from "$/constants/navLinks.ts";
import { children as resolveChildren, createSignal } from "solid-js";

interface MobileNavProps {
  children: HTMLElement[];
}

export default function MobileNav(props: MobileNavProps) {
  const resolved = resolveChildren(() => props.children);
  const childElement = resolved() as HTMLElement;

  const astro = {
    menuIcon: childElement.children[0],
    closeIcon: childElement.children[1],
    button: childElement.children[2],
  };

  const [menuOpen, setMenuOpen] = createSignal(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen());
  };

  return (
    <div class="tablet:hidden relative">
      <button
        onClick={handleMenuToggle}
        aria-label="nav menu"
        class="p-3 active:scale-95">
        {astro.menuIcon}
      </button>
      <figure
        onClick={handleMenuToggle}
        class={`fixed top-0 left-0 -z-1 h-screen w-screen bg-black/30 backdrop-blur-lg transition-opacity duration-300 ${menuOpen() ? "opacity-100" : "opacity-0"}`}></figure>
      <aside
        class={`${menuOpen() ? "right-0" : "-right-[100vw]"} fixed top-0 h-screen w-fit drop-shadow-lg transition-all duration-300 will-change-transform`}>
        <div class="from-dark-bg flex h-full w-full justify-end bg-gradient-to-l to-transparent backdrop-blur">
          <nav class="bg-light-purple flex h-full min-w-52 flex-col">
            <button onClick={handleMenuToggle}>{astro.closeIcon}</button>
            <div class="text-dark mt-6 flex h-full w-full flex-col justify-between px-4">
              <div class="flex w-full flex-col items-center">
                {navLinks.map(({ href, label }) => (
                  <a
                    href={href}
                    onClick={handleMenuToggle}
                    class="text-level-2 hover:bg-blurple/30 focus:bg-blurple/30 w-full rounded-lg py-3 text-center active:scale-95 [&:nth-child(3)]:mb-3">
                    {label}
                  </a>
                ))}
              </div>
              <div class="mb-16 flex w-full flex-col items-center">
                {astro.button}
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

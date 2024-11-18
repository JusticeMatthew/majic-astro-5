import { navLinks } from "@/constants";
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
    <div class="md:hidden">
      <button onClick={handleMenuToggle} class="p-3 active:scale-95">
        {astro.menuIcon}
      </button>
      <aside
        class={`${menuOpen() ? "right-0" : "-right-[100vh]"} fixed top-0 h-screen w-screen transition-all duration-300`}>
        <div class="flex h-full w-full justify-end bg-gradient-to-l from-dark-bg to-transparent backdrop-blur">
          <figure onClick={handleMenuToggle} class="w-full"></figure>
          <nav class="flex h-full min-w-52 flex-col bg-light-purple">
            <button onClick={handleMenuToggle}>{astro.closeIcon}</button>
            <div class="mt-6 flex h-full w-full flex-col justify-between px-4 text-dark">
              <div class="flex w-full flex-col items-center">
                {navLinks.map(({ href, label }) => (
                  <a
                    href={href}
                    onClick={handleMenuToggle}
                    class="w-full rounded-lg py-3 text-center text-level-2 hover:bg-blurple/30 focus:bg-blurple/30 active:scale-95 [&:nth-child(3)]:mb-3">
                    {label}
                  </a>
                ))}
              </div>
              <div class="mb-16 flex w-full flex-col items-center">
                {astro.button}
                <p class="mb-1 mt-2">or call:</p>
                <a href="tel:3866019344">386-601-9344</a>
              </div>
            </div>
          </nav>
        </div>
      </aside>
    </div>
  );
}

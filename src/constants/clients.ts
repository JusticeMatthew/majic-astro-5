import { getImage } from "astro:assets";
import dawnforge from "$/assets/dawnforge-bg.webp";
import tandt from "$/assets/tandt-bg.webp";
import bandc from "$/assets/bandc-bg.webp";

const dawnforgeBg = await getImage({ src: dawnforge });
const bandcBg = await getImage({ src: bandc });
const tandtBg = await getImage({ src: tandt });

const examples = [
  {
    title: "B&C Pest Control",
    subtitle: "Florida’s Pest Control Experts",
    content:
      "A fresh look for a trusted pest control service, blending modern aesthetics with practical solutions.",
    site: "https://bandcpestcontrol.com/",
    background: "bg-[#18181B]",
    poster: bandcBg,
    styles: `background-image: linear-gradient(to right, #314224 40%, rgba(49, 66, 36, .8) 70%, transparent), url(${bandcBg.src})`,
  },
  {
    title: "Dawnforge",
    subtitle: "Where Players Bring Cards to Life",
    content:
      "The website for fan-based interactions with the popular card game Dawncaster. Create cards, vote on designs, and much, much more!",
    site: "https://www.dawnforge.app/",
    background: "bg-[#ff64f5]",
    styles: `background-image: linear-gradient(to right, #3f0624 30%, rgba(63, 6, 36, .8) 60%, transparent), url(${dawnforgeBg.src})`,
  },
  {
    title: "T&T Photography",
    subtitle: "Discovering Nature’s Finest Moments",
    content:
      "Showcasing the stunning portfolio of a talented local photography team with sleek design and seamless performance.",
    site: "https://tandt-v2.vercel.app/",
    background: "bg-[#4A3D87]",
    styles: `background-image: linear-gradient(to right, #2e4b6b 30%, rgba(46, 75, 107, .8) 60%, transparent), url(${tandtBg.src})`,
  },
];

export default examples;

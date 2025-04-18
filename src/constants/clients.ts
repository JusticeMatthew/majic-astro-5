import { getImage } from "astro:assets";
import dawnforge from "$/assets/images/dawnforge-bg.webp";
import bandc from "$/assets/images/bandc-bg.webp";
import wpr from "$/assets/images/wpr.png";

const dawnforgeBg = await getImage({ src: dawnforge });
const bandcBg = await getImage({ src: bandc });
const wprBg = await getImage({ src: wpr });

const examples = [
  {
    title: "B&C Pest Control",
    subtitle: "Florida's Pest Control Experts",
    content:
      "A fresh look for a trusted pest control service, blending modern aesthetics with practical solutions.",
    site: "https://bandcpestcontrol.com/",
    background: "bg-[#314224]",
    poster: bandcBg,
    styles: `background-image: linear-gradient(to right, #314224 40%, rgba(49, 66, 36, .8) 70%, transparent), url(${bandcBg.src})`,
  },
  {
    title: "Dawnforge",
    subtitle: "Where Players Bring Cards to Life",
    content:
      "The website for fan-based interactions with the popular card game Dawncaster. Create cards, vote on designs, and much, much more!",
    site: "https://www.dawnforge.app/",
    background: "bg-[#3f0624]",
    styles: `background-image: linear-gradient(to right, #3f0624 30%, rgba(63, 6, 36, .8) 60%, transparent), url(${dawnforgeBg.src})`,
  },
  {
    title: "World Population Review",
    subtitle: "Global Data Insights Made Clear",
    content:
      "Transforming complex demographic data into gorgeous, intuitive visualizations and insights.",
    site: "https://worldpopulationreview.com/",
    background: "bg-[#2e4b6b]",
    styles: `background-image: linear-gradient(to right, #2e4b6b 30%, rgba(46, 75, 107, .8) 60%, transparent), url(${wprBg.src})`,
  },
];

export default examples;

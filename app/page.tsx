import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Art from "@/components/Art";
import Showcase from "@/components/Showcase";
import Gallery from "@/components/Gallery";
import Motion from "@/components/Motion";
import Introduction from "@/components/Introduction";
import Emblem from "@/components/Emblem";
import Journey from "@/components/Journey";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Manifesto />
      <Art />
      <Showcase />
      <Gallery />
      <Motion />
      <Introduction />
      <Emblem />
      <Journey />
      <Contact />
    </main>
  );
}

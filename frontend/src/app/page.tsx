import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Disciplines from "@/components/sections/Disciplines";
import ForOrganizers from "@/components/sections/ForOrganizers";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Disciplines />
        <ForOrganizers />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

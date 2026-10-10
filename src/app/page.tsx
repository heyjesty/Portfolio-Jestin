import PageLoader from "@/components/PageLoader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/RevealObserver";

export default function Home() {
  return (
    <>
      <PageLoader />
      <a className="skip" href="#work">
        Skip to work
      </a>
      <Header />
      <main>
        <Hero />
        <Work />
        <About />
        <Experience />
        <Process />
        <Contact />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}

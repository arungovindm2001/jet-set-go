import Hero from "./components/Hero";
import Services from "./components/Services";
import Footer from "./components/Footer";
import Carousel from "./search/components/Carousel";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Carousel />
      <Footer />
    </>
  );
}

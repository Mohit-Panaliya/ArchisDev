import { useLayoutEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Cursor } from "./components/Cursor";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { PageFade } from "./components/PageFade";
import { Preloader } from "./components/Preloader";
import { ScrollManager } from "./components/ScrollManager";
import { ScrollProgress } from "./components/ScrollProgress";
import { ScrollTrigger } from "./lib/gsap";
import { destroySmoothScroll, initSmoothScroll } from "./lib/smoothScroll";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Pricing from "./pages/Pricing";
import ServiceDetail from "./pages/ServiceDetail";
import Services from "./pages/Services";
import Work from "./pages/Work";

const baseName = import.meta.env.BASE_URL.replace(/\/$/, "");

export default function App() {
  useLayoutEffect(() => {
    initSmoothScroll();
    ScrollTrigger.refresh();

    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      destroySmoothScroll();
    };
  }, []);

  return (
    <BrowserRouter basename={baseName || "/"}>
      <Preloader />
      <ScrollProgress />
      <Cursor />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <ScrollManager />
      <PageFade>
        <main id="main" tabIndex={-1}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/work" element={<Work />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </PageFade>
      <Footer />
    </BrowserRouter>
  );
}

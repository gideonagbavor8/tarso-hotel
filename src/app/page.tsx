import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Rooms from "@/components/Rooms";
import Booking from "@/components/Booking";
import Restaurant from "@/components/Restaurant";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";
import PageLoader from "@/components/PageLoader";
import CallButton from "@/components/CallButton";

export default function Home() {
  return (
    <PageLoader>
      <main>
        <Navbar />
        <Hero />
        <About />
        <Rooms />
        <Booking />
        <Restaurant />
        <Reviews />
        <Contact />
        <Footer />
        <WhatsAppButton />
        <ScrollToTop />
        <CallButton />
      </main>
    </PageLoader>
  );
}
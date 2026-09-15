import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PropertiesSection from "../components/PropertiesSection";
import RecentBookings from "../components/RecentBookings";
import WhyCoral from "../components/WhyCoral";
import Footer from "../components/Footer";

export default function Home() {
return (
<main className="min-h-screen bg-[#F8F9F7]">

  <Navbar />

  <Hero />

  <section id="properties">
    <PropertiesSection />
  </section>

  <section id="recent-bookings">
    <RecentBookings />
  </section>

  <WhyCoral />

  <Footer />

</main>

);
}
import { useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import DestinationSection from "../components/DestinationSection";
import RecommendedStays from "../components/RecommendedStays";
import FavouriteStays from "../components/FavouriteStays";
import TravelPromo from "../components/TravelPromo";
import Testimonials from "../components/Testimonials";
import WeekendDeals from "../components/WeekendDeals";
import WhyCoral from "../components/WhyCoral";
import Footer from "../components/Footer";
import ToursSection from "../components/ToursSection";
import VisaSection from "../components/VisaSection";
import PropertiesSection from "../components/PropertiesSection";
import About from "../components/About";



export default function Home() {
  const [searchData, setSearchData] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: 2,
    rooms: 1,
  });

  const handleSearch = (data) => {
    console.log("SEARCH DATA:", data);

    setSearchData(data);

    // Scroll to Recommended Stays
    setTimeout(() => {
      document.getElementById("recommended-stays")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  return (
    <main className="min-h-screen bg-[#F8F9F7]">
      <Navbar />

      <Hero onSearch={handleSearch} />

      <DestinationSection />
<ToursSection />
<VisaSection />
      <PropertiesSection />
      <RecommendedStays
        selectedDestination={searchData.destination}
      />

      <FavouriteStays />

      <TravelPromo />

      <Testimonials />

      <WeekendDeals />
<About />
      <WhyCoral />

      <Footer />
    </main>
  );
}
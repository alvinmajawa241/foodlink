import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedCategories from "@/components/FeaturedCategories";
import FeaturedRestaurants from "@/components/FeaturedRestaurants";
import HowItWorks from "@/components/HowItWorks";
import RoleSelector from "@/components/RoleSelector";
import BackendNotice from "@/components/BackendNotice";
import AppDownload from "@/components/AppDownload";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturedCategories />
        <FeaturedRestaurants />
        <HowItWorks />
        <RoleSelector />
        <BackendNotice />
        <AppDownload />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

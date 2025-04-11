
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Radar = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[70vh]">
        <h1 className="text-4xl font-bold mb-6 text-africa-blue text-center">Coming Soon</h1>
        <div className="w-20 h-1 bg-africa-gold mb-8"></div>
        <p className="text-xl text-gray-600 text-center max-w-xl">
          We're working on something exciting to help you connect with investors across Africa.
          Check back soon for updates!
        </p>
      </div>
      <Footer />
    </>
  );
};

export default Radar;

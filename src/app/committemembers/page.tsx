import Footer from "@/components/Footer";
import Members from "@/components/Members";
import Navbar from "@/components/Navbar";

const committemembers = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="min-h-screen">
        <Members value="full" />
        <Footer />
      </div>
    </div>
  );
};

export default committemembers;

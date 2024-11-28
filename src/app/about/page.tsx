import SectionHeading from "@/components/SectionHeading";
import Navbar from "../../components/Navbar";
import Members from "@/components/Members";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <SectionHeading title="About us" />
      <div className="container mx-auto rounded-lg bg-white px-4 py-12 shadow-lg max-w-5xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-blue-700 md:text-left">
          Who We Are
        </h1>
        <p className="mb-4 text-lg leading-relaxed text-gray-700">
          St. John`s School Marhauli. Do y’ll miss your school days? We are sure
          you do! You can now relive your good old school days with your
          batchmates on the school alumni portal. It’s time to get together to
          reminisce old times, walk down the memory lane and share success
          stories with your friends. Come, register on the link and stay
          connected with your school friends beyond time & distance.
        </p>
        <p className="mb-4 text-lg leading-relaxed text-gray-700">
          In 2024, as we celebrate over six decades of the schools legacy, the
          St Johns School Alumni Association stands as a testament to the strong
          bonds forged within its walls. Our members, spanning across multiple
          generations, contribute to a thriving network that supports not only
          each other but also the ongoing growth and success of the school.
          Through various initiatives, events, and mentorship programs, the
          association continues to play a vital role in nurturing the next
          generation of leaders, while also providing a platform for alumni to
          reconnect, share experiences, and give back to the institution that
          has played such a significant role in their lives.
        </p>
      </div>
      <SectionHeading title="Managing Committee" />
      <Members value="half" />
      <Footer />
    </div>
  );
};

export default About;

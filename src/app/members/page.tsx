import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Table } from "@/components/Table";


const members = () => {
  const users = [
    { name: "John Doe", batch: "2021", city: "New York", occupation: "Software Engineer" },
    { name: "Jane Smith", batch: "2020", city: "Los Angeles", occupation: "Data Scientist" },
    { name: "Samuel Lee", batch: "2019", city: "Chicago", occupation: "Product Manager" },
    { name: "Ava Johnson", batch: "2022", city: "Houston", occupation: "Marketing Specialist" },
    { name: "Michael Brown", batch: "2018", city: "Phoenix", occupation: "Financial Analyst" },
    { name: "Emily Davis", batch: "2023", city: "Philadelphia", occupation: "UX Designer" },
    { name: "Daniel Wilson", batch: "2020", city: "San Antonio", occupation: "Project Coordinator" },
    { name: "Olivia Taylor", batch: "2021", city: "San Diego", occupation: "Content Writer" },
    { name: "Lucas Martinez", batch: "2022", city: "Dallas", occupation: "Software Developer" },
    { name: "Mia Anderson", batch: "2019", city: "San Jose", occupation: "Accountant" },
    { name: "Ethan Hernandez", batch: "2021", city: "Austin", occupation: "Sales Manager" },
    { name: "Sophia King", batch: "2018", city: "Jacksonville", occupation: "Graphic Designer" },
    { name: "Alexander White", batch: "2022", city: "Fort Worth", occupation: "HR Specialist" },
    { name: "Amelia Walker", batch: "2019", city: "Columbus", occupation: "Digital Marketer" },
    { name: "James Hall", batch: "2020", city: "Charlotte", occupation: "Operations Manager" },
    { name: "Ella Robinson", batch: "2021", city: "Indianapolis", occupation: "Business Analyst" },
    { name: "Benjamin Young", batch: "2023", city: "San Francisco", occupation: "Data Analyst" },
    { name: "Charlotte Green", batch: "2018", city: "Seattle", occupation: "Research Scientist" },
    { name: "Henry Scott", batch: "2022", city: "Denver", occupation: "Mechanical Engineer" },
    { name: "Grace Lewis", batch: "2020", city: "Washington", occupation: "Teacher" },
    { name: "William Adams", batch: "2019", city: "Boston", occupation: "Software Tester" },
    { name: "Emma Lopez", batch: "2021", city: "Nashville", occupation: "Administrative Assistant" },
    { name: "Matthew Clark", batch: "2020", city: "Oklahoma City", occupation: "Cybersecurity Specialist" },
    { name: "Isabella Rodriguez", batch: "2023", city: "El Paso", occupation: "Pharmacist" },
    { name: "David Perez", batch: "2022", city: "Las Vegas", occupation: "Architect" },
    { name: "Aria Harris", batch: "2021", city: "Detroit", occupation: "Social Worker" },
    { name: "Noah Hill", batch: "2020", city: "Memphis", occupation: "Electrical Engineer" },
    { name: "Lily Campbell", batch: "2019", city: "Louisville", occupation: "Nurse" },
    { name: "Mason Mitchell", batch: "2023", city: "Baltimore", occupation: "Supply Chain Analyst" },
    { name: "Hannah Carter", batch: "2018", city: "Milwaukee", occupation: "Quality Assurance" },

  ];
  
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center m-auto max-w-6xl ">
        <Table data={users}/>
      </div>
      <Footer/>
    </div>
  );
};

export default members;

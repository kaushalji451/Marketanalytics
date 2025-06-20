import React, { use } from "react";
import { useState, useEffect,useContext } from "react";
import CampainTypeChart from "../components/CampainTypeChart";
import ReachImpChart from "../components/ReachImpChart";
import Rbchart from "../components/AreaChart";
import RevinueChart from "../components/RevinueChart";
import Fricc from "../components/Fricc";
import Navbar from "../components/Navbar";
import Cookie from "js-cookie";
import  {useNavigate} from "react-router-dom";
import Footer from "../components/Footer";
const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  const [followers, setFollowers] = useState(0);
  const [reached, setReached] = useState(0);
  const [impressions, setImpressions] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [conversions, setConversions] = useState(0);

  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    date: "",
    platform: "",
  });

  const fetchLatestData = async () => {
    let data = await fetch(`${import.meta.env.VITE_API_URL}/fetch-emails`);
    let result = await data.json();
    console.log("Fetched latest data:", result);

     if(result && result.length >0){
       const emails = result;
      console.log("Emails to process:", emails);
      let responce = await fetch(
        `${import.meta.env.VITE_API_URL}/fetch-emails/details`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ emails }),
        }
      );
      let finalResult = await responce.json();
      console.log("Latest data fetched successfully:", finalResult);
   
     }
  };

  useEffect(() => {
    const email = Cookie.get("email");
    if (email === import.meta.env.VITE_ADMIN_EMAIL) {
      fetchLatestData();
    } 
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/analytics`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setdata(result);
      setFilteredData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Aggregate data
  useEffect(() => {
    const nonCompetitorData = filteredData.filter(
      (d) => d.isCompetitor === false
    );
    const total = {
      reached: 0,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      followers: 0,
    };

    for (const entry of nonCompetitorData) {
      total.reached += Number(entry.reach || 0);
      total.impressions += Number(entry.impressions || 0);
      total.clicks += Number(entry.clicks || 0);
      total.conversions += Number(entry.conversions || 0);
      total.followers += Number(entry.followers || 0);
    }

    setReached(total.reached);
    setImpressions(total.impressions);
    setClicks(total.clicks);
    setConversions(total.conversions);
    setFollowers(total.followers);
  }, [filteredData]);

  const applyFilters = () => {
    let filtered = data;
    console.log("Applying filters:", filters);

    if (filters.date) {
      filtered = filtered.filter((item) => {
        const [day, month, year] = item.date?.split("-") || [];
        const formatted = `${year}-${month.padStart(2, "0")}-${day.padStart(
          2,
          "0"
        )}`;
        return formatted === filters.date;
      });
    }

    if (filters.platform) {
      filtered = filtered.filter(
        (item) => item.platform?.toLowerCase() === filters.platform
      );
    }

    setFilteredData(filtered);
  };

  const resetFilters = () => {
    setFilters({ date: "", platform: "" });
    setFilteredData(data);
  };

  return (
    <div className="h-fit">
      {/* navbar */}
      <Navbar />

       <div className="w-full min-h-screen">
    {/* Filter Section */}
    <div className="border-b border-slate-400 py-1 flex flex-col gap-4 md:flex-row md:items-center md:justify-between px-5">
      {/* <h1 className="text-sm md:text-base">Date - 01.07.2024 to 13.06.2025</h1> */}

      <div className="flex flex-wrap gap-3 items-center p-3 rounded-md">
        <input
          type="date"
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          className="border border-slate-300 rounded-md px-3 py-1 text-sm"
          placeholder="Applied On"
        />

        <select
          className="border rounded-sm p-1 border-slate-400 text-sm"
          value={filters.platform}
          onChange={(e) =>
            setFilters({ ...filters, platform: e.target.value })
          }
        >
          <option value="">Platform</option>
          <option value="facebook">Facebook</option>
          <option value="instagram">Instagram</option>
          <option value="linkedin">Linkedin</option>
        </select>

        <button
          disabled={loading}
          onClick={applyFilters}
          className="border px-3 py-1 rounded-md text-sm bg-blue-50"
        >
          {!loading ? "Apply Filters" : "Filtering..."}
        </button>

        <button
          onClick={resetFilters}
          className="border px-3 py-1 rounded-md text-sm bg-red-100 text-red-700"
        >
          Reset
        </button>
      </div>
    </div>

          <Fricc
            followers={followers}
            reached={reached}
            impressions={impressions}
            clicks={clicks}
            conversions={conversions}
          />

          {/* First chart row */}
    <div className="flex flex-col lg:flex-row gap-5 m-5">
      <div className="bg-blue-200 w-full lg:w-1/2 p-5  rounded-md">
        {(filteredData.length > 0 ? filteredData : data).length > 0 && (
          <ReachImpChart
            data={filteredData.length > 0 ? filteredData : data}
          />
        )}
      </div>
      <div className="bg-blue-200 w-full lg:w-1/2 p-5 rounded-md">
        <div className="bg-white rounded-lg h-full">
          {(filteredData.length > 0 ? filteredData : data).length > 0 && (
            <CampainTypeChart
              data={filteredData.length > 0 ? filteredData : data}
            />
          )}
        </div>
      </div>
    </div>

    {/* Second chart row */}
    <div className="flex flex-col lg:flex-row gap-5 m-5">
      <div className="bg-blue-200 w-full lg:w-1/2 p-5 rounded-md">
        {(filteredData.length > 0 ? filteredData : data).length > 0 && (
          <RevinueChart
            data={filteredData.length > 0 ? filteredData : data}
          />
        )}
      </div>
      <div className="bg-blue-200 w-full lg:w-1/2 p-5 rounded-md">
        <div className="bg-white pb-10 px-2 rounded-lg h-full">
          {(filteredData.length > 0 ? filteredData : data).length > 0 && (
            <Rbchart
              data={filteredData.length > 0 ? filteredData : data}
            />
          )}
        </div>
      </div>
    </div>

    {/* Footer */}
    <Footer />
  </div>
</div>
  );
};

export default Dashboard;

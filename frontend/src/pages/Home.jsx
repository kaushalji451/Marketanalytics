import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import Footer from "../components/Footer";
const metricsData = [
  {
    id: "roi",
    label: "ROI",
    icon: "trending_up",
    value: "14.3%",
    colorClass: "text-emerald-500",
  },
  {
    id: "reach",
    label: "Reach",
    icon: "group",
    value: "1,478,902",
    colorClass: "text-blue-500",
  },
  {
    id: "impressions",
    label: "Impressions",
    icon: "visibility",
    value: "9,304,123",
    colorClass: "text-amber-500",
  },
  {
    id: "clicks",
    label: "Clicks",
    icon: "mouse",
    value: "456,789",
    colorClass: "text-red-500",
  },
  {
    id: "conversions",
    label: "Conversions",
    icon: "emoji_events",
    value: "68,432",
    colorClass: "text-violet-500",
  },
];

const Home = () => {
  const [mounted, setMounted] = useState(false);

  const [loginRedirect, setloginRedirect] = useState("/login");

  useEffect(() => {
    let cookie = Cookies.get("email");
    if(cookie) {
      setloginRedirect("/dashboard");
    }
  }, [loginRedirect])
  

  useEffect(() => {
    // Trigger animation by setting mounted true after component mounts
    setMounted(true);
  }, []);
  return (
    <div className="min-h-screen ">
      <Navbar />
      <main className="min-h-[83vh] bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <header className="max-w-3xl text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
            Market Analytics
          </h1>
          <p className="text-gray-600 text-lg sm:text-xl">
            Visualize your marketing performance with real-time analytics of
            ROI, Reach, Impressions, Clicks, and Conversions.
          </p>
        </header>

        <div className="pb-10">
          <Link to={loginRedirect} className="px-8 py-3 bg-indigo-600 text-white rounded-full text-lg font-medium hover:bg-indigo-700 transition shadow-lg">
            Get Started
          </Link>
        </div>

        <section className="grid gap-8 w-full max-w-7xl grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {metricsData.map(({ id, label, icon, value, colorClass }, i) => (
            <article
              key={id}
              tabIndex={0}
              aria-label={label}
              className={
                `bg-white rounded-xl shadow-lg p-6 flex flex-col ` +
                `opacity-0 scale-95 transform transition-all duration-500 ease-out ` +
                (mounted ? `opacity-100 scale-100 delay-${i * 150}` : "")
              }
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <span
                className={`material-icons text-4xl mb-5 select-none ${colorClass}`}
                aria-hidden="true"
              >
                {icon}
              </span>
              <h2 className="text-gray-700 text-lg font-semibold mb-1">
                {label}
              </h2>
              <p className="text-gray-900 text-3xl font-extrabold leading-tight">
                {value}
              </p>
            </article>
          ))}
        </section>
      </main>
      {/* Footer */}
     <Footer/>
    </div>
  );
};

export default Home;

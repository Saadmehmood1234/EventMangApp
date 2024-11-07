
// import { auth } from "@/auth";
// import React from "react";
// import Footer from "@/components/Footer";
// import { getEvents } from "@/actions/data";
// import EventsSearchClient from "@/components/EventsSearchClient";
// import { redirect } from "next/navigation";
// import ImageSlider from "@/components/ImageSlider";
// import { FaLongArrowAltRight } from "react-icons/fa";
// import Link from "next/link";

// const Home = async () => {
//   const session = await auth();
//   if (!session) {
//     redirect("/signin");
//     return null;
//   }
//   const events = await getEvents();

//   return (
//     <div className="w-full bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center text-gray-100 min-h-screen">
//       <main className="flex-grow flex flex-col w-full items-center text-center mt-12 px-4">
//         <div>
//           <section className="max-w-5xl mb-12 flex justify-center items-center">
//             <ImageSlider />
//           </section>
//         </div>
//         <div className="w-full mb-10">
//           <EventsSearchClient events={events} />
//         </div>
//         <section className="w-full flex justify-center items-center flex-col mb-10">
//           <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-indigo-400">
//             Why Participate in Events?
//           </h2>
//           <p className="text-lg md:text-xl max-w-3xl mb-6 leading-relaxed text-gray-300">
//             Participating in events is a fantastic way to expand your horizons,
//             meet new people, and enhance your skills. Whether you're looking to
//             network, learn something new, or simply have fun, there's an event
//             for everyone! Join us to create unforgettable memories and make
//             lasting connections.
//           </p>
//         </section>
//         <div className="flex justify-around max-lg:flex-col items-center w-full max-w-4xl mt-12 gap-4">
//           {[
//             { text: "Event History", href: "/user/history" },
//             { text: "Your Participants", href: "/user/your-participants" },
//             { text: "Your Events", href: "/user/events" },
//           ].map(({ text, href }, idx) => (
//             <div
//               key={idx}
//               className="flex justify-center items-center bg-gray-700 rounded-lg shadow-lg w-80 h-48 p-4"
//             >
//               <Link href={href}>
//                 <button className="relative py-3 px-6 hover:scale-[1.05] rounded-md text-white bg-indigo-500 hover:bg-indigo-600 transition-all duration-500 ease-in-out group flex items-center justify-center">
//                   {text}
//                   <FaLongArrowAltRight className="ml-2 text-2xl" />
//                 </button>
//               </Link>
//             </div>
//           ))}
//         </div>
//         <div className="w-full max-w-4xl h-0.5 bg-indigo-500 shadow-md mt-12"></div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default Home;
import { auth } from "@/auth";
import React from "react";
import Footer from "@/components/Footer";
import { getEvents } from "@/actions/data";
import EventsSearchClient from "@/components/EventsSearchClient";
import { redirect } from "next/navigation";
import ImageSlider from "@/components/ImageSlider";
import { FaLongArrowAltRight } from "react-icons/fa";
import Link from "next/link";

const Home = async () => {
  const session = await auth();
  if (!session) {
    redirect("/signin");
    return null;
  }
  const events = await getEvents();

  return (
    <div className="w-full  flex flex-col dark:bg-gradient-to-r from-gray-900 to-gray-800 bg-gray-200 dark:bg items-center dark:text-gray-100 min-h-screen">
      <main className="flex-grow flex flex-col w-full items-center text-center mt-12 px-4">
        <div className="flex justify-center items-center w-full">
          <section className="max-w-5xl mb-12  flex justify-center items-center">
            <ImageSlider />
          </section>
        </div>
        <div className="w-full mb-10">
          <EventsSearchClient events={events} />
        </div>
        <section className="w-full flex justify-center items-center flex-col mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-indigo-400">
            Why Participate in Events?
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mb-6 leading-relaxed dark:text-gray-300">
            Participating in events is a fantastic way to expand your horizons,
            meet new people, and enhance your skills. Whether you're looking to
            network, learn something new, or simply have fun, there's an event
            for everyone! Join us to create unforgettable memories and make
            lasting connections.
          </p>
        </section>
        <div className="flex justify-around max-lg:flex-col items-center w-full max-w-4xl mt-12 gap-4">
          {[
            { text: "Event History", href: "/user/history" },
            { text: "Your Participants", href: "/user/your-participants" },
            { text: "Your Events", href: "/user/events" },
          ].map(({ text, href }, idx) => (
            <div
              key={idx}
              className="flex justify-center items-center bg-white dark:bg-gray-700 rounded-lg shadow-lg w-80 h-48 p-4"
            >
              <Link href={href}>
                <button className="relative py-3 px-6 hover:scale-[1.05] rounded-md text-white bg-indigo-500 hover:bg-indigo-600 transition-all duration-500 ease-in-out group flex items-center justify-center">
                  {text}
                  <FaLongArrowAltRight className="ml-2 text-2xl" />
                </button>
              </Link>
            </div>
          ))}
        </div>
        <div className="w-full max-w-4xl h-0.5 bg-indigo-500 shadow-md mt-12"></div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;

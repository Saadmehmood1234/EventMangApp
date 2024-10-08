"use client";
import { Button, Modal } from "flowbite-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { FaCalendarPlus } from "react-icons/fa6";
import { MdEvent } from "react-icons/md";
import { handleSignOut } from "@/actions/authActions";
import {
  HiChartPie,
  HiUser,
  HiBookOpen,
  HiCreditCard,
  HiOutlineClipboardCheck,
  HiOutlineDocumentText,
  HiOutlineUserGroup,
  HiViewBoards,
  HiClipboardList,
  HiUserGroup,
} from "react-icons/hi";
import { RiMenu4Fill } from "react-icons/ri";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [showSidebar, setShowSidebar] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div onClick={() => setShowSidebar(!showSidebar)}>
        {!showSidebar && (
          <RiMenu4Fill className="text-3xl text-gray-300 cursor-pointer md:hidden absolute top-6  z-[100]" />
        )}
      </div>

      {showSidebar && (
        <div
          className="w-full h-full bg-black/20 cursor-pointer md:hidden"
          onClick={() => setShowSidebar(!showSidebar)}
        ></div>
      )}
      {showSidebar && (
        <div
          className={`bg-gray-950 max-md:${
            showSidebar ? "block absolute z-[999]" : "hidden"
          } flex flex-col md:relative`}
          style={{ width: "300px", height: "100vh" }}
        >
          <div className="flex gap-5 items-center  justify-center mb-7 relative">
            <div className="flex gap-5 items-center justify-center  mt-7">
              <img
                src={"https://i.pravatar.cc/150?img=12"}
                alt="df"
                className="h-[80px] w-[80px] border-white border-2 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <h1 className="text-xl text-gray-400 font-semibold">
                  Saad Mehmood
                </h1>
                <p className="text-gray-300">frontend developer</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col  gap-2 flex-[3]">
            <Link href={"/admin"}>
              <div
                className={`flex gap-3 h-[50px] rounded-md items-center cursor-pointer hover:bg-blue-500 hover:text-white pl-4 text-[20px] text-gray-200/80 ${
                  pathname === "/admin" ? "bg-blue-400 " : ""
                }`}
              >
                <HiChartPie />
                <p className="">Dashboard</p>
              </div>
            </Link>

            <Link href={"/admin/users"}>
              <div
                className={`flex gap-3 h-[50px] rounded-md items-center cursor-pointer hover:bg-blue-500 hover:text-white pl-4 text-[20px] text-gray-200/80 ${
                  pathname === "/admin/users" ? "bg-blue-400" : ""
                }`}
              >
                <HiUser />
                <p className="text">Users</p>
              </div>
            </Link>

            <Link href={"/admin/participants"}>
              <div
                className={`flex gap-3 h-[50px] rounded-md items-center cursor-pointer hover:bg-blue-500 hover:text-white pl-4 text-[20px] text-gray-200/80 ${
                  pathname === "/admin/participants" ? "bg-blue-400" : ""
                }`}
              >
                <HiUserGroup />
                <p className="text">Participants</p>
              </div>
            </Link>

            <Link href={"/admin/allevents"}>
              <div
                className={`flex gap-3 h-[50px] rounded-md items-center cursor-pointer hover:bg-blue-500 hover:text-white pl-4 text-[20px] text-gray-200/80 ${
                  pathname === "/admin/allevents" ? "bg-blue-400" : ""
                }`}
              >
                <MdEvent />
                <p className="text">Events</p>
              </div>
            </Link>
            <Link href={"/admin/history"}>
              <div
                className={`flex gap-3 h-[50px] rounded-md items-center cursor-pointer hover:bg-blue-500 hover:text-white pl-4 text-[20px] text-gray-200/80 ${
                  pathname === "/admin/history" ? "bg-blue-400" : ""
                }`}
              >
                <RiCalendarScheduleFill />
                <p className="text">Event History</p>
              </div>
            </Link>

            <Link href={"/admin/createEvents"}>
              <div
                className={`flex gap-3 h-[50px] rounded-md items-center cursor-pointer hover:bg-blue-500 hover:text-white pl-4 text-[20px] text-gray-200/80 ${
                  pathname === "/admin/createEvents" ? "bg-blue-400" : ""
                }`}
              >
                <FaCalendarPlus />
                <p className="text">Create Event</p>
              </div>
            </Link>
          </div>
          <div className="flex items-center w-full justify-center flex-auto">
            <button
              onClick={() => setOpenModal(true)}
              className="w-[270px] items-center bg-blue-500 h-[40px] rounded-md text-white"
            >
              Logout
            </button>
            <Modal
              show={openModal}
              size="md"
              onClose={() => setOpenModal(false)}
              popup
            >
              <Modal.Header />
              <Modal.Body>
                <div className="text-center">
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to Logout?
                  </h3>
                  <div className="flex justify-center gap-4">
                    <Button
                      color="blue"
                      className="text-white bg-blue-500"
                      onClick={async () => {
                        await handleSignOut();
                        setOpenModal(false); // Close modal after signing out
                      }}
                    >
                      Yes, I'm sure
                    </Button>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                      No, cancel
                    </Button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      )}
    </>
  );
}

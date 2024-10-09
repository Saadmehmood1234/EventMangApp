import Spline from "@splinetool/react-spline/next";
import Link from "next/link";
export default function Home() {
  return (
    <div className="h-[100vh] flex flex-col w-full ">
      <header className="bg-black flex justify-between p-4 border-b-2 border-white">
        <div className="text-white text-center ml-12 mt-4 text-3xl">
          Welcome To Eventify
        </div>
        <div className="flex justify-center items-center">
          <Link href="/user">
            <button className="py-2  w-20 hover:bg-gray-200 font-bold rounded-md bg-white text-black">
              Visit
            </button>
          </Link>
        </div>
      </header>
      <main className="w-full h-[90vh]">
        <Spline scene="https://prod.spline.design/8k1242W0nu-JFfWL/scene.splinecode" />
      </main>
    </div>
  );
}

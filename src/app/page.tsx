import Footer from "@/components/Footer";
import Main from "@/components/Main";
import NavBar from "@/components/NavBar";

export default async function Home() {
  return (
    <main className="static flex min-h-screen flex-col">
      <NavBar />
      <div className="static flex mt-14">
      </div>
      <Main />
      <div className="static mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left"></div>
      <Footer />
    </main>
  );
}

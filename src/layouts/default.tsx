import { Link } from "@nextui-org/link";
import { Navbar } from "@/components/navbar";
import SideBar from '../components/SideBar'

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <div id="container" className="flex  flex-grow ">
        <SideBar/> 
        <main id="MainContainer" className=" bg-white container  h-fit pb-10 border shadow-lg rounded-xl mx-auto max-w-8xl px-6 flex-grow  ">
          {children}
        </main>
      </div>
      <footer id="Footer" className="w-full flex items-center justify-center py-3">
        <Link
          
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://nextui-docs-v2.vercel.app?utm_source=next-pages-template"
          title="nextui.org homepage"
        >
          <span className="text-default-600">My Inventory &#169; 2024</span>
          <p className="text-primary">NextUI</p>
        </Link>
      </footer>
    </div>
  );
}


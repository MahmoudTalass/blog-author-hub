import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function PageLayout() {
   return (
      <>
         <Header />
         <main className="flex-auto mb-8">
            <Outlet />
         </main>
         <Footer />
      </>
   );
}

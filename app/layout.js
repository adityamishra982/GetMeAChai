import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"
import SessionWrapper from "@/components/SessionWrapper";
import ClientLayout from "@/components/ClientLayout";

export const metadata = {
  title: "GetMeAChai!- Fund your projects with Chai.",
  description: "GetMeAChai! is a crowdfunding platform for creators.",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>
          <div className="h- z-[-2] w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
          <Navbar />
          <main>
            <ClientLayout>
            {children}
            </ClientLayout>
          </main>
          <Footer />
          </div>
        </SessionWrapper>
      </body>
    </html>
  );
}

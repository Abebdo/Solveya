import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Outlet, ScrollRestoration } from 'react-router-dom';

export const Layout = () => {
  return (
    <div className="min-h-screen bg-brand-dark flex flex-col font-sans text-slate-200 selection:bg-brand-cyan/30 selection:text-brand-cyan">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-cyan/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-brand-red/5 blur-[120px]" />
        <div className="absolute top-[40%] left-[50%] transform -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-brand-navy/50 blur-[100px]" />
      </div>

      <Navbar />
      
      <main className="flex-grow pt-20 z-10 relative">
        <Outlet />
      </main>
      
      <Footer />
      <ScrollRestoration />
    </div>
  );
};

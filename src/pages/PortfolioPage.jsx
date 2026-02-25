import Navbar from '../Layouts/Navbar';
import Home from '../Layouts/Home/Home';
import Skills from '../Layouts/Home/Skills';
import About from '../Layouts/Home/About';
import Projects from '../Layouts/Home/Projects';
import Contact from '../Layouts/Home/Contact';
import Footer from '../Layouts/Home/Footer';

const PortfolioPage = ({ data, isLoading, loadError }) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0f172a]">
      <div className="relative z-10">
        <Navbar navLinks={data.navLinks} />
        {isLoading ? (
          <p className="mx-auto mt-4 w-[80%] rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-100">
            Loading portfolio data from database...
          </p>
        ) : null}
        {loadError ? (
          <p className="mx-auto mt-4 w-[80%] rounded-xl border border-rose-500/60 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            Failed to load portfolio data: {loadError}
          </p>
        ) : null}
        <Home data={data} />
        <About data={data} />
        <Skills skillImages={data.skillImages} />
        <Projects projects={data.projects} />
        <Contact data={data} />
        <Footer name={data.name} socials={data.socials} />
      </div>
    </div>
  );
};

export default PortfolioPage;

import React from 'react';
import Button from '../../components/Button';
import AnimationHero from '../../components/AnimationHero';

const Home = ({ data }) => {
  const name = data?.name || '';
  const title = data?.title || '';
  const intro = data?.intro || '';

  return (
    <div>
      <div
        id="home"
        className="mx-auto flex flex-row items-center gap-10 w-[80%] mt-20 text-left py-10"
      >
        <div className="flex-1">
          <h1
            id="home-heading"
            className="text-4xl font-bold text-slate-900 sm:text-5xl lg:text-6xl dark:text-slate-100"
          >
            <AnimationHero
              sequences={[
                { text: `Hi, I'm ${name}.` },
                { text: 'I love coding.' },
                { text: 'I build interactive websites.' },
              ]}
            />
          </h1>
          <p className="mt-4 text-xl font-semibold text-cyan-700 dark:text-cyan-400">
            {title}
          </p>
          <p className="font-normal mt-6 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
            {intro}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              href="#projects"
              variant="primary"
              ariaLabel="View projects section"
            >
              View Projects
            </Button>
            <Button
              href="#contact"
              variant="secondary"
              ariaLabel="Go to contact section"
            >
              Contact Me
            </Button>
          </div>
        </div>
        <div className="mx-auto w-full max-w-sm">
          <div className="card-surface relative aspect-square overflow-hidden rounded-full p-3">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-sky-600 text-4xl font-bold text-white shadow-soft">
              CK
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

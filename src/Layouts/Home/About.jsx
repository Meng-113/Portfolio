import SectionTitle from '../../components/SectionTitle';

const About = ({ data }) => {
  const quickInfo = Array.isArray(data?.quickInfo) ? data.quickInfo : [];

  return (
    <div data-aos="fade-up" data-aos-anchor-placement="top-center">
      <div id="about" className="w-[80%] mx-auto mt-20 text-left">
        <SectionTitle
          id="about-heading"
          eyebrow="About"
          title="Who I Am"
          description="A short introduction about my background and current focus."
        />
        <div className="grid gap-6 md:grid-cols-2">
          <article className="card-surface sm:py-8">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              {data?.aboutTitle}
            </h3>
            <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
              {data?.about}
            </p>
          </article>

          <aside
            className="card-surface p-6 sm:p-8"
            aria-label="Quick information"
          >
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              Quick Info
            </h3>
            <dl className="mt-5 space-y-4">
              {quickInfo.map((item) => (
                <div
                  key={`${item.label}-${item.value}`}
                  className="flex items-start justify-between gap-4 border-b border-slate-200/70 pb-3 last:border-b-0 last:pb-0 dark:border-slate-700/70"
                >
                  <dt className="font-medium text-slate-500 dark:text-slate-400">
                    {item.label}
                  </dt>
                  <dd className="text-right font-semibold text-slate-800 dark:text-slate-200">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default About;

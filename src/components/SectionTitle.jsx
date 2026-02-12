const SectionTitle = ({ id, eyebrow, title, description }) => {
  return (
    <div className="mb-10 w-full flex flex-row items-start justify-between gap-6">
      <div>
        {' '}
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-400">
          {eyebrow}
        </p>
        <h2
          id={id}
          className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100"
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default SectionTitle;

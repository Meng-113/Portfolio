const SectionCard = ({ title, action, children }) => {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
      {title ? (
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold">{title}</h2>
          {action}
        </div>
      ) : null}
      {children}
    </section>
  );
};

export default SectionCard;

import SectionTitle from '../../components/SectionTitle';
import Button from '../../components/Button';

const Projects = ({ projects }) => {
  const items = Array.isArray(projects) ? projects : [];

  return (
    <section id="projects" className="w-[80%] mx-auto mt-24 text-left">
      <SectionTitle
        id="projects-heading"
        eyebrow="Projects"
        title="Things I Have Built"
        description="A selection of projects, technical stacks, and links."
      />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map((project, index) => (
          <article
            key={`${project.id}-${index}`}
            className="rounded-2xl border border-slate-700/70 bg-slate-800/70 p-6"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan-300">
              {project.category}
            </p>
            <h3 className="mt-3 text-xl font-semibold text-slate-100">
              {project.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              {project.description}
            </p>
            <p className="mt-4 text-xs font-medium uppercase tracking-[0.13em] text-slate-400">
              {(project.techStack || []).join(' | ')}
            </p>
            <div className="mt-6 flex gap-3">
              <Button
                href={project.githubUrl || '#'}
                variant="secondary"
                size="sm"
                ariaLabel={`View ${project.title} source code`}
              >
                Source
              </Button>
              <Button
                href={project.liveUrl || '#'}
                variant="primary"
                size="sm"
                ariaLabel={`View ${project.title} live demo`}
              >
                Live
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;

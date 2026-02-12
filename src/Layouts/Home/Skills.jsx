import SectionTitle from '../../components/SectionTitle';
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from '../../components/ui/scroll-based-velocity';

const Skills = ({ skillImages = [] }) => {
  const images = Array.isArray(skillImages) ? skillImages.filter(Boolean) : [];

  if (images.length === 0) {
    return (
      <div className="w-full">
        <div id="skills" className="w-[80%] mx-auto mt-24 text-left">
          <SectionTitle
            id="skills-heading"
            eyebrow="Skills"
            title="What I Work With"
            description="No skill images available yet."
          />
        </div>
      </div>
    );
  }

  const MIN_ITEMS = 24;
  const allImages =
    images.length >= MIN_ITEMS
      ? images
      : Array.from(
          { length: Math.ceil(MIN_ITEMS / images.length) },
          () => images,
        ).flat();

  const half = Math.ceil(allImages.length / 2);
  const firstRow = allImages.slice(0, half);
  const secondRow = allImages.slice(half);

  return (
    <div className="w-full">
      <div id="skills" className="w-[80%] mx-auto mt-24 text-left">
        <SectionTitle
          id="skills-heading"
          eyebrow="Skills"
          title="What I Work With"
          description="Tools and technologies I use."
        />
      </div>

      <div className="w-full">
        <div className="relative flex flex-col items-center justify-center overflow-hidden py-8 inset-x-shadow-black-600 mb-10">
          <ScrollVelocityContainer className="w-full">
            <ScrollVelocityRow baseVelocity={6} direction={1} className="py-4">
              {firstRow.map((src, idx) => (
                <img
                  key={`rowA-${idx}-${src}`}
                  src={src}
                  alt="Skill logo"
                  width={240}
                  height={160}
                  loading="lazy"
                  decoding="async"
                  className="mx-4 inline-block h-20 w-30 filter brightness-0 invert"
                />
              ))}
            </ScrollVelocityRow>

            <ScrollVelocityRow baseVelocity={6} direction={-1} className="py-4">
              {secondRow.map((src, idx) => (
                <img
                  key={`rowB-${idx}-${src}`}
                  src={src}
                  alt="Skill logo"
                  width={240}
                  height={160}
                  loading="lazy"
                  decoding="async"
                  className="mx-4 inline-block h-20 w-30 filter brightness-0 invert"
                />
              ))}
            </ScrollVelocityRow>

            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1/4 bg-gradient-to-r from-[#0f172a] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-1/4 bg-gradient-to-l from-[#0f172a] to-transparent" />
          </ScrollVelocityContainer>
        </div>
      </div>
    </div>
  );
};

export default Skills;

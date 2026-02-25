import Button from '../components/Button';
import github from '../assets/github.svg';
import linkedin from '../assets/linkedin.svg';
import facebook from '../assets/facebook.svg';

const iconByName = {
  github,
  linkedin,
  facebook,
};

const Social = ({ socials }) => {
  const items = Array.isArray(socials) ? socials.filter(Boolean) : [];

  return (
    <div className="flex flex-row mt-4 gap-4">
      {items.map((item, index) => {
        const key = `${item.name}-${item.url}-${index}`;
        const iconFromName = iconByName[String(item.name || '').toLowerCase()];
        const iconSrc = item.urlImage || iconFromName;
        return (
          <Button
            key={key}
            href={item.url}
            variant="secondary"
            size="logo"
            ariaLabel={`View ${item.name} profile`}
          >
            <img
              src={iconSrc}
              alt={item.name}
              className="inline-block h-6 w-6 filter brightness-0 invert rounded-sm"
            />
          </Button>
        );
      })}
    </div>
  );
};

export default Social;

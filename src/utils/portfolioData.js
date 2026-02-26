const FIXED_NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const clone = (value) => JSON.parse(JSON.stringify(value));

const toArray = (value) => (Array.isArray(value) ? value : []);

const toStringValue = (value) => (typeof value === 'string' ? value : '');

const toNumberOrNull = (value) => (Number.isFinite(value) ? value : null);

export const normalizePortfolioData = (input) => {
  const source = input && typeof input === 'object' ? input : {};

  return {
    id: toNumberOrNull(source.id),
    slug: toStringValue(source.slug),
    name: toStringValue(source.name),
    title: toStringValue(source.title),
    location: toStringValue(source.location),
    profileImage: toStringValue(source.profileImage),
    intro: toStringValue(source.intro),
    aboutTitle: toStringValue(source.aboutTitle),
    about: toStringValue(source.about),
    navLinks:
      toArray(source.navLinks).length > 0
        ? toArray(source.navLinks)
        : clone(FIXED_NAV_LINKS),
    quickInfo: toArray(source.quickInfo),
    skills: toArray(source.skills),
    skillImages: toArray(source.skillImages),
    projects: toArray(source.projects),
    contactDetail: toStringValue(source.contactDetail),
    contactEmail: toStringValue(source.contactEmail),
    socials: toArray(source.socials),
  };
};

export const clonePortfolioData = (value) =>
  clone(value && typeof value === 'object' ? value : {});

export const createEmptyPortfolioData = () => normalizePortfolioData({});

export const buildPortfolioUpdatePayload = (input) => {
  const data = normalizePortfolioData(input);

  return {
    name: data.name,
    title: data.title,
    location: data.location,
    profileImage: data.profileImage,
    intro: data.intro,
    aboutTitle: data.aboutTitle,
    about: data.about,
    quickInfo: data.quickInfo,
    skills: data.skills,
    skillImages: data.skillImages,
    projects: data.projects,
    contactDetail: data.contactDetail,
    contactEmail: data.contactEmail,
    socials: data.socials,
  };
};

export const fixedNavLinks = clone(FIXED_NAV_LINKS);

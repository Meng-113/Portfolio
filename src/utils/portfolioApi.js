import { normalizePortfolioData } from './portfolioData';

const API_BASE_URL = 'http://localhost:3000/api';
const PROFILE_ID = 1;

// --- Helpers ---

const request = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  const config = { ...options, headers };

  const response = await fetch(url, config);
  if (!response.ok) {
    throw new Error(
      `Request failed: ${response.status} ${response.statusText}`,
    );
  }
  if (response.status === 204) return null;
  const json = await response.json();
  return json.data;
};

const mapProfileFromBackend = (data) => {
  if (!data) return {};
  return {
    id: data.id,
    name: data.name,
    title: data.title,
    location: data.location,
    aboutTitle: data.about_title,
    intro: data.intro,
    about: data.about,
    contactDetail: data.contact_detail,
    contactEmail: data.contact_email,
  };
};

const mapProfileToBackend = (data) => ({
  name: data.name,
  title: data.title,
  location: data.location,
  about_title: data.aboutTitle,
  intro: data.intro,
  about: data.about,
  contact_detail: data.contactDetail,
  contact_email: data.contactEmail,
});

const mapProjectFromBackend = (p) => ({
  id: p.id,
  category: p.category,
  title: p.title,
  description: p.description,
  techStack: p.tech_stack || [],
  githubUrl: p.github_url,
  liveUrl: p.live_url,
});

const mapProjectToBackend = (p) => ({
  profile_id: PROFILE_ID,
  category: p.category,
  title: p.title,
  description: p.description,
  tech_stack: p.techStack || [],
  github_url: p.githubUrl,
  live_url: p.liveUrl,
});

// --- API Functions ---

export const getPortfolioSlug = () => 'chea-kimeng';

export const getPortfolio = async () => {
  try {
    const [profile, quickInfo, skillImages, projects, socials] =
      await Promise.all([
        request(`/profile/${PROFILE_ID}`).catch(() => null),
        request(`/quickinfo?profile_id=${PROFILE_ID}`).catch(() => []),
        request(`/skill-image?profile_id=${PROFILE_ID}`).catch(() => []),
        request(`/project?profile_id=${PROFILE_ID}`).catch(() => []),
        request(`/social?profile_id=${PROFILE_ID}`).catch(() => []),
      ]);

    const profileData = mapProfileFromBackend(profile);

    return normalizePortfolioData({
      ...profileData,
      quickInfo: (quickInfo || []).map((q) => ({
        id: q.id,
        label: q.label,
        value: q.value,
      })),
      skills: [],
      skillImages: (skillImages || []).map((img) => img.image_url),
      projects: (projects || []).map(mapProjectFromBackend),
      socials: (socials || []).map((s) => ({
        id: s.id,
        name: s.name,
        url: s.url,
        urlImage: s.url_image,
      })),
    });
  } catch (err) {
    console.error('Error fetching portfolio:', err);
    throw new Error('Failed to load portfolio data');
  }
};

// --- Sync Functions ---

export const updateProfileSection = async (data) => {
  const payload = mapProfileToBackend(data);
  const id = data.id || PROFILE_ID;

  let currentData = {};
  try {
    currentData = await request(`/profile/${PROFILE_ID}`);
  } catch (e) {
    /* ignore */
  }

  const merged = { ...currentData, ...payload };

  const responseData = await request(`/profile/${id}`, {
    method: 'PUT',
    body: JSON.stringify(merged),
  });

  return mapProfileFromBackend(responseData);
};

export const updateQuickInfoSection = async (items) => {
  const promises = items.map(async (item) => {
    if (item.id) {
      await request(`/quickinfo/${item.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          profile_id: PROFILE_ID,
          label: item.label,
          value: item.value,
        }),
      });
    }
  });
  await Promise.all(promises);
};

export const updateSkillImagesSection = async (imageUrls) => {
  const existing = await request(`/skill-image?profile_id=${PROFILE_ID}`).catch(
    () => [],
  );
  const currentUrls = (existing || []).map((e) => e.image_url);

  const toDelete = existing.filter((e) => !imageUrls.includes(e.image_url));
  const toAdd = imageUrls.filter((u) => !currentUrls.includes(u));

  await Promise.all(
    toDelete.map((e) =>
      request(`/skill-image/${e.id}`, {
        method: 'DELETE',
        body: JSON.stringify({ profile_id: PROFILE_ID }),
      }),
    ),
  );
  await Promise.all(
    toAdd.map((u) =>
      request(`/skill-image`, {
        method: 'POST',
        body: JSON.stringify({ profile_id: PROFILE_ID, image_url: u }),
      }),
    ),
  );
};

export const updateProjectsSection = async (projects) => {
  const existing = await request(`/project?profile_id=${PROFILE_ID}`).catch(
    () => [],
  );
  const existingIds = (existing || []).map((e) => e.id);

  const incomingRealIds = projects
    .filter((p) => existingIds.includes(p.id))
    .map((p) => p.id);
  const toDelete = existingIds.filter((id) => !incomingRealIds.includes(id));

  await Promise.all(
    toDelete.map((id) =>
      request(`/project/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({ profile_id: PROFILE_ID }),
      }),
    ),
  );

  await Promise.all(
    projects.map((p) => {
      const payload = mapProjectToBackend(p);
      if (p.id && existingIds.includes(p.id)) {
        return request(`/project/${p.id}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
      } else {
        return request(`/project`, {
          method: 'POST',
          body: JSON.stringify(payload),
        });
      }
    }),
  );
};

export const updateSocialsSection = async (socials) => {
  const existing = await request(`/social?profile_id=${PROFILE_ID}`).catch(
    () => [],
  );
  const existingIds = (existing || []).map((e) => e.id);
  const incomingRealIds = socials
    .filter((s) => existingIds.includes(s.id))
    .map((s) => s.id);

  const toDelete = existingIds.filter((id) => !incomingRealIds.includes(id));
  await Promise.all(
    toDelete.map((id) =>
      request(`/social/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({ profile_id: PROFILE_ID }),
      }),
    ),
  );

  await Promise.all(
    socials.map((s) => {
      if (s.id && existingIds.includes(s.id)) {
        return request(`/social/${s.id}`, {
          method: 'PUT',
          body: JSON.stringify({
            profile_id: PROFILE_ID,
            name: s.name,
            url: s.url,
            url_image: s.urlImage,
          }),
        });
      } else {
        return request(`/social`, {
          method: 'POST',
          body: JSON.stringify({
            profile_id: PROFILE_ID,
            name: s.name,
            url: s.url,
            url_image: s.urlImage,
          }),
        });
      }
    }),
  );
};

const updatePortfolioSection = async (data, section) => {
  if (section === 'basic' || section === 'contact') {
    await updateProfileSection(data);
    return;
  }

  if (section === 'quickInfo') {
    await updateQuickInfoSection(data.quickInfo || []);
    return;
  }

  if (section === 'skills') {
    await updateSkillImagesSection(data.skillImages || []);
    return;
  }

  if (section === 'projects') {
    await updateProjectsSection(data.projects || []);
    return;
  }

  if (section === 'socials') {
    await updateSocialsSection(data.socials || []);
  }
};

export const updatePortfolio = async (data, _slug, section) => {
  const normalized = normalizePortfolioData(data);

  if (section) {
    await updatePortfolioSection(normalized, section);
    return getPortfolio();
  }

  await updateProfileSection(normalized);
  await updateQuickInfoSection(normalized.quickInfo || []);
  await updateSkillImagesSection(normalized.skillImages || []);
  await updateProjectsSection(normalized.projects || []);
  await updateSocialsSection(normalized.socials || []);

  return getPortfolio();
};

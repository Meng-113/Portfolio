import { useEffect, useState } from 'react';
import BasicInfoSection from '../Layouts/Dashboard/BasicInfoSection';
import ContactSection from '../Layouts/Dashboard/ContactSection';
import DashboardLayout from '../Layouts/Dashboard/DashboardLayout';
import ProjectsSection from '../Layouts/Dashboard/ProjectsSection';
import QuickInfoSection from '../Layouts/Dashboard/QuickInfoSection';
import SkillsSection from '../Layouts/Dashboard/SkillsSection';
import SocialLinksSection from '../Layouts/Dashboard/SocialLinksSection';
import {
  clonePortfolioData,
  normalizePortfolioData,
} from '../utils/portfolioData';

const SECTION_FIELDS = {
  basic: ['name', 'title', 'location', 'aboutTitle', 'intro', 'about'],
  quickInfo: ['quickInfo'],
  skills: ['skillImages'],
  projects: ['projects'],
  contact: ['contactDetail', 'contactEmail'],
  socials: ['socials'],
};

const Dashboard = ({ data, onSave, isLoading, loadError }) => {
  const [formData, setFormData] = useState(() =>
    clonePortfolioData(normalizePortfolioData(data)),
  );
  const [sectionStatus, setSectionStatus] = useState({});
  const [globalStatus, setGlobalStatus] = useState('');
  const [newSkillImageUrl, setNewSkillImageUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [savingSection, setSavingSection] = useState('');

  useEffect(() => {
    setFormData(clonePortfolioData(normalizePortfolioData(data)));
  }, [data]);

  const updateSectionStatus = (section, message) => {
    setSectionStatus((prev) => ({ ...prev, [section]: message }));
  };

  const saveSection = async (section) => {
    const fields = SECTION_FIELDS[section];
    if (!fields || isSaving) {
      return;
    }

    const savedData = normalizePortfolioData(data);
    const draftData = normalizePortfolioData(formData);
    const nextData = clonePortfolioData(savedData);

    fields.forEach((field) => {
      nextData[field] = draftData[field];
    });

    try {
      setIsSaving(true);
      setSavingSection(section);
      setGlobalStatus('');
      updateSectionStatus(section, 'Saving...');

      const persisted = await onSave(nextData, section);
      setFormData(clonePortfolioData(normalizePortfolioData(persisted)));
      setGlobalStatus('Saved.');
      updateSectionStatus(section, 'Saved.');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to save changes.';
      setGlobalStatus(message);
      updateSectionStatus(section, message);
    } finally {
      setIsSaving(false);
      setSavingSection('');
    }
  };

  const parseList = (text) => {
    return text
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  };

  const listToText = (list) => {
    if (!Array.isArray(list)) {
      return '';
    }
    return list.join(', ');
  };

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateQuickInfoValue = (index, value) => {
    setFormData((prev) => {
      const nextQuickInfo = [...(prev.quickInfo || [])];
      nextQuickInfo[index] = { ...nextQuickInfo[index], value };
      return { ...prev, quickInfo: nextQuickInfo };
    });
  };

  const addSkillImageFromUrl = () => {
    const imageUrl = newSkillImageUrl.trim();
    if (!imageUrl) {
      return;
    }
    setFormData((prev) => ({
      ...prev,
      skillImages: [...(prev.skillImages || []), imageUrl],
    }));
    setNewSkillImageUrl('');
  };

  const addSkillImageFromFile = (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        return;
      }
      setFormData((prev) => ({
        ...prev,
        skillImages: [...(prev.skillImages || []), reader.result],
      }));
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const removeSkillImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      skillImages: (prev.skillImages || []).filter((_, i) => i !== index),
    }));
  };

  const updateProject = (index, key, value) => {
    setFormData((prev) => {
      const nextProjects = [...(prev.projects || [])];
      nextProjects[index] = { ...nextProjects[index], [key]: value };
      return { ...prev, projects: nextProjects };
    });
  };

  const addProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [
        ...(prev.projects || []),
        {
          id: Date.now(),
          category: '',
          title: '',
          description: '',
          techStack: [],
          githubUrl: '',
          liveUrl: '',
        },
      ],
    }));
  };

  const removeProject = (index) => {
    setFormData((prev) => ({
      ...prev,
      projects: (prev.projects || []).filter((_, i) => i !== index),
    }));
  };

  const updateSocial = (index, key, value) => {
    setFormData((prev) => {
      const nextSocials = [...(prev.socials || [])];
      nextSocials[index] = { ...nextSocials[index], [key]: value };
      return { ...prev, socials: nextSocials };
    });
  };

  const addSocial = () => {
    setFormData((prev) => ({
      ...prev,
      socials: [...(prev.socials || []), { name: '', url: '', urlImage: '' }],
    }));
  };

  const removeSocial = (index) => {
    setFormData((prev) => ({
      ...prev,
      socials: (prev.socials || []).filter((_, i) => i !== index),
    }));
  };

  const updateSocialImageFromFile = (index, event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== 'string') {
        return;
      }
      updateSocial(index, 'urlImage', reader.result);
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const statusToneClassName = loadError
    ? 'text-rose-300'
    : isSaving
      ? 'text-cyan-200'
      : 'text-emerald-300';

  return (
    <DashboardLayout
      isLoading={isLoading}
      globalStatus={globalStatus}
      loadError={loadError}
      statusToneClassName={statusToneClassName}
    >
      <BasicInfoSection
        formData={formData}
        updateField={updateField}
        isSaving={isSaving}
        savingSection={savingSection}
        status={sectionStatus.basic}
        onSave={saveSection}
      />

      <QuickInfoSection
        formData={formData}
        updateQuickInfoValue={updateQuickInfoValue}
        isSaving={isSaving}
        savingSection={savingSection}
        status={sectionStatus.quickInfo}
        onSave={saveSection}
      />

      <SkillsSection
        formData={formData}
        newSkillImageUrl={newSkillImageUrl}
        setNewSkillImageUrl={setNewSkillImageUrl}
        addSkillImageFromUrl={addSkillImageFromUrl}
        addSkillImageFromFile={addSkillImageFromFile}
        removeSkillImage={removeSkillImage}
        isSaving={isSaving}
        savingSection={savingSection}
        status={sectionStatus.skills}
        onSave={saveSection}
      />

      <ProjectsSection
        formData={formData}
        addProject={addProject}
        updateProject={updateProject}
        removeProject={removeProject}
        listToText={listToText}
        parseList={parseList}
        isSaving={isSaving}
        savingSection={savingSection}
        status={sectionStatus.projects}
        onSave={saveSection}
      />

      <ContactSection
        formData={formData}
        updateField={updateField}
        isSaving={isSaving}
        savingSection={savingSection}
        status={sectionStatus.contact}
        onSave={saveSection}
      />

      <SocialLinksSection
        formData={formData}
        addSocial={addSocial}
        updateSocial={updateSocial}
        removeSocial={removeSocial}
        updateSocialImageFromFile={updateSocialImageFromFile}
        isSaving={isSaving}
        savingSection={savingSection}
        status={sectionStatus.socials}
        onSave={saveSection}
      />
    </DashboardLayout>
  );
};

export default Dashboard;

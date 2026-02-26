import SectionCard from '../../components/SectionCard';
import SectionSaveRow from '../../components/SectionSaveRow';
import {
  dashboardFileInputClassName,
  dashboardInputClassName,
  dashboardTextareaClassName,
} from './dashboardStyles';

const BasicInfoSection = ({
  formData,
  updateField,
  updateProfileImageFromFile,
  isSaving,
  savingSection,
  status,
  onSave,
}) => {
  return (
    <SectionCard title="Basic Information">
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="text-sm">
          Name
          <input
            className={dashboardInputClassName}
            value={formData.name || ''}
            onChange={(event) => updateField('name', event.target.value)}
          />
        </label>
        <label className="text-sm">
          Title
          <input
            className={dashboardInputClassName}
            value={formData.title || ''}
            onChange={(event) => updateField('title', event.target.value)}
          />
        </label>
        <label className="text-sm">
          Location
          <input
            className={dashboardInputClassName}
            value={formData.location || ''}
            onChange={(event) => updateField('location', event.target.value)}
          />
        </label>
        <label className="text-sm">
          About Title
          <input
            className={dashboardInputClassName}
            value={formData.aboutTitle || ''}
            onChange={(event) => updateField('aboutTitle', event.target.value)}
          />
        </label>
        <label className="text-sm md:col-span-2">
          Profile Image URL
          <input
            className={dashboardInputClassName}
            value={formData.profileImage || ''}
            onChange={(event) => updateField('profileImage', event.target.value)}
          />
        </label>
        <label className="text-sm md:col-span-2">
          Upload Profile Image
          <input
            type="file"
            accept="image/*"
            onChange={updateProfileImageFromFile}
            className={dashboardFileInputClassName}
          />
        </label>
      </div>
      {formData.profileImage ? (
        <img
          src={formData.profileImage}
          alt="Profile preview"
          className="mt-3 h-20 w-20 rounded-full object-cover"
        />
      ) : null}

      <div className="mt-4 space-y-4">
        <label className="block text-sm">
          Intro
          <textarea
            className={dashboardTextareaClassName}
            value={formData.intro || ''}
            onChange={(event) => updateField('intro', event.target.value)}
          />
        </label>
        <label className="block text-sm">
          About
          <textarea
            className={dashboardTextareaClassName}
            value={formData.about || ''}
            onChange={(event) => updateField('about', event.target.value)}
          />
        </label>
      </div>

      <SectionSaveRow
        sectionKey="basic"
        label="Basic"
        isSaving={isSaving}
        savingSection={savingSection}
        status={status}
        onSave={onSave}
      />
    </SectionCard>
  );
};

export default BasicInfoSection;

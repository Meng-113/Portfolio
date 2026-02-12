import Button from '../../components/Button';
import SectionCard from '../../components/SectionCard';
import SectionSaveRow from '../../components/SectionSaveRow';
import {
  dashboardActionButtonClassName,
  dashboardDangerButtonClassName,
  dashboardFileInputClassName,
  dashboardInputClassName,
  dashboardPanelClassName,
} from './dashboardStyles';

const SkillsSection = ({
  formData,
  newSkillImageUrl,
  setNewSkillImageUrl,
  addSkillImageFromUrl,
  addSkillImageFromFile,
  removeSkillImage,
  isSaving,
  savingSection,
  status,
  onSave,
}) => {
  return (
    <SectionCard title="Skills">
      <div className={`mt-6 ${dashboardPanelClassName}`}>
        <h3 className="text-base font-semibold">Skill Images</h3>
        <p className="mt-1 text-sm text-slate-400">
          Add image by URL or upload from your computer.
        </p>

        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto]">
          <input
            className={dashboardInputClassName}
            placeholder="https://example.com/logo.png"
            value={newSkillImageUrl}
            onChange={(event) => setNewSkillImageUrl(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                addSkillImageFromUrl();
              }
            }}
          />
          <Button
            type="button"
            onClick={addSkillImageFromUrl}
            variant="primary"
            size="xs"
            ariaLabel="Add skill image URL"
            className={dashboardActionButtonClassName}
          >
            Add URL
          </Button>
        </div>

        <label className="mt-4 block text-sm">
          Upload File
          <input
            type="file"
            accept="image/*"
            onChange={addSkillImageFromFile}
            className={dashboardFileInputClassName}
          />
        </label>

        <div className="mt-4 flex flex-wrap gap-3">
          {(formData.skillImages || []).map((image, index) => (
            <div
              key={`${image}-${index}`}
              className="rounded-xl border border-slate-700 bg-slate-900 p-3"
            >
              <img
                src={image}
                alt={`Skill ${index + 1}`}
                className="h-16 w-16 object-contain"
              />
              <Button
                type="button"
                onClick={() => removeSkillImage(index)}
                variant="secondary"
                size="xs"
                ariaLabel={`Remove skill image ${index + 1}`}
                className={`mt-2 w-full ${dashboardDangerButtonClassName}`}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      </div>

      <SectionSaveRow
        sectionKey="skills"
        label="Skills"
        isSaving={isSaving}
        savingSection={savingSection}
        status={status}
        onSave={onSave}
      />
    </SectionCard>
  );
};

export default SkillsSection;

import SectionCard from '../../components/SectionCard';
import SectionSaveRow from '../../components/SectionSaveRow';
import {
  dashboardInputClassName,
  dashboardTextareaClassName,
} from './dashboardStyles';

const ContactSection = ({
  formData,
  updateField,
  isSaving,
  savingSection,
  status,
  onSave,
}) => {
  return (
    <SectionCard title="Contact">
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="text-sm md:col-span-2">
          Contact Detail
          <textarea
            className={dashboardTextareaClassName}
            value={formData.contactDetail || ''}
            onChange={(event) =>
              updateField('contactDetail', event.target.value)
            }
          />
        </label>
        <label className="text-sm md:col-span-2">
          Contact Email Link
          <input
            className={dashboardInputClassName}
            value={formData.contactEmail || ''}
            onChange={(event) =>
              updateField('contactEmail', event.target.value)
            }
          />
        </label>
      </div>

      <SectionSaveRow
        sectionKey="contact"
        label="Contact"
        isSaving={isSaving}
        savingSection={savingSection}
        status={status}
        onSave={onSave}
      />
    </SectionCard>
  );
};

export default ContactSection;

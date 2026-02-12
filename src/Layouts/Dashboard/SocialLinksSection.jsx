import Button from '../../components/Button';
import SectionCard from '../../components/SectionCard';
import SectionSaveRow from '../../components/SectionSaveRow';
import SocialEditorItem from '../../components/SocialEditorItem';
import { dashboardActionButtonClassName } from './dashboardStyles';

const SocialLinksSection = ({
  formData,
  addSocial,
  updateSocial,
  removeSocial,
  updateSocialImageFromFile,
  isSaving,
  savingSection,
  status,
  onSave,
}) => {
  return (
    <SectionCard
      title="Social Links"
      action={
        <Button
          type="button"
          onClick={addSocial}
          variant="primary"
          size="xs"
          ariaLabel="Add social link"
          className={dashboardActionButtonClassName}
        >
          Add Social
        </Button>
      }
    >
      <div className="mt-4 space-y-3">
        {(formData.socials || []).map((item, index) => (
          <SocialEditorItem
            key={item.id ?? `social-${index}`}
            item={item}
            index={index}
            onChange={updateSocial}
            onRemove={removeSocial}
            onUpload={updateSocialImageFromFile}
          />
        ))}
      </div>

      <SectionSaveRow
        sectionKey="socials"
        label="Socials"
        isSaving={isSaving}
        savingSection={savingSection}
        status={status}
        onSave={onSave}
      />
    </SectionCard>
  );
};

export default SocialLinksSection;

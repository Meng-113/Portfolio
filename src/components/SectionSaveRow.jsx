import Button from './Button';

const SectionSaveRow = ({
  sectionKey,
  label,
  isSaving,
  savingSection,
  status,
  onSave,
}) => {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-3">
      <Button
        type="button"
        onClick={() => onSave(sectionKey)}
        variant="primary"
        size="xs"
        ariaLabel={`Save ${label} section`}
        disabled={isSaving}
        className="uppercase tracking-[0.1em]"
      >
        {savingSection === sectionKey ? 'Saving...' : `Save ${label}`}
      </Button>
      <p className="text-sm text-slate-300">{status || ''}</p>
    </div>
  );
};

export default SectionSaveRow;

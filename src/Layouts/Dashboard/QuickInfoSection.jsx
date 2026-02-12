import SectionCard from '../../components/SectionCard';
import SectionSaveRow from '../../components/SectionSaveRow';
import {
  dashboardInputClassName,
  dashboardPanelClassName,
} from './dashboardStyles';

const QuickInfoSection = ({
  formData,
  updateQuickInfoValue,
  isSaving,
  savingSection,
  status,
  onSave,
}) => {
  return (
    <SectionCard title="Quick Info">
      <p className="mt-2 text-sm text-slate-400">
        Only values are editable here.
      </p>
      <div className="mt-4 space-y-3">
        {(formData.quickInfo || []).map((item, index) => (
          <div
            key={`${item.label}-${index}`}
            className={dashboardPanelClassName}
          >
            <p className="text-sm font-semibold text-slate-300">{item.label}</p>
            <input
              className={dashboardInputClassName}
              value={item.value || ''}
              onChange={(event) =>
                updateQuickInfoValue(index, event.target.value)
              }
            />
          </div>
        ))}
      </div>

      <SectionSaveRow
        sectionKey="quickInfo"
        label="Quick Info"
        isSaving={isSaving}
        savingSection={savingSection}
        status={status}
        onSave={onSave}
      />
    </SectionCard>
  );
};

export default QuickInfoSection;

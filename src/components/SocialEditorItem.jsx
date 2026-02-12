import Button from './Button';
import DashboardInput from './Input';
import {
  dashboardDangerButtonClassName,
  dashboardFileInputClassName,
  dashboardPanelClassName,
} from '../Layouts/Dashboard/dashboardStyles';

const SocialEditorItem = ({ item, index, onChange, onRemove, onUpload }) => {
  return (
    <div className={dashboardPanelClassName}>
      <div className="grid gap-3 md:grid-cols-[1fr_1.5fr_1.5fr_auto]">
        <DashboardInput
          label="Name"
          value={item.name || ''}
          onChange={(event) => onChange(index, 'name', event.target.value)}
        />

        <DashboardInput
          label="URL"
          value={item.url || ''}
          onChange={(event) => onChange(index, 'url', event.target.value)}
        />

        <DashboardInput
          label="Image URL"
          value={item.urlImage || ''}
          onChange={(event) => onChange(index, 'urlImage', event.target.value)}
        />

        <div className="flex items-end">
          <Button
            type="button"
            onClick={() => onRemove(index)}
            variant="secondary"
            size="xs"
            ariaLabel={`Remove social ${index + 1}`}
            className={`h-[38px] ${dashboardDangerButtonClassName}`}
          >
            Remove
          </Button>
        </div>
      </div>

      <label className="mt-3 block text-sm">
        Upload Image File
        <input
          type="file"
          accept="image/*"
          onChange={(event) => onUpload(index, event)}
          className={dashboardFileInputClassName}
        />
      </label>

      {item.urlImage ? (
        <img
          src={item.urlImage}
          alt={`${item.name || 'Social'} icon`}
          className="mt-3 h-10 w-10 rounded object-contain"
        />
      ) : null}
    </div>
  );
};

export default SocialEditorItem;

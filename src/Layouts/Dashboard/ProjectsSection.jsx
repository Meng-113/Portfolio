import Button from '../../components/Button';
import SectionCard from '../../components/SectionCard';
import SectionSaveRow from '../../components/SectionSaveRow';
import {
  dashboardActionButtonClassName,
  dashboardDangerButtonClassName,
  dashboardInputClassName,
  dashboardPanelClassName,
  dashboardTextareaClassName,
} from './dashboardStyles';

const ProjectsSection = ({
  formData,
  addProject,
  updateProject,
  removeProject,
  listToText,
  parseList,
  isSaving,
  savingSection,
  status,
  onSave,
}) => {
  return (
    <SectionCard
      title="Projects"
      action={
        <Button
          type="button"
          onClick={addProject}
          variant="primary"
          size="xs"
          ariaLabel="Add project"
          className={dashboardActionButtonClassName}
        >
          Add Project
        </Button>
      }
    >
      <div className="mt-4 space-y-3">
        {(formData.projects || []).map((project, index) => (
          <div
            key={project.id ?? `project-${index}`}
            className={dashboardPanelClassName}
          >
            <div className="grid gap-3 md:grid-cols-2">
              <label className="text-sm">
                Project ID
                <input
                  type="number"
                  className={dashboardInputClassName}
                  value={project.id ?? ''}
                  onChange={(event) =>
                    updateProject(index, 'id', Number(event.target.value) || 0)
                  }
                />
              </label>
              <label className="text-sm">
                Category
                <input
                  className={dashboardInputClassName}
                  value={project.category || ''}
                  onChange={(event) =>
                    updateProject(index, 'category', event.target.value)
                  }
                />
              </label>
              <label className="text-sm">
                Title
                <input
                  className={dashboardInputClassName}
                  value={project.title || ''}
                  onChange={(event) =>
                    updateProject(index, 'title', event.target.value)
                  }
                />
              </label>
              <label className="text-sm">
                Tech Stack (comma separated)
                <input
                  className={dashboardInputClassName}
                  value={listToText(project.techStack)}
                  onChange={(event) =>
                    updateProject(
                      index,
                      'techStack',
                      parseList(event.target.value),
                    )
                  }
                />
              </label>
              <label className="text-sm md:col-span-2">
                Description
                <textarea
                  className={dashboardTextareaClassName}
                  value={project.description || ''}
                  onChange={(event) =>
                    updateProject(index, 'description', event.target.value)
                  }
                />
              </label>
              <label className="text-sm">
                GitHub URL
                <input
                  className={dashboardInputClassName}
                  value={project.githubUrl || ''}
                  onChange={(event) =>
                    updateProject(index, 'githubUrl', event.target.value)
                  }
                />
              </label>
              <label className="text-sm">
                Live URL
                <input
                  className={dashboardInputClassName}
                  value={project.liveUrl || ''}
                  onChange={(event) =>
                    updateProject(index, 'liveUrl', event.target.value)
                  }
                />
              </label>
            </div>

            <div className="mt-3">
              <Button
                type="button"
                onClick={() => removeProject(index)}
                variant="secondary"
                size="xs"
                ariaLabel={`Remove project ${index + 1}`}
                className={dashboardDangerButtonClassName}
              >
                Remove Project
              </Button>
            </div>
          </div>
        ))}
      </div>

      <SectionSaveRow
        sectionKey="projects"
        label="Projects"
        isSaving={isSaving}
        savingSection={savingSection}
        status={status}
        onSave={onSave}
      />
    </SectionCard>
  );
};

export default ProjectsSection;

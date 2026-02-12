import Navbar from '../Navbar';
import {
  dashboardContainerClassName,
  dashboardErrorBannerClassName,
  dashboardHeaderRowClassName,
  dashboardHelperTextClassName,
  dashboardPageClassName,
  dashboardSectionsClassName,
  dashboardStatusTextClassName,
} from './dashboardStyles';

const DashboardLayout = ({
  isLoading,
  globalStatus,
  loadError,
  statusToneClassName,
  children,
}) => {
  return (
    <div className={dashboardPageClassName}>
      <Navbar />

      <div className={dashboardContainerClassName}>
        <div className={dashboardHeaderRowClassName}>
          <p className={dashboardHelperTextClassName}>
            Edit each section and click its Save button.
          </p>
          <p
            className={`${dashboardStatusTextClassName} ${statusToneClassName}`}
          >
            {isLoading ? 'Loading data from database...' : globalStatus}
          </p>
        </div>

        {loadError ? (
          <p className={dashboardErrorBannerClassName}>
            Load error: {loadError}
          </p>
        ) : null}

        <div className={dashboardSectionsClassName}>{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;

import { UserMenu } from '@/components/UserMenu';
import { TravelNoteReviewList } from '../components/TravelNoteReviewList/index';
import '../pages/DashboardPage.scss';

export const DashboardPage = () => (
  <div className="dashboard-layout">
    <main className="dashboard-main">
      <header className="dashboard-header">
        <div className="dashboard-header__title">审核系统</div>
        <div className="dashboard-header__right">
          <span className="dashboard-header__bell">🔔</span>
          <UserMenu />
        </div>
      </header>
      <section className="dashboard-content">
        <div className="dashboard-table-placeholder">
          <TravelNoteReviewList />
        </div>
      </section>
    </main>
  </div>
);

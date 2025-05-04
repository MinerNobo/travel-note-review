import React from 'react';
import Sidebar from '../components/Sidebar';
import './DashboardPage.scss';

const DashboardPage = () => (
  <div className="dashboard-layout">
    <Sidebar />
    <main className="dashboard-main">
      <header className="dashboard-header">
        <div className="dashboard-header__title">Dashboard</div>
        <div className="dashboard-header__right">
          <span className="dashboard-header__bell">🔔</span>
          <span className="dashboard-header__avatar"></span>
        </div>
      </header>
      <section className="dashboard-content">
        {/* 这里后续插入表格和筛选 */}
        <div className="dashboard-table-placeholder">
          <h2>Manage and review travel notes submitted by users.</h2>
          {/* 这里可以插入 Table 组件 */}
        </div>
      </section>
    </main>
  </div>
);

export default DashboardPage;

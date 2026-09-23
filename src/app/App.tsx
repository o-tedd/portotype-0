import { Navigate, Route, Routes } from "react-router";
import { AppLayout } from "../layouts/AppLayout";
import { DashboardPage } from "../pages/DashboardPage";
import { PlannerPage } from "../pages/PlannerPage";
import { StatisticsPage } from "../pages/StatisticsPage";
import { CertificatesPage } from "../pages/CertificatesPage";
import { ProfilePage } from "../pages/ProfilePage";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/app/dashboard" replace />} />

      <Route path="/app" element={<AppLayout />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="planner" element={<PlannerPage />} />
        <Route path="statistics" element={<StatisticsPage />} />
        <Route path="certificates" element={<CertificatesPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/app/dashboard" replace />} />
    </Routes>
  );
}

import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import LoadsPage from "@/pages/loads/LoadsPage";
import FleetPage from "@/pages/fleet/FleetPage";
import DriversPage from "@/pages/drivers/DriversPage";
import AIIntelligencePage from "@/pages/ai-intelligence/AIIntelligencePage";
import ExceptionsPage from "@/pages/exceptions/ExceptionsPage";
import WorkflowsPage from "@/pages/workflows/WorkflowsPage";
import MaintenancePage from "@/pages/maintenance/MaintenancePage";
import SettingsPage from "@/pages/settings/SettingsPage";
import CopilotPage from "@/pages/copilot/CopilotPage";
import { Stub } from "@/pages/_stubs/Stub";

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/loads" element={<LoadsPage />} />
        <Route path="/fleet" element={<FleetPage />} />
        <Route path="/drivers" element={<DriversPage />} />
        <Route path="/ai-intelligence" element={<AIIntelligencePage />} />
        <Route path="/exceptions" element={<ExceptionsPage />} />
        <Route path="/workflows" element={<WorkflowsPage />} />
        <Route path="/maintenance" element={<MaintenancePage />} />
        <Route path="/copilot" element={<CopilotPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

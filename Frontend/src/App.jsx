import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar';
import Dashboard from '../Dashboard';
import RevenueLeakage from './components/RevenueLeakage';
import RecommendationsView from './components/RecommendationsView';
import RecommendationDetailModal from './components/RecommendationDetailModal';
import BoundedExecutionModal from './components/BoundedExecutionModal';
import AuditTrailView from './components/AuditTrailView';
import ImpactView from './components/ImpactView';
import ArchitectureView from './components/ArchitectureView';
import RunAIAnalysisModal from './components/RunAIAnalysisModal';

import { apiClient } from './api/client';
import { INITIAL_METRICS, INITIAL_RECOMMENDATIONS, INITIAL_AUDIT_TRAIL } from './data/mockData';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

function App() {
  // Navigation state
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'dashboard'
  const [currentTab, setCurrentTab] = useState('overview'); // 'overview' | 'leakage' | 'recommendations' | 'audit' | 'impact' | 'architecture'

  // Data state
  const [metrics, setMetrics] = useState(INITIAL_METRICS);
  const [recommendations, setRecommendations] = useState(INITIAL_RECOMMENDATIONS);
  const [auditTrail, setAuditTrail] = useState(INITIAL_AUDIT_TRAIL);
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  // Modals state
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
  const [detailModalRec, setDetailModalRec] = useState(null);
  const [boundedExecutionRec, setBoundedExecutionRec] = useState(null);

  // Toast notification
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Sync with backend on mount
  useEffect(() => {
    const initData = async () => {
      const health = await apiClient.checkHealth();
      if (health.status === 'healthy') {
        setIsBackendConnected(true);
        const [m, r, a] = await Promise.all([
          apiClient.getMetrics(),
          apiClient.getRecommendations(),
          apiClient.getAuditTrail()
        ]);
        if (m) setMetrics(m);
        if (r && r.length > 0) setRecommendations(r);
        if (a && a.length > 0) setAuditTrail(a);
      }
    };
    initData();
  }, []);

  // Handlers for Bounded Actions
  const handleApproveAction = async (rec) => {
    // Open the Bounded Execution confirmation gate modal
    setBoundedExecutionRec(rec);
  };

  const handleConfirmApproval = async (rec) => {
    // Call backend or local client
    await apiClient.approveAction(rec.id);

    // Update local state
    setRecommendations((prev) =>
      prev.map((r) => (r.id === rec.id ? { ...r, status: 'approved' } : r))
    );

    // Append to audit trail
    const newAuditEntry = {
      id: `aud_${auditTrail.length + 1}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timeAgo: 'Just now',
      event: 'Action Approved & Bound',
      actor: 'Merchant Admin',
      status: 'Approved',
      type: 'execute',
      details: `Merchant authorized bounded execution of "${rec.title}" (Estimated lift: ${rec.impactDisplay})`,
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    };
    setAuditTrail((prev) => [newAuditEntry, ...prev]);

    showToast(`Approved bounded action: ${rec.title}`, 'success');
  };

  const handleRejectAction = async (rec) => {
    await apiClient.rejectAction(rec.id);

    setRecommendations((prev) =>
      prev.map((r) => (r.id === rec.id ? { ...r, status: 'rejected' } : r))
    );

    const newAuditEntry = {
      id: `aud_${auditTrail.length + 1}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timeAgo: 'Just now',
      event: 'Action Rejected by Merchant',
      actor: 'Merchant Admin',
      status: 'Rejected',
      type: 'reject',
      details: `Merchant declined bounded action: "${rec.title}"`,
      badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/20'
    };
    setAuditTrail((prev) => [newAuditEntry, ...prev]);

    showToast(`Rejected recommendation: ${rec.title}`, 'info');
  };

  const handleRunAnalysisComplete = async () => {
    const res = await apiClient.runAnalysis();
    if (res && res.recommendations) {
      setRecommendations(res.recommendations);
    }
    setCurrentTab('recommendations');
    showToast('Autonomous agent analysis completed: 4 revenue opportunities identified.', 'success');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500/20">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl text-xs font-semibold">
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : toast.type === 'error' ? (
              <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-sky-400 shrink-0" />
            )}
            <span className="text-white">{toast.message}</span>
          </div>
        </div>
      )}

      {currentView === 'landing' ? (
        <LandingPage onEnterDashboard={() => setCurrentView('dashboard')} />
      ) : (
        <div className="flex-1 flex flex-col">
          {/* Main Navigation Bar */}
          <Navbar
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            onRunAnalysis={() => setIsAnalysisModalOpen(true)}
            onReturnHome={() => setCurrentView('landing')}
            pendingRecommendationsCount={recommendations.filter((r) => r.status === 'pending').length}
            isBackendConnected={isBackendConnected}
          />

          {/* Tab Content Canvas */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
            {currentTab === 'overview' && (
              <Dashboard
                metrics={metrics}
                recommendations={recommendations}
                onNavigateTab={(tab) => setCurrentTab(tab)}
                onRunAnalysis={() => setIsAnalysisModalOpen(true)}
                onOpenDetail={(rec) => setDetailModalRec(rec)}
                onApproveAction={(rec) => handleApproveAction(rec)}
              />
            )}

            {currentTab === 'leakage' && (
              <RevenueLeakage
                onNavigateRecommendations={() => setCurrentTab('recommendations')}
                onRunAnalysis={() => setIsAnalysisModalOpen(true)}
              />
            )}

            {currentTab === 'recommendations' && (
              <RecommendationsView
                recommendations={recommendations}
                onOpenDetail={(rec) => setDetailModalRec(rec)}
                onApproveAction={(rec) => handleApproveAction(rec)}
                onRejectAction={(rec) => handleRejectAction(rec)}
              />
            )}

            {currentTab === 'audit' && (
              <AuditTrailView auditTrail={auditTrail} />
            )}

            {currentTab === 'impact' && (
              <ImpactView
                metrics={metrics}
                recommendations={recommendations}
                onNavigateRecommendations={() => setCurrentTab('recommendations')}
              />
            )}

            {currentTab === 'architecture' && (
              <ArchitectureView />
            )}
          </main>

          {/* Footer */}
          <footer className="border-t border-slate-900 py-6 px-6 text-center text-xs text-slate-500 bg-slate-950/80">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
              <p>MerchantMind AI — Autonomous Revenue Growth Agent for Razorpay Merchants</p>
              <p className="text-slate-400">Prototype Mode • Track 01 AI Growth & Agentic Commerce</p>
            </div>
          </footer>
        </div>
      )}

      {/* Screen 4: Interactive Agent Analysis Modal */}
      <RunAIAnalysisModal
        isOpen={isAnalysisModalOpen}
        onClose={() => setIsAnalysisModalOpen(false)}
        onComplete={handleRunAnalysisComplete}
      />

      {/* Screen 6: Recommendation Detail Modal */}
      <RecommendationDetailModal
        isOpen={!!detailModalRec}
        onClose={() => setDetailModalRec(null)}
        recommendation={detailModalRec}
        onApprove={(rec) => handleApproveAction(rec)}
        onReject={(rec) => handleRejectAction(rec)}
      />

      {/* Screen 7: Bounded Execution Confirmation Modal */}
      <BoundedExecutionModal
        isOpen={!!boundedExecutionRec}
        onClose={() => setBoundedExecutionRec(null)}
        recommendation={boundedExecutionRec}
        onConfirmApproval={handleConfirmApproval}
      />
    </div>
  );
}

export default App;

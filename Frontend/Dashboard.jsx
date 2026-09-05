import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [metrics, setMetrics] = useState({
    totalRevenue: 0,
    projectedRecovery: 0,
    abandonedCarts: 0,
    atRiskCustomers: 0,
  });

  useEffect(() => {
    setMetrics({
      totalRevenue: 50000000,
      projectedRecovery: 12500000,
      abandonedCarts: 150,
      atRiskCustomers: 320,
    });

    setRecommendations([
      {
        id: 1,
        title: 'Cart Abandonment Recovery',
        impact: '15%',
        confidence: '85%',
        priority: 'high',
        affectedCustomers: 150,
        description: 'Send personalized recovery emails to customers with abandoned carts',
      },
      {
        id: 2,
        title: 'Payment Failure Recovery',
        impact: '5%',
        confidence: '80%',
        priority: 'high',
        affectedCustomers: 75,
        description: 'Implement automatic retry with alternative payment methods',
      },
      {
        id: 3,
        title: 'Churn Prevention Program',
        impact: '8%',
        confidence: '75%',
        priority: 'medium',
        affectedCustomers: 320,
        description: 'Target at-risk customers with retention offers',
      },
    ]);
  }, []);

  const MetricCard = ({ label, value, subtext, color }) => (
    <div className={`bg-${color}-50 border border-${color}-200 rounded-lg p-6 shadow-sm`}>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
      <p className="text-xs text-gray-500 mt-1">{subtext}</p>
    </div>
  );

  const RecommendationCard = ({ rec }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{rec.title}</h3>
          <p className="text-xs text-gray-600 mt-1">{rec.description}</p>
        </div>
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          rec.priority === 'high' ? 'bg-red-100 text-red-800' :
          rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
        }`}>
          {rec.priority.toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-100">
        <div>
          <p className="text-xs text-gray-600">Impact</p>
          <p className="font-bold text-lg text-green-600">{rec.impact}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600">Confidence</p>
          <p className="font-bold text-lg text-blue-600">{rec.confidence}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600">Customers</p>
          <p className="font-bold text-lg text-purple-600">{rec.affectedCustomers}</p>
        </div>
      </div>

      <button className="w-full mt-4 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors">
        View Details
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">MerchantMind Dashboard</h1>
        <p className="text-gray-600 mt-2">AI-powered revenue growth insights for your business</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <MetricCard
          label="Current Monthly Revenue"
          value={`₹${(metrics.totalRevenue / 100000).toFixed(1)}L`}
          subtext="Last 30 days"
          color="blue"
        />
        <MetricCard
          label="Projected Recovery"
          value={`₹${(metrics.projectedRecovery / 100000).toFixed(1)}L`}
          subtext="25% improvement"
          color="green"
        />
        <MetricCard
          label="Abandoned Carts"
          value={metrics.abandonedCarts}
          subtext="Recovery opportunities"
          color="yellow"
        />
        <MetricCard
          label="At-Risk Customers"
          value={metrics.atRiskCustomers}
          subtext="Churn prevention targets"
          color="red"
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">AI Recommendations</h2>
          <p className="text-gray-600 text-sm mt-1">
            Prioritized growth actions powered by MerchantMind AI
          </p>
        </div>

        {recommendations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No recommendations yet. Analyzing your data...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendations.map((rec) => (
              <RecommendationCard key={rec.id} rec={rec} />
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> This dashboard is in development. 
          Connect your Razorpay API keys to see live data and recommendations.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;

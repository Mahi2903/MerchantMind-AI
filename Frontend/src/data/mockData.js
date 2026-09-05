/**
 * MerchantMind AI — Central Demo Dataset
 * 
 * STRICT DEMO SPECIFICATION MATCHING PITCH SCRIPT:
 * - Current Monthly Revenue: ₹50 Lakhs
 * - Cart Abandonment Recovery: +₹4.5 Lakhs (150 carts, 70% benchmark)
 * - Churn Prevention: +₹2.5 Lakhs (320 at-risk customers)
 * - Dynamic Pricing Optimization: +₹1.5 Lakhs (45 SKUs)
 * - Total Projected Recovery: +₹8.5 Lakhs
 * - Projected Revenue: ₹58.5 Lakhs (+17% Revenue Lift)
 * - Failure Rate: 15.0% (UPI latency vs Card)
 * - Refund Rate: 5.0%
 */

export const INITIAL_METRICS = {
  monthlyRevenue: 5000000,
  monthlyRevenueDisplay: "₹50.0L",
  potentialRecovery: 850000,
  potentialRecoveryDisplay: "₹8.5L",
  projectedRevenue: 5850000,
  projectedRevenueDisplay: "₹58.5L",
  revenueOpportunityPercent: 17.0,
  abandonedCarts: 150,
  cartAbandonmentBenchmark: "70%",
  atRiskCustomers: 320,
  paymentFailureRate: 15.0,
  refundRate: 5.0,
  totalTransactions: 1000,
  completedTransactions: 700,
  failedTransactions: 150,
  refundedTransactions: 50,
  averageOrderValue: 5000,
  currency: "INR",
  isDemoData: true,
  dataPeriod: "Last 30 days"
};

export const INITIAL_RECOMMENDATIONS = [
  {
    id: "rec_cart_recovery_01",
    title: "Abandoned Cart Recovery Campaign",
    priority: "high",
    category: "cart",
    confidence: 85,
    estimatedImpact: 9.0,
    impactAmount: 450000,
    impactDisplay: "+₹4.5 Lakhs",
    affectedCount: 150,
    affectedLabel: "150 abandoned carts",
    targetSegment: "High-Value Cart Abandoners",
    actionType: "email",
    status: "pending", // "pending" | "approved" | "rejected"
    problem: "150 customers abandoned high-value carts at checkout in the last 30 days.",
    dataEvidence: {
      headline: "70% cart abandonment benchmark detected on high-ticket items",
      metric: "Abandoned Carts",
      value: "150 checkouts",
      recoverableGmv: "₹4,50,000",
      avgCartValue: "₹5,000",
      topDropoff: "Payment Method Selection Screen (62% of dropoffs)",
      deviceBias: "Mobile web (78%)"
    },
    recommendation: "Send a personalized, bounded multi-channel recovery trigger (WhatsApp + Email) with an auto-expiring checkout reservation.",
    whyRecommended: "70% of shoppers drop off after adding high-value items to cart. Telemetry reveals dropoffs concentrate at payment gateway initialization. Automated instant recovery converts 10-15% of these high-intent shoppers.",
    boundedConstraints: {
      maxIncentive: "Max 5% discount code voucher",
      frequencyCap: "Strictly 1 notification per user within 24h",
      expiryWindow: "Expires in 24 hours",
      approvalRequired: "Merchant must approve bounded trigger before dispatch"
    },
    expectedOutcome: "Recover 25-30 completed orders within 48 hours, injecting ~₹1.25L - ₹1.5L immediate liquidity."
  },
  {
    id: "rec_payment_retry_02",
    title: "Failed Payment Smart Retry & Fallback Flow",
    priority: "high",
    category: "payment",
    confidence: 80,
    estimatedImpact: 4.0,
    impactAmount: 200000,
    impactDisplay: "+₹2.0 Lakhs",
    affectedCount: 75,
    affectedLabel: "75 recoverable transactions",
    targetSegment: "Failed UPI & Card Checkouts",
    actionType: "retry",
    status: "pending",
    problem: "Payment failure rate is 15.0%, with heavy clustering in UPI bank switch timeouts.",
    dataEvidence: {
      headline: "UPI payment failures (14.8%) exceed card failures (4.2%) by 3.5x",
      metric: "Payment Failure Rate",
      value: "15.0% (150 total failures)",
      recoverableGmv: "₹2,00,000",
      upiShare: "68% of total failed volume",
      topFailureReason: "Bank Switch Timeout (NPCI Response Latency > 15s)",
      secondaryReason: "Customer VPA typo / UPI App notification delay"
    },
    recommendation: "Introduce an intelligent retry flow that immediately suggests saved Cards or alternate UPI handle upon bank switch timeout.",
    whyRecommended: "Payment failures for UPI transactions are significantly higher than card transactions in the selected period. MerchantMind therefore recommends an automated retry/alternative-payment flow rather than letting the checkout abandon.",
    boundedConstraints: {
      maxRetries: "Maximum 2 retry attempts",
      retryCooldown: "30-second backoff threshold",
      allowedFallbacks: ["Alternate UPI VPA", "Tokenized Card", "Netbanking"],
      approvalRequired: "Merchant must activate fallback routing policy"
    },
    expectedOutcome: "Salvage 35-40 transactions per week, reducing silent merchant GMV leakage by ₹2 Lakhs monthly."
  },
  {
    id: "rec_churn_retention_03",
    title: "At-Risk Customer Retention Program",
    priority: "medium",
    category: "churn",
    confidence: 75,
    estimatedImpact: 5.0,
    impactAmount: 250000,
    impactDisplay: "+₹2.5 Lakhs",
    affectedCount: 320,
    affectedLabel: "320 at-risk customers",
    targetSegment: "Lapsing Repeat Buyers (Cohort 3)",
    actionType: "offer",
    status: "pending",
    problem: "320 previously active customers have surpassed their typical re-order cycle by 45+ days.",
    dataEvidence: {
      headline: "320 high-value buyers showing critical purchase cadence deceleration",
      metric: "At-Risk Cohort",
      value: "320 accounts",
      recoverableGmv: "₹2,50,000",
      highRiskTier: "85 customers (>60 days inactive)",
      mediumRiskTier: "145 customers (45-60 days inactive)",
      lowRiskTier: "90 customers (30-45 days inactive)",
      historicalClv: "₹8,200 per merchant customer"
    },
    recommendation: "Send a targeted, bounded VIP loyalty retention credit to at-risk buyers before they permanently churn.",
    whyRecommended: "MerchantMind identifies customers BEFORE they leave. Re-engaging an existing buyer costs 5x less than acquiring a new customer on digital ads, protecting recurring baseline revenue.",
    boundedConstraints: {
      incentiveType: "Complimentary Express Delivery + ₹250 Loyalty Wallet Credit",
      campaignBudgetCap: "₹32,000 max program liability",
      minimumPriorSpend: "Minimum ₹4,000 lifetime GMV",
      approvalRequired: "Merchant reviews cohort list and approves dispatch"
    },
    expectedOutcome: "Reactivate 60-70 lapsing customers, recovering ₹2.5 Lakhs in repeat transactions."
  },
  {
    id: "rec_pricing_opt_04",
    title: "Dynamic Peak-Hour Pricing Optimization",
    priority: "medium",
    category: "pricing",
    confidence: 72,
    estimatedImpact: 3.0,
    impactAmount: 150000,
    impactDisplay: "+₹1.5 Lakhs",
    affectedCount: 45,
    affectedLabel: "45 catalog SKUs",
    targetSegment: "High-Velocity Inelastic SKUs",
    actionType: "pricing",
    status: "pending",
    problem: "Top-selling SKUs experience weekend demand surges with negligible price sensitivity, resulting in unrealized gross margin.",
    dataEvidence: {
      headline: "Weekend traffic surges 2.4x with price elasticity of -0.42 (highly inelastic)",
      metric: "Elasticity Index",
      value: "-0.42 during Fri-Sun 18:00 - 23:00",
      recoverableGmv: "₹1,50,000 margin lift",
      catalogCoverage: "45 SKUs (Consumer Electronics & Accessories)",
      currentAverageMargin: "22.0%",
      projectedMargin: "25.5%"
    },
    recommendation: "Consider a data-backed bounded pricing adjustment (+3% to +5%) during peak weekend shopping hours.",
    whyRecommended: "Checkout telemetry confirms conversion remains flat within a 3-5% price band on these 45 SKUs. MerchantMind provides safe, bounded margin optimization without hurting customer acquisition.",
    boundedConstraints: {
      strictCeiling: "Maximum 5.0% price increase",
      timeBound: "Friday 18:00 to Sunday 23:59 only",
      circuitBreaker: "Automatic rollback if conversion drops >2.0%",
      approvalRequired: "Merchant must explicitly approve SKU price delta"
    },
    expectedOutcome: "+₹1.5 Lakhs in pure gross margin recovery with zero ad spend."
  }
];

export const INITIAL_AUDIT_TRAIL = [
  {
    id: "aud_01",
    timestamp: "09:41 AM",
    timeAgo: "25 mins ago",
    event: "Merchant Data Ingested",
    actor: "Razorpay Sync Worker",
    status: "Verified",
    type: "ingest",
    details: "Synchronized 1,000 payments, 150 cart drops, 50 refunds from Razorpay Sandbox API.",
    badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
  },
  {
    id: "aud_02",
    timestamp: "09:42 AM",
    timeAgo: "24 mins ago",
    event: "Revenue Leakage Detected",
    actor: "MerchantMind Analytics Engine",
    status: "Verified",
    type: "analyze",
    details: "Analyzed transaction telemetry; identified ₹8.5 Lakhs in recoverable leakage across 4 vectors.",
    badgeColor: "text-sky-400 bg-sky-500/10 border-sky-500/20"
  },
  {
    id: "aud_03",
    timestamp: "09:43 AM",
    timeAgo: "23 mins ago",
    event: "AI Recommendations Generated",
    actor: "Claude 3.5 Sonnet Reasoning",
    status: "Bounded",
    type: "recommend",
    details: "Generated 4 bounded recommendations with confidence scores (72% - 85%) and INR impact estimates.",
    badgeColor: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20"
  },
  {
    id: "aud_04",
    timestamp: "09:44 AM",
    timeAgo: "22 mins ago",
    event: "Safety Boundaries Enforced",
    actor: "Validation Guardrail",
    status: "Compliant",
    type: "validate",
    details: "Passed compliance checks: No unauthorized wallet deductions, max discount capped at 5%, NPCI retry rules respected.",
    badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/20"
  }
];

export const LEAKAGE_DATA = {
  cartAbandonment: {
    title: "Cart Abandonment",
    severity: "HIGH",
    count: 150,
    benchmark: "70% industry benchmark",
    recoverableDisplay: "₹4.5 Lakhs",
    recoverableAmount: 450000,
    summary: "Customers are adding products to cart but leaving before completing payment.",
    funnel: [
      { name: "Items in Cart", count: 1000, pct: "100%" },
      { name: "Contact / Shipping", count: 850, pct: "85%" },
      { name: "Payment Gateway Loaded", count: 700, pct: "70%" },
      { name: "Completed Purchase", count: 550, pct: "55%" }
    ],
    recoveredTarget: "Recover 20% of abandoned volume (+₹4.5L)"
  },
  paymentFailures: {
    title: "Payment Failures",
    severity: "HIGH",
    failureRate: "15.0%",
    recoverableDisplay: "₹2.0 Lakhs",
    recoverableAmount: 200000,
    summary: "Transactions are failing silently without root-cause diagnosis.",
    breakdown: [
      {
        method: "UPI Payments",
        share: "68% of failures",
        rate: "14.8% fail rate",
        reason: "Bank switch timeout / NPCI response latency during evening peaks",
        color: "from-amber-500 to-amber-600"
      },
      {
        method: "Credit & Debit Cards",
        share: "22% of failures",
        rate: "4.2% fail rate",
        reason: "3DS OTP latency & bank card international usage restrictions",
        color: "from-sky-500 to-sky-600"
      },
      {
        method: "Netbanking & Wallets",
        share: "10% of failures",
        rate: "2.8% fail rate",
        reason: "Session expiry during redirect to external bank gateway",
        color: "from-purple-500 to-purple-600"
      }
    ],
    pitchInsight: "MerchantMind pinpoints WHY payments fail instead of merely showing 'failed'."
  },
  chargebacksAndRefunds: {
    title: "Chargebacks & Refunds",
    severity: "MEDIUM",
    refundRate: "5.0%",
    summary: "MerchantMind identifies patterns instead of simply reporting refund totals.",
    productPatterns: [
      { category: "High-End Electronics", refundRate: "7.4%", insight: "High return rate due to cable compatibility confusion" },
      { category: "Apparel / Footwear", refundRate: "4.8%", insight: "Sizing variance in brand line X" },
      { category: "General Accessories", refundRate: "1.9%", insight: "Within optimal baseline (<2%)" }
    ],
    paymentMethodPatterns: [
      { method: "Cash on Delivery (COD)", rate: "9.2% return rate" },
      { method: "Prepaid Razorpay (UPI/Card)", rate: "2.1% refund rate" }
    ],
    suspiciousCluster: "14 repeated refund attempts detected from 3 clustered VPAs (flagged for review)"
  },
  customerChurn: {
    title: "Customer Churn",
    severity: "MEDIUM",
    atRiskCount: 320,
    recoverableDisplay: "₹2.5 Lakhs",
    recoverableAmount: 250000,
    summary: "Identify high-value customers showing attrition signs BEFORE they permanently leave.",
    tiers: [
      { tier: "High Risk", count: 85, daysInactive: "> 60 days", potentialLoss: "₹1,20,000", color: "bg-rose-500/10 border-rose-500/30 text-rose-400" },
      { tier: "Medium Risk", count: 145, daysInactive: "45 - 60 days", potentialLoss: "₹90,000", color: "bg-amber-500/10 border-amber-500/30 text-amber-400" },
      { tier: "Low Risk", count: 90, daysInactive: "30 - 45 days", potentialLoss: "₹40,000", color: "bg-blue-500/10 border-blue-500/30 text-blue-400" }
    ]
  }
};

export const AGENT_STEPS = [
  { step: 1, label: "STEP 1", title: "Ingesting merchant data...", detail: "Reading live transactions, refunds, and cart events from Razorpay API" },
  { step: 2, label: "STEP 2", title: "Analyzing payment patterns...", detail: "Correlating dropoffs with payment method, latency, and device telemetry" },
  { step: 3, label: "STEP 3", title: "Detecting revenue leakage...", detail: "Quantifying ₹8.5 Lakhs gap across carts, payment failures, and churn" },
  { step: 4, label: "STEP 4", title: "Identifying high-value customer segments...", detail: "Clustering 150 cart abandoners and 320 at-risk loyal accounts" },
  { step: 5, label: "STEP 5", title: "Generating growth recommendations...", detail: "Prompting Claude reasoning engine for data-backed bounded actions" },
  { step: 6, label: "STEP 6", title: "Validating recommended actions...", detail: "Applying boundary checks (discount ceilings, no unauthorized execution)" }
];

export const SYSTEM_ARCHITECTURE = [
  {
    step: "1",
    name: "Razorpay Data",
    tech: "REST APIs & Webhooks",
    desc: "Ingests payments, refunds, chargebacks, and checkout dropoffs.",
    icon: "database"
  },
  {
    step: "2",
    name: "FastAPI Backend",
    tech: "Python 3.12 + FastAPI",
    desc: "Asynchronous processing, rate limiting, and telemetry validation.",
    icon: "server"
  },
  {
    step: "3",
    name: "MerchantMind Agent",
    tech: "Autonomous Workflow Engine",
    desc: "Orchestrates multi-step investigation of revenue leakage.",
    icon: "cpu"
  },
  {
    step: "4",
    name: "Claude AI Reasoning",
    tech: "Anthropic Claude API",
    desc: "Multi-step reasoning over merchant data to identify root causes.",
    icon: "sparkles"
  },
  {
    step: "5",
    name: "Recommendation Validation",
    tech: "Bounded Policy Guardrails",
    desc: "Enforces discount caps, frequency limits, and compliance checks.",
    icon: "shield-check"
  },
  {
    step: "6",
    name: "Merchant Approval",
    tech: "Human-in-the-Loop UI",
    desc: "Merchant reviews evidence, rationale, and bounded action.",
    icon: "user-check"
  },
  {
    step: "7",
    name: "Audit Trail",
    tech: "Immutable Ledger",
    desc: "Logs every recommendation, decision, actor, and timestamp.",
    icon: "file-text"
  },
  {
    step: "8",
    name: "Impact Measurement",
    tech: "Telemetry & Attribution",
    desc: "Tracks recovered GMV, saved customers, and conversion lift.",
    icon: "trending-up"
  }
];


import { Globe, Target, Shield, Activity, Database, Cpu, Radio, Eye, Layers, Satellite } from "lucide-react"

export interface SystemMetric {
  label: string
  value: string
  unit?: string
}

export interface SystemFeature {
  title: string
  description: string
}

export interface SpaceSystem {
  id: string
  title: string
  tagline: string
  icon: any
  status?: "Active" | "In Development" | "Beta"
  metrics: SystemMetric[]
  features: SystemFeature[]
  visualType: "orb" | "network" | "grid" | "chart" | "alert" | "pipeline" | "pde" | "satellite" // For determining which visual component to render
  color?: string // Optional override for specific system theming
}

export const spaceSystems: SpaceSystem[] = [
  {
    id: "ssa-cae",
    title: "SSA Conjunction Analysis Engine",
    tagline: "Real-time collision prevention for orbital assets",
    icon: Globe,
    status: "Active",
    visualType: "orb",
    metrics: [
      { label: "System Uptime", value: "99.9", unit: "%" },
      { label: "Response Time", value: "< 1", unit: "s" },
      { label: "Active Objects", value: "24,000", unit: "+" }
    ],
    features: [
      {
        title: "High-Fidelity TLE Processing",
        description: "Ingests and normalizes Two-Line Element sets from multiple sources, correcting for propagation errors and stale epochs."
      },
      {
        title: "SGP4 Orbital Propagation",
        description: "Standardized orbital propagation tailored for LEO/MEO/GEO regimes, ensuring compatibility with Space-Track and Celestrak standards."
      },
      {
        title: "Covariance Matrix Analysis",
        description: "Probabilistic assessment of object positions using full 6x6 covariance matrices to determine accurate collision probabilities."
      },
      {
        title: "Maneuver Detection",
        description: "Algorithmic identification of unannounced orbital changes, automatically triggering re-screening of affected assets."
      }
    ]
  },
  {
    id: "astra-ssa",
    title: "ASTRA-SSA",
    tagline: "AI-powered space situational awareness at scale",
    icon: Activity,
    status: "Active",
    visualType: "network",
    metrics: [
      { label: "Propagation Speed", value: "10x", unit: "faster" },
      { label: "Tracked Objects", value: "100k", unit: "+" },
      { label: "PINN Accuracy", value: "98.5", unit: "%" }
    ],
    features: [
      {
        title: "Typesafe PINN Integration",
        description: "Uses Physics-Informed Neural Networks to solve orbital mechanics differential equations significantly faster than numerical integrators."
      },
      {
        title: "Natural Language Query Interface",
        description: "LLM-powered interface allowing operators to query complex orbital states using plain English (e.g., 'Show all objects crossing GEO belt')."
      },
      {
        title: "VarNet Methodology",
        description: "Variational Network approach for solving inverse problems in orbit determination, reducing the required observation arc length."
      },
      {
        title: "Production-Grade Scalability",
        description: "Microservices architecture designed to scale horizontally on Kubernetes, handling the catalog growth of the mega-constellation era."
      }
    ]
  },
  {
    id: "amts",
    title: "Advanced Missile Tracking System",
    tagline: "Multi-domain ballistic threat detection and defense",
    icon: Target,
    status: "Active",
    visualType: "alert",
    metrics: [
      { label: "Target Confidence", value: "8.8", unit: "/10" },
      { label: "Trajectory Precision", value: "6", unit: "DOF" },
      { label: "Sensor Fusion", value: "4", unit: "sources" }
    ],
    features: [
      {
        title: "Extended Kalman Filter",
        description: "Non-linear state estimation for tracking ballistic trajectories during boost, midcourse, and terminal phases with high precision."
      },
      {
        title: "Multi-Hypothesis Tracker",
        description: "Advanced algorithms to discriminate between actual warheads and decoys/debris clouds using kinematic and signature analysis."
      },
      {
        title: "Integrated Threat Databases",
        description: "Real-time correlation against known signature databases for rapid classification of launch vehicles and payload types."
      },
      {
        title: "Battle Management Integration",
        description: "Direct data link capabilities for C2 systems, providing fire-control quality vectors to interception assets."
      }
    ]
  },
  {
    id: "cas",
    title: "Conjunction Analysis Subsystem",
    tagline: "Probabilistic collision risk assessment",
    icon: Layers,
    status: "Active",
    visualType: "chart",
    metrics: [
      { label: "Screening Rate", value: "Automated", unit: "24/7" },
      { label: "Uncertainty Quant", value: "Statistical", unit: "σ" },
      { label: "Alert Latency", value: "Real-time" }
    ],
    features: [
      {
        title: "Advanced Screening Algorithms",
        description: "optimized 'all-vs-all' screening that quickly filters out non-threatening pairs before performing computationally expensive probability calculations."
      },
      {
        title: "Covariance-Based Calculation",
        description: "Computes Probability of Collision (Pc) using 3D covariance ellipsoids, accounting for uncertainties in position and velocity."
      },
      {
        title: "Threshold-Based Alerting",
        description: "Configurable alert thresholds allowing operators to receive notifications only when risk exceeds specific Pc or miss-distance values."
      },
      {
        title: "Historical Conjunction Database",
        description: "Long-term storage of conjunction events for trend analysis and debris density modeling in specific orbital shells."
      }
    ]
  },
  {
    id: "mstas",
    title: "Multi-Satellite Tracking & Alert System",
    tagline: "Comprehensive space object monitoring",
    icon: Radio,
    status: "Active",
    visualType: "grid",
    metrics: [
      { label: "Tracking Mode", value: "Parallel" },
      { label: "Data Retention", value: "5", unit: "years" },
      { label: "API Uptime", value: "99.99", unit: "%" }
    ],
    features: [
      {
        title: "Parallel Object Tracking",
        description: "Concurrent monitoring of hundreds of satellites, tailored for constellation operators managing fleet-wide dynamics."
      },
      {
        title: "Optimized API Architecture",
        description: "GraphQL and REST endpoints providing low-latency access to state vectors, ephemerides, and conjunction warnings."
      },
      {
        title: "Tiered Alert System",
        description: "Priority-based notification system delivering critical alerts via SMS/PagerDuty and routine updates via dashboard/email."
      },
      {
        title: "Long-Term Data Retention",
        description: "Warehouse storage for historical orbital data, enabling post-mission analysis and regulatory compliance reporting."
      }
    ]
  },
  {
    id: "ope",
    title: "Orbital Propagation Engines",
    tagline: "High-fidelity trajectory prediction",
    icon: Cpu,
    status: "Active",
    visualType: "orb",
    metrics: [
      { label: "Models", value: "SGP4/SDP4" },
      { label: "Epoch Analysis", value: "Multi-Epoch" },
      { label: "Perturbations", value: "J2-J4" }
    ],
    features: [
      {
        title: "SGP4/SDP4 Implementation",
        description: "Rigorous implementation of Simplified General Perturbations models for accurate prediction of deep space and near-Earth objects."
      },
      {
        title: "Perturbation Modeling",
        description: "Accounts for atmospheric drag, solar radiation pressure, and lunar-solar gravitational effects for high-precision long-term propagation."
      },
      {
        title: "Covariance Propagation",
        description: "Propagates uncertainty alongside the state vector, allowing for realistic error estimations at future epochs."
      },
      {
        title: "State Vector Calculations",
        description: "Conversion handling between various coordinate frames (TEME, J2000, ECEF) supporting diverse mission requirements."
      }
    ]
  },
  {
    id: "sdp",
    title: "Space Data Pipeline",
    tagline: "Automated ingestion and processing infrastructure",
    icon: Database,
    status: "Active",
    visualType: "pipeline",
    metrics: [
      { label: "Ingestion Sources", value: "12", unit: "+" },
      { label: "Update Freq", value: "Continuous" },
      { label: "DB Throughput", value: "High-Vol" }
    ],
    features: [
      {
        title: "Automated TLE Ingestion",
        description: "Scrapers and API clients that continuously fetch updated TLEs and ephemeris data from Space-Track, Celestrak, and private sensors."
      },
      {
        title: "ETL Pipeline Optimization",
        description: "Extract, Transform, Load processes optimized for massive orbital datasets, ensuring clean data is available for analytics engines."
      },
      {
        title: "Redundant Database Management",
        description: "Distributed database architecture ensuring data integrity and availability even during regional outages or maintenance."
      },
      {
        title: "Source Integration Map",
        description: "Visual lineage tools to track data provenance, critical for audit trails in collision liability assessments."
      }
    ]
  },
  {
    id: "mla",
    title: "Machine Learning Analytics",
    tagline: "Intelligent anomaly detection and pattern recognition",
    icon: Eye,
    status: "Active",
    visualType: "chart",
    metrics: [
      { label: "Anomaly Detection", value: "Automated" },
      { label: "Pattern Recog", value: "Behavioral" },
      { label: "Learning", value: "Continuous" }
    ],
    features: [
      {
        title: "Automated Maneuver Detection",
        description: "ML models trained to identify non-Keplerian behavior indicative of station-keeping or evasive maneuvers."
      },
      {
        title: "Behavioral Pattern Analysis",
        description: "Unsupervised learning algorithms that cluster objects by behavioral traits, identifying potential undisclosed military assets."
      },
      {
        title: "Anomaly Classification",
        description: "Classifies events such as breakups, sensor glitches, or propulsive events based on spectral and kinematic signatures."
      },
      {
        title: "Continuous Learning Pipeline",
        description: "Feedback loops where analyst verifications retrain the models, constantly improving the system's false positive rate."
      }
    ]
  },
  {
    id: "varnet",
    title: "VarNet PINN Framework",
    tagline: "Physics-constrained neural networks for orbital mechanics",
    icon: Shield, // Reusing Shield as a placeholder for "Physics/Framework"
    status: "Active",
    visualType: "pde",
    metrics: [
      { label: "Equation Type", value: "PDE/ODE" },
      { label: "Method", value: "FEM + ML" },
      { label: "Model Reduction", value: "Active" }
    ],
    features: [
      {
        title: "Partial Differential Equation Solvers",
        description: "Solving the Hamilton-Jacobi-Bellman equations for optimal control and trajectory design using neural approximations."
      },
      {
        title: "Finite Element Method Integration",
        description: "Hybrid architecture combining classical FEM capability with deep learning for specialized structural or thermal analysis."
      },
      {
        title: "Model Order Reduction",
        description: "Techniques to reduce the computational complexity of high-fidelity physical models while maintaining accuracy for real-time use."
      },
      {
        title: "Operator Theory Implementation",
        description: "Leveraging Deep Operator Networks (DeepONets) to learn the solution operator of parametric differential equations."
      }
    ]
  },
  {
    id: "tsuki",
    title: "Tsuki - Space Image Processing",
    tagline: "Advanced imagery analysis for space domain awareness",
    icon: Satellite,
    status: "In Development",
    visualType: "satellite",
    metrics: [
      { label: "Status", value: "Dev" },
      { label: "Processing", value: "Real-time" },
      { label: "Spectrum", value: "Multi" }
    ],
    features: [
      {
        title: "Object Detection & Classification",
        description: "Convolutional Neural Networks (CNNs) tuned to identify satellites and debris in optical and radar imagery."
      },
      {
        title: "Image Enhancement Algorithms",
        description: "Super-resolution and noise reduction techniques to recover detail from atmospheric distortion or sensor noise."
      },
      {
        title: "Automated Cataloging",
        description: "Pipeline to automatically update object catalogs based on visual confirmations derived from processed telescope imagery."
      },
      {
        title: "Multi-Spectral Analysis",
        description: "Fusion of visual, IR, and radar data to characterize material properties and operational status of targets."
      }
    ]
  }
]

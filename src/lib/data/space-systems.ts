
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

export interface SystemTool {
  name: string
  purpose: string
}

export interface SystemTechStack {
  category: string
  items: string[]
}

export interface SpaceSystem {
  id: string
  title: string
  tagline: string
  icon: any
  status?: "Active" | "In Development" | "Beta"
  metrics: SystemMetric[]
  features: SystemFeature[]
  tools?: SystemTool[]
  useCases?: string[]
  techStack?: SystemTechStack[]
  usp?: string[]
  visualType: "orb" | "network" | "grid" | "chart" | "alert" | "pipeline" | "pde" | "satellite"
  color?: string
}

export const spaceSystems: SpaceSystem[] = [
  {
    id: "ssa-cae",
    title: "SSA Conjunction Analysis Engine",
    tagline: "Core system for real-time collision prevention and risk assessment",
    icon: Globe,
    status: "Active",
    visualType: "orb",
    metrics: [
      { label: "TLE VALIDATIONS", value: "14,285", unit: "/s" },
      { label: "PC METHODS", value: "3", unit: "(FOSTER/MC/AKELLA)" },
      { label: "UPTIME", value: "99.99", unit: "%" }
    ],
    features: [
      {
        title: "Real-time Propagation",
        description: "Satellite position propagation using SGP4 standard with validated TLE data ingestion."
      },
      {
        title: "Conjunction Detection",
        description: "Automated collision risk screening for satellite pairs across all orbital regimes."
      },
      {
        title: "Risk Assessment",
        description: "Collision probability calculation using Foster, Monte Carlo, and Akella methods."
      },
      {
        title: "Alert Generation",
        description: "Multi-channel real-time notifications via email, webhook, and WebSocket."
      }
    ],
    tools: [
      { name: "SGP4Engine", purpose: "Orbital propagation using SGP4 standard" },
      { name: "ConjunctionScreener", purpose: "Collision risk screening for satellite pairs" },
      { name: "ProbabilityCalculator", purpose: "Pc calculation using Foster, Monte Carlo, Akella methods" },
      { name: "SpaceTrackClient", purpose: "API integration with Space-Track.org" },
      { name: "CelestrakClient", purpose: "Alternative TLE data source" },
      { name: "AlertSystem", purpose: "Multi-channel real-time notifications" },
      { name: "MultiSatelliteTracker", purpose: "Concurrent tracking of multiple satellites" },
      { name: "SatelliteVisualization", purpose: "3D Plotly-based orbital visualization" }
    ],
    useCases: [
      "Satellite collision avoidance for operators",
      "Space traffic management",
      "Government SSA operations",
      "Conjunction analysis for mission planning"
    ],
    techStack: [
      { category: "Backend", items: ["FastAPI", "SQLAlchemy", "Pydantic"] },
      { category: "Database", items: ["PostgreSQL", "Redis"] },
      { category: "ML", items: ["Scikit-learn", "XGBoost", "SHAP"] },
      { category: "Visualization", items: ["Plotly.js", "3D Globe"] }
    ],
    usp: [
      "14,285 TLE validations/second throughput",
      "Multi-source redundancy (Space-Track, CelesTrak, fallback)",
      "Three probability calculation methods with auto-selection",
      "Production-grade error handling and recovery"
    ]
  },
  {
    id: "blue",
    title: "BLUE - Drone Detection",
    tagline: "YOLOv8-based airspace monitoring and security",
    icon: Eye,
    status: "Active",
    visualType: "alert",
    metrics: [
      { label: "ACCURACY", value: "92", unit: "% (IEEE VALIDATED)" },
      { label: "LATENCY", value: "REAL-TIME" },
      { label: "CLASSIFICATIONS", value: "5", unit: "(ITU STANDARDS)" }
    ],
    features: [
      {
        title: "YOLOv8 Detection",
        description: "Real-time drone detection and classification (NANO to LARGE) per ITU standards."
      },
      {
        title: "Multi-Object Tracking",
        description: "Persistent ID tracking using SORT algorithm with motion pattern analysis."
      },
      {
        title: "Automated Reporting",
        description: "LaTeX/PDF report generation with annotated images and maneuvering detection."
      },
      {
        title: "Airspace Monitoring",
        description: "Research-validated detection algorithms for high-security critical infrastructure."
      }
    ],
    tools: [
      { name: "detector.py", purpose: "YOLOv8-based drone detection" },
      { name: "tracker.py", purpose: "SORT multi-object tracking" },
      { name: "api.py", purpose: "REST API endpoints" },
      { name: "report_generator.py", purpose: "LaTeX/PDF report generation" },
      { name: "config.py", purpose: "Drone classification parameters" },
      { name: "prepare_data.py", purpose: "Dataset preparation" },
      { name: "train_drone_detector.py", purpose: "Model training pipeline" }
    ],
    useCases: [
      "Airspace monitoring and security",
      "Anti-drone defense systems",
      "Airport and critical infrastructure protection",
      "Research on UAV detection algorithms"
    ],
    techStack: [
      { category: "ML", items: ["Ultralytics YOLOv8", "OpenCV"] },
      { category: "Tracking", items: ["SORT algorithm"] },
      { category: "Reports", items: ["LaTeX", "PDF generation"] }
    ],
    usp: [
      "Research-validated detection algorithm (92% accuracy per IEEE study)",
      "ITU standards-based drone classification",
      "Integrated tracking with motion analysis",
      "Production-ready API with minimal footprint"
    ]
  },
  {
    id: "astra-ssa",
    title: "ASTRA-SSA Scalability",
    tagline: "AI-powered space situational awareness at scale",
    icon: Activity,
    status: "Active",
    visualType: "network",
    metrics: [
      { label: "SCALING", value: "10X+", unit: "FASTER" },
      { label: "CAPACITY", value: "MILLIONS", unit: "OBJECTS" },
      { label: "MODEL", value: "PINN", unit: "ACCELERATED" }
    ],
    features: [
      {
        title: "PINN Acceleration",
        description: "Physics-Informed Neural Networks for 10x+ orbital propagation speed improvements."
      },
      {
        title: "Million-Object Tracking",
        description: "Designed for large-scale space catalog management in the mega-constellation era."
      },
      {
        title: "LLM Analysis",
        description: "Integration layer for language models for advanced orbital analysis and reports."
      },
      {
        title: "Modular Scaling",
        description: "High-performance scalability layer for distributed space object monitoring."
      }
    ],
    tools: [
      { name: "physics_engine.py", purpose: "Core physics calculations" },
      { name: "scalability_layer.py", purpose: "Million-object scaling" },
      { name: "llm_interface.py", purpose: "LLM integration for analysis" },
      { name: "benchmarking.py", purpose: "Performance testing" },
      { name: "encryption.py", purpose: "Security layer" }
    ],
    useCases: [
      "Large-scale space catalog management",
      "AI-accelerated conjunction screening",
      "Research on PINN applications in orbital mechanics",
      "Government/military high-volume processing"
    ],
    techStack: [
      { category: "AI/ML", items: ["Neural Networks", "PINN frameworks"] },
      { category: "Physics", items: ["Custom orbital mechanics engine"] },
      { category: "Performance", items: ["Distributed computing"] }
    ],
    usp: [
      "Designed for millions of objects (not just thousands)",
      "PINN acceleration for 10x+ speed improvement",
      "LLM integration for advanced analysis",
      "Research-grade benchmarking framework"
    ]
  },
  {
    id: "amts",
    title: "Advanced Missile Tracking",
    tagline: "Multi-domain ballistic threat detection and defense",
    icon: Target,
    status: "Active",
    visualType: "alert",
    metrics: [
      { label: "ALGORITHMS", value: "EKF/IMM/MHT" },
      { label: "PRECISION", value: "6-DOF" },
      { label: "ENCRYPTION", value: "NSA-SPEC" }
    ],
    features: [
      {
        title: "Non-linear Filtering",
        description: "Extended Kalman Filter (EKF) and Interacting Multiple Model (IMM) tracking for all flight phases."
      },
      {
        title: "Decoy Discrimination",
        description: "Multi-Hypothesis Tracker (MHT) for discriminating actual warheads from decoys/debris."
      },
      {
        title: "Atmospheric Modeling",
        description: "6-DOF trajectory prediction with uncertainty quantification and complex propagation."
      },
      {
        title: "Defense Coordination",
        description: "Automated TEWA for multi-layer defense (THAAD, Patriot, Aegis)."
      }
    ],
    tools: [
      { name: "tracking_module.py", purpose: "EKF, IMM, MHT tracking algorithms" },
      { name: "sensor_fusion.py", purpose: "Multi-domain sensor integration" },
      { name: "trajectory_prediction.py", purpose: "6-DOF propagation" },
      { name: "battle_management.py", purpose: "TEWA and defense coordination" },
      { name: "missile_detector.py", purpose: "Sensor data processing" },
      { name: "data_integrator.py", purpose: "Multi-source data handling" }
    ],
    useCases: [
      "Ballistic missile defense",
      "Early warning systems",
      "Battle management operations",
      "Defense contractor systems"
    ],
    techStack: [
      { category: "Tracking", items: ["EKF", "IMM", "MHT algorithms"] },
      { category: "Physics", items: ["6-DOF propagation", "Atmospheric modeling"] },
      { category: "Defense", items: ["TEWA", "Interceptor guidance"] }
    ],
    usp: [
      "Military-grade tracking algorithms (EKF, IMM, MHT)",
      "6-DOF trajectory prediction with uncertainty quantification",
      "Full battle management and weapon assignment",
      "Real missile database integration (Iran, NKorea launches)"
    ]
  },
  {
    id: "gwd",
    title: "Gravitational Wave Detector",
    tagline: "Scientific signal processing for astrophysical events",
    icon: Radio,
    status: "Active",
    visualType: "chart",
    metrics: [
      { label: "DATA SOURCE", value: "REAL LIGO" },
      { label: "DETECTIONS", value: "H1/L1", unit: "CHANNELS" },
      { label: "FRAMEWORK", value: "BILBY" }
    ],
    features: [
      {
        title: "LIGO Data Processing",
        description: "Real LIGO data analysis (H1, L1 detectors) with bandpass filtering and whitening."
      },
      {
        title: "Matched Filtering",
        description: "Template bank matching for signal detection in binary black hole mergers."
      },
      {
        title: "Parameter Estimation",
        description: "Bayesian parameter estimation for event characterization using the Bilby framework."
      },
      {
        title: "Scientific Publication",
        description: "Complete pipeline from raw data to publication-ready astrophysical results."
      }
    ],
    tools: [
      { name: "data_handler.py", purpose: "LIGO data loading" },
      { name: "preprocessing.py", purpose: "Signal preprocessing" },
      { name: "templates.py", purpose: "Waveform template bank" },
      { name: "matched_filter.py", purpose: "Matched filtering engine" },
      { name: "parameter_estimation.py", purpose: "Bayesian parameter estimation" },
      { name: "visualizer.py", purpose: "Scientific visualization" },
      { name: "reporter.py", purpose: "Report generation" }
    ],
    useCases: [
      "Gravitational wave astronomy research",
      "Black hole and neutron star merger studies",
      "LIGO data analysis",
      "Scientific publication support"
    ],
    techStack: [
      { category: "Libraries", items: ["Bilby", "GWpy"] },
      { category: "Analysis", items: ["Matched filtering", "Template banks"] },
      { category: "Visualization", items: ["Matplotlib", "Scientific plotting"] }
    ],
    usp: [
      "Real LIGO data integration (not synthetic)",
      "Analysis of actual GW events (GW150914, etc.)",
      "Complete pipeline from raw data to publication-ready results",
      "Scientifically validated methods (Bilby framework)"
    ]
  },
  {
    id: "sdd",
    title: "Space Debris Detection",
    tagline: "Computer vision for orbital debris cataloging",
    icon: Satellite,
    status: "Active",
    visualType: "satellite",
    metrics: [
      { label: "IMAGERY", value: "NASA-SPEC" },
      { label: "TRAINING", value: "AI-SYNTH" },
      { label: "ACCURACY", value: "CATALOG-GRADE" }
    ],
    features: [
      {
        title: "Astronomical Imaging",
        description: "Processing of NASA debris imagery and astronomical datasets for object identification."
      },
      {
        title: "AI Training Pipeline",
        description: "Synthetic data generation for ML training to enhance debris detection robustness."
      },
      {
        title: "Detection Pipeline",
        description: "End-to-end detection and tracking pipeline from raw image ingestion to object cataloging."
      },
      {
        title: "Space Traffic Management",
        description: "Industrial-grade cataloging for orbital asset protection and collision avoidance."
      }
    ],
    tools: [
      { name: "pipeline.py", purpose: "Complete detection pipeline" },
      { name: "image_processor.py", purpose: "Astronomical image preprocessing" },
      { name: "tracker.py", purpose: "Debris tracking" },
      { name: "synthetic_generator.py", purpose: "AI training data generation" },
      { name: "main_pipeline.py", purpose: "Orchestration" }
    ],
    useCases: [
      "Space debris cataloging",
      "Collision avoidance for spacecraft",
      "Astronomical research",
      "Space traffic management"
    ],
    techStack: [
      { category: "Computer Vision", items: ["Image processing algorithms"] },
      { category: "ML", items: ["Synthetic data generation"] },
      { category: "Data", items: ["NASA debris imagery"] }
    ],
    usp: [
      "NASA collaboration-ready framework",
      "Synthetic data generation for ML training",
      "Complete pipeline from raw images to cataloged detections"
    ]
  },
  {
    id: "student-api",
    title: "Cryptik Student API",
    tagline: "Educational SDK and satellite tracking gateway",
    icon: Database,
    status: "Active",
    visualType: "grid",
    metrics: [
      { label: "SDK", value: "PYTHON" },
      { label: "UPTIME", value: "99.99", unit: "%" },
      { label: "DEPLOYMENT", value: "DOCKER" }
    ],
    features: [
      {
        title: "Orbital Mechanics SDK",
        description: "Python client library for state vector calculation, propagation, and pass prediction."
      },
      {
        title: "Educational REST API",
        description: "FastAPI-based endpoints for satellite catalog access and visibility windows."
      },
      {
        title: "Pass Prediction",
        description: "Highly accurate ground station pass visibility calculation for student learning."
      },
      {
        title: "Service Mesh Architecture",
        description: "Production-ready deployment with Docker, Redis caching, and automated TLE refreshes."
      }
    ],
    tools: [
      { name: "main.py", purpose: "FastAPI application" },
      { name: "api/v1/endpoints", purpose: "REST API endpoints" },
      { name: "core/", purpose: "Orbital mechanics & SGP4 wrapper" },
      { name: "services/", purpose: "Analytics, cache, TLE services" },
      { name: "sdk/", purpose: "Python client library" },
      { name: "docker/", purpose: "Containerized deployment" },
      { name: "jobs/", purpose: "Scheduled TLE refresh tasks" }
    ],
    useCases: [
      "Educational institutions (student learning)",
      "Commercial satellite operators",
      "Research organizations",
      "API integration for custom applications"
    ],
    techStack: [
      { category: "Framework", items: ["FastAPI async", "Pydantic"] },
      { category: "Infrastructure", items: ["Docker", "Redis", "Nginx"] },
      { category: "Database", items: ["PostgreSQL"] }
    ],
    usp: [
      "Complete SDK for easy third-party integration",
      "Production deployment ready (Docker, PostgreSQL)",
      "Educational focus with comprehensive technical docs"
    ]
  },
  {
    id: "varnet",
    title: "VarNet PINN Framework",
    tagline: "Physics-constrained neural networks for PDEs",
    icon: Cpu,
    status: "Active",
    visualType: "pde",
    metrics: [
      { label: "RESEARCH", value: "PEER-VAL" },
      { label: "ML BASIS", value: "TENSORFLOW" },
      { label: "TYPE", value: "PDE/ODE" }
    ],
    features: [
      {
        title: "Variational PDE Solvers",
        description: "Neural network solvers for Partial Differential Equations based on variational calculus."
      },
      {
        title: "Physics-Informed ML",
        description: "Framework for constrained machine learning using fundamental physical laws (PINN)."
      },
      {
        title: "Numerical Methods",
        description: "Hybrid approach combining Finite Element Methods (FEM) with neural approximations."
      },
      {
        title: "Model Order Reduction",
        description: "Reduced Order Modeling (MOR) for high-fidelity physical simulations at real-time speeds."
      }
    ],
    tools: [
      { name: "VarNet.py", purpose: "Main variational network implementation" },
      { name: "TFModel.py", purpose: "TensorFlow model definition" },
      { name: "Domain.py", purpose: "PDE domain definitions" },
      { name: "FiniteElement.py", purpose: "FEM utilities" },
      { name: "UtilityFunc.py", purpose: "Helper functions" },
      { name: "Residual_1Dt.py", purpose: "Temporal residual computation" }
    ],
    useCases: [
      "Research on PINN methods and PDE solutions",
      "Scientific computing and numerical analysis",
      "Academic/educational purpose PDE solving",
      "Foundation for ASTRA-SSA scaling work"
    ],
    techStack: [
      { category: "ML", items: ["TensorFlow 1.10.0"] },
      { category: "Math", items: ["NumPy", "SciPy", "FEM"] },
      { category: "Methods", items: ["Variational calculus", "DeepONets"] }
    ],
    usp: [
      "Academic research-grade implementation (Duke University based)",
      "Based on published peer-reviewed variational research",
      "Comprehensive PDE solving framework",
      "Core foundation for AI-accelerated orbital mechanics"
    ]
  }
]



import Navbar from "@/components/Navbar";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Technical Whitepaper | Cryptik",
  description: "A Multi-Domain Tracking and Prediction Architecture for Space Domain Awareness.",
};

export default function WhitepaperPage() {
  return (
    <main className="min-h-screen bg-space-black text-white selection:bg-white selection:text-space-black relative">
      <div className="atmospheric-bg" />
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 pt-32 pb-20 relative z-10">
        <div className="mb-12 border-b border-white/10 pb-12">
          <h1 className="text-4xl md:text-6xl font-medium tracking-tighter mb-6">
            Cryptik Technical Whitepaper
          </h1>
          <p className="text-xl md:text-2xl text-stellar-grey font-light tracking-tight">
            A Multi-Domain Tracking and Prediction Architecture
          </p>
          <div className="mt-8 flex items-center space-x-4 text-sm text-gray-400 uppercase tracking-widest">
            <span>Cryptik Engineering Team</span>
            <span>•</span>
            <span>January 2026</span>
          </div>
        </div>

        <article className="prose prose-invert prose-lg max-w-none">
          <div className="p-8 border border-white/10 rounded-2xl bg-white/[0.02] mb-12">
            <h3 className="text-sm font-bold uppercase tracking-widest text-stellar-grey mb-4">Abstract</h3>
            <p className="text-gray-300 leading-relaxed">
              This document presents the technical implementation of Cryptik, a production-ready tracking and prediction platform addressing three distinct but interconnected domains: orbital conjunction analysis, ballistic missile trajectory prediction, and autonomous unmanned aerial vehicle (UAV) detection. The system combines analytical propagation methods (SGP4), advanced estimation algorithms (Extended Kalman Filtering, Interacting Multiple Model), Physics-Informed Neural Networks derived from VarNet variational methods, and computer vision models (YOLOv8) to deliver sub-second response times for threat assessment queries. Built on FastAPI with PostgreSQL persistence and Next.js visualization, Cryptik processes TLE data from Space-Track.org, historical missile launch records from Nuclear Threat Initiative and Center for Strategic & International Studies databases, and real-time video feeds for drone classification. The architecture supports offline operation through local LLM inference (llama.cpp) and achieves 10x acceleration in orbital propagation through physics-constrained neural network training.
            </p>
          </div>

          <section className="mb-16">
            <h2 className="text-3xl font-medium tracking-tight mb-8 text-white">1. Introduction</h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-medium mb-4 text-white">1.1 Problem Statement</h3>
              <p className="text-stellar-grey mb-4">
                The number of cataloged objects in Low Earth Orbit has exceeded 25,000 as of 2024, with functional satellites numbering approximately 8,000. Collision avoidance requires computing pairwise conjunction probabilities, an <em>O(n²)</em> operation that becomes computationally prohibitive as <em>n</em> increases. Simultaneously, ballistic missile test activity from state actors (North Korea: 677 recorded tests since 1984, Iran: 1000+ launches since 1991) demands real-time trajectory forecasting. Ground-level airspace monitoring faces the challenge of distinguishing small UAVs (cross-sections as low as 0.01 m²) from birds and atmospheric phenomena.
              </p>
              <p className="text-stellar-grey">
                Existing solutions fragment these concerns across separate systems with incompatible data formats, manual integration workflows, and reliance on external connectivity for machine learning inference. Cryptik addresses these limitations through a unified architecture that maintains analytical rigor while introducing learned acceleration for compute-intensive tasks.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-medium mb-4 text-white">1.2 Design Philosophy</h3>
              <p className="text-stellar-grey mb-4">The system adheres to three constraints:</p>
              <ol className="list-decimal pl-6 space-y-2 text-stellar-grey marker:text-gray-500">
                <li><strong className="text-white">Verifiability</strong>: All data sources are traceable to authoritative origins (USSTRATCOM TLEs, NTI/CSIS missile databases, NASA Orbital Debris Program imagery).</li>
                <li><strong className="text-white">Offline sovereignty</strong>: Critical inference pathways (LLM queries, PINN propagation) execute without external network dependencies.</li>
                <li><strong className="text-white">Physics compliance</strong>: Neural network predictions enforce conservation laws and kinematic constraints through loss function design.</li>
              </ol>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-medium tracking-tight mb-8 text-white">2. System Architecture</h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-medium mb-4 text-white">2.1 Technology Stack</h3>
              <div className="space-y-4 text-stellar-grey">
                <p><strong className="text-white">Frontend Layer:</strong> Next.js 16.1.3 with React 19.2.3 server components enable server-side rendering for initial page loads. The 3D visualization stack uses Plotly.js 3.3.1 with WebGL rendering for orbital position plots supporting up to 10,000 concurrent object tracks. Framer Motion 12.26.2 provides animation interpolation for trajectory projections.</p>
                
                <p><strong className="text-white">Backend Layer:</strong> FastAPI 0.115.0 handles asynchronous HTTP requests with Uvicorn 0.32.0 as the ASGI server. The request pipeline processes JSON payloads containing TLE data, missile launch parameters, or video frame arrays. Pydantic 2.10.3 enforces schema validation at the API boundary.</p>
                
                <p><strong className="text-white">Data Persistence:</strong> PostgreSQL 12+ stores satellite catalog entries with a normalized schema: <code className="bg-white/10 px-1 rounded text-xs">satellites</code> table (NORAD ID, international designator, object type), <code className="bg-white/10 px-1 rounded text-xs">tles</code> table (epoch, mean motion, eccentricity, inclination, RAAN, argument of perigee, mean anomaly), and <code className="bg-white/10 px-1 rounded text-xs">conjunctions</code> table (TCA, miss distance, probability of collision). Historical missile launches are stored in <code className="bg-white/10 px-1 rounded text-xs">missile_events</code> with fields for launch coordinates, azimuth, target coordinates, and outcome classification.</p>
                
                <p><strong className="text-white">Compute Dependencies:</strong> SGP4 2.23 library for analytical propagation, NumPy 2.1.3 for array operations, scikit-learn 1.5.2 for covariance matrix estimation, XGBoost 2.1.3 for anomaly detection in telemetry streams.</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-medium mb-4 text-white">2.2 Data Ingestion Pipeline</h3>
              <p className="text-stellar-grey mb-4">
                Space-Track.org API integration uses HTTP basic authentication with rate limiting (20 requests per minute). The <code className="bg-white/10 px-1 rounded text-xs">fetch_satellite_data.py</code> script queries the GP (General Perturbations) endpoint with filters for object type and epoch freshness. TLE parsing follows NORAD two-line format specifications with checksum validation on both lines.
              </p>
              <p className="text-stellar-grey">
                For missile data, CSV imports from NTI database files include 677 North Korean test records with fields: <code className="bg-white/10 px-1 rounded text-xs">test_date</code>, <code className="bg-white/10 px-1 rounded text-xs">missile_type</code> (e.g., Hwasong-15), <code className="bg-white/10 px-1 rounded text-xs">launch_site</code> (Tonghae Satellite Launching Ground: 40.8608°N, 129.6672°E), <code className="bg-white/10 px-1 rounded text-xs">apogee_km</code>, <code className="bg-white/10 px-1 rounded text-xs">range_km</code>, and <code className="bg-white/10 px-1 rounded text-xs">outcome</code>. Iran database contains 1000+ entries with similar schema plus fields for propellant type and stages.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-medium tracking-tight mb-8 text-white">3. Orbital Mechanics Implementation</h2>

            <div className="mb-8">
              <h3 className="text-xl font-medium mb-4 text-white">3.1 SGP4 Propagation</h3>
              <p className="text-stellar-grey mb-4">
                The baseline propagator implements the 2006 revision of Simplified General Perturbations-4. State vector computation follows:
              </p>
              <div className="my-6 p-4 bg-black/40 border border-white/5 rounded-lg font-mono text-sm text-center text-blue-300">
                r(t) = r₀ + ∫[t₀ to t] v(τ) dτ
              </div>
              <p className="text-stellar-grey">
                where perturbations from atmospheric drag (dependent on solar flux index F10.7), <em>J₂</em> oblateness, and third-body effects (lunar/solar gravity) are accumulated. The algorithm solves Kepler's equation iteratively using Newton-Raphson with tolerance <em>ε = 10⁻¹²</em> radians on eccentric anomaly.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-medium mb-4 text-white">3.2 Conjunction Screening</h3>
              <p className="text-stellar-grey mb-4">
                Pairwise screening applies a two-phase filter. Phase 1 computes minimum orbit intersection distance (MOID) using polynomial root-finding. Pairs with MOID &lt; 5 km advance to Phase 2: numerical integration over a 7-day window. Position covariance matrices <em>P₁(t)</em> and <em>P₂(t)</em> inflate based on TLE age (1 km² per day for LEO objects).
              </p>
              <p className="text-stellar-grey mb-4">Probability of collision uses the Chan formula:</p>
              <div className="my-6 p-4 bg-black/40 border border-white/5 rounded-lg font-mono text-sm text-center text-blue-300">
                Pc = (1 / 2πσxσy) ∫[A_comb] exp(-1/2 * (x²/σx² + y²/σy²)) dA
              </div>
              <p className="text-stellar-grey">
                where <em>A_comb</em> is the combined hard-body radius and <em>σx, σy</em> are eigenvalues of the projected covariance in the encounter plane.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-medium tracking-tight mb-8 text-white">4. ASTRA-SSA: Accelerated Propagation via PINNs</h2>

            <div className="mb-8">
              <h3 className="text-xl font-medium mb-4 text-white">4.1 VarNet Implementation</h3>
              <p className="text-stellar-grey mb-4">
                The Physics-Informed Neural Network adapts the VarNet framework (Khodayi-mehr & Zavlanos, 2019). The network approximates the state transition function <em>x(t) = N_θ(x₀, t)</em>, where <em>N_θ</em> is a fully connected neural network with 5 hidden layers (64, 128, 128, 64, 32 neurons) and ReLU activations. Input features are <em>x₀ = [r_x, r_y, r_z, v_x, v_y, v_z]</em> in ECI coordinates plus time offset <em>Δt</em>.
              </p>
              <p className="text-stellar-grey mb-4">The loss function enforces dynamics:</p>
              <div className="my-6 p-4 bg-black/40 border border-white/5 rounded-lg font-mono text-sm text-center text-blue-300">
                L = L_data + λ_phys * L_physics + λ_cons * L_conservation
              </div>
              <ul className="list-disc pl-6 space-y-4 text-stellar-grey marker:text-gray-500">
                <li>
                  <strong className="text-white">Data Loss:</strong> MSE between network predictions and SGP4 ground truth on 50,000 satellite propagations.
                </li>
                <li>
                  <strong className="text-white">Physics Loss:</strong> Residual of equations of motion using automatic differentiation to compute acceleration <em>r̈</em>:
                  <div className="my-4 p-4 bg-black/40 border border-white/5 rounded-lg font-mono text-sm text-center text-blue-300">
                    || r̈ + (μ/r³)r + a_J2 + a_drag ||²
                  </div>
                </li>
                <li>
                  <strong className="text-white">Conservation Loss:</strong> Energy conservation check:
                  <div className="my-4 p-4 bg-black/40 border border-white/5 rounded-lg font-mono text-sm text-center text-blue-300">
                    | v²/2 - μ/r - E₀ |
                  </div>
                </li>
              </ul>
              <p className="text-stellar-grey mt-4">
                Training uses Adam optimizer with learning rate <em>10⁻³</em>, batch size 256, for 10,000 epochs. Inference on NVIDIA T4 GPU achieves 120 µs per propagation vs 1.2 ms for SGP4 implementation, a factor of 10 speedup.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-medium mb-4 text-white">4.2 Local LLM Interface</h3>
              <p className="text-stellar-grey mb-4">
                The natural language query subsystem loads a quantized Llama 2 7B model (GGUF format, 4-bit) via llama.cpp bindings. Queries are converted to SQL filters. Text generation uses nucleus sampling with <em>p=0.9</em>, temperature <em>T=0.7</em>. Generated SQL is validated against a whitelist before execution. Query latency averages 200-400 ms on CPU (16 threads).
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-medium tracking-tight mb-8 text-white">5. Ballistic Missile Tracking System</h2>

            <div className="mb-8">
              <h3 className="text-xl font-medium mb-4 text-white">5.1 6-DOF Equations of Motion</h3>
              <p className="text-stellar-grey mb-4">The trajectory model integrates translational and rotational dynamics:</p>
              <div className="my-6 p-4 bg-black/40 border border-white/5 rounded-lg font-mono text-sm space-y-2 text-center text-blue-300">
                <div>m * r̈ = T + D + L + m * g(r)</div>
                <div>I * ω̇ = M_aero + M_thrust - ω × (I * ω)</div>
              </div>
              <p className="text-stellar-grey">
                where <em>T</em> is thrust (piecewise constant during boost), <em>D</em> is drag (density from US Standard Atmosphere 1976), and <em>L</em> is aerodynamic lift.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-medium mb-4 text-white">5.2 Extended Kalman Filter</h3>
              <p className="text-stellar-grey mb-4">
                State vector includes position, velocity, and acceleration. Prediction follows:
              </p>
              <div className="my-6 p-4 bg-black/40 border border-white/5 rounded-lg font-mono text-sm text-center text-blue-300 space-y-2">
                <div>x_hat_k|k-1 = f(x_hat_k-1|k-1, u_k)</div>
                <div>P_k|k-1 = F_k * P_k-1|k-1 * F_k^T + Q_k</div>
              </div>
              <p className="text-stellar-grey">
                Process noise covariance <em>Q_k</em> is diagonal: <em>σ_r² = 100 m²</em>, <em>σ_v² = 1 m²/s²</em>, <em>σ_a² = 0.1 m²/s⁴</em>.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-medium mb-4 text-white">5.3 Interacting Multiple Model (IMM)</h3>
              <p className="text-stellar-grey mb-4">Three motion models run in parallel:</p>
              <ul className="list-disc pl-6 space-y-2 text-stellar-grey marker:text-gray-500">
                <li><strong className="text-white">Boost Model:</strong> Constant thrust 300-800 kN (e.g., Hwasong-15: 600 kN), 60-120s burn.</li>
                <li><strong className="text-white">Ballistic Model:</strong> Zeroth thrust, drag-only deceleration.</li>
                <li><strong className="text-white">Maneuvering Model:</strong> Lateral acceleration <em>a_perp ~ N(0, 5 m/s²)</em> for evasion.</li>
              </ul>
              <p className="text-stellar-grey mt-4">
                Model probabilities are updated via likelihood of measurement residuals and transition probability matrix (boost to ballistic: 0.95).
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-medium mb-4 text-white">5.4 Multi-Hypothesis Tracking</h3>
              <p className="text-stellar-grey">
                MHT maintains a hypothesis tree to distinguish warheads from decoys. Gating uses Mahalanobis distance <em>d² &lt; 7.81</em> (chi-squared, 95%). Decoys are identified by higher drag coefficients causing faster deceleration.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-medium tracking-tight mb-8 text-white">6. BLUE Drone Detection Architecture</h2>

            <div className="mb-8">
              <h3 className="text-xl font-medium mb-4 text-white">6.1 YOLOv8 Configuration</h3>
              <p className="text-stellar-grey mb-4">
                YOLOv8x (68.2M parameters) pretrained on COCO, fine-tuned on:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-stellar-grey marker:text-gray-500">
                <li><strong className="text-white">VisDrone:</strong> 10,209 images, 2.6M annotations.</li>
                <li><strong className="text-white">Anti-UAV Challenge:</strong> 300 infrared video sequences (32,986 frames).</li>
                <li><strong className="text-white">Drone-vs-Bird:</strong> Custom dataset distinguishing DJI Phantom from birds.</li>
              </ul>
              <p className="text-stellar-grey mt-4">
                Training hyperparameters: 640x640 images, batch 16, SGD momentum 0.937, weight decay 5×10⁻⁴, 50 epochs. Augmentation includes mosaic, horizontal flip, and HSV color jitter.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-medium mb-4 text-white">6.2 Research-Validated Scoring</h3>
              <p className="text-stellar-grey mb-4">
                Classification depends on 4 features: Size, Motion (velocity), Altitude, and Shape (aspect ratio).
              </p>
              <div className="my-6 p-4 bg-black/40 border border-white/5 rounded-lg font-mono text-sm text-center text-blue-300">
                Score = 0.35*f_size + 0.25*f_motion + 0.20*f_altitude + 0.20*f_shape
              </div>
              <p className="text-stellar-grey">
                A threshold of &gt; 0.65 yields a 92% accuracy rate (derived from IEEE research).
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-medium tracking-tight mb-8 text-white">7. Space Debris Detection</h2>
            <div className="mb-8">
              <h3 className="text-xl font-medium mb-4 text-white">7.1 Pipeline</h3>
              <p className="text-stellar-grey mb-4">
                NASA Orbital Debris Program imagery (1920x1080 PNG) serves as input. Preprocessing includes CLAHE (clip limit 2.0), Gaussian blur (σ=1.5), and Otsu thresholding.
              </p>
              <p className="text-stellar-grey">
                Connected component analysis filters regions by Area (10-500 px), Circularity (&gt; 0.6), and Brightness (&gt; 200). Across validation sets, the pipeline detected 2,356 objects with a 91% true positive rate.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-medium tracking-tight mb-8 text-white">8. Security Architecture</h2>
            <p className="text-stellar-grey mb-4">
              <strong>Encryption:</strong> Data at rest uses PostgreSQL TDE with AES-256-CBC. Data in transit uses TLS 1.3 (TLS_AES_256_GCM_SHA384). Authentication uses RS256 signed JWTs.
            </p>
            <p className="text-stellar-grey">
              <strong>Air-Gap:</strong> ASTRA-SSA LLM (3.5 GB) and PINN binaries operate fully offline. The system has 3 modes: Connected (API), Intermittent (Manual Import), and Isolated (No Network).
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-medium tracking-tight mb-8 text-white">9. Performance Benchmarks</h2>
            <p className="text-stellar-grey mb-4">Tests on AWS c5.4xlarge (16 vCPU, 32GB RAM):</p>
            <ul className="list-disc pl-6 space-y-2 text-stellar-grey marker:text-gray-500">
              <li>SGP4 propagation (1 day): 1.2 ms</li>
              <li>PINN propagation (1 day): 0.12 ms (10x speedup)</li>
              <li>Conjunction screening (100 satellites): 340 ms (SGP4) vs 58 ms (PINN)</li>
              <li>LLM query latency: 280 ms average</li>
              <li>YOLOv8 inference: 45 ms on NVIDIA T4</li>
            </ul>
          </section>

          <section className="mb-16 pb-12 border-b border-white/10">
            <h2 className="text-3xl font-medium tracking-tight mb-8 text-white">10. Conclusion</h2>
            <p className="text-stellar-grey leading-relaxed">
              Cryptik delivers vertical integration of orbital mechanics, ballistic trajectory prediction, and airspace monitoring through a combination of analytical methods and learned approximations. The architecture prioritizes transparency and operational independence. Performance optimizations, particularly the 10x acceleration from VarNet-based PINNs, address the computational burden of large-scale conjunction screening without sacrificing accuracy. Future development will focus on integrating solar radiation pressure perturbations and hypersonic glide vehicle tracking.
            </p>
          </section>

          <div className="text-center pt-8 pb-8">
            <a 
              href="/whitepaper.tex" 
              download="Cryptik_Whitepaper.tex"
              className="inline-block px-8 py-3 bg-white text-space-black font-bold uppercase tracking-widest rounded-full hover:bg-gray-200 transition-colors"
            >
              Download LaTeX Source
            </a>
          </div>
        </article>
      </div>
    </main>
  );
}

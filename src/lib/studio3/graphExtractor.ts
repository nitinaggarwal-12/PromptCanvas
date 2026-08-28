import { GoogleGenAI } from '@google/genai';
import { GEMINI_MODEL_ID } from '../geminiConfig';
import { Studio3Intent } from './intentParser';
import { Studio3ExecutionLogger } from './telemetryLogger';
import { enrichAndSanitizeSemanticGraph } from './graphEnricher';
import { parseJsonSafely } from './jsonRepair';

export interface Studio3CardItem {
  id: string;
  title: string;
  iconKey?: string;
  badge?: string;
  items?: string[];
  codeSnippet?: string;
  highlight?: boolean;
}

export interface Studio3Column {
  id: string;
  header: string;
  headerColor: 'blue' | 'purple' | 'teal' | 'slate' | 'amber' | 'emerald';
  subtitle?: string;
  cards: Studio3CardItem[];
  footerNote?: string;
}

export interface Studio3PipelineStage {
  stepNumber: number;
  id: string;
  title: string;
  subtitle?: string;
  color: 'blue' | 'purple' | 'teal' | 'slate' | 'amber' | 'emerald';
  nodes: Array<{
    id: string;
    name: string;
    iconKey?: string;
    role?: string;
    description?: string;
  }>;
  outcomes?: string[];
}

export interface Studio3MatrixRow {
  dimension: string;
  cols: Array<{
    toolName: string;
    value: string;
    badge?: string;
  }>;
}

export interface Studio3Band {
  id: string;
  title: string;
  badge?: string;
  type: 'columns' | 'pipeline' | 'matrix';
  columns?: Studio3Column[];
  pipelineStages?: Studio3PipelineStage[];
  matrixRows?: Studio3MatrixRow[];
  matrixHeaders?: string[];
  footerCallout?: string;
}

export interface Studio3Connection {
  fromId: string;
  toId: string;
  label?: string;
  stepNumber?: number;
  style: 'solid_blue' | 'dashed_orange' | 'dashed_purple' | 'green_protocol' | 'feedback_teal';
}

export interface Studio3FreeformElement {
  id: string;
  name: string;
  shape: 'circle' | 'rectangle' | 'cylinder' | 'rhombus' | 'matrix' | 'formula' | 'callout';
  x: number;
  y: number;
  w: number;
  h: number;
  color?: 'blue' | 'purple' | 'teal' | 'slate' | 'amber' | 'emerald' | 'cyan' | 'red';
  iconKey?: string;
  formula?: string;
  matrixData?: string[][];
  matrixHeaders?: string[];
  details?: string[];
  subLabel?: string;
  badge?: string;
  codeSnippet?: string;
}

export interface Studio3ConceptualRoadmap {
  title: string;
  subtitle?: string;
  milestones: Array<{
    title: string;
    color: 'blue' | 'green' | 'orange' | 'yellow' | 'purple' | 'teal';
    icon?: string;
  }>;
  section1Analogy: {
    title: string;
    subtitle?: string;
    actors: Array<{ id: string; name: string; avatar: string; role?: string; x?: number; y?: number }>;
    relations: Array<{ from: string; to: string; label: string }>;
    legend: Array<{ icon: string; label: string }>;
    challengeCallout: string;
  };
  section2Prerequisites: {
    title: string;
    mathFormulas: Array<{ name: string; formula: string; icon?: string }>;
    checklist: string[];
  };
  section3Taxonomy: {
    title: string;
    variants: Array<{
      name: string;
      subtext?: string;
      diagramType: 'nodes' | 'directed' | 'weighted' | 'tree' | 'layers' | 'grid';
      details?: string[];
    }>;
  };
  section4ModernFrontiers: {
    title: string;
    knowledgeGraphNodes: Array<{ id: string; label: string; color?: string }>;
    frameworkBullets: string[];
  };
  bottomWorkflow: {
    title: string;
    step1Problem: { title: string; subtitle: string; icon: string; formula?: string; bullets: string[] };
    step2Execution: { title: string; input: string; phases: Array<{ name: string; desc: string }> };
    step3Engine: { title: string; subtitle: string; engines: Array<{ name: string; complexity: string; items: string[] }>; callout?: string };
    step4Applications: Array<{ title: string; subtitle: string; icon: string; detail: string }>;
  };
  footerTenets: string[];
}

export interface Studio3SemanticGraph {
  title: string;
  subtitle: string;
  tenets: string[];
  abstractionLevel: 'conceptual' | 'logical' | 'technical';
  layoutType?: 'freeform' | 'bands' | 'matrix' | 'conceptual_roadmap';
  templateId?: string;
  conceptualRoadmap?: Studio3ConceptualRoadmap;
  freeformElements?: Studio3FreeformElement[];
  bands: Studio3Band[];
  connections: Studio3Connection[];
}

function getAiClient(apiKey?: string): GoogleGenAI {
  const key = apiKey || process.env.GEMINI_API_KEY || '';
  return new GoogleGenAI({ apiKey: key });
}

/**
 * 🌟 Universal High-Craft Conceptual Roadmap Generator for Any Topic
 */
export function generateGenericConceptualRoadmap(
  prompt: string,
  intent: Studio3Intent
): Studio3ConceptualRoadmap {
  const p = (prompt || '').toLowerCase();
  const cleanTitle = (prompt || 'CONCEPTUAL LEARNING ROADMAP').toUpperCase();

  // 0. CLASSICAL MECHANICS: CENTRIPETAL VS CENTRIFUGAL FORCES & ROTATING FRAMES
  if (p.includes('centripetal') || p.includes('centrifugal') || (p.includes('circular') && p.includes('motion')) || p.includes('coriolis') || p.includes('rotating frame') || p.includes('5th') || p.includes('6 yr') || p.includes('kid')) {
    const isKid = p.includes('6 yr') || p.includes('kid') || p.includes('5th') || p.includes('child') || p.includes('simple');
    return {
      title: isKid
        ? 'SPINNING FORCES: CENTRIPETAL VS. CENTRIFUGAL FORCES EXPLAINED'
        : 'CENTRIPETAL VS. CENTRIFUGAL FORCES: INERTIAL & ROTATING REFERENCE FRAMES',
      subtitle: isKid
        ? 'Understanding Why Things Spin, Why You Feel Pushed Outward & How Inertia Works in Everyday Life'
        : 'Kinematics, Fictitious Inertial Forces, Rotating Coordinate Transformations & Circular Dynamics',
      milestones: [
        { title: isKid ? '🎠 SPINNING INTUITION' : '🔄 CIRCULAR MOTION INTUITION', color: 'blue', icon: '🔄' },
        { title: isKid ? '🎈 INERTIA & WHY OBJECTS FLY' : 'KINEMATICS & DYNAMICS', color: 'green', icon: '📐' },
        { title: isKid ? '🎢 EVERYDAY SPINNING EXAMPLES' : 'REFERENCE FRAME TAXONOMY', color: 'orange', icon: '⚖️' },
        { title: isKid ? '🚀 SPACE & ROLLER COASTERS 🌐' : '🔬 MODERN SCIENTIFIC FRONTIERS 🌐', color: 'yellow', icon: '🚀' }
      ],
      section1Analogy: {
        title: isKid ? 'The Spinning Bucket & Carousel Analogy' : 'The Rotating Carousel & Tetherball Analogy',
        actors: [
          { id: 'ground', name: isKid ? 'Friend on Ground (Watching)' : 'Ground Observer (Inertial Frame)', avatar: '🧍', x: 50, y: 170 },
          { id: 'pivot', name: isKid ? 'Center Pole / Your Hand' : 'Center Pivot / Axis', avatar: '🎯', x: 170, y: 220 },
          { id: 'rider', name: isKid ? 'You (Riding Carousel / Swinging Bucket)' : 'Rotating Observer (Carousel Rider)', avatar: '🎠', x: 290, y: 170 }
        ],
        relations: [
          { from: 'rider', to: 'pivot', label: isKid ? 'Inward Pull (String Tension)' : 'Real Centripetal Tension T' },
          { from: 'ground', to: 'rider', label: isKid ? 'Watches You Go in a Circle' : 'Views Circular Trajectory' }
        ],
        legend: [
          { icon: '🎯', label: 'Center Pivot' },
          { icon: '➡️', label: 'Real Inward Pull' },
          { icon: '⬅️', label: 'Apparent Outward Feeling' },
          { icon: '⚖️', label: 'Inertia (Straight Line)' }
        ],
        challengeCallout: isKid
          ? "The Big Secret: There is NO outward force! Your body wants to go STRAIGHT, but the seat pulls you IN!"
          : "The Challenge: Differentiating Real Forces (Newton's 3rd Law) from Non-Inertial Fictitious Forces"
      },
      section2Prerequisites: {
        title: isKid ? 'The Science Rules of Spinning' : 'Kinematics & Frame Transformation Physics',
        mathFormulas: [
          { name: isKid ? 'Inward Centripetal Force' : 'Centripetal Force & Acceleration', formula: 'F_c = m · (v² / r)  (Pull towards center)', icon: '📐' },
          { name: isKid ? "Newton's First Law (Inertia)" : 'Rotating Frame Equation of Motion', formula: 'Objects keep moving in a straight line unless pulled!', icon: '🔄' },
          { name: isKid ? 'The Outward Feeling (Centrifugal)' : 'Centrifugal Fictitious Term', formula: 'F_centrifugal = m · ω² r  (The apparent push you feel)', icon: '⚡' }
        ],
        checklist: [
          isKid ? '☑ Faster speed (v) means WAY more inward force needed (v²)' : "☑ Inertial Frame: Only Real Forces Exist (Tension, Gravity, Friction; ∑F = ma)",
          isKid ? '☑ Tighter turn (smaller radius r) means stronger pull needed' : "☑ Non-Inertial Rotating Frame: D'Alembert Inertial Centrifugal Force Added",
          isKid ? '☑ If you let go of the string, the ball flies STRAIGHT, not outward!' : '☑ Coriolis Force Term: F_cor = -2m(ω × v_rel) for Moving Bodies in Rotating Frames'
        ]
      },
      section3Taxonomy: {
        title: isKid ? '4 Real-Life Spinning Examples' : 'Reference Frame & Dynamics Taxonomy',
        variants: [
          { name: 'SWINGING BALL ON STRING', subtext: isKid ? 'String pulls inward • Ball circles' : "Newton's Laws Hold • Pure Inward F_c", diagramType: 'directed' },
          { name: 'CAR TURNING A CORNER', subtext: isKid ? 'Tires push car in • You slide out' : 'Accelerating Frame • Apparent Outward F_cf', diagramType: 'nodes' },
          { name: 'SPINNING CLOTHES DRYER', subtext: isKid ? 'Drum pushes clothes • Water flies through holes' : 'Normal Force Tilt • v = √(r g tan θ)', diagramType: 'layers' },
          { name: 'MERRY-GO-ROUND / ROLLER COASTER', subtext: isKid ? 'Hold on tight! Inward pull keeps you on' : 'Rotating Hull • g_eff = ω² R', diagramType: 'weighted' }
        ]
      },
      section4ModernFrontiers: {
        title: isKid ? 'Cool Real-World Inventions' : 'Modern Engineering & Astrophysical Applications',
        knowledgeGraphNodes: [
          { id: 'kg_cent', label: isKid ? 'Hospital\nCentrifuge' : 'Ultra\nCentrifuges', color: '#38BDF8' },
          { id: 'kg_atm', label: isKid ? 'Spinning\nHurricanes' : 'Atmospheric\nCyclones', color: '#F59E0B' },
          { id: 'kg_space', label: isKid ? 'Space Station\nGravity' : 'Space Habitat\nGravity', color: '#10B981' },
          { id: 'kg_gyro', label: isKid ? 'Phone Motion\nSensors' : 'MEMS\nGyroscopes', color: '#A855F7' }
        ],
        frameworkBullets: [
          isKid ? '🔬 • Medical Centrifuges spinning blood at 10,000 RPM to separate plasma' : '🔬 • Analytical Ultracentrifugation (Isotope & DNA Density Gradient Separation)',
          isKid ? '🌪️ • Giant swirling hurricanes powered by Earth spinning underneath' : '🌪️ • Atmospheric Geostrophic Wind Balance & Cyclonic Vortex Formation',
          isKid ? '🚀 • Giant rotating space wheels that create fake gravity for astronauts!' : '🚀 • Rotating O\'Neill Cylinders for Deep-Space Interplanetary Habitats'
        ]
      },
      bottomWorkflow: {
        title: isKid ? 'HOW SPINNING FORCES WORK STEP-BY-STEP' : 'CIRCULAR MOTION & DYNAMICS ANALYSIS PIPELINE',
        step1Problem: {
          title: isKid ? 'STEP 1: Pick Your Spinning Object' : 'STEP 1: Coordinate System Setup',
          subtitle: isKid ? 'Mass (m), Circle Size (r), Speed (v)' : 'Define Reference Frame & Motion Parameters',
          icon: '🎯 🔄',
          formula: 'Speed v, Radius r, Mass m',
          bullets: [
            isKid ? '• The heavier the object, the harder you must pull inward' : '• Choose reference frame: Ground Inertial vs. Co-Rotating',
            isKid ? '• The faster it spins, the force multiplies by speed squared (v²)' : '• Identify physical force origins (Tension, Gravity, Friction, Normal)'
          ]
        },
        step2Execution: {
          title: isKid ? 'STEP 2: The Inward Pull (Centripetal)' : 'STEP 2: Free-Body Diagram (FBD) Resolution',
          input: isKid ? 'Inward Force Vectors' : 'Force Vectors Acting on Mass m',
          phases: [
            { name: isKid ? '1. Grip / String / Friction Holds On' : '1. Radial Vector Resolution', desc: isKid ? 'Provides the real inward force pulling towards center' : 'Sum real physical inward components: ∑ F_r = T + f_s + mg sin θ' },
            { name: isKid ? '2. Path Bends into a Circle' : '2. Tangential & Vertical Balance', desc: isKid ? 'Continuous inward tug prevents object from flying straight' : 'Ensure orthogonal equilibrium: ∑ F_z = 0 (Normal vs Gravity)' },
            { name: isKid ? '3. What if the String Snaps?' : '3. Speed Limit Calculation', desc: isKid ? 'Object flies off in a straight tangent line!' : 'Determine max speed before slip: v_max = √(μ_s g r)' }
          ]
        },
        step3Engine: {
          title: isKid ? 'STEP 3: The Two Ways to View It' : 'STEP 3: Frame Transformation Engine',
          subtitle: isKid ? 'Standing Outside vs. Riding Inside' : 'Inertial vs. Non-Inertial Mathematical Equivalence',
          engines: [
            { name: isKid ? 'PERSON ON THE GROUND' : 'INERTIAL OBSERVER ENGINE', complexity: isKid ? 'Sees Real Physics' : '∑ F_radial = m v²/r', items: [isKid ? 'Sees the string pulling the ball inward every millisecond' : 'Real inward acceleration causes continuous direction change', isKid ? 'Knows there is NO mysterious outward pushing force' : 'No outward force exists in free-body diagram'] },
            { name: isKid ? 'PERSON RIDING INSIDE' : 'CO-ROTATING OBSERVER ENGINE', complexity: isKid ? 'Feels Fake Push' : '∑ F_radial - m ω² r = 0', items: [isKid ? 'Feels pushed against the door because their body wants to go straight' : 'Object appears stationary; centrifugal force balances inward tension', isKid ? 'Calls this feeling "Centrifugal Force" (an inertia illusion)' : 'Valid only inside non-inertial accelerating reference frame'] }
          ],
          callout: isKid ? '⚡ Both Views Agree: You Must Hold On Tight To Stay In The Circle!' : '⚡ Both Frames Predict Identical Physical Measurements & String Tension'
        },
        step4Applications: [
          { title: isKid ? 'Roller Coaster Loops' : 'Automotive Safety', subtitle: isKid ? 'Tear-Drop Clothoid Loops' : 'Banked Highway Turns', icon: '🎢', detail: isKid ? 'Keeps you in your seat even upside down!' : 'Frictionless speed limit' },
          { title: isKid ? 'Washing Machine Dryer' : 'Medical Centrifuges', subtitle: isKid ? 'Spin Cycle Drying' : 'Blood Plasma Separation', icon: '🌀', detail: isKid ? 'Water flies through holes while clothes stay in' : '10,000+ g sedimentation' },
          { title: isKid ? 'Car Highway Turn' : 'Orbital Satellites', subtitle: isKid ? 'Banked Curve Safety' : 'Geostationary Orbits', icon: '🚗', detail: isKid ? 'Tilted road helps tires push car inward' : 'Gravity = Centripetal force' },
          { title: isKid ? 'Artificial Gravity Space Station' : 'Space Station Habitat', subtitle: isKid ? 'Sci-Fi Spinning Ring' : 'Rotating Space Wheel', icon: '🛰️', detail: isKid ? 'Spinning creates fake gravity for astronauts!' : 'Smooth g-force transition' }
        ]
      },
      footerTenets: isKid
        ? ['INERTIA WANTS STRAIGHT LINES', 'CENTRIPETAL PULLS INWARD', 'CENTRIFUGAL IS THE INERTIA YOU FEEL']
        : ['FRAME DEPENDENCE IS MATHEMATICAL', 'PHYSICAL INVARIANTS ARE ABSOLUTE', 'NET FORCE DIRECTS ACCELERATION']
    };
  }

  // 1. PETROLEUM REFINING & GASOLINE EXTRACTION / CHEMICAL ENGINEERING
  if (p.includes('gasoline') || p.includes('petroleum') || p.includes('refining') || p.includes('crude oil') || p.includes('distillation') || p.includes('fractional') || p.includes('hydrocarbon')) {
    return {
      title: 'PETROLEUM REFINING & GASOLINE EXTRACTION: FROM CRUDE OIL TO HIGH-OCTANE FUEL',
      subtitle: 'Atmospheric & Vacuum Distillation, Catalytic Cracking (FCC), Hydrotreating & Octane Blending',
      milestones: [
        { title: '🛢️ CRUDE FEEDSTOCK & THERMAL INTUITION', color: 'blue', icon: '🛢️' },
        { title: 'THERMODYNAMICS & FRACTIONATION', color: 'green', icon: '🌡️' },
        { title: 'CONVERSION & CRACKING TAXONOMY', color: 'orange', icon: '⚡' },
        { title: '🔬 MODERN PETROCHEMICAL FRONTIERS 🌐', color: 'yellow', icon: '🌿' }
      ],
      section1Analogy: {
        title: 'Boiling-Point Molecular Sieve Analogy',
        actors: [
          { id: 'crude', name: 'Raw Crude Feedstock (C1-C50+)', avatar: '🛢️', x: 50, y: 170 },
          { id: 'tower', name: 'Fractional Distillation Column', avatar: '🏭', x: 170, y: 220 },
          { id: 'gasoline', name: 'Gasoline Fraction (C5-C10)', avatar: '⛽', x: 290, y: 170 }
        ],
        relations: [
          { from: 'crude', to: 'tower', label: 'Furnace Preheat 350°C' },
          { from: 'tower', to: 'gasoline', label: 'Condensation Tray 40-200°C' }
        ],
        legend: [
          { icon: '🛢️', label: 'Heavy Crude Feed' },
          { icon: '🌡️', label: 'Thermal Gradient' },
          { icon: '⛽', label: 'Light Naphtha' },
          { icon: '🔒', label: 'Desulfurization' }
        ],
        challengeCallout: 'The Challenge: High Sulfur Contamination & Low Natural Octane Number (RON < 70)'
      },
      section2Prerequisites: {
        title: 'Thermodynamic & Separation Physics',
        mathFormulas: [
          { name: "Raoult's Law & Vapor Pressure", formula: 'P_i = x_i · P_i*(T), K_i = y_i / x_i', icon: '🌡️' },
          { name: 'McCabe-Thiele Minimum Reflux', formula: 'R_min = (x_D - y\') / (y\' - x\'), N_min = ln(S) / ln(α)', icon: '📐' },
          { name: 'Anti-Knock Octane Index (AKI)', formula: 'AKI = (RON + MON) / 2 ≥ 87 - 93', icon: '⚡' }
        ],
        checklist: [
          '☑ Hydrocarbon Boiling Point Cuts (C1-C4 Gas, C5-C10 Gasoline, C11-C15 Kerosene, C16-C20 Diesel)',
          '☑ Acid-Zeolite Catalyzed C-C Bond Scission Mechanics',
          '☑ Hydrodesulfurization Stoichiometry: R-S-R\' + 2H₂ ➔ 2R-H + H₂S'
        ]
      },
      section3Taxonomy: {
        title: 'Refining Process Unit Taxonomy',
        variants: [
          { name: 'ATMOSPHERIC DISTILLATION', subtext: 'Physical Separation (25°C - 350°C)', diagramType: 'layers' },
          { name: 'FLUID CATALYTIC CRACKING (FCC)', subtext: 'Heavy Gas Oil ➔ Light Gasoline', diagramType: 'directed' },
          { name: 'CATALYTIC REFORMING', subtext: 'Naphthenes ➔ High-Octane Aromatics', diagramType: 'nodes' },
          { name: 'ALKYLATION & ISOMERIZATION', subtext: 'Isobutane + Olefins ➔ Alkylate (RON 96+)', diagramType: 'weighted' }
        ]
      },
      section4ModernFrontiers: {
        title: 'Modern Refining & Clean Energy Frontiers',
        knowledgeGraphNodes: [
          { id: 'kg_h2', label: 'Hydrogen\nHydrotreater', color: '#38BDF8' },
          { id: 'kg_bio', label: 'Bio-Ethanol\nE10 / E85', color: '#10B981' },
          { id: 'kg_ccus', label: 'Carbon\nCapture CCUS', color: '#F59E0B' },
          { id: 'kg_apc', label: 'APC Digital\nTwin Engine', color: '#A855F7' }
        ],
        frameworkBullets: [
          '🔬 • Ultra-Low Sulfur Gasoline Standards (ULSG < 10 ppm Sulfur)',
          '🌿 • Synthetic Renewable e-Fuels & Fischer-Tropsch Synthesis',
          '💻 • Real-Time NIR Spectroscopy Closed-Loop Octane Blending'
        ]
      },
      bottomWorkflow: {
        title: 'END-TO-END GASOLINE EXTRACTION & REFINING PIPELINE',
        step1Problem: {
          title: 'STEP 1: Desalting & Furnace Preheat',
          subtitle: 'Crude Feedstock Pre-Treatment',
          icon: '🛢️ 🔥',
          formula: 'Crude API Gravity: 30° - 45° API',
          bullets: ['• Electrostatic desalting removes inorganic chlorides', '• Direct-fired furnace heats crude stream to 350°C - 370°C']
        },
        step2Execution: {
          title: 'STEP 2: Fractional Distillation Column',
          input: 'Preheated Two-Phase Crude Stream',
          phases: [
            { name: '1. Flash Zone Vaporization', desc: 'Vapor rises through multi-stage sieve bubble cap trays' },
            { name: '2. Top Naphtha Draw (40°C - 160°C)', desc: 'Extract straight-run gasoline & light naphtha fraction' },
            { name: '3. Side-Stream Stripping', desc: 'Separate Kerosene/Jet Fuel (160-250°C) and Diesel (250-350°C)' }
          ]
        },
        step3Engine: {
          title: 'STEP 3: Catalytic Cracking & Reforming',
          subtitle: 'Chemical Conversion & Octane Enhancement',
          engines: [
            { name: 'FLUID CATALYTIC CRACKER (FCC)', complexity: '500°C Zeolite Bed', items: ['Cracks long-chain vacuum gas oils into high-value C5-C10 blendstock', 'Continuous catalyst regeneration cycle'] },
            { name: 'CONTINUOUS CATALYTIC REFORMER (CCR)', complexity: 'Pt/Re Catalyst', items: ['Dehydrogenates cycloalkanes into high-octane aromatics (Toluene/Xylene)', 'Boosts research octane number from RON 60 to RON 102'] }
          ],
          callout: '⚡ High Yield Conversion: > 45% Gasoline Yield per Barrel'
        },
        step4Applications: [
          { title: 'Automotive Mogas', subtitle: 'Regular & Premium Gasoline', icon: '🚗', detail: 'RON 87 / 91 / 93 Octane' },
          { title: 'Aviation Turbine Fuel', subtitle: 'Commercial Jet A-1 / JP-8', icon: '✈️', detail: 'Freeze point < -47°C' },
          { title: 'Petrochemical Naphtha', subtitle: 'Ethylene / Propylene Steam Cracker', icon: '🧪', detail: 'Plastics & Polymers' },
          { title: 'Low-Sulfur Diesel (ULSD)', subtitle: 'Transport & Freight Rail', icon: '🚛', detail: 'Cetane Index > 51' }
        ]
      },
      footerTenets: ['MAXIMUM HIGH-OCTANE YIELD', 'ULTRA-LOW SULFUR (ULSG < 10 PPM)', 'ENERGY INTENSITY OPTIMIZATION']
    };
  }

  // 1. NEURAL NETWORKS & DEEP LEARNING
  if (p.includes('neural') || p.includes('deep learning') || p.includes('backprop') || p.includes('gradient') || p.includes('perceptron') || p.includes('cnn') || p.includes('rnn')) {
    return {
      title: 'NEURAL NETWORKS & DEEP LEARNING: FROM PERCEPTRONS TO BACKPROPAGATION',
      subtitle: 'Non-Linear Activation, Differentiable Graphs, Gradient Optimization & Generalization',
      milestones: [
        { title: '🧭 BIOLOGICAL & ARTIFICIAL INTUITION', color: 'blue', icon: '🧠' },
        { title: 'MATHEMATICAL FORMULATIONS', color: 'green', icon: '📐' },
        { title: 'NETWORK TOPOLOGY TAXONOMY', color: 'orange', icon: '🧬' },
        { title: '🔬 DEEP LEARNING FRONTIERS 🌐', color: 'yellow', icon: '🚀' }
      ],
      section1Analogy: {
        title: 'Synaptic Signal Propagation Analogy',
        actors: [
          { id: 'in', name: 'Input Dendrite (X)', avatar: '📥', x: 50, y: 170 },
          { id: 'soma', name: 'Soma Cell Body (Σ)', avatar: '🧠', x: 170, y: 220 },
          { id: 'axon', name: 'Axon Terminal (y)', avatar: '⚡', x: 290, y: 170 }
        ],
        relations: [
          { from: 'in', to: 'soma', label: 'Synaptic Weight w_i' },
          { from: 'soma', to: 'axon', label: 'Activation σ(z)' }
        ],
        legend: [
          { icon: '📥', label: 'Input Vector' },
          { icon: '⚖️', label: 'Weights & Bias' },
          { icon: '⚡', label: 'Activation' },
          { icon: '🎯', label: 'Target Loss' }
        ],
        challengeCallout: 'The Challenge: Vanishing & Exploding Gradients in Deep Architectures'
      },
      section2Prerequisites: {
        title: 'Linear Algebra & Calculus Foundations',
        mathFormulas: [
          { name: 'Forward Logit Formulation', formula: 'z = W^T x + b, a = σ(z)', icon: '📐' },
          { name: 'Chain Rule (Backpropagation)', formula: '∂L/∂W = (∂L/∂a)(∂a/∂z)(∂z/∂W)', icon: '∂' },
          { name: 'Loss Function (Cross-Entropy)', formula: 'L(y, ŷ) = -∑ y_i log(ŷ_i)', icon: '📉' }
        ],
        checklist: [
          '☑ Multivariable Matrix Derivatives & Jacobians',
          '☑ Non-Linear Activation Functions (ReLU, GELU, Sigmoid)',
          '☑ Convex vs Non-Convex Optimization Surfaces'
        ]
      },
      section3Taxonomy: {
        title: 'Taxonomy of Neural Architectures',
        variants: [
          { name: 'MULTI-LAYER PERCEPTRON (MLP)', subtext: 'Dense Feedforward Layers', diagramType: 'layers' },
          { name: 'CONVOLUTIONAL (CNN)', subtext: 'Spatial Receptive Fields', diagramType: 'grid' },
          { name: 'RECURRENT (RNN / LSTM)', subtext: 'Sequential Temporal Loops', diagramType: 'directed' },
          { name: 'TRANSFORMER ATTENTION', subtext: 'Scaled Dot-Product Self-Attention', diagramType: 'nodes' }
        ]
      },
      section4ModernFrontiers: {
        title: 'Modern Deep Learning Ecosystem',
        knowledgeGraphNodes: [
          { id: 'kg_attn', label: 'Self\nAttention', color: '#38BDF8' },
          { id: 'kg_diff', label: 'Diffusion\nModels', color: '#F59E0B' },
          { id: 'kg_moe', label: 'Mixture\nof Experts', color: '#10B981' },
          { id: 'kg_rlhf', label: 'RLHF &\nDPO', color: '#A855F7' }
        ],
        frameworkBullets: [
          '🔬 • Scaling Laws: Chinchilla & Compute-Optimal Compute',
          '🧠 • LoRA / QLoRA Parameter-Efficient Fine-Tuning',
          '💻 • JAX / PyTorch TPU & GPU Distributed Sharding (vLLM / Megatron)'
        ]
      },
      bottomWorkflow: {
        title: 'END-TO-END TRAINING & INFERENCE WORKFLOW',
        step1Problem: {
          title: 'STEP 1: Data & Objective',
          subtitle: 'Supervised Feature Embeddings',
          icon: '📊 🎯',
          formula: 'D = {(x_1, y_1), ..., (x_N, y_N)}',
          bullets: ['• Batch normalization & tokenization', '• Zero-mean unit variance normalization']
        },
        step2Execution: {
          title: 'STEP 2: Forward & Loss Pass',
          input: 'Mini-Batch Tensor X ∈ ℝ^(B×D)',
          phases: [
            { name: '1. Layer-by-Layer Activation', desc: 'Compute z^(l) = W^(l) a^(l-1) + b^(l)' },
            { name: '2. Output Softmax Vector', desc: 'ŷ = exp(z_i) / ∑ exp(z_j)' },
            { name: '3. Loss Metric Computation', desc: 'Compute scalar batch loss J(θ)' }
          ]
        },
        step3Engine: {
          title: 'STEP 3: Backward Optimization',
          subtitle: 'Autograd & Adaptive Optimizers',
          engines: [
            { name: 'ADAMW OPTIMIZER', complexity: 'O(Parameters)', items: ['First & second moment estimation (m_t, v_t)', 'Decoupled weight decay regularization'] },
            { name: 'GRADIENT CLIPPING & SCHEDULING', complexity: 'Cosine Annealing', items: ['Global gradient norm thresholding ||g|| ≤ 1.0', 'Warmup linear learning rate schedule'] }
          ],
          callout: '⚡ Guaranteed Convex Subspace Convergence'
        },
        step4Applications: [
          { title: 'Computer Vision', subtitle: 'Object Detection & Segmentation', icon: '👁️', detail: 'Real-time YOLO / ViT' },
          { title: 'Generative LLMs', subtitle: 'Gemini / Claude / GPT Reasoning', icon: '🤖', detail: 'Autoregressive token generation' },
          { title: 'Autonomous Driving', subtitle: 'Perception & Trajectory Planning', icon: '🚗', detail: 'End-to-end multi-modal sensor fusion' },
          { title: 'Biotech Discovery', subtitle: 'AlphaFold Protein Structure', icon: '🧬', detail: 'Atomic-resolution folding' }
        ]
      },
      footerTenets: ['DIFFERENTIABILITY FIRST', 'COMPUTE SCALING HYPOTHESIS', 'GENERALIZATION OVER MEMORIZATION']
    };
  }

  // 2. TRANSFORMERS & LARGE LANGUAGE MODELS
  if (p.includes('transformer') || p.includes('attention') || p.includes('llm') || p.includes('rag') || p.includes('gpt') || p.includes('gemini') || p.includes('prompt')) {
    return {
      title: 'TRANSFORMER ARCHITECTURE & ATTENTION MECHANISMS: FROM TOKENS TO REASONING',
      subtitle: 'Multi-Head Scaled Dot-Product Attention, Positional Encodings & Autoregressive Decoding',
      milestones: [
        { title: '🧭 QUERY, KEY & VALUE INTUITION', color: 'blue', icon: '🔍' },
        { title: 'ATTENTION MATHEMATICS', color: 'green', icon: '📐' },
        { title: 'LAYER & BLOCK TAXONOMY', color: 'orange', icon: '🧱' },
        { title: '🔬 MODERN LLM ARCHITECTURES 🌐', color: 'yellow', icon: '⚡' }
      ],
      section1Analogy: {
        title: 'Filing Cabinet & Semantic Lookup Analogy',
        actors: [
          { id: 'q', name: 'Query (What I want)', avatar: '🔍', x: 50, y: 170 },
          { id: 'k', name: 'Key (File Label)', avatar: '🏷️', x: 170, y: 220 },
          { id: 'v', name: 'Value (File Content)', avatar: '📑', x: 290, y: 170 }
        ],
        relations: [
          { from: 'q', to: 'k', label: 'Dot Product Compatibility' },
          { from: 'k', to: 'v', label: 'Softmax Weighted Sum' }
        ],
        legend: [
          { icon: '🔍', label: 'Query Vector Q' },
          { icon: '🏷️', label: 'Key Vector K' },
          { icon: '📑', label: 'Value Vector V' },
          { icon: '📊', label: 'Attention Matrix' }
        ],
        challengeCallout: 'The Challenge: O(N²) Quadratic Memory & Compute Complexity in Long Context'
      },
      section2Prerequisites: {
        title: 'Scaled Dot-Product Attention Formalisms',
        mathFormulas: [
          { name: 'Scaled Dot-Product Attention', formula: 'Attention(Q,K,V) = softmax(QK^T / √d_k) V', icon: '📐' },
          { name: 'Multi-Head Attention (MHA)', formula: 'MultiHead(Q,K,V) = Concat(head_1..head_h) W^O', icon: '🔀' },
          { name: 'Rotary Position Embeddings (RoPE)', formula: 'R_Θ,m^d x_m = (x_m1 + i x_m2) e^(i m θ)', icon: '🔄' }
        ],
        checklist: [
          '☑ Bidirectional vs Causal Autoregressive Masking',
          '☑ Residual Add & RMSNorm / LayerNorm Normalization',
          '☑ KV-Cache Memory Consumption Calculation'
        ]
      },
      section3Taxonomy: {
        title: 'Transformer Architecture Family Taxonomy',
        variants: [
          { name: 'ENCODER-ONLY (BERT)', subtext: 'Bidirectional Context Extraction', diagramType: 'layers' },
          { name: 'DECODER-ONLY (GPT/Gemini)', subtext: 'Autoregressive Next-Token Gen', diagramType: 'directed' },
          { name: 'ENCODER-DECODER (T5)', subtext: 'Cross-Attention Sequence-to-Sequence', diagramType: 'nodes' },
          { name: 'MIXTURE OF EXPERTS (MoE)', subtext: 'Sparse Dynamic Top-K Routing', diagramType: 'tree' }
        ]
      },
      section4ModernFrontiers: {
        title: 'Modern Generative AI Frontiers',
        knowledgeGraphNodes: [
          { id: 'kg_flash', label: 'Flash\nAttention 3', color: '#38BDF8' },
          { id: 'kg_mamba', label: 'State Space\nModels (SSM)', color: '#F59E0B' },
          { id: 'kg_spec', label: 'Speculative\nDecoding', color: '#10B981' },
          { id: 'kg_agent', label: 'Autonomous\nAgents & Tooling', color: '#A855F7' }
        ],
        frameworkBullets: [
          '🔬 • RingAttention & Infinite Context Windows (1M+ Tokens)',
          '🧠 • Direct Preference Optimization (DPO) & Constitutional AI',
          '💻 • vLLM PagedAttention & Continuous Batching Serving'
        ]
      },
      bottomWorkflow: {
        title: 'AUTOREGRESSIVE TOKEN GENERATION WORKFLOW',
        step1Problem: {
          title: 'STEP 1: Prompt Tokenization',
          subtitle: 'BPE Tokenizer to High-Dim Vectors',
          icon: '🔤 📥',
          formula: 'Tokens T = [t_1, t_2, ..., t_k] ∈ ℝ^(k × d_model)',
          bullets: ['• Byte-Pair Encoding (BPE) subword splitting', '• RoPE positional injection into Q and K']
        },
        step2Execution: {
          title: 'STEP 2: Multi-Layer Transformer Pass',
          input: 'Input Embeddings + KV-Cache',
          phases: [
            { name: '1. Grouped-Query Attention (GQA)', desc: 'Compute QK^T / √d_k with cached K and V' },
            { name: '2. SwiGLU Feed-Forward Network', desc: 'Non-linear feature expansion FFN(x) = (xW_1 ⊗ σ(xW_2)) W_3' },
            { name: '3. Residual Connection & RMSNorm', desc: 'x_out = RMSNorm(x + Attention(x))' }
          ]
        },
        step3Engine: {
          title: 'STEP 3: Logit Sampling & Decoding',
          subtitle: 'Probability Vector Sampling Engine',
          engines: [
            { name: 'TEMPERATURE & TOP-P (NUCLEUS)', complexity: 'Softmax Vector', items: ['P(w_i) = exp(z_i / T) / ∑ exp(z_j / T)', 'Dynamic nucleus cumulative probability threshold'] },
            { name: 'KV-CACHE ACCELERATOR', complexity: 'O(1) Token Step', items: ['Reuse previously computed Key & Value matrices', 'Eliminates redundant prompt re-computation'] }
          ],
          callout: '🚀 Sub-10ms Time-to-First-Token (TTFT) Execution'
        },
        step4Applications: [
          { title: 'Code Synthesis', subtitle: 'Multi-File Architecture', icon: '💻', detail: 'Antigravity / Copilot' },
          { title: 'Enterprise RAG', subtitle: 'Vertex AI Grounded Search', icon: '🔍', detail: 'Vector index retrieval' },
          { title: 'Agentic Workflows', subtitle: 'Tool Use & Multi-Turn Planning', icon: '🤖', detail: 'Function calling loop' },
          { title: 'Multi-Modal Reasoning', subtitle: 'Audio, Vision & Video Synthesis', icon: '🎥', detail: 'Native multimodal tokens' }
        ]
      },
      footerTenets: ['ATTENTION IS ALL YOU NEED', 'AUTOREGRESSIVE EFFICIENCY', 'MULTI-MODAL UNIFICATION']
    };
  }

  // 3. GENERIC / UNIVERSAL CONCEPTUAL ROADMAP (ANY TOPIC UNDER THE SUN)
  return {
    title: `${cleanTitle}: COMPREHENSIVE LEARNING ROADMAP`,
    subtitle: `First-Principles Intuition, Mathematical Foundations, Taxonomy & Execution Pipeline for ${cleanTitle}`,
    milestones: [
      { title: '🧭 CORE INTUITION & ANALOGY', color: 'blue', icon: '💡' },
      { title: 'PREREQUISITES & FORMALISMS', color: 'green', icon: '📐' },
      { title: 'STRUCTURAL TAXONOMY', color: 'orange', icon: '🏗️' },
      { title: '🔬 MODERN ECOSYSTEM FRONTIERS 🌐', color: 'yellow', icon: '🚀' }
    ],
    section1Analogy: {
      title: 'First-Principles Visual Metaphor',
      actors: [
        { id: 'c1', name: 'Producer / Source', avatar: '🟢', x: 50, y: 170 },
        { id: 'c2', name: 'Core Engine / Mediator', avatar: '⚙️', x: 170, y: 220 },
        { id: 'c3', name: 'Consumer / Sink', avatar: '🔵', x: 290, y: 170 }
      ],
      relations: [
        { from: 'c1', to: 'c2', label: 'Ingress Protocol' },
        { from: 'c2', to: 'c3', label: 'Egress State' }
      ],
      legend: [
        { icon: '🟢', label: 'Source Entity' },
        { icon: '⚙️', label: 'Transformation' },
        { icon: '🔵', label: 'Target State' },
        { icon: '🔒', label: 'Invariant' }
      ],
      challengeCallout: `Core Challenge: Scaling, Reliability & Complexity Invariance for ${cleanTitle}`
    },
    section2Prerequisites: {
      title: 'Theoretical & Mathematical Foundations',
      mathFormulas: [
        { name: 'System State Representation', formula: 'S(t) = f(S(t-1), X(t), θ)', icon: '📐' },
        { name: 'Conservation & Invariant Constraint', formula: '∑ Flow_in = ∑ Flow_out + ΔStorage', icon: '⚖️' },
        { name: 'Asymptotic Complexity Bounds', formula: 'Time: O(N log N) | Space: O(N)', icon: '⚡' }
      ],
      checklist: [
        '☑ Foundational Axiom Verification',
        '☑ Invariant Stability & Convergence Guarantee',
        '☑ Formal Verification & Error Bounds'
      ]
    },
    section3Taxonomy: {
      title: 'Classification & Architecture Variants',
      variants: [
        { name: 'SYNCHRONOUS / DIRECT', subtext: 'Immediate state transfer', diagramType: 'nodes' },
        { name: 'ASYNCHRONOUS / EVENT-DRIVEN', subtext: 'Decoupled message buffer', diagramType: 'directed' },
        { name: 'DISTRIBUTED / CONSENSUS', subtext: 'Quorum fault tolerance', diagramType: 'weighted' },
        { name: 'HIERARCHICAL / TIERED', subtext: 'Structured abstraction layers', diagramType: 'tree' }
      ]
    },
    section4ModernFrontiers: {
      title: 'Modern Ecosystem & Scalability Frontiers',
      knowledgeGraphNodes: [
        { id: 'kg1', label: 'Cloud\nNative', color: '#38BDF8' },
        { id: 'kg2', label: 'Automated\nObservability', color: '#F59E0B' },
        { id: 'kg3', label: 'Zero Trust\nSecurity', color: '#10B981' },
        { id: 'kg4', label: 'AI/ML\nIntelligence', color: '#A855F7' }
      ],
      frameworkBullets: [
        '🔬 • Modern High-Performance Cloud Architecture',
        '🧠 • Autonomous Intelligent Self-Healing & Scaling',
        '💻 • Global Distributed Low-Latency Infrastructure'
      ]
    },
    bottomWorkflow: {
      title: 'END-TO-END EXECUTION WORKFLOW PIPELINE',
      step1Problem: {
        title: 'STEP 1: Problem Definition',
        subtitle: 'Input Specification & Boundary Conditions',
        icon: '🎯 📋',
        formula: 'min Metric J(θ) s.t. Constraints',
        bullets: ['• Formal input payload ingestion', '• Validation and schema verification']
      },
      step2Execution: {
        title: 'STEP 2: Processing Engine',
        input: 'Raw Input Stream & Configuration',
        phases: [
          { name: '1. Ingestion & Transformation', desc: 'Parse, sanitize, and extract state parameters' },
          { name: '2. Core Computation Engine', desc: 'Execute state transitions and business logic' },
          { name: '3. State Persistence & Audit', desc: 'Commit immutable audit record to persistent store' }
        ]
      },
      step3Engine: {
        title: 'STEP 3: Engine Optimization',
        subtitle: 'Throughput & Reliability Mechanics',
        engines: [
          { name: 'CORE EXECUTION ENGINE', complexity: 'Sub-10ms Latency', items: ['High-throughput parallel worker pool', 'In-memory caching and lock-free concurrency'] },
          { name: 'FAULT TOLERANCE & RECOVERY', complexity: '99.999% SLA', items: ['Automated retry with exponential backoff', 'Active-active multi-region failover replication'] }
        ],
        callout: '⚡ High-Throughput Convergence & 99.999% Availability'
      },
      step4Applications: [
        { title: 'Real-Time Processing', subtitle: 'Sub-second Analytics', icon: '⚡', detail: 'High-throughput stream' },
        { title: 'Enterprise Cloud', subtitle: 'Auto-Scaling Infrastructure', icon: '☁️', detail: 'Managed platform' },
        { title: 'Security & Compliance', subtitle: 'Zero-Trust Architecture', icon: '🛡️', detail: 'End-to-end encryption' },
        { title: 'Autonomous Intelligence', subtitle: 'AI-Driven Decisioning', icon: '🤖', detail: 'Continuous feedback loop' }
      ]
    },
    footerTenets: ['PRODUCER INDEPENDENCE', 'CONSUMER INDEPENDENCE', 'FORMAT, NOT PLATFORM']
  };
}

/**
 * ⚡ Truly Dynamic First-Principles Graph Generator (Fallback Engine)
 */
export function generateDynamicFirstPrinciplesGraph(
  prompt: string,
  intent: Studio3Intent
): Studio3SemanticGraph {
  const p = (prompt || '').toLowerCase();
  const isMultiBand = intent.topologyGrammar === 'composite_multi_band' || intent.actionType === 'band_expansion';

  // 0. UNIVERSAL CONCEPTUAL LEARNING ROADMAP (APPLIES TO ANY TOPIC UNDER THE SUN!)
  if (
    intent.abstractionLevel === 'conceptual' ||
    p.startsWith('teach me') ||
    p.startsWith('explain') ||
    p.includes('roadmap') ||
    p.includes('how does') ||
    p.includes('concepts')
  ) {
    const conceptualRoadmap = generateGenericConceptualRoadmap(prompt, intent);
    return {
      title: conceptualRoadmap.title,
      subtitle: conceptualRoadmap.subtitle || 'Conceptual Learning Roadmap',
      tenets: conceptualRoadmap.footerTenets,
      abstractionLevel: 'conceptual',
      layoutType: 'conceptual_roadmap',
      conceptualRoadmap,
      bands: [],
      connections: []
    };
  }
  // 1. FINANCIAL / LEDGER DOMAIN
  if (p.includes('ledger') || p.includes('financial') || p.includes('spanner') || p.includes('payment') || p.includes('transaction')) {
    const rawGraph: Studio3SemanticGraph = {
      title: 'ZERO-TRUST MULTI-REGION FINANCIAL LEDGER ARCHITECTURE',
      subtitle: 'Active-Active ACID Ledger with Cloud Spanner TrueTime, Cloud Armor WAF & Cloud KMS CMEK',
      tenets: ['ZERO TRUST SECURITY', 'TRUETIME ACTIVE-ACTIVE', 'CUSTOMER MANAGED ENCRYPTION'],
      abstractionLevel: intent.abstractionLevel,
      bands: [
        {
          id: 'band_ledger_core',
          title: 'CORE FINANCIAL LEDGER & ZERO-TRUST BOUNDARIES',
          badge: 'TIER-1 TRANSACTION ENGINE',
          type: 'columns',
          columns: [
            {
              id: 'col_ingress',
              header: 'EDGE SECURITY & ZERO TRUST INGRESS',
              headerColor: 'blue',
              subtitle: 'Multi-region DDoS protection and identity verification',
              cards: [
                {
                  id: 'card_armor',
                  title: 'Google Cloud Armor WAF',
                  iconKey: 'cloud_armor',
                  badge: 'Protected',
                  items: [
                    'L3/L4/L7 DDoS mitigation & rate-limiting',
                    'OWASP Top 10 automated threat filtering',
                    'Custom WAF rules for banking APIs'
                  ]
                },
                {
                  id: 'card_iap',
                  title: 'Identity-Aware Proxy (IAP)',
                  iconKey: 'iap',
                  items: [
                    'Context-aware device & user verification',
                    'Zero-trust mTLS encrypted transport'
                  ]
                }
              ]
            },
            {
              id: 'col_compute',
              header: 'APPLICATION & TRANSACTION PROCESSING',
              headerColor: 'teal',
              subtitle: 'Stateless auto-scaling ledger microservices',
              cards: [
                {
                  id: 'card_gke',
                  title: 'GKE Autopilot Microservices',
                  iconKey: 'gke_autopilot',
                  items: [
                    'Ledger Settlement Service (gRPC)',
                    'Double-entry transaction validator',
                    'High-availability multi-zone deployment'
                  ]
                },
                {
                  id: 'card_pubsub',
                  title: 'Cloud Pub/Sub Event Stream',
                  iconKey: 'cloud_run',
                  items: [
                    'Guaranteed at-least-once message delivery',
                    'Dead-letter queue (DLQ) for failed batches'
                  ]
                }
              ]
            },
            {
              id: 'col_data',
              header: 'PERSISTENCE & ENCRYPTION AT REST',
              headerColor: 'purple',
              subtitle: 'Global ACID consistency and hardware encryption',
              cards: [
                {
                  id: 'card_spanner',
                  title: 'Cloud Spanner Multi-Region',
                  iconKey: 'spanner',
                  badge: '99.999% SLA',
                  highlight: true,
                  codeSnippet: `CREATE TABLE FinancialLedger (\n  AccountID STRING(36),\n  Balance NUMERIC,\n  Timestamp TIMESTAMP OPTIONS (allow_commit_timestamp=true)\n) PRIMARY KEY (AccountID);`
                },
                {
                  id: 'card_kms',
                  title: 'Cloud KMS CMEK Encryption',
                  iconKey: 'cloud_armor',
                  items: [
                    'Hardware Security Module (HSM Level 3)',
                    'Automatic 90-day cryptographic key rotation'
                  ]
                }
              ]
            }
          ]
        }
      ],
      connections: []
    };
    return enrichAndSanitizeSemanticGraph(rawGraph, intent);
  }

  // 2. VERTEX AI / RAG / AGENTIC DOMAIN
  if (p.includes('rag') || p.includes('agent') || p.includes('gemini') || p.includes('vector') || p.includes('embedding')) {
    const rawGraph: Studio3SemanticGraph = {
      title: 'VERTEX AI ENTERPRISE AGENTIC RAG KNOWLEDGE MESH',
      subtitle: 'Multi-Agent Autonomous Orchestration, ScaNN Vector Search & BigQuery Grounding',
      tenets: ['GROUNDED CITATIONS', 'ENTERPRISE ZERO-EGRESS', 'VECTOR GRAPH RETRIEVAL'],
      abstractionLevel: intent.abstractionLevel,
      bands: [
        {
          id: 'band_rag_core',
          title: 'AGENTIC ORCHESTRATION & VECTOR SEARCH',
          badge: 'GENAI PLATFORM',
          type: 'columns',
          columns: [
            {
              id: 'col_rag_ingress',
              header: 'CLIENT & ORCHESTRATION LAYER',
              headerColor: 'blue',
              subtitle: 'Multimodal input processing and agent coordination',
              cards: [
                {
                  id: 'card_gemini',
                  title: 'Gemini 3.1 Pro Core Agent',
                  iconKey: 'gemini',
                  items: ['Multi-turn intent decomposition', 'Tool invocation and function calling', 'Safety & guardrail policy validation']
                }
              ]
            },
            {
              id: 'col_rag_retrieval',
              header: 'VECTOR SEARCH & EMBEDDINGS',
              headerColor: 'teal',
              subtitle: 'Sub-10ms semantic similarity retrieval',
              cards: [
                {
                  id: 'card_vector',
                  title: 'Vertex AI Vector Search (ScaNN)',
                  iconKey: 'vertex_vector_search',
                  badge: 'Sub-10ms',
                  items: ['Hierarchical Navigable Small World (HNSW)', 'Hybrid dense-sparse retrieval', 'Real-time index streaming mutation']
                }
              ]
            },
            {
              id: 'col_rag_storage',
              header: 'ENTERPRISE DATA LAKEHOUSE',
              headerColor: 'purple',
              subtitle: 'Authoritative data grounding',
              cards: [
                {
                  id: 'card_bq',
                  title: 'Google BigQuery & GCS',
                  iconKey: 'bigquery',
                  items: ['Unstructured PDF/Doc embeddings in GCS', 'Structured transactional telemetry in BigQuery']
                }
              ]
            }
          ]
        }
      ],
      connections: []
    };
    return enrichAndSanitizeSemanticGraph(rawGraph, intent);
  }

  // 3. TRANSFORMER ARCHITECTURE
  if (p.includes('transformer') || p.includes('attention') || p.includes('neural')) {
    const rawGraph: Studio3SemanticGraph = {
      title: 'TRANSFORMER NEURAL ARCHITECTURE & ATTENTION FLOW',
      subtitle: 'Multi-Head Self-Attention, Positional Embeddings & Autoregressive Decoding',
      tenets: ['ATTENTION IS ALL YOU NEED', 'AUTOREGRESSIVE DECODING', 'PARALLEL ENCODING'],
      abstractionLevel: intent.abstractionLevel,
      bands: [
        {
          id: 'band_transformer_core',
          title: 'TRANSFORMER ENCODER-DECODER MESH',
          badge: 'DEEP LEARNING MODEL',
          type: 'columns',
          columns: [
            {
              id: 'col_embedding',
              header: 'INPUT EMBEDDING & POSITIONAL ENCODING',
              headerColor: 'blue',
              subtitle: 'Tokenization and Vector Space Representation',
              cards: [
                {
                  id: 'card_emb',
                  title: 'Token & Positional Embeddings',
                  iconKey: 'vertex_vector_search',
                  items: ['Learned token embedding projection matrix', 'Sinusoidal / RoPE positional vectors', 'Addition & Dropout layer regularization']
                }
              ]
            },
            {
              id: 'col_encoder',
              header: 'MULTI-HEAD ATTENTION & ENCODER STACK',
              headerColor: 'teal',
              subtitle: 'Bidirectional Contextual Feature Extraction',
              cards: [
                {
                  id: 'card_attn',
                  title: 'Multi-Head Self-Attention Block',
                  iconKey: 'gemini',
                  items: ['Scaled Dot-Product: Softmax(QK^T / √d_k)V', '8-32 parallel subspace projection heads', 'Residual Add & Pre-LayerNorm (RMSNorm)']
                },
                {
                  id: 'card_ffn',
                  title: 'Feed-Forward Network (FFN)',
                  iconKey: 'gemini',
                  items: ['Pointwise two-layer dense transformation', 'SwiGLU / GELU non-linear activations']
                }
              ]
            },
            {
              id: 'col_decoder',
              header: 'DECODER & AUTOREGRESSIVE GENERATION',
              headerColor: 'purple',
              subtitle: 'Cross-Attention and Token Probability Output',
              cards: [
                {
                  id: 'card_dec',
                  title: 'Masked Decoder & Cross-Attention',
                  iconKey: 'gemini',
                  items: ['Causal masking for autoregressive inference', 'Cross-attention over encoder key-values', 'Final linear layer to vocabulary logits']
                }
              ]
            }
          ]
        }
      ],
      connections: [
        {
          fromId: 'card_emb',
          toId: 'card_attn',
          label: '❶ Embeddings & Positional Vectors (Dense)',
          style: 'solid_blue'
        },
        {
          fromId: 'card_attn',
          toId: 'card_ffn',
          label: '❷ Contextual Representation H',
          style: 'solid_blue'
        },
        {
          fromId: 'card_ffn',
          toId: 'card_dec',
          label: '❸ Key/Value Memory Matrix (Cross-Attn)',
          style: 'dashed_purple'
        }
      ]
    };
    return enrichAndSanitizeSemanticGraph(rawGraph, intent);
  }

  // 3. MACHINE LEARNING & STATISTICAL MODELING DOMAIN (e.g. Logistic Regression, Classification, SGD)
  if (p.includes('logistic') || p.includes('regression') || p.includes('classification') || p.includes('machine learning') || p.includes('ml model') || p.includes('gradient descent')) {
    const rawGraph: Studio3SemanticGraph = {
      title: 'LOGISTIC REGRESSION & BINARY CLASSIFICATION WORKFLOW',
      subtitle: 'Mathematical Formulation, Sigmoid Mapping, Binary Cross-Entropy Loss & Vertex AI Inference',
      tenets: ['MATHEMATICAL PRECISION', 'PROBABILISTIC CLASSIFICATION', 'CONTINUOUS DRIFT OBSERVABILITY'],
      abstractionLevel: intent.abstractionLevel,
      bands: [
        {
          id: 'band_ml_core',
          title: 'END-TO-END MACHINE LEARNING WORKFLOW & MATHEMATICAL ARCHITECTURE',
          badge: 'STATISTICAL LEARNING ENGINE',
          type: 'columns',
          columns: [
            {
              id: 'col_data',
              header: 'DATA ACQUISITION & FEATURE STORE',
              headerColor: 'blue',
              subtitle: 'Labeled ground truth and feature scaling',
              cards: [
                {
                  id: 'card_bq',
                  title: 'BigQuery Feature Warehouse',
                  iconKey: 'bigquery',
                  badge: 'Feature Store',
                  items: [
                    'Binary labeled ground truth (y ∈ {0, 1})',
                    'Stratified 80/20 train/test split',
                    'High-throughput Storage Write API'
                  ]
                },
                {
                  id: 'card_feat',
                  title: 'Vertex AI Feature Processing',
                  iconKey: 'vertex_vector_search',
                  items: [
                    'Z-score normalization: x_norm = (x - μ) / σ',
                    'One-Hot Encoding for categorical features',
                    'Design matrix X ∈ ℝ^(N×D) compilation'
                  ]
                }
              ]
            },
            {
              id: 'col_math',
              header: 'MATHEMATICAL FORMULATION & SIGMOID',
              headerColor: 'teal',
              subtitle: 'Linear logit scoring and non-linear squashing',
              cards: [
                {
                  id: 'card_sigmoid',
                  title: 'Sigmoid Probability Function',
                  iconKey: 'vertex_ai',
                  badge: 'Core Formula',
                  items: [
                    'Linear logit: z = w^T x + b = ∑(w_i x_i) + b',
                    'Sigmoid mapping: σ(z) = 1 / (1 + e^-z)',
                    'Predicted probability P(y=1|x) ∈ [0, 1]'
                  ]
                },
                {
                  id: 'card_loss',
                  title: 'Binary Cross-Entropy Loss',
                  iconKey: 'vertex_ai',
                  items: [
                    'Log-Loss: J(w) = -1/N ∑ [y ln(p) + (1-y) ln(1-p)]',
                    'Convex cost function (guaranteed global minimum)',
                    'L2 Ridge Regularization penalty: + λ ||w||²'
                  ]
                }
              ]
            },
            {
              id: 'col_train',
              header: 'MODEL TRAINING & SGD OPTIMIZATION',
              headerColor: 'purple',
              subtitle: 'Gradient descent and parameter optimization',
              cards: [
                {
                  id: 'card_sgd',
                  title: 'Vertex AI Training Workers',
                  iconKey: 'gke_autopilot',
                  badge: 'Distributed',
                  items: [
                    'Gradient update: w := w - α · ∇J(w)',
                    'Analytical gradient: ∇J(w) = 1/N X^T (σ(z) - y)',
                    'Mini-batch Adam / Momentum optimizer'
                  ]
                },
                {
                  id: 'card_metrics',
                  title: 'Cloud Monitoring & Telemetry',
                  iconKey: 'cloud_monitoring',
                  items: [
                    'Training vs. Validation loss convergence',
                    'Gradient norm & learning rate decay tracking',
                    'Automated early stopping callback'
                  ]
                }
              ]
            },
            {
              id: 'col_inference',
              header: 'INFERENCE & DECISION BOUNDARY',
              headerColor: 'emerald',
              subtitle: 'Online prediction and evaluation metrics',
              cards: [
                {
                  id: 'card_endpoint',
                  title: 'Vertex AI Prediction Endpoint',
                  iconKey: 'cloud_run',
                  badge: 'Sub-10ms SLA',
                  items: [
                    'Decision boundary: ŷ = 1 if σ(z) ≥ 0.5 else 0',
                    'Sub-10ms real-time latency serving',
                    'Serverless auto-scaling endpoint'
                  ]
                },
                {
                  id: 'card_eval',
                  title: 'Evaluation & Confusion Matrix',
                  iconKey: 'cloud_monitoring',
                  items: [
                    'Confusion Matrix: Precision, Recall, F1 Score',
                    'ROC curve & Area Under Curve (ROC-AUC)',
                    'Continuous statistical data drift detection'
                  ]
                }
              ]
            }
          ]
        }
      ],
      connections: [
        {
          fromId: 'card_bq',
          toId: 'card_sigmoid',
          label: '❶ Design Matrix X & Labels y (mTLS)',
          style: 'solid_blue'
        },
        {
          fromId: 'card_sigmoid',
          toId: 'card_sgd',
          label: '❷ Probability Logits σ(z) (gRPC)',
          style: 'solid_blue'
        },
        {
          fromId: 'card_sgd',
          toId: 'card_endpoint',
          label: '❸ Optimal Weights w*, b* (Artifact)',
          style: 'dashed_purple'
        },
        {
          fromId: 'card_eval',
          toId: 'card_feat',
          label: '❹ Continuous Drift Feedback Loop',
          style: 'feedback_teal'
        }
      ]
    };
    return enrichAndSanitizeSemanticGraph(rawGraph, intent);
  }

  // 4. GENERAL DYNAMIC CLOUD TOPOLOGY
  const cleanTitle = (prompt || '').length > 50 ? (prompt || '').slice(0, 48) + '...' : (prompt || 'SYSTEM TOPOLOGY');
  const rawGraph: Studio3SemanticGraph = {
    title: cleanTitle.toUpperCase(),
    subtitle: `Synthesized ${intent.abstractionLevel.toUpperCase()} Architecture with GCP Native Services`,
    tenets: ['HIGH AVAILABILITY', 'SECURITY BY DESIGN', 'OBSERVABILITY FIRST'],
    abstractionLevel: intent.abstractionLevel,
    bands: [
      {
        id: 'band_generic_main',
        title: 'APPLICATION & INFRASTRUCTURE TOPOLOGY',
        badge: `${intent.abstractionLevel.toUpperCase()} VIEW`,
        type: 'columns',
        columns: [
          {
            id: 'col_ingress',
            header: 'INGRESS & SECURITY TIER',
            headerColor: 'blue',
            subtitle: 'Secure API Gateway and Edge Protection',
            cards: [
              {
                id: 'card_sec',
                title: 'Cloud Armor & Load Balancer',
                iconKey: 'cloud_armor',
                items: ['Global external load balancing', 'DDoS protection and SSL termination']
              }
            ]
          },
          {
            id: 'col_app',
            header: 'APPLICATION & PROCESSING TIER',
            headerColor: 'teal',
            subtitle: 'Microservices and Containerized Workloads',
            cards: [
              {
                id: 'card_comp',
                title: 'GKE Autopilot / Cloud Run',
                iconKey: 'gke_autopilot',
                items: ['Auto-scaling stateless container services', 'Managed control plane with zero ops overhead']
              }
            ]
          },
          {
            id: 'col_data',
            header: 'DATA & STORAGE TIER',
            headerColor: 'purple',
            subtitle: 'Managed Database and Object Store',
            cards: [
              {
                id: 'card_db',
                title: 'Cloud Spanner & Memorystore',
                iconKey: 'spanner',
                items: ['High-throughput low-latency persistence', 'In-memory Redis caching layer']
              }
            ]
          }
        ]
      }
    ],
    connections: []
  };
  return enrichAndSanitizeSemanticGraph(rawGraph, intent);
}

export async function extractStudio3SemanticGraph(params: {
  prompt: string;
  intent: Studio3Intent;
  previousContext?: string;
  userApiKey?: string;
  logger?: Studio3ExecutionLogger;
}): Promise<Studio3SemanticGraph> {
  const { prompt, intent, previousContext, userApiKey, logger } = params;
  const apiKey = userApiKey || process.env.GEMINI_API_KEY;

  if (!apiKey) {
    logger?.log({
      stage: 'graph_synthesis',
      status: 'warning',
      message: 'GEMINI_API_KEY is not configured. Running first-principles dynamic graph generator.'
    });
    return generateDynamicFirstPrinciplesGraph(prompt, intent);
  }

  const modelName = process.env.GEMINI_FLASH_MODEL_ID || 'gemini-2.5-flash';
  const startTime = Date.now();

  logger?.log({
    stage: 'graph_synthesis',
    status: 'calling',
    model: modelName,
    message: `Calling Gemini API for Semantic Graph Extraction on: "${(prompt || '').slice(0, 60)}..."`,
    payload: { prompt, intent }
  });

  try {
    const ai = getAiClient(apiKey);

    const systemInstruction = `You are Google DeepMind's Premier Architecture & Scientific Knowledge Synthesizer for Studio 3.
Your task is to convert the user's prompt and validated intent into an authentic, visually compelling architecture diagram or 2-Tier Learning Roadmap.

MANDATORY RULES:
1. For ALL conceptual, educational, physical science, mathematical, theoretical, or algorithmic topics (such as "help me learn centripetal vs centrifugal forces", "teach me neural networks", "how does gasoline extraction work", "explain transformer attention", "quantum mechanics"), you MUST output "layoutType": "conceptual_roadmap" with the complete "conceptualRoadmap" object. DO NOT output loose overlapping coordinates or generic Kanban card boxes.
2. For cloud infrastructure and systems topologies (e.g. "VPC landing zone", "Microservices Kubernetes", "Payment gateway"), you can use "bands" with structured columns.
3. Every formula, milestone, and workflow step MUST be technically precise and informative.
4. Ensure 4 distinct milestone chevrons, 4 visual taxonomy variants, and 4 real-world deployment applications.`;

    const userContent = `Extract the complete architecture graph for:
Prompt: "${prompt}"
Validated Intent: ${JSON.stringify(intent, null, 2)}
Previous History: "${previousContext || 'None'}"

JSON Schema:
{
  "title": "TITLE IN ALL CAPS",
  "subtitle": "Informative Subtitle",
  "tenets": ["TENET 1", "TENET 2", "TENET 3"],
  "abstractionLevel": "conceptual" | "logical" | "technical",
  "layoutType": "conceptual_roadmap" | "bands",
  "conceptualRoadmap": {
    "title": "ROADMAP TITLE IN ALL CAPS",
    "subtitle": "Subtitle",
    "milestones": [
      { "title": "1. FIRST MILESTONE", "color": "blue", "icon": "🧭" },
      { "title": "2. SECOND MILESTONE", "color": "green", "icon": "📐" },
      { "title": "3. THIRD MILESTONE", "color": "orange", "icon": "⚖️" },
      { "title": "4. FOURTH MILESTONE", "color": "yellow", "icon": "🔬" }
    ],
    "section1Analogy": {
      "title": "Analogy Title",
      "actors": [
        { "id": "act_1", "name": "Actor 1 Name", "avatar": "🧍" },
        { "id": "act_2", "name": "Actor 2 Name", "avatar": "🎯" },
        { "id": "act_3", "name": "Actor 3 Name", "avatar": "🎠" }
      ],
      "relations": [
        { "from": "act_1", "to": "act_2", "label": "Interaction 1" },
        { "from": "act_2", "to": "act_3", "label": "Interaction 2" }
      ],
      "legend": [
        { "icon": "🎯", "label": "Legend Item 1" },
        { "icon": "➡️", "label": "Legend Item 2" }
      ],
      "challengeCallout": "Core Challenge Statement"
    },
    "section2Prerequisites": {
      "title": "Theoretical & Mathematical Foundations",
      "mathFormulas": [
        { "name": "Formula 1 Name", "formula": "Mathematical Equation", "icon": "📐" },
        { "name": "Formula 2 Name", "formula": "Mathematical Equation", "icon": "⚡" }
      ],
      "checklist": ["☑ Check 1", "☑ Check 2", "☑ Check 3"]
    },
    "section3Taxonomy": {
      "title": "Taxonomy & Variants",
      "variants": [
        { "name": "VARIANT 1", "subtext": "Subtext description", "diagramType": "directed" },
        { "name": "VARIANT 2", "subtext": "Subtext description", "diagramType": "nodes" },
        { "name": "VARIANT 3", "subtext": "Subtext description", "diagramType": "layers" },
        { "name": "VARIANT 4", "subtext": "Subtext description", "diagramType": "weighted" }
      ]
    },
    "section4ModernFrontiers": {
      "title": "Modern Scientific / Industrial Frontiers",
      "knowledgeGraphNodes": [
        { "id": "kg1", "label": "Node 1\nLabel", "color": "#38BDF8" },
        { "id": "kg2", "label": "Node 2\nLabel", "color": "#F59E0B" }
      ],
      "frameworkBullets": ["🔬 • Bullet 1", "🌪️ • Bullet 2", "🚀 • Bullet 3"]
    },
    "bottomWorkflow": {
      "title": "END-TO-END EXECUTION WORKFLOW PIPELINE",
      "step1Problem": {
        "title": "STEP 1: Problem Definition",
        "subtitle": "Subtitle",
        "icon": "🎯 🔄",
        "formula": "Equation",
        "bullets": ["• Bullet 1", "• Bullet 2"]
      },
      "step2Execution": {
        "title": "STEP 2: Execution",
        "input": "Input Stream",
        "phases": [
          { "name": "1. Phase 1", "desc": "Description" },
          { "name": "2. Phase 2", "desc": "Description" }
        ]
      },
      "step3Engine": {
        "title": "STEP 3: Engine Optimization",
        "subtitle": "Subtitle",
        "engines": [
          { "name": "ENGINE 1", "complexity": "O(1)", "items": ["Item 1", "Item 2"] }
        ],
        "callout": "Certified Statement"
      },
      "step4Applications": [
        { "title": "App 1", "subtitle": "Sub", "icon": "🚗", "detail": "Detail" },
        { "title": "App 2", "subtitle": "Sub", "icon": "🧪", "detail": "Detail" },
        { "title": "App 3", "subtitle": "Sub", "icon": "🛰️", "detail": "Detail" },
        { "title": "App 4", "subtitle": "Sub", "icon": "🎢", "detail": "Detail" }
      ]
    },
    "footerTenets": ["TENET 1", "TENET 2", "TENET 3"]
  },
  "bands": [
    {
      "id": "band_1",
      "title": "BAND TITLE",
      "type": "columns",
      "columns": [
        {
          "id": "col_1",
          "header": "TIER HEADER",
          "headerColor": "blue" | "teal" | "purple" | "slate" | "amber",
          "cards": [
            {
              "id": "card_1",
              "title": "Service Name",
              "iconKey": "vertex_ai" | "bigquery" | "spanner" | "gke_autopilot" | "cloud_armor",
              "items": ["Item 1", "Item 2"]
            }
          ]
        }
      ]
    }
  ],
  "connections": []
}`;

    const response = await ai.models.generateContent({
      model: modelName,
      contents: [{ role: 'user', parts: [{ text: userContent }] }],
      config: {
        systemInstruction: { parts: [{ text: systemInstruction }] },
        responseMimeType: 'application/json',
        temperature: 0.2
      }
    });

    const elapsed = Date.now() - startTime;
    const rawText = response.text || '';
    const fallbackGraph = generateDynamicFirstPrinciplesGraph(prompt, intent);
    const parsed = parseJsonSafely<Studio3SemanticGraph>(rawText, fallbackGraph);

    // If conceptual abstraction level is requested, guarantee a conceptualRoadmap is populated
    if (
      (intent.abstractionLevel === 'conceptual' || parsed.layoutType === 'conceptual_roadmap') &&
      !parsed.conceptualRoadmap
    ) {
      parsed.conceptualRoadmap = fallbackGraph.conceptualRoadmap || generateGenericConceptualRoadmap(prompt, intent);
      parsed.layoutType = 'conceptual_roadmap';
    }

    // Run semantic post-processor & auto-enricher to guarantee 100% icon & item completeness
    const enriched = enrichAndSanitizeSemanticGraph(parsed, intent);

    logger?.log({
      stage: 'graph_synthesis',
      status: 'success',
      model: modelName,
      latencyMs: elapsed,
      message: `Gemini synthesized graph: "${enriched.title}" (${enriched.bands?.length || 1} bands, ${enriched.bands?.reduce((acc, b) => acc + (b.columns?.length || b.pipelineStages?.length || 0), 0) || 0} zones) in ${elapsed}ms`,
      payload: enriched
    });

    return enriched;
  } catch (error: any) {
    const elapsed = Date.now() - startTime;
    logger?.log({
      stage: 'graph_synthesis',
      status: 'error',
      model: modelName,
      latencyMs: elapsed,
      message: `Gemini Graph Synthesis failed (${error.message}). Running dynamic first-principles generator.`,
      payload: { error: error.message }
    });
    return generateDynamicFirstPrinciplesGraph(prompt, intent);
  }
}

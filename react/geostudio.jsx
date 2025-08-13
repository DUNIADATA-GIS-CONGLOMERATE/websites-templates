import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Map as MapIcon,
  Ruler,
  Satellite,
  Layers,
  Database,
  Globe,
  LineChart,
  Mail,
  PhoneCall,
  Send,
  User,
  ExternalLink,
} from "lucide-react";

// ------------------------------------------------------------
// GeoStudio Multi-Page Application
// This is a refactored React application that simulates multiple pages
// without using a routing library. The main App component manages state
// to render different 'page' components based on user navigation.
// It is styled with Tailwind CSS and uses framer-motion for animations.
// All content is placeholder—customize names, copy, and links to match your studio.
// ------------------------------------------------------------

// Helper components for the page layout
const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`py-20 px-6 md:px-12 lg:px-20 ${className}`}>
    {children}
  </section>
);

const Pill = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-zinc-800/50 bg-zinc-900/60 px-3 py-1 text-xs text-zinc-300 backdrop-blur">
    {children}
  </span>
);

const Progress = ({ value }) => (
  <div className="h-2 w-full rounded-full bg-zinc-800">
    <div
      className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
      style={{ width: `${value}%` }}
    />
  </div>
);

// --- DATA DEFINITIONS ---
const nav = [
  { label: "Home", href: "home" },
  { label: "Services", href: "services" },
  { label: "Case Studies", href: "case-studies" },
  { label: "Stack", href: "stack" },
  { label: "Team", href: "team" },
  { label: "Contact", href: "contact" },
];

const services = [
  {
    icon: MapIcon,
    title: "GIS & Web Mapping",
    blurb:
      "Custom web maps, spatial analytics, and dashboards for decision support across enterprise and public portals.",
    points: [
      "Interactive tiles & vector layers",
      "Routing, iso‑chrones, network analysis",
      "Field data sync & QA/QC",
    ],
  },
  {
    icon: Ruler,
    title: "Land & Engineering Surveying",
    blurb:
      "High‑precision control, topo surveys, setting‑out, and monitoring with GNSS/RTK, total stations, and laser scanning.",
    points: ["RTK/PPK GNSS", "UAV/terrestrial LiDAR", "Deformation monitoring"],
  },
  {
    icon: Satellite,
    title: "Remote Sensing & Deep EO",
    blurb:
      "Pipeline for optical, SAR, and thermal—at scale. Change detection, classification, and time‑series analytics.",
    points: ["Sentinel, Landsat, Planet, SAR", "Cloud masking & indices (NDVI, NDWI)", "Deep learning segmentation"],
  },
  {
    icon: Layers,
    title: "Cartography & Data Design",
    blurb:
      "Clear, elegant map design: print, web, and story maps with strong symbology and accessibility baked‑in.",
    points: ["Multi‑scale styling", "Standards & metadata", "Brand‑aligned palettes"],
  },
  {
    icon: Database,
    title: "Spatial Data Engineering",
    blurb:
      "ETL pipelines, geodatabases, tiling, and APIs. We keep your data fast, tidy, and shareable.",
    points: ["PostGIS design & tuning", "Raster tiling & caching", "OGC/WFS/WMS/XYZ APIs"],
  },
  {
    icon: Globe,
    title: "Training & Support",
    blurb:
      "Upskill your team: hands‑on training in QGIS, PostGIS, Python, and web mapping frameworks.",
    points: ["Curriculum design", "Playbooks & templates", "Office hours & SLA"],
  },
];

const caseStudies = [
  {
    tag: "Agriculture",
    title: "County‑wide NDVI Crop Health Platform",
    body:
      "Processed 5‑year Sentinel‑2 time‑series, harmonized indices, and served XYZ tiles with a browser dashboard for extension officers.",
    metric: "+23% scouting efficiency",
  },
  {
    tag: "Utilities",
    title: "Fiber Route Survey & As‑Built Portal",
    body:
      "Mobile GNSS survey, asset schema in PostGIS, and live QA with a web viewer for contractors and client engineers.",
    metric: "\u221230% rework",
  },
  {
    tag: "Environment",
    title: "Flood Risk Modelling & Early Warning Map",
    body:
      "Merged DEMs, hydrology, and rainfall nowcasts into an interactive risk map, with SMS alert thresholds.",
    metric: "+2h lead time",
  },
];

const stack = [
  "QGIS",
  "ArcGIS",
  "PostGIS",
  "GeoServer",
  "GDAL/OGR",
  "Leaflet",
  "MapLibre GL",
  "Turf.js",
  "Python",
  "GeoPandas",
  "Rasterio",
  "xarray",
  "OpenCV",
  "PyTorch",
  "TensorFlow",
  "Sentinel/Landsat",
  "AWS/GCP/Azure",
];

const developers = [
  {
    name: "Kimathi Joram",
    description: "Expert in full-stack development with a focus on scalable geospatial applications and cloud infrastructure.",
    portfolio: "https://www.kimathijoram.com",
  },
  {
    name: "Celesakim",
    description: "Specializes in front-end development, creating intuitive and performant user interfaces for web mapping and data visualization.",
    portfolio: "https://www.celesakim.com",
  },
];

// Map component for the contact section
const MapComponent = () => {
  const mapRef = useRef(null);
  useEffect(() => {
    // Dynamically load Leaflet.js and its CSS from CDN
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
    script.async = true;
    document.body.appendChild(script);

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
    document.head.appendChild(link);

    script.onload = () => {
      if (mapRef.current) {
        const position = [-0.397316, 36.960876]; 
        const zoom = 14;
        const map = L.map(mapRef.current).setView(position, zoom);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);
        L.marker(position).addTo(map)
          .bindPopup('Dedan Kimathi University of Technology<br />Nyeri, Kenya')
          .openPopup();
      }
    };
    return () => {
      if (mapRef.current && mapRef.current._leaflet_id) {
        mapRef.current.remove();
      }
      document.body.removeChild(script);
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="relative z-10 w-full overflow-hidden rounded-2xl border border-white/10 shadow-xl">
      <div id="map-container" ref={mapRef} className="h-[400px] md:h-full"></div>
    </div>
  );
};

// --- PAGE COMPONENTS ---

const HomePage = () => (
  <Section id="home" className="pt-16 min-h-screen">
    <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <Pill>
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400" /> Spatial intelligence, delivered
        </Pill>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Survey‑grade data, web‑scale maps, and deep EO analytics — all in one team.
        </h1>
        <p className="max-w-xl text-zinc-300">
          We help organizations capture, process, and visualize geospatial data with accuracy and speed:
          from GNSS control and UAV mapping to cloud pipelines, dashboards, and AI‑powered earth observation.
        </p>
        <div className="flex flex-wrap gap-3">
          <a href="#services" className="rounded-2xl bg-emerald-500 px-5 py-3 font-medium text-zinc-950 hover:bg-emerald-400">
            Explore Services
          </a>
          <a href="#case-studies" className="rounded-2xl border border-white/10 px-5 py-3 font-medium hover:bg-white/5">
            See Case Studies
          </a>
        </div>
        <div className="flex flex-wrap gap-2 pt-4 text-xs text-zinc-400">
          <span>ISO‑style QA/QC</span>
          <span>•</span>
          <span>OGC/Esri compatible</span>
          <span>•</span>
          <span>On‑prem or cloud</span>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative"
      >
        <div className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-emerald-500/20 to-cyan-500/10 blur-2xl" />
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/60 p-6 shadow-2xl">
          <div className="mb-4 flex items-center justify-between text-sm text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" /> Realtime Map View
            </div>
            <div>EPSG:4326 • XYZ</div>
          </div>
          <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.15),transparent_60%),repeating-linear-gradient(45deg,rgba(255,255,255,0.06)_0,rgba(255,255,255,0.06)_2px,transparent_2px,transparent_12px)] grid place-items-center">
            <div className="rounded-xl border border-white/10 bg-zinc-950/60 px-3 py-1 text-xs text-zinc-300">
              Map demo — plug your tiles here
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-zinc-300 md:grid-cols-4">
            {[
              "Basemap",
              "Contours",
              "Parcels",
              "Vegetation",
              "Flood Zones",
              "Assets",
              "Routes",
              "DEM",
            ].map((l) => (
              <label key={l} className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 rounded border-white/10 bg-zinc-900" defaultChecked />
                {l}
              </label>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </Section>
);

const ServicesPage = () => (
  <Section id="services" className="pt-16 min-h-screen">
    <div className="mx-auto max-w-7xl">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-semibold">Our Services</h2>
        <p className="mt-4 text-xl max-w-2xl mx-auto text-zinc-300">
          End‑to‑end delivery—from field capture and EO feeds to data engineering and delightful maps.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, index) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group h-full rounded-2xl border border-white/10 bg-zinc-900/60 p-6 shadow-lg shadow-black/20"
          >
            <div className="mb-4 inline-flex rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 p-3">
              <s.icon className="h-6 w-6 text-emerald-300" />
            </div>
            <h3 className="text-xl font-semibold">{s.title}</h3>
            <p className="mt-2 text-base text-zinc-300">{s.blurb}</p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
              {s.points.map((p) => (
                <li key={p} className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" /> {p}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  </Section>
);

const CaseStudiesPage = () => (
  <Section id="case-studies" className="pt-16 min-h-screen">
    <div className="mx-auto max-w-7xl">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-semibold">Our Case Studies</h2>
        <p className="mt-4 text-xl max-w-2xl mx-auto text-zinc-300">
          A glimpse of problems we solve across sectors. Ask for the full technical sheets.
        </p>
        <Pill>Confidential details available on request</Pill>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {caseStudies.map((cs, index) => (
          <motion.div
            key={cs.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group rounded-2xl border border-white/10 bg-zinc-900/60 p-6"
          >
            <div className="mb-3 text-xs text-emerald-300">{cs.tag}</div>
            <h3 className="text-xl font-semibold">{cs.title}</h3>
            <p className="mt-2 text-base text-zinc-300">{cs.body}</p>
            <div className="mt-4 inline-flex rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
              {cs.metric}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </Section>
);

const StackPage = () => (
  <Section id="stack" className="pt-16 min-h-screen">
    <div className="mx-auto max-w-7xl">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-semibold">Our Tech Stack</h2>
        <p className="mt-4 text-xl max-w-2xl mx-auto text-zinc-300">
          Open‑source first, enterprise friendly. We integrate smoothly with your infrastructure.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {stack.map((s, index) => (
          <motion.div
            key={s}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="rounded-xl border border-white/10 bg-zinc-900/60 px-6 py-4 text-center text-lg text-zinc-300"
          >
            {s}
          </motion.div>
        ))}
      </div>
    </div>
  </Section>
);

const TeamPage = () => (
  <Section id="team" className="pt-16 min-h-screen">
    <div className="mx-auto max-w-7xl">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-semibold">Our Team</h2>
        <p className="mt-4 text-xl max-w-2xl mx-auto text-zinc-300">
          Meet the minds behind the code. Our dedicated developers build the tools and platforms that power your projects.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {developers.map((dev, index) => (
          <motion.div
            key={dev.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-zinc-900/60 p-6 text-center shadow-lg shadow-black/20 md:flex-row md:text-left"
          >
            <div className="inline-flex rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 p-3">
              <User className="h-6 w-6 text-emerald-300" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{dev.name}</h3>
              <p className="mt-1 text-sm text-zinc-300">{dev.description}</p>
              <a
                href={dev.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-sm text-emerald-400 hover:underline"
              >
                View Portfolio <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </Section>
);

const ContactPage = () => (
  <Section id="contact" className="pt-16 min-h-screen">
    <div className="mx-auto grid max-w-7xl items-start gap-10 md:grid-cols-2">
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-semibold">Let’s build your map</h2>
          <p className="mt-2 max-w-xl text-zinc-300">
            Tell us about your site, AOI, timeline, and deliverables. We’ll respond with options and a fast quote.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-1">
            <div>
                <h3 className="text-xl font-semibold mb-2">Our Location</h3>
                <MapComponent />
            </div>
            <div>
                <h3 className="text-xl font-semibold mb-2">Get in Touch</h3>
                <div className="space-y-3 text-sm text-zinc-300">
                    <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-emerald-300" /> info@your‑geostudio.com
                    </div>
                    <div className="flex items-center gap-2">
                        <PhoneCall className="h-4 w-4 text-emerald-300" /> +254 700 000 000
                    </div>
                </div>
            </div>
        </div>
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6"
      >
        <div className="grid gap-4">
          <div>
            <label className="mb-2 block text-sm text-zinc-300">Name</label>
            <input
              type="text"
              placeholder="Jane Doe"
              className="w-full rounded-xl border border-white/10 bg-zinc-950/70 px-4 py-3 text-sm outline-none focus:border-emerald-400"
              required
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-zinc-300">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-white/10 bg-zinc-950/70 px-4 py-3 text-sm outline-none focus:border-emerald-400"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-zinc-300">Phone</label>
              <input
                type="tel"
                placeholder="+254…"
                className="w-full rounded-xl border border-white/10 bg-zinc-950/70 px-4 py-3 text-sm outline-none focus:border-emerald-400"
              />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm text-zinc-300">Area of Interest (WKT/geojson/url)</label>
            <input
              type="text"
              placeholder="POLYGON((…)) or https://tiles.example/aoi.json"
              className="w-full rounded-xl border border-white/10 bg-zinc-950/70 px-4 py-3 text-sm outline-none focus:border-emerald-400"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm text-zinc-300">Project Notes</label>
            <textarea
              rows={5}
              placeholder="Deliverables, CRS, timeline, sample data links…"
              className="w-full rounded-xl border border-white/10 bg-zinc-950/70 px-4 py-3 text-sm outline-none focus:border-emerald-400"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 font-medium text-zinc-950 hover:bg-emerald-400"
          >
            <Send className="h-4 w-4" /> Submit Inquiry
          </button>
          <p className="text-xs text-zinc-500">We’ll reply within one business day.</p>
        </div>
      </form>
    </div>
  </Section>
);

// --- MAIN APP COMPONENT ---
export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  
  const handleNavClick = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "services":
        return <ServicesPage />;
      case "case-studies":
        return <CaseStudiesPage />;
      case "stack":
        return <StackPage />;
      case "team":
        return <TeamPage />;
      case "contact":
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] h-[60vh] w-[60vw] -translate-x-1/2 rounded-full bg-gradient-to-b from-emerald-600/20 to-cyan-600/10 blur-3xl" />
        <div className="absolute right-[10%] bottom-[5%] h-[35vh] w-[35vw] rounded-full bg-gradient-to-tr from-cyan-500/10 to-emerald-500/10 blur-3xl" />
      </div>

      <header className="sticky top-0 z-30 border-b border-white/5 bg-zinc-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a onClick={() => handleNavClick("home")} className="flex items-center gap-3 cursor-pointer">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-lg shadow-emerald-500/10">
              <Globe className="h-5 w-5" />
            </div>
            <div className="text-left">
              <div className="text-sm uppercase tracking-widest text-zinc-300">GeoStudio</div>
              <div className="text-lg font-semibold">GIS • Surveying • EO</div>
            </div>
          </a>
          <nav className="hidden gap-6 md:flex">
            {nav.map((n) => (
              <a 
                key={n.href} 
                onClick={() => handleNavClick(n.href)} 
                className={`text-sm hover:text-white cursor-pointer ${
                  currentPage === n.href ? "text-white font-medium" : "text-zinc-300"
                }`}
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <a
              onClick={() => handleNavClick("contact")}
              className="rounded-2xl bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/15 cursor-pointer"
            >
              Request a Proposal
            </a>
          </div>
        </div>
      </header>

      <main>
        {renderPage()}
      </main>

      <footer className="border-t border-white/5 py-10 text-sm text-zinc-400">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
          <div>© {new Date().getFullYear()} GeoStudio. All rights reserved.</div>
          <div className="flex flex-wrap items-center gap-4">
            <a onClick={() => handleNavClick("home")} className="hover:text-white cursor-pointer">Back to top</a>
            <span className="hidden md:inline">•</span>
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

import suruImg from "../assets/projects/suru-og.png";
import alfonsoLibrerosImg from "../assets/projects/alfonso-libreros-og.png";
import alnutriologoImg from "../assets/projects/alnutriologo-og.png";
import goldenwingsImg from "../assets/projects/goldenwings.png";
import viajerasporsiempreImg from "../assets/projects/viajerasporsiempre.png";

const fallbackProjects = [
  {
    id: "suru",
    name: "SURU",
    date: "2026-01",
    category: "Fullstack",
    description:
      "A comprehensive booking platform for dancers featuring Stripe payments, QR code ticketing with scanning capabilities, and a dedicated organizer management system.",
    technologies: [
      "React",
      "Cloudflare",
      "Hono",
      "Prisma",
      "Tanstack",
      "Stripe",
    ],
    repository: "",
    live: "https://suru.dance/",
    more: "/projects/suru",
    image: suruImg,
    technicalHighlights: [
      {
        title: "Marketplace Payment Architecture",
        detail:
          "Navigated complex Stripe integration patterns (Standard vs. Express) to enable secure, multi-party transactions for international dance festivals.",
      },
      {
        title: "Edge Image Optimization",
        detail:
          "Built a custom Cloudflare Worker pipeline to serve progressive, responsive images from R2, drastically improving UX for mobile-first users.",
      },
      {
        title: "Serverless Infrastructure",
        detail:
          "Architected a full-stack edge application using Hono, Prisma, and D1, ensuring high availability and low latency for a global user base.",
      },
    ],
    problem:
      "The dance community suffers from extreme fragmentation; event info is buried in social media DMs, and instructors often rely on manual, cash-only systems with high cancellation risks and no booking security.",
    solution:
      "SURU provides a centralized hub where instructors can manage bookings and sell tickets via card. By shifting from manual transfers to a professional marketplace, we provide financial security for teachers and a seamless discovery experience for dancers traveling globally.",
    results:
      "Currently in the client acquisition phase, SURU is successfully handling event advertisements and ticket sales. The platform is evolving from a marketplace into a full-scale social ecosystem.",
    futureSteps: [
      "Implementation of robust Stripe Webhooks for automated payment confirmation and ticket delivery.",
      "Developing a WebSocket-based messaging system to facilitate real-time communication between organizers and attendees.",
    ],
  },
  {
    id: "alnutriologo",
    name: "alnutriologo.com",
    date: "2026-02",
    category: "Fullstack / SEO",
    description:
      "A high-performance, SEO-first directory for nutritionists in Mexico, leveraging Edge Computing to deliver instant search results and verified specialist profiles.",
    technologies: [
      "React",
      "JavaScript",
      "Cloudflare Workers",
      "Hono",
      "TanStack Router",
      "TailwindCSS",
    ],
    repository: "",
    live: "https://alnutriologo.com/",
    more: "/projects/alnutriologo",
    image: alnutriologoImg,
    technicalHighlights: [
      {
        title: "Edge-Native Server Side Rendering (SSR)",
        detail:
          "Implemented standard SSR using TanStack Router on Cloudflare Workers to deliver fully hydrated HTML with dynamic JSON-LD schemas, achieving 100/100 Core Web Vitals.",
      },
      {
        title: "Semantic SEO & URL Architecture",
        detail:
          "Engineered a collision-resistant URL slug system (handling duplicate names via geolocation logic) and dynamic meta-tag injection to maximize 'long-tail' search visibility for 500+ unique profiles.",
      },
      {
        title: "High-Performance Data Pipeline",
        detail:
          "Built a lightweight API layer in JavaScript that handles server-side filtering (accent-insensitive), pagination, and sanitization, ensuring the client receives minimal payloads for maximum speed.",
      },
    ],
    problem:
      "Finding a specialized nutritionist in CDMX is frustrating due to fragmented information. Generic directories are bloated, slow, and lack crucial niche filters like 'LGBTQ+ safe spaces', 'bilingual services', or specific clinical specialties.",
    solution:
      "alnutriologo.com provides a centralized, hyper-fast ecosystem for health professionals. By leveraging Edge computing and a clean React architecture, we provide patients with instant access to verified professionals, filtered by their specific needs rather than just proximity.",
    results:
      "Successfully indexed and rendered 500+ specialized profiles in Mexico City with zero layout shift. The platform's scalable architecture is ready to handle multi-city expansion without performance degradation.",
    futureSteps: [
      "Scaling the directory to major hubs (Monterrey, Guadalajara) using the established dynamic route architecture.",
      "Integration of utility tools (TDEE/Macro calculators) to drive organic traffic and extend user session duration.",
      "Implementation of a direct booking system and supplement marketplace leveraging my existing Stripe infrastructure.",
    ],
  },
  {
    id: "goldenwings",
    name: "Golden Wings Chicken",
    date: "2023-05",
    category: "Frontend",
    description:
      "A high-performance restaurant showcase built with vanilla JavaScript, focusing on accessible menu design and asset optimization.",
    technologies: ["HTML&CSS", "JavaScript", "Webpack"],
    repository: "https://github.com/Durounseki/odin-restaurant",
    live: "https://durounseki.github.io/odin-restaurant/",
    more: "/projects/goldenwings",
    image: goldenwingsImg,
    technicalHighlights: [
      {
        title: "Vanilla SPA Engine",
        detail:
          "Architected a custom view-switching logic using pure JavaScript DOM manipulation, bypassing frameworks to deeply understand how browsers render dynamic content.",
      },
      {
        title: "Modular Build Pipeline",
        detail:
          "Configured a custom Webpack environment from scratch to manage asset bundling, image optimization, and code modularization for a clean production build.",
      },
      {
        title: "Responsive CSS Fundamentals",
        detail:
          "Mastered Flexbox and CSS Grid without external libraries to build a complex, responsive restaurant menu that maintains its layout integrity on all screen sizes.",
      },
    ],
    problem:
      "The local restaurant relied on unsearchable, image-only menus (flyer scans) that were difficult to navigate on mobile and impossible for non-Japanese speakers to translate via browser tools.",
    solution:
      "I rebuilt the experience as an interactive SPA. By extracting menu data into text format and sourcing high-quality imagery from social media, I created a responsive UI that allows for instant language translation and a significantly improved visual hierarchy.",
    futureSteps: [
      "Integrating a simple front-end routing system to allow direct linking to specific menu categories.",
      "Implementing a lightweight localization toggle to switch natively between English and Japanese.",
    ],
  },
  {
    id: "alfonso-libreros",
    name: "Nutritionist Professional Website",
    date: "2024-05",
    category: "Frontend",
    description:
      "A professional healthcare landing page that evolved from a static multi-page site into a high-performance Single Page Application.",
    technologies: ["React", "Tanstack", "Cloudflare"],
    repository: "https://github.com/Durounseki/libreros_nutricion",
    live: "https://alfonsolibreros.alnutriologo.com",
    more: "/projects/alfonso-libreros",
    image: alfonsoLibrerosImg,
    technicalHighlights: [
      {
        title: "Architecture Evolution",
        detail:
          "Successfully migrated the platform from static HTML and EJS templates to a React SPA, significantly improving state persistence and navigation speed.",
      },
      {
        title: "Type-Safe Routing Implementation",
        detail:
          "Integrated TanStack Router to manage complex navigation paths, ensuring that the medical services were indexed correctly and accessible via clean, semantic URLs.",
      },
      {
        title: "Custom Lead Generation Flow",
        detail:
          "Developed a custom SMTP integration to replace third-party form handlers, allowing for direct management of patient inquiries and data privacy.",
      },
    ],
    problem:
      "The original site consisted of disconnected HTML files, making maintenance difficult and creating a disjointed user experience. Patient lead generation relied on third-party services, leading to a lack of control over the clinical data flow.",
    solution:
      "I re-engineered the site using a modern component-based architecture. By implementing TanStack Router, I achieved seamless page transitions while maintaining the strict brand guidelines provided by the client. The site was built mobile-first, ensuring patients could easily contact the clinic from any device.",
    futureSteps: [
      "Development of a custom Booking System to manage patient consultations and reduce administrative overhead.",
      "Integration of a Nutritional Supplement Marketplace, leveraging the payment patterns developed in the SURU project.",
      "Implementation of a Markdown-based Blog for educational content to improve SEO and patient engagement.",
    ],
  },
  {
    id: "viajerasporsiempre",
    name: "Viajeras por Siempre",
    date: "2025-10",
    category: "Fullstack",
    description:
      "A mobile-first travel agency portal with a custom content management system for advertising itineraries and managing client relationships through a simplified dashboard.",
    technologies: ["React", "Cloudflare", "Hono", "Tanstack", "Prisma"],
    repository: "https://github.com/Durounseki/viajes-tlh",
    live: "https://viajerasporsiempre.com/",
    more: "/projects/viajerasporsiempre",
    image: viajerasporsiempreImg,
    technicalHighlights: [
      {
        title: "Client-Side State Management",
        detail:
          "Implemented TanStack Query to manage complex caching of travel itineraries, reducing API load and providing a smooth user experience.",
      },
      {
        title: "Automated Image Pipeline",
        detail:
          "Utilized Cloudflare Images to automatically serve optimized WebP/AVIF formats based on client device, significantly reducing mobile data usage.",
      },
      {
        title: "Unified Serverless Backend",
        detail:
          "Leveraged Cloudflare Workers to serve both the React SPA and the Hono API from the same edge location, minimizing 'cold starts' and latency.",
      },
    ],
    problem:
      "The agency manager operates exclusively via mobile, and the target clientele in Mexico often accesses the web through mid-range devices on unstable networks. Standard heavy-weight travel templates resulted in slow load times and a difficult management experience.",
    solution:
      "I built a lightweight, edge-cached platform that prioritizes asset optimization. By using a serverless architecture (D1 and R2), the site delivers content from the closest possible node to the user. The management system was stripped down to essential features, ensuring the manager can upload and edit trip details quickly while on the go.",
    futureSteps: [
      "Integrating the Stripe payment logic developed for SURU to facilitate secure trip deposits.",
      "Implementing an automated email confirmation system to streamline client inquiries.",
      "Adding an offline-first mode for the management dashboard to handle spotty network coverage during updates.",
    ],
  },
];

export default fallbackProjects;

/**
 * ============================================================================
 * AZEEM REHMAN — CINEMATIC PORTFOLIO JAVASCRIPT
 * ============================================================================
 * 
 * QUICK EDIT GUIDE FOR VS CODE:
 * 1. EDIT PROJECT DETAILS & YOUTUBE LINKS:
 *    Update the `PROJECTS_DATA` array right below. You can change titles, brands,
 *    descriptions, contributions, thumbnail paths, and paste your YouTube URLs.
 * 
 * 2. EDIT CONTACT INFO (Optional via JS or index.html):
 *    Update the `CONTACT_INFO` object below if you prefer updating contact links here.
 * ============================================================================
 */

/* ============================================================================
   PROJECTS DATA CONFIGURATION (EDIT YOUR PROJECTS & YOUTUBE LINKS HERE)
   ============================================================================
   - youtubeUrl: Paste your YouTube link here.
     Accepts both:
       • Standard links: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID"
       • Short links:    "https://youtu.be/YOUR_VIDEO_ID"
       • Embed links:    "https://www.youtube.com/embed/YOUR_VIDEO_ID"
       • Shorts:         "https://www.youtube.com/shorts/YOUR_VIDEO_ID"
     
   - Note: If youtubeUrl is left as "" (empty string) or placeholder, the site
     gracefully handles it and displays an elegant "Link Pending" state!
   
   - thumbnail: Relative path to your thumbnail image in the assets folder.
     e.g., "assets/fashion-film.jpg"
   ============================================================================ */
const PROJECTS_DATA = [
  {
    id: "project-01",
    number: "01",
    title: "Fashion Film",
    brand: "LUXES",
    description: "A cinematic fashion film focused on visual storytelling, aesthetics and brand presentation.",
    contribution: "Videography, Video Direction & Video Editing",
    thumbnail: "assets/images/cover1", // Replace with your image: e.g. "assets/fashion-film.jpg"
    youtubeUrl: "https://youtu.be/YWTYuJmOTYk" // <-- PASTE YOUTUBE LINK HERE (e.g., "https://www.youtube.com/watch?v=EXAMPLE_ID")
  },
  {
    id: "project-02",
    number: "02",
    title: "Craftsmanship Film",
    brand: "LUXES",
    description: "A visual exploration of craftsmanship, details and the creative process behind the brand.",
    contribution: "Videography, Video Direction & Video Editing",
    thumbnail: "assets/project-2.svg", // Replace with your image: e.g. "assets/craftsmanship-film.jpg"
    youtubeUrl: "" // <-- PASTE YOUTUBE LINK HERE
  },
  {
    id: "project-03",
    number: "03",
    title: "Sports Campaign",
    brand: "LYNX BY SWID",
    description: "A dynamic sports-focused visual campaign, shaped through professional editing and post-production.",
    contribution: "Video Editing",
    thumbnail: "assets/project-3.svg", // Replace with your image: e.g. "assets/sports-campaign.jpg"
    youtubeUrl: "" // <-- PASTE YOUTUBE LINK HERE
  },
  {
    id: "project-04",
    number: "04",
    title: "Creative Video Project",
    brand: "Project Showcase",
    description: "A space reserved for another selected production project. Keep all content editable.",
    contribution: "To be updated",
    thumbnail: "assets/project-4.svg", // Replace with your image: e.g. "assets/project-showcase.jpg"
    youtubeUrl: "" // <-- PASTE YOUTUBE LINK HERE
  }
];

/* ============================================================================
   CONTACT INFORMATION CONFIGURATION (EDIT YOUR CONTACT DETAILS HERE)
   ============================================================================ */
const CONTACT_INFO = {
  email: "contact@azeemrehman.com",          // <-- EDIT YOUR EMAIL
  instagramHandle: "@azeemrehman",           // <-- EDIT YOUR INSTAGRAM HANDLE
  instagramUrl: "https://instagram.com/azeemrehman", // <-- EDIT YOUR INSTAGRAM LINK
  linkedinHandle: "linkedin.com/in/azeemrehman",     // <-- EDIT YOUR LINKEDIN TEXT
  linkedinUrl: "https://linkedin.com/in/azeemrehman" // <-- EDIT YOUR LINKEDIN LINK
};

/* ============================================================================
   YOUTUBE URL HELPER FUNCTIONS
   Extracts Video ID and generates embeddable URLs for any YouTube format.
   ============================================================================ */
/**
 * Extracts the 11-character YouTube video ID from various YouTube URL formats.
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - https://www.youtube.com/shorts/VIDEO_ID
 * 
 * @param {string} url - The YouTube URL to parse
 * @returns {string|null} - 11 character Video ID or null if invalid
 */
function extractYouTubeId(url) {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = trimmed.match(regExp);
  return (match && match[1]) ? match[1] : null;
}

/**
 * Converts a valid YouTube URL into an embeddable player URL with privacy enhancement.
 * @param {string} url - The YouTube URL
 * @returns {string|null} - Embed URL or null
 */
function getYouTubeEmbedUrl(url) {
  const videoId = extractYouTubeId(url);
  if (!videoId) return null;

  return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`;
}

/**
 * Returns a canonical watch URL for a video ID or cleans up a valid link.
 * @param {string} url - The YouTube URL
 * @returns {string|null}
 */
function getYouTubeWatchUrl(url) {
  const videoId = extractYouTubeId(url);
  if (!videoId) return null;
  return `https://www.youtube.com/watch?v=VIDEO_ID`.replace('VIDEO_ID', videoId);
}

/* ============================================================================
   DOM INITIALIZATION & PROJECT RENDERING
   ============================================================================ */
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    renderProjects();
    initContactInfo();
    initHeaderScroll();
    initMobileMenu();
    initVideoModal();
    initCurrentYear();
    initScrollReveals();
  });
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    PROJECTS_DATA,
    CONTACT_INFO,
    extractYouTubeId,
    getYouTubeEmbedUrl,
    getYouTubeWatchUrl
  };
}

/**
 * Dynamically builds and inserts the project cards into #projectsGrid.
 */
function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  grid.innerHTML = ""; // Clear fallback/existing

  PROJECTS_DATA.forEach((project, index) => {
    const card = document.createElement("article");
    card.className = "project-card reveal-on-scroll";
    card.setAttribute("data-project-id", project.id);
    card.style.setProperty("--card-order", index);

    const hasValidVideo = Boolean(extractYouTubeId(project.youtubeUrl));
    const watchUrl = hasValidVideo ? (getYouTubeWatchUrl(project.youtubeUrl) || project.youtubeUrl) : "#";

    card.innerHTML = `
      <!-- Thumbnail & Play Action -->
      <div class="project-media-wrapper" role="button" tabindex="0" aria-label="Open ${escapeHtml(project.title)} video player">
        <img 
          src="${escapeHtml(project.thumbnail)}" 
          alt="${escapeHtml(project.title)} — ${escapeHtml(project.brand)}" 
          class="project-thumbnail" 
          loading="lazy"
        >
        <span class="project-badge-top">PRJ // ${escapeHtml(project.number)}</span>
        <div class="project-play-overlay">
          <div class="play-circle">
            <span class="play-triangle"></span>
          </div>
        </div>
      </div>

      <!-- Project Information -->
      <div class="project-content">
        <div class="project-meta-header">
          <span class="project-brand">${escapeHtml(project.brand)}</span>
          <span class="project-brand-tag">[ ${escapeHtml(project.number)} ]</span>
        </div>

        <h3 class="project-title">${escapeHtml(project.title)}</h3>
        <p class="project-desc">${escapeHtml(project.description)}</p>

        <!-- Azeem's Contribution -->
        <div class="project-contribution">
          <strong>Contribution:</strong> ${escapeHtml(project.contribution)}
        </div>

        <!-- Action Links -->
        <div class="project-actions">
          <button type="button" class="btn-play-trigger" aria-label="Play video for ${escapeHtml(project.title)}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21"/>
            </svg>
            <span>Play Video</span>
          </button>

          ${hasValidVideo ? `
            <a 
              href="${escapeHtml(watchUrl)}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="external-youtube-link" 
              title="Watch on YouTube (opens new tab)"
            >
              <span>Watch on YouTube</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
          ` : `
            <span class="external-youtube-link disabled" title="Video link will be added soon">
              <span>Link Pending</span>
            </span>
          `}
        </div>
      </div>
    `;

    // Attach click events to open modal
    const mediaWrapper = card.querySelector(".project-media-wrapper");
    const playTriggerBtn = card.querySelector(".btn-play-trigger");

    const handleOpen = (e) => {
      e.preventDefault();
      openVideoModal(project);
    };

    mediaWrapper.addEventListener("click", handleOpen);
    mediaWrapper.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        handleOpen(e);
      }
    });

    playTriggerBtn.addEventListener("click", handleOpen);

    grid.appendChild(card);
  });

  // Observe newly rendered project cards if reveal observer is active
  if (window.__revealObserver) {
    grid.querySelectorAll(".project-card").forEach(card => {
      window.__revealObserver.observe(card);
    });
  }
}

/**
 * Injects contact details from CONTACT_INFO into the DOM elements.
 */
function initContactInfo() {
  const emailLink = document.getElementById("contactEmailLink");
  const displayEmail = document.getElementById("displayEmail");
  if (emailLink && displayEmail) {
    emailLink.href = `mailto:${CONTACT_INFO.email}`;
    displayEmail.textContent = CONTACT_INFO.email;
  }

  const instaLink = document.getElementById("contactInstagramLink");
  const displayInsta = document.getElementById("displayInstagram");
  if (instaLink && displayInsta) {
    instaLink.href = CONTACT_INFO.instagramUrl;
    displayInsta.textContent = CONTACT_INFO.instagramHandle;
  }

  const linkedLink = document.getElementById("contactLinkedinLink");
  const displayLinked = document.getElementById("displayLinkedin");
  if (linkedLink && displayLinked) {
    linkedLink.href = CONTACT_INFO.linkedinUrl;
    displayLinked.textContent = CONTACT_INFO.linkedinHandle;
  }
}

/* ============================================================================
   VIDEO MODAL FUNCTIONALITY (WITH REFINED SMOOTH TRANSITIONS)
   ============================================================================ */
let activeProject = null;
let isModalClosing = false;
let modalCloseTimeout = null;

function initVideoModal() {
  const modal = document.getElementById("videoModal");
  const backdrop = document.getElementById("modalBackdrop");
  const closeBtn = document.getElementById("modalCloseBtn");

  if (!modal) return;

  // Smooth, non-abrupt closing handler
  const closeModal = () => {
    if (isModalClosing || !modal.classList.contains("open")) return;
    isModalClosing = true;

    // Trigger smooth CSS exit transition
    modal.classList.add("is-closing");
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    // Clear any previous timeout
    clearTimeout(modalCloseTimeout);

    // Allow CSS transition to finish before removing iframe to avoid audio cut or flash
    modalCloseTimeout = setTimeout(() => {
      const playerContainer = document.getElementById("modalPlayerContainer");
      if (playerContainer) {
        playerContainer.innerHTML = "";
      }
      modal.classList.remove("is-closing");
      activeProject = null;
      isModalClosing = false;
    }, 360);
  };

  if (backdrop) backdrop.addEventListener("click", closeModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  // Close on Escape key press
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });
}

/**
 * Opens the video modal and loads either the YouTube player or a graceful placeholder.
 * @param {Object} project - The project data object
 */
function openVideoModal(project) {
  const modal = document.getElementById("videoModal");
  const playerContainer = document.getElementById("modalPlayerContainer");
  const modalBrand = document.getElementById("modalBrand");
  const modalTitle = document.getElementById("modalTitle");
  const modalContribution = document.getElementById("modalContribution");
  const modalExternalLink = document.getElementById("modalYoutubeExternalLink");

  if (!modal || !playerContainer) return;

  // Clear any pending closing animation
  clearTimeout(modalCloseTimeout);
  modal.classList.remove("is-closing");
  isModalClosing = false;

  activeProject = project;

  // Set meta info
  if (modalBrand) modalBrand.textContent = project.brand;
  if (modalTitle) modalTitle.textContent = project.title;
  if (modalContribution) modalContribution.textContent = project.contribution;

  const embedUrl = getYouTubeEmbedUrl(project.youtubeUrl);
  const watchUrl = getYouTubeWatchUrl(project.youtubeUrl);

  if (embedUrl) {
    // Valid YouTube video: inject responsive iframe
    playerContainer.innerHTML = `
      <iframe 
        src="${embedUrl}" 
        title="${escapeHtml(project.title)} — ${escapeHtml(project.brand)}" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowfullscreen>
      </iframe>
    `;

    if (modalExternalLink) {
      modalExternalLink.href = watchUrl || project.youtubeUrl;
      modalExternalLink.classList.remove("disabled");
      modalExternalLink.style.display = "inline-flex";
    }
  } else {
    // No video link or placeholder: show clean informative placeholder state
    playerContainer.innerHTML = `
      <div class="modal-empty-state">
        <div class="modal-empty-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
            <line x1="7" y1="2" x2="7" y2="22"></line>
            <line x1="17" y1="2" x2="17" y2="22"></line>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <line x1="2" y1="7" x2="7" y2="7"></line>
            <line x1="2" y1="17" x2="7" y2="17"></line>
            <line x1="17" y1="17" x2="22" y2="17"></line>
            <line x1="17" y1="7" x2="22" y2="7"></line>
          </svg>
        </div>
        <h4 class="modal-empty-title">YouTube Video Link Pending</h4>
        <p class="modal-empty-text">
          No video URL has been linked to <strong>${escapeHtml(project.title)}</strong> yet. 
          When you receive the YouTube link, paste it into <code>script.js</code> under <code>PROJECTS_DATA</code>.
        </p>
        <span class="modal-empty-code-hint">
          script.js &rarr; PROJECTS_DATA[${project.number - 1}].youtubeUrl = "https://www.youtube.com/watch?v=..."
        </span>
      </div>
    `;

    if (modalExternalLink) {
      modalExternalLink.href = "#";
      modalExternalLink.classList.add("disabled");
      modalExternalLink.style.display = "none";
    }
  }

  // Smoothly open modal via RAF
  requestAnimationFrame(() => {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden"; // Prevent background scroll
  });
}

/* ============================================================================
   NAVIGATION & UI INTERACTIONS
   ============================================================================ */
/**
 * Sticky header visual blur/background change on scroll.
 */
function initHeaderScroll() {
  const header = document.getElementById("header");
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/**
 * Mobile drawer navigation toggle.
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById("mobileMenuToggle");
  const drawer = document.getElementById("mobileDrawer");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  if (!toggleBtn || !drawer) return;

  const toggle = () => {
    const isOpen = drawer.classList.contains("open");
    if (isOpen) {
      drawer.classList.remove("open");
      toggleBtn.classList.remove("active");
      toggleBtn.setAttribute("aria-expanded", "false");
      drawer.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    } else {
      drawer.classList.add("open");
      toggleBtn.classList.add("active");
      toggleBtn.setAttribute("aria-expanded", "true");
      drawer.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
  };

  toggleBtn.addEventListener("click", toggle);

  // Close drawer when any mobile link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      drawer.classList.remove("open");
      toggleBtn.classList.remove("active");
      toggleBtn.setAttribute("aria-expanded", "false");
      drawer.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    });
  });
}

/**
 * Automatically sets the current year in the footer.
 */
function initCurrentYear() {
  const yearEl = document.getElementById("currentYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/**
 * Basic HTML escaping utility to prevent XSS.
 */
function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* ============================================================================
   REPEATABLE SCROLL-TRIGGERED REVEAL ANIMATIONS (INTERSECTION OBSERVER)
   ============================================================================ */
/**
 * Observes elements marked with `.reveal-on-scroll`.
 * When elements enter viewport, adds `.is-revealed`.
 * When elements exit viewport, removes `.is-revealed` so they animate again
 * when revisited during scrolling.
 * Respects prefers-reduced-motion.
 */
function initScrollReveals() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const elements = document.querySelectorAll(".reveal-on-scroll");

  if (prefersReducedMotion) {
    elements.forEach(el => el.classList.add("is-revealed"));
    return;
  }

  // Flag body that smooth reveals are active
  document.body.classList.add("reveals-enabled");

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
      } else {
        // Repeatable animation: remove class so it animates again upon revisit
        entry.target.classList.remove("is-revealed");
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -30px 0px"
  });

  window.__revealObserver = revealObserver;

  // Observe all current reveal elements
  elements.forEach(el => {
    revealObserver.observe(el);
  });
}

/**
 * ARI EKA PRIANDA - INTERACTIVE MECHA EXPERIENCE ENGINE
 * Responsive & Personal Gimmicks
 */

let isAudioEnabled = true;

document.addEventListener('DOMContentLoaded', () => {
  if (window.LangManager) {
    LangManager.init();
  }
  initMechaSplashScreen();
  initCustomCursor();
  initMobileNavigation();
  initSystemLogAccordions();
  initCopyEmail();
  initProjectModals();
  initParallaxEffects();
  initAudioEffects();
  initSmoothScroll();
  initKonamiCode();
  initEasterEggs();
  initFramer3DTilt();
  initFramerMagneticButtons();
  initFramerScrollReveal();
  initCertModal();
  initCVPreviewModal();
  initPhilosophyTabs();
  initAboutCamMonitor();
  initTechFilter();
  initProjectFilter();
  initTechStackFilter();
  initApiSandbox();
  initCliTerminal();
  initGithubTelemetry();
  initQuickSpecs();
  initCertFilter();
  initTransmissionForm();
  initBackToTop();
  initKeyboardShortcuts();
  initHeroParticleCanvas();
  initNavTelemetryClock();
  initSoftSkillAnimatedBars();
  initHeroStatCountUp();
  initTypingRoleEffect();
  initThemeToggle();
});

/* ==========================================================================
   1. MECHA BOOT TELEMETRY SPLASHSCREEN
   ========================================================================== */
function initMechaSplashScreen() {
  const splash = document.getElementById('mechaSplashScreen');
  const progressBar = document.getElementById('splashProgressBar');
  const percentLbl = document.getElementById('splashPercent');
  const log1 = document.getElementById('splashLog1');
  const log2 = document.getElementById('splashLog2');
  const log3 = document.getElementById('splashLog3');
  const skipBtn = document.getElementById('splashSkipBtn');

  if (!splash) return;

  let progress = 0;
  let isDismissed = false;

  const dismiss = () => {
    if (isDismissed) return;
    isDismissed = true;
    splash.classList.add('dismissed');
    setTimeout(() => {
      splash.remove();
    }, 500);
  };

  if (skipBtn) skipBtn.addEventListener('click', dismiss);
  splash.addEventListener('click', dismiss);

  const timer = setInterval(() => {
    progress += Math.floor(Math.random() * 8) + 4;
    if (progress > 100) progress = 100;

    if (progressBar) progressBar.style.width = `${progress}%`;
    if (percentLbl) percentLbl.textContent = `${progress}%`;

    if (progress >= 30 && log2) {
      log2.classList.add('active');
    }
    if (progress >= 70 && log3) {
      log3.classList.add('active');
    }

    if (progress >= 100) {
      clearInterval(timer);
      setTimeout(dismiss, 350);
    }
  }, 40);
}

/* ==========================================================================
   2. DESKTOP CUSTOM CURSOR
   ========================================================================== */
function initCustomCursor() {
  const dot = document.getElementById('cursorDot');
  const outline = document.getElementById('cursorOutline');

  if (!dot || !outline) return;

  if (window.matchMedia('(pointer: coarse)').matches) {
    dot.style.display = 'none';
    outline.style.display = 'none';
    return;
  }

  let mouseX = -100, mouseY = -100;
  let outlineX = -100, outlineY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  function animateOutline() {
    outlineX += (mouseX - outlineX) * 0.18;
    outlineY += (mouseY - outlineY) * 0.18;
    outline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
    requestAnimationFrame(animateOutline);
  }
  requestAnimationFrame(animateOutline);

  const interactives = document.querySelectorAll('a, button, input, textarea, select, .project-log-toggle, .btn-phil-tab, .tech-filter-btn');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  const viewCards = document.querySelectorAll('[data-cursor="view"]');
  viewCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-view');
      outline.textContent = 'VIEW';
    });
    card.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-view');
      outline.textContent = '';
    });
  });
}

/* ==========================================================================
   3. MOBILE NAVIGATION HAMBURGER & DRAWER
   ========================================================================== */
function initMobileNavigation() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const navPanel = document.getElementById('mobileNavPanel');
  const navLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-panel .trigger-cv-download');

  if (!menuBtn || !navPanel) return;

  menuBtn.addEventListener('click', () => {
    const isOpen = navPanel.classList.contains('open');
    if (isOpen) {
      navPanel.classList.remove('open');
      menuBtn.classList.remove('active');
    } else {
      navPanel.classList.add('open');
      menuBtn.classList.add('active');
      playMechaBeep(880, 0.04);
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navPanel.classList.remove('open');
      menuBtn.classList.remove('active');
    });
  });
}

/* ==========================================================================
   4. INLINE PROJECT "SYSTEM LOG" EXPANDABLE
   ========================================================================== */
function initSystemLogAccordions() {
  const toggles = document.querySelectorAll('.project-log-toggle');

  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const targetId = toggle.getAttribute('data-target');
      const panel = document.getElementById(targetId);

      if (!panel) return;

      const isOpen = panel.classList.contains('open');
      if (isOpen) {
        panel.classList.remove('open');
        toggle.textContent = '[ + SYSTEM DETAILS ]';
      } else {
        panel.classList.add('open');
        toggle.textContent = '[ - CLOSE DETAILS ]';
      }
    });
  });
}

/* ==========================================================================
   5. COPY EMAIL WITH COMPACT TOAST
   ========================================================================== */
function initCopyEmail() {
  const copyBtns = document.querySelectorAll('#btnCopyEmail, .trigger-copy-email');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'ariekaprianda@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast(window.LangManager ? LangManager.t('toast_email_copied') : '✓ Email copied: ariekaprianda@gmail.com');
      }).catch(() => {
        showToast('Email: ariekaprianda@gmail.com');
      });
      playMechaBeep(1200, 0.05);
    });
  });
}

function showToast(message) {
  const existing = document.querySelector('.mecha-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'mecha-toast';
  toast.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    background: #0B2A5B;
    color: #ffffff;
    border-left: 3px solid #10B981;
    border-top: 1px solid #1769E0;
    padding: 10px 18px;
    border-radius: 4px;
    box-shadow: 0 10px 24px rgba(11, 42, 91, 0.25);
    font-family: var(--font-mono, monospace);
    font-size: 0.8rem;
    font-weight: 600;
    z-index: 99999;
    display: flex;
    align-items: center;
    gap: 8px;
    animation: toast-fade-in 0.25s ease;
  `;
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

/* ==========================================================================
   6. 3D MECHA COCKPIT & HERO PARALLAX TILT
   ========================================================================== */
function initParallaxEffects() {
  if (window.innerWidth < 1024) return;

  const heroPanel = document.getElementById('hero');
  const heroVisual = document.querySelector('.hero-right-visual');
  const heroBackdrop = document.querySelector('.mecha-backdrop-img');
  const heroLeft = document.querySelector('.hero-left');
  const heroFlank = document.querySelector('.hero-flank-annotations');

  if (heroPanel && heroVisual) {
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;

    heroPanel.addEventListener('mousemove', (e) => {
      const rect = heroPanel.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      mouseX = (x / (rect.width / 2));
      mouseY = (y / (rect.height / 2));
    });

    heroPanel.addEventListener('mouseleave', () => {
      mouseX = 0;
      mouseY = 0;
    });

    function animateHeroParallax() {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;

      if (heroVisual) {
        const rotY = currentX * 7;
        const rotX = -currentY * 7;
        const transX = currentX * 12;
        const transY = currentY * 8;
        heroVisual.style.transform = `perspective(1200px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translate3d(${transX.toFixed(1)}px, ${transY.toFixed(1)}px, 15px)`;
      }

      if (heroBackdrop) {
        heroBackdrop.style.transform = `scale(1.03) translate3d(${(currentX * 6).toFixed(1)}px, ${(currentY * 4).toFixed(1)}px, 0)`;
      }

      if (heroLeft) {
        const transX = -currentX * 6;
        const transY = -currentY * 4;
        heroLeft.style.transform = `translate3d(${transX.toFixed(1)}px, ${transY.toFixed(1)}px, 0)`;
      }

      if (heroFlank) {
        const transY = currentY * 10;
        heroFlank.style.transform = `translate3d(0, ${transY.toFixed(1)}px, 0)`;
      }

      requestAnimationFrame(animateHeroParallax);
    }
    requestAnimationFrame(animateHeroParallax);
  }
}

/* ==========================================================================
   7. PROJECT MODALS & LOCALIZED DATA
   ========================================================================== */
let currentActiveProjectId = null;

function getLocalizedProject(projectId) {
  if (typeof PORTFOLIO_DATA === 'undefined' || !PORTFOLIO_DATA.projects) return null;
  const project = PORTFOLIO_DATA.projects[projectId];
  if (!project) return null;

  const lang = (window.LangManager && typeof LangManager.getLang === 'function') ? LangManager.getLang() : 'id';
  const dict = (window.I18N && window.I18N[lang]) || (window.I18N && window.I18N['id']) || {};

  const titleKey = `proj_${projectId}_title`;
  const catKey = `proj_${projectId}_cat`;
  const overviewKey = `proj_${projectId}_overview`;

  let features = project.features;
  const fKeys = [
    `proj_${projectId}_f1`,
    `proj_${projectId}_f2`,
    `proj_${projectId}_f3`,
    `proj_${projectId}_f4`,
    `proj_${projectId}_f5`
  ];
  if (dict[fKeys[0]]) {
    features = fKeys.map(k => dict[k]).filter(Boolean);
  }

  return {
    ...project,
    title: dict[titleKey] || project.title,
    category: dict[catKey] || project.category,
    overview: dict[overviewKey] || project.overview,
    features: features
  };
}

function initProjectModals() {
  const modalOverlay = document.getElementById('projectModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const detailButtons = document.querySelectorAll('.btn-view-details');

  if (!modalOverlay) return;

  detailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      currentActiveProjectId = projectId;
      const project = getLocalizedProject(projectId) || (PORTFOLIO_DATA.projects && PORTFOLIO_DATA.projects[projectId]);

      if (project) {
        renderModalContent(project);
        modalOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
        playMechaBeep(720, 0.05);
      }
    });
  });

  const closeModal = () => {
    currentActiveProjectId = null;
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });

  if (window.LangManager) {
    LangManager.onChange(() => {
      if (currentActiveProjectId && modalOverlay.classList.contains('open')) {
        const project = getLocalizedProject(currentActiveProjectId);
        if (project) renderModalContent(project);
      }
    });
  }
}

function renderModalContent(project) {
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');

  modalTitle.textContent = `${project.id} // ${project.title}`;

  modalBody.innerHTML = `
    <div style="margin-bottom: 1.25rem;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
        <span style="font-family: var(--font-mono, monospace); font-size:0.72rem; color:var(--accent-blue, #1769e0); font-weight:700; background:rgba(23, 105, 224, 0.08); padding:3px 8px; border-radius:3px;">
          ${project.category}
        </span>
        <span style="font-family: var(--font-mono, monospace); font-size:0.7rem; color:var(--text-muted, #64748b);">
          SPEC_ID // ${project.id}_2026
        </span>
      </div>
      <p style="font-size:0.95rem; color:var(--text-secondary, #334155); line-height:1.7; margin-bottom:1.25rem;">
        ${project.overview}
      </p>
    </div>

    <!-- Architecture Schematic Box -->
    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-left:3px solid #1769e0; padding:1rem; border-radius:4px; margin-bottom:1.5rem;">
      <div style="font-family:var(--font-mono, monospace); font-size:0.72rem; font-weight:700; color:#0b2a5b; margin-bottom:4px; text-transform:uppercase;">
        ${window.LangManager ? LangManager.t('modal_arch_label') : 'Architecture Data Flow:'}
      </div>
      <div style="font-family:var(--font-mono, monospace); font-size:0.8rem; color:#1769e0; font-weight:600;">
        ${project.architecture}
      </div>
    </div>

    <!-- Features -->
    <div style="margin-bottom: 1.5rem;">
      <h4 style="font-family:var(--font-heading, sans-serif); font-size:0.92rem; font-weight:700; color:#0b2a5b; margin-bottom:0.6rem;">
        ${window.LangManager ? LangManager.t('modal_modules_label') : 'Key Architectural Modules:'}
      </h4>
      <ul style="list-style:none; display:flex; flex-direction:column; gap:8px;">
        ${project.features.map(f => `
          <li style="font-size:0.85rem; color:#475569; display:flex; align-items:flex-start; gap:8px;">
            <span style="color:#e53935; font-weight:bold;">▸</span>
            <span>${f}</span>
          </li>
        `).join('')}
      </ul>
    </div>

    <!-- System Metrics -->
    <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:10px; margin-bottom:1.5rem; background:#F7F9FC; padding:0.85rem; border-radius:4px; border:1px solid #e2e8f0;">
      ${Object.entries(project.metrics).map(([key, val]) => `
        <div>
          <div style="font-family:var(--font-mono, monospace); font-size:0.65rem; color:#64748b; text-transform:uppercase;">${key}</div>
          <div style="font-family:var(--font-heading, sans-serif); font-size:0.9rem; font-weight:700; color:#0b2a5b;">${val}</div>
        </div>
      `).join('')}
    </div>

    <!-- Technologies -->
    <div style="margin-bottom:1.25rem;">
      <div style="display:flex; flex-wrap:wrap; gap:6px;">
        ${project.techStack.map(t => `
          <span style="font-family:var(--font-mono, monospace); font-size:0.72rem; font-weight:600; color:#1769e0; background:rgba(23, 105, 224, 0.08); border:1px solid rgba(23, 105, 224, 0.2); padding:3px 9px; border-radius:3px;">
            ${t}
          </span>
        `).join('')}
      </div>
    </div>
  `;
}

/* ==========================================================================
   8. AUDIO SYNTHESIS FEEDBACK & TOGGLE
   ========================================================================== */
let audioCtx = null;

function playMechaBeep(freq = 600, duration = 0.03) {
  if (!isAudioEnabled) return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.018, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    // Audio restricted before gesture
  }
}

function initAudioEffects() {
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const soundLabel = document.getElementById('soundToggleLabel');

  if (soundToggleBtn) {
    const updateSoundLabel = () => {
      if (!soundLabel) return;
      if (isAudioEnabled) {
        soundLabel.textContent = window.LangManager ? LangManager.t('nav_sfx_on') : 'SFX: ON';
      } else {
        soundLabel.textContent = window.LangManager ? LangManager.t('nav_sfx_off') : 'SFX: OFF';
      }
    };

    if (window.LangManager) {
      LangManager.onChange(updateSoundLabel);
    }

    soundToggleBtn.addEventListener('click', () => {
      isAudioEnabled = !isAudioEnabled;
      if (isAudioEnabled) {
        soundToggleBtn.classList.remove('muted');
        updateSoundLabel();
        playMechaBeep(880, 0.05);
        showToast(window.LangManager ? LangManager.t('toast_sfx_enabled') : '🔊 Mecha Audio Telemetry Enabled');
      } else {
        soundToggleBtn.classList.add('muted');
        updateSoundLabel();
        showToast(window.LangManager ? LangManager.t('toast_sfx_muted') : '🔇 Mecha Audio Muted');
      }
    });
  }

  const buttons = document.querySelectorAll('button, .btn-hero-red, .btn-hero-white, .btn-nav-cv, .btn-project-fill-blue, .btn-project-outline-white');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => playMechaBeep(980, 0.04));
  });

  // CV Preview Modal Trigger (open modal to preview first, download from inside)
  const cvButtons = document.querySelectorAll('.trigger-cv-download');
  cvButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      playMechaBeep(1100, 0.06);
      openCVPreviewModal();
    });
  });
}

/* ==========================================================================
   9. KONAMI CODE EASTER EGG (↑ ↑ ↓ ↓ ← → ← →)
   ========================================================================== */
function initKonamiCode() {
  const pattern = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight'
  ];
  let current = 0;

  document.addEventListener('keydown', (e) => {
    if (e.key === pattern[current]) {
      current++;
      if (current === pattern.length) {
        triggerKonamiEasterEgg();
        current = 0;
      }
    } else {
      current = 0;
    }
  });

  function triggerKonamiEasterEgg() {
    playMechaBeep(1400, 0.15);
    showToast(window.LangManager ? LangManager.t('toast_secret_unlocked') : '⚡ SECRET MODE UNLOCKED: TACTICAL HUD');
    document.body.classList.add('mecha-tactical-mode');

    setTimeout(() => {
      document.body.classList.remove('mecha-tactical-mode');
    }, 3200);
  }
}

/* ==========================================================================
   10. EASTER EGGS (GEAR ROTATION & MACHINE DIAGRAM)
   ========================================================================== */
function initEasterEggs() {
  const diagram = document.getElementById('machineTransitionDiagram');
  if (diagram) {
    diagram.addEventListener('click', () => {
      playMechaBeep(1020, 0.05);
      showToast('⚙ Mechanical Kinematics → Systems Architecture: Precision verified.');
    });
  }
}

/* ==========================================================================
   11. SMOOTH SCROLL & SCROLL SPY
   ========================================================================== */
function initSmoothScroll() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], div[id].mecha-panel');

  window.addEventListener('scroll', () => {
    if (navbar) {
      if (window.scrollY > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    let currentSectionId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '#download-cv') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 76;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ==========================================================================
   12. FRAMER 3D TILT ENGINE WITH SPECULAR LIGHT GLARE
   ========================================================================== */
function initFramer3DTilt() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const tiltCards = document.querySelectorAll('.framer-3d-card');

  tiltCards.forEach(card => {
    let bounds;
    let isHovering = false;
    let targetRotX = 0, targetRotY = 0;
    let currRotX = 0, currRotY = 0;
    let animId = null;

    function updateCard3D() {
      if (!isHovering) {
        currRotX += (0 - currRotX) * 0.12;
        currRotY += (0 - currRotY) * 0.12;
        card.style.transform = `perspective(1000px) rotateX(${currRotX.toFixed(2)}deg) rotateY(${currRotY.toFixed(2)}deg) translateZ(0px)`;
        if (Math.abs(currRotX) > 0.05 || Math.abs(currRotY) > 0.05) {
          animId = requestAnimationFrame(updateCard3D);
        } else {
          card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
          animId = null;
        }
        return;
      }

      currRotX += (targetRotX - currRotX) * 0.18;
      currRotY += (targetRotY - currRotY) * 0.18;

      card.style.transform = `perspective(1000px) rotateX(${currRotX.toFixed(2)}deg) rotateY(${currRotY.toFixed(2)}deg) translateZ(10px)`;
      animId = requestAnimationFrame(updateCard3D);
    }

    card.addEventListener('mouseenter', () => {
      bounds = card.getBoundingClientRect();
      isHovering = true;
      card.style.setProperty('--glare-opacity', '0.4');
      if (!animId) animId = requestAnimationFrame(updateCard3D);
    });

    card.addEventListener('mousemove', (e) => {
      if (!bounds) bounds = card.getBoundingClientRect();
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      const centerX = bounds.width / 2;
      const centerY = bounds.height / 2;

      targetRotX = -((mouseY - centerY) / centerY) * 7;
      targetRotY = ((mouseX - centerX) / centerX) * 7;

      const glareX = (mouseX / bounds.width) * 100;
      const glareY = (mouseY / bounds.height) * 100;
      card.style.setProperty('--glare-x', `${glareX.toFixed(1)}%`);
      card.style.setProperty('--glare-y', `${glareY.toFixed(1)}%`);
    });

    card.addEventListener('mouseleave', () => {
      isHovering = false;
      targetRotX = 0;
      targetRotY = 0;
      card.style.setProperty('--glare-opacity', '0');
    });
  });
}

/* ==========================================================================
   13. FRAMER MAGNETIC BUTTON ENGINE
   ========================================================================== */
function initFramerMagneticButtons() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const magneticBtns = document.querySelectorAll('.framer-magnetic');

  magneticBtns.forEach(btn => {
    let bounds;

    btn.addEventListener('mouseenter', () => {
      bounds = btn.getBoundingClientRect();
      btn.style.transition = 'transform 0.1s ease-out';
    });

    btn.addEventListener('mousemove', (e) => {
      if (!bounds) bounds = btn.getBoundingClientRect();
      const btnCenterX = bounds.left + bounds.width / 2;
      const btnCenterY = bounds.top + bounds.height / 2;

      const pullX = (e.clientX - btnCenterX) * 0.25;
      const pullY = (e.clientY - btnCenterY) * 0.25;

      btn.style.transform = `translate3d(${pullX.toFixed(1)}px, ${pullY.toFixed(1)}px, 0)`;
    });

    btn.addEventListener('mouseleave', () => {
      bounds = null;
      btn.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      btn.style.transform = 'translate3d(0px, 0px, 0)';
    });
  });
}

/* ==========================================================================
   14. FRAMER SCROLL REVEAL (INTERSECTION OBSERVER)
   ========================================================================== */
function initFramerScrollReveal() {
  const revealElements = document.querySelectorAll('.framer-reveal, .framer-reveal-left, .framer-reveal-right');
  if (!revealElements.length) return;

  // Immediately make all sections and elements active so they are never blank
  revealElements.forEach(el => {
    el.classList.add('in-view');
  });
}

/* ==========================================================================
   15. CERTIFICATE LIGHTBOX (PDF.js Canvas Viewer)
   ========================================================================== */
let openCertModalGlobal = null;

function initCertModal() {
  const overlay = document.getElementById('certModal');
  const titleEl = document.getElementById('certModalTitle');
  const loadingEl = document.getElementById('certLoadingIndicator');
  const errorEl = document.getElementById('certErrorState');
  const errorOpenBtn = document.getElementById('certErrorOpenBtn');
  const closeBtn = document.getElementById('certModalCloseBtn');
  const downloadBtn = document.getElementById('certDownloadBtn');
  const openBtn = document.getElementById('certOpenBtn');

  // PDF.js canvas elements
  const pdfNav = document.getElementById('certPdfNav');
  const prevBtn = document.getElementById('certPrevPage');
  const nextBtn = document.getElementById('certNextPage');
  const pageInfo = document.getElementById('certPageInfo');
  const canvasWrapper = document.getElementById('certCanvasWrapper');
  const pdfCanvas = document.getElementById('certPdfCanvas');

  // Image elements
  const imgWrapper = document.getElementById('certImgWrapper');
  const imgEl = document.getElementById('certImgEl');

  if (!overlay) return;

  // PDF.js worker
  if (window.pdfjsLib) {
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  }

  let currentPdfDoc = null;
  let currentPage = 1;
  let totalPages = 1;
  let renderTask = null;
  let currentCertPath = '';

  function showLoading() {
    if (loadingEl) { loadingEl.style.display = 'flex'; loadingEl.classList.remove('hidden'); }
    if (errorEl) errorEl.style.display = 'none';
    if (canvasWrapper) canvasWrapper.style.display = 'none';
    if (imgWrapper) imgWrapper.style.display = 'none';
    if (pdfNav) pdfNav.style.display = 'none';
  }

  function showError(path) {
    if (loadingEl) loadingEl.style.display = 'none';
    if (canvasWrapper) canvasWrapper.style.display = 'none';
    if (imgWrapper) imgWrapper.style.display = 'none';
    if (pdfNav) pdfNav.style.display = 'none';
    if (errorEl) errorEl.style.display = 'flex';
    if (errorOpenBtn) errorOpenBtn.href = path;
  }

  function showCanvas() {
    if (loadingEl) loadingEl.style.display = 'none';
    if (errorEl) errorEl.style.display = 'none';
    if (imgWrapper) imgWrapper.style.display = 'none';
    if (canvasWrapper) canvasWrapper.style.display = 'flex';
  }

  function showImage() {
    if (loadingEl) loadingEl.style.display = 'none';
    if (errorEl) errorEl.style.display = 'none';
    if (canvasWrapper) canvasWrapper.style.display = 'none';
    if (pdfNav) pdfNav.style.display = 'none';
    if (imgWrapper) imgWrapper.style.display = 'flex';
  }

  function updatePageNav() {
    if (pageInfo) pageInfo.textContent = `${currentPage} / ${totalPages}`;
    if (prevBtn) prevBtn.disabled = currentPage <= 1;
    if (nextBtn) nextBtn.disabled = currentPage >= totalPages;
    if (pdfNav) pdfNav.style.display = totalPages > 1 ? 'flex' : 'none';
  }

  async function renderPage(pageNum) {
    if (!currentPdfDoc || !pdfCanvas) return;

    // Cancel any previous render
    if (renderTask) {
      try { renderTask.cancel(); } catch (e) {}
    }

    showCanvas();
    try {
      const page = await currentPdfDoc.getPage(pageNum);
      const ctx = pdfCanvas.getContext('2d');

      // Scale to fit modal width
      const wrapperWidth = canvasWrapper ? canvasWrapper.clientWidth || 800 : 800;
      const desiredWidth = Math.min(wrapperWidth - 16, 1200);
      const viewport = page.getViewport({ scale: 1 });
      const scale = desiredWidth / viewport.width;
      const scaledViewport = page.getViewport({ scale });

      pdfCanvas.width = scaledViewport.width;
      pdfCanvas.height = scaledViewport.height;

      renderTask = page.render({ canvasContext: ctx, viewport: scaledViewport });
      await renderTask.promise;
      renderTask = null;

      currentPage = pageNum;
      updatePageNav();
    } catch (err) {
      if (err && err.name !== 'RenderingCancelledException') {
        console.error('PDF render error:', err);
        showError(currentCertPath);
      }
    }
  }

  async function loadPdf(certPath) {
    if (!window.pdfjsLib) {
      showError(certPath);
      return;
    }
    try {
      const loadingTask = pdfjsLib.getDocument(certPath);
      currentPdfDoc = await loadingTask.promise;
      totalPages = currentPdfDoc.numPages;
      currentPage = 1;
      await renderPage(1);
    } catch (err) {
      console.error('PDF load error:', err);
      showError(certPath);
    }
  }

  function loadImage(certPath) {
    if (!imgEl) { showError(certPath); return; }
    imgEl.onload = () => showImage();
    imgEl.onerror = () => showError(certPath);
    imgEl.src = certPath;
  }

  const openCertModal = (certPath, certTitle) => {
    currentCertPath = certPath;
    if (titleEl) titleEl.textContent = certTitle || 'CERTIFICATE';
    if (downloadBtn) downloadBtn.href = certPath;
    if (openBtn) openBtn.href = certPath;

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    playMechaBeep(820, 0.04);

    showLoading();

    // Determine file type
    const isImage = /\.(png|jpe?g|gif|webp|svg)$/i.test(certPath);
    if (isImage) {
      loadImage(certPath);
    } else {
      // PDF or other – try PDF.js
      loadPdf(certPath);
    }
  };

  openCertModalGlobal = openCertModal;

  const closeCertModal = () => {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    if (renderTask) {
      try { renderTask.cancel(); } catch (e) {}
      renderTask = null;
    }
    currentPdfDoc = null;
    currentPage = 1;
    totalPages = 1;
    currentCertPath = '';
    setTimeout(() => {
      showLoading();
      if (pdfCanvas) { pdfCanvas.width = 0; pdfCanvas.height = 0; }
      if (imgEl) imgEl.src = '';
    }, 350);
  };

  // Prev / Next page
  if (prevBtn) prevBtn.addEventListener('click', () => {
    if (currentPage > 1) renderPage(currentPage - 1);
  });
  if (nextBtn) nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) renderPage(currentPage + 1);
  });

  if (closeBtn) closeBtn.addEventListener('click', closeCertModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeCertModal();
  });

  document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('active')) return;
    if (e.key === 'Escape') closeCertModal();
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      if (currentPage < totalPages) renderPage(currentPage + 1);
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      if (currentPage > 1) renderPage(currentPage - 1);
    }
  });

  document.querySelectorAll('.btn-view-cert').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const certPath = btn.dataset.cert;
      const certTitle = btn.dataset.certTitle;
      if (certPath) openCertModal(certPath, certTitle);
    });
  });

  // Gallery card thumbnails (new cert-gallery-grid layout)
  document.querySelectorAll('.cert-card-thumb').forEach((thumb) => {
    thumb.addEventListener('click', (e) => {
      e.stopPropagation();
      const certPath = thumb.dataset.cert;
      const certTitle = thumb.dataset.certTitle;
      if (certPath) openCertModal(certPath, certTitle);
    });
    thumb.style.cursor = 'pointer';
  });
}

/* ==========================================================================
   16. PHILOSOPHY TABS SWITCHER (About Me)
   ========================================================================== */
function initPhilosophyTabs() {
  const tabs = document.querySelectorAll('.btn-phil-tab');
  const displayTitle = document.getElementById('philDisplayTitle');
  const displayDesc = document.getElementById('philDisplayDesc');

  function updatePhilosophyDisplay() {
    const activeTab = document.querySelector('.btn-phil-tab.active');
    const key = activeTab ? activeTab.dataset.tab : 'precision';
    const lang = window.LangManager ? LangManager.getLang() : 'id';
    const dict = (window.I18N && I18N[lang]) ? I18N[lang] : (window.I18N ? I18N['id'] : null);

    if (dict && displayTitle && displayDesc) {
      if (key === 'precision') {
        displayTitle.textContent = dict.phil_title_1;
        displayDesc.textContent = dict.phil_desc_1;
      } else if (key === 'scalability') {
        displayTitle.textContent = dict.phil_title_2;
        displayDesc.textContent = dict.phil_desc_2;
      } else if (key === 'integration') {
        displayTitle.textContent = dict.phil_title_3;
        displayDesc.textContent = dict.phil_desc_3;
      }
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      updatePhilosophyDisplay();
      playMechaBeep(780, 0.04);
    });
  });

  if (window.LangManager) {
    LangManager.onChange(() => {
      updatePhilosophyDisplay();
    });
  }
}

/* ==========================================================================
   16B. ABOUT ME TACTICAL MULTI-ANGLE CAMERA MONITOR
   ========================================================================== */
function initAboutCamMonitor() {
  const monitor = document.getElementById('aboutCamMonitor');
  if (!monitor) return;

  const slides = monitor.querySelectorAll('.cam-slide');
  const tabs = monitor.querySelectorAll('.cam-tab-btn');
  const prevBtn = document.getElementById('camPrevBtn');
  const nextBtn = document.getElementById('camNextBtn');
  const channelLbl = document.getElementById('camChannelLabel');
  const counterLbl = document.getElementById('camCounterLabel');

  if (!slides.length) return;

  let currentIndex = 0;
  let autoTimer = null;
  const total = slides.length;

  function switchCamera(newIndex) {
    if (newIndex < 0) newIndex = total - 1;
    if (newIndex >= total) newIndex = 0;
    currentIndex = newIndex;

    slides.forEach((s, i) => {
      s.classList.toggle('active', i === currentIndex);
    });

    tabs.forEach((t, i) => {
      t.classList.toggle('active', i === currentIndex);
    });

    const activeSlide = slides[currentIndex];
    if (channelLbl) {
      const channelKeys = ['cam_caption_title_1', 'cam_caption_title_2', 'cam_caption_title_3'];
      const defaultChannels = ['PROFILE', 'WORKSPACE', 'ORIGIN'];
      const sub = window.LangManager ? LangManager.t(channelKeys[currentIndex], defaultChannels[currentIndex]) : defaultChannels[currentIndex];
      channelLbl.textContent = `CAM-0${currentIndex + 1} // ${sub.toUpperCase()}`;
    }
    if (counterLbl && activeSlide.dataset.counter) {
      counterLbl.textContent = activeSlide.dataset.counter;
    }

    if (typeof playMechaBeep === 'function') {
      playMechaBeep(780 + currentIndex * 70, 0.03);
    }
  }

  // Button Listeners
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      switchCamera(currentIndex - 1);
      resetAutoTimer();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      switchCamera(currentIndex + 1);
      resetAutoTimer();
    });
  }

  // Tabs Listeners
  tabs.forEach((tab) => {
    tab.addEventListener('click', (e) => {
      e.stopPropagation();
      const target = parseInt(tab.dataset.target, 10);
      if (!isNaN(target)) {
        switchCamera(target);
        resetAutoTimer();
      }
    });
  });

  // Touch Swipe for Mobile
  let startX = 0;
  monitor.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  monitor.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) switchCamera(currentIndex + 1);
      else switchCamera(currentIndex - 1);
      resetAutoTimer();
    }
  }, { passive: true });

  // Autoplay rotation every 5.5s (pauses on hover)
  function startAutoTimer() {
    stopAutoTimer();
    autoTimer = setInterval(() => {
      switchCamera(currentIndex + 1);
    }, 5500);
  }

  function stopAutoTimer() {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  function resetAutoTimer() {
    stopAutoTimer();
    startAutoTimer();
  }

  monitor.addEventListener('mouseenter', stopAutoTimer);
  monitor.addEventListener('mouseleave', startAutoTimer);

  if (window.LangManager) {
    LangManager.onChange(() => {
      switchCamera(currentIndex);
    });
  }

  startAutoTimer();
}

/* ==========================================================================
   17. TECH CONSTELLATION SHOWCASE — FILTER + TOOLTIP
   ========================================================================== */
function initTechFilter() {
  // ── Legend / Category Filter Buttons ──
  const legendBtns = document.querySelectorAll('.legend-filter-item[data-cat-filter]');
  const orbitNodes = document.querySelectorAll('.orbit-node[data-cat]');
  const pillBadges = document.querySelectorAll('.tech-pill-badge[data-cat]');
  const orbitSystem = document.getElementById('techOrbitSystem');
  const tooltip = document.getElementById('orbitTooltip') || document.getElementById('constellationTooltip');
  const tooltipName = document.getElementById('orbitTooltipName') || document.getElementById('tooltipTechName');
  const tooltipCat  = document.getElementById('orbitTooltipCat') || document.getElementById('tooltipTechCat');

  const catLabels = {
    lang: 'PROGRAMMING LANGUAGE',
    be:   'ENTERPRISE BACKEND',
    fe:   'MODERN FRONTEND',
    db:   'DATABASE SYSTEM',
    ops:  'DEVOPS & CLOUD TOOL',
    all:  'FULL STACK'
  };

  const catColors = {
    lang: '#f59e0b',
    be:   '#8b5cf6',
    fe:   '#10b981',
    db:   '#3b82f6',
    ops:  '#ef4444'
  };

  function filterByCategory(cat) {
    orbitNodes.forEach(node => {
      if (cat === 'all' || node.dataset.cat === cat) {
        node.classList.remove('dimmed');
      } else {
        node.classList.add('dimmed');
      }
    });

    pillBadges.forEach(pill => {
      if (cat === 'all' || pill.dataset.cat === cat) {
        pill.classList.remove('dimmed');
      } else {
        pill.classList.add('dimmed');
      }
    });
  }

  legendBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      legendBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.catFilter;
      filterByCategory(cat);
      if (typeof playMechaBeep === 'function') playMechaBeep(880, 0.03);
    });
  });

  // ── Tooltip & Cross-Highlight on Orbit Node Hover ──
  orbitNodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
      const techName = node.dataset.tech || '';
      const techCat  = node.dataset.cat  || '';
      const pillId   = node.dataset.pill;

      if (tooltipName) tooltipName.textContent = techName;
      if (tooltipCat) {
        tooltipCat.textContent = catLabels[techCat] || techCat.toUpperCase();
        tooltipCat.style.color = catColors[techCat] || '#10b981';
      }
      if (tooltip) {
        tooltip.style.borderColor = catColors[techCat] || '#10b981';
        tooltip.classList.add('visible');
      }

      // Cross-highlight corresponding pill badge
      if (pillId) {
        const matchingPill = document.getElementById(pillId);
        if (matchingPill) matchingPill.classList.add('active-highlight');
      }
    });

    node.addEventListener('mouseleave', () => {
      if (tooltip) tooltip.classList.remove('visible');
      const pillId = node.dataset.pill;
      if (pillId) {
        const matchingPill = document.getElementById(pillId);
        if (matchingPill) matchingPill.classList.remove('active-highlight');
      }
    });
  });

  // ── Cross-Highlight Orbit Node when hovering Pill Badge ──
  pillBadges.forEach(pill => {
    const pillId = pill.id;
    if (!pillId) return;

    pill.addEventListener('mouseenter', () => {
      const matchingNode = document.querySelector(`.orbit-node[data-pill="${pillId}"]`);
      if (matchingNode) {
        matchingNode.classList.add('is-active');
        if (orbitSystem) orbitSystem.classList.add('is-paused');

        const techName = matchingNode.dataset.tech || '';
        const techCat  = matchingNode.dataset.cat  || '';
        if (tooltipName) tooltipName.textContent = techName;
        if (tooltipCat) {
          tooltipCat.textContent = catLabels[techCat] || techCat.toUpperCase();
          tooltipCat.style.color = catColors[techCat] || '#10b981';
        }
        if (tooltip) {
          tooltip.style.borderColor = catColors[techCat] || '#10b981';
          tooltip.classList.add('visible');
        }
      }
    });

    pill.addEventListener('mouseleave', () => {
      const matchingNode = document.querySelector(`.orbit-node[data-pill="${pillId}"]`);
      if (matchingNode) {
        matchingNode.classList.remove('is-active');
      }
      if (orbitSystem) orbitSystem.classList.remove('is-paused');
      if (tooltip) tooltip.classList.remove('visible');
    });
  });
}


/* ==========================================================================
   18. PROJECTS CATEGORY & TECH STACK FILTER
   ========================================================================== */
let activeCategoryFilter = 'all';
let activeStackFilter = 'all';

function applyUnifiedProjectFilters() {
  const cards = document.querySelectorAll('.project-item-card');
  cards.forEach(card => {
    const cardCats = (card.dataset.pcat || '').split(' ');
    const cardTechs = (card.dataset.techs || '').toLowerCase();

    const matchCat = (activeCategoryFilter === 'all' || cardCats.includes(activeCategoryFilter) || card.dataset.pcat === activeCategoryFilter);
    const matchStack = (activeStackFilter === 'all' || cardTechs.includes(activeStackFilter.toLowerCase()));

    if (matchCat && matchStack) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

function initProjectFilter() {
  const filterBtns = document.querySelectorAll('[data-pfilter]');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategoryFilter = btn.dataset.pfilter;
      playMechaBeep(880, 0.03);
      applyUnifiedProjectFilters();
    });
  });
}

function initTechStackFilter() {
  const stackBtns = document.querySelectorAll('[data-tfilter]');
  stackBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      stackBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeStackFilter = btn.dataset.tfilter;
      playMechaBeep(920, 0.03);
      applyUnifiedProjectFilters();
    });
  });
}

/* ==========================================================================
   19. INLINE QUICK SPEC EXPANDER
   ========================================================================== */
function initQuickSpecs() {
  const toggles = document.querySelectorAll('.btn-toggle-spec');

  function updateToggleText(toggle, isOpen) {
    if (isOpen) {
      toggle.textContent = window.LangManager ? LangManager.t('projects_spec_hide') : '[ - HIDE SYSTEM SPEC ]';
    } else {
      toggle.textContent = window.LangManager ? LangManager.t('projects_spec_toggle') : '[ + QUICK SYSTEM SPEC ]';
    }
  }

  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const targetId = toggle.getAttribute('data-target');
      const panel = document.getElementById(targetId);

      if (!panel) return;

      const isOpen = panel.classList.contains('open');
      if (isOpen) {
        panel.classList.remove('open');
        updateToggleText(toggle, false);
      } else {
        panel.classList.add('open');
        updateToggleText(toggle, true);
        playMechaBeep(920, 0.03);
      }
    });
  });

  if (window.LangManager) {
    LangManager.onChange(() => {
      toggles.forEach(toggle => {
        const targetId = toggle.getAttribute('data-target');
        const panel = document.getElementById(targetId);
        const isOpen = panel && panel.classList.contains('open');
        updateToggleText(toggle, isOpen);
      });
    });
  }
}

/* ==========================================================================
   20. CERTIFICATE CATEGORY FILTER
   ========================================================================== */
function initCertFilter() {
  const filterBtns = document.querySelectorAll('.cert-filter-btn[data-cfilter]');
  const certRows = document.querySelectorAll('.cert-check-row[data-ccat], .cert-card[data-ccat]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cfilter;
      playMechaBeep(850, 0.03);

      certRows.forEach(row => {
        if (cat === 'all' || row.dataset.ccat === cat) {
          row.style.display = '';
          row.classList.remove('hidden');
        } else {
          row.style.display = 'none';
          row.classList.add('hidden');
        }
      });
    });
  });
}

/* ==========================================================================
   21. TRANSMISSION FORM (CONTACT - REAL DISPATCH)
   ========================================================================== */
function initTransmissionForm() {
  const form = document.getElementById('transmissionForm');
  const submitBtn = document.getElementById('txSubmitBtn');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('txName').value.trim();
    const email = document.getElementById('txEmail').value.trim();
    const projectType = document.getElementById('txType').value;
    const message = document.getElementById('txMessage').value.trim();

    if (!name || !email || !message) {
      showToast(window.LangManager ? LangManager.t('toast_tx_required') : '⚠️ Please fill in all required transmission fields');
      return;
    }

    // Set Loading State
    const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>[ TRANSMITTING TELEMETRY ... ]</span>`;
      submitBtn.style.opacity = '0.75';
    }

    playMechaBeep(980, 0.05);

    try {
      // Send real email transmission to Ari Eka Prianda via FormSubmit AJAX API
      const response = await fetch('https://formsubmit.co/ajax/ariekaprianda@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `[MECHA TRANSMISSION] ${projectType} from ${name}`,
          name: name,
          email: email,
          engagementType: projectType,
          message: message,
          timestamp: new Date().toISOString()
        })
      });

      const result = await response.json();

      if (response.ok || result.success === "true" || result.success === true) {
        playMechaBeep(1400, 0.1);
        showToast(window.LangManager ? LangManager.t('toast_tx_sent') : `✓ Transmission confirmed! Routed to Ari Eka Prianda's terminal.`);
        if (submitBtn) {
          submitBtn.innerHTML = `<span>✓ TRANSMISSION DELIVERED</span>`;
          submitBtn.style.background = '#10b981';
          submitBtn.style.borderColor = '#10b981';
          submitBtn.style.color = '#ffffff';
        }
        form.reset();

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnHtml;
            submitBtn.style.background = '';
            submitBtn.style.borderColor = '';
            submitBtn.style.color = '';
            submitBtn.style.opacity = '1';
          }
        }, 4000);
      } else {
        throw new Error('FormSubmit offline fallback');
      }
    } catch (err) {
      // Offline / network fallback to mailto protocol
      playMechaBeep(880, 0.08);
      showToast(window.LangManager ? LangManager.t('toast_tx_fallback') : `✓ Fallback: Opening secure mail dispatch...`);
      const subject = encodeURIComponent(`[Portfolio Inquiry] ${projectType} - ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nProject Type: ${projectType}\n\nMessage:\n${message}`);
      window.location.href = `mailto:ariekaprianda@gmail.com?subject=${subject}&body=${body}`;

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
        submitBtn.style.opacity = '1';
      }
      form.reset();
    }
  });
}

/* ==========================================================================
   22. STICKY BACK-TO-TOP THRUSTER
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playMechaBeep(1200, 0.05);
  });
}

/* ==========================================================================
   23. KEYBOARD SHORTCUTS ENGINE
   ========================================================================== */
function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;

    if (e.key === 'p' || e.key === 'P') {
      const projEl = document.getElementById('projects');
      if (projEl) {
        projEl.scrollIntoView({ behavior: 'smooth' });
        showToast('📂 Jump to Projects');
      }
    } else if (e.key === 'c' || e.key === 'C') {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
        showToast('📬 Jump to Contact');
      }
    } else if (e.key === 'h' || e.key === 'H') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (e.key === 'm' || e.key === 'M') {
      const toggle = document.getElementById('soundToggleBtn');
      if (toggle) toggle.click();
    } else if (e.key === 't' || e.key === 'T') {
      const toggle = document.getElementById('themeToggleBtn');
      if (toggle) toggle.click();
    } else if (e.key === '`' || e.key === '~') {
      e.preventDefault();
      toggleCliTerminal();
    }
  });
}

/* ==========================================================================
   24. HERO PARTICLE CANVAS
   ========================================================================== */
function initHeroParticleCanvas() {
  const heroPanel = document.getElementById('hero');
  if (!heroPanel || window.innerWidth < 768) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'heroParticleCanvas';
  canvas.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:1;opacity:0.35;';
  heroPanel.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width = heroPanel.offsetWidth;
    H = canvas.height = heroPanel.offsetHeight;
  }

  function createParticles() {
    particles = [];
    const count = Math.floor(W / 18);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.8 + 0.4,
        dx: (Math.random() - 0.5) * 0.4,
        dy: -(Math.random() * 0.6 + 0.2),
        alpha: Math.random() * 0.6 + 0.2,
        color: Math.random() > 0.65 ? '#1769e0' : Math.random() > 0.5 ? '#e53935' : '#94a3b8'
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.y < -4) { p.y = H + 4; p.x = Math.random() * W; }
      if (p.x < -4) p.x = W + 4;
      if (p.x > W + 4) p.x = -4;
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();
  window.addEventListener('resize', () => { resize(); createParticles(); });
}

/* ==========================================================================
   25. NAVBAR TELEMETRY CLOCK
   ========================================================================== */
function initNavTelemetryClock() {
  const badge = document.querySelector('.nav-telemetry-badge');
  if (!badge) return;

  const timeEl = badge.querySelector('.tele-time');
  if (!timeEl) return;

  function updateTime() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    timeEl.textContent = `${h}:${m}:${s}`;
  }

  updateTime();
  setInterval(updateTime, 1000);
}

/* ==========================================================================
   26. ANIMATED SOFT SKILL PROGRESS BARS (ON SCROLL INTO VIEW)
   ========================================================================== */
function initSoftSkillAnimatedBars() {
  const fills = document.querySelectorAll('.soft-skill-fill');
  if (!fills.length) return;

  // Store target widths from inline styles
  fills.forEach(fill => {
    const targetWidth = fill.style.width || '80%';
    fill.setAttribute('data-target-width', targetWidth);
    fill.style.width = '0%'; // Reset for animation
  });

  const trioContainer = document.querySelector('.trio-panel-container');
  if (!trioContainer) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        fills.forEach((fill, i) => {
          setTimeout(() => {
            const target = fill.getAttribute('data-target-width');
            fill.style.width = target;
            fill.classList.add('animated');
          }, i * 150);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(trioContainer);
}

/* ==========================================================================
   27. HERO STATS COUNT-UP ANIMATION
   ========================================================================== */
function initHeroStatCountUp() {
  const statCells = document.querySelectorAll('.hero-stat-cell');
  if (!statCells.length) return;

  const heroSection = document.getElementById('hero');
  if (!heroSection) return;

  const DATA = [
    { end: 2, suffix: '+', accent: 'accent-blue', label: 'Years Experience' },
    { end: 3.63, suffix: '', accent: 'accent-red', label: 'Academic GPA', decimals: 2 },
    { end: 5, suffix: '+', accent: 'accent-blue', label: 'Projects & APIs' },
    { end: 6, suffix: '', accent: 'accent-red', label: 'Certifications' }
  ];

  let animated = false;

  function animateCount(el, data, duration = 1400) {
    const valEl = el.querySelector('.hero-stat-val');
    if (!valEl) return;
    const start = 0;
    const end = data.end;
    const decimals = data.decimals || 0;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * eased;

      const prefix = data.prefix || '';
      const suffix = data.suffix || '';
      valEl.innerHTML = `${prefix}${current.toFixed(decimals)}<span class="${data.accent}">${suffix}</span>`;

      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statCells.forEach((cell, i) => {
          if (DATA[i]) {
            setTimeout(() => animateCount(cell, DATA[i]), i * 150);
          }
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(heroSection);
}

/* ==========================================================================
   28. TYPING ROLE EFFECT ON HERO
   ========================================================================== */
function initTypingRoleEffect() {
  const roleEl = document.querySelector('.hero-role-title');
  if (!roleEl) return;

  function getRoles() {
    if (window.I18N && window.LangManager) {
      const dict = I18N[LangManager.getLang()] || I18N['id'];
      if (dict && dict.hero_roles && dict.hero_roles.length) {
        return dict.hero_roles;
      }
    }
    return [
      'Backend / Fullstack Developer',
      'REST API Architect',
      'System Integration Engineer',
      'Next.js & ASP.NET Specialist'
    ];
  }

  let roles = getRoles();
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

  // Add cursor element
  const cursor = document.createElement('span');
  cursor.className = 'typing-cursor';
  roleEl.textContent = '';
  roleEl.appendChild(cursor);

  if (window.LangManager) {
    LangManager.onChange(() => {
      roles = getRoles();
      roleIndex = 0;
      charIndex = 0;
      isDeleting = false;
      isPaused = false;
    });
  }

  function type() {
    const currentRole = roles[roleIndex] || roles[0];

    if (isPaused) {
      isPaused = false;
      setTimeout(type, 1200);
      return;
    }

    if (!isDeleting) {
      charIndex++;
      roleEl.textContent = currentRole.substring(0, charIndex);
      roleEl.appendChild(cursor);

      if (charIndex === currentRole.length) {
        isPaused = true;
        isDeleting = true;
        setTimeout(type, 1200);
        return;
      }
    } else {
      charIndex--;
      roleEl.textContent = currentRole.substring(0, charIndex);
      roleEl.appendChild(cursor);

      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    const speed = isDeleting ? 40 : 80;
    setTimeout(type, speed);
  }

  // Start after splash
  setTimeout(type, 2000);
}

/* ==========================================================================
   27. THEME TOGGLE (LIGHT / DARK MECHA MODE)
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  const mobileToggleBtn = document.getElementById('mobileThemeToggleBtn');
  const sunIcon = document.getElementById('themeIconSun');
  const moonIcon = document.getElementById('themeIconMoon');
  const label = document.getElementById('themeToggleLabel');
  const mobileLabel = document.getElementById('mobileThemeLabel');

  function getCurrentTheme() {
    // Check html attribute first, then body, then localStorage, then OS preference
    const htmlAttr = document.documentElement.getAttribute('data-theme');
    if (htmlAttr === 'dark' || htmlAttr === 'light') return htmlAttr;
    try {
      const saved = localStorage.getItem('portfolio_theme');
      if (saved === 'dark' || saved === 'light') return saved;
    } catch (e) {}
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  function updateUI(theme) {
    const isDark = theme === 'dark';
    if (sunIcon && moonIcon) {
      sunIcon.style.display = isDark ? 'inline-block' : 'none';
      moonIcon.style.display = isDark ? 'none' : 'inline-block';
    }
    if (label) {
      if (window.LangManager) {
        label.textContent = isDark ? LangManager.t('nav_theme_light') : LangManager.t('nav_theme_dark');
      } else {
        label.textContent = isDark ? 'LIGHT' : 'DARK';
      }
    }
    if (mobileLabel) {
      if (window.LangManager) {
        mobileLabel.textContent = isDark ? `MODE: ${LangManager.t('nav_theme_light')} ☀️` : `MODE: ${LangManager.t('nav_theme_dark')} 🌙`;
      } else {
        mobileLabel.textContent = isDark ? 'MODE: LIGHT ☀️' : 'MODE: DARK 🌙';
      }
    }
    if (toggleBtn) {
      toggleBtn.setAttribute('title', 'Switch to ' + (isDark ? 'Light' : 'Dark') + ' Mode (Press T)');
      toggleBtn.setAttribute('aria-label', 'Switch to ' + (isDark ? 'Light' : 'Dark') + ' Mode');
    }
  }

  if (window.LangManager) {
    LangManager.onChange(() => {
      updateUI(getCurrentTheme());
    });
  }

  function setTheme(newTheme, animate) {
    animate = animate || false;
    if (animate) {
      document.documentElement.classList.add('theme-transitioning');
      setTimeout(function() {
        document.documentElement.classList.remove('theme-transitioning');
      }, 350);
    }
    // Apply on both html and body for maximum CSS compatibility
    document.documentElement.setAttribute('data-theme', newTheme);
    document.body.setAttribute('data-theme', newTheme);
    // Also use a class for fallback
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark-mode');
      document.body.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
      document.body.classList.remove('dark-mode');
    }
    try {
      localStorage.setItem('portfolio_theme', newTheme);
    } catch (e) {}
    updateUI(newTheme);
  }

  function toggle() {
    try {
      const current = getCurrentTheme();
      const next = current === 'dark' ? 'light' : 'dark';
      setTheme(next, true);
      // Only call playMechaBeep if audio is enabled
      if (typeof playMechaBeep === 'function' && isAudioEnabled) {
        playMechaBeep(next === 'dark' ? 640 : 960, 0.04);
      }
      if (typeof showToast === 'function') {
        showToast(next === 'dark' ? '🌙 Dark Mode Activated' : '☀️ Light Mode Activated');
      }
    } catch (err) {
      console.error('Theme toggle error:', err);
    }
  }

  // Initial UI synchronization — run after a small delay to ensure DOM is settled
  setTimeout(function() {
    updateUI(getCurrentTheme());
  }, 50);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      toggle();
    });
  }

  if (mobileToggleBtn) {
    mobileToggleBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      toggle();
    });
  }

  // Follow OS system preference if not set manually by user
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
      try {
        if (!localStorage.getItem('portfolio_theme')) {
          setTheme(e.matches ? 'dark' : 'light', true);
        }
      } catch (err) {}
    });
  }
}

/* ==========================================================================
   CV PREVIEW MODAL
   ========================================================================== */
let cvPdfDoc = null;
let cvRenderPromise = null;

function initCVPreviewModal() {
  const overlay = document.getElementById('cvPreviewModal');
  const closeBtn = document.getElementById('cvModalCloseBtn');
  const downloadBtn = document.getElementById('cvDownloadBtn');

  if (!overlay) return;

  // Close on close button
  if (closeBtn) {
    closeBtn.addEventListener('click', closeCVPreviewModal);
  }

  // Close on backdrop click (outside panel)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeCVPreviewModal();
  });

  // Close on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeCVPreviewModal();
    }
  });

  // Reliable Blob Download handler (works on mobile Android/iOS, localtunnel, desktop)
  if (downloadBtn) {
    downloadBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      playMechaBeep(1100, 0.06);
      showToast('✓ Curriculum Vitae download started — Ari_Eka_Prianda_CV.pdf');

      const targetPath = downloadBtn.getAttribute('href') || 'assets/cv-ats-ari-eka-prianda.pdf';
      try {
        const response = await fetch(targetPath);
        if (!response.ok) throw new Error('HTTP ' + response.status);
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const tempA = document.createElement('a');
        tempA.style.display = 'none';
        tempA.href = blobUrl;
        tempA.download = 'Ari_Eka_Prianda_CV.pdf';
        document.body.appendChild(tempA);
        tempA.click();
        document.body.removeChild(tempA);
        setTimeout(() => window.URL.revokeObjectURL(blobUrl), 15000);
      } catch (err) {
        console.warn('Direct blob download failed, falling back to standard link:', err);
        const fallbackA = document.createElement('a');
        fallbackA.href = targetPath;
        fallbackA.download = 'Ari_Eka_Prianda_CV.pdf';
        fallbackA.target = '_blank';
        fallbackA.click();
      }
    });
  }
}

async function loadAndRenderCVPdf(pdfPath) {
  const loader = document.getElementById('cvLoadingIndicator');
  const canvasWrapper = document.getElementById('cvCanvasWrapper');
  const errorEl = document.getElementById('cvErrorState');
  const iframe = document.getElementById('cvIframe');

  if (loader) loader.classList.remove('hidden');
  if (errorEl) errorEl.style.display = 'none';
  if (iframe) iframe.style.display = 'none';

  if (!window.pdfjsLib) {
    // If PDF.js is unavailable, fallback to iframe
    if (iframe) {
      iframe.src = pdfPath;
      iframe.style.display = 'block';
      iframe.onload = () => {
        if (loader) loader.classList.add('hidden');
      };
      iframe.onerror = () => {
        if (loader) loader.classList.add('hidden');
        if (errorEl) errorEl.style.display = 'flex';
      };
    }
    return;
  }

  try {
    if (!cvPdfDoc) {
      const loadingTask = pdfjsLib.getDocument(pdfPath);
      cvPdfDoc = await loadingTask.promise;
    }

    if (!canvasWrapper) return;
    canvasWrapper.innerHTML = '';
    canvasWrapper.style.display = 'flex';

    const numPages = cvPdfDoc.numPages;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for memory efficiency
    const containerWidth = canvasWrapper.clientWidth || 800;
    const targetWidth = Math.min(Math.max(containerWidth - 32, 280), 1000);

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await cvPdfDoc.getPage(pageNum);
      const canvas = document.createElement('canvas');
      canvas.className = 'cv-pdf-canvas';
      canvasWrapper.appendChild(canvas);

      const ctx = canvas.getContext('2d');
      const unscaledViewport = page.getViewport({ scale: 1 });
      const scale = (targetWidth / unscaledViewport.width) * pixelRatio;
      const viewport = page.getViewport({ scale });

      canvas.width = viewport.width;
      canvas.height = viewport.height;
      canvas.style.width = `${viewport.width / pixelRatio}px`;
      canvas.style.height = `${viewport.height / pixelRatio}px`;

      await page.render({ canvasContext: ctx, viewport }).promise;
    }

    if (loader) loader.classList.add('hidden');
  } catch (err) {
    console.error('Failed to render CV via PDF.js:', err);
    if (loader) loader.classList.add('hidden');
    // Try iframe fallback if canvas failed
    if (iframe) {
      iframe.src = pdfPath;
      iframe.style.display = 'block';
    } else if (errorEl) {
      errorEl.style.display = 'flex';
    }
  }
}

function openCVPreviewModal() {
  const overlay = document.getElementById('cvPreviewModal');
  if (!overlay) return;

  const cvSrc = 'assets/cv-ats-ari-eka-prianda.pdf';

  overlay.style.display = 'flex';
  requestAnimationFrame(() => {
    overlay.classList.add('active');
  });
  document.body.style.overflow = 'hidden';

  // Render CV with PDF.js
  if (!cvRenderPromise) {
    cvRenderPromise = loadAndRenderCVPdf(cvSrc);
  }
}

function closeCVPreviewModal() {
  const overlay = document.getElementById('cvPreviewModal');
  if (!overlay) return;
  overlay.classList.remove('active');
  setTimeout(() => {
    if (!overlay.classList.contains('active')) {
      overlay.style.display = 'none';
    }
  }, 300);
  document.body.style.overflow = '';
}

/* ==========================================================================
   27. INTERACTIVE REST API SANDBOX & TELEMETRY
   ========================================================================== */
const MOCK_API_ENDPOINTS = {
  profile: {
    status: "success",
    code: 200,
    endpoint: "/api/v1/operator/profile",
    headers: {
      "content-type": "application/json; charset=utf-8",
      "x-powered-by": "Ari-OS Kernel 2.6",
      "x-cache": "HIT"
    },
    data: {
      operator: "Ari Eka Prianda",
      title: "Backend / Fullstack Developer",
      education: "S1 Teknik Informatika - Universitas Binaniaga Indonesia",
      originDiscipline: "Teknik Pemesinan (Machining / Precision Engineering)",
      philosophy: "Micrometer precision tolerance applied directly to scalable web & database architectures.",
      status: "AVAILABLE_FOR_FULLTIME_AND_CONTRACT",
      location: "Bogor / Jakarta, Indonesia (UTC+7)",
      contact: {
        email: "ariekaprianda@gmail.com",
        github: "https://github.com/ariekakagerou",
        linkedin: "https://linkedin.com/in/ari-eka-prianda"
      }
    }
  },
  projects: {
    status: "success",
    code: 200,
    endpoint: "/api/v1/blueprints/projects",
    headers: {
      "content-type": "application/json; charset=utf-8",
      "x-powered-by": "Node.js / Express Gateway"
    },
    data: [
      { id: "01", name: "SIMA BPJS Integration API", category: "ENTERPRISE INTEGRATION", protocol: "SOAP/XML & REST", uptime: "99.94%" },
      { id: "02", name: "H5 Revolution", category: "E-COMMERCE", tech: "Next.js 14, PostgreSQL, Stripe, AWS S3", lighthouse: "98/100" },
      { id: "03", name: "Youth Trigger Backend", category: "REAL-TIME SYSTEM", tech: "Node.js, Socket.io, Redis PubSub, MySQL", latency: "< 25ms" },
      { id: "04", name: "BUMDesa Digital Commerce API", category: "ENTERPRISE COMMERCE", endpoints: 42, integrity: "ACID 100%" },
      { id: "05", name: "SAADA AI & Archive System", category: "AI & ARCHIVE", tech: "Next.js, ASP.NET Core, Python Tesseract OCR", accuracy: "98.6%" }
    ]
  },
  skills: {
    status: "success",
    code: 200,
    endpoint: "/api/v1/telemetry/skills",
    headers: {
      "content-type": "application/json; charset=utf-8"
    },
    data: {
      backend: ["ASP.NET Core (C#)", "Node.js", "Express.js", "RESTful API", "SOAP/XML WSDL", "JWT Auth", "Socket.io"],
      database: ["Oracle DB", "PostgreSQL", "MySQL", "Redis Pub/Sub", "Prisma ORM"],
      frontend: ["Next.js 14 (App Router)", "TypeScript", "React", "Tailwind CSS", "HTML5/CSS3"],
      devops: ["AWS S3", "Docker", "Git", "Postman Automated Collections", "Linux/Bash"]
    }
  },
  health: {
    status: "healthy",
    code: 200,
    endpoint: "/api/v1/system/health",
    headers: {
      "content-type": "application/json; charset=utf-8",
      "x-ratelimit-remaining": 999
    },
    data: {
      systemState: "ONLINE_OPERATIONAL",
      clusterNodes: 3,
      avgResponseTime: "18.4ms",
      errorRate: "0.002%",
      lastChecked: new Date().toISOString()
    }
  },
  contact_ping: {
    status: "dispatched",
    code: 201,
    endpoint: "/api/v1/dispatch/ping",
    method: "POST",
    headers: {
      "content-type": "application/json; charset=utf-8"
    },
    data: {
      handshake: "CONFIRMED",
      targetTerminal: "ariekaprianda@gmail.com",
      message: "Telemetry ping received. Communication channel is active.",
      dispatchLatency: "< 24 Hours",
      timestamp: new Date().toISOString()
    }
  }
};

function initApiSandbox() {
  const select = document.getElementById('apiEndpointSelect');
  const methodBadge = document.getElementById('apiMethodBadge');
  const executeBtn = document.getElementById('btnApiExecute');
  const statusBadge = document.getElementById('apiStatusBadge');
  const latencyVal = document.getElementById('apiLatencyVal');
  const sizeVal = document.getElementById('apiSizeVal');
  const jsonOutput = document.getElementById('apiJsonOutput');
  const copyBtn = document.getElementById('apiCopyBtn');

  if (!select || !executeBtn || !jsonOutput) return;

  const updateEndpointBadge = () => {
    const key = select.value;
    if (key === 'contact_ping') {
      methodBadge.textContent = 'POST';
      methodBadge.className = 'api-method-badge post';
    } else {
      methodBadge.textContent = 'GET';
      methodBadge.className = 'api-method-badge get';
    }
  };

  select.addEventListener('change', updateEndpointBadge);

  executeBtn.addEventListener('click', () => {
    const key = select.value;
    const resData = MOCK_API_ENDPOINTS[key] || MOCK_API_ENDPOINTS.profile;
    playMechaBeep(980, 0.04);

    executeBtn.disabled = true;
    executeBtn.style.opacity = '0.7';
    executeBtn.innerHTML = `<span>[ EXECUTING... ]</span>`;

    const randomLatency = Math.floor(Math.random() * 18) + 12;

    setTimeout(() => {
      executeBtn.disabled = false;
      executeBtn.style.opacity = '1';
      executeBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg><span>EXECUTE</span>`;

      if (statusBadge) {
        statusBadge.textContent = `● ${resData.code} ${resData.code === 201 ? 'CREATED' : 'OK'}`;
      }
      if (latencyVal) {
        latencyVal.textContent = `${randomLatency}ms`;
      }

      const formatted = JSON.stringify(resData, null, 2);
      const byteSize = (new Blob([formatted]).size / 1024).toFixed(2);
      if (sizeVal) {
        sizeVal.textContent = `${byteSize} KB`;
      }

      jsonOutput.innerHTML = `<code>${formatted}</code>`;
      playMechaBeep(1200, 0.05);
    }, 240);
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const text = jsonOutput.textContent || '';
      navigator.clipboard.writeText(text).then(() => {
        copyBtn.textContent = '✓ COPIED!';
        playMechaBeep(1400, 0.04);
        setTimeout(() => {
          copyBtn.textContent = '📋 COPY JSON';
        }, 1500);
      });
    });
  }
}

/* ==========================================================================
   28. INTERACTIVE TACTICAL CLI TERMINAL
   ========================================================================== */
function toggleCliTerminal(forceState) {
  const modal = document.getElementById('cliTerminalModal');
  const input = document.getElementById('cliInputField');
  if (!modal) return;

  const isOpen = modal.classList.contains('open');
  const shouldOpen = forceState !== undefined ? forceState : !isOpen;

  if (shouldOpen) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    playMechaBeep(1100, 0.04);
    if (input) {
      setTimeout(() => input.focus(), 80);
    }
  } else {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    playMechaBeep(700, 0.04);
  }
}

function initCliTerminal() {
  const modal = document.getElementById('cliTerminalModal');
  const openBtn = document.getElementById('cliToggleBtn');
  const closeBtn = document.getElementById('cliCloseBtn');
  const input = document.getElementById('cliInputField');
  const historyEl = document.getElementById('cliHistory');
  const screen = document.getElementById('cliScreen');

  if (!modal || !input || !historyEl) return;

  if (openBtn) {
    openBtn.addEventListener('click', () => toggleCliTerminal(true));
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', () => toggleCliTerminal(false));
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) toggleCliTerminal(false);
  });

  const cmdHistory = [];
  let historyIdx = -1;

  // Print welcome banner
  historyEl.innerHTML = `
<div style="color:#10b981; font-weight:700; margin-bottom:12px;">
   _   ___ ___   ___  ___ 
  /_\ | _ \_ _| / _ \/ __|
 / _ \|   /| | | (_) \__ \
/_/ \_\_|_\___| \___/|___/
==================================================
ARI-OS KERNEL v2.6.4-prod [ BASH / SH ]
Terminal initialized for operator: Ari Eka Prianda
Type '<span style="color:#f59e0b;">help</span>' to inspect available system commands.
==================================================
</div>`;

  const runCommand = (raw) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    const args = trimmed.toLowerCase().split(/\s+/);
    const primary = args[0];

    let output = '';

    switch (primary) {
      case 'help':
        output = `
Available System Commands:
  <span style="color:#10b981;">help</span>      - Print this command reference list
  <span style="color:#10b981;">whoami</span>    - Print operator identification & bio
  <span style="color:#10b981;">skills</span>    - Inspect backend & fullstack engineering stack
  <span style="color:#10b981;">projects</span>  - List active system blueprints & specifications
  <span style="color:#10b981;">curl</span>      - Test mock API endpoint (e.g. 'curl health', 'curl profile')
  <span style="color:#10b981;">theme</span>     - Switch theme mode ('theme dark', 'theme light', 'theme toggle')
  <span style="color:#10b981;">contact</span>   - Show communication dispatch coordinates
  <span style="color:#10b981;">wa</span>        - Open direct WhatsApp communication link
  <span style="color:#10b981;">cv</span>        - Launch ATS Resume / Curriculum Vitae viewer
  <span style="color:#10b981;">date</span>      - Display current telemetry time (UTC+7)
  <span style="color:#10b981;">clear</span>     - Clear terminal buffer
  <span style="color:#10b981;">exit</span>      - Terminate & close terminal window`;
        break;

      case 'whoami':
      case 'bio':
        output = `
OPERATOR: Ari Eka Prianda
ROLE: Backend / Fullstack Developer
ORIGIN: Teknik Pemesinan (Machining) -> S1 Teknik Informatika (UNBIN)
PHILOSOPHY: Micrometer precision tolerance applied directly to scalable web & database architectures.
TARGET: High-concurrency RESTful APIs, Next.js applications, ASP.NET Core enterprise systems.`;
        break;

      case 'skills':
        output = `
CORE TECHNICAL STACK:
  • BACKEND: ASP.NET Core, Node.js, Express.js, SOAP/WSDL, RESTful API, Socket.io, JWT
  • DATABASE: Oracle DB, PostgreSQL, MySQL, Redis Pub/Sub, Prisma ORM
  • FRONTEND: Next.js 14 (App Router), TypeScript, React, Tailwind CSS, HTML5/CSS3
  • TOOLING: Docker, AWS S3, Git, Postman API Automation, Linux/Bash`;
        break;

      case 'projects':
        output = `
ACTIVE BLUEPRINTS:
  [01] SIMA BPJS Integration API     (ASP.NET, Node.js, Oracle, SOAP/XML)
  [02] H5 Revolution                 (Next.js 14, TypeScript, PostgreSQL, Stripe)
  [03] Youth Trigger Backend         (Node.js, Express, Socket.io, Redis, MySQL)
  [04] BUMDesa Commerce API          (Node.js, Express, MySQL, Postman)
  [05] SAADA Archive & AI System     (Next.js, ASP.NET Core, Python Tesseract OCR)`;
        break;

      case 'curl':
        const ep = args[1] || 'profile';
        if (MOCK_API_ENDPOINTS[ep]) {
          output = `HTTP/2.0 200 OK\n` + JSON.stringify(MOCK_API_ENDPOINTS[ep], null, 2);
        } else {
          output = `curl: unknown endpoint '${ep}'. Available: profile, projects, skills, health, contact_ping`;
        }
        break;

      case 'theme':
        const mode = args[1];
        if (mode === 'dark') {
          document.documentElement.setAttribute('data-theme', 'dark');
          localStorage.setItem('portfolio_theme', 'dark');
          output = "Theme set to: DARK";
        } else if (mode === 'light') {
          document.documentElement.setAttribute('data-theme', 'light');
          localStorage.setItem('portfolio_theme', 'light');
          output = "Theme set to: LIGHT";
        } else {
          const cur = document.documentElement.getAttribute('data-theme') || 'light';
          const next = cur === 'dark' ? 'light' : 'dark';
          document.documentElement.setAttribute('data-theme', next);
          localStorage.setItem('portfolio_theme', next);
          output = `Theme toggled to: ${next.toUpperCase()}`;
        }
        break;

      case 'contact':
        output = `
COMMUNICATION COORDINATES:
  • Email:    ariekaprianda@gmail.com
  • WhatsApp: https://wa.me/6285817004456
  • GitHub:   https://github.com/ariekakagerou
  • LinkedIn: https://linkedin.com/in/ari-eka-prianda`;
        break;

      case 'wa':
        window.open('https://wa.me/6285817004456?text=Halo%20Ari%20Eka%20Prianda%2C%20saya%20melihat%20portofolio%20Anda...', '_blank');
        output = "Opening WhatsApp dispatch link in external tab...";
        break;

      case 'cv':
        toggleCliTerminal(false);
        openCVPreviewModal();
        output = "Launching CV viewer...";
        break;

      case 'date':
        output = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }) + " (WIB / UTC+7)";
        break;

      case 'clear':
        historyEl.innerHTML = '';
        return;

      case 'exit':
        toggleCliTerminal(false);
        return;

      default:
        output = `bash: command not found: ${primary}. Type 'help' for available commands.`;
        break;
    }

    const commandEntry = document.createElement('div');
    commandEntry.className = 'cli-command-row';
    commandEntry.innerHTML = `<span class="cli-prompt-label">ari@kernel:~$</span> <span>${raw}</span>\n<div style="color:#94a3b8; margin-top:2px; white-space:pre-wrap;">${output}</div>`;
    historyEl.appendChild(commandEntry);

    if (screen) {
      screen.scrollTop = screen.scrollHeight;
    }
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = input.value;
      if (val.trim()) {
        cmdHistory.push(val);
        historyIdx = cmdHistory.length;
      }
      playMechaBeep(840, 0.03);
      runCommand(val);
      input.value = '';
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIdx > 0) {
        historyIdx--;
        input.value = cmdHistory[historyIdx] || '';
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx < cmdHistory.length - 1) {
        historyIdx++;
        input.value = cmdHistory[historyIdx] || '';
      } else {
        historyIdx = cmdHistory.length;
        input.value = '';
      }
    } else if (e.key === 'Escape') {
      toggleCliTerminal(false);
    }
  });
}

/* ==========================================================================
   29. LIVE GITHUB TELEMETRY
   ========================================================================== */
function initGithubTelemetry() {
  const repoEl = document.getElementById('ghRepoCount');
  const followEl = document.getElementById('ghFollowers');

  if (!repoEl) return;

  fetch('https://api.github.com/users/ariekakagerou')
    .then(res => res.json())
    .then(data => {
      if (data && data.public_repos !== undefined) {
        repoEl.textContent = `${data.public_repos}+`;
        if (followEl && data.followers !== undefined) {
          followEl.textContent = `${data.followers} Followers`;
        }
      }
    })
    .catch(() => {
      // Graceful fallback already in HTML
    });
}


/**
 * VAISHNAVI M DALAVI — PREMIUM DEVELOPER PORTFOLIO
 * Main Interactive Engine
 * Hudson-Inspired Visuals, Micro-Interactions, and Dark Theme Aesthetics
 * Zero heavy external dependencies, 60fps performance
 */

(function () {
  'use strict';

  // ----------------------------------------------------------------------------
  // DOM Elements
  // ----------------------------------------------------------------------------
  const htmlElement = document.documentElement;
  const siteHeader = document.getElementById('siteHeader');
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  const cursorDot = document.getElementById('cursorDot');
  const cursorCircle = document.getElementById('cursorCircle');
  const preloader = document.getElementById('preloader');
  const preloaderBar = document.getElementById('preloaderBar');
  const preloaderCounter = document.getElementById('preloaderCounter');
  const heroRoleEl = document.getElementById('heroRole');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const filterTabs = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');
  const copyButtons = document.querySelectorAll('.copy-btn');
  const toast = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const backToTopBtn = document.getElementById('backToTopBtn');

  // Modals
  const projectModal = document.getElementById('projectModal');
  const resumeModal = document.getElementById('resumeModal');
  const openProjectModalBtns = document.querySelectorAll('.btn-open-project-modal');
  const openResumeModalBtns = document.querySelectorAll('.btn-open-resume-modal');
  const closeProjectModalBtn = document.getElementById('closeProjectModalBtn');
  const closeResumeModalBtn = document.getElementById('closeResumeModalBtn');
  const printResumeBtn = document.getElementById('printResumeBtn');

  let toastTimeout = null;

  // ----------------------------------------------------------------------------
  // 1. Preloader Animation
  // ----------------------------------------------------------------------------
  function initPreloader() {
    if (!preloader || !preloaderBar || !preloaderCounter) return;

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 8;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);

        preloaderBar.style.width = '100%';
        preloaderCounter.textContent = '100%';

        setTimeout(() => {
          preloader.classList.add('fade-out');
          document.body.style.overflow = '';
          triggerInitialReveals();
        }, 400);
      } else {
        preloaderBar.style.width = `${progress}%`;
        preloaderCounter.textContent = `${progress < 10 ? '0' + progress : progress}%`;
      }
    }, 45);
  }

  // ----------------------------------------------------------------------------
  // 2. Custom Cursor (Interactive Desktop Experience)
  // ----------------------------------------------------------------------------
  function initCustomCursor() {
    if (!cursorDot || !cursorCircle) return;
    // Check if touch device
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let circleX = mouseX;
    let circleY = mouseY;
    let isVisible = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        cursorDot.style.opacity = '1';
        cursorCircle.style.opacity = '1';
        isVisible = true;
      }

      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    window.addEventListener('mouseleave', () => {
      cursorDot.style.opacity = '0';
      cursorCircle.style.opacity = '0';
      isVisible = false;
    });

    // Smooth lerp trailing animation for outer circle
    function animateCursorCircle() {
      circleX += (mouseX - circleX) * 0.18;
      circleY += (mouseY - circleY) * 0.18;

      cursorCircle.style.left = `${circleX}px`;
      cursorCircle.style.top = `${circleY}px`;

      requestAnimationFrame(animateCursorCircle);
    }
    requestAnimationFrame(animateCursorCircle);

    // Interactive element hover scale
    const interactiveElements = document.querySelectorAll(
      'a, button, input, textarea, .filter-btn, .skill-card, .project-card-asymmetric, .copy-btn, .social-icon-btn, .theme-toggle-btn'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursorCircle.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        cursorCircle.classList.remove('cursor-hover');
      });
    });
  }

  // ----------------------------------------------------------------------------
  // 3. Scroll Progress Indicator & Sticky Header Elevation
  // ----------------------------------------------------------------------------
  function initScrollProgress() {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      if (scrollProgressBar) {
        scrollProgressBar.style.width = `${scrollPercent}%`;
        scrollProgressBar.setAttribute('aria-valuenow', Math.round(scrollPercent));
      }

      if (siteHeader) {
        if (scrollTop > 40) {
          siteHeader.classList.add('scrolled');
        } else {
          siteHeader.classList.remove('scrolled');
        }
      }
    }, { passive: true });
  }

  // ----------------------------------------------------------------------------
  // 4. Hero Dynamic Role Switcher / Typewriter
  // ----------------------------------------------------------------------------
  function initHeroRoleSwitcher() {
    if (!heroRoleEl) return;

    const roles = [
      'Aspiring Software Developer',
      '1st Year MCA Student',
      'Web Application Creator',
      'Relational DB Enthusiast',
      'Disciplined Problem Solver'
    ];

    let currentRoleIdx = 0;
    let currentCharIdx = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function typeLoop() {
      const fullText = roles[currentRoleIdx];

      if (isDeleting) {
        heroRoleEl.textContent = fullText.substring(0, currentCharIdx - 1);
        currentCharIdx--;
        typingSpeed = 40;
      } else {
        heroRoleEl.textContent = fullText.substring(0, currentCharIdx + 1);
        currentCharIdx++;
        typingSpeed = 85;
      }

      if (!isDeleting && currentCharIdx === fullText.length) {
        // Pause at end of word
        typingSpeed = 2200;
        isDeleting = true;
      } else if (isDeleting && currentCharIdx === 0) {
        isDeleting = false;
        currentRoleIdx = (currentRoleIdx + 1) % roles.length;
        typingSpeed = 400;
      }

      setTimeout(typeLoop, typingSpeed);
    }

    setTimeout(typeLoop, 800);
  }

  // ----------------------------------------------------------------------------
  // 5. Scroll-Triggered Reveal Animations
  // ----------------------------------------------------------------------------
  function initScrollReveals() {
    const revealElements = document.querySelectorAll('.reveal-fade-up');
    if (!revealElements.length) return;

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach((el) => {
      revealObserver.observe(el);
    });
  }

  function triggerInitialReveals() {
    // Reveal top hero elements immediately once preloader is gone
    const heroElements = document.querySelectorAll('#hero .reveal-fade-up');
    heroElements.forEach((el) => {
      el.classList.add('is-visible');
    });
  }

  // ----------------------------------------------------------------------------
  // 6. Skill Proficiency Meters Animation
  // ----------------------------------------------------------------------------
  function initSkillMeters() {
    const meterFills = document.querySelectorAll('.skill-bar-fill');
    if (!meterFills.length) return;

    if (!('IntersectionObserver' in window)) {
      meterFills.forEach((fill) => {
        fill.style.width = fill.getAttribute('data-level-width') || '50%';
      });
      return;
    }

    const meterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const fill = entry.target;
            const targetWidth = fill.getAttribute('data-level-width') || '50%';
            fill.style.width = targetWidth;
            observer.unobserve(fill);
          }
        });
      },
      { threshold: 0.25 }
    );

    meterFills.forEach((fill) => {
      meterObserver.observe(fill);
    });
  }

  // ----------------------------------------------------------------------------
  // 7. Active Navigation Spy via IntersectionObserver
  // ----------------------------------------------------------------------------
  function initScrollSpy() {
    if (!('IntersectionObserver' in window)) return;

    const spyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
              const href = link.getAttribute('href');
              if (href === `#${id}`) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
          }
        });
      },
      {
        rootMargin: '-25% 0px -65% 0px',
        threshold: 0
      }
    );

    sections.forEach((section) => {
      spyObserver.observe(section);
    });
  }

  // ----------------------------------------------------------------------------
  // 8. Project Filtering Tabs
  // ----------------------------------------------------------------------------
  function initProjectFilters() {
    if (!filterTabs.length || !projectItems.length) return;

    filterTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const targetCategory = tab.getAttribute('data-filter');

        filterTabs.forEach((t) => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        projectItems.forEach((card) => {
          const cardCategories = card.getAttribute('data-category') || '';
          if (targetCategory === 'all' || cardCategories.includes(targetCategory)) {
            card.style.display = 'grid';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 20);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(12px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 250);
          }
        });
      });
    });
  }

  // ----------------------------------------------------------------------------
  // 9. Theme Management (Default Dark per Request, with Toggle)
  // ----------------------------------------------------------------------------
  function initTheme() {
    const savedTheme = localStorage.getItem('vaishnavi_portfolio_theme');
    if (savedTheme) {
      applyTheme(savedTheme);
    } else {
      // Default to Dark Theme
      applyTheme('dark');
    }

    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', toggleTheme);
    }
  }

  function applyTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('vaishnavi_portfolio_theme', theme);
    const isDark = theme === 'dark';
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('aria-label', isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme');
    }
  }

  function toggleTheme() {
    const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
  }

  // ----------------------------------------------------------------------------
  // 10. Mobile Drawer Navigation
  // ----------------------------------------------------------------------------
  function initMobileDrawer() {
    function openDrawer() {
      if (mobileDrawer && drawerBackdrop) {
        mobileDrawer.classList.add('open');
        drawerBackdrop.classList.add('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        drawerBackdrop.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    }

    function closeDrawer() {
      if (mobileDrawer && drawerBackdrop) {
        mobileDrawer.classList.remove('open');
        drawerBackdrop.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        drawerBackdrop.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    }

    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', openDrawer);
    }

    if (drawerCloseBtn) {
      drawerCloseBtn.addEventListener('click', closeDrawer);
    }

    if (drawerBackdrop) {
      drawerBackdrop.addEventListener('click', closeDrawer);
    }

    navLinks.forEach((link) => {
      link.addEventListener('click', closeDrawer);
    });
  }

  // ----------------------------------------------------------------------------
  // 11. Copy to Clipboard Utility with Toast
  // ----------------------------------------------------------------------------
  function initCopyButtons() {
    copyButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const textToCopy = btn.getAttribute('data-copy-text');
        const itemLabel = btn.getAttribute('data-label') || 'Item';

        if (!textToCopy) return;

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard
            .writeText(textToCopy)
            .then(() => {
              showToast(`Copied ${itemLabel} to clipboard!`);
            })
            .catch(() => {
              fallbackCopy(textToCopy, itemLabel);
            });
        } else {
          fallbackCopy(textToCopy, itemLabel);
        }
      });
    });
  }

  function fallbackCopy(text, label) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(`Copied ${label} to clipboard!`);
    } catch (err) {
      showToast('Could not copy automatically');
    }
    document.body.removeChild(textArea);
  }

  function showToast(message) {
    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    const toastInner = toast.querySelector('.toast');
    if (toastInner) toastInner.classList.add('show');

    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }

    toastTimeout = setTimeout(() => {
      if (toastInner) toastInner.classList.remove('show');
    }, 3200);
  }

  // ----------------------------------------------------------------------------
  // 12. Modals (Project Details & Printable CV)
  // ----------------------------------------------------------------------------
  function initModals() {
    function openModal(modalElement) {
      if (!modalElement) return;
      modalElement.classList.add('open');
      modalElement.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      const closeBtn = modalElement.querySelector('.modal-close-btn');
      if (closeBtn) closeBtn.focus();
    }

    function closeModal(modalElement) {
      if (!modalElement) return;
      modalElement.classList.remove('open');
      modalElement.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    // Open Project Modal
    openProjectModalBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(projectModal);
      });
    });

    if (closeProjectModalBtn) {
      closeProjectModalBtn.addEventListener('click', () => {
        closeModal(projectModal);
      });
    }

    // Open Resume Modal
    openResumeModalBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(resumeModal);
      });
    });

    if (closeResumeModalBtn) {
      closeResumeModalBtn.addEventListener('click', () => {
        closeModal(resumeModal);
      });
    }

    // Print Resume Button
    if (printResumeBtn) {
      printResumeBtn.addEventListener('click', () => {
        window.print();
      });
    }

    // Backdrop click close
    [projectModal, resumeModal].forEach((modal) => {
      if (!modal) return;
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal(modal);
        }
      });
    });

    // ESC key close
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal(projectModal);
        closeModal(resumeModal);
      }
    });
  }

  // ----------------------------------------------------------------------------
  // 13. Contact Form Submission
  // ----------------------------------------------------------------------------
  function initContactForm() {
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contactName');
      const emailInput = document.getElementById('contactEmail');
      const subjectInput = document.getElementById('contactSubject');
      const messageInput = document.getElementById('contactMessage');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const subject = subjectInput ? subjectInput.value.trim() : 'Software Engineering Opportunity / Inquiry';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !email || !message) {
        showToast('Please fill in all required fields');
        return;
      }

      // Pre-formatted mailto URL
      const emailTo = 'vdalavi005@gmail.com';
      const mailtoUrl = `mailto:${emailTo}?subject=${encodeURIComponent(
        `[Portfolio] ${subject} - ${name}`
      )}&body=${encodeURIComponent(
        `Hello Vaishnavi,\n\n${message}\n\nFrom:\n${name}\nEmail: ${email}`
      )}`;

      window.location.href = mailtoUrl;

      if (formStatus) {
        formStatus.className = 'form-status-msg success';
        formStatus.textContent = 'Opening your email client to dispatch your note. Thank you for connecting!';
        formStatus.style.display = 'block';

        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 8000);
      }

      contactForm.reset();
      showToast('Opening email app...');
    });
  }

  // ----------------------------------------------------------------------------
  // 14. Back to Top Button & Footer Date
  // ----------------------------------------------------------------------------
  function initFooter() {
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }

    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
      currentYearEl.textContent = new Date().getFullYear();
    }
  }

  // ----------------------------------------------------------------------------
  // Master Initialization
  // ----------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initTheme();
    initCustomCursor();
    initScrollProgress();
    initHeroRoleSwitcher();
    initScrollReveals();
    initSkillMeters();
    initScrollSpy();
    initProjectFilters();
    initMobileDrawer();
    initCopyButtons();
    initModals();
    initContactForm();
    initFooter();
  });
})();

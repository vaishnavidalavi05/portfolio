/**
 * VAISHNAVI M DALAVI - PERSONAL DEVELOPER PORTFOLIO
 * Main Interactive Script
 * High performance, zero external libraries
 */

(function () {
  'use strict';

  // ----------------------------------------------------------------------------
  // DOM Elements
  // ----------------------------------------------------------------------------
  const htmlElement = document.documentElement;
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const filterTabs = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card-item');
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
  // 1. Theme Management (Light by Default per Requirement)
  // ----------------------------------------------------------------------------
  function initTheme() {
    const savedTheme = localStorage.getItem('vaishnavi_portfolio_theme');
    if (savedTheme) {
      applyTheme(savedTheme);
    } else {
      // Default to Light Theme
      applyTheme('light');
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
    const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
  }

  // ----------------------------------------------------------------------------
  // 2. Mobile Drawer Navigation
  // ----------------------------------------------------------------------------
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

  // Close drawer on clicking any navigation link
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // ----------------------------------------------------------------------------
  // 3. Active Nav Link on Scroll via IntersectionObserver
  // ----------------------------------------------------------------------------
  function setupScrollSpy() {
    if (!('IntersectionObserver' in window)) return;

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      observer.observe(section);
    });
  }

  // ----------------------------------------------------------------------------
  // 4. Skill Proficiency Meters Animation
  // ----------------------------------------------------------------------------
  function animateSkillMeters() {
    const meters = document.querySelectorAll('.skill-bar-fill');
    if (!('IntersectionObserver' in window)) {
      meters.forEach((meter) => {
        const val = meter.getAttribute('data-level-width') || '50%';
        meter.style.width = val;
      });
      return;
    }

    const meterObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const meter = entry.target;
            const targetWidth = meter.getAttribute('data-level-width') || '50%';
            meter.style.width = targetWidth;
            obs.unobserve(meter);
          }
        });
      },
      { threshold: 0.2 }
    );

    meters.forEach((meter) => {
      meter.style.width = '0%';
      meterObserver.observe(meter);
    });
  }

  // ----------------------------------------------------------------------------
  // 5. Project Filtering Tabs
  // ----------------------------------------------------------------------------
  function setupProjectFilters() {
    if (!filterTabs.length) return;

    filterTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const targetCategory = tab.getAttribute('data-filter');

        filterTabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');

        projectCards.forEach((card) => {
          const cardCategories = card.getAttribute('data-category') || '';
          if (targetCategory === 'all' || cardCategories.includes(targetCategory)) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 20);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(8px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 200);
          }
        });
      });
    });
  }

  // ----------------------------------------------------------------------------
  // 6. Copy to Clipboard Utility with Toast
  // ----------------------------------------------------------------------------
  function setupCopyButtons() {
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
  // 7. Modals (Project Details & Resume)
  // ----------------------------------------------------------------------------
  function openModal(modalElement) {
    if (!modalElement) return;
    modalElement.classList.add('open');
    modalElement.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus close button for accessibility
    const closeBtn = modalElement.querySelector('.modal-close-btn');
    if (closeBtn) closeBtn.focus();
  }

  function closeModal(modalElement) {
    if (!modalElement) return;
    modalElement.classList.remove('open');
    modalElement.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function setupModals() {
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

    // Print Resume
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
        closeDrawer();
      }
    });
  }

  // ----------------------------------------------------------------------------
  // 8. Contact Form Handling
  // ----------------------------------------------------------------------------
  function setupContactForm() {
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contactName');
      const emailInput = document.getElementById('contactEmail');
      const subjectInput = document.getElementById('contactSubject');
      const messageInput = document.getElementById('contactMessage');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const subject = subjectInput ? subjectInput.value.trim() : 'Portfolio Inquiry';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !email || !message) {
        showToast('Please fill in all required fields');
        return;
      }

      // Generate mailto link
      const emailTo = 'vdalavi005@gmail.com';
      const mailtoUrl = `mailto:${emailTo}?subject=${encodeURIComponent(
        `[Portfolio] ${subject} - from ${name}`
      )}&body=${encodeURIComponent(
        `Hello Vaishnavi,\n\n${message}\n\nFrom:\n${name}\nEmail: ${email}`
      )}`;

      // Open email client
      window.location.href = mailtoUrl;

      // Show success visual feedback
      if (formStatus) {
        formStatus.className = 'form-notice-box success';
        formStatus.textContent = 'Your default email client has been opened with your prefilled message. Thank you!';
        formStatus.style.display = 'block';

        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 8000);
      }

      contactForm.reset();
      showToast('Opening your email app to send message...');
    });
  }

  // ----------------------------------------------------------------------------
  // 9. Back to Top Button & Footer
  // ----------------------------------------------------------------------------
  function setupBackToTop() {
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
  // Initialization
  // ----------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    setupScrollSpy();
    animateSkillMeters();
    setupProjectFilters();
    setupCopyButtons();
    setupModals();
    setupContactForm();
    setupBackToTop();
  });
})();

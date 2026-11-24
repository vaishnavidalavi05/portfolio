/**
 * HUDSON PORTFOLIO ENGINE — VAISHNAVI M DALAVI
 * Clean, lightweight, zero-dependency interactive script
 * Responsive navigation, scrollspy, filtering, modals, and smooth animations
 */

(function () {
  'use strict';

  // ----------------------------------------------------------------------------
  // DOM References
  // ----------------------------------------------------------------------------
  const siteHeader = document.getElementById('siteHeader');
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const filterTabs = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-card-item');
  const copyButtons = document.querySelectorAll('.copy-btn');
  const toast = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');
  const contactForm = document.getElementById('contactForm');
  const formAlert = document.getElementById('formAlert');
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
  // 1. Sticky Header & Scroll Progress
  // ----------------------------------------------------------------------------
  function initHeaderAndProgress() {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      if (scrollProgressBar) {
        scrollProgressBar.style.width = `${scrollPercent}%`;
        scrollProgressBar.setAttribute('aria-valuenow', Math.round(scrollPercent));
      }

      if (siteHeader) {
        if (scrollTop > 30) {
          siteHeader.classList.add('scrolled');
        } else {
          siteHeader.classList.remove('scrolled');
        }
      }
    }, { passive: true });
  }

  // ----------------------------------------------------------------------------
  // 2. Mobile Drawer Navigation
  // ----------------------------------------------------------------------------
  function initMobileDrawer() {
    function openDrawer() {
      if (mobileDrawer && drawerOverlay) {
        mobileDrawer.classList.add('open');
        drawerOverlay.classList.add('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        drawerOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    }

    function closeDrawer() {
      if (mobileDrawer && drawerOverlay) {
        mobileDrawer.classList.remove('open');
        drawerOverlay.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        drawerOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    }

    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', openDrawer);
    }
    if (drawerCloseBtn) {
      drawerCloseBtn.addEventListener('click', closeDrawer);
    }
    if (drawerOverlay) {
      drawerOverlay.addEventListener('click', closeDrawer);
    }

    navLinks.forEach((link) => {
      link.addEventListener('click', closeDrawer);
    });
  }

  // ----------------------------------------------------------------------------
  // 3. Scrollspy for Active Navigation
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
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
      }
    );

    sections.forEach((section) => {
      spyObserver.observe(section);
    });
  }

  // ----------------------------------------------------------------------------
  // 4. Scroll-Triggered Reveal Animations
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
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach((el) => {
      revealObserver.observe(el);
    });
  }

  // ----------------------------------------------------------------------------
  // 5. Portfolio Filtering
  // ----------------------------------------------------------------------------
  function initPortfolioFilters() {
    if (!filterTabs.length || !projectItems.length) return;

    filterTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const filterVal = tab.getAttribute('data-filter');

        filterTabs.forEach((t) => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        projectItems.forEach((card) => {
          const categories = card.getAttribute('data-category') || '';
          if (filterVal === 'all' || categories.includes(filterVal)) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 20);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(12px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 240);
          }
        });
      });
    });
  }

  // ----------------------------------------------------------------------------
  // 6. Copy to Clipboard Utility with Toast Feedback
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
    toast.classList.add('show');

    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }

    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // ----------------------------------------------------------------------------
  // 7. Modals (Project Details & Printable CV)
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
  // 8. Contact Form Handling
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

      if (formAlert) {
        formAlert.textContent = 'Opening your email client to dispatch your message. Thank you!';
        formAlert.style.display = 'block';

        setTimeout(() => {
          formAlert.style.display = 'none';
        }, 8000);
      }

      contactForm.reset();
      showToast('Opening email app...');
    });
  }

  // ----------------------------------------------------------------------------
  // 9. Back to Top Button & Current Year
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
    initHeaderAndProgress();
    initMobileDrawer();
    initScrollSpy();
    initScrollReveals();
    initPortfolioFilters();
    initCopyButtons();
    initModals();
    initContactForm();
    initFooter();
  });
})();

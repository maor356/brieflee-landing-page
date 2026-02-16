/**
 * Brieflee Mega Menu — Product Dropdown
 * Replaces Webflow's default dropdown with a refined mega-menu popover.
 */
(function () {
  'use strict';

  var DEFAULT_PREVIEW = 'images/platform-preview.jpeg';

  var MENU_ITEMS = [
    {
      title: 'Overview',
      desc: 'A unified view of how Brieflee\'s products work together to support your entire practice.',
      href: 'index.html',
      preview: null
    },
    {
      title: 'Research',
      desc: 'Research complex legal, regulatory, and tax questions across jurisdictions and domains.',
      href: 'legal-research.html',
      preview: 'images/Search.png'
    },
    {
      title: 'Analyze',
      desc: 'Ask questions, analyze documents, and surface key insights with domain-specific AI.',
      href: 'workflows.html',
      preview: null
    },
    {
      title: 'Argue',
      desc: 'Build structured, source-grounded arguments for briefs, motions, and memoranda.',
      href: 'features-1.html',
      preview: null
    },
    {
      title: 'Workflows',
      desc: 'Run pre-built workflows or build your own, tailored to your firm\'s needs.',
      href: 'workflows.html',
      preview: 'images/Gradient-3.png'
    },
    {
      title: 'Draft',
      desc: 'Generate structured, source-based drafts and refine them directly in Brieflee.',
      href: 'draft.html',
      preview: 'images/Frame.png'
    }
  ];

  var OPEN_DELAY = 80;
  var CLOSE_DELAY = 250;
  var isOpen = false;
  var openTimer = null;
  var closeTimer = null;
  var megaMenu = null;

  function createMegaMenu() {
    megaMenu = document.createElement('div');
    megaMenu.className = 'mega-menu';
    megaMenu.setAttribute('role', 'menu');
    megaMenu.setAttribute('aria-label', 'Product navigation');

    var backdrop = document.createElement('div');
    backdrop.className = 'mega-menu__backdrop';

    var panel = document.createElement('div');
    panel.className = 'mega-menu__panel';

    var inner = document.createElement('div');
    inner.className = 'mega-menu__inner';

    var links = document.createElement('div');
    links.className = 'mega-menu__links';

    // --- Preview image crossfade ---
    // Two stacked images: defaultImg always shows unless hoverImg is active
    var defaultImg = null;
    var hoverImg = null;

    function showPreview(src) {
      if (!hoverImg || !defaultImg) return;
      hoverImg.src = src;
      hoverImg.style.opacity = '1';
      defaultImg.style.opacity = '0';
    }

    function resetPreview() {
      if (!hoverImg || !defaultImg) return;
      hoverImg.style.opacity = '0';
      defaultImg.style.opacity = '1';
    }

    MENU_ITEMS.forEach(function (item) {
      var a = document.createElement('a');
      a.className = 'mega-menu__item';
      a.href = item.href;
      a.setAttribute('role', 'menuitem');

      a.innerHTML =
        '<div class="mega-menu__text">' +
          '<div class="mega-menu__title">' + item.title + '</div>' +
          '<div class="mega-menu__desc">' + item.desc + '</div>' +
        '</div>';

      if (item.preview) {
        a.addEventListener('mouseenter', function () {
          showPreview(item.preview);
        });
        a.addEventListener('mouseleave', function () {
          resetPreview();
        });
      }

      links.appendChild(a);
    });

    // Preload hover images so swap is instant
    MENU_ITEMS.forEach(function (item) {
      if (item.preview) {
        var img = new Image();
        img.src = item.preview;
      }
    });

    var preview = document.createElement('div');
    preview.className = 'mega-menu__preview';

    var imgContainer = document.createElement('div');
    imgContainer.className = 'mega-menu__preview-images';

    defaultImg = document.createElement('img');
    defaultImg.className = 'mega-menu__preview-image mega-menu__preview-image--default';
    defaultImg.src = DEFAULT_PREVIEW;
    defaultImg.alt = 'Brieflee platform preview';
    defaultImg.loading = 'eager';

    hoverImg = document.createElement('img');
    hoverImg.className = 'mega-menu__preview-image mega-menu__preview-image--hover';
    hoverImg.src = '';
    hoverImg.alt = 'Product preview';
    hoverImg.loading = 'eager';

    imgContainer.appendChild(defaultImg);
    imgContainer.appendChild(hoverImg);

    var caption = document.createElement('div');
    caption.className = 'mega-menu__preview-caption';
    caption.innerHTML =
      '<div class="mega-menu__preview-title">The Brieflee Platform</div>' +
      '<div class="mega-menu__preview-desc">One workspace for legal research, analysis, and drafting — built for the way lawyers actually work.</div>';

    preview.appendChild(imgContainer);
    preview.appendChild(caption);

    inner.appendChild(links);
    inner.appendChild(preview);
    panel.appendChild(inner);
    megaMenu.appendChild(backdrop);
    megaMenu.appendChild(panel);
    document.body.appendChild(megaMenu);

    backdrop.addEventListener('click', closeMegaMenu);

    panel.addEventListener('mouseenter', cancelClose);
    panel.addEventListener('mouseleave', scheduleClose);
  }

  function openMegaMenu() {
    if (isOpen) return;
    isOpen = true;
    megaMenu.classList.add('is-open');
    var toggle = document.querySelector('.dropdown-toggle');
    if (toggle) toggle.classList.add('mega-active');
  }

  function closeMegaMenu() {
    if (!isOpen) return;
    isOpen = false;
    megaMenu.classList.remove('is-open');
    var toggle = document.querySelector('.dropdown-toggle');
    if (toggle) toggle.classList.remove('mega-active');
  }

  function scheduleOpen() {
    cancelClose();
    if (isOpen) return;
    openTimer = setTimeout(openMegaMenu, OPEN_DELAY);
  }

  function scheduleClose() {
    cancelOpen();
    if (!isOpen) return;
    closeTimer = setTimeout(closeMegaMenu, CLOSE_DELAY);
  }

  function cancelOpen() {
    if (openTimer) { clearTimeout(openTimer); openTimer = null; }
  }

  function cancelClose() {
    if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
  }

  function init() {
    if (window.innerWidth <= 991) return;

    createMegaMenu();

    var dropdown = document.querySelector('.dropdown.w-dropdown');
    var toggle = dropdown ? dropdown.querySelector('.dropdown-toggle') : null;
    if (!dropdown || !toggle) return;

    // Completely disable Webflow's dropdown JS by removing its attributes
    dropdown.removeAttribute('data-hover');
    dropdown.removeAttribute('data-delay');

    // Hide Webflow's dropdown list permanently on desktop
    var wfList = dropdown.querySelector('.w-dropdown-list');
    if (wfList) {
      wfList.style.display = 'none';
      wfList.style.opacity = '0';
      wfList.style.height = '0';
      wfList.style.overflow = 'hidden';
      wfList.style.pointerEvents = 'none';
    }

    // Intercept click before Webflow's handler
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      if (isOpen) {
        closeMegaMenu();
      } else {
        openMegaMenu();
      }
      // Re-suppress Webflow in case it got through
      if (wfList) {
        wfList.classList.remove('w--open');
        wfList.style.display = 'none';
      }
    }, true);

    // Hover triggers
    dropdown.addEventListener('mouseenter', scheduleOpen);
    dropdown.addEventListener('mouseleave', scheduleClose);

    // Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) {
        closeMegaMenu();
        toggle.focus();
      }
    });

  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

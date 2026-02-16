(function () {
  'use strict';

  var config = window.BRIEFLEE_LANG_MAP || {};
  var storageKey = config.storageKey || 'brieflee_locale';
  var localizedPages = config.localizedPages || [];
  var locales = config.locales || ['en', 'nl-be', 'fr-be'];
  var labels = config.labels || { en: 'EN', 'nl-be': 'NL', 'fr-be': 'FR' };

  function currentLocale(pathname) {
    var parts = (pathname || '/').split('/').filter(Boolean);
    var first = parts[0] || '';
    if (first === 'nl-be' || first === 'fr-be') return first;
    return 'en';
  }

  function currentFile(pathname) {
    var parts = (pathname || '/').split('/').filter(Boolean);
    var maybeFile = parts.length ? parts[parts.length - 1] : '';
    if (!maybeFile || maybeFile.indexOf('.html') === -1) return 'index.html';
    return maybeFile;
  }

  function isLocalizedPage(file) {
    return localizedPages.indexOf(file) !== -1;
  }

  function targetPath(file, locale) {
    var normalizedFile = file || 'index.html';
    var safeFile = isLocalizedPage(normalizedFile) ? normalizedFile : 'index.html';

    if (locale === 'en') {
      return safeFile === 'index.html' ? '/' : '/' + safeFile;
    }

    if (locale === 'nl-be' || locale === 'fr-be') {
      return safeFile === 'index.html'
        ? '/' + locale + '/'
        : '/' + locale + '/' + safeFile;
    }

    return '/index.html';
  }

  function makeSwitcher(locale, file, isMobile) {
    var wrapper = document.createElement('div');
    wrapper.className = isMobile ? 'language-switcher language-switcher--mobile' : 'language-switcher';
    wrapper.setAttribute('data-brieflee-lang-switcher', isMobile ? 'mobile' : 'desktop');
    wrapper.setAttribute('role', 'navigation');
    wrapper.setAttribute('aria-label', 'Language switcher');

    locales.forEach(function (code) {
      var link = document.createElement('a');
      var isActive = code === locale;
      link.className = 'language-switcher__link' + (isActive ? ' is-active' : '');
      link.textContent = labels[code] || code.toUpperCase();
      link.setAttribute('data-locale', code);
      link.setAttribute('hreflang', code === 'en' ? 'en' : (code === 'nl-be' ? 'nl-BE' : 'fr-BE'));
      link.href = targetPath(file, code);
      if (isActive) {
        link.setAttribute('aria-current', 'true');
      }

      link.addEventListener('click', function (event) {
        event.preventDefault();
        try {
          window.localStorage.setItem(storageKey, code);
        } catch (err) {
          // Ignore storage errors in restricted environments.
        }
        window.location.href = targetPath(file, code);
      });

      wrapper.appendChild(link);
    });

    return wrapper;
  }

  function mountSwitchers() {
    var locale = currentLocale(window.location.pathname);
    var file = currentFile(window.location.pathname);

    var desktopHost = document.querySelector('.nav-buttons');
    if (desktopHost) {
      desktopHost.querySelectorAll('[data-brieflee-lang-switcher="desktop"]').forEach(function (node) {
        node.remove();
      });
      var desktop = makeSwitcher(locale, file, false);
      var menuButton = desktopHost.querySelector('.menu-button');
      if (menuButton) {
        desktopHost.insertBefore(desktop, menuButton);
      } else {
        desktopHost.appendChild(desktop);
      }
    }

    var mobileHost = document.querySelector('.nav-links');
    if (mobileHost) {
      mobileHost.querySelectorAll('[data-brieflee-lang-switcher="mobile"]').forEach(function (node) {
        node.remove();
      });
      mobileHost.appendChild(makeSwitcher(locale, file, true));
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountSwitchers);
  } else {
    mountSwitchers();
  }
})();

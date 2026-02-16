/* ============================================
   Feature Showcase — Auto-rotating tabs
   ============================================ */
(function () {
  'use strict';

  var INTERVAL = 6000;
  var timer = null;
  var currentIndex = 0;
  var tabs, images, progressBars;

  function init() {
    var container = document.querySelector('.feature-showcase');
    if (!container) return;

    tabs = container.querySelectorAll('.feature-showcase__tab');
    images = container.querySelectorAll('.feature-showcase__image');
    progressBars = container.querySelectorAll('.feature-showcase__progress-bar');

    if (!tabs.length) return;

    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () {
        setActiveTab(i);
        restartAutoRotation();
      });
    });

    setActiveTab(0);
    startAutoRotation();
  }

  function setActiveTab(index) {
    currentIndex = index;

    tabs.forEach(function (tab, i) {
      if (i === index) {
        tab.classList.add('is-active');
      } else {
        tab.classList.remove('is-active');
      }
    });

    images.forEach(function (img, i) {
      if (i === index) {
        img.classList.add('is-active');
      } else {
        img.classList.remove('is-active');
      }
    });

    // Restart progress bar animation by forcing reflow
    progressBars.forEach(function (bar, i) {
      bar.style.transition = 'none';
      bar.style.width = '0%';
      if (i === index) {
        // Force reflow
        void bar.offsetWidth;
        bar.style.transition = 'width ' + INTERVAL + 'ms linear';
        bar.style.width = '100%';
      }
    });
  }

  function startAutoRotation() {
    timer = setInterval(function () {
      var next = (currentIndex + 1) % tabs.length;
      setActiveTab(next);
    }, INTERVAL);
  }

  function restartAutoRotation() {
    clearInterval(timer);
    startAutoRotation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

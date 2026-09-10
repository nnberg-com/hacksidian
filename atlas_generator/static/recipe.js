'use strict';
// Measure content rather than the viewport, so folding sections can shrink too.
if (window.parent !== window) {
  let previous = 0;
  const report = () => {
    const height = Math.ceil(document.querySelector('main').getBoundingClientRect().height);
    if (height > 0 && height !== previous) {
      previous = height;
      parent.postMessage({type: 'atlas-card-height', height}, '*');
    }
  };
  new ResizeObserver(report).observe(document.querySelector('main'));
  window.addEventListener('load', report);
  report();
}

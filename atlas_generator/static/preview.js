'use strict';
document.addEventListener('change', event => {
  const input = event.target;
  if (!input.matches('input[type=checkbox]')) return;
  const task = input.closest('li.task-list-item');
  if (task) { task.dataset.task = input.checked ? 'x' : ' '; task.classList.toggle('is-checked', input.checked); }
});
for (const details of document.querySelectorAll('details.callout')) details.addEventListener('toggle', () => details.classList.toggle('is-collapsed', !details.open));

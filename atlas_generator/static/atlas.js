'use strict';
const byId = id => document.getElementById(id);
const entries = window.ATLAS.entries;
const reader = document.querySelector('.reader');
const feed = byId('feed');
const controls = ['search', 'category', 'digest', 'format', 'interactive'].map(byId);
const uiLanguage = window.ATLAS.uiLanguage || 'ru';
const t = (key, values = {}) => window.ATLAS.i18n[key].replace(/\{(\w+)\}/g, (match, name) => String(values[name] ?? match));
for (const [id, digest] of Object.entries(window.ATLAS.digests || {}).sort((a,b) => a[1].title.localeCompare(b[1].title, uiLanguage))) {
  const option = document.createElement('option'); option.value = id;
  option.textContent = digest.title + ' · ' + entries.filter(e => (e.digest || []).includes(id)).length;
  byId('digest').append(option);
}

function collectionURL() {
  const url = new URL(location.href);
  url.search = ''; url.hash = '';
  for (const control of controls) if (control.value) url.searchParams.set(control.id, control.value);
  return url.href;
}
function restoreFilters() {
  const params = new URLSearchParams(location.search);
  for (const control of controls) {
    const value = params.get(control.id) || '';
    control.value = control.id === 'search' || [...control.options].some(option => option.value === value) ? value : '';
  }
}
function selectedFromURL() {
  try { return decodeURIComponent(location.hash.slice(1)); }
  catch { return ''; }
}
function restoreCollection() {
  restoreFilters();
  render();
  const id = selectedFromURL();
  if (id) select(id, false);
}
const BATCH = 8;
let selected = '', filtered = entries, loaded = 0;
const frames = new Map();
byId('total').textContent = t('total', {count: entries.length.toLocaleString(uiLanguage), groups: Object.keys(window.ATLAS.categories).length});
for (const [id, category] of Object.entries(window.ATLAS.categories).sort((a,b)=>a[1].title.localeCompare(b[1].title,uiLanguage))) {
  const option = document.createElement('option'); option.value = id; option.textContent = category.title; byId('category').append(option);
}
const near = new IntersectionObserver(items => {
  for (const item of items) if (item.isIntersecting) {
    const frame = item.target;
    if (!frame.hasAttribute('src')) frame.src = frame.dataset.url;
    near.unobserve(frame);
  }
}, {root: reader, rootMargin: '1200px 0px'});
const tail = new IntersectionObserver(items => {
  if (items.some(item => item.isIntersecting)) appendBatch();
}, {root: reader, rootMargin: '600px 0px'});
function appendBatch(until = loaded + BATCH) {
  const end = Math.min(until, filtered.length);
  for (; loaded < end; loaded++) {
    const entry = filtered[loaded];
    const card = document.createElement('article'); card.className = 'feed-card'; card.dataset.id = entry.id; card.dataset.position = loaded + 1;
    card.setAttribute('aria-label', entry.title);
    const frame = document.createElement('iframe');
    frame.title = entry.title; frame.dataset.url = entry.url;
    card.append(frame); feed.append(card); frames.set(entry.id, frame); near.observe(frame);
  }
  byId('load-more').hidden = loaded >= filtered.length;
}
window.addEventListener('message', event => {
  if (event.data?.type !== 'atlas-card-height' || !Number.isFinite(event.data.height)) return;
  for (const frame of frames.values()) if (frame.contentWindow === event.source) {
    const oldHeight = frame.offsetHeight;
    const above = frame.getBoundingClientRect().bottom <= reader.getBoundingClientRect().top + 2;
    const height = Math.max(160, Math.min(100000, event.data.height));
    frame.style.height = height + 'px';
    if (above) reader.scrollTop += height - oldHeight;
    break;
  }
});
function select(id, push = true) {
  const index = filtered.findIndex(e => e.id === id); if (index < 0) return;
  selected = id; document.body.classList.add('reading');
  appendBatch(Math.max(loaded, index + 1));
  const frame = frames.get(id);
  if (!frame.hasAttribute('src')) frame.src = frame.dataset.url;
  // Offset is relative to the scrollable reader, including any outer header.
  reader.scrollTop += frame.parentElement.getBoundingClientRect().top - reader.getBoundingClientRect().top;
  if (push) history.replaceState(null, '', collectionURL() + '#' + encodeURIComponent(id));
  markCurrent(id);
}
function markCurrent(id) {
  selected = id;
  for (const a of byId('results').querySelectorAll('a')) a.setAttribute('aria-current', String(a.dataset.id === id));
}
let scrollPending = false;
reader.addEventListener('scroll', () => {
  if (scrollPending) return;
  scrollPending = true;
  requestAnimationFrame(() => {
    scrollPending = false;
    const top = reader.getBoundingClientRect().top;
    const card = [...feed.children].find(c => c.getBoundingClientRect().bottom > top + 80);
    if (!card || card.dataset.id === selected) return;
    markCurrent(card.dataset.id);
    const link = [...byId('results').children].find(a => a.dataset.id === selected);
    if (link) {
      const catalogue = document.querySelector('.catalogue');
      const upper = document.querySelector('.filters').getBoundingClientRect().bottom;
      const rect = link.getBoundingClientRect();
      if (rect.top < upper) catalogue.scrollTop += rect.top - upper;
      else if (rect.bottom > catalogue.getBoundingClientRect().bottom) catalogue.scrollTop += rect.bottom - catalogue.getBoundingClientRect().bottom;
    }
  });
});
function render() {
  const q = byId('search').value.trim().toLocaleLowerCase(uiLanguage).split(/\s+/).filter(Boolean);
  filtered = entries.filter(e => (!byId('category').value || e.category === byId('category').value)
    && (!byId('digest').value || (e.digest || []).includes(byId('digest').value))
    && (!byId('format').value || e.format === byId('format').value)
    && (!byId('interactive').value || String(e.interactive) === byId('interactive').value)
    && q.every(word => e.search.includes(word)));
  selected = '';
  const permalink = collectionURL();
  byId('permalink').href = permalink;
  const list = byId('results'); list.replaceChildren();
  for (const [index, entry] of filtered.entries()) {
    const a = document.createElement('a'); a.className = 'entry'; a.href = permalink + '#' + encodeURIComponent(entry.id); a.dataset.id = entry.id; a.dataset.position = index + 1;
    const name = document.createElement('strong'); name.textContent = entry.title;
    const meta = document.createElement('small');
    if (entry.interactive) { const dot = document.createElement('span'); dot.textContent = '●'; dot.className = 'dot'; dot.title = t('interaction_hint'); meta.append(dot); }
    meta.append(document.createTextNode(entry.categoryTitle + ' · ' + entry.id)); a.append(name, meta);
    a.addEventListener('click', event => { event.preventDefault(); select(entry.id); }); list.append(a);
  }
  byId('results-count').textContent = t('found', {count: filtered.length.toLocaleString(uiLanguage)});
  byId('empty').hidden = byId('feed-empty').hidden = !!filtered.length;
  near.disconnect(); tail.disconnect(); frames.clear(); feed.replaceChildren(); loaded = 0; reader.scrollTop = 0;
  appendBatch(); tail.observe(byId('load-more'));
  if (filtered.length) markCurrent(filtered[0].id);
}
for (const control of controls) control.addEventListener(control.id === 'search' ? 'input' : 'change', () => {
  history.replaceState(null, '', collectionURL());
  render();
});
byId('load-more').addEventListener('click', () => appendBatch());
byId('back').addEventListener('click', () => document.body.classList.remove('reading'));
window.addEventListener('popstate', restoreCollection);
window.addEventListener('hashchange', () => select(selectedFromURL(), false));
restoreCollection();

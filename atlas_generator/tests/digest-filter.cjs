// Exercise the real atlas controller with a minimal DOM; no browser rendering claims.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
class Element {
  constructor() {
    this.children = []; this.dataset = {}; this.value = ''; this.style = {};
    this.listeners = {}; this.classList = {add() {}, remove() {}};
  }
  append(...children) { this.children.push(...children); for (const child of children) if (typeof child === 'object') child.parentElement = this; }
  getBoundingClientRect() { return {top: 0, bottom: 100}; }
  replaceChildren(...children) { this.children = children; }
  setAttribute(name, value) { this[name] = value; }
  hasAttribute(name) { return this[name] !== undefined; }
  addEventListener(name, callback) { this.listeners[name] = callback; }
  querySelectorAll() { return this.children; }
  get options() { return this.children; }
}
const dictionaries = JSON.parse(require('node:child_process').execFileSync('python3', ['-c', 'import json; from atlas_generator.i18n import strings; print(json.dumps({lang: strings(lang) for lang in ("ru", "en")}))'], {cwd:path.resolve(__dirname,'../..'), encoding:'utf8'}));
const controller = fs.readFileSync(path.join(__dirname, '../static/atlas.js'), 'utf8');
for (const language of ['ru', 'en']) for (const baseURL of ['file:///tmp/atlas/index.html', 'http://127.0.0.1:8765/index.html']) {
  const ids = ['search', 'category', 'digest', 'format', 'interactive', 'feed', 'total', 'results', 'load-more', 'results-count', 'empty', 'feed-empty', 'back', 'permalink'];
  const elements = Object.fromEntries(ids.map(id => { const e = new Element(); e.id = id; return [id, e]; }));
  for (const [id, values] of Object.entries({digest: [''], category: [''], format: ['', 'markdown', 'html', 'properties'], interactive: ['', 'true', 'false']})) {
    for (const value of values) { const option = new Element(); option.value = value; elements[id].append(option); }
  }
  const reader = new Element(), digestLabel = new Element();
  const entries = [
    {id: 'a', title: 'A', category: 'task', categoryTitle: 'Task', digest: ['todo', 'management'], format: 'markdown', interactive: false, search: 'alpha'},
    {id: 'b', title: 'B', category: 'callout', categoryTitle: 'Callout', digest: ['teach', 'management'], format: 'html', interactive: true, search: 'beta'},
    {id: 'c', title: 'C', category: 'task', categoryTitle: 'Task', digest: [], format: 'markdown', interactive: false, search: 'gamma'},
  ];
  const context = {
    document: {getElementById: id => elements[id], querySelector: selector => selector.startsWith('label') ? digestLabel : reader,
      createElement: () => new Element(), createTextNode: text => text, body: new Element()},
    window: {ATLAS: {entries, i18n: dictionaries[language], categories: {task: {title: 'Task'}, callout: {title: 'Callout'}}, uiLanguage: language, digests: {todo: {title: 'Todo'}, teach: {title: 'Teach'}, management: {title: 'Management'}}}, listeners: {}, addEventListener(name, callback) { this.listeners[name] = callback; }},
    IntersectionObserver: class { observe() {} unobserve() {} disconnect() {} },
    URL, URLSearchParams,
    history: {replaceState(_state, _unused, url) { context.location.href = new URL(url, context.location.href).href; }}, location: new URL(baseURL),
  };
  vm.runInNewContext(controller, context);
  const results = () => elements.results.children.map(e => e.dataset.id);
  function choose(id, value) { elements[id].value = value; elements[id].listeners[id === 'search' ? 'input' : 'change'](); }
  assert.deepEqual(results(), ['a', 'b', 'c']);
  assert.equal(elements['results-count'].textContent, language === 'ru' ? '3 найдено' : '3 found');
  choose('digest', 'todo'); assert.deepEqual(results(), ['a']);
  choose('digest', 'management'); assert.deepEqual(results(), ['a', 'b']);
  choose('category', 'callout'); assert.deepEqual(results(), ['b']);
  choose('format', 'markdown'); assert.deepEqual(results(), []);
  choose('format', ''); choose('category', '');
  choose('interactive', 'false'); assert.deepEqual(results(), ['a']);
  choose('search', 'beta'); assert.deepEqual(results(), []);
  choose('interactive', ''); assert.deepEqual(results(), ['b']);
  choose('digest', 'todo'); assert.deepEqual(results(), []);
  choose('digest', ''); choose('search', ''); assert.deepEqual(results(), ['a', 'b', 'c']);
  choose('digest', 'management'); choose('category', 'task'); choose('format', 'markdown'); choose('interactive', 'false');
  choose('search', 'Вопрос & ответ #1 + 50%');
  const saved = elements.permalink.href;
  const query = new URL(saved).searchParams;
  assert.equal(query.get('search'), 'Вопрос & ответ #1 + 50%');
  assert.equal(query.get('digest'), 'management');
  assert.equal(query.get('category'), 'task');
  assert.equal(query.get('format'), 'markdown');
  assert.equal(query.get('interactive'), 'false');
  assert.equal(context.location.href, saved);
  context.location.href = baseURL;
  context.window.listeners.popstate(); assert.deepEqual(results(), ['a', 'b', 'c']);
  assert.equal(elements.permalink.href, baseURL);
  context.location.href = saved;
  context.window.listeners.popstate(); assert.deepEqual(results(), []);
  assert.equal(elements.search.value, 'Вопрос & ответ #1 + 50%');
  assert.equal(elements.digest.value, 'management');
  context.location.href = baseURL + '?digest=todo#a';
  context.window.listeners.popstate(); assert.deepEqual(results(), ['a']);
  assert.equal(elements.permalink.href, baseURL + '?digest=todo');
  assert.equal(elements.results.children[0].href, baseURL + '?digest=todo#a');
  elements.results.children[0].listeners.click({preventDefault() {}});
  assert.equal(context.location.href, baseURL + '?digest=todo#a');
  context.location.href = baseURL + '?digest=missing&category=unknown&interactive=maybe#%ZZ';
  context.window.listeners.popstate(); assert.deepEqual(results(), ['a', 'b', 'c']);
  assert.equal(elements.digest.value, '');
  assert.equal(elements.permalink.href, baseURL);
}
console.log('PASS: digest membership, intersecting filters, empty/reset states, ru/en labels, URL round trips, navigation and malformed URLs (DOM simulation)');

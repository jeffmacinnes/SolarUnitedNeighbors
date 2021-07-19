'use strict';

var Scroller = require('components/common/Scroller.svelte');
var utils = require('components/utils');
var Axes = require('components/DailyChart/Axes.svelte');
var EnergyArcs = require('components/DailyChart/EnergyArcs.svelte');
var DaylightArc = require('components/DailyChart/DaylightArc.svelte');
var Net = require('components/DailyChart/Net.svelte');
var NetLegend = require('components/DailyChart/NetLegend.svelte');
var NetSumText = require('components/DailyChart/NetSumText.svelte');
var ScrollerTextBox = require('components/common/ScrollerTextBox.svelte');
var Slider = require('components/common/Slider.svelte');
var PlanTable = require('components/PlanTable/PlanTable.svelte');
var runtime_js = require('https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js');
var notebook = require('https://api.observablehq.com/d/75836c71d23e67a3@1253.js?v=3');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Scroller__default = /*#__PURE__*/_interopDefaultLegacy(Scroller);
var Axes__default = /*#__PURE__*/_interopDefaultLegacy(Axes);
var EnergyArcs__default = /*#__PURE__*/_interopDefaultLegacy(EnergyArcs);
var DaylightArc__default = /*#__PURE__*/_interopDefaultLegacy(DaylightArc);
var Net__default = /*#__PURE__*/_interopDefaultLegacy(Net);
var NetLegend__default = /*#__PURE__*/_interopDefaultLegacy(NetLegend);
var NetSumText__default = /*#__PURE__*/_interopDefaultLegacy(NetSumText);
var ScrollerTextBox__default = /*#__PURE__*/_interopDefaultLegacy(ScrollerTextBox);
var Slider__default = /*#__PURE__*/_interopDefaultLegacy(Slider);
var PlanTable__default = /*#__PURE__*/_interopDefaultLegacy(PlanTable);
var notebook__default = /*#__PURE__*/_interopDefaultLegacy(notebook);

function noop() { }
const identity$3 = x => x;
function assign(tar, src) {
    // @ts-ignore
    for (const k in src)
        tar[k] = src[k];
    return tar;
}
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function is_function(thing) {
    return typeof thing === 'function';
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function subscribe(store, ...callbacks) {
    if (store == null) {
        return noop;
    }
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}

const is_client = typeof window !== 'undefined';
let now = is_client
    ? () => window.performance.now()
    : () => Date.now();
let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

const tasks = new Set();
function run_tasks(now) {
    tasks.forEach(task => {
        if (!task.c(now)) {
            tasks.delete(task);
            task.f();
        }
    });
    if (tasks.size !== 0)
        raf(run_tasks);
}
/**
 * Creates a new task that runs on each raf frame
 * until it returns a falsy value or is aborted
 */
function loop(callback) {
    let task;
    if (tasks.size === 0)
        raf(run_tasks);
    return {
        promise: new Promise(fulfill => {
            tasks.add(task = { c: callback, f: fulfill });
        }),
        abort() {
            tasks.delete(task);
        }
    };
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error('Function called outside component initialization');
    return current_component;
}
function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
}
function setContext(key, context) {
    get_current_component().$$.context.set(key, context);
}
function getContext(key) {
    return get_current_component().$$.context.get(key);
}
const escaped = {
    '"': '&quot;',
    "'": '&#39;',
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};
function escape(html) {
    return String(html).replace(/["'&<>]/g, match => escaped[match]);
}
function each(items, fn) {
    let str = '';
    for (let i = 0; i < items.length; i += 1) {
        str += fn(items[i], i);
    }
    return str;
}
function validate_component(component, name) {
    if (!component || !component.$$render) {
        if (name === 'svelte:component')
            name += ' this={...}';
        throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
    }
    return component;
}
let on_destroy;
function create_ssr_component(fn) {
    function $$render(result, props, bindings, slots, context) {
        const parent_component = current_component;
        const $$ = {
            on_destroy,
            context: new Map(parent_component ? parent_component.$$.context : context || []),
            // these will be immediately discarded
            on_mount: [],
            before_update: [],
            after_update: [],
            callbacks: blank_object()
        };
        set_current_component({ $$ });
        const html = fn(result, props, bindings, slots);
        set_current_component(parent_component);
        return html;
    }
    return {
        render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
            on_destroy = [];
            const result = { title: '', head: '', css: new Set() };
            const html = $$render(result, props, {}, $$slots, context);
            run_all(on_destroy);
            return {
                html,
                css: {
                    code: Array.from(result.css).map(css => css.code).join('\n'),
                    map: null // TODO
                },
                head: result.title + result.head
            };
        },
        $$render
    };
}
function add_attribute(name, value, boolean) {
    if (value == null || (boolean && !value))
        return '';
    return ` ${name}${value === true ? '' : `=${typeof value === 'string' ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
}

/* src/components/common/Head.svelte generated by Svelte v3.38.2 */

const Head = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	return `${($$result.head += `${($$result.title = `<title>Project Template</title>`, "")}<meta charset="${"utf-8"}"><meta name="${"viewport"}" content="${"width=device-width, initial-scale=1.0"}"><meta http-equiv="${"Content-Type"}" content="${"text/html; charset=utf-8"}"><meta name="${"description"}" content="${""}"><meta name="${"author"}" content="${""}"><meta name="${"news_keywords"}" content="${""}"><meta property="${"og:title"}" content="${""}"><meta property="${"og:site_name"}" content="${""}"><meta property="${"og:url"}" content="${""}"><meta property="${"og:description"}" content="${""}"><meta property="${"og:type"}" content="${"article"}"><meta property="${"og:locale"}" content="${"en_US"}"><meta property="${"og:image"}" content="${""}"><meta property="${"og:image:type"}" content="${"image/jpeg"}"><meta property="${"og:image:width"}" content="${"1200"}"><meta property="${"og:image:height"}" content="${"600"}"><meta name="${"twitter:card"}" content="${"summary_large_image"}"><meta name="${"twitter:site"}" content="${""}"><meta name="${"twitter:creator"}" content="${""}"><meta name="${"twitter:title"}" content="${""}"><meta name="${"twitter:description"}" content="${""}"><meta name="${"twitter:image:src"}" content="${""}"><meta name="${"robots"}" content="${"max-image-preview:large"}"><link rel="${"canonical"}" href="${""}">`, "")}`;
});

/* src/sections/Hero/Hero.svelte generated by Svelte v3.38.2 */

const css$8 = {
	code: "#hero.svelte-1ho12jp{width:100%;height:100vh;background-color:lightgray}div.svelte-1ho12jp{height:100%;display:flex;justify-content:center;align-items:center}",
	map: "{\"version\":3,\"file\":\"Hero.svelte\",\"sources\":[\"Hero.svelte\"],\"sourcesContent\":[\"<section id=\\\"hero\\\">\\n  <div class=\\\"body-content\\\">\\n    <h2>Hero</h2>\\n  </div>\\n</section>\\n\\n<style>\\n  #hero {\\n    width: 100%;\\n    height: 100vh;\\n    background-color: lightgray;\\n  }\\n\\n  div {\\n    height: 100%;\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n  }\\n</style>\\n\"],\"names\":[],\"mappings\":\"AAOE,KAAK,eAAC,CAAC,AACL,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,KAAK,CACb,gBAAgB,CAAE,SAAS,AAC7B,CAAC,AAED,GAAG,eAAC,CAAC,AACH,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,AACrB,CAAC\"}"
};

const Hero = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	$$result.css.add(css$8);

	return `<section id="${"hero"}" class="${"svelte-1ho12jp"}"><div class="${"body-content svelte-1ho12jp"}"><h2>Hero</h2></div>
</section>`;
});

/* src/sections/Summary/Summary.svelte generated by Svelte v3.38.2 */

const css$7 = {
	code: "#summary.svelte-1xq0rvt{width:100%;height:100vh;background-color:lightgray}div.svelte-1xq0rvt{height:100%;display:flex;justify-content:center;align-items:center}",
	map: "{\"version\":3,\"file\":\"Summary.svelte\",\"sources\":[\"Summary.svelte\"],\"sourcesContent\":[\"<script>\\n</script>\\n\\n<section id=\\\"summary\\\">\\n  <div class=\\\"body-content\\\">\\n    <h2>Summary Section</h2>\\n  </div>\\n</section>\\n\\n<style>\\n  #summary {\\n    width: 100%;\\n    height: 100vh;\\n    background-color: lightgray;\\n  }\\n\\n  div {\\n    height: 100%;\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n  }\\n</style>\\n\"],\"names\":[],\"mappings\":\"AAUE,QAAQ,eAAC,CAAC,AACR,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,KAAK,CACb,gBAAgB,CAAE,SAAS,AAC7B,CAAC,AAED,GAAG,eAAC,CAAC,AACH,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,AACrB,CAAC\"}"
};

const Summary = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	$$result.css.add(css$7);

	return `<section id="${"summary"}" class="${"svelte-1xq0rvt"}"><div class="${"body-content svelte-1xq0rvt"}"><h2>Summary Section</h2></div>
</section>`;
});

const subscriber_queue = [];
/**
 * Creates a `Readable` store that allows reading by subscription.
 * @param value initial value
 * @param {StartStopNotifier}start start and stop notifications for subscriptions
 */
function readable(value, start) {
    return {
        subscribe: writable(value, start).subscribe
    };
}
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */
function writable(value, start = noop) {
    let stop;
    const subscribers = [];
    function set(new_value) {
        if (safe_not_equal(value, new_value)) {
            value = new_value;
            if (stop) { // store is ready
                const run_queue = !subscriber_queue.length;
                for (let i = 0; i < subscribers.length; i += 1) {
                    const s = subscribers[i];
                    s[1]();
                    subscriber_queue.push(s, value);
                }
                if (run_queue) {
                    for (let i = 0; i < subscriber_queue.length; i += 2) {
                        subscriber_queue[i][0](subscriber_queue[i + 1]);
                    }
                    subscriber_queue.length = 0;
                }
            }
        }
    }
    function update(fn) {
        set(fn(value));
    }
    function subscribe(run, invalidate = noop) {
        const subscriber = [run, invalidate];
        subscribers.push(subscriber);
        if (subscribers.length === 1) {
            stop = start(set) || noop;
        }
        run(value);
        return () => {
            const index = subscribers.indexOf(subscriber);
            if (index !== -1) {
                subscribers.splice(index, 1);
            }
            if (subscribers.length === 0) {
                stop();
                stop = null;
            }
        };
    }
    return { set, update, subscribe };
}
function derived(stores, fn, initial_value) {
    const single = !Array.isArray(stores);
    const stores_array = single
        ? [stores]
        : stores;
    const auto = fn.length < 2;
    return readable(initial_value, (set) => {
        let inited = false;
        const values = [];
        let pending = 0;
        let cleanup = noop;
        const sync = () => {
            if (pending) {
                return;
            }
            cleanup();
            const result = fn(single ? values[0] : values, set);
            if (auto) {
                set(result);
            }
            else {
                cleanup = is_function(result) ? result : noop;
            }
        };
        const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
            values[i] = value;
            pending &= ~(1 << i);
            if (inited) {
                sync();
            }
        }, () => {
            pending |= (1 << i);
        }));
        inited = true;
        sync();
        return function stop() {
            run_all(unsubscribers);
            cleanup();
        };
    });
}

function cubicInOut(t) {
    return t < 0.5 ? 4.0 * t * t * t : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0;
}

function is_date(obj) {
    return Object.prototype.toString.call(obj) === '[object Date]';
}

function get_interpolator(a, b) {
    if (a === b || a !== a)
        return () => a;
    const type = typeof a;
    if (type !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
        throw new Error('Cannot interpolate values of different type');
    }
    if (Array.isArray(a)) {
        const arr = b.map((bi, i) => {
            return get_interpolator(a[i], bi);
        });
        return t => arr.map(fn => fn(t));
    }
    if (type === 'object') {
        if (!a || !b)
            throw new Error('Object cannot be null');
        if (is_date(a) && is_date(b)) {
            a = a.getTime();
            b = b.getTime();
            const delta = b - a;
            return t => new Date(a + t * delta);
        }
        const keys = Object.keys(b);
        const interpolators = {};
        keys.forEach(key => {
            interpolators[key] = get_interpolator(a[key], b[key]);
        });
        return t => {
            const result = {};
            keys.forEach(key => {
                result[key] = interpolators[key](t);
            });
            return result;
        };
    }
    if (type === 'number') {
        const delta = b - a;
        return t => a + t * delta;
    }
    throw new Error(`Cannot interpolate ${type} values`);
}
function tweened(value, defaults = {}) {
    const store = writable(value);
    let task;
    let target_value = value;
    function set(new_value, opts) {
        if (value == null) {
            store.set(value = new_value);
            return Promise.resolve();
        }
        target_value = new_value;
        let previous_task = task;
        let started = false;
        let { delay = 0, duration = 400, easing = identity$3, interpolate = get_interpolator } = assign(assign({}, defaults), opts);
        if (duration === 0) {
            if (previous_task) {
                previous_task.abort();
                previous_task = null;
            }
            store.set(value = target_value);
            return Promise.resolve();
        }
        const start = now() + delay;
        let fn;
        task = loop(now => {
            if (now < start)
                return true;
            if (!started) {
                fn = interpolate(value, new_value);
                if (typeof duration === 'function')
                    duration = duration(value, new_value);
                started = true;
            }
            if (previous_task) {
                previous_task.abort();
                previous_task = null;
            }
            const elapsed = now - start;
            if (elapsed > duration) {
                store.set(value = new_value);
                return false;
            }
            // @ts-ignore
            store.set(value = fn(easing(elapsed / duration)));
            return true;
        });
        return task.promise;
    }
    return {
        set,
        update: (fn, opts) => set(fn(target_value, value), opts),
        subscribe: store.subscribe
    };
}

/* --------------------------------------------
 *
 * Return a truthy value if is zero
 *
 * --------------------------------------------
 */
function canBeZero (val) {
	if (val === 0) {
		return true;
	}
	return val;
}

function makeAccessor (acc) {
	if (!canBeZero(acc)) return null;
	if (Array.isArray(acc)) {
		return d => acc.map(k => {
			return typeof k !== 'function' ? d[k] : k(d);
		});
	} else if (typeof acc !== 'function') { // eslint-disable-line no-else-return
		return d => d[acc];
	}
	return acc;
}

/* --------------------------------------------
 *
 * Remove undefined fields from an object
 *
 * --------------------------------------------
 */

// From Object.fromEntries polyfill https://github.com/tc39/proposal-object-from-entries/blob/master/polyfill.js#L1
function fromEntries(iter) {
	const obj = {};

	for (const pair of iter) {
		if (Object(pair) !== pair) {
			throw new TypeError("iterable for fromEntries should yield objects");
		}

		// Consistency with Map: contract is that entry has "0" and "1" keys, not
		// that it is an array or iterable.

		const { "0": key, "1": val } = pair;

		Object.defineProperty(obj, key, {
			configurable: true,
			enumerable: true,
			writable: true,
			value: val,
		});
	}

	return obj;
}

function filterObject (obj) {
	return fromEntries(Object.entries(obj).filter(([key, value]) => {
		return value !== undefined;
	}));
}

/* --------------------------------------------
 *
 * Calculate the extents of desired fields
 * Returns an object like:
 * `{x: [0, 10], y: [-10, 10]}` if `fields` is
 * `[{field:'x', accessor: d => d.x}, {field:'y', accessor: d => d.y}]`
 *
 * --------------------------------------------
 */
function calcExtents (data, fields) {
	if (!Array.isArray(data) || data.length === 0) return null;
	const extents = {};
	const fl = fields.length;
	let i;
	let j;
	let f;
	let val;
	let s;

	if (fl) {
		for (i = 0; i < fl; i += 1) {
			const firstRow = fields[i].accessor(data[0]);
			if (firstRow === undefined || firstRow === null || Number.isNaN(firstRow) === true) {
				extents[fields[i].field] = [Infinity, -Infinity];
			} else {
				extents[fields[i].field] = Array.isArray(firstRow) ? firstRow : [firstRow, firstRow];
			}
		}
		const dl = data.length;
		for (i = 0; i < dl; i += 1) {
			for (j = 0; j < fl; j += 1) {
				f = fields[j];
				val = f.accessor(data[i]);
				s = f.field;
				if (Array.isArray(val)) {
					const vl = val.length;
					for (let k = 0; k < vl; k += 1) {
						if (val[k] !== undefined && val[k] !== null && Number.isNaN(val[k]) === false) {
							if (val[k] < extents[s][0]) {
								extents[s][0] = val[k];
							}
							if (val[k] > extents[s][1]) {
								extents[s][1] = val[k];
							}
						}
					}
				} else if (val !== undefined && val !== null && Number.isNaN(val) === false) {
					if (val < extents[s][0]) {
						extents[s][0] = val;
					}
					if (val > extents[s][1]) {
						extents[s][1] = val;
					}
				}
			}
		}
	} else {
		return null;
	}
	return extents;
}

/* --------------------------------------------
 * If we have a domain from settings, fill in
 * any null values with ones from our measured extents
 * otherwise, return the measured extent
 */
function partialDomain (domain = [], directive) {
	if (Array.isArray(directive) === true) {
		return directive.map((d, i) => {
			if (d === null) {
				return domain[i];
			}
			return d;
		});
	}
	return domain;
}

function calcDomain (s) {
	return function domainCalc ([$extents, $domain]) {
		return $extents ? partialDomain($extents[s], $domain) : $domain;
	};
}

function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

function bisector(f) {
  let delta = f;
  let compare = f;

  if (f.length === 1) {
    delta = (d, x) => f(d) - x;
    compare = ascendingComparator(f);
  }

  function left(a, x, lo, hi) {
    if (lo == null) lo = 0;
    if (hi == null) hi = a.length;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if (compare(a[mid], x) < 0) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  }

  function right(a, x, lo, hi) {
    if (lo == null) lo = 0;
    if (hi == null) hi = a.length;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if (compare(a[mid], x) > 0) hi = mid;
      else lo = mid + 1;
    }
    return lo;
  }

  function center(a, x, lo, hi) {
    if (lo == null) lo = 0;
    if (hi == null) hi = a.length;
    const i = left(a, x, lo, hi - 1);
    return i > lo && delta(a[i - 1], x) > -delta(a[i], x) ? i - 1 : i;
  }

  return {left, center, right};
}

function ascendingComparator(f) {
  return (d, x) => ascending(f(d), x);
}

function number$1(x) {
  return x === null ? NaN : +x;
}

const ascendingBisect = bisector(ascending);
const bisectRight = ascendingBisect.right;
bisector(number$1).center;

var e10 = Math.sqrt(50),
    e5 = Math.sqrt(10),
    e2 = Math.sqrt(2);

function ticks(start, stop, count) {
  var reverse,
      i = -1,
      n,
      ticks,
      step;

  stop = +stop, start = +start, count = +count;
  if (start === stop && count > 0) return [start];
  if (reverse = stop < start) n = start, start = stop, stop = n;
  if ((step = tickIncrement(start, stop, count)) === 0 || !isFinite(step)) return [];

  if (step > 0) {
    let r0 = Math.round(start / step), r1 = Math.round(stop / step);
    if (r0 * step < start) ++r0;
    if (r1 * step > stop) --r1;
    ticks = new Array(n = r1 - r0 + 1);
    while (++i < n) ticks[i] = (r0 + i) * step;
  } else {
    step = -step;
    let r0 = Math.round(start * step), r1 = Math.round(stop * step);
    if (r0 / step < start) ++r0;
    if (r1 / step > stop) --r1;
    ticks = new Array(n = r1 - r0 + 1);
    while (++i < n) ticks[i] = (r0 + i) / step;
  }

  if (reverse) ticks.reverse();

  return ticks;
}

function tickIncrement(start, stop, count) {
  var step = (stop - start) / Math.max(0, count),
      power = Math.floor(Math.log(step) / Math.LN10),
      error = step / Math.pow(10, power);
  return power >= 0
      ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power)
      : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
}

function tickStep(start, stop, count) {
  var step0 = Math.abs(stop - start) / Math.max(0, count),
      step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
      error = step0 / step1;
  if (error >= e10) step1 *= 10;
  else if (error >= e5) step1 *= 5;
  else if (error >= e2) step1 *= 2;
  return stop < start ? -step1 : step1;
}

function range(start, stop, step) {
  start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;

  var i = -1,
      n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
      range = new Array(n);

  while (++i < n) {
    range[i] = start + i * step;
  }

  return range;
}

function sum(values, valueof) {
  let sum = 0;
  if (valueof === undefined) {
    for (let value of values) {
      if (value = +value) {
        sum += value;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if (value = +valueof(value, ++index, values)) {
        sum += value;
      }
    }
  }
  return sum;
}

function initRange(domain, range) {
  switch (arguments.length) {
    case 0: break;
    case 1: this.range(domain); break;
    default: this.range(range).domain(domain); break;
  }
  return this;
}

const implicit = Symbol("implicit");

function ordinal() {
  var index = new Map(),
      domain = [],
      range = [],
      unknown = implicit;

  function scale(d) {
    var key = d + "", i = index.get(key);
    if (!i) {
      if (unknown !== implicit) return unknown;
      index.set(key, i = domain.push(d));
    }
    return range[(i - 1) % range.length];
  }

  scale.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [], index = new Map();
    for (const value of _) {
      const key = value + "";
      if (index.has(key)) continue;
      index.set(key, domain.push(value));
    }
    return scale;
  };

  scale.range = function(_) {
    return arguments.length ? (range = Array.from(_), scale) : range.slice();
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  scale.copy = function() {
    return ordinal(domain, range).unknown(unknown);
  };

  initRange.apply(scale, arguments);

  return scale;
}

function band() {
  var scale = ordinal().unknown(undefined),
      domain = scale.domain,
      ordinalRange = scale.range,
      r0 = 0,
      r1 = 1,
      step,
      bandwidth,
      round = false,
      paddingInner = 0,
      paddingOuter = 0,
      align = 0.5;

  delete scale.unknown;

  function rescale() {
    var n = domain().length,
        reverse = r1 < r0,
        start = reverse ? r1 : r0,
        stop = reverse ? r0 : r1;
    step = (stop - start) / Math.max(1, n - paddingInner + paddingOuter * 2);
    if (round) step = Math.floor(step);
    start += (stop - start - step * (n - paddingInner)) * align;
    bandwidth = step * (1 - paddingInner);
    if (round) start = Math.round(start), bandwidth = Math.round(bandwidth);
    var values = range(n).map(function(i) { return start + step * i; });
    return ordinalRange(reverse ? values.reverse() : values);
  }

  scale.domain = function(_) {
    return arguments.length ? (domain(_), rescale()) : domain();
  };

  scale.range = function(_) {
    return arguments.length ? ([r0, r1] = _, r0 = +r0, r1 = +r1, rescale()) : [r0, r1];
  };

  scale.rangeRound = function(_) {
    return [r0, r1] = _, r0 = +r0, r1 = +r1, round = true, rescale();
  };

  scale.bandwidth = function() {
    return bandwidth;
  };

  scale.step = function() {
    return step;
  };

  scale.round = function(_) {
    return arguments.length ? (round = !!_, rescale()) : round;
  };

  scale.padding = function(_) {
    return arguments.length ? (paddingInner = Math.min(1, paddingOuter = +_), rescale()) : paddingInner;
  };

  scale.paddingInner = function(_) {
    return arguments.length ? (paddingInner = Math.min(1, _), rescale()) : paddingInner;
  };

  scale.paddingOuter = function(_) {
    return arguments.length ? (paddingOuter = +_, rescale()) : paddingOuter;
  };

  scale.align = function(_) {
    return arguments.length ? (align = Math.max(0, Math.min(1, _)), rescale()) : align;
  };

  scale.copy = function() {
    return band(domain(), [r0, r1])
        .round(round)
        .paddingInner(paddingInner)
        .paddingOuter(paddingOuter)
        .align(align);
  };

  return initRange.apply(rescale(), arguments);
}

function define(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}

function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}

function Color() {}

var darker = 0.7;
var brighter = 1 / darker;

var reI = "\\s*([+-]?\\d+)\\s*",
    reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    reHex = /^#([0-9a-f]{3,8})$/,
    reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"),
    reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"),
    reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"),
    reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"),
    reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"),
    reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");

var named = {
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  black: 0x000000,
  blanchedalmond: 0xffebcd,
  blue: 0x0000ff,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  cyan: 0x00ffff,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgreen: 0x006400,
  darkgrey: 0xa9a9a9,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  gold: 0xffd700,
  goldenrod: 0xdaa520,
  gray: 0x808080,
  green: 0x008000,
  greenyellow: 0xadff2f,
  grey: 0x808080,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavender: 0xe6e6fa,
  lavenderblush: 0xfff0f5,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightgrey: 0xd3d3d3,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  magenta: 0xff00ff,
  maroon: 0x800000,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  navy: 0x000080,
  oldlace: 0xfdf5e6,
  olive: 0x808000,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  purple: 0x800080,
  rebeccapurple: 0x663399,
  red: 0xff0000,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  silver: 0xc0c0c0,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  teal: 0x008080,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  white: 0xffffff,
  whitesmoke: 0xf5f5f5,
  yellow: 0xffff00,
  yellowgreen: 0x9acd32
};

define(Color, color, {
  copy: function(channels) {
    return Object.assign(new this.constructor, this, channels);
  },
  displayable: function() {
    return this.rgb().displayable();
  },
  hex: color_formatHex, // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});

function color_formatHex() {
  return this.rgb().formatHex();
}

function color_formatHsl() {
  return hslConvert(this).formatHsl();
}

function color_formatRgb() {
  return this.rgb().formatRgb();
}

function color(format) {
  var m, l;
  format = (format + "").trim().toLowerCase();
  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
      : l === 3 ? new Rgb((m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00
      : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
      : l === 4 ? rgba((m >> 12 & 0xf) | (m >> 8 & 0xf0), (m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000
      : null) // invalid hex
      : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
      : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
      : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
      : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
      : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
      : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
      : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
      : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
      : null;
}

function rgbn(n) {
  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}

function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}

function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb;
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}

function rgb$1(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}

function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}

define(Rgb, rgb$1, extend(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb: function() {
    return this;
  },
  displayable: function() {
    return (-0.5 <= this.r && this.r < 255.5)
        && (-0.5 <= this.g && this.g < 255.5)
        && (-0.5 <= this.b && this.b < 255.5)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex, // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));

function rgb_formatHex() {
  return "#" + hex(this.r) + hex(this.g) + hex(this.b);
}

function rgb_formatRgb() {
  var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
  return (a === 1 ? "rgb(" : "rgba(")
      + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", "
      + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", "
      + Math.max(0, Math.min(255, Math.round(this.b) || 0))
      + (a === 1 ? ")" : ", " + a + ")");
}

function hex(value) {
  value = Math.max(0, Math.min(255, Math.round(value) || 0));
  return (value < 16 ? "0" : "") + value.toString(16);
}

function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;
  else if (l <= 0 || l >= 1) h = s = NaN;
  else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}

function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl;
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      h = NaN,
      s = max - min,
      l = (max + min) / 2;
  if (s) {
    if (r === max) h = (g - b) / s + (g < b) * 6;
    else if (g === max) h = (b - r) / s + 2;
    else h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}

function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}

function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

define(Hsl, hsl, extend(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h = this.h % 360 + (this.h < 0) * 360,
        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
        l = this.l,
        m2 = l + (l < 0.5 ? l : 1 - l) * s,
        m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  displayable: function() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
        && (0 <= this.l && this.l <= 1)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl: function() {
    var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "hsl(" : "hsla(")
        + (this.h || 0) + ", "
        + (this.s || 0) * 100 + "%, "
        + (this.l || 0) * 100 + "%"
        + (a === 1 ? ")" : ", " + a + ")");
  }
}));

/* From FvD 13.37, CSS Color Module Level 3 */
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60
      : h < 180 ? m2
      : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
      : m1) * 255;
}

var constant = x => () => x;

function linear$1(a, d) {
  return function(t) {
    return a + t * d;
  };
}

function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
    return Math.pow(a + t * b, y);
  };
}

function gamma(y) {
  return (y = +y) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y) : constant(isNaN(a) ? b : a);
  };
}

function nogamma(a, b) {
  var d = b - a;
  return d ? linear$1(a, d) : constant(isNaN(a) ? b : a);
}

var rgb = (function rgbGamma(y) {
  var color = gamma(y);

  function rgb(start, end) {
    var r = color((start = rgb$1(start)).r, (end = rgb$1(end)).r),
        g = color(start.g, end.g),
        b = color(start.b, end.b),
        opacity = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }

  rgb.gamma = rgbGamma;

  return rgb;
})(1);

function numberArray(a, b) {
  if (!b) b = [];
  var n = a ? Math.min(b.length, a.length) : 0,
      c = b.slice(),
      i;
  return function(t) {
    for (i = 0; i < n; ++i) c[i] = a[i] * (1 - t) + b[i] * t;
    return c;
  };
}

function isNumberArray(x) {
  return ArrayBuffer.isView(x) && !(x instanceof DataView);
}

function genericArray(a, b) {
  var nb = b ? b.length : 0,
      na = a ? Math.min(nb, a.length) : 0,
      x = new Array(na),
      c = new Array(nb),
      i;

  for (i = 0; i < na; ++i) x[i] = interpolate(a[i], b[i]);
  for (; i < nb; ++i) c[i] = b[i];

  return function(t) {
    for (i = 0; i < na; ++i) c[i] = x[i](t);
    return c;
  };
}

function date(a, b) {
  var d = new Date;
  return a = +a, b = +b, function(t) {
    return d.setTime(a * (1 - t) + b * t), d;
  };
}

function interpolateNumber(a, b) {
  return a = +a, b = +b, function(t) {
    return a * (1 - t) + b * t;
  };
}

function object(a, b) {
  var i = {},
      c = {},
      k;

  if (a === null || typeof a !== "object") a = {};
  if (b === null || typeof b !== "object") b = {};

  for (k in b) {
    if (k in a) {
      i[k] = interpolate(a[k], b[k]);
    } else {
      c[k] = b[k];
    }
  }

  return function(t) {
    for (k in i) c[k] = i[k](t);
    return c;
  };
}

var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    reB = new RegExp(reA.source, "g");

function zero(b) {
  return function() {
    return b;
  };
}

function one(b) {
  return function(t) {
    return b(t) + "";
  };
}

function string(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
      am, // current match in a
      bm, // current match in b
      bs, // string preceding current number in b, if any
      i = -1, // index in s
      s = [], // string constants and placeholders
      q = []; // number interpolators

  // Coerce inputs to strings.
  a = a + "", b = b + "";

  // Interpolate pairs of numbers in a & b.
  while ((am = reA.exec(a))
      && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) { // a string precedes the next number in b
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
      if (s[i]) s[i] += bm; // coalesce with previous string
      else s[++i] = bm;
    } else { // interpolate non-matching numbers
      s[++i] = null;
      q.push({i: i, x: interpolateNumber(am, bm)});
    }
    bi = reB.lastIndex;
  }

  // Add remains of b.
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs; // coalesce with previous string
    else s[++i] = bs;
  }

  // Special optimization for only a single match.
  // Otherwise, interpolate each of the numbers and rejoin the string.
  return s.length < 2 ? (q[0]
      ? one(q[0].x)
      : zero(b))
      : (b = q.length, function(t) {
          for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
          return s.join("");
        });
}

function interpolate(a, b) {
  var t = typeof b, c;
  return b == null || t === "boolean" ? constant(b)
      : (t === "number" ? interpolateNumber
      : t === "string" ? ((c = color(b)) ? (b = c, rgb) : string)
      : b instanceof color ? rgb
      : b instanceof Date ? date
      : isNumberArray(b) ? numberArray
      : Array.isArray(b) ? genericArray
      : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object
      : interpolateNumber)(a, b);
}

function interpolateRound(a, b) {
  return a = +a, b = +b, function(t) {
    return Math.round(a * (1 - t) + b * t);
  };
}

function constants(x) {
  return function() {
    return x;
  };
}

function number(x) {
  return +x;
}

var unit = [0, 1];

function identity$2(x) {
  return x;
}

function normalize(a, b) {
  return (b -= (a = +a))
      ? function(x) { return (x - a) / b; }
      : constants(isNaN(b) ? NaN : 0.5);
}

function clamper(a, b) {
  var t;
  if (a > b) t = a, a = b, b = t;
  return function(x) { return Math.max(a, Math.min(b, x)); };
}

// normalize(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
// interpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding range value x in [a,b].
function bimap(domain, range, interpolate) {
  var d0 = domain[0], d1 = domain[1], r0 = range[0], r1 = range[1];
  if (d1 < d0) d0 = normalize(d1, d0), r0 = interpolate(r1, r0);
  else d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
  return function(x) { return r0(d0(x)); };
}

function polymap(domain, range, interpolate) {
  var j = Math.min(domain.length, range.length) - 1,
      d = new Array(j),
      r = new Array(j),
      i = -1;

  // Reverse descending domains.
  if (domain[j] < domain[0]) {
    domain = domain.slice().reverse();
    range = range.slice().reverse();
  }

  while (++i < j) {
    d[i] = normalize(domain[i], domain[i + 1]);
    r[i] = interpolate(range[i], range[i + 1]);
  }

  return function(x) {
    var i = bisectRight(domain, x, 1, j) - 1;
    return r[i](d[i](x));
  };
}

function copy(source, target) {
  return target
      .domain(source.domain())
      .range(source.range())
      .interpolate(source.interpolate())
      .clamp(source.clamp())
      .unknown(source.unknown());
}

function transformer() {
  var domain = unit,
      range = unit,
      interpolate$1 = interpolate,
      transform,
      untransform,
      unknown,
      clamp = identity$2,
      piecewise,
      output,
      input;

  function rescale() {
    var n = Math.min(domain.length, range.length);
    if (clamp !== identity$2) clamp = clamper(domain[0], domain[n - 1]);
    piecewise = n > 2 ? polymap : bimap;
    output = input = null;
    return scale;
  }

  function scale(x) {
    return x == null || isNaN(x = +x) ? unknown : (output || (output = piecewise(domain.map(transform), range, interpolate$1)))(transform(clamp(x)));
  }

  scale.invert = function(y) {
    return clamp(untransform((input || (input = piecewise(range, domain.map(transform), interpolateNumber)))(y)));
  };

  scale.domain = function(_) {
    return arguments.length ? (domain = Array.from(_, number), rescale()) : domain.slice();
  };

  scale.range = function(_) {
    return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
  };

  scale.rangeRound = function(_) {
    return range = Array.from(_), interpolate$1 = interpolateRound, rescale();
  };

  scale.clamp = function(_) {
    return arguments.length ? (clamp = _ ? true : identity$2, rescale()) : clamp !== identity$2;
  };

  scale.interpolate = function(_) {
    return arguments.length ? (interpolate$1 = _, rescale()) : interpolate$1;
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  return function(t, u) {
    transform = t, untransform = u;
    return rescale();
  };
}

function continuous() {
  return transformer()(identity$2, identity$2);
}

function formatDecimal(x) {
  return Math.abs(x = Math.round(x)) >= 1e21
      ? x.toLocaleString("en").replace(/,/g, "")
      : x.toString(10);
}

// Computes the decimal coefficient and exponent of the specified number x with
// significant digits p, where x is positive and p is in [1, 21] or undefined.
// For example, formatDecimalParts(1.23) returns ["123", 0].
function formatDecimalParts(x, p) {
  if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
  var i, coefficient = x.slice(0, i);

  // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
  // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
  return [
    coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
    +x.slice(i + 1)
  ];
}

function exponent(x) {
  return x = formatDecimalParts(Math.abs(x)), x ? x[1] : NaN;
}

function formatGroup(grouping, thousands) {
  return function(value, width) {
    var i = value.length,
        t = [],
        j = 0,
        g = grouping[0],
        length = 0;

    while (i > 0 && g > 0) {
      if (length + g + 1 > width) g = Math.max(1, width - length);
      t.push(value.substring(i -= g, i + g));
      if ((length += g + 1) > width) break;
      g = grouping[j = (j + 1) % grouping.length];
    }

    return t.reverse().join(thousands);
  };
}

function formatNumerals(numerals) {
  return function(value) {
    return value.replace(/[0-9]/g, function(i) {
      return numerals[+i];
    });
  };
}

// [[fill]align][sign][symbol][0][width][,][.precision][~][type]
var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

function formatSpecifier(specifier) {
  if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
  var match;
  return new FormatSpecifier({
    fill: match[1],
    align: match[2],
    sign: match[3],
    symbol: match[4],
    zero: match[5],
    width: match[6],
    comma: match[7],
    precision: match[8] && match[8].slice(1),
    trim: match[9],
    type: match[10]
  });
}

formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof

function FormatSpecifier(specifier) {
  this.fill = specifier.fill === undefined ? " " : specifier.fill + "";
  this.align = specifier.align === undefined ? ">" : specifier.align + "";
  this.sign = specifier.sign === undefined ? "-" : specifier.sign + "";
  this.symbol = specifier.symbol === undefined ? "" : specifier.symbol + "";
  this.zero = !!specifier.zero;
  this.width = specifier.width === undefined ? undefined : +specifier.width;
  this.comma = !!specifier.comma;
  this.precision = specifier.precision === undefined ? undefined : +specifier.precision;
  this.trim = !!specifier.trim;
  this.type = specifier.type === undefined ? "" : specifier.type + "";
}

FormatSpecifier.prototype.toString = function() {
  return this.fill
      + this.align
      + this.sign
      + this.symbol
      + (this.zero ? "0" : "")
      + (this.width === undefined ? "" : Math.max(1, this.width | 0))
      + (this.comma ? "," : "")
      + (this.precision === undefined ? "" : "." + Math.max(0, this.precision | 0))
      + (this.trim ? "~" : "")
      + this.type;
};

// Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.
function formatTrim(s) {
  out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
    switch (s[i]) {
      case ".": i0 = i1 = i; break;
      case "0": if (i0 === 0) i0 = i; i1 = i; break;
      default: if (!+s[i]) break out; if (i0 > 0) i0 = 0; break;
    }
  }
  return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
}

var prefixExponent;

function formatPrefixAuto(x, p) {
  var d = formatDecimalParts(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
      exponent = d[1],
      i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
      n = coefficient.length;
  return i === n ? coefficient
      : i > n ? coefficient + new Array(i - n + 1).join("0")
      : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i)
      : "0." + new Array(1 - i).join("0") + formatDecimalParts(x, Math.max(0, p + i - 1))[0]; // less than 1y!
}

function formatRounded(x, p) {
  var d = formatDecimalParts(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
      exponent = d[1];
  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient
      : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1)
      : coefficient + new Array(exponent - coefficient.length + 2).join("0");
}

var formatTypes = {
  "%": (x, p) => (x * 100).toFixed(p),
  "b": (x) => Math.round(x).toString(2),
  "c": (x) => x + "",
  "d": formatDecimal,
  "e": (x, p) => x.toExponential(p),
  "f": (x, p) => x.toFixed(p),
  "g": (x, p) => x.toPrecision(p),
  "o": (x) => Math.round(x).toString(8),
  "p": (x, p) => formatRounded(x * 100, p),
  "r": formatRounded,
  "s": formatPrefixAuto,
  "X": (x) => Math.round(x).toString(16).toUpperCase(),
  "x": (x) => Math.round(x).toString(16)
};

function identity$1(x) {
  return x;
}

var map = Array.prototype.map,
    prefixes = ["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];

function formatLocale(locale) {
  var group = locale.grouping === undefined || locale.thousands === undefined ? identity$1 : formatGroup(map.call(locale.grouping, Number), locale.thousands + ""),
      currencyPrefix = locale.currency === undefined ? "" : locale.currency[0] + "",
      currencySuffix = locale.currency === undefined ? "" : locale.currency[1] + "",
      decimal = locale.decimal === undefined ? "." : locale.decimal + "",
      numerals = locale.numerals === undefined ? identity$1 : formatNumerals(map.call(locale.numerals, String)),
      percent = locale.percent === undefined ? "%" : locale.percent + "",
      minus = locale.minus === undefined ? "−" : locale.minus + "",
      nan = locale.nan === undefined ? "NaN" : locale.nan + "";

  function newFormat(specifier) {
    specifier = formatSpecifier(specifier);

    var fill = specifier.fill,
        align = specifier.align,
        sign = specifier.sign,
        symbol = specifier.symbol,
        zero = specifier.zero,
        width = specifier.width,
        comma = specifier.comma,
        precision = specifier.precision,
        trim = specifier.trim,
        type = specifier.type;

    // The "n" type is an alias for ",g".
    if (type === "n") comma = true, type = "g";

    // The "" type, and any invalid type, is an alias for ".12~g".
    else if (!formatTypes[type]) precision === undefined && (precision = 12), trim = true, type = "g";

    // If zero fill is specified, padding goes after sign and before digits.
    if (zero || (fill === "0" && align === "=")) zero = true, fill = "0", align = "=";

    // Compute the prefix and suffix.
    // For SI-prefix, the suffix is lazily computed.
    var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
        suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";

    // What format function should we use?
    // Is this an integer type?
    // Can this type generate exponential notation?
    var formatType = formatTypes[type],
        maybeSuffix = /[defgprs%]/.test(type);

    // Set the default precision if not specified,
    // or clamp the specified precision to the supported range.
    // For significant precision, it must be in [1, 21].
    // For fixed precision, it must be in [0, 20].
    precision = precision === undefined ? 6
        : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision))
        : Math.max(0, Math.min(20, precision));

    function format(value) {
      var valuePrefix = prefix,
          valueSuffix = suffix,
          i, n, c;

      if (type === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value;

        // Determine the sign. -0 is not less than 0, but 1 / -0 is!
        var valueNegative = value < 0 || 1 / value < 0;

        // Perform the initial formatting.
        value = isNaN(value) ? nan : formatType(Math.abs(value), precision);

        // Trim insignificant zeros.
        if (trim) value = formatTrim(value);

        // If a negative value rounds to zero after formatting, and no explicit positive sign is requested, hide the sign.
        if (valueNegative && +value === 0 && sign !== "+") valueNegative = false;

        // Compute the prefix and suffix.
        valuePrefix = (valueNegative ? (sign === "(" ? sign : minus) : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
        valueSuffix = (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");

        // Break the formatted value into the integer “value” part that can be
        // grouped, and fractional or exponential “suffix” part that is not.
        if (maybeSuffix) {
          i = -1, n = value.length;
          while (++i < n) {
            if (c = value.charCodeAt(i), 48 > c || c > 57) {
              valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
              value = value.slice(0, i);
              break;
            }
          }
        }
      }

      // If the fill character is not "0", grouping is applied before padding.
      if (comma && !zero) value = group(value, Infinity);

      // Compute the padding.
      var length = valuePrefix.length + value.length + valueSuffix.length,
          padding = length < width ? new Array(width - length + 1).join(fill) : "";

      // If the fill character is "0", grouping is applied after padding.
      if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";

      // Reconstruct the final output based on the desired alignment.
      switch (align) {
        case "<": value = valuePrefix + value + valueSuffix + padding; break;
        case "=": value = valuePrefix + padding + value + valueSuffix; break;
        case "^": value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length); break;
        default: value = padding + valuePrefix + value + valueSuffix; break;
      }

      return numerals(value);
    }

    format.toString = function() {
      return specifier + "";
    };

    return format;
  }

  function formatPrefix(specifier, value) {
    var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)),
        e = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3,
        k = Math.pow(10, -e),
        prefix = prefixes[8 + e / 3];
    return function(value) {
      return f(k * value) + prefix;
    };
  }

  return {
    format: newFormat,
    formatPrefix: formatPrefix
  };
}

var locale;
var format;
var formatPrefix;

defaultLocale({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});

function defaultLocale(definition) {
  locale = formatLocale(definition);
  format = locale.format;
  formatPrefix = locale.formatPrefix;
  return locale;
}

function precisionFixed(step) {
  return Math.max(0, -exponent(Math.abs(step)));
}

function precisionPrefix(step, value) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
}

function precisionRound(step, max) {
  step = Math.abs(step), max = Math.abs(max) - step;
  return Math.max(0, exponent(max) - exponent(step)) + 1;
}

function tickFormat(start, stop, count, specifier) {
  var step = tickStep(start, stop, count),
      precision;
  specifier = formatSpecifier(specifier == null ? ",f" : specifier);
  switch (specifier.type) {
    case "s": {
      var value = Math.max(Math.abs(start), Math.abs(stop));
      if (specifier.precision == null && !isNaN(precision = precisionPrefix(step, value))) specifier.precision = precision;
      return formatPrefix(specifier, value);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      if (specifier.precision == null && !isNaN(precision = precisionRound(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
      break;
    }
    case "f":
    case "%": {
      if (specifier.precision == null && !isNaN(precision = precisionFixed(step))) specifier.precision = precision - (specifier.type === "%") * 2;
      break;
    }
  }
  return format(specifier);
}

function linearish(scale) {
  var domain = scale.domain;

  scale.ticks = function(count) {
    var d = domain();
    return ticks(d[0], d[d.length - 1], count == null ? 10 : count);
  };

  scale.tickFormat = function(count, specifier) {
    var d = domain();
    return tickFormat(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
  };

  scale.nice = function(count) {
    if (count == null) count = 10;

    var d = domain();
    var i0 = 0;
    var i1 = d.length - 1;
    var start = d[i0];
    var stop = d[i1];
    var prestep;
    var step;
    var maxIter = 10;

    if (stop < start) {
      step = start, start = stop, stop = step;
      step = i0, i0 = i1, i1 = step;
    }
    
    while (maxIter-- > 0) {
      step = tickIncrement(start, stop, count);
      if (step === prestep) {
        d[i0] = start;
        d[i1] = stop;
        return domain(d);
      } else if (step > 0) {
        start = Math.floor(start / step) * step;
        stop = Math.ceil(stop / step) * step;
      } else if (step < 0) {
        start = Math.ceil(start * step) / step;
        stop = Math.floor(stop * step) / step;
      } else {
        break;
      }
      prestep = step;
    }

    return scale;
  };

  return scale;
}

function linear() {
  var scale = continuous();

  scale.copy = function() {
    return copy(scale, linear());
  };

  initRange.apply(scale, arguments);

  return linearish(scale);
}

function transformPow(exponent) {
  return function(x) {
    return x < 0 ? -Math.pow(-x, exponent) : Math.pow(x, exponent);
  };
}

function transformSqrt(x) {
  return x < 0 ? -Math.sqrt(-x) : Math.sqrt(x);
}

function transformSquare(x) {
  return x < 0 ? -x * x : x * x;
}

function powish(transform) {
  var scale = transform(identity$2, identity$2),
      exponent = 1;

  function rescale() {
    return exponent === 1 ? transform(identity$2, identity$2)
        : exponent === 0.5 ? transform(transformSqrt, transformSquare)
        : transform(transformPow(exponent), transformPow(1 / exponent));
  }

  scale.exponent = function(_) {
    return arguments.length ? (exponent = +_, rescale()) : exponent;
  };

  return linearish(scale);
}

function pow$1() {
  var scale = powish(transformer());

  scale.copy = function() {
    return copy(scale, pow$1()).exponent(scale.exponent());
  };

  initRange.apply(scale, arguments);

  return scale;
}

function sqrt() {
  return pow$1.apply(null, arguments).exponent(0.5);
}

var defaultScales = {
	x: linear,
	y: linear,
	z: linear,
	r: sqrt
};

/* --------------------------------------------
 *
 * Determine whether a scale is a log, symlog, power or other
 * This is not meant to be exhaustive of all the different types of
 * scales in d3-scale and focuses on continuous scales
 *
 * --------------------------------------------
 */
function findScaleType(scale) {
	if (scale.constant) {
		return 'symlog';
	}
	if (scale.base) {
		return 'log';
	}
	if (scale.exponent) {
		if (scale.exponent() === 0.5) {
			return 'sqrt';
		}
		return 'pow';
	}
	return 'other';
}

function identity (d) {
	return d;
}

function log(sign) {
	return x => Math.log(sign * x);
}

function exp(sign) {
	return x => sign * Math.exp(x);
}

function symlog(c) {
	return x => Math.sign(x) * Math.log1p(Math.abs(x / c));
}

function symexp(c) {
	return x => Math.sign(x) * Math.expm1(Math.abs(x)) * c;
}

function pow(exponent) {
	return function powFn(x) {
		return x < 0 ? -Math.pow(-x, exponent) : Math.pow(x, exponent);
	};
}

function getPadFunctions(scale) {
	const scaleType = findScaleType(scale);

	if (scaleType === 'log') {
		const sign = Math.sign(scale.domain()[0]);
		return { lift: log(sign), ground: exp(sign), scaleType };
	}
	if (scaleType === 'pow') {
		const exponent = 1;
		return { lift: pow(exponent), ground: pow(1 / exponent), scaleType };
	}
	if (scaleType === 'sqrt') {
		const exponent = 0.5;
		return { lift: pow(exponent), ground: pow(1 / exponent), scaleType };
	}
	if (scaleType === 'symlog') {
		const constant = 1;
		return { lift: symlog(constant), ground: symexp(constant), scaleType };
	}

	return { lift: identity, ground: identity, scaleType };
}

/* --------------------------------------------
 *
 * Returns a modified scale domain by in/decreasing
 * the min/max by taking the desired difference
 * in pixels and converting it to units of data.
 * Returns an array that you can set as the new domain.
 * Padding contributed by @veltman.
 * See here for discussion of transforms: https://github.com/d3/d3-scale/issues/150
 *
 * --------------------------------------------
 */

function padScale (scale, padding) {
	if (typeof scale.range !== 'function') {
		throw new Error('Scale method `range` must be a function');
	}
	if (typeof scale.domain !== 'function') {
		throw new Error('Scale method `domain` must be a function');
	}
	if (!Array.isArray(padding)) {
		return scale.domain();
	}

	if (scale.domain().length !== 2) {
		console.warn('[LayerCake] The scale is expected to have a domain of length 2 to use padding. Are you sure you want to use padding? Your scale\'s domain is:', scale.domain());
	}
	if (scale.range().length !== 2) {
		console.warn('[LayerCake] The scale is expected to have a range of length 2 to use padding. Are you sure you want to use padding? Your scale\'s range is:', scale.range());
	}

	const { lift, ground } = getPadFunctions(scale);

	const d0 = scale.domain()[0];

	const isTime = Object.prototype.toString.call(d0) === '[object Date]';

	const [d1, d2] = scale.domain().map(d => {
		return isTime ? lift(d.getTime()) : lift(d);
	});
	const [r1, r2] = scale.range();
	const paddingLeft = padding[0] || 0;
	const paddingRight = padding[1] || 0;

	const step = (d2 - d1) / (Math.abs(r2 - r1) - paddingLeft - paddingRight); // Math.abs() to properly handle reversed scales

	return [d1 - paddingLeft * step, paddingRight * step + d2].map(d => {
		return isTime ? ground(new Date(d)) : ground(d);
	});
}

/* eslint-disable no-nested-ternary */
function calcBaseRange(s, width, height, reverse, percentRange) {
	let min;
	let max;
	if (percentRange === true) {
		min = 0;
		max = 100;
	} else {
		min = s === 'r' ? 1 : 0;
		max = s === 'y' ? height : s === 'r' ? 25 : width;
	}
	return reverse === true ? [max, min] : [min, max];
}

function getDefaultRange(s, width, height, reverse, range, percentRange) {
	return !range
		? calcBaseRange(s, width, height, reverse, percentRange)
		: typeof range === 'function'
			? range({ width, height })
			: range;
}

function createScale (s) {
	return function scaleCreator ([$scale, $extents, $domain, $padding, $nice, $reverse, $width, $height, $range, $percentScale]) {
		if ($extents === null) {
			return null;
		}

		const defaultRange = getDefaultRange(s, $width, $height, $reverse, $range, $percentScale);

		const scale = $scale === defaultScales[s] ? $scale() : $scale.copy();

		/* --------------------------------------------
		 * On creation, `$domain` will already have any nulls filled in
		 * But if we set it via the context it might not, so rerun it through partialDomain
		 */
		scale
			.domain(partialDomain($extents[s], $domain))
			.range(defaultRange);

		if ($padding) {
			scale.domain(padScale(scale, $padding));
		}

		if ($nice === true) {
			if (typeof scale.nice === 'function') {
				scale.nice();
			} else {
				console.error(`[Layer Cake] You set \`${s}Nice: true\` but the ${s}Scale does not have a \`.nice\` method. Ignoring...`);
			}
		}

		return scale;
	};
}

function createGetter ([$acc, $scale]) {
	return d => {
		const val = $acc(d);
		if (Array.isArray(val)) {
			return val.map(v => $scale(v));
		}
		return $scale(val);
	};
}

function getRange([$scale]) {
	if (typeof $scale === 'function') {
		if (typeof $scale.range === 'function') {
			return $scale.range();
		}
		console.error('[LayerCake] Your scale doesn\'t have a `.range` method?');
	}
	return null;
}

var defaultReverses = {
	x: false,
	y: true,
	z: false,
	r: false
};

/* node_modules/layercake/src/LayerCake.svelte generated by Svelte v3.38.2 */

const css$6 = {
	code: ".layercake-container.svelte-vhzpsp,.layercake-container.svelte-vhzpsp *{box-sizing:border-box}.layercake-container.svelte-vhzpsp{width:100%;height:100%}",
	map: "{\"version\":3,\"file\":\"LayerCake.svelte\",\"sources\":[\"LayerCake.svelte\"],\"sourcesContent\":[\"<script>\\n\\timport { setContext } from 'svelte';\\n\\timport { writable, derived } from 'svelte/store';\\n\\n\\timport makeAccessor from './utils/makeAccessor.js';\\n\\timport filterObject from './utils/filterObject.js';\\n\\timport calcExtents from './lib/calcExtents.js';\\n\\timport calcDomain from './helpers/calcDomain.js';\\n\\timport createScale from './helpers/createScale.js';\\n\\timport createGetter from './helpers/createGetter.js';\\n\\timport getRange from './helpers/getRange.js';\\n\\timport defaultScales from './settings/defaultScales.js';\\n\\timport defaultReverses from './settings/defaultReverses.js';\\n\\n\\texport let ssr = false;\\n\\texport let pointerEvents = true;\\n\\texport let position = 'relative';\\n\\texport let percentRange = false;\\n\\n\\texport let width = undefined;\\n\\texport let height = undefined;\\n\\n\\texport let containerWidth = width || 100;\\n\\texport let containerHeight = height || 100;\\n\\n\\texport let element = undefined;\\n\\n\\t/* --------------------------------------------\\n\\t * Parameters\\n\\t * Values that computed properties are based on and that\\n\\t * can be easily extended from config values\\n\\t *\\n\\t */\\n\\texport let x = undefined;\\n\\texport let y = undefined;\\n\\texport let z = undefined;\\n\\texport let r = undefined;\\n\\texport let custom = {};\\n\\texport let data = [];\\n\\texport let xDomain = undefined;\\n\\texport let yDomain = undefined;\\n\\texport let zDomain = undefined;\\n\\texport let rDomain = undefined;\\n\\texport let xNice = false;\\n\\texport let yNice = false;\\n\\texport let zNice = false;\\n\\texport let rNice = false;\\n\\texport let xReverse = defaultReverses.x;\\n\\texport let yReverse = defaultReverses.y;\\n\\texport let zReverse = defaultReverses.z;\\n\\texport let rReverse = defaultReverses.r;\\n\\texport let xPadding = undefined;\\n\\texport let yPadding = undefined;\\n\\texport let zPadding = undefined;\\n\\texport let rPadding = undefined;\\n\\texport let xScale = defaultScales.x;\\n\\texport let yScale = defaultScales.y;\\n\\texport let zScale = defaultScales.y;\\n\\texport let rScale = defaultScales.r;\\n\\texport let xRange = undefined;\\n\\texport let yRange = undefined;\\n\\texport let zRange = undefined;\\n\\texport let rRange = undefined;\\n\\texport let padding = {};\\n\\texport let extents = {};\\n\\texport let flatData = undefined;\\n\\n\\t/* --------------------------------------------\\n\\t * Preserve a copy of our passed in settings before we modify them\\n\\t * Return this to the user's context so they can reference things if need be\\n\\t * Add the active keys since those aren't on our settings object.\\n\\t * This is mostly an escape-hatch\\n\\t */\\n\\tconst config = {};\\n\\t$: if (x) config.x = x;\\n\\t$: if (y) config.y = y;\\n\\t$: if (z) config.z = z;\\n\\t$: if (r) config.r = r;\\n\\t$: if (xDomain) config.xDomain = xDomain;\\n\\t$: if (yDomain) config.yDomain = yDomain;\\n\\t$: if (zDomain) config.zDomain = zDomain;\\n\\t$: if (rDomain) config.rDomain = rDomain;\\n\\t$: if (xRange) config.xRange = xRange;\\n\\t$: if (yRange) config.yRange = yRange;\\n\\t$: if (zRange) config.zRange = zRange;\\n\\t$: if (rRange) config.rRange = rRange;\\n\\n\\t/* --------------------------------------------\\n\\t * Make store versions of each parameter\\n\\t * Prefix these with `_` to keep things organized\\n\\t */\\n\\tconst _percentRange = writable();\\n\\tconst _containerWidth = writable();\\n\\tconst _containerHeight = writable();\\n\\tconst _x = writable();\\n\\tconst _y = writable();\\n\\tconst _z = writable();\\n\\tconst _r = writable();\\n\\tconst _custom = writable();\\n\\tconst _data = writable();\\n\\tconst _xDomain = writable();\\n\\tconst _yDomain = writable();\\n\\tconst _zDomain = writable();\\n\\tconst _rDomain = writable();\\n\\tconst _xNice = writable();\\n\\tconst _yNice = writable();\\n\\tconst _zNice = writable();\\n\\tconst _rNice = writable();\\n\\tconst _xReverse = writable();\\n\\tconst _yReverse = writable();\\n\\tconst _zReverse = writable();\\n\\tconst _rReverse = writable();\\n\\tconst _xPadding = writable();\\n\\tconst _yPadding = writable();\\n\\tconst _zPadding = writable();\\n\\tconst _rPadding = writable();\\n\\tconst _xScale = writable();\\n\\tconst _yScale = writable();\\n\\tconst _zScale = writable();\\n\\tconst _rScale = writable();\\n\\tconst _xRange = writable();\\n\\tconst _yRange = writable();\\n\\tconst _zRange = writable();\\n\\tconst _rRange = writable();\\n\\tconst _padding = writable();\\n\\tconst _flatData = writable();\\n\\tconst _extents = writable();\\n\\tconst _config = writable(config);\\n\\n\\t$: _percentRange.set(percentRange);\\n\\t$: _containerWidth.set(containerWidth);\\n\\t$: _containerHeight.set(containerHeight);\\n\\t$: _x.set(makeAccessor(x));\\n\\t$: _y.set(makeAccessor(y));\\n\\t$: _z.set(makeAccessor(z));\\n\\t$: _r.set(makeAccessor(r));\\n\\t$: _xDomain.set(xDomain);\\n\\t$: _yDomain.set(yDomain);\\n\\t$: _zDomain.set(zDomain);\\n\\t$: _rDomain.set(rDomain);\\n\\t$: _custom.set(custom);\\n\\t$: _data.set(data);\\n\\t$: _xNice.set(xNice);\\n\\t$: _yNice.set(yNice);\\n\\t$: _zNice.set(zNice);\\n\\t$: _rNice.set(rNice);\\n\\t$: _xReverse.set(xReverse);\\n\\t$: _yReverse.set(yReverse);\\n\\t$: _zReverse.set(zReverse);\\n\\t$: _rReverse.set(rReverse);\\n\\t$: _xPadding.set(xPadding);\\n\\t$: _yPadding.set(yPadding);\\n\\t$: _zPadding.set(zPadding);\\n\\t$: _rPadding.set(rPadding);\\n\\t$: _xScale.set(xScale);\\n\\t$: _yScale.set(yScale);\\n\\t$: _zScale.set(zScale);\\n\\t$: _rScale.set(rScale);\\n\\t$: _xRange.set(xRange);\\n\\t$: _yRange.set(yRange);\\n\\t$: _zRange.set(zRange);\\n\\t$: _rRange.set(rRange);\\n\\t$: _padding.set(padding);\\n\\t$: _extents.set(filterObject(extents));\\n\\t$: _flatData.set(flatData || data);\\n\\n\\t/* --------------------------------------------\\n\\t * Create derived values\\n\\t * Suffix these with `_d`\\n\\t */\\n\\tconst activeGetters_d = derived([_x, _y, _z, _r], ([$x, $y, $z, $r]) => {\\n\\t\\treturn [\\n\\t\\t\\t{ field: 'x', accessor: $x },\\n\\t\\t\\t{ field: 'y', accessor: $y },\\n\\t\\t\\t{ field: 'z', accessor: $z },\\n\\t\\t\\t{ field: 'r', accessor: $r }\\n\\t\\t].filter(d => d.accessor);\\n\\t});\\n\\n\\tconst padding_d = derived([_padding, _containerWidth, _containerHeight], ([$padding]) => {\\n\\t\\tconst defaultPadding = { top: 0, right: 0, bottom: 0, left: 0 };\\n\\t\\treturn Object.assign(defaultPadding, $padding);\\n\\t});\\n\\n\\tconst box_d = derived([_containerWidth, _containerHeight, padding_d], ([$containerWidth, $containerHeight, $padding]) => {\\n\\t\\tconst b = {};\\n\\t\\tb.top = $padding.top;\\n\\t\\tb.right = $containerWidth - $padding.right;\\n\\t\\tb.bottom = $containerHeight - $padding.bottom;\\n\\t\\tb.left = $padding.left;\\n\\t\\tb.width = b.right - b.left;\\n\\t\\tb.height = b.bottom - b.top;\\n\\t\\tif (b.width <= 0) {\\n\\t\\t\\tconsole.error('[LayerCake] Target div has zero or negative width. Did you forget to set an explicit width in CSS on the container?');\\n\\t\\t}\\n\\t\\tif (b.height <= 0) {\\n\\t\\t\\tconsole.error('[LayerCake] Target div has zero or negative height. Did you forget to set an explicit height in CSS on the container?');\\n\\t\\t}\\n\\t\\treturn b;\\n\\t});\\n\\n\\tconst width_d = derived([box_d], ([$box]) => {\\n\\t\\treturn $box.width;\\n\\t});\\n\\n\\tconst height_d = derived([box_d], ([$box]) => {\\n\\t\\treturn $box.height;\\n\\t});\\n\\n\\t/* --------------------------------------------\\n\\t * Calculate extents by taking the extent of the data\\n\\t * and filling that in with anything set by the user\\n\\t */\\n\\tconst extents_d = derived([_flatData, activeGetters_d, _extents], ([$flatData, $activeGetters, $extents]) => {\\n\\t\\treturn { ...calcExtents($flatData, $activeGetters.filter(d => !$extents[d.field])), ...$extents };\\n\\t});\\n\\n\\tconst xDomain_d = derived([extents_d, _xDomain], calcDomain('x'));\\n\\tconst yDomain_d = derived([extents_d, _yDomain], calcDomain('y'));\\n\\tconst zDomain_d = derived([extents_d, _zDomain], calcDomain('z'));\\n\\tconst rDomain_d = derived([extents_d, _rDomain], calcDomain('r'));\\n\\n\\tconst xScale_d = derived([_xScale, extents_d, xDomain_d, _xPadding, _xNice, _xReverse, width_d, height_d, _xRange, _percentRange], createScale('x'));\\n\\tconst xGet_d = derived([_x, xScale_d], createGetter);\\n\\n\\tconst yScale_d = derived([_yScale, extents_d, yDomain_d, _yPadding, _yNice, _yReverse, width_d, height_d, _yRange, _percentRange], createScale('y'));\\n\\tconst yGet_d = derived([_y, yScale_d], createGetter);\\n\\n\\tconst zScale_d = derived([_zScale, extents_d, zDomain_d, _zPadding, _zNice, _zReverse, width_d, height_d, _zRange, _percentRange], createScale('z'));\\n\\tconst zGet_d = derived([_z, zScale_d], createGetter);\\n\\n\\tconst rScale_d = derived([_rScale, extents_d, rDomain_d, _rPadding, _rNice, _rReverse, width_d, height_d, _rRange, _percentRange], createScale('r'));\\n\\tconst rGet_d = derived([_r, rScale_d], createGetter);\\n\\n\\tconst xRange_d = derived([xScale_d], getRange);\\n\\tconst yRange_d = derived([yScale_d], getRange);\\n\\tconst zRange_d = derived([zScale_d], getRange);\\n\\tconst rRange_d = derived([rScale_d], getRange);\\n\\n\\tconst aspectRatio_d = derived([width_d, height_d], ([$aspectRatio, $width, $height]) => {\\n\\t\\treturn $width / $height;\\n\\t});\\n\\n\\t$: context = {\\n\\t\\tactiveGetters: activeGetters_d,\\n\\t\\twidth: width_d,\\n\\t\\theight: height_d,\\n\\t\\tpercentRange: _percentRange,\\n\\t\\taspectRatio: aspectRatio_d,\\n\\t\\tcontainerWidth: _containerWidth,\\n\\t\\tcontainerHeight: _containerHeight,\\n\\t\\tx: _x,\\n\\t\\ty: _y,\\n\\t\\tz: _z,\\n\\t\\tr: _r,\\n\\t\\tcustom: _custom,\\n\\t\\tdata: _data,\\n\\t\\txNice: _xNice,\\n\\t\\tyNice: _yNice,\\n\\t\\tzNice: _zNice,\\n\\t\\trNice: _rNice,\\n\\t\\txReverse: _xReverse,\\n\\t\\tyReverse: _yReverse,\\n\\t\\tzReverse: _zReverse,\\n\\t\\trReverse: _rReverse,\\n\\t\\txPadding: _xPadding,\\n\\t\\tyPadding: _yPadding,\\n\\t\\tzPadding: _zPadding,\\n\\t\\trPadding: _rPadding,\\n\\t\\tpadding: padding_d,\\n\\t\\tflatData: _flatData,\\n\\t\\textents: extents_d,\\n\\t\\txDomain: xDomain_d,\\n\\t\\tyDomain: yDomain_d,\\n\\t\\tzDomain: zDomain_d,\\n\\t\\trDomain: rDomain_d,\\n\\t\\txRange: xRange_d,\\n\\t\\tyRange: yRange_d,\\n\\t\\tzRange: zRange_d,\\n\\t\\trRange: rRange_d,\\n\\t\\tconfig: _config,\\n\\t\\txScale: xScale_d,\\n\\t\\txGet: xGet_d,\\n\\t\\tyScale: yScale_d,\\n\\t\\tyGet: yGet_d,\\n\\t\\tzScale: zScale_d,\\n\\t\\tzGet: zGet_d,\\n\\t\\trScale: rScale_d,\\n\\t\\trGet: rGet_d\\n\\t};\\n\\n\\t$: setContext('LayerCake', context);\\n</script>\\n\\n{#if (ssr === true || typeof window !== 'undefined')}\\n\\t<div\\n\\t\\tbind:this={element}\\n\\t\\tclass=\\\"layercake-container\\\"\\n\\t\\tstyle=\\\"\\n\\t\\t\\tposition:{position};\\n\\t\\t\\t{position === 'absolute' ? 'top:0;right:0;bottom:0;left:0;' : ''}\\n\\t\\t\\t{pointerEvents === false ? 'pointer-events:none;' : ''}\\n\\t\\t\\\"\\n\\t\\tbind:clientWidth={containerWidth}\\n\\t\\tbind:clientHeight={containerHeight}\\n\\t>\\n\\t\\t<slot\\n\\t\\t\\t{element}\\n\\t\\t\\twidth={$width_d}\\n\\t\\t\\theight={$height_d}\\n\\t\\t\\taspectRatio={$aspectRatio_d}\\n\\t\\t\\tcontainerWidth={$_containerWidth}\\n\\t\\t\\tcontainerHeight={$_containerHeight}\\n\\t\\t></slot>\\n\\t</div>\\n{/if}\\n\\n<style>\\n\\t.layercake-container,\\n\\t.layercake-container :global(*) {\\n\\t\\tbox-sizing: border-box;\\n\\t}\\n\\t.layercake-container {\\n\\t\\twidth: 100%;\\n\\t\\theight: 100%;\\n\\t}\\n</style>\\n\"],\"names\":[],\"mappings\":\"AA8TC,kCAAoB,CACpB,kCAAoB,CAAC,AAAQ,CAAC,AAAE,CAAC,AAChC,UAAU,CAAE,UAAU,AACvB,CAAC,AACD,oBAAoB,cAAC,CAAC,AACrB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,AACb,CAAC\"}"
};

const LayerCake = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let context;
	let $width_d, $$unsubscribe_width_d;
	let $height_d, $$unsubscribe_height_d;
	let $aspectRatio_d, $$unsubscribe_aspectRatio_d;
	let $_containerWidth, $$unsubscribe__containerWidth;
	let $_containerHeight, $$unsubscribe__containerHeight;
	let { ssr = false } = $$props;
	let { pointerEvents = true } = $$props;
	let { position = "relative" } = $$props;
	let { percentRange = false } = $$props;
	let { width = undefined } = $$props;
	let { height = undefined } = $$props;
	let { containerWidth = width || 100 } = $$props;
	let { containerHeight = height || 100 } = $$props;
	let { element = undefined } = $$props;
	let { x = undefined } = $$props;
	let { y = undefined } = $$props;
	let { z = undefined } = $$props;
	let { r = undefined } = $$props;
	let { custom = {} } = $$props;
	let { data = [] } = $$props;
	let { xDomain = undefined } = $$props;
	let { yDomain = undefined } = $$props;
	let { zDomain = undefined } = $$props;
	let { rDomain = undefined } = $$props;
	let { xNice = false } = $$props;
	let { yNice = false } = $$props;
	let { zNice = false } = $$props;
	let { rNice = false } = $$props;
	let { xReverse = defaultReverses.x } = $$props;
	let { yReverse = defaultReverses.y } = $$props;
	let { zReverse = defaultReverses.z } = $$props;
	let { rReverse = defaultReverses.r } = $$props;
	let { xPadding = undefined } = $$props;
	let { yPadding = undefined } = $$props;
	let { zPadding = undefined } = $$props;
	let { rPadding = undefined } = $$props;
	let { xScale = defaultScales.x } = $$props;
	let { yScale = defaultScales.y } = $$props;
	let { zScale = defaultScales.y } = $$props;
	let { rScale = defaultScales.r } = $$props;
	let { xRange = undefined } = $$props;
	let { yRange = undefined } = $$props;
	let { zRange = undefined } = $$props;
	let { rRange = undefined } = $$props;
	let { padding = {} } = $$props;
	let { extents = {} } = $$props;
	let { flatData = undefined } = $$props;

	/* --------------------------------------------
 * Preserve a copy of our passed in settings before we modify them
 * Return this to the user's context so they can reference things if need be
 * Add the active keys since those aren't on our settings object.
 * This is mostly an escape-hatch
 */
	const config = {};

	/* --------------------------------------------
 * Make store versions of each parameter
 * Prefix these with `_` to keep things organized
 */
	const _percentRange = writable();

	const _containerWidth = writable();
	$$unsubscribe__containerWidth = subscribe(_containerWidth, value => $_containerWidth = value);
	const _containerHeight = writable();
	$$unsubscribe__containerHeight = subscribe(_containerHeight, value => $_containerHeight = value);
	const _x = writable();
	const _y = writable();
	const _z = writable();
	const _r = writable();
	const _custom = writable();
	const _data = writable();
	const _xDomain = writable();
	const _yDomain = writable();
	const _zDomain = writable();
	const _rDomain = writable();
	const _xNice = writable();
	const _yNice = writable();
	const _zNice = writable();
	const _rNice = writable();
	const _xReverse = writable();
	const _yReverse = writable();
	const _zReverse = writable();
	const _rReverse = writable();
	const _xPadding = writable();
	const _yPadding = writable();
	const _zPadding = writable();
	const _rPadding = writable();
	const _xScale = writable();
	const _yScale = writable();
	const _zScale = writable();
	const _rScale = writable();
	const _xRange = writable();
	const _yRange = writable();
	const _zRange = writable();
	const _rRange = writable();
	const _padding = writable();
	const _flatData = writable();
	const _extents = writable();
	const _config = writable(config);

	/* --------------------------------------------
 * Create derived values
 * Suffix these with `_d`
 */
	const activeGetters_d = derived([_x, _y, _z, _r], ([$x, $y, $z, $r]) => {
		return [
			{ field: "x", accessor: $x },
			{ field: "y", accessor: $y },
			{ field: "z", accessor: $z },
			{ field: "r", accessor: $r }
		].filter(d => d.accessor);
	});

	const padding_d = derived([_padding, _containerWidth, _containerHeight], ([$padding]) => {
		const defaultPadding = { top: 0, right: 0, bottom: 0, left: 0 };
		return Object.assign(defaultPadding, $padding);
	});

	const box_d = derived([_containerWidth, _containerHeight, padding_d], ([$containerWidth, $containerHeight, $padding]) => {
		const b = {};
		b.top = $padding.top;
		b.right = $containerWidth - $padding.right;
		b.bottom = $containerHeight - $padding.bottom;
		b.left = $padding.left;
		b.width = b.right - b.left;
		b.height = b.bottom - b.top;

		if (b.width <= 0) {
			console.error("[LayerCake] Target div has zero or negative width. Did you forget to set an explicit width in CSS on the container?");
		}

		if (b.height <= 0) {
			console.error("[LayerCake] Target div has zero or negative height. Did you forget to set an explicit height in CSS on the container?");
		}

		return b;
	});

	const width_d = derived([box_d], ([$box]) => {
		return $box.width;
	});

	$$unsubscribe_width_d = subscribe(width_d, value => $width_d = value);

	const height_d = derived([box_d], ([$box]) => {
		return $box.height;
	});

	$$unsubscribe_height_d = subscribe(height_d, value => $height_d = value);

	/* --------------------------------------------
 * Calculate extents by taking the extent of the data
 * and filling that in with anything set by the user
 */
	const extents_d = derived([_flatData, activeGetters_d, _extents], ([$flatData, $activeGetters, $extents]) => {
		return {
			...calcExtents($flatData, $activeGetters.filter(d => !$extents[d.field])),
			...$extents
		};
	});

	const xDomain_d = derived([extents_d, _xDomain], calcDomain("x"));
	const yDomain_d = derived([extents_d, _yDomain], calcDomain("y"));
	const zDomain_d = derived([extents_d, _zDomain], calcDomain("z"));
	const rDomain_d = derived([extents_d, _rDomain], calcDomain("r"));

	const xScale_d = derived(
		[
			_xScale,
			extents_d,
			xDomain_d,
			_xPadding,
			_xNice,
			_xReverse,
			width_d,
			height_d,
			_xRange,
			_percentRange
		],
		createScale("x")
	);

	const xGet_d = derived([_x, xScale_d], createGetter);

	const yScale_d = derived(
		[
			_yScale,
			extents_d,
			yDomain_d,
			_yPadding,
			_yNice,
			_yReverse,
			width_d,
			height_d,
			_yRange,
			_percentRange
		],
		createScale("y")
	);

	const yGet_d = derived([_y, yScale_d], createGetter);

	const zScale_d = derived(
		[
			_zScale,
			extents_d,
			zDomain_d,
			_zPadding,
			_zNice,
			_zReverse,
			width_d,
			height_d,
			_zRange,
			_percentRange
		],
		createScale("z")
	);

	const zGet_d = derived([_z, zScale_d], createGetter);

	const rScale_d = derived(
		[
			_rScale,
			extents_d,
			rDomain_d,
			_rPadding,
			_rNice,
			_rReverse,
			width_d,
			height_d,
			_rRange,
			_percentRange
		],
		createScale("r")
	);

	const rGet_d = derived([_r, rScale_d], createGetter);
	const xRange_d = derived([xScale_d], getRange);
	const yRange_d = derived([yScale_d], getRange);
	const zRange_d = derived([zScale_d], getRange);
	const rRange_d = derived([rScale_d], getRange);

	const aspectRatio_d = derived([width_d, height_d], ([$aspectRatio, $width, $height]) => {
		return $width / $height;
	});

	$$unsubscribe_aspectRatio_d = subscribe(aspectRatio_d, value => $aspectRatio_d = value);
	if ($$props.ssr === void 0 && $$bindings.ssr && ssr !== void 0) $$bindings.ssr(ssr);
	if ($$props.pointerEvents === void 0 && $$bindings.pointerEvents && pointerEvents !== void 0) $$bindings.pointerEvents(pointerEvents);
	if ($$props.position === void 0 && $$bindings.position && position !== void 0) $$bindings.position(position);
	if ($$props.percentRange === void 0 && $$bindings.percentRange && percentRange !== void 0) $$bindings.percentRange(percentRange);
	if ($$props.width === void 0 && $$bindings.width && width !== void 0) $$bindings.width(width);
	if ($$props.height === void 0 && $$bindings.height && height !== void 0) $$bindings.height(height);
	if ($$props.containerWidth === void 0 && $$bindings.containerWidth && containerWidth !== void 0) $$bindings.containerWidth(containerWidth);
	if ($$props.containerHeight === void 0 && $$bindings.containerHeight && containerHeight !== void 0) $$bindings.containerHeight(containerHeight);
	if ($$props.element === void 0 && $$bindings.element && element !== void 0) $$bindings.element(element);
	if ($$props.x === void 0 && $$bindings.x && x !== void 0) $$bindings.x(x);
	if ($$props.y === void 0 && $$bindings.y && y !== void 0) $$bindings.y(y);
	if ($$props.z === void 0 && $$bindings.z && z !== void 0) $$bindings.z(z);
	if ($$props.r === void 0 && $$bindings.r && r !== void 0) $$bindings.r(r);
	if ($$props.custom === void 0 && $$bindings.custom && custom !== void 0) $$bindings.custom(custom);
	if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
	if ($$props.xDomain === void 0 && $$bindings.xDomain && xDomain !== void 0) $$bindings.xDomain(xDomain);
	if ($$props.yDomain === void 0 && $$bindings.yDomain && yDomain !== void 0) $$bindings.yDomain(yDomain);
	if ($$props.zDomain === void 0 && $$bindings.zDomain && zDomain !== void 0) $$bindings.zDomain(zDomain);
	if ($$props.rDomain === void 0 && $$bindings.rDomain && rDomain !== void 0) $$bindings.rDomain(rDomain);
	if ($$props.xNice === void 0 && $$bindings.xNice && xNice !== void 0) $$bindings.xNice(xNice);
	if ($$props.yNice === void 0 && $$bindings.yNice && yNice !== void 0) $$bindings.yNice(yNice);
	if ($$props.zNice === void 0 && $$bindings.zNice && zNice !== void 0) $$bindings.zNice(zNice);
	if ($$props.rNice === void 0 && $$bindings.rNice && rNice !== void 0) $$bindings.rNice(rNice);
	if ($$props.xReverse === void 0 && $$bindings.xReverse && xReverse !== void 0) $$bindings.xReverse(xReverse);
	if ($$props.yReverse === void 0 && $$bindings.yReverse && yReverse !== void 0) $$bindings.yReverse(yReverse);
	if ($$props.zReverse === void 0 && $$bindings.zReverse && zReverse !== void 0) $$bindings.zReverse(zReverse);
	if ($$props.rReverse === void 0 && $$bindings.rReverse && rReverse !== void 0) $$bindings.rReverse(rReverse);
	if ($$props.xPadding === void 0 && $$bindings.xPadding && xPadding !== void 0) $$bindings.xPadding(xPadding);
	if ($$props.yPadding === void 0 && $$bindings.yPadding && yPadding !== void 0) $$bindings.yPadding(yPadding);
	if ($$props.zPadding === void 0 && $$bindings.zPadding && zPadding !== void 0) $$bindings.zPadding(zPadding);
	if ($$props.rPadding === void 0 && $$bindings.rPadding && rPadding !== void 0) $$bindings.rPadding(rPadding);
	if ($$props.xScale === void 0 && $$bindings.xScale && xScale !== void 0) $$bindings.xScale(xScale);
	if ($$props.yScale === void 0 && $$bindings.yScale && yScale !== void 0) $$bindings.yScale(yScale);
	if ($$props.zScale === void 0 && $$bindings.zScale && zScale !== void 0) $$bindings.zScale(zScale);
	if ($$props.rScale === void 0 && $$bindings.rScale && rScale !== void 0) $$bindings.rScale(rScale);
	if ($$props.xRange === void 0 && $$bindings.xRange && xRange !== void 0) $$bindings.xRange(xRange);
	if ($$props.yRange === void 0 && $$bindings.yRange && yRange !== void 0) $$bindings.yRange(yRange);
	if ($$props.zRange === void 0 && $$bindings.zRange && zRange !== void 0) $$bindings.zRange(zRange);
	if ($$props.rRange === void 0 && $$bindings.rRange && rRange !== void 0) $$bindings.rRange(rRange);
	if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0) $$bindings.padding(padding);
	if ($$props.extents === void 0 && $$bindings.extents && extents !== void 0) $$bindings.extents(extents);
	if ($$props.flatData === void 0 && $$bindings.flatData && flatData !== void 0) $$bindings.flatData(flatData);
	$$result.css.add(css$6);

	{
		if (x) config.x = x;
	}

	{
		if (y) config.y = y;
	}

	{
		if (z) config.z = z;
	}

	{
		if (r) config.r = r;
	}

	{
		if (xDomain) config.xDomain = xDomain;
	}

	{
		if (yDomain) config.yDomain = yDomain;
	}

	{
		if (zDomain) config.zDomain = zDomain;
	}

	{
		if (rDomain) config.rDomain = rDomain;
	}

	{
		if (xRange) config.xRange = xRange;
	}

	{
		if (yRange) config.yRange = yRange;
	}

	{
		if (zRange) config.zRange = zRange;
	}

	{
		if (rRange) config.rRange = rRange;
	}

	{
		_percentRange.set(percentRange);
	}

	{
		_containerWidth.set(containerWidth);
	}

	{
		_containerHeight.set(containerHeight);
	}

	{
		_x.set(makeAccessor(x));
	}

	{
		_y.set(makeAccessor(y));
	}

	{
		_z.set(makeAccessor(z));
	}

	{
		_r.set(makeAccessor(r));
	}

	{
		_xDomain.set(xDomain);
	}

	{
		_yDomain.set(yDomain);
	}

	{
		_zDomain.set(zDomain);
	}

	{
		_rDomain.set(rDomain);
	}

	{
		_custom.set(custom);
	}

	{
		_data.set(data);
	}

	{
		_xNice.set(xNice);
	}

	{
		_yNice.set(yNice);
	}

	{
		_zNice.set(zNice);
	}

	{
		_rNice.set(rNice);
	}

	{
		_xReverse.set(xReverse);
	}

	{
		_yReverse.set(yReverse);
	}

	{
		_zReverse.set(zReverse);
	}

	{
		_rReverse.set(rReverse);
	}

	{
		_xPadding.set(xPadding);
	}

	{
		_yPadding.set(yPadding);
	}

	{
		_zPadding.set(zPadding);
	}

	{
		_rPadding.set(rPadding);
	}

	{
		_xScale.set(xScale);
	}

	{
		_yScale.set(yScale);
	}

	{
		_zScale.set(zScale);
	}

	{
		_rScale.set(rScale);
	}

	{
		_xRange.set(xRange);
	}

	{
		_yRange.set(yRange);
	}

	{
		_zRange.set(zRange);
	}

	{
		_rRange.set(rRange);
	}

	{
		_padding.set(padding);
	}

	{
		_extents.set(filterObject(extents));
	}

	{
		_flatData.set(flatData || data);
	}

	context = {
		activeGetters: activeGetters_d,
		width: width_d,
		height: height_d,
		percentRange: _percentRange,
		aspectRatio: aspectRatio_d,
		containerWidth: _containerWidth,
		containerHeight: _containerHeight,
		x: _x,
		y: _y,
		z: _z,
		r: _r,
		custom: _custom,
		data: _data,
		xNice: _xNice,
		yNice: _yNice,
		zNice: _zNice,
		rNice: _rNice,
		xReverse: _xReverse,
		yReverse: _yReverse,
		zReverse: _zReverse,
		rReverse: _rReverse,
		xPadding: _xPadding,
		yPadding: _yPadding,
		zPadding: _zPadding,
		rPadding: _rPadding,
		padding: padding_d,
		flatData: _flatData,
		extents: extents_d,
		xDomain: xDomain_d,
		yDomain: yDomain_d,
		zDomain: zDomain_d,
		rDomain: rDomain_d,
		xRange: xRange_d,
		yRange: yRange_d,
		zRange: zRange_d,
		rRange: rRange_d,
		config: _config,
		xScale: xScale_d,
		xGet: xGet_d,
		yScale: yScale_d,
		yGet: yGet_d,
		zScale: zScale_d,
		zGet: zGet_d,
		rScale: rScale_d,
		rGet: rGet_d
	};

	{
		setContext("LayerCake", context);
	}

	$$unsubscribe_width_d();
	$$unsubscribe_height_d();
	$$unsubscribe_aspectRatio_d();
	$$unsubscribe__containerWidth();
	$$unsubscribe__containerHeight();

	return `${ssr === true || typeof window !== "undefined"
	? `<div class="${"layercake-container svelte-vhzpsp"}" style="${"\n\t\t\tposition:" + escape(position) + ";\n\t\t\t" + escape(position === "absolute"
		? "top:0;right:0;bottom:0;left:0;"
		: "") + "\n\t\t\t" + escape(pointerEvents === false ? "pointer-events:none;" : "") + "\n\t\t"}"${add_attribute("this", element, 1)}>${slots.default
		? slots.default({
				element,
				width: $width_d,
				height: $height_d,
				aspectRatio: $aspectRatio_d,
				containerWidth: $_containerWidth,
				containerHeight: $_containerHeight
			})
		: ``}</div>`
	: ``}`;
});

/* node_modules/layercake/src/layouts/Html.svelte generated by Svelte v3.38.2 */

const css$5 = {
	code: "div.svelte-1bu60uu,slot.svelte-1bu60uu{position:absolute;top:0;left:0}",
	map: "{\"version\":3,\"file\":\"Html.svelte\",\"sources\":[\"Html.svelte\"],\"sourcesContent\":[\"<script>\\n\\timport { getContext } from 'svelte';\\n\\n\\texport let element = undefined;\\n\\texport let zIndex = undefined;\\n\\texport let pointerEvents = undefined;\\n\\n\\tlet zIndexStyle = '';\\n\\t$: zIndexStyle = typeof zIndex !== 'undefined' ? `z-index:${zIndex};` : '';\\n\\n\\tlet pointerEventsStyle = '';\\n\\t$: pointerEventsStyle = pointerEvents === false ? 'pointer-events:none;' : '';\\n\\n\\tconst { padding } = getContext('LayerCake');\\n</script>\\n\\n<div\\n\\tbind:this={element}\\n\\tclass=\\\"layercake-layout-html\\\"\\n\\tstyle=\\\"top: {$padding.top}px; right:{$padding.right}px; bottom:{$padding.bottom}px; left:{$padding.left}px;{zIndexStyle}{pointerEventsStyle}\\\"\\n>\\n\\t<slot {element}></slot>\\n</div>\\n\\n<style>\\n\\tdiv,\\n\\tslot {\\n\\t\\tposition: absolute;\\n\\t\\ttop: 0;\\n\\t\\tleft: 0;\\n\\t}\\n</style>\\n\"],\"names\":[],\"mappings\":\"AAyBC,kBAAG,CACH,IAAI,eAAC,CAAC,AACL,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,AACR,CAAC\"}"
};

const Html = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $padding, $$unsubscribe_padding;
	let { element = undefined } = $$props;
	let { zIndex = undefined } = $$props;
	let { pointerEvents = undefined } = $$props;
	let zIndexStyle = "";
	let pointerEventsStyle = "";
	const { padding } = getContext("LayerCake");
	$$unsubscribe_padding = subscribe(padding, value => $padding = value);
	if ($$props.element === void 0 && $$bindings.element && element !== void 0) $$bindings.element(element);
	if ($$props.zIndex === void 0 && $$bindings.zIndex && zIndex !== void 0) $$bindings.zIndex(zIndex);
	if ($$props.pointerEvents === void 0 && $$bindings.pointerEvents && pointerEvents !== void 0) $$bindings.pointerEvents(pointerEvents);
	$$result.css.add(css$5);

	zIndexStyle = typeof zIndex !== "undefined"
	? `z-index:${zIndex};`
	: "";

	pointerEventsStyle = pointerEvents === false ? "pointer-events:none;" : "";
	$$unsubscribe_padding();

	return `<div class="${"layercake-layout-html svelte-1bu60uu"}" style="${"top: " + escape($padding.top) + "px; right:" + escape($padding.right) + "px; bottom:" + escape($padding.bottom) + "px; left:" + escape($padding.left) + "px;" + escape(zIndexStyle) + escape(pointerEventsStyle)}"${add_attribute("this", element, 1)}>${slots.default ? slots.default({ element }) : ``}
</div>`;
});

/* node_modules/layercake/src/layouts/Svg.svelte generated by Svelte v3.38.2 */

const css$4 = {
	code: "svg.svelte-u84d8d{position:absolute;top:0;left:0;overflow:visible}",
	map: "{\"version\":3,\"file\":\"Svg.svelte\",\"sources\":[\"Svg.svelte\"],\"sourcesContent\":[\"<script>\\n\\timport { getContext } from 'svelte';\\n\\n\\texport let element = undefined;\\n\\texport let viewBox = undefined;\\n\\texport let zIndex = undefined;\\n\\texport let pointerEvents = undefined;\\n\\n\\tlet zIndexStyle = '';\\n\\t$: zIndexStyle = typeof zIndex !== 'undefined' ? `z-index:${zIndex};` : '';\\n\\n\\tlet pointerEventsStyle = '';\\n\\t$: pointerEventsStyle = pointerEvents === false ? 'pointer-events:none;' : '';\\n\\n\\tconst { containerWidth, containerHeight, padding } = getContext('LayerCake');\\n</script>\\n<svg\\n\\tbind:this={element}\\n\\tclass=\\\"layercake-layout-svg\\\"\\n\\t{viewBox}\\n\\twidth={$containerWidth}\\n\\theight={$containerHeight}\\n\\tstyle=\\\"{zIndexStyle}{pointerEventsStyle}\\\"\\n>\\n\\t<defs>\\n\\t\\t<slot name=\\\"defs\\\"></slot>\\n\\t</defs>\\n\\t<g class=\\\"layercake-layout-svg_g\\\" transform=\\\"translate({$padding.left}, {$padding.top})\\\">\\n\\t\\t<slot {element}></slot>\\n\\t</g>\\n</svg>\\n\\n<style>\\n\\tsvg {\\n\\t\\tposition: absolute;\\n\\t\\ttop: 0;\\n\\t\\tleft: 0;\\n\\t\\toverflow: visible;\\n\\t}\\n</style>\\n\"],\"names\":[],\"mappings\":\"AAiCC,GAAG,cAAC,CAAC,AACJ,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,QAAQ,CAAE,OAAO,AAClB,CAAC\"}"
};

const Svg = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let $containerWidth, $$unsubscribe_containerWidth;
	let $containerHeight, $$unsubscribe_containerHeight;
	let $padding, $$unsubscribe_padding;
	let { element = undefined } = $$props;
	let { viewBox = undefined } = $$props;
	let { zIndex = undefined } = $$props;
	let { pointerEvents = undefined } = $$props;
	let zIndexStyle = "";
	let pointerEventsStyle = "";
	const { containerWidth, containerHeight, padding } = getContext("LayerCake");
	$$unsubscribe_containerWidth = subscribe(containerWidth, value => $containerWidth = value);
	$$unsubscribe_containerHeight = subscribe(containerHeight, value => $containerHeight = value);
	$$unsubscribe_padding = subscribe(padding, value => $padding = value);
	if ($$props.element === void 0 && $$bindings.element && element !== void 0) $$bindings.element(element);
	if ($$props.viewBox === void 0 && $$bindings.viewBox && viewBox !== void 0) $$bindings.viewBox(viewBox);
	if ($$props.zIndex === void 0 && $$bindings.zIndex && zIndex !== void 0) $$bindings.zIndex(zIndex);
	if ($$props.pointerEvents === void 0 && $$bindings.pointerEvents && pointerEvents !== void 0) $$bindings.pointerEvents(pointerEvents);
	$$result.css.add(css$4);

	zIndexStyle = typeof zIndex !== "undefined"
	? `z-index:${zIndex};`
	: "";

	pointerEventsStyle = pointerEvents === false ? "pointer-events:none;" : "";
	$$unsubscribe_containerWidth();
	$$unsubscribe_containerHeight();
	$$unsubscribe_padding();
	return `<svg class="${"layercake-layout-svg svelte-u84d8d"}"${add_attribute("viewBox", viewBox, 0)}${add_attribute("width", $containerWidth, 0)}${add_attribute("height", $containerHeight, 0)} style="${escape(zIndexStyle) + escape(pointerEventsStyle)}"${add_attribute("this", element, 1)}><defs>${slots.defs ? slots.defs({ element }) : ``}</defs><g class="${"layercake-layout-svg_g"}" transform="${"translate(" + escape($padding.left) + ", " + escape($padding.top) + ")"}">${slots.default ? slots.default({ element }) : ``}</g></svg>`;
});

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var dayjs_min = createCommonjsModule(function (module, exports) {
!function(t,e){module.exports=e();}(commonjsGlobal,(function(){var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",$="Invalid Date",l=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m=function(t,e,n){var r=String(t);return !r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},g={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return (e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return -t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return +(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return {M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},D="en",v={};v[D]=M;var p=function(t){return t instanceof _},S=function(t,e,n){var r;if(!t)return D;if("string"==typeof t)v[t]&&(r=t),e&&(v[t]=e,r=t);else {var i=t.name;v[i]=t,r=i;}return !n&&r&&(D=r),r||!n&&D},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=g;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t);}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(l);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init();},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds();},m.$utils=function(){return O},m.isValid=function(){return !(this.$d.toString()===$)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),$=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},l=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,g="set"+(this.$u?"UTC":"");switch(h){case c:return r?$(1,0):$(31,11);case f:return r?$(1,M):$(0,M+1);case o:var D=this.$locale().weekStart||0,v=(y<D?y+7:y)-D;return $(r?m-v:m+(6-v),M);case a:case d:return l(g+"Hours",0);case u:return l(g+"Minutes",1);case s:return l(g+"Seconds",2);case i:return l(g+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),$=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],l=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[$](l),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d;}else $&&this.$d[$](l);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,$=this;r=Number(r);var l=O.p(h),y=function(t){var e=w($);return O.w(e.date(e.date()+Math.round(t*r)),$)};if(l===f)return this.set(f,this.$M+r);if(l===c)return this.set(c,this.$y+r);if(l===a)return y(1);if(l===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[l]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||$;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].substr(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||l[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,$){var l,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,g=this-M,D=O.m(this,M);return D=(l={},l[c]=D/12,l[f]=D,l[h]=D/3,l[o]=(g-m)/6048e5,l[a]=(g-m)/864e5,l[u]=g/n,l[s]=g/e,l[i]=g/t,l)[y]||g,$?D:O.a(D)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return v[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),b=_.prototype;return w.prototype=b,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){b[t[1]]=function(e){return this.$g(e,t[0],t[1])};})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=v[D],w.Ls=v,w.p={},w}));
});

const chartStates = [
  // indicate which daily chart components should be shown at each state
  {
    usage: false,
    generation: false,
    net: false,
    data: "typical",
  },
  {
    usage: true,
    generation: false,
    net: false,
    data: "typical",
  },
  {
    usage: true,
    generation: true,
    net: false,
    data: "typical",
  },
  {
    usage: true,
    generation: true,
    net: true,
    data: "typical",
  },
  {
    usage: true,
    generation: true,
    net: true,
    data: "noSolar",
  },
  {
    usage: true,
    generation: true,
    net: true,
    data: "largeSolar",
  },
];

/* src/sections/WalkThrough/WalkThrough.svelte generated by Svelte v3.38.2 */

const css$3 = {
	code: "#walk-through.svelte-1umd1av.svelte-1umd1av{width:100%;min-height:100vh}[slot=background].svelte-1umd1av.svelte-1umd1av{height:100vh;display:flex;flex-direction:column;align-items:center}[slot=foreground].svelte-1umd1av.svelte-1umd1av{width:100%;display:flex;flex-direction:column;justify-content:center;align-items:center}[slot=foreground].svelte-1umd1av section.svelte-1umd1av{width:60%;max-width:500px;height:auto;margin:50vh auto}[slot=foreground].svelte-1umd1av section.svelte-1umd1av:first-of-type{margin:80vh auto}.chart-container.svelte-1umd1av.svelte-1umd1av{margin-top:10vh;width:100%;height:100%;max-height:400px}",
	map: "{\"version\":3,\"file\":\"WalkThrough.svelte\",\"sources\":[\"WalkThrough.svelte\"],\"sourcesContent\":[\"<script>\\n  import { onMount } from \\\"svelte\\\";\\n  import { tweened } from \\\"svelte/motion\\\";\\n  import { cubicInOut } from \\\"svelte/easing\\\";\\n  import Scroller from \\\"components/common/Scroller.svelte\\\";\\n  import { LayerCake, Svg, Html } from \\\"layercake\\\";\\n  import { scaleBand } from \\\"d3-scale\\\";\\n  import { sum, range } from \\\"d3-array\\\";\\n  import dayjs from \\\"dayjs\\\";\\n  import { deg2rad } from \\\"components/utils\\\";\\n  import Axes from \\\"components/DailyChart/Axes.svelte\\\";\\n  import EnergyArcs from \\\"components/DailyChart/EnergyArcs.svelte\\\";\\n  import DaylightArc from \\\"components/DailyChart/DaylightArc.svelte\\\";\\n  import Net from \\\"components/DailyChart/Net.svelte\\\";\\n  import NetLegend from \\\"components/DailyChart/NetLegend.svelte\\\";\\n  import NetSumText from \\\"components/DailyChart/NetSumText.svelte\\\";\\n  import ScrollerTextBox from \\\"components/common/ScrollerTextBox.svelte\\\";\\n\\n  import { chartStates } from \\\"./chartStates\\\";\\n\\n  export let sectionText;\\n  export let solarUtils;\\n\\n  const scrollSteps = sectionText.steps;\\n\\n  // Set up data vars. The currentData tween MUST start with a datasets that matches structure of the real data\\n  let sampleDatasets = {};\\n  let startingData = range(24).map(d => ({\\n    ts: 0,\\n    net: 0,\\n    usage: 0,\\n    generation: 0,\\n    dayIdx: 156,\\n    monthIdx: 6,\\n    monthStr: \\\"Jun\\\",\\n    date: dayjs(\\\"2019-06-01\\\"),\\n  }));\\n  let currentData = tweened(startingData, { duration: 450, easing: cubicInOut });\\n  let daylight = { sunrise: 6, sunset: 20 };\\n\\n  $: {\\n    if (solarUtils.loaded) {\\n      // Generate sample datasets to use for the walk-through\\n      const { generateMonthlyData, months } = solarUtils;\\n      let panelSize = 6; // <-- hardcode inputs to generate a sample data set\\n      const houseSize = 1; // 2br\\n      const peakTime = 6; // peak energy time\\n      const monthIdx = 5; // month to sample from\\n\\n      // Typical dataset\\n      sampleDatasets[\\\"typical\\\"] = generateMonthlyData(panelSize, houseSize, peakTime).filter(\\n        d => d.monthIdx === monthIdx // filter sample data to single month\\n      );\\n\\n      // No solar dataset\\n      panelSize = 0;\\n      sampleDatasets[\\\"noSolar\\\"] = generateMonthlyData(panelSize, houseSize, peakTime).filter(\\n        d => d.monthIdx === monthIdx // filter sample data to single month\\n      );\\n\\n      // Big\\n      panelSize = 12;\\n      sampleDatasets[\\\"largeSolar\\\"] = generateMonthlyData(panelSize, houseSize, peakTime).filter(\\n        d => d.monthIdx === monthIdx // filter sample data to single month\\n      );\\n\\n      // update currentData tween store with the first dataset\\n      currentData.set(sampleDatasets[chartStates[0].data]);\\n\\n      // set sunrise and sunset\\n      let { sunset, sunrise } = months.find(d => d.monthIdx == monthIdx);\\n      daylight = {\\n        sunset,\\n        sunrise,\\n      };\\n    }\\n  }\\n  $: netSum = $currentData ? sum($currentData, d => d.net) : 0;\\n\\n  // --- Scroll state\\n  let index, offset, progress, count;\\n  let indexPrev;\\n  let chartState = chartStates[0];\\n  onMount(() => {\\n    indexPrev = index;\\n  });\\n\\n  $: if (indexPrev !== index) {\\n    // update chart state on scroll state change\\n    indexPrev = index;\\n    if (index < chartStates.length) {\\n      chartState = chartStates[index];\\n      currentData.set(solarUtils.loaded ? sampleDatasets[chartState.data] : startingData);\\n    }\\n  }\\n</script>\\n\\n<section id=\\\"walk-through\\\" class=\\\"body-content\\\">\\n  <Scroller threshold={0.65} bind:index bind:offset bind:progress bind:count>\\n    <div slot=\\\"background\\\">\\n      <div class=\\\"chart-container\\\">\\n        <LayerCake\\n          data={$currentData}\\n          padding={{ bottom: 40, top: 20 }}\\n          xScale={scaleBand().align(0)}\\n          xRange={[-deg2rad(90), deg2rad(90)]}\\n          xDomain={$currentData.map(d => d.ts)}\\n          yRange={[150, 270]}\\n          yDomain={[-6, 6]}\\n        >\\n          <Svg>\\n            <DaylightArc {chartState} {daylight} />\\n            <EnergyArcs {chartState} selectedTs={null} />\\n            <Axes selectedTs={null} />\\n            <Net {chartState} selectedTs={null} />\\n          </Svg>\\n\\n          <Html>\\n            <NetLegend {chartState} id=\\\"walkthrough-legend\\\" />\\n            <NetSumText {chartState} {netSum} delay={1200} />\\n          </Html>\\n        </LayerCake>\\n      </div>\\n    </div>\\n\\n    <div slot=\\\"foreground\\\">\\n      {#each scrollSteps as step}\\n        <section class=\\\"scroll-section\\\">\\n          <ScrollerTextBox stepText={step.text} />\\n        </section>\\n      {/each}\\n    </div>\\n  </Scroller>\\n</section>\\n\\n<style lang=\\\"scss\\\">#walk-through {\\n  width: 100%;\\n  min-height: 100vh;\\n}\\n\\n[slot=background] {\\n  height: 100vh;\\n  display: flex;\\n  flex-direction: column;\\n  align-items: center;\\n}\\n\\n[slot=foreground] {\\n  width: 100%;\\n  display: flex;\\n  flex-direction: column;\\n  justify-content: center;\\n  align-items: center;\\n}\\n[slot=foreground] section {\\n  width: 60%;\\n  max-width: 500px;\\n  height: auto;\\n  margin: 50vh auto;\\n}\\n[slot=foreground] section:first-of-type {\\n  margin: 80vh auto;\\n}\\n\\n.chart-container {\\n  margin-top: 10vh;\\n  width: 100%;\\n  height: 100%;\\n  max-height: 400px;\\n}</style>\\n\"],\"names\":[],\"mappings\":\"AAuImB,aAAa,8BAAC,CAAC,AAChC,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,KAAK,AACnB,CAAC,AAED,CAAC,IAAI,CAAC,UAAU,CAAC,8BAAC,CAAC,AACjB,MAAM,CAAE,KAAK,CACb,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,MAAM,AACrB,CAAC,AAED,CAAC,IAAI,CAAC,UAAU,CAAC,8BAAC,CAAC,AACjB,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,AACrB,CAAC,AACD,CAAC,IAAI,CAAC,UAAU,gBAAC,CAAC,OAAO,eAAC,CAAC,AACzB,KAAK,CAAE,GAAG,CACV,SAAS,CAAE,KAAK,CAChB,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,IAAI,CAAC,IAAI,AACnB,CAAC,AACD,CAAC,IAAI,CAAC,UAAU,gBAAC,CAAC,sBAAO,cAAc,AAAC,CAAC,AACvC,MAAM,CAAE,IAAI,CAAC,IAAI,AACnB,CAAC,AAED,gBAAgB,8BAAC,CAAC,AAChB,UAAU,CAAE,IAAI,CAChB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,KAAK,AACnB,CAAC\"}"
};

const WalkThrough = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let netSum;
	let $currentData, $$unsubscribe_currentData;
	let { sectionText } = $$props;
	let { solarUtils } = $$props;
	const scrollSteps = sectionText.steps;

	// Set up data vars. The currentData tween MUST start with a datasets that matches structure of the real data
	let sampleDatasets = {};

	let startingData = range(24).map(d => ({
		ts: 0,
		net: 0,
		usage: 0,
		generation: 0,
		dayIdx: 156,
		monthIdx: 6,
		monthStr: "Jun",
		date: dayjs_min("2019-06-01")
	}));

	let currentData = tweened(startingData, { duration: 450, easing: cubicInOut });
	$$unsubscribe_currentData = subscribe(currentData, value => $currentData = value);
	let daylight = { sunrise: 6, sunset: 20 };

	// --- Scroll state
	let index, offset, progress, count;

	let indexPrev;
	let chartState = chartStates[0];

	onMount(() => {
		indexPrev = index;
	});

	if ($$props.sectionText === void 0 && $$bindings.sectionText && sectionText !== void 0) $$bindings.sectionText(sectionText);
	if ($$props.solarUtils === void 0 && $$bindings.solarUtils && solarUtils !== void 0) $$bindings.solarUtils(solarUtils);
	$$result.css.add(css$3);
	let $$settled;
	let $$rendered;

	do {
		$$settled = true;

		{
			{
				if (solarUtils.loaded) {
					// Generate sample datasets to use for the walk-through
					const { generateMonthlyData, months } = solarUtils;

					let panelSize = 6; // <-- hardcode inputs to generate a sample data set
					const houseSize = 1; // 2br
					const peakTime = 6; // peak energy time
					const monthIdx = 5; // month to sample from

					// Typical dataset
					sampleDatasets["typical"] = generateMonthlyData(panelSize, houseSize, peakTime).filter(d => d.monthIdx === monthIdx); // filter sample data to single month

					// No solar dataset
					panelSize = 0;

					sampleDatasets["noSolar"] = generateMonthlyData(panelSize, houseSize, peakTime).filter(d => d.monthIdx === monthIdx); // filter sample data to single month

					// Big
					panelSize = 12;

					sampleDatasets["largeSolar"] = generateMonthlyData(panelSize, houseSize, peakTime).filter(d => d.monthIdx === monthIdx); // filter sample data to single month

					// update currentData tween store with the first dataset
					currentData.set(sampleDatasets[chartStates[0].data]);

					// set sunrise and sunset
					let { sunset, sunrise } = months.find(d => d.monthIdx == monthIdx);

					daylight = { sunset, sunrise };
				}
			}
		}

		netSum = $currentData ? sum($currentData, d => d.net) : 0;

		{
			if (indexPrev !== index) {
				// update chart state on scroll state change
				indexPrev = index;

				if (index < chartStates.length) {
					chartState = chartStates[index];

					currentData.set(solarUtils.loaded
					? sampleDatasets[chartState.data]
					: startingData);
				}
			}
		}

		$$rendered = `<section id="${"walk-through"}" class="${"body-content svelte-1umd1av"}">${validate_component(Scroller__default['default'], "Scroller").$$render(
			$$result,
			{
				threshold: 0.65,
				index,
				offset,
				progress,
				count
			},
			{
				index: $$value => {
					index = $$value;
					$$settled = false;
				},
				offset: $$value => {
					offset = $$value;
					$$settled = false;
				},
				progress: $$value => {
					progress = $$value;
					$$settled = false;
				},
				count: $$value => {
					count = $$value;
					$$settled = false;
				}
			},
			{
				foreground: () => `<div slot="${"foreground"}" class="${"svelte-1umd1av"}">${each(scrollSteps, step => `<section class="${"scroll-section svelte-1umd1av"}">${validate_component(ScrollerTextBox__default['default'], "ScrollerTextBox").$$render($$result, { stepText: step.text }, {}, {})}
        </section>`)}</div>`,
				background: () => `<div slot="${"background"}" class="${"svelte-1umd1av"}"><div class="${"chart-container svelte-1umd1av"}">${validate_component(LayerCake, "LayerCake").$$render(
					$$result,
					{
						data: $currentData,
						padding: { bottom: 40, top: 20 },
						xScale: band().align(0),
						xRange: [-utils.deg2rad(90), utils.deg2rad(90)],
						xDomain: $currentData.map(d => d.ts),
						yRange: [150, 270],
						yDomain: [-6, 6]
					},
					{},
					{
						default: () => `${validate_component(Svg, "Svg").$$render($$result, {}, {}, {
							default: () => `${validate_component(DaylightArc__default['default'], "DaylightArc").$$render($$result, { chartState, daylight }, {}, {})}
            ${validate_component(EnergyArcs__default['default'], "EnergyArcs").$$render($$result, { chartState, selectedTs: null }, {}, {})}
            ${validate_component(Axes__default['default'], "Axes").$$render($$result, { selectedTs: null }, {}, {})}
            ${validate_component(Net__default['default'], "Net").$$render($$result, { chartState, selectedTs: null }, {}, {})}`
						})}

          ${validate_component(Html, "Html").$$render($$result, {}, {}, {
							default: () => `${validate_component(NetLegend__default['default'], "NetLegend").$$render($$result, { chartState, id: "walkthrough-legend" }, {}, {})}
            ${validate_component(NetSumText__default['default'], "NetSumText").$$render($$result, { chartState, netSum, delay: 1200 }, {}, {})}`
						})}`
					}
				)}</div></div>`
			}
		)}
</section>`;
	} while (!$$settled);

	$$unsubscribe_currentData();
	return $$rendered;
});

const sliderOpts = {
  houseSize: {
    sliderLabel: "Home size",
    min: 1,
    max: 4,
    step: 0.1,
    pipstep: 10, // <-- place pip every [pipstep] steps
    pipFormat: v => {
      const idx = Math.floor(Number(v)) - 1;
      const labels = ["1br", "2br", "3br", "4br+"];
      return labels[idx];
    },
    icon: "home",
  },
  peakTime: {
    sliderLabel: "Peak usage time",
    min: 3,
    max: 15,
    step: 1,
    pipstep: 3,
    pipFormat: v =>
      `${dayjs_min()
        .hour(12 + v)
        .format("h a")}`,
    icon: "clock",
  },
  panelSize: {
    sliderLabel: "Solar panel output",
    min: 0,
    max: 12,
    step: 1,
    pipstep: 3,
    pipFormat: v => (v === 0 ? v : `${v}kW`),
    icon: "solarPanel",
  },
};

/* src/sections/PlanComparison/PlanComparison.svelte generated by Svelte v3.38.2 */

const css$2 = {
	code: "#plan-comparison.svelte-1jez3c4.svelte-1jez3c4{display:flex;flex-direction:column;align-items:center;width:100%;min-height:100vh}.chart-container.svelte-1jez3c4.svelte-1jez3c4{margin-top:10vh;width:100%;height:400px;max-height:400px}.inputs-plans-container.svelte-1jez3c4.svelte-1jez3c4{margin-top:100px;width:100%;display:flex}.inputs-plans-container.svelte-1jez3c4 .inputs-container.svelte-1jez3c4{display:flex;flex-direction:column;width:100%;padding:10px}.inputs-plans-container.svelte-1jez3c4 .plans-container.svelte-1jez3c4{padding:10px;width:100%}",
	map: "{\"version\":3,\"file\":\"PlanComparison.svelte\",\"sources\":[\"PlanComparison.svelte\"],\"sourcesContent\":[\"<script>\\n  import { LayerCake, Svg, Html } from \\\"layercake\\\";\\n  import { sum } from \\\"d3-array\\\";\\n  import { scaleBand } from \\\"d3-scale\\\";\\n  import { deg2rad } from \\\"components/utils\\\";\\n  import Axes from \\\"components/DailyChart/Axes.svelte\\\";\\n  import EnergyArcs from \\\"components/DailyChart/EnergyArcs.svelte\\\";\\n  import DaylightArc from \\\"components/DailyChart/DaylightArc.svelte\\\";\\n  import Net from \\\"components/DailyChart/Net.svelte\\\";\\n  import NetLegend from \\\"components/DailyChart/NetLegend.svelte\\\";\\n  import NetSumText from \\\"components/DailyChart/NetSumText.svelte\\\";\\n  import Slider from \\\"components/common/Slider.svelte\\\";\\n  import PlanTable from \\\"components/PlanTable/PlanTable.svelte\\\";\\n\\n  import { sliderOpts } from \\\"./sliderOptions.js\\\";\\n\\n  export let solarUtils;\\n  export let sectionText;\\n\\n  let currentData = [];\\n  let bills = [];\\n  let daylight = { sunrise: 6, sunset: 19 };\\n  let chartState = {\\n    usage: true,\\n    generation: true,\\n    net: true,\\n  };\\n\\n  // Slider Defaults\\n  let houseSize = [0];\\n  let peakTime = [6];\\n  let panelSize = [6];\\n\\n  // Seasonal Variation chart vars (null if nothing selected)\\n  let monthIdx = null;\\n  let tsIdx = null;\\n\\n  $: {\\n    if (solarUtils.loaded) {\\n      /* Generate monthly dataset (generate data first day of each month month)\\n        given the current input parameters */\\n      const {\\n        months,\\n        generateMeanData,\\n        generateMonthlyData,\\n        generateMonthlyBills,\\n        generateAnnualBills,\\n      } = solarUtils;\\n      const monthlyData = generateMonthlyData(panelSize, houseSize, peakTime);\\n      const monthlyBills = generateMonthlyBills(monthlyData);\\n\\n      // set data based on whether seasonal variation chart is interacted with or not\\n      if (monthIdx) {\\n        currentData = monthlyData.filter(d => d.monthIdx === monthIdx);\\n        let thisMonth = months.find(d => d.monthIdx === monthIdx);\\n        daylight = { sunrise: thisMonth.sunrise, sunset: thisMonth.sunset };\\n        bills = monthlyBills\\n          .find(d => d.monthIdx === monthIdx)\\n          .plans.map(d => ({ ...d, billType: \\\"monthly\\\" }));\\n      } else {\\n        currentData = generateMeanData(monthlyData);\\n        daylight = { sunrise: 6, sunset: 19 };\\n        bills = generateAnnualBills(monthlyBills).map(d => ({ ...d, billType: \\\"annual\\\" }));\\n      }\\n    } else {\\n      currentData = [];\\n    }\\n  }\\n  $: netSum = currentData ? sum(currentData, d => d.net) : 0;\\n\\n  $: toolTips = sectionText.sliderToolTips[0];\\n</script>\\n\\n<section id=\\\"plan-comparison\\\" class=\\\"body-content\\\">\\n  <div class=\\\"chart-container\\\">\\n    <!-- MAIN GRAPHIC -->\\n    <LayerCake\\n      data={currentData}\\n      padding={{ bottom: 40, top: 20 }}\\n      xScale={scaleBand().align(0)}\\n      xRange={[-deg2rad(90), deg2rad(90)]}\\n      xDomain={currentData.map(d => d.ts)}\\n      yRange={[150, 270]}\\n      yDomain={[-6, 6]}\\n    >\\n      <Svg>\\n        <DaylightArc {chartState} {daylight} />\\n        <EnergyArcs {chartState} selectedTs={null} />\\n        <Axes selectedTs={null} />\\n        <Net {chartState} selectedTs={null} />\\n      </Svg>\\n\\n      <Html>\\n        <NetLegend id=\\\"plancomparison-legend\\\" {chartState} />\\n        <NetSumText {chartState} {netSum} delay={1200} />\\n      </Html>\\n    </LayerCake>\\n  </div>\\n\\n  <div class=\\\"inputs-plans-container\\\">\\n    <div class=\\\"inputs-container\\\">\\n      <!-- INPUTS -->\\n      <Slider\\n        tooltipText={toolTips.homeSize}\\n        {...sliderOpts.houseSize}\\n        bind:sliderValue={houseSize}\\n      />\\n      <Slider\\n        tooltipText={toolTips.peakTime}\\n        {...sliderOpts.peakTime}\\n        bind:sliderValue={peakTime}\\n      />\\n      <Slider\\n        tooltipText={toolTips.panelSize}\\n        {...sliderOpts.panelSize}\\n        bind:sliderValue={panelSize}\\n      />\\n    </div>\\n\\n    <div class=\\\"plans-container\\\">\\n      <!-- PLANS -->\\n      <PlanTable {bills} />\\n    </div>\\n  </div>\\n</section>\\n\\n<style lang=\\\"scss\\\">#plan-comparison {\\n  display: flex;\\n  flex-direction: column;\\n  align-items: center;\\n  width: 100%;\\n  min-height: 100vh;\\n}\\n\\n.chart-container {\\n  margin-top: 10vh;\\n  width: 100%;\\n  height: 400px;\\n  max-height: 400px;\\n}\\n\\n.inputs-plans-container {\\n  margin-top: 100px;\\n  width: 100%;\\n  display: flex;\\n}\\n.inputs-plans-container .inputs-container {\\n  display: flex;\\n  flex-direction: column;\\n  width: 100%;\\n  padding: 10px;\\n}\\n.inputs-plans-container .plans-container {\\n  padding: 10px;\\n  width: 100%;\\n}</style>\\n\"],\"names\":[],\"mappings\":\"AA8HmB,gBAAgB,8BAAC,CAAC,AACnC,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,KAAK,AACnB,CAAC,AAED,gBAAgB,8BAAC,CAAC,AAChB,UAAU,CAAE,IAAI,CAChB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,KAAK,CACb,UAAU,CAAE,KAAK,AACnB,CAAC,AAED,uBAAuB,8BAAC,CAAC,AACvB,UAAU,CAAE,KAAK,CACjB,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,AACf,CAAC,AACD,sCAAuB,CAAC,iBAAiB,eAAC,CAAC,AACzC,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,MAAM,CACtB,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,AACf,CAAC,AACD,sCAAuB,CAAC,gBAAgB,eAAC,CAAC,AACxC,OAAO,CAAE,IAAI,CACb,KAAK,CAAE,IAAI,AACb,CAAC\"}"
};

const PlanComparison = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let netSum;
	let toolTips;
	let { solarUtils } = $$props;
	let { sectionText } = $$props;
	let currentData = [];
	let bills = [];
	let daylight = { sunrise: 6, sunset: 19 };
	let chartState = { usage: true, generation: true, net: true };

	// Slider Defaults
	let houseSize = [0];

	let peakTime = [6];
	let panelSize = [6];
	if ($$props.solarUtils === void 0 && $$bindings.solarUtils && solarUtils !== void 0) $$bindings.solarUtils(solarUtils);
	if ($$props.sectionText === void 0 && $$bindings.sectionText && sectionText !== void 0) $$bindings.sectionText(sectionText);
	$$result.css.add(css$2);
	let $$settled;
	let $$rendered;

	do {
		$$settled = true;

		{
			{
				if (solarUtils.loaded) {
					/* Generate monthly dataset (generate data first day of each month month)
  given the current input parameters */
					const { months, generateMeanData, generateMonthlyData, generateMonthlyBills, generateAnnualBills } = solarUtils;

					const monthlyData = generateMonthlyData(panelSize, houseSize, peakTime);
					const monthlyBills = generateMonthlyBills(monthlyData);

					// set data based on whether seasonal variation chart is interacted with or not
					{
						currentData = generateMeanData(monthlyData);
						daylight = { sunrise: 6, sunset: 19 };
						bills = generateAnnualBills(monthlyBills).map(d => ({ ...d, billType: "annual" }));
					}
				} else {
					currentData = [];
				}
			}
		}

		netSum = currentData ? sum(currentData, d => d.net) : 0;
		toolTips = sectionText.sliderToolTips[0];

		$$rendered = `<section id="${"plan-comparison"}" class="${"body-content svelte-1jez3c4"}"><div class="${"chart-container svelte-1jez3c4"}">
    ${validate_component(LayerCake, "LayerCake").$$render(
			$$result,
			{
				data: currentData,
				padding: { bottom: 40, top: 20 },
				xScale: band().align(0),
				xRange: [-utils.deg2rad(90), utils.deg2rad(90)],
				xDomain: currentData.map(d => d.ts),
				yRange: [150, 270],
				yDomain: [-6, 6]
			},
			{},
			{
				default: () => `${validate_component(Svg, "Svg").$$render($$result, {}, {}, {
					default: () => `${validate_component(DaylightArc__default['default'], "DaylightArc").$$render($$result, { chartState, daylight }, {}, {})}
        ${validate_component(EnergyArcs__default['default'], "EnergyArcs").$$render($$result, { chartState, selectedTs: null }, {}, {})}
        ${validate_component(Axes__default['default'], "Axes").$$render($$result, { selectedTs: null }, {}, {})}
        ${validate_component(Net__default['default'], "Net").$$render($$result, { chartState, selectedTs: null }, {}, {})}`
				})}

      ${validate_component(Html, "Html").$$render($$result, {}, {}, {
					default: () => `${validate_component(NetLegend__default['default'], "NetLegend").$$render($$result, { id: "plancomparison-legend", chartState }, {}, {})}
        ${validate_component(NetSumText__default['default'], "NetSumText").$$render($$result, { chartState, netSum, delay: 1200 }, {}, {})}`
				})}`
			}
		)}</div>

  <div class="${"inputs-plans-container svelte-1jez3c4"}"><div class="${"inputs-container svelte-1jez3c4"}">
      ${validate_component(Slider__default['default'], "Slider").$$render(
			$$result,
			Object.assign({ tooltipText: toolTips.homeSize }, sliderOpts.houseSize, { sliderValue: houseSize }),
			{
				sliderValue: $$value => {
					houseSize = $$value;
					$$settled = false;
				}
			},
			{}
		)}
      ${validate_component(Slider__default['default'], "Slider").$$render(
			$$result,
			Object.assign({ tooltipText: toolTips.peakTime }, sliderOpts.peakTime, { sliderValue: peakTime }),
			{
				sliderValue: $$value => {
					peakTime = $$value;
					$$settled = false;
				}
			},
			{}
		)}
      ${validate_component(Slider__default['default'], "Slider").$$render(
			$$result,
			Object.assign({ tooltipText: toolTips.panelSize }, sliderOpts.panelSize, { sliderValue: panelSize }),
			{
				sliderValue: $$value => {
					panelSize = $$value;
					$$settled = false;
				}
			},
			{}
		)}</div>

    <div class="${"plans-container svelte-1jez3c4"}">
      ${validate_component(PlanTable__default['default'], "PlanTable").$$render($$result, { bills }, {}, {})}</div></div>
</section>`;
	} while (!$$settled);

	return $$rendered;
});

/* src/sections/Resources/Resources.svelte generated by Svelte v3.38.2 */

const css$1 = {
	code: "#resources.svelte-1fmgyrl{width:100%;height:100vh;display:flex;justify-content:center;align-items:center;background-color:white}",
	map: "{\"version\":3,\"file\":\"Resources.svelte\",\"sources\":[\"Resources.svelte\"],\"sourcesContent\":[\"<script>\\n</script>\\n\\n<section id=\\\"resources\\\">\\n  <h2>Resources Section</h2>\\n</section>\\n\\n<style>\\n  #resources {\\n    width: 100%;\\n    height: 100vh;\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n    background-color: white;\\n  }\\n</style>\\n\"],\"names\":[],\"mappings\":\"AAQE,UAAU,eAAC,CAAC,AACV,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,KAAK,CACb,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,gBAAgB,CAAE,KAAK,AACzB,CAAC\"}"
};

const Resources = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	$$result.css.add(css$1);

	return `<section id="${"resources"}" class="${"svelte-1fmgyrl"}"><h2>Resources Section</h2>
</section>`;
});

/* src/components/Nav.svelte generated by Svelte v3.38.2 */

const css = {
	code: "#navbar.svelte-plp8v6.svelte-plp8v6{width:100%;height:50px;position:sticky;top:0;z-index:10;padding:10px;display:flex;justify-content:space-between;align-items:center;background:#020024;background:linear-gradient(90deg, var(--dark) 0%, var(--light) 100%);box-shadow:5px 5px 10px rgba(0, 0, 0, 0.15)}.links-container.svelte-plp8v6.svelte-plp8v6{max-width:70%;display:flex;justify-content:space-between}.links-container.svelte-plp8v6 div.svelte-plp8v6{display:inline-block;padding:0 15px;font-family:\"Roboto Condensed\";font-size:1.4rem;font-weight:500;text-transform:uppercase;cursor:pointer;color:#555;letter-spacing:0.025rem;transition:transform 150ms}.links-container.svelte-plp8v6 div.svelte-plp8v6:hover{color:#4f6b79;transform:translateY(-1px)}h1.svelte-plp8v6.svelte-plp8v6{color:white;font-family:\"Roboto Condensed\";margin:0px}",
	map: "{\"version\":3,\"file\":\"Nav.svelte\",\"sources\":[\"Nav.svelte\"],\"sourcesContent\":[\"<script>\\n  import * as scroll from \\\"svelte-scrollto\\\";\\n\\n  const scrollTo = element => {\\n    console.log(`scrolling to ${element}`);\\n    scroll.scrollTo({ element, duration: 1200 });\\n  };\\n</script>\\n\\n<div id=\\\"navbar\\\">\\n  <!-- Logo -->\\n  <div class=\\\"logo-container\\\">\\n    <h1>Placeholder</h1>\\n  </div>\\n\\n  <!-- Links -->\\n  <div class=\\\"links-container\\\">\\n    <div on:click={() => scrollTo(\\\"#summary\\\")}>Report Summary</div>\\n    <div on:click={() => scrollTo(\\\"#walk-through\\\")}>Key Factors</div>\\n    <div on:click={() => scrollTo(\\\"#plan-comparison\\\")}>Plan Comparison</div>\\n    <div on:click={() => scrollTo(\\\"#resources\\\")}>Resources</div>\\n  </div>\\n</div>\\n\\n<style lang=\\\"scss\\\">#navbar {\\n  width: 100%;\\n  height: 50px;\\n  position: sticky;\\n  top: 0;\\n  z-index: 10;\\n  padding: 10px;\\n  display: flex;\\n  justify-content: space-between;\\n  align-items: center;\\n  background: #020024;\\n  background: linear-gradient(90deg, var(--dark) 0%, var(--light) 100%);\\n  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.15);\\n}\\n\\n.links-container {\\n  max-width: 70%;\\n  display: flex;\\n  justify-content: space-between;\\n}\\n.links-container div {\\n  display: inline-block;\\n  padding: 0 15px;\\n  font-family: \\\"Roboto Condensed\\\";\\n  font-size: 1.4rem;\\n  font-weight: 500;\\n  text-transform: uppercase;\\n  cursor: pointer;\\n  color: #555;\\n  letter-spacing: 0.025rem;\\n  transition: transform 150ms;\\n}\\n.links-container div:hover {\\n  color: #4f6b79;\\n  transform: translateY(-1px);\\n}\\n\\nh1 {\\n  color: white;\\n  font-family: \\\"Roboto Condensed\\\";\\n  margin: 0px;\\n}</style>\\n\"],\"names\":[],\"mappings\":\"AAwBmB,OAAO,4BAAC,CAAC,AAC1B,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,MAAM,CAChB,GAAG,CAAE,CAAC,CACN,OAAO,CAAE,EAAE,CACX,OAAO,CAAE,IAAI,CACb,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,aAAa,CAC9B,WAAW,CAAE,MAAM,CACnB,UAAU,CAAE,OAAO,CACnB,UAAU,CAAE,gBAAgB,KAAK,CAAC,CAAC,IAAI,MAAM,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,OAAO,CAAC,CAAC,IAAI,CAAC,CACrE,UAAU,CAAE,GAAG,CAAC,GAAG,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,AAC9C,CAAC,AAED,gBAAgB,4BAAC,CAAC,AAChB,SAAS,CAAE,GAAG,CACd,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,aAAa,AAChC,CAAC,AACD,8BAAgB,CAAC,GAAG,cAAC,CAAC,AACpB,OAAO,CAAE,YAAY,CACrB,OAAO,CAAE,CAAC,CAAC,IAAI,CACf,WAAW,CAAE,kBAAkB,CAC/B,SAAS,CAAE,MAAM,CACjB,WAAW,CAAE,GAAG,CAChB,cAAc,CAAE,SAAS,CACzB,MAAM,CAAE,OAAO,CACf,KAAK,CAAE,IAAI,CACX,cAAc,CAAE,QAAQ,CACxB,UAAU,CAAE,SAAS,CAAC,KAAK,AAC7B,CAAC,AACD,8BAAgB,CAAC,iBAAG,MAAM,AAAC,CAAC,AAC1B,KAAK,CAAE,OAAO,CACd,SAAS,CAAE,WAAW,IAAI,CAAC,AAC7B,CAAC,AAED,EAAE,4BAAC,CAAC,AACF,KAAK,CAAE,KAAK,CACZ,WAAW,CAAE,kBAAkB,CAC/B,MAAM,CAAE,GAAG,AACb,CAAC\"}"
};

const Nav = create_ssr_component(($$result, $$props, $$bindings, slots) => {

	$$result.css.add(css);

	return `<div id="${"navbar"}" class="${"svelte-plp8v6"}">
  <div class="${"logo-container"}"><h1 class="${"svelte-plp8v6"}">Placeholder</h1></div>

  
  <div class="${"links-container svelte-plp8v6"}"><div class="${"svelte-plp8v6"}">Report Summary</div>
    <div class="${"svelte-plp8v6"}">Key Factors</div>
    <div class="${"svelte-plp8v6"}">Plan Comparison</div>
    <div class="${"svelte-plp8v6"}">Resources</div></div>
</div>`;
});

var navigation = [
	{
		section: "1",
		title: "Analysis summary"
	},
	{
		section: "2",
		title: "Factors affecting your bill"
	},
	{
		section: "3",
		title: "Comparing plans"
	},
	{
		section: "4",
		title: "Resources"
	}
];
var hero = {
	title: "Project name",
	subtitle: "What the project is about"
};
var section1 = {
	title: "Analysis summary",
	heading: "Lessons from real Texas solar owners",
	textBlock1: [
		{
			type: "text",
			value: "Distributed solar is an important part of Texas’ energy future. Investing in local energy solutions like rooftop solar improves the reliability of the Texas energy grid but without state incentives or a statewide net metering policy, many consumers who want solar don’t know where to start or what adding solar means for their utility bills. The economics of rooftop solar varies dramatically, based upon customer-selected rate plans from competitive energy retailers, a fixture of Texas’s unique, deregulated electricity market."
		},
		{
			type: "text",
			value: "In the last year using Smart Meter Texas data, we’ve analyzed the energy usage and energy production patterns of more than 300 Texas solar owners and compared them to available retail electricity plans in their area. This free service is available to anyone in Oncor and Centerpoint service territories. What we found shows that a solar owner’s choice of retail plan can have a big impact on the savings (over $500/year or more) their solar arrays provide and often solar owners are on the wrong plan. Factors like when and how much someone uses electricity and when and how much solar energy they produce determine which plan makes the most sense for them. Being on the right plan can help more people make the switch to solar with confidence while also making valuable contributions to the resiliency of the Texas grid."
		}
	],
	planDefinitions: [
		{
			plan: "1:1 Buyback",
			definition: "These plans offer the same  kilowatt-hour (kWh) credit for solar energy you export to the grid as the rate you pay for using a kWh from the grid. Depending on the rate per kWh you are paying, these plans are often better suited to solar arrays that export more electricity to the grid."
		},
		{
			plan: "No Buyback",
			definition: "These plans do not offer any compensation for exported solar energy but can have very competitive pricing for the electricity you import from the grid. If you are a solar owner who uses most of the energy you generate directly in your home rather than exporting it to the grid, this type of plan may offer the shortest payback for your solar investment."
		},
		{
			plan: "Free Nights and Weekends",
			definition: "As the name implies, you are not paying for electricity on the weekends and at night. For some users that have appliances or electric vehicles that use a lot of electricity at one time, timing when they draw power can lower your monthly electricity bill and maximize the value of your solar investment."
		}
	],
	figures: [
		{
			fig: "1",
			title: "Solar array sizes",
			caption: "A significant percentage of surveyed solar owners have large system (> 10kW)."
		},
		{
			fig: "2",
			title: "Export/import ratios",
			caption: "Electricity you export to the grid vs. how much you import from the grid; For example, if you import 1000 kWh each month (you pay for them), an export/import ratio of 40% means in that same month you sent 400 kWh of solar energy to the grid (back through your meter). A lower ratio means you’re using more solar energy at home immediately as soon as you make it. A higher ratio means you are sending more to the grid."
		},
		{
			fig: "3",
			title: "Recommended plans by type",
			caption: "Total plans recommended by plan type (1:1 buyback, no buyback, free nights/weekends); (+ sentence commentary on the actual graphic)"
		},
		{
			fig: "4",
			title: "Wrong plans",
			caption: "Total solar owners who were on a plan saving them less money than they could have saved by selecting another plan; (+ sentence commentary on the actual graphic)"
		},
		{
			fig: "5",
			title: "Wrong plans by plan type",
			caption: "People who were on the wrong plan categorized by plan type before they made the switch; (+ sentence commentary on the actual graphic)"
		},
		{
			fig: "6",
			title: "Wrong plans by export/import ratio",
			caption: "People on each plan type by export/import ratio category; (+ sentence commentary on the actual graphic)"
		},
		{
			fig: "7",
			title: "Expected savings after switching",
			caption: "After switching to the recommended plan, these are the ranges of savings we expect solar owners to see. (+ sentence commentary on the actual graphic)"
		}
	]
};
var section2 = {
	title: "Factors affecting your bill",
	heading: "Solar value varies widely",
	overview: "In most places, solar homeowners receive a credit on their monthly utility bill for this excess electricity their system produces. When the excess generation is credited at the same rate as the customer’s consumption this is known as net metering. It ensures solar homeowners receive fair credit for the electricity their systems generate and helps them see a return on their investment into solar. Net metering policies are enacted at the state level. Thirty-eight states require utilities to offer net-metering. Texas is not one of them. If you buy electricity from a Retail Electricity Provider in Texas, the plan you choose will impact your solar savings as will these factors which vary from household to household:",
	steps: [
		{
			step: "1",
			text: "Your electrical bill depends on how much of your daily electricity is <strong>imported</strong> from the grid versus <strong>generated</strong> with a home solar system."
		},
		{
			step: "2",
			text: "The light gray bars represent your electricity <strong>usage</strong> each hour throughout a typical day."
		},
		{
			step: "3",
			text: "A solar system will generate electricity during daylight hours. <br><br> The dark gray bars show how much electricity is <strong>generated</strong> per hour throughout the day."
		},
		{
			step: "4",
			text: "Solar generation will reduce the amount of electricity imported from the grid. <br><br> The circles show your <strong>net difference</strong> (usage - generation) at each hour, and represent how much electricity is needed from the grid."
		},
		{
			step: "6",
			text: "Without any solar generation, all of your electricity is <strong>imported</strong> from the grid."
		},
		{
			step: "7",
			text: "With a large solar array, you might generate more electricity than you use during portions of the day. <br><br> The excess energy is <strong>exported</strong> back to the grid, and - with some retail electric plans - you earn money for this."
		}
	]
};
var section3 = {
	title: "Comparing plans",
	overview: "There are hundreds of Retail Electricity plans available from providers. To help you compare, we’ve categorized plans into three basic groups: No Buyback, 1:1 Buyback Plans, and Free Nights and Weekends. When you adjust the different factors impacting solar savings, the analysis tool will show you what plan type is most likely to be the best.",
	sliderToolTips: [
		{
			homeSize: "How much energy you are using from the utility each month depends on a number of factors like how big your home is, how energy efficient it is, how many people live there, and your consumption habits. For simplicity’s sake, we’ve reduced that complex question to just home size.",
			peakTime: "When you use electricity in larger amounts can also be relevant to your savings. Most homeowners use more electricity in the evening when they come home from work but things like when you charge your electric vehicle, heat your pool, or do laundry can shift that time.",
			panelSize: "If you have solar and know how big your solar array is, select that here. Otherwise, you can leave this value where it is."
		}
	]
};
var section4 = {
	title: "Resources",
	resources: [
		{
			name: "Solar generation credits explained",
			link: "https://www.solarunitedneighbors.org/texas/learn-the-issues-in-texas/net-metering-in-texas/",
			text: "Learn more about how solar is valued in Texas"
		},
		{
			name: "Find the right retail plan",
			link: "https://www.texaspowerguide.com/solar-electric-plan-analysis/",
			text: "Maximize your solar savings by using this free tool to help you decide which retail plan on the market is the best fit for you and your energy usage."
		},
		{
			name: "Learn about Smart Meter Texas",
			link: "https://www.resource3.com",
			text: ""
		}
	]
};
var footer = {
};
var docs = {
	navigation: navigation,
	hero: hero,
	section1: section1,
	section2: section2,
	section3: section3,
	section4: section4,
	footer: footer
};

/* src/App.svelte generated by Svelte v3.38.2 */

const App = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	const module = new runtime_js.Runtime().module(notebook__default['default']);
	let solarUtils = { loaded: false };

	onMount(async () => {
		let cells = [
			"months",
			"generateMonthlyData",
			"generateMeanData",
			"generateMonthlyBills",
			"generateAnnualBills"
		];

		cells.forEach(async (cellName, i) => {
			solarUtils[cellName] = await module.value(cellName);
			solarUtils.loaded = Object.keys(solarUtils).length === cells.length + 1;
		});
	});

	return `${validate_component(Head, "Head").$$render($$result, {}, {}, {})}

<div class="${"app-container"}">${validate_component(Hero, "Hero").$$render($$result, {}, {}, {})}
  ${validate_component(Nav, "Nav").$$render($$result, {}, {}, {})}
  ${validate_component(Summary, "Summary").$$render($$result, {}, {}, {})}
  ${validate_component(WalkThrough, "WalkThrough").$$render($$result, { sectionText: docs.section2, solarUtils }, {}, {})}
  ${validate_component(PlanComparison, "PlanComparison").$$render($$result, { sectionText: docs.section3, solarUtils }, {}, {})}
  ${validate_component(Resources, "Resources").$$render($$result, {}, {}, {})}
</div>`;
});

module.exports = App;

'use client';
import './command-palette.css';
import { Modal as e } from "./modal.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import * as r from "react";
import { useEffect as i } from "react";
import * as a from "@radix-ui/react-dialog";
import { Primitive as o } from "@radix-ui/react-primitive";
import { useId as s } from "@radix-ui/react-id";
import { composeRefs as c } from "@radix-ui/react-compose-refs";
//#region node_modules/.pnpm/cmdk@1.1.1_@types+react-dom@19.2.3_@types+react@19.2.14__@types+react@19.2.14_react-dom_774a6dff9510bebce6a2343405a1ca59/node_modules/cmdk/dist/chunk-NZJY6EH4.mjs
var l = 1, u = .9, d = .8, f = .17, p = .1, m = .999, h = .9999, g = .99, _ = /[\\\/_+.#"@\[\(\{&]/, v = /[\\\/_+.#"@\[\(\{&]/g, y = /[\s-]/, b = /[\s-]/g;
function x(e, t, n, r, i, a, o) {
	if (a === t.length) return i === e.length ? l : g;
	var s = `${i},${a}`;
	if (o[s] !== void 0) return o[s];
	for (var c = r.charAt(a), S = n.indexOf(c, i), C = 0, w, T, E, D; S >= 0;) w = x(e, t, n, r, S + 1, a + 1, o), w > C && (S === i ? w *= l : _.test(e.charAt(S - 1)) ? (w *= d, E = e.slice(i, S - 1).match(v), E && i > 0 && (w *= m ** +E.length)) : y.test(e.charAt(S - 1)) ? (w *= u, D = e.slice(i, S - 1).match(b), D && i > 0 && (w *= m ** +D.length)) : (w *= f, i > 0 && (w *= m ** +(S - i))), e.charAt(S) !== t.charAt(a) && (w *= h)), (w < p && n.charAt(S - 1) === r.charAt(a + 1) || r.charAt(a + 1) === r.charAt(a) && n.charAt(S - 1) !== r.charAt(a)) && (T = x(e, t, n, r, S + 1, a + 2, o), T * p > w && (w = T * p)), w > C && (C = w), S = n.indexOf(c, S + 1);
	return o[s] = C, C;
}
function S(e) {
	return e.toLowerCase().replace(b, " ");
}
function C(e, t, n) {
	return e = n && n.length > 0 ? `${e + " " + n.join(" ")}` : e, x(e, t, S(e), S(t), 0, 0, {});
}
//#endregion
//#region node_modules/.pnpm/cmdk@1.1.1_@types+react-dom@19.2.3_@types+react@19.2.14__@types+react@19.2.14_react-dom_774a6dff9510bebce6a2343405a1ca59/node_modules/cmdk/dist/index.mjs
var w = "[cmdk-group=\"\"]", T = "[cmdk-group-items=\"\"]", E = "[cmdk-group-heading=\"\"]", D = "[cmdk-item=\"\"]", O = `${D}:not([aria-disabled="true"])`, k = "cmdk-item-select", A = "data-value", ee = (e, t, n) => C(e, t, n), j = r.createContext(void 0), M = () => r.useContext(j), N = r.createContext(void 0), P = () => r.useContext(N), F = r.createContext(void 0), I = r.forwardRef((e, t) => {
	let n = J(() => ({
		search: "",
		value: e.value ?? e.defaultValue ?? "",
		selectedItemId: void 0,
		filtered: {
			count: 0,
			items: /* @__PURE__ */ new Map(),
			groups: /* @__PURE__ */ new Set()
		}
	})), i = J(() => /* @__PURE__ */ new Set()), a = J(() => /* @__PURE__ */ new Map()), c = J(() => /* @__PURE__ */ new Map()), l = J(() => /* @__PURE__ */ new Set()), u = K(e), { label: d, children: f, value: p, onValueChange: m, filter: h, shouldFilter: g, loop: _, disablePointerSelection: v = !1, vimBindings: y = !0, ...b } = e, x = s(), S = s(), C = s(), M = r.useRef(null), P = re();
	q(() => {
		if (p !== void 0) {
			let e = p.trim();
			n.current.value = e, F.emit();
		}
	}, [p]), q(() => {
		P(6, V);
	}, []);
	let F = r.useMemo(() => ({
		subscribe: (e) => (l.current.add(e), () => l.current.delete(e)),
		snapshot: () => n.current,
		setState: (e, t, r) => {
			var i, a, o;
			if (!Object.is(n.current[e], t)) {
				if (n.current[e] = t, e === "search") B(), R(), P(1, z);
				else if (e === "value") {
					if (document.activeElement.hasAttribute("cmdk-input") || document.activeElement.hasAttribute("cmdk-root")) {
						let e = document.getElementById(C);
						e ? e.focus() : (i = document.getElementById(x)) == null || i.focus();
					}
					if (P(7, () => {
						n.current.selectedItemId = H()?.id, F.emit();
					}), r || P(5, V), u.current?.value !== void 0) {
						let e = t ?? "";
						(o = (a = u.current).onValueChange) == null || o.call(a, e);
						return;
					}
				}
				F.emit();
			}
		},
		emit: () => {
			l.current.forEach((e) => e());
		}
	}), []), I = r.useMemo(() => ({
		value: (e, t, r) => {
			t !== c.current.get(e)?.value && (c.current.set(e, {
				value: t,
				keywords: r
			}), n.current.filtered.items.set(e, L(t, r)), P(2, () => {
				R(), F.emit();
			}));
		},
		item: (e, t) => (i.current.add(e), t && (a.current.has(t) ? a.current.get(t).add(e) : a.current.set(t, new Set([e]))), P(3, () => {
			B(), R(), n.current.value || z(), F.emit();
		}), () => {
			c.current.delete(e), i.current.delete(e), n.current.filtered.items.delete(e);
			let t = H();
			P(4, () => {
				B(), t?.getAttribute("id") === e && z(), F.emit();
			});
		}),
		group: (e) => (a.current.has(e) || a.current.set(e, /* @__PURE__ */ new Set()), () => {
			c.current.delete(e), a.current.delete(e);
		}),
		filter: () => u.current.shouldFilter,
		label: d || e["aria-label"],
		getDisablePointerSelection: () => u.current.disablePointerSelection,
		listId: x,
		inputId: C,
		labelId: S,
		listInnerRef: M
	}), []);
	function L(e, t) {
		let r = u.current?.filter ?? ee;
		return e ? r(e, n.current.search, t) : 0;
	}
	function R() {
		if (!n.current.search || u.current.shouldFilter === !1) return;
		let e = n.current.filtered.items, t = [];
		n.current.filtered.groups.forEach((n) => {
			let r = a.current.get(n), i = 0;
			r.forEach((t) => {
				let n = e.get(t);
				i = Math.max(n, i);
			}), t.push([n, i]);
		});
		let r = M.current;
		U().sort((t, n) => {
			let r = t.getAttribute("id"), i = n.getAttribute("id");
			return (e.get(i) ?? 0) - (e.get(r) ?? 0);
		}).forEach((e) => {
			let t = e.closest(T);
			t ? t.appendChild(e.parentElement === t ? e : e.closest(`${T} > *`)) : r.appendChild(e.parentElement === r ? e : e.closest(`${T} > *`));
		}), t.sort((e, t) => t[1] - e[1]).forEach((e) => {
			let t = M.current?.querySelector(`${w}[${A}="${encodeURIComponent(e[0])}"]`);
			t?.parentElement.appendChild(t);
		});
	}
	function z() {
		let e = U().find((e) => e.getAttribute("aria-disabled") !== "true")?.getAttribute(A);
		F.setState("value", e || void 0);
	}
	function B() {
		if (!n.current.search || u.current.shouldFilter === !1) {
			n.current.filtered.count = i.current.size;
			return;
		}
		n.current.filtered.groups = /* @__PURE__ */ new Set();
		let e = 0;
		for (let t of i.current) {
			let r = L(c.current.get(t)?.value ?? "", c.current.get(t)?.keywords ?? []);
			n.current.filtered.items.set(t, r), r > 0 && e++;
		}
		for (let [e, t] of a.current) for (let r of t) if (n.current.filtered.items.get(r) > 0) {
			n.current.filtered.groups.add(e);
			break;
		}
		n.current.filtered.count = e;
	}
	function V() {
		var e;
		let t = H();
		t && (t.parentElement?.firstChild === t && ((e = t.closest(w)?.querySelector(E)) == null || e.scrollIntoView({ block: "nearest" })), t.scrollIntoView({ block: "nearest" }));
	}
	function H() {
		return M.current?.querySelector(`${D}[aria-selected="true"]`);
	}
	function U() {
		return Array.from(M.current?.querySelectorAll(O) || []);
	}
	function W(e) {
		let t = U()[e];
		t && F.setState("value", t.getAttribute(A));
	}
	function G(e) {
		var t;
		let n = H(), r = U(), i = r.findIndex((e) => e === n), a = r[i + e];
		(t = u.current) != null && t.loop && (a = i + e < 0 ? r[r.length - 1] : i + e === r.length ? r[0] : r[i + e]), a && F.setState("value", a.getAttribute(A));
	}
	function Y(e) {
		let t = H()?.closest(w), n;
		for (; t && !n;) t = e > 0 ? te(t, w) : ne(t, w), n = t?.querySelector(O);
		n ? F.setState("value", n.getAttribute(A)) : G(e);
	}
	let X = () => W(U().length - 1), Z = (e) => {
		e.preventDefault(), e.metaKey ? X() : e.altKey ? Y(1) : G(1);
	}, $ = (e) => {
		e.preventDefault(), e.metaKey ? W(0) : e.altKey ? Y(-1) : G(-1);
	};
	return r.createElement(o.div, {
		ref: t,
		tabIndex: -1,
		...b,
		"cmdk-root": "",
		onKeyDown: (e) => {
			var t;
			(t = b.onKeyDown) == null || t.call(b, e);
			let n = e.nativeEvent.isComposing || e.keyCode === 229;
			if (!(e.defaultPrevented || n)) switch (e.key) {
				case "n":
				case "j":
					y && e.ctrlKey && Z(e);
					break;
				case "ArrowDown":
					Z(e);
					break;
				case "p":
				case "k":
					y && e.ctrlKey && $(e);
					break;
				case "ArrowUp":
					$(e);
					break;
				case "Home":
					e.preventDefault(), W(0);
					break;
				case "End":
					e.preventDefault(), X();
					break;
				case "Enter": {
					e.preventDefault();
					let t = H();
					if (t) {
						let e = new Event(k);
						t.dispatchEvent(e);
					}
				}
			}
		}
	}, r.createElement("label", {
		"cmdk-label": "",
		htmlFor: I.inputId,
		id: I.labelId,
		style: ie
	}, d), Q(e, (e) => r.createElement(N.Provider, { value: F }, r.createElement(j.Provider, { value: I }, e))));
}), L = r.forwardRef((e, t) => {
	let n = s(), i = r.useRef(null), a = r.useContext(F), l = M(), u = K(e), d = u.current?.forceMount ?? a?.forceMount;
	q(() => {
		if (!d) return l.item(n, a?.id);
	}, [d]);
	let f = X(n, i, [
		e.value,
		e.children,
		i
	], e.keywords), p = P(), m = Y((e) => e.value && e.value === f.current), h = Y((e) => d || l.filter() === !1 ? !0 : e.search ? e.filtered.items.get(n) > 0 : !0);
	r.useEffect(() => {
		let t = i.current;
		if (!(!t || e.disabled)) return t.addEventListener(k, g), () => t.removeEventListener(k, g);
	}, [
		h,
		e.onSelect,
		e.disabled
	]);
	function g() {
		var e, t;
		_(), (t = (e = u.current).onSelect) == null || t.call(e, f.current);
	}
	function _() {
		p.setState("value", f.current, !0);
	}
	if (!h) return null;
	let { disabled: v, value: y, onSelect: b, forceMount: x, keywords: S, ...C } = e;
	return r.createElement(o.div, {
		ref: c(i, t),
		...C,
		id: n,
		"cmdk-item": "",
		role: "option",
		"aria-disabled": !!v,
		"aria-selected": !!m,
		"data-disabled": !!v,
		"data-selected": !!m,
		onPointerMove: v || l.getDisablePointerSelection() ? void 0 : _,
		onClick: v ? void 0 : g
	}, e.children);
}), R = r.forwardRef((e, t) => {
	let { heading: n, children: i, forceMount: a, ...l } = e, u = s(), d = r.useRef(null), f = r.useRef(null), p = s(), m = M(), h = Y((e) => a || m.filter() === !1 ? !0 : e.search ? e.filtered.groups.has(u) : !0);
	q(() => m.group(u), []), X(u, d, [
		e.value,
		e.heading,
		f
	]);
	let g = r.useMemo(() => ({
		id: u,
		forceMount: a
	}), [a]);
	return r.createElement(o.div, {
		ref: c(d, t),
		...l,
		"cmdk-group": "",
		role: "presentation",
		hidden: h ? void 0 : !0
	}, n && r.createElement("div", {
		ref: f,
		"cmdk-group-heading": "",
		"aria-hidden": !0,
		id: p
	}, n), Q(e, (e) => r.createElement("div", {
		"cmdk-group-items": "",
		role: "group",
		"aria-labelledby": n ? p : void 0
	}, r.createElement(F.Provider, { value: g }, e))));
}), z = r.forwardRef((e, t) => {
	let { alwaysRender: n, ...i } = e, a = r.useRef(null), s = Y((e) => !e.search);
	return !n && !s ? null : r.createElement(o.div, {
		ref: c(a, t),
		...i,
		"cmdk-separator": "",
		role: "separator"
	});
}), B = r.forwardRef((e, t) => {
	let { onValueChange: n, ...i } = e, a = e.value != null, s = P(), c = Y((e) => e.search), l = Y((e) => e.selectedItemId), u = M();
	return r.useEffect(() => {
		e.value != null && s.setState("search", e.value);
	}, [e.value]), r.createElement(o.input, {
		ref: t,
		...i,
		"cmdk-input": "",
		autoComplete: "off",
		autoCorrect: "off",
		spellCheck: !1,
		"aria-autocomplete": "list",
		role: "combobox",
		"aria-expanded": !0,
		"aria-controls": u.listId,
		"aria-labelledby": u.labelId,
		"aria-activedescendant": l,
		id: u.inputId,
		type: "text",
		value: a ? e.value : c,
		onChange: (e) => {
			a || s.setState("search", e.target.value), n?.(e.target.value);
		}
	});
}), V = r.forwardRef((e, t) => {
	let { children: n, label: i = "Suggestions", ...a } = e, s = r.useRef(null), l = r.useRef(null), u = Y((e) => e.selectedItemId), d = M();
	return r.useEffect(() => {
		if (l.current && s.current) {
			let e = l.current, t = s.current, n, r = new ResizeObserver(() => {
				n = requestAnimationFrame(() => {
					let n = e.offsetHeight;
					t.style.setProperty("--cmdk-list-height", n.toFixed(1) + "px");
				});
			});
			return r.observe(e), () => {
				cancelAnimationFrame(n), r.unobserve(e);
			};
		}
	}, []), r.createElement(o.div, {
		ref: c(s, t),
		...a,
		"cmdk-list": "",
		role: "listbox",
		tabIndex: -1,
		"aria-activedescendant": u,
		"aria-label": i,
		id: d.listId
	}, Q(e, (e) => r.createElement("div", {
		ref: c(l, d.listInnerRef),
		"cmdk-list-sizer": ""
	}, e)));
}), H = r.forwardRef((e, t) => {
	let { open: n, onOpenChange: i, overlayClassName: o, contentClassName: s, container: c, ...l } = e;
	return r.createElement(a.Root, {
		open: n,
		onOpenChange: i
	}, r.createElement(a.Portal, { container: c }, r.createElement(a.Overlay, {
		"cmdk-overlay": "",
		className: o
	}), r.createElement(a.Content, {
		"aria-label": e.label,
		"cmdk-dialog": "",
		className: s
	}, r.createElement(I, {
		ref: t,
		...l
	}))));
}), U = r.forwardRef((e, t) => Y((e) => e.filtered.count === 0) ? r.createElement(o.div, {
	ref: t,
	...e,
	"cmdk-empty": "",
	role: "presentation"
}) : null), W = r.forwardRef((e, t) => {
	let { progress: n, children: i, label: a = "Loading...", ...s } = e;
	return r.createElement(o.div, {
		ref: t,
		...s,
		"cmdk-loading": "",
		role: "progressbar",
		"aria-valuenow": n,
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		"aria-label": a
	}, Q(e, (e) => r.createElement("div", { "aria-hidden": !0 }, e)));
}), G = Object.assign(I, {
	List: V,
	Item: L,
	Input: B,
	Group: R,
	Separator: z,
	Dialog: H,
	Empty: U,
	Loading: W
});
function te(e, t) {
	let n = e.nextElementSibling;
	for (; n;) {
		if (n.matches(t)) return n;
		n = n.nextElementSibling;
	}
}
function ne(e, t) {
	let n = e.previousElementSibling;
	for (; n;) {
		if (n.matches(t)) return n;
		n = n.previousElementSibling;
	}
}
function K(e) {
	let t = r.useRef(e);
	return q(() => {
		t.current = e;
	}), t;
}
var q = typeof window > "u" ? r.useEffect : r.useLayoutEffect;
function J(e) {
	let t = r.useRef();
	return t.current === void 0 && (t.current = e()), t;
}
function Y(e) {
	let t = P(), n = () => e(t.snapshot());
	return r.useSyncExternalStore(t.subscribe, n, n);
}
function X(e, t, n, i = []) {
	let a = r.useRef(), o = M();
	return q(() => {
		var r;
		let s = (() => {
			for (let e of n) {
				if (typeof e == "string") return e.trim();
				if (typeof e == "object" && "current" in e) return e.current ? e.current.textContent?.trim() : a.current;
			}
		})(), c = i.map((e) => e.trim());
		o.value(e, s, c), (r = t.current) == null || r.setAttribute(A, s), a.current = s;
	}), a;
}
var re = () => {
	let [e, t] = r.useState(), n = J(() => /* @__PURE__ */ new Map());
	return q(() => {
		n.current.forEach((e) => e()), n.current = /* @__PURE__ */ new Map();
	}, [e]), (e, r) => {
		n.current.set(e, r), t({});
	};
};
function Z(e) {
	let t = e.type;
	return typeof t == "function" ? t(e.props) : "render" in t ? t.render(e.props) : e;
}
function Q({ asChild: e, children: t }, n) {
	return e && r.isValidElement(t) ? r.cloneElement(Z(t), { ref: t.ref }, n(t.props.children)) : n(t);
}
var ie = {
	position: "absolute",
	width: "1px",
	height: "1px",
	padding: "0",
	margin: "-1px",
	overflow: "hidden",
	clip: "rect(0, 0, 0, 0)",
	whiteSpace: "nowrap",
	borderWidth: "0"
};
//#endregion
//#region src/stories/molecules/CommandPalette/CommandPalette.tsx
function $({ open: r, onOpenChange: a, groups: o, title: s, placeholder: c, emptyLabel: l, listLabel: u, closeLabel: d, shortcut: f = "k", className: p }) {
	i(() => {
		if (f === !1) return;
		let e = (e) => {
			e.key.toLowerCase() === f && (e.metaKey || e.ctrlKey) && (e.preventDefault(), a(!r));
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		f,
		r,
		a
	]);
	let m = o.filter((e) => e.items.length > 0);
	return /* @__PURE__ */ t(e, {
		open: r,
		onClose: () => a(!1),
		title: s,
		...d ? { closeLabel: d } : {},
		children: /* @__PURE__ */ n(G, {
			className: ["command-palette", p].filter(Boolean).join(" "),
			children: [/* @__PURE__ */ t(G.Input, {
				className: "command-palette__input",
				placeholder: c,
				autoFocus: !0
			}), /* @__PURE__ */ n(G.List, {
				className: "command-palette__list",
				label: u,
				children: [/* @__PURE__ */ t(G.Empty, {
					className: "command-palette__empty",
					children: /* @__PURE__ */ t("span", {
						role: "status",
						children: l
					})
				}), m.map((e) => /* @__PURE__ */ t(G.Group, {
					className: "command-palette__group",
					heading: e.heading,
					children: e.items.map((e) => /* @__PURE__ */ n(G.Item, {
						className: "command-palette__item",
						value: e.label,
						keywords: e.keywords,
						disabled: e.disabled,
						onSelect: () => {
							a(!1), e.onSelect();
						},
						children: [e.icon && /* @__PURE__ */ t("span", {
							className: "command-palette__item-icon",
							"aria-hidden": "true",
							children: e.icon
						}), e.label]
					}, e.id))
				}, e.id))]
			})]
		})
	});
}
//#endregion
export { $ as CommandPalette };

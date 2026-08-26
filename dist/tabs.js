'use client';
import './tabs.css';
import { t as e } from "./_shared/useControlled.js";
import { c as t, m as n, p as r, s as i, t as a } from "./_shared/useRenderElement.js";
import { A as o, L as s, R as c, x as l } from "./_shared/floating-ui.utils.dom.js";
import { n as u, r as d } from "./_shared/useCompositeListItem.js";
import { t as f } from "./_shared/DirectionContext.js";
import { t as p } from "./_shared/useBaseUiId.js";
import { t as m } from "./_shared/isElementDisabled.js";
import { n as h, t as g } from "./_shared/useButton.js";
import { C as _, S as v, t as y } from "./_shared/owner.js";
import { a as b, c as x, i as S, l as C, n as w, o as T, r as E, s as D, t as O } from "./_shared/composite.js";
import { a as k, d as A, f as j, h as M, i as N, l as P, m as F, n as I, o as L, p as R, r as z, t as B, u as ee } from "./_shared/composite2.js";
import { t as V } from "./_shared/useCompositeItem.js";
import * as H from "react";
import { jsx as U } from "react/jsx-runtime";
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/tabs/root/TabsRootContext.js
var W = /* @__PURE__ */ H.createContext(void 0);
process.env.NODE_ENV !== "production" && (W.displayName = "TabsRootContext");
function G() {
	let e = H.useContext(W);
	if (e === void 0) throw Error(process.env.NODE_ENV === "production" ? n(64) : "Base UI: TabsRootContext is missing. Tabs parts must be placed within <Tabs.Root>.");
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/tabs/root/TabsRootDataAttributes.js
var K = /* @__PURE__ */ function(e) {
	return e.activationDirection = "data-activation-direction", e.orientation = "data-orientation", e;
}({}), q = { tabActivationDirection: (e) => ({ [K.activationDirection]: e }) }, J = /* @__PURE__ */ H.forwardRef(function(t, n) {
	let { className: r, defaultValue: i = 0, onValueChange: o, orientation: s = "horizontal", render: l, value: u, ...p } = t, m = f(), h = H.useRef([]), [g, _] = H.useState(() => /* @__PURE__ */ new Map()), [v, y] = e({
		controlled: u,
		default: i,
		name: "Tabs",
		state: "value"
	}), [b, x] = H.useState(() => /* @__PURE__ */ new Map()), [S, C] = H.useState("none"), w = c((e, t) => {
		o?.(e, t), !t.isCanceled && (y(e), C(t.activationDirection));
	}), T = c((e, t) => {
		_((n) => {
			if (n.get(e) === t) return n;
			let r = new Map(n);
			return r.set(e, t), r;
		});
	}), E = c((e, t) => {
		_((n) => {
			if (!n.has(e) || n.get(e) !== t) return n;
			let r = new Map(n);
			return r.delete(e), r;
		});
	}), D = H.useCallback((e) => g.get(e), [g]), O = H.useCallback((e) => {
		for (let t of b.values()) if (e === t?.value) return t?.id;
	}, [b]), k = H.useCallback((e) => {
		if (e === void 0) return null;
		for (let [t, n] of b.entries()) if (n != null && e === (n.value ?? n.index)) return t;
		return null;
	}, [b]), A = H.useMemo(() => ({
		direction: m,
		getTabElementBySelectedValue: k,
		getTabIdByPanelValue: O,
		getTabPanelIdByValue: D,
		onValueChange: w,
		orientation: s,
		registerMountedTabPanel: T,
		setTabMap: x,
		unregisterMountedTabPanel: E,
		tabActivationDirection: S,
		value: v
	}), [
		m,
		k,
		O,
		D,
		w,
		s,
		T,
		x,
		E,
		S,
		v
	]), j = a("div", t, {
		state: {
			orientation: s,
			tabActivationDirection: S
		},
		ref: n,
		props: p,
		stateAttributesMapping: q
	});
	return /* @__PURE__ */ U(W.Provider, {
		value: A,
		children: /* @__PURE__ */ U(d, {
			elementsRef: h,
			children: j
		})
	});
});
process.env.NODE_ENV !== "production" && (J.displayName = "TabsRoot");
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/composite/constants.js
var te = "data-composite-item-active", Y = /* @__PURE__ */ H.createContext(void 0);
process.env.NODE_ENV !== "production" && (Y.displayName = "TabsListContext");
function ne() {
	let e = H.useContext(Y);
	if (e === void 0) throw Error(process.env.NODE_ENV === "production" ? n(65) : "Base UI: TabsListContext is missing. TabsList parts must be placed within <Tabs.List>.");
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/tabs/tab/TabsTab.js
var X = /* @__PURE__ */ H.forwardRef(function(e, t) {
	let { className: n, disabled: r = !1, render: i, value: c, id: u, nativeButton: d = !0, ...f } = e, { value: m, getTabPanelIdByValue: h, orientation: b } = G(), { activateOnFocus: x, highlightedTabIndex: S, onTabActivation: C, setHighlightedTabIndex: w, tabsListElement: T } = ne(), E = p(u), { compositeProps: D, compositeRef: O, index: k } = V({ metadata: H.useMemo(() => ({
		disabled: r,
		id: E,
		value: c
	}), [
		r,
		E,
		c
	]) }), A = c === m, j = H.useRef(!1);
	s(() => {
		if (j.current) {
			j.current = !1;
			return;
		}
		if (!(A && k > -1 && S !== k)) return;
		let e = T;
		if (e != null) {
			let t = v(y(e));
			if (t && _(e, t)) return;
		}
		w(k);
	}, [
		A,
		k,
		S,
		w,
		r,
		T
	]);
	let { getButtonProps: M, buttonRef: N } = g({
		disabled: r,
		native: d,
		focusableWhenDisabled: !0
	}), P = h(c), F = H.useRef(!1), I = H.useRef(!1);
	function L(e) {
		A || r || C(c, l(o, e.nativeEvent, void 0, { activationDirection: "none" }));
	}
	function R(e) {
		A || (k > -1 && w(k), !r && x && (!F.current || F.current && I.current) && C(c, l(o, e.nativeEvent, void 0, { activationDirection: "none" })));
	}
	function z(e) {
		if (A || r) return;
		F.current = !0;
		function t() {
			F.current = !1, I.current = !1;
		}
		(!e.button || e.button === 0) && (I.current = !0, y(e.currentTarget).addEventListener("pointerup", t, { once: !0 }));
	}
	return a("button", e, {
		state: H.useMemo(() => ({
			disabled: r,
			active: A,
			orientation: b
		}), [
			r,
			A,
			b
		]),
		ref: [
			t,
			N,
			O
		],
		props: [
			D,
			{
				role: "tab",
				"aria-controls": P,
				"aria-selected": A,
				id: E,
				onClick: L,
				onFocus: R,
				onPointerDown: z,
				[te]: A ? "" : void 0,
				onKeyDownCapture() {
					j.current = !0;
				}
			},
			f,
			M
		]
	});
});
process.env.NODE_ENV !== "production" && (X.displayName = "TabsTab");
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/tabs/panel/TabsPanelDataAttributes.js
var re = /* @__PURE__ */ function(e) {
	return e.index = "data-index", e.activationDirection = "data-activation-direction", e.orientation = "data-orientation", e.hidden = "data-hidden", e;
}({}), Z = /* @__PURE__ */ H.forwardRef(function(e, t) {
	let { className: n, value: r, render: i, keepMounted: o = !1, ...c } = e, { value: l, getTabIdByPanelValue: d, orientation: f, tabActivationDirection: m, registerMountedTabPanel: h, unregisterMountedTabPanel: g } = G(), _ = p(), { ref: v, index: y } = u({ metadata: H.useMemo(() => ({
		id: _,
		value: r
	}), [_, r]) }), b = r !== l, x = d(r), S = a("div", e, {
		state: H.useMemo(() => ({
			hidden: b,
			orientation: f,
			tabActivationDirection: m
		}), [
			b,
			f,
			m
		]),
		ref: [t, v],
		props: [{
			"aria-labelledby": x,
			hidden: b,
			id: _ ?? void 0,
			role: "tabpanel",
			tabIndex: b ? -1 : 0,
			[re.index]: y
		}, c],
		stateAttributesMapping: q
	});
	return s(() => {
		if (!(b && !o) && _ != null) return h(r, _), () => {
			g(r, _);
		};
	}, [
		b,
		o,
		r,
		_,
		h,
		g
	]), !b || o ? S : null;
});
process.env.NODE_ENV !== "production" && (Z.displayName = "TabsPanel");
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/composite/root/useCompositeRoot.js
var ie = [];
function ae(e) {
	let { itemSizes: t, cols: n = 1, loopFocus: i = !0, dense: a = !1, orientation: o = "both", direction: s, highlightedIndex: l, onHighlightedIndexChange: u, rootRef: d, enableHomeAndEndKeys: f = !1, stopEventPropagation: p = !1, disabledIndices: h, modifierKeys: g = ie } = e, [_, v] = H.useState(0), y = n > 1, A = H.useRef(null), V = r(A, d), U = H.useRef([]), W = H.useRef(!1), G = l ?? _, K = c((e, t = !1) => {
		if ((u ?? v)(e), t) {
			let t = U.current[e];
			M(A.current, t, s, o);
		}
	}), q = c((e) => {
		if (e.size === 0 || W.current) return;
		W.current = !0;
		let t = Array.from(e.keys()), n = t.find((e) => e?.hasAttribute("data-composite-item-active")) ?? null, r = n ? t.indexOf(n) : -1;
		r !== -1 && K(r), M(A.current, n, s, o);
	}), J = H.useMemo(() => ({
		"aria-orientation": o === "both" ? void 0 : o,
		ref: V,
		onFocus(e) {
			!A.current || !F(e.target) || e.target.setSelectionRange(0, e.target.value.length ?? 0);
		},
		onKeyDown(e) {
			let r = f ? B : z;
			if (!r.has(e.key) || oe(e, g) || !A.current) return;
			let c = s === "rtl", l = c ? N : k, u = {
				horizontal: l,
				vertical: I,
				both: l
			}[o], d = c ? k : N, _ = {
				horizontal: d,
				vertical: L,
				both: d
			}[o];
			if (F(e.target) && !m(e.target)) {
				let t = e.target.selectionStart, n = e.target.selectionEnd, r = e.target.value ?? "";
				if (t == null || e.shiftKey || t !== n || e.key !== _ && t < r.length || e.key !== u && t > 0) return;
			}
			let v = G, M = D(U, h), V = T(U, h);
			if (y) {
				let r = t || Array.from({ length: U.current.length }, () => ({
					width: 1,
					height: 1
				})), s = O(r, n, a), l = s.findIndex((e) => e != null && !C(U, e, h)), u = s.reduce((e, t, n) => t != null && !C(U, t, h) ? n : e, -1);
				v = s[b({ current: s.map((e) => e ? U.current[e] : null) }, {
					event: e,
					orientation: o,
					loopFocus: i,
					cols: n,
					disabledIndices: S([...h || U.current.map((e, t) => C(U, t) ? t : void 0), void 0], s),
					minIndex: l,
					maxIndex: u,
					prevIndex: E(G > V ? M : G, r, s, n, e.key === "ArrowDown" ? "bl" : e.key === "ArrowRight" ? "tr" : "tl"),
					rtl: c
				})];
			}
			let H = {
				horizontal: [l],
				vertical: [I],
				both: [l, I]
			}[o], W = {
				horizontal: [d],
				vertical: [L],
				both: [d, L]
			}[o], q = y ? r : {
				horizontal: f ? ee : P,
				vertical: f ? R : j,
				both: r
			}[o];
			f && (e.key === "Home" ? v = M : e.key === "End" && (v = V)), v === G && (H.includes(e.key) || W.includes(e.key)) && (v = i && v === V && H.includes(e.key) ? M : i && v === M && W.includes(e.key) ? V : w(U, {
				startingIndex: v,
				decrement: W.includes(e.key),
				disabledIndices: h
			})), v !== G && !x(U, v) && (p && e.stopPropagation(), q.has(e.key) && e.preventDefault(), K(v, !0), queueMicrotask(() => {
				U.current[v]?.focus();
			}));
		}
	}), [
		n,
		a,
		s,
		h,
		U,
		f,
		G,
		y,
		t,
		i,
		V,
		g,
		K,
		o,
		p
	]);
	return H.useMemo(() => ({
		props: J,
		highlightedIndex: G,
		onHighlightedIndexChange: K,
		elementsRef: U,
		disabledIndices: h,
		onMapChange: q,
		relayKeyboardEvent: J.onKeyDown
	}), [
		J,
		G,
		K,
		U,
		h,
		q
	]);
}
function oe(e, t) {
	for (let n of A.values()) if (!t.includes(n) && e.getModifierState(n)) return !0;
	return !1;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/composite/root/CompositeRoot.js
function se(e) {
	let { render: n, className: r, refs: o = i, props: s = i, state: c = t, stateAttributesMapping: l, highlightedIndex: u, onHighlightedIndexChange: p, orientation: m, dense: g, itemSizes: _, loopFocus: v, cols: y, enableHomeAndEndKeys: b, onMapChange: x, stopEventPropagation: S = !0, rootRef: C, disabledIndices: w, modifierKeys: T, highlightItemOnHover: E = !1, tag: D = "div", ...O } = e, { props: k, highlightedIndex: A, onHighlightedIndexChange: j, elementsRef: M, onMapChange: N, relayKeyboardEvent: P } = ae({
		itemSizes: _,
		cols: y,
		loopFocus: v,
		dense: g,
		orientation: m,
		highlightedIndex: u,
		onHighlightedIndexChange: p,
		rootRef: C,
		stopEventPropagation: S,
		enableHomeAndEndKeys: b,
		direction: f(),
		disabledIndices: w,
		modifierKeys: T
	}), F = a(D, e, {
		state: c,
		ref: o,
		props: [
			k,
			...s,
			O
		],
		stateAttributesMapping: l
	}), I = H.useMemo(() => ({
		highlightedIndex: A,
		onHighlightedIndexChange: j,
		highlightItemOnHover: E,
		relayKeyboardEvent: P
	}), [
		A,
		j,
		E,
		P
	]);
	return /* @__PURE__ */ U(h.Provider, {
		value: I,
		children: /* @__PURE__ */ U(d, {
			elementsRef: M,
			onMapChange: (e) => {
				x?.(e), N(e);
			},
			children: F
		})
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/tabs/list/TabsList.js
var Q = /* @__PURE__ */ H.forwardRef(function(e, t) {
	let { activateOnFocus: n = !1, className: r, loopFocus: a = !0, render: o, ...s } = e, { getTabElementBySelectedValue: l, onValueChange: u, orientation: d, value: f, setTabMap: p, tabActivationDirection: m } = G(), [h, g] = H.useState(0), [_, v] = H.useState(null), y = ce(f, d, _, l), b = c((e, t) => {
		e !== f && (t.activationDirection = y(e), u(e, t));
	}), x = H.useMemo(() => ({
		orientation: d,
		tabActivationDirection: m
	}), [d, m]), S = {
		"aria-orientation": d === "vertical" ? "vertical" : void 0,
		role: "tablist"
	}, C = H.useMemo(() => ({
		activateOnFocus: n,
		highlightedTabIndex: h,
		onTabActivation: b,
		setHighlightedTabIndex: g,
		tabsListElement: _,
		value: f
	}), [
		n,
		h,
		b,
		g,
		_,
		f
	]);
	return /* @__PURE__ */ U(Y.Provider, {
		value: C,
		children: /* @__PURE__ */ U(se, {
			render: o,
			className: r,
			state: x,
			refs: [t, v],
			props: [S, s],
			stateAttributesMapping: q,
			highlightedIndex: h,
			enableHomeAndEndKeys: !0,
			loopFocus: a,
			orientation: d,
			onHighlightedIndexChange: g,
			onMapChange: p,
			disabledIndices: i
		})
	});
});
process.env.NODE_ENV !== "production" && (Q.displayName = "TabsList");
function $(e, t) {
	let { left: n, top: r } = e.getBoundingClientRect(), { left: i, top: a } = t.getBoundingClientRect();
	return {
		left: n - i,
		top: r - a
	};
}
function ce(e, t, n, r) {
	let [i, a] = H.useState(null);
	return s(() => {
		if (e == null || n == null) {
			a(null);
			return;
		}
		let i = r(e);
		if (i == null) {
			a(null);
			return;
		}
		let { left: o, top: s } = $(i, n);
		a(t === "horizontal" ? o : s);
	}, [
		t,
		r,
		n,
		e
	]), H.useCallback((o) => {
		if (o === e) return "none";
		if (o == null) return a(null), "none";
		if (o != null && n != null) {
			let e = r(o);
			if (e != null) {
				let { left: r, top: o } = $(e, n);
				if (i == null) return a(t === "horizontal" ? r : o), "none";
				if (t === "horizontal") {
					if (r < i) return a(r), "left";
					if (r > i) return a(r), "right";
				} else if (o < i) return a(o), "up";
				else if (o > i) return a(o), "down";
			}
		}
		return "none";
	}, [
		r,
		t,
		i,
		n,
		e
	]);
}
//#endregion
//#region src/stories/atoms/Tabs/Tabs.tsx
function le({ orientation: e = "horizontal", className: t, children: n, onValueChange: r, ...i }) {
	return /* @__PURE__ */ U(J, {
		className: ["tabs", t].filter(Boolean).join(" "),
		orientation: e,
		onValueChange: r ? (e) => r(e) : void 0,
		...i,
		children: n
	});
}
function ue({ variant: e = "underline", className: t, children: n }) {
	return /* @__PURE__ */ U(Q, {
		activateOnFocus: !0,
		className: [
			"tabs__list",
			e === "pill" && "tabs__list--pill",
			t
		].filter(Boolean).join(" "),
		children: n
	});
}
function de({ value: e, disabled: t, className: n, children: r }) {
	return /* @__PURE__ */ U(X, {
		value: e,
		disabled: t,
		className: ["tabs__trigger", n].filter(Boolean).join(" "),
		children: r
	});
}
function fe({ value: e, className: t, children: n }) {
	return /* @__PURE__ */ U(Z, {
		value: e,
		className: ["tabs__content", t].filter(Boolean).join(" "),
		children: n
	});
}
//#endregion
export { le as Tabs, fe as TabsContent, ue as TabsList, de as TabsTrigger };

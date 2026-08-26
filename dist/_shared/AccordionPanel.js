import { t as e } from "./useControlled.js";
import { m as t, p as n, t as r } from "./useRenderElement.js";
import { A as i, F as a, L as o, R as s, x as c } from "./floating-ui.utils.dom.js";
import { n as l, r as u } from "./useCompositeListItem.js";
import { t as d } from "./DirectionContext.js";
import { t as f } from "./useBaseUiId.js";
import { a as p, c as m, i as h, l as g, o as _, r as v, t as y, u as b } from "./useOpenChangeComplete.js";
import { t as x } from "./isElementDisabled.js";
import { t as S } from "./useButton.js";
import { o as C } from "./event.js";
import { a as w, c as T, i as E, n as D, o as O } from "./composite2.js";
import * as k from "react";
import { jsx as A } from "react/jsx-runtime";
//#region node_modules/.pnpm/@base-ui-components+utils@0.2.2_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/utils/esm/warn.js
var j;
process.env.NODE_ENV !== "production" && (j = /* @__PURE__ */ new Set());
function M(...e) {
	if (process.env.NODE_ENV !== "production") {
		let t = e.join(" ");
		j.has(t) || (j.add(t), console.warn(`Base UI: ${t}`));
	}
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/accordion/root/AccordionRootContext.js
var N = /* @__PURE__ */ k.createContext(void 0);
process.env.NODE_ENV !== "production" && (N.displayName = "AccordionRootContext");
function P() {
	let e = k.useContext(N);
	if (e === void 0) throw Error(process.env.NODE_ENV === "production" ? t(10) : "Base UI: AccordionRootContext is missing. Accordion parts must be placed within <Accordion.Root>.");
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/accordion/root/AccordionRoot.js
var F = { value: () => null }, I = /* @__PURE__ */ k.forwardRef(function(t, n) {
	let { render: a, className: l, disabled: f = !1, hiddenUntilFound: p, keepMounted: m, loopFocus: h = !0, onValueChange: g, multiple: _ = !1, orientation: v = "vertical", value: y, defaultValue: b, ...x } = t, S = d();
	process.env.NODE_ENV !== "production" && o(() => {
		p && m === !1 && M("The `keepMounted={false}` prop on a Accordion.Root will be ignored when using `hiddenUntilFound` since it requires Panels to remain mounted when closed.");
	}, [p, m]);
	let C = k.useMemo(() => {
		if (y === void 0) return b ?? [];
	}, [y, b]), w = s(g), T = k.useRef([]), [E, D] = e({
		controlled: y,
		default: C,
		name: "Accordion",
		state: "value"
	}), O = s((e, t) => {
		let n = c(i);
		if (!_) {
			let t = E[0] === e ? [] : [e];
			if (w(t, n), n.isCanceled) return;
			D(t);
		} else if (t) {
			let t = E.slice();
			if (t.push(e), w(t, n), n.isCanceled) return;
			D(t);
		} else {
			let t = E.filter((t) => t !== e);
			if (w(t, n), n.isCanceled) return;
			D(t);
		}
	}), j = k.useMemo(() => ({
		value: E,
		disabled: f,
		orientation: v
	}), [
		E,
		f,
		v
	]), P = k.useMemo(() => ({
		accordionItemRefs: T,
		direction: S,
		disabled: f,
		handleValueChange: O,
		hiddenUntilFound: p ?? !1,
		keepMounted: m ?? !1,
		loopFocus: h,
		orientation: v,
		state: j,
		value: E
	}), [
		S,
		f,
		O,
		p,
		m,
		h,
		v,
		j,
		E
	]), I = r("div", t, {
		state: j,
		ref: n,
		props: [{
			dir: S,
			role: "region"
		}, x],
		stateAttributesMapping: F
	});
	return /* @__PURE__ */ A(N.Provider, {
		value: P,
		children: /* @__PURE__ */ A(u, {
			elementsRef: T,
			children: I
		})
	});
});
process.env.NODE_ENV !== "production" && (I.displayName = "AccordionRoot");
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/collapsible/root/useCollapsibleRoot.js
function L(t) {
	let { open: n, defaultOpen: r, onOpenChange: i, disabled: l } = t, u = n !== void 0, [d, m] = e({
		controlled: n,
		default: r,
		name: "Collapsible",
		state: "open"
	}), { mounted: h, setMounted: g, transitionStatus: v } = p(d, !0, !0), [y, b] = k.useState(d), [{ height: x, width: S }, C] = k.useState({
		height: void 0,
		width: void 0
	}), w = f(), [T, E] = k.useState(), D = T ?? w, [O, A] = k.useState(!1), [j, M] = k.useState(!1), N = k.useRef(null), P = k.useRef(null), F = k.useRef(null), I = k.useRef(null), L = _(I, !1), R = s((e) => {
		let t = !d, n = c(a, e.nativeEvent);
		if (i(t, n), n.isCanceled) return;
		let r = I.current;
		P.current === "css-animation" && r != null && r.style.removeProperty("animation-name"), !O && !j && (P.current != null && P.current !== "css-animation" && !h && t && g(!0), P.current === "css-animation" && (!y && t && b(!0), !h && t && g(!0))), m(t), P.current === "none" && h && !t && g(!1);
	});
	return o(() => {
		u && P.current === "none" && !j && !d && g(!1);
	}, [
		u,
		j,
		d,
		n,
		g
	]), k.useMemo(() => ({
		abortControllerRef: N,
		animationTypeRef: P,
		disabled: l,
		handleTrigger: R,
		height: x,
		mounted: h,
		open: d,
		panelId: D,
		panelRef: I,
		runOnceAnimationsFinish: L,
		setDimensions: C,
		setHiddenUntilFound: A,
		setKeepMounted: M,
		setMounted: g,
		setOpen: m,
		setPanelIdState: E,
		setVisible: b,
		transitionDimensionRef: F,
		transitionStatus: v,
		visible: y,
		width: S
	}), [
		N,
		P,
		l,
		R,
		x,
		h,
		d,
		D,
		I,
		L,
		C,
		A,
		M,
		g,
		m,
		b,
		F,
		v,
		y,
		S
	]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/collapsible/root/CollapsibleRootContext.js
var R = /* @__PURE__ */ k.createContext(void 0);
process.env.NODE_ENV !== "production" && (R.displayName = "CollapsibleRootContext");
function z() {
	let e = k.useContext(R);
	if (e === void 0) throw Error(process.env.NODE_ENV === "production" ? t(15) : "Base UI: CollapsibleRootContext is missing. Collapsible parts must be placed within <Collapsible.Root>.");
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/accordion/item/AccordionItemContext.js
var B = /* @__PURE__ */ k.createContext(void 0);
process.env.NODE_ENV !== "production" && (B.displayName = "AccordionItemContext");
function V() {
	let e = k.useContext(B);
	if (e === void 0) throw Error(process.env.NODE_ENV === "production" ? t(9) : "Base UI: AccordionItemContext is missing. Accordion parts must be placed within <Accordion.Item>.");
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/collapsible/panel/CollapsiblePanelDataAttributes.js
var H = function(e) {
	return e.open = "data-open", e.closed = "data-closed", e[e.startingStyle = v.startingStyle] = "startingStyle", e[e.endingStyle = v.endingStyle] = "endingStyle", e;
}({}), U = /* @__PURE__ */ function(e) {
	return e.panelOpen = "data-panel-open", e;
}({}), W = { [H.open]: "" }, G = { [H.closed]: "" }, K = { open(e) {
	return e ? { [U.panelOpen]: "" } : null;
} }, q = { open(e) {
	return e ? W : G;
} }, ee = /* @__PURE__ */ function(e) {
	return e.index = "data-index", e.disabled = "data-disabled", e.open = "data-open", e;
}({}), J = {
	...q,
	index: (e) => Number.isInteger(e) ? { [ee.index]: String(e) } : null,
	...h,
	value: () => null
}, Y = /* @__PURE__ */ k.forwardRef(function(e, t) {
	let { className: i, disabled: a = !1, onOpenChange: o, render: c, value: u, ...d } = e, { ref: p, index: m } = l(), h = n(t, p), { disabled: g, handleValueChange: _, state: v, value: y } = P(), b = f(), x = u ?? b, S = a || g, C = k.useMemo(() => {
		if (!y) return !1;
		for (let e = 0; e < y.length; e += 1) if (y[e] === x) return !0;
		return !1;
	}, [y, x]), w = s((e, t) => {
		o?.(e, t), !t.isCanceled && _(x, e);
	}), T = L({
		open: C,
		onOpenChange: w,
		disabled: S
	}), E = k.useMemo(() => ({
		open: T.open,
		disabled: T.disabled,
		hidden: !T.mounted,
		transitionStatus: T.transitionStatus
	}), [
		T.open,
		T.disabled,
		T.mounted,
		T.transitionStatus
	]), D = k.useMemo(() => ({
		...T,
		onOpenChange: w,
		state: E
	}), [
		T,
		E,
		w
	]), O = k.useMemo(() => ({
		...v,
		index: m,
		disabled: S,
		open: C
	}), [
		S,
		m,
		C,
		v
	]), [j, M] = k.useState(f()), N = k.useMemo(() => ({
		open: C,
		state: O,
		setTriggerId: M,
		triggerId: j
	}), [
		C,
		O,
		M,
		j
	]), F = r("div", e, {
		state: O,
		ref: h,
		props: d,
		stateAttributesMapping: J
	});
	return /* @__PURE__ */ A(R.Provider, {
		value: D,
		children: /* @__PURE__ */ A(B.Provider, {
			value: N,
			children: F
		})
	});
});
process.env.NODE_ENV !== "production" && (Y.displayName = "AccordionItem");
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/accordion/header/AccordionHeader.js
var X = /* @__PURE__ */ k.forwardRef(function(e, t) {
	let { render: n, className: i, ...a } = e, { state: o } = V();
	return r("h3", e, {
		state: o,
		ref: t,
		props: a,
		stateAttributesMapping: J
	});
});
process.env.NODE_ENV !== "production" && (X.displayName = "AccordionHeader");
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/accordion/trigger/AccordionTrigger.js
var te = new Set([
	D,
	O,
	w,
	E,
	T,
	"End"
]);
function ne(e) {
	let { current: t } = e, n = [];
	for (let e = 0; e < t.length; e += 1) {
		let r = t[e];
		if (!x(r)) {
			let e = r?.querySelector("[type=\"button\"]");
			x(e) || n.push(e);
		}
	}
	return n;
}
var Z = /* @__PURE__ */ k.forwardRef(function(e, t) {
	let { disabled: n, className: i, id: a, render: s, nativeButton: c = !0, ...l } = e, { panelId: u, open: d, handleTrigger: f, disabled: p } = z(), m = n ?? p, { getButtonProps: h, buttonRef: g } = S({
		disabled: m,
		focusableWhenDisabled: !0,
		native: c
	}), { accordionItemRefs: _, direction: v, loopFocus: y, orientation: b } = P(), x = v === "rtl", T = b === "horizontal", { state: A, setTriggerId: j, triggerId: M } = V();
	o(() => (a && j(a), () => {
		j(void 0);
	}), [a, j]);
	let N = k.useMemo(() => ({
		"aria-controls": d ? u : void 0,
		"aria-expanded": d,
		disabled: m,
		id: M,
		onClick: f,
		onKeyDown(e) {
			if (!te.has(e.key)) return;
			C(e);
			let t = ne(_), n = t.length - 1, r = -1, i = t.indexOf(e.target);
			function a() {
				r = y ? i + 1 > n ? 0 : i + 1 : Math.min(i + 1, n);
			}
			function o() {
				r = y && i === 0 ? n : i - 1;
			}
			switch (e.key) {
				case D:
					T || a();
					break;
				case O:
					T || o();
					break;
				case w:
					T && (x ? o() : a());
					break;
				case E:
					T && (x ? a() : o());
					break;
				case "Home":
					r = 0;
					break;
				case "End":
					r = n;
					break;
				default: break;
			}
			r > -1 && t[r].focus();
		}
	}), [
		_,
		m,
		f,
		M,
		T,
		x,
		y,
		d,
		u
	]);
	return r("button", e, {
		state: A,
		ref: [t, g],
		props: [
			N,
			l,
			h
		],
		stateAttributesMapping: K
	});
});
process.env.NODE_ENV !== "production" && (Z.displayName = "AccordionTrigger");
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/accordion/root/AccordionRootDataAttributes.js
var re = /* @__PURE__ */ function(e) {
	return e.disabled = "data-disabled", e.orientation = "data-orientation", e;
}({});
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/collapsible/panel/useCollapsiblePanel.js
function ie(e) {
	let { abortControllerRef: t, animationTypeRef: r, externalRef: a, height: l, hiddenUntilFound: u, keepMounted: d, id: f, mounted: p, onOpenChange: h, open: _, panelRef: v, runOnceAnimationsFinish: y, setDimensions: x, setMounted: S, setOpen: C, setVisible: w, transitionDimensionRef: T, visible: E, width: D } = e, O = k.useRef(!1), A = k.useRef(null), j = k.useRef(_), N = k.useRef(_), P = g(), F = k.useMemo(() => r.current === "css-animation" ? !E : !_ && !p, [
		_,
		p,
		E,
		r
	]), I = n(a, v, s((e) => {
		if (!e) return;
		if (r.current == null || T.current == null) {
			let t = getComputedStyle(e), n = t.animationName !== "none" && t.animationName !== "", i = t.transitionDuration !== "0s" && t.transitionDuration !== "";
			n && i ? process.env.NODE_ENV !== "production" && M("CSS transitions and CSS animations both detected on Collapsible or Accordion panel.", "Only one of either animation type should be used.") : t.animationName === "none" && t.transitionDuration !== "0s" ? r.current = "css-transition" : t.animationName !== "none" && t.transitionDuration === "0s" ? r.current = "css-animation" : r.current = "none", e.getAttribute(re.orientation) === "horizontal" || t.transitionProperty.indexOf("width") > -1 ? T.current = "width" : T.current = "height";
		}
		if (r.current !== "css-transition") return;
		(l === void 0 || D === void 0) && (x({
			height: e.scrollHeight,
			width: e.scrollWidth
		}), N.current && e.style.setProperty("transition-duration", "0s"));
		let t = -1, n = -1;
		return t = m.request(() => {
			N.current = !1, n = m.request(() => {
				setTimeout(() => {
					e.style.removeProperty("transition-duration");
				});
			});
		}), () => {
			m.cancel(t), m.cancel(n);
		};
	}));
	return o(() => {
		if (r.current !== "css-transition") return;
		let e = v.current;
		if (!e) return;
		let n = -1;
		if (t.current != null && (t.current.abort(), t.current = null), _) {
			let t = {
				"justify-content": e.style.justifyContent,
				"align-items": e.style.alignItems,
				"align-content": e.style.alignContent,
				"justify-items": e.style.justifyItems
			};
			Object.keys(t).forEach((t) => {
				e.style.setProperty(t, "initial", "important");
			}), !N.current && !d && e.setAttribute(H.startingStyle, ""), x({
				height: e.scrollHeight,
				width: e.scrollWidth
			}), n = m.request(() => {
				Object.entries(t).forEach(([t, n]) => {
					n === "" ? e.style.removeProperty(t) : e.style.setProperty(t, n);
				});
			});
		} else {
			if (e.scrollHeight === 0 && e.scrollWidth === 0) return;
			x({
				height: e.scrollHeight,
				width: e.scrollWidth
			});
			let n = new AbortController();
			t.current = n;
			let r = n.signal, i = null, a = H.endingStyle;
			return i = new MutationObserver((o) => {
				o.some((e) => e.type === "attributes" && e.attributeName === a) && (i?.disconnect(), i = null, y(() => {
					x({
						height: 0,
						width: 0
					}), e.style.removeProperty("content-visibility"), S(!1), t.current === n && (t.current = null);
				}, r));
			}), i.observe(e, {
				attributes: !0,
				attributeFilter: [a]
			}), () => {
				i?.disconnect(), P.cancel(), t.current === n && (n.abort(), t.current = null);
			};
		}
		return () => {
			m.cancel(n);
		};
	}, [
		t,
		r,
		P,
		u,
		d,
		p,
		_,
		v,
		y,
		x,
		S
	]), o(() => {
		if (r.current !== "css-animation") return;
		let e = v.current;
		e && (A.current = e.style.animationName || A.current, e.style.setProperty("animation-name", "none"), x({
			height: e.scrollHeight,
			width: e.scrollWidth
		}), !j.current && !O.current && e.style.removeProperty("animation-name"), _ ? (t.current != null && (t.current.abort(), t.current = null), S(!0), w(!0)) : (t.current = new AbortController(), y(() => {
			S(!1), w(!1), t.current = null;
		}, t.current.signal)));
	}, [
		t,
		r,
		_,
		v,
		y,
		x,
		S,
		w,
		E
	]), b(() => {
		let e = m.request(() => {
			j.current = !1;
		});
		return () => m.cancel(e);
	}), o(() => {
		if (!u) return;
		let e = v.current;
		if (!e) return;
		let t = -1, n = -1;
		return _ && O.current && (e.style.transitionDuration = "0s", x({
			height: e.scrollHeight,
			width: e.scrollWidth
		}), t = m.request(() => {
			O.current = !1, n = m.request(() => {
				setTimeout(() => {
					e.style.removeProperty("transition-duration");
				});
			});
		})), () => {
			m.cancel(t), m.cancel(n);
		};
	}, [
		u,
		_,
		v,
		x
	]), o(() => {
		let e = v.current;
		e && u && F && (e.setAttribute("hidden", "until-found"), r.current === "css-transition" && e.setAttribute(H.startingStyle, ""));
	}, [
		u,
		F,
		r,
		v
	]), k.useEffect(function() {
		let e = v.current;
		if (!e) return;
		function t(e) {
			O.current = !0, C(!0), h(!0, c(i, e));
		}
		return e.addEventListener("beforematch", t), () => {
			e.removeEventListener("beforematch", t);
		};
	}, [
		h,
		v,
		C
	]), k.useMemo(() => ({ props: {
		hidden: F,
		id: f,
		ref: I
	} }), [
		F,
		f,
		I
	]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/accordion/panel/AccordionPanelCssVars.js
var Q = /* @__PURE__ */ function(e) {
	return e.accordionPanelHeight = "--accordion-panel-height", e.accordionPanelWidth = "--accordion-panel-width", e;
}({}), $ = /* @__PURE__ */ k.forwardRef(function(e, t) {
	let { className: n, hiddenUntilFound: i, keepMounted: a, id: s, render: c, ...l } = e, { hiddenUntilFound: u, keepMounted: d } = P(), { abortControllerRef: f, animationTypeRef: p, height: m, mounted: h, onOpenChange: g, open: _, panelId: v, panelRef: b, runOnceAnimationsFinish: x, setDimensions: S, setHiddenUntilFound: C, setKeepMounted: w, setMounted: T, setOpen: E, setVisible: D, transitionDimensionRef: O, visible: A, width: j, setPanelIdState: N, transitionStatus: F } = z(), I = i ?? u, L = a ?? d;
	process.env.NODE_ENV !== "production" && o(() => {
		a === !1 && I && M("The `keepMounted={false}` prop on a Accordion.Panel will be ignored when using `contextHiddenUntilFound` on the Panel or the Root since it requires the panel to remain mounted when closed.");
	}, [I, a]), o(() => {
		if (s) return N(s), () => {
			N(void 0);
		};
	}, [s, N]), o(() => {
		C(I);
	}, [C, I]), o(() => {
		w(L);
	}, [w, L]), y({
		open: _ && F === "idle",
		ref: b,
		onComplete() {
			_ && S({
				width: void 0,
				height: void 0
			});
		}
	});
	let { props: R } = ie({
		abortControllerRef: f,
		animationTypeRef: p,
		externalRef: t,
		height: m,
		hiddenUntilFound: I,
		id: s ?? v,
		keepMounted: L,
		mounted: h,
		onOpenChange: g,
		open: _,
		panelRef: b,
		runOnceAnimationsFinish: x,
		setDimensions: S,
		setMounted: T,
		setOpen: E,
		setVisible: D,
		transitionDimensionRef: O,
		visible: A,
		width: j
	}), { state: B, triggerId: H } = V(), U = r("div", e, {
		state: k.useMemo(() => ({
			...B,
			transitionStatus: F
		}), [B, F]),
		ref: [t, b],
		props: [
			R,
			{
				"aria-labelledby": H,
				role: "region",
				style: {
					[Q.accordionPanelHeight]: m === void 0 ? "auto" : `${m}px`,
					[Q.accordionPanelWidth]: j === void 0 ? "auto" : `${j}px`
				}
			},
			l
		],
		stateAttributesMapping: J
	});
	return L || I || !L && h ? U : null;
});
process.env.NODE_ENV !== "production" && ($.displayName = "AccordionPanel");
//#endregion
export { I as a, Y as i, Z as n, X as r, $ as t };

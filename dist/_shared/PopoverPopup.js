import { D as e, E as t, M as n, O as r, a as i, c as a, d as o, f as s, k as c, n as l, o as u, x as d } from "./popupStateMapping.js";
import { a as f, h as p, m, t as h } from "./useRenderElement.js";
import { D as g, L as _, P as v, f as y, x as b } from "./floating-ui.utils.dom.js";
import { t as x } from "./DirectionContext.js";
import { i as S, o as C, t as w, u as T } from "./useOpenChangeComplete.js";
import { s as E } from "./composite2.js";
import { a as D, n as O, r as k, t as A } from "./InternalBackdrop.js";
import { a as j, i as M, n as N, r as P, t as F } from "./useSyncedFloatingRootContext.js";
import { n as I, r as L, t as R } from "./getDisabledMountTransitionStyles.js";
import { t as z } from "./useHoverFloatingInteraction.js";
import { n as B, t as V } from "./useOpenInteractionType.js";
import { t as H } from "./usePopupAutoResize.js";
import { t as U } from "./ToolbarRootContext.js";
import * as W from "react";
import { jsx as G, jsxs as K } from "react/jsx-runtime";
import * as q from "react-dom";
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/popover/root/PopoverRootContext.js
var J = /* @__PURE__ */ W.createContext(void 0);
process.env.NODE_ENV !== "production" && (J.displayName = "PopoverRootContext");
function Y(e) {
	let t = W.useContext(J);
	if (t === void 0 && !e) throw Error(process.env.NODE_ENV === "production" ? m(47) : "Base UI: PopoverRootContext is missing. Popover parts must be placed within <Popover.Root>.");
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/popover/store/PopoverStore.js
function X() {
	return {
		...N(),
		disabled: !1,
		modal: !1,
		instantType: void 0,
		openMethod: null,
		openChangeReason: null,
		titleElementId: void 0,
		descriptionElementId: void 0,
		stickIfOpen: !0,
		nested: !1,
		openOnHover: !1,
		closeDelay: 0
	};
}
var ee = {
	...P,
	disabled: o((e) => e.disabled),
	instantType: o((e) => e.instantType),
	openMethod: o((e) => e.openMethod),
	openChangeReason: o((e) => e.openChangeReason),
	modal: o((e) => e.modal),
	stickIfOpen: o((e) => e.stickIfOpen),
	titleElementId: o((e) => e.titleElementId),
	descriptionElementId: o((e) => e.descriptionElementId),
	openOnHover: o((e) => e.openOnHover),
	closeDelay: o((e) => e.closeDelay)
}, te = class e extends a {
	constructor(e) {
		let t = {
			...X(),
			...e
		};
		t.open && e?.mounted === void 0 && (t.mounted = !0), super(t, {
			popupRef: /* @__PURE__ */ W.createRef(),
			backdropRef: /* @__PURE__ */ W.createRef(),
			internalBackdropRef: /* @__PURE__ */ W.createRef(),
			onOpenChange: void 0,
			onOpenChangeComplete: void 0,
			triggerFocusTargetRef: /* @__PURE__ */ W.createRef(),
			beforeContentFocusGuardRef: /* @__PURE__ */ W.createRef(),
			stickIfOpenTimeout: new n(),
			triggerElements: new u()
		}, ee);
	}
	setOpen = (e, t) => {
		let n = t.reason === v, r = t.reason === "trigger-press" && t.event.detail === 0, i = !e && (t.reason === "escape-key" || t.reason == null);
		if (t.preventUnmountOnClose = () => {
			this.set("preventUnmountingOnClose", !0);
		}, this.context.onOpenChange?.(e, t), t.isCanceled) return;
		let a = {
			open: e,
			nativeEvent: t.event,
			reason: t.reason,
			nested: this.state.nested,
			triggerElement: t.trigger
		};
		this.state.floatingRootContext.context.events?.emit("openchange", a);
		let o = () => {
			let n = {
				open: e,
				openChangeReason: t.reason
			}, r = t.trigger?.id ?? null;
			(r || e) && (n.activeTriggerId = r, n.activeTriggerElement = t.trigger ?? null), this.update(n);
		};
		n ? (this.set("stickIfOpen", !0), this.context.stickIfOpenTimeout.start(500, () => {
			this.set("stickIfOpen", !1);
		}), q.flushSync(o)) : o(), r || i ? this.set("instantType", r ? "click" : "dismiss") : t.reason === "focus-out" ? this.set("instantType", "focus") : this.set("instantType", void 0);
	};
	static useStore(t, n) {
		let r = p(() => t ?? new e(n)).current;
		return T(r.disposeEffect), r;
	}
	disposeEffect = () => this.context.stickIfOpenTimeout.disposeEffect();
};
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/popover/root/PopoverRoot.js
function Z({ props: e }) {
	let { children: t, open: n, defaultOpen: r = !1, onOpenChange: a, onOpenChangeComplete: o, modal: l = !1, handle: u, triggerId: d, defaultTriggerId: f = null } = e, p = te.useStore(u?.store, {
		open: n ?? r,
		modal: l,
		activeTriggerId: d === void 0 ? f : d
	});
	p.useControlledProp("open", n, r), p.useControlledProp("activeTriggerId", d, f);
	let m = p.useState("open"), h = p.useState("positionerElement"), _ = p.useState("payload"), v = p.useState("openChangeReason");
	p.useContextCallback("onOpenChange", a), p.useContextCallback("onOpenChangeComplete", o);
	let { openMethod: y, triggerProps: x, reset: S } = V(m);
	M(p);
	let { forceUnmount: C } = j(m, p, () => {
		p.update({
			stickIfOpen: !0,
			openChangeReason: null
		}), S();
	});
	D(m && l === !0 && v !== "trigger-hover" && y !== "touch", h), W.useEffect(() => {
		m || p.context.stickIfOpenTimeout.clear();
	}, [p, m]);
	let w = W.useCallback((e) => {
		let t = b(e);
		return t.preventUnmountOnClose = () => {
			p.set("preventUnmountingOnClose", !0);
		}, t;
	}, [p]), T = W.useCallback(() => {
		p.setOpen(!1, w(g));
	}, [p, w]);
	W.useImperativeHandle(e.actionsRef, () => ({
		unmount: C,
		close: T
	}), [C, T]);
	let E = F({
		popupStore: p,
		onOpenChange: p.setOpen
	}), { getReferenceProps: O, getFloatingProps: k, getTriggerProps: A } = i([s(E, { outsidePressEvent: {
		mouse: l === "trap-focus" ? "sloppy" : "intentional",
		touch: "sloppy"
	} }), B(E)]), N = W.useMemo(() => O(x), [O, x]), P = W.useMemo(() => A(x), [A, x]), I = W.useMemo(() => k(), [k]);
	p.useSyncedValues({
		modal: l,
		openMethod: y,
		activeTriggerProps: N,
		inactiveTriggerProps: P,
		popupProps: I,
		floatingRootContext: E,
		nested: c() != null
	});
	let L = W.useMemo(() => ({ store: p }), [p]);
	return /* @__PURE__ */ G(J.Provider, {
		value: L,
		children: typeof t == "function" ? t({ payload: _ }) : t
	});
}
function ne(t) {
	return Y(!0) ? /* @__PURE__ */ G(Z, { props: t }) : /* @__PURE__ */ G(e, { children: /* @__PURE__ */ G(Z, { props: t }) });
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/popover/portal/PopoverPortalContext.js
var Q = /* @__PURE__ */ W.createContext(void 0);
process.env.NODE_ENV !== "production" && (Q.displayName = "PopoverPortalContext");
function re() {
	let e = W.useContext(Q);
	if (e === void 0) throw Error(process.env.NODE_ENV === "production" ? m(45) : "Base UI: <Popover.Portal> is missing.");
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/popover/portal/PopoverPortal.js
var ie = /* @__PURE__ */ W.forwardRef(function(e, t) {
	let { keepMounted: n = !1, ...r } = e, { store: i } = Y();
	return i.useState("mounted") || n ? /* @__PURE__ */ G(Q.Provider, {
		value: n,
		children: /* @__PURE__ */ G(d, {
			ref: t,
			...r,
			renderGuards: !1
		})
	}) : null;
});
process.env.NODE_ENV !== "production" && (ie.displayName = "PopoverPortal");
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/popover/positioner/PopoverPositionerContext.js
var $ = /* @__PURE__ */ W.createContext(void 0);
process.env.NODE_ENV !== "production" && ($.displayName = "PopoverPositionerContext");
function ae() {
	let e = W.useContext($);
	if (!e) throw Error(process.env.NODE_ENV === "production" ? m(46) : "Base UI: PopoverPositionerContext is missing. PopoverPositioner parts must be placed within <Popover.Positioner>.");
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/popover/positioner/PopoverPositioner.js
var oe = /* @__PURE__ */ W.forwardRef(function(e, n) {
	let { render: i, className: a, anchor: o, positionMethod: s = "absolute", side: c = "bottom", align: u = "center", sideOffset: d = 0, alignOffset: p = 0, collisionBoundary: m = "clipping-ancestors", collisionPadding: g = 5, arrowPadding: v = 5, sticky: y = !1, disableAnchorTracking: b = !1, collisionAvoidance: x = f, ...S } = e, { store: w } = Y(), T = re(), E = r(), D = w.useState("floatingRootContext"), k = w.useState("mounted"), j = w.useState("open"), M = w.useState("openChangeReason"), N = w.useState("activeTriggerElement"), P = w.useState("modal"), F = w.useState("positionerElement"), z = w.useState("instantType"), B = w.useState("transitionStatus"), V = W.useRef(null), H = C(F, !1, !1), U = I({
		anchor: o,
		floatingRootContext: D,
		positionMethod: s,
		mounted: k,
		side: c,
		sideOffset: d,
		align: u,
		alignOffset: p,
		arrowPadding: v,
		collisionBoundary: m,
		collisionPadding: g,
		sticky: y,
		disableAnchorTracking: b,
		keepMounted: T,
		nodeId: E,
		collisionAvoidance: x,
		adaptiveOrigin: L
	}), q = W.useMemo(() => {
		let e = {};
		return j || (e.pointerEvents = "none"), {
			role: "presentation",
			hidden: !k,
			style: {
				...U.positionerStyles,
				...e
			}
		};
	}, [
		j,
		k,
		U.positionerStyles
	]), J = W.useMemo(() => ({
		props: q,
		...U
	}), [q, U]), X = D?.select("domReferenceElement");
	_(() => {
		let e = X, t = V.current;
		if (e && (V.current = e), t && e && e !== t) {
			w.set("instantType", void 0);
			let e = new AbortController();
			return H(() => {
				w.set("instantType", "trigger-change");
			}, e.signal), () => {
				e.abort();
			};
		}
	}, [
		X,
		H,
		w
	]);
	let ee = W.useMemo(() => ({
		open: j,
		side: J.side,
		align: J.align,
		anchorHidden: J.anchorHidden,
		instant: z
	}), [
		j,
		J.side,
		J.align,
		J.anchorHidden,
		z
	]), te = W.useCallback((e) => {
		w.set("positionerElement", e);
	}, [w]), Z = h("div", e, {
		state: ee,
		props: [
			J.props,
			R(B),
			S
		],
		ref: [n, te],
		stateAttributesMapping: l
	});
	return /* @__PURE__ */ K($.Provider, {
		value: J,
		children: [k && P === !0 && M !== "trigger-hover" && /* @__PURE__ */ G(A, {
			ref: w.context.internalBackdropRef,
			inert: O(!j),
			cutout: N
		}), /* @__PURE__ */ G(t, {
			id: E,
			children: Z
		})]
	});
});
process.env.NODE_ENV !== "production" && (oe.displayName = "PopoverPositioner");
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/popover/popup/PopoverPopup.js
var se = {
	...l,
	...S
}, ce = /* @__PURE__ */ W.forwardRef(function(e, t) {
	let { className: n, render: r, initialFocus: i, finalFocus: a, ...o } = e, { store: s } = Y(), c = ae(), l = U(!0) != null, u = x(), d = s.useState("open"), f = s.useState("openMethod"), p = s.useState("instantType"), m = s.useState("transitionStatus"), g = s.useState("popupProps"), _ = s.useState("titleElementId"), v = s.useState("descriptionElementId"), b = s.useState("modal"), S = s.useState("mounted"), C = s.useState("openChangeReason"), T = s.useState("popupElement"), D = s.useState("payload"), O = s.useState("positionerElement"), A = s.useState("activeTriggerElement"), j = s.useState("floatingRootContext");
	w({
		open: d,
		ref: s.context.popupRef,
		onComplete() {
			d && s.context.onOpenChangeComplete?.(!0);
		}
	});
	let M = s.useState("disabled"), N = s.useState("openOnHover"), P = s.useState("closeDelay");
	z(j, {
		enabled: N && !M,
		closeDelay: P
	});
	function F(e) {
		return e === "touch" ? s.context.popupRef.current : !0;
	}
	let I = i === void 0 ? F : i, L = W.useMemo(() => ({
		open: d,
		side: c.side,
		align: c.align,
		instant: p,
		transitionStatus: m
	}), [
		d,
		c.side,
		c.align,
		p,
		m
	]), B = W.useCallback((e) => {
		s.set("popupElement", e);
	}, [s]);
	function V() {
		j.context.events.emit("measure-layout");
	}
	function K(e, t) {
		j.context.events.emit("measure-layout-complete", {
			previousDimensions: e,
			nextDimensions: t
		});
	}
	H({
		popupElement: T,
		positionerElement: O,
		mounted: S,
		content: D,
		enabled: W.useCallback(() => s.context.triggerElements.size > 1, [s]),
		onMeasureLayout: V,
		onMeasureLayoutComplete: K,
		side: c.side,
		direction: u
	});
	let q = h("div", e, {
		state: L,
		ref: [
			t,
			s.context.popupRef,
			B
		],
		props: [
			g,
			{
				"aria-labelledby": _,
				"aria-describedby": v,
				onKeyDown(e) {
					l && E.has(e.key) && e.stopPropagation();
				}
			},
			R(m),
			o
		],
		stateAttributesMapping: se
	});
	return /* @__PURE__ */ G(k, {
		context: j,
		openInteractionType: f,
		modal: b === "trap-focus",
		disabled: !S || C === "trigger-hover",
		initialFocus: I,
		returnFocus: a,
		restoreFocus: "popup",
		previousFocusableElement: y(A) ? A : void 0,
		nextFocusableElement: s.context.triggerFocusTargetRef,
		beforeContentFocusGuardRef: s.context.beforeContentFocusGuardRef,
		children: q
	});
});
process.env.NODE_ENV !== "production" && (ce.displayName = "PopoverPopup");
//#endregion
export { Y as a, ne as i, oe as n, ie as r, ce as t };

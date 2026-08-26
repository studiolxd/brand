import { M as e, N as t, S as n, a as r, c as i, d as a, f as o, i as s, n as c, o as l } from "./popupStateMapping.js";
import { a as u, h as d, m as f, t as p } from "./useRenderElement.js";
import { A as m, D as h, L as g, P as _, R as v, l as y, w as b, x } from "./floating-ui.utils.dom.js";
import { t as S } from "./DirectionContext.js";
import { t as C } from "./useBaseUiId.js";
import { i as w, t as T } from "./useOpenChangeComplete.js";
import { n as E } from "./event.js";
import { C as D, E as O } from "./owner.js";
import { n as k, r as A, t as j } from "./safePolygon.js";
import { a as M, i as N, n as P, o as F, r as I, t as L } from "./useSyncedFloatingRootContext.js";
import { n as R, r as z, t as B } from "./getDisabledMountTransitionStyles.js";
import { t as ee } from "./useFocus.js";
import { t as te } from "./useHoverFloatingInteraction.js";
import { t as ne } from "./usePopupAutoResize.js";
import * as V from "react";
import { useId as re, useState as ie } from "react";
import { jsx as H, jsxs as U } from "react/jsx-runtime";
import * as W from "react-dom";
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/floating-ui-react/components/FloatingDelayGroup.js
var G = /* @__PURE__ */ V.createContext({
	hasProvider: !1,
	timeoutMs: 0,
	delayRef: { current: 0 },
	initialDelayRef: { current: 0 },
	timeout: new e(),
	currentIdRef: { current: null },
	currentContextRef: { current: null }
});
process.env.NODE_ENV !== "production" && (G.displayName = "FloatingDelayGroupContext");
function ae(e) {
	let { children: n, delay: r, timeoutMs: i = 0 } = e, a = V.useRef(r), o = V.useRef(r), s = V.useRef(null), c = V.useRef(null), l = t();
	return /* @__PURE__ */ H(G.Provider, {
		value: V.useMemo(() => ({
			hasProvider: !0,
			delayRef: a,
			initialDelayRef: o,
			currentIdRef: s,
			timeoutMs: i,
			currentContextRef: c,
			timeout: l
		}), [i, l]),
		children: n
	});
}
function oe(e, t = { open: !1 }) {
	let n = "rootStore" in e ? e.rootStore : e, r = n.useState("floatingId"), { enabled: i = !0, open: a } = t, { currentIdRef: o, delayRef: s, timeoutMs: c, initialDelayRef: l, currentContextRef: u, hasProvider: d, timeout: f } = V.useContext(G), [p, h] = V.useState(!1);
	return g(() => {
		function e() {
			h(!1), u.current?.setIsInstantPhase(!1), o.current = null, u.current = null, s.current = l.current;
		}
		if (i && o.current && !a && o.current === r) {
			if (h(!1), c) return f.start(c, e), () => {
				f.clear();
			};
			e();
		}
	}, [
		i,
		a,
		r,
		o,
		s,
		c,
		l,
		u,
		f
	]), g(() => {
		if (!i || !a) return;
		let e = u.current, t = o.current;
		u.current = {
			onOpenChange: n.setOpen,
			setIsInstantPhase: h
		}, o.current = r, s.current = {
			open: 0,
			close: A(l.current, "close")
		}, t !== null && t !== r ? (f.clear(), h(!0), e?.setIsInstantPhase(!0), e?.onOpenChange(!1, x(m))) : (h(!1), e?.setIsInstantPhase(!1));
	}, [
		i,
		a,
		r,
		n,
		o,
		s,
		c,
		l,
		u,
		f
	]), g(() => () => {
		u.current = null;
	}, [u]), V.useMemo(() => ({
		hasProvider: d,
		delayRef: s,
		isInstantPhase: p
	}), [
		d,
		s,
		p
	]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/floating-ui-react/hooks/useClientPoint.js
function se(e, t) {
	let n = null, r = null, i = !1;
	return {
		contextElement: e || void 0,
		getBoundingClientRect() {
			let a = e?.getBoundingClientRect() || {
				width: 0,
				height: 0,
				x: 0,
				y: 0
			}, o = t.axis === "x" || t.axis === "both", s = t.axis === "y" || t.axis === "both", c = ["mouseenter", "mousemove"].includes(t.dataRef.current.openEvent?.type || "") && t.pointerType !== "touch", l = a.width, u = a.height, d = a.x, f = a.y;
			return n == null && t.x && o && (n = a.x - t.x), r == null && t.y && s && (r = a.y - t.y), d -= n || 0, f -= r || 0, l = 0, u = 0, !i || c ? (l = t.axis === "y" ? a.width : 0, u = t.axis === "x" ? a.height : 0, d = o && t.x != null ? t.x : d, f = s && t.y != null ? t.y : f) : i && !c && (u = t.axis === "x" ? a.height : u, l = t.axis === "y" ? a.width : l), i = !0, {
				width: l,
				height: u,
				x: d,
				y: f,
				top: f,
				right: d + l,
				bottom: f + u,
				left: d
			};
		}
	};
}
function K(e) {
	return e != null && e.clientX != null;
}
function ce(e, t = {}) {
	let n = "rootStore" in e ? e.rootStore : e, r = n.useState("open"), i = n.useState("floatingElement"), a = n.useState("domReferenceElement"), o = n.context.dataRef, { enabled: s = !0, axis: c = "both", x: l = null, y: u = null } = t, d = V.useRef(!1), f = V.useRef(null), [p, m] = V.useState(), [h, _] = V.useState([]), b = v((e, t) => {
		d.current || o.current.openEvent && !K(o.current.openEvent) || n.set("positionReference", se(a, {
			x: e,
			y: t,
			axis: c,
			dataRef: o,
			pointerType: p
		}));
	}), x = v((e) => {
		l != null || u != null || (r ? f.current || _([]) : b(e.clientX, e.clientY));
	}), S = E(p) ? i : r, C = V.useCallback(() => {
		if (!S || !s || l != null || u != null) return;
		let e = y(i);
		function t(n) {
			D(i, O(n)) ? (e.removeEventListener("mousemove", t), f.current = null) : b(n.clientX, n.clientY);
		}
		if (!o.current.openEvent || K(o.current.openEvent)) {
			e.addEventListener("mousemove", t);
			let n = () => {
				e.removeEventListener("mousemove", t), f.current = null;
			};
			return f.current = n, n;
		}
		n.set("positionReference", a);
	}, [
		S,
		s,
		l,
		u,
		i,
		o,
		a,
		n,
		b
	]);
	V.useEffect(() => C(), [C, h]), V.useEffect(() => {
		s && !i && (d.current = !1);
	}, [s, i]), V.useEffect(() => {
		!s && r && (d.current = !0);
	}, [s, r]), g(() => {
		s && (l != null || u != null) && (d.current = !1, b(l, u));
	}, [
		s,
		l,
		u,
		b
	]);
	let w = V.useMemo(() => {
		function e(e) {
			m(e.pointerType);
		}
		return {
			onPointerDown: e,
			onPointerEnter: e,
			onMouseMove: x,
			onMouseEnter: x
		};
	}, [x]);
	return V.useMemo(() => s ? { reference: w } : {}, [s, w]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/tooltip/root/TooltipRootContext.js
var q = /* @__PURE__ */ V.createContext(void 0);
process.env.NODE_ENV !== "production" && (q.displayName = "TooltipRootContext");
function J(e) {
	let t = V.useContext(q);
	if (t === void 0 && !e) throw Error(process.env.NODE_ENV === "production" ? f(72) : "Base UI: TooltipRootContext is missing. Tooltip parts must be placed within <Tooltip.Root>.");
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/tooltip/store/TooltipStore.js
var le = {
	...I,
	disabled: a((e) => e.disabled),
	instantType: a((e) => e.instantType),
	isInstantPhase: a((e) => e.isInstantPhase),
	trackCursorAxis: a((e) => e.trackCursorAxis),
	disableHoverablePopup: a((e) => e.disableHoverablePopup),
	lastOpenChangeReason: a((e) => e.openChangeReason),
	closeDelay: a((e) => e.closeDelay)
}, ue = class e extends i {
	constructor(e) {
		super({
			...de(),
			...e
		}, {
			popupRef: /* @__PURE__ */ V.createRef(),
			onOpenChange: void 0,
			onOpenChangeComplete: void 0,
			triggerElements: new l()
		}, le);
	}
	setOpen = (e, t) => {
		let n = t.reason, r = n === _, i = e && n === "trigger-focus", a = !e && (n === "trigger-press" || n === "escape-key");
		if (t.preventUnmountOnClose = () => {
			this.set("preventUnmountingOnClose", !0);
		}, this.context.onOpenChange?.(e, t), t.isCanceled) return;
		let o = () => {
			let r = {
				open: e,
				openChangeReason: n
			};
			i ? r.instantType = "focus" : a ? r.instantType = "dismiss" : n === "trigger-hover" && (r.instantType = void 0);
			let o = t.trigger?.id ?? null;
			(o || e) && (r.activeTriggerId = o, r.activeTriggerElement = t.trigger ?? null), this.update(r);
		};
		r ? W.flushSync(o) : o();
	};
	static useStore(t, n) {
		let r = d(() => t ?? new e(n)).current, i = L({
			popupStore: r,
			onOpenChange: r.setOpen
		});
		return r.state.floatingRootContext = i, r;
	}
};
function de() {
	return {
		...P(),
		disabled: !1,
		instantType: void 0,
		isInstantPhase: !1,
		trackCursorAxis: "none",
		disableHoverablePopup: !1,
		openChangeReason: null,
		closeDelay: 0
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/tooltip/root/TooltipRoot.js
function fe(e) {
	let { disabled: t = !1, defaultOpen: n = !1, open: i, disableHoverablePopup: a = !1, trackCursorAxis: s = "none", actionsRef: c, onOpenChange: l, onOpenChangeComplete: u, handle: d, triggerId: f, defaultTriggerId: p = null, children: m } = e, _ = ue.useStore(d?.store, {
		open: i ?? n,
		activeTriggerId: f === void 0 ? p : f
	});
	_.useControlledProp("open", i, n), _.useControlledProp("activeTriggerId", f, p), _.useContextCallback("onOpenChange", l), _.useContextCallback("onOpenChangeComplete", u);
	let v = _.useState("open"), y = _.useState("activeTriggerId"), S = _.useState("payload");
	_.useSyncedValues({
		trackCursorAxis: s,
		disableHoverablePopup: a
	});
	let C = !t && v;
	g(() => {
		v && t && _.setOpen(!1, x(b));
	}, [
		v,
		t,
		_
	]), _.useSyncedValue("disabled", t), N(_);
	let { forceUnmount: w, transitionStatus: T } = M(C, _), E = _.useState("isInstantPhase"), D = _.useState("instantType"), O = _.useState("lastOpenChangeReason"), k = V.useRef(null);
	g(() => {
		T === "ending" && O === "none" || T !== "ending" && E ? (D !== "delay" && (k.current = D), _.set("instantType", "delay")) : k.current !== null && (_.set("instantType", k.current), k.current = null);
	}, [
		T,
		E,
		O,
		D,
		_
	]), g(() => {
		C && (y ?? _.set("payload", void 0));
	}, [
		_,
		y,
		C
	]);
	let A = V.useCallback(() => {
		_.setOpen(!1, pe(_, h));
	}, [_]);
	V.useImperativeHandle(c, () => ({
		unmount: w,
		close: A
	}), [w, A]);
	let j = _.useState("floatingRootContext"), { getReferenceProps: P, getFloatingProps: F, getTriggerProps: I } = r([
		ee(j, { enabled: !t }),
		o(j, {
			enabled: !t,
			referencePress: !0
		}),
		ce(j, {
			enabled: !t && s !== "none",
			axis: s === "none" ? void 0 : s
		})
	]), L = V.useMemo(() => P(), [P]), R = V.useMemo(() => I(), [I]), z = V.useMemo(() => F(), [F]);
	return _.useSyncedValues({
		floatingRootContext: j,
		activeTriggerProps: L,
		inactiveTriggerProps: R,
		popupProps: z
	}), /* @__PURE__ */ H(q.Provider, {
		value: _,
		children: typeof m == "function" ? m({ payload: S }) : m
	});
}
function pe(e, t) {
	let n = x(t);
	return n.preventUnmountOnClose = () => {
		e.set("preventUnmountingOnClose", !0);
	}, n;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/tooltip/provider/TooltipProviderContext.js
var Y = /* @__PURE__ */ V.createContext(void 0);
process.env.NODE_ENV !== "production" && (Y.displayName = "TooltipProviderContext");
function me() {
	return V.useContext(Y);
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/tooltip/trigger/TooltipTrigger.js
var X = /* @__PURE__ */ V.forwardRef(function(e, t) {
	let { className: n, render: r, handle: i, payload: a, disabled: o, delay: c, closeDelay: l, id: u, ...d } = e, m = J(!0), h = i?.store ?? m;
	if (!h) throw Error(process.env.NODE_ENV === "production" ? f(82) : "Base UI: <Tooltip.Trigger> must be either used within a <Tooltip.Root> component or provided with a handle.");
	let g = C(u), _ = h.useState("isTriggerActive", g), v = h.useState("floatingRootContext"), y = h.useState("isOpenedByTrigger", g), b = V.useRef(null), x = c ?? 600, S = l ?? 0, { registerTrigger: w, isMountedByThisTrigger: T } = F(g, b, h, {
		payload: a,
		closeDelay: S
	}), E = me(), { delayRef: D, isInstantPhase: O, hasProvider: A } = oe(v, { open: y });
	h.useSyncedValue("isInstantPhase", O);
	let M = h.useState("disabled"), N = o ?? M, P = h.useState("trackCursorAxis"), I = h.useState("disableHoverablePopup"), L = k(v, {
		enabled: !N,
		mouseOnly: !0,
		move: !1,
		handleClose: !I && P !== "both" ? j() : null,
		restMs() {
			let e = E?.delay, t = typeof D.current == "object" ? D.current.open : void 0, n = x;
			return A && (n = t === 0 ? 0 : c ?? e ?? x), n;
		},
		delay() {
			let e = typeof D.current == "object" ? D.current.close : void 0, t = S;
			return l == null && A && (t = e), { close: t };
		},
		triggerElementRef: b,
		isActiveTrigger: _
	}), R = V.useMemo(() => ({ open: y }), [y]), z = h.useState("triggerProps", T);
	return p("button", e, {
		state: R,
		ref: [
			t,
			w,
			b
		],
		props: [
			L,
			z,
			{ id: g },
			d
		],
		stateAttributesMapping: s
	});
});
process.env.NODE_ENV !== "production" && (X.displayName = "TooltipTrigger");
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/tooltip/portal/TooltipPortalContext.js
var Z = /* @__PURE__ */ V.createContext(void 0);
process.env.NODE_ENV !== "production" && (Z.displayName = "TooltipPortalContext");
function he() {
	let e = V.useContext(Z);
	if (e === void 0) throw Error(process.env.NODE_ENV === "production" ? f(70) : "Base UI: <Tooltip.Portal> is missing.");
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/utils/FloatingPortalLite.js
var Q = /* @__PURE__ */ V.forwardRef(function(e, t) {
	let { children: r, container: i, className: a, render: o, ...s } = e, { portalNode: c, portalSubtree: l } = n({
		container: i,
		ref: t,
		componentProps: e,
		elementProps: s
	});
	return !l && !c ? null : /* @__PURE__ */ U(V.Fragment, { children: [l, c && /* @__PURE__ */ W.createPortal(r, c)] });
});
process.env.NODE_ENV !== "production" && (Q.displayName = "FloatingPortalLite");
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/tooltip/portal/TooltipPortal.js
var ge = /* @__PURE__ */ V.forwardRef(function(e, t) {
	let { keepMounted: n = !1, ...r } = e;
	return J().useState("mounted") || n ? /* @__PURE__ */ H(Z.Provider, {
		value: n,
		children: /* @__PURE__ */ H(Q, {
			ref: t,
			...r
		})
	}) : null;
});
process.env.NODE_ENV !== "production" && (ge.displayName = "TooltipPortal");
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/tooltip/positioner/TooltipPositionerContext.js
var $ = /* @__PURE__ */ V.createContext(void 0);
process.env.NODE_ENV !== "production" && ($.displayName = "TooltipPositionerContext");
function _e() {
	let e = V.useContext($);
	if (e === void 0) throw Error(process.env.NODE_ENV === "production" ? f(71) : "Base UI: TooltipPositionerContext is missing. TooltipPositioner parts must be placed within <Tooltip.Positioner>.");
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/tooltip/positioner/TooltipPositioner.js
var ve = /* @__PURE__ */ V.forwardRef(function(e, t) {
	let { render: n, className: r, anchor: i, positionMethod: a = "absolute", side: o = "top", align: s = "center", sideOffset: l = 0, alignOffset: d = 0, collisionBoundary: f = "clipping-ancestors", collisionPadding: m = 5, arrowPadding: h = 5, sticky: g = !1, disableAnchorTracking: _ = !1, collisionAvoidance: v = u, ...y } = e, b = J(), x = he(), S = b.useState("open"), C = b.useState("mounted"), w = b.useState("trackCursorAxis"), T = b.useState("disableHoverablePopup"), E = b.useState("floatingRootContext"), D = b.useState("instantType"), O = b.useState("transitionStatus"), k = R({
		anchor: i,
		positionMethod: a,
		floatingRootContext: E,
		mounted: C,
		side: o,
		sideOffset: l,
		align: s,
		alignOffset: d,
		collisionBoundary: f,
		collisionPadding: m,
		sticky: g,
		arrowPadding: h,
		disableAnchorTracking: _,
		keepMounted: x,
		collisionAvoidance: v,
		adaptiveOrigin: z
	}), A = V.useMemo(() => {
		let e = {};
		return (!S || w === "both" || T) && (e.pointerEvents = "none"), {
			role: "presentation",
			hidden: !C,
			style: {
				...k.positionerStyles,
				...e
			}
		};
	}, [
		S,
		w,
		T,
		C,
		k.positionerStyles
	]), j = V.useMemo(() => ({
		open: S,
		side: k.side,
		align: k.align,
		anchorHidden: k.anchorHidden,
		instant: w === "none" ? D : "tracking-cursor"
	}), [
		S,
		k.side,
		k.align,
		k.anchorHidden,
		w,
		D
	]), M = V.useMemo(() => ({
		...j,
		arrowRef: k.arrowRef,
		arrowStyles: k.arrowStyles,
		arrowUncentered: k.arrowUncentered
	}), [
		j,
		k.arrowRef,
		k.arrowStyles,
		k.arrowUncentered
	]), N = p("div", e, {
		state: j,
		props: [
			A,
			B(O),
			y
		],
		ref: [t, b.useStateSetter("positionerElement")],
		stateAttributesMapping: c
	});
	return /* @__PURE__ */ H($.Provider, {
		value: M,
		children: N
	});
});
process.env.NODE_ENV !== "production" && (ve.displayName = "TooltipPositioner");
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/tooltip/popup/TooltipPopup.js
var ye = {
	...c,
	...w
}, be = /* @__PURE__ */ V.forwardRef(function(e, t) {
	let { className: n, render: r, ...i } = e, a = J(), { side: o, align: s } = _e(), c = a.useState("open"), l = a.useState("mounted"), u = a.useState("instantType"), d = a.useState("transitionStatus"), f = a.useState("popupProps"), m = a.useState("payload"), h = a.useState("popupElement"), g = a.useState("positionerElement"), _ = a.useState("floatingRootContext"), v = S();
	T({
		open: c,
		ref: a.context.popupRef,
		onComplete() {
			c && a.context.onOpenChangeComplete?.(!0);
		}
	});
	function y() {
		_.context.events.emit("measure-layout");
	}
	function b(e, t) {
		_.context.events.emit("measure-layout-complete", {
			previousDimensions: e,
			nextDimensions: t
		});
	}
	ne({
		popupElement: h,
		positionerElement: g,
		mounted: l,
		content: m,
		enabled: () => a.context.triggerElements.size > 1,
		onMeasureLayout: y,
		onMeasureLayoutComplete: b,
		side: o,
		direction: v
	});
	let x = a.useState("disabled"), C = a.useState("closeDelay");
	return te(_, {
		enabled: !x,
		closeDelay: C
	}), p("div", e, {
		state: V.useMemo(() => ({
			open: c,
			side: o,
			align: s,
			instant: u,
			transitionStatus: d
		}), [
			c,
			o,
			s,
			u,
			d
		]),
		ref: [
			t,
			a.context.popupRef,
			a.useStateSetter("popupElement")
		],
		props: [
			f,
			B(d),
			i
		],
		stateAttributesMapping: ye
	});
});
process.env.NODE_ENV !== "production" && (be.displayName = "TooltipPopup");
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/tooltip/arrow/TooltipArrow.js
var xe = /* @__PURE__ */ V.forwardRef(function(e, t) {
	let { className: n, render: r, ...i } = e, a = J().useState("instantType"), { open: o, arrowRef: s, side: l, align: u, arrowUncentered: d, arrowStyles: f } = _e();
	return p("div", e, {
		state: V.useMemo(() => ({
			open: o,
			side: l,
			align: u,
			uncentered: d,
			instant: a
		}), [
			o,
			l,
			u,
			d,
			a
		]),
		ref: [t, s],
		props: [{
			style: f,
			"aria-hidden": !0
		}, i],
		stateAttributesMapping: c
	});
});
process.env.NODE_ENV !== "production" && (xe.displayName = "TooltipArrow");
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/tooltip/provider/TooltipProvider.js
var Se = function(e) {
	let { delay: t, closeDelay: n, timeout: r = 400 } = e, i = V.useMemo(() => ({
		delay: t,
		closeDelay: n
	}), [t, n]), a = V.useMemo(() => ({
		open: t,
		close: n
	}), [t, n]);
	return /* @__PURE__ */ H(Y.Provider, {
		value: i,
		children: /* @__PURE__ */ H(ae, {
			delay: a,
			timeoutMs: r,
			children: e.children
		})
	});
};
process.env.NODE_ENV !== "production" && (Se.displayName = "TooltipProvider");
//#endregion
//#region src/stories/atoms/Tooltip/Tooltip.tsx
function Ce({ children: e, delayDuration: t = 0, skipDelayDuration: n }) {
	return /* @__PURE__ */ H(Se, {
		delay: t,
		...n === void 0 ? {} : { timeout: n },
		children: e
	});
}
function we({ label: e, children: t, side: n = "top", align: r = "center", sideOffset: i = 4, open: a, defaultOpen: o, onOpenChange: s, delayDuration: c, className: l }) {
	let u = re(), [d, f] = ie(o ?? !1), p = a ?? d;
	return /* @__PURE__ */ U(fe, {
		open: a,
		defaultOpen: o,
		onOpenChange: (e) => {
			a === void 0 && f(e), s?.(e);
		},
		children: [/* @__PURE__ */ H(X, {
			render: t,
			"aria-describedby": p ? u : void 0,
			...c === void 0 ? {} : { delay: c }
		}), /* @__PURE__ */ H(ge, { children: /* @__PURE__ */ H(ve, {
			className: "tooltip__positioner",
			side: n,
			align: r,
			sideOffset: i,
			children: /* @__PURE__ */ U(be, {
				id: u,
				role: "tooltip",
				className: ["tooltip", l].filter(Boolean).join(" "),
				children: [e, /* @__PURE__ */ H(xe, {
					className: "tooltip__arrow",
					children: /* @__PURE__ */ H("svg", {
						width: "10",
						height: "5",
						viewBox: "0 0 30 10",
						preserveAspectRatio: "none",
						children: /* @__PURE__ */ H("polygon", { points: "0,0 30,0 15,10" })
					})
				})]
			})
		}) })]
	});
}
//#endregion
export { Ce as n, we as t };

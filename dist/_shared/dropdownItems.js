import { A as e, D as t, E as n, I as r, L as i, N as a, O as o, P as s, a as c, c as l, d as u, f as d, j as f, k as p, n as m, o as h, r as g, w as _, x as ee, z as v } from "./popupStateMapping.js";
import { t as y } from "./useControlled.js";
import { c as b, d as x, h as S, i as C, m as w, p as T, s as E, t as D } from "./useRenderElement.js";
import { D as O, E as k, L as A, M as j, O as M, R as N, S as P, b as F, c as I, f as L, p as R, x as z } from "./floating-ui.utils.dom.js";
import { n as B, r as te } from "./useCompositeListItem.js";
import { t as ne } from "./DirectionContext.js";
import { t as V } from "./useBaseUiId.js";
import { i as re, l as ie, t as H } from "./useOpenChangeComplete.js";
import { r as U, t as ae } from "./useButton.js";
import { C as W, t as G } from "./owner.js";
import { s as oe } from "./composite2.js";
import { a as se, n as K, r as ce, t as le } from "./InternalBackdrop.js";
import { n as ue, t as de } from "./safePolygon.js";
import { t as fe } from "./useClick.js";
import { a as pe, i as me, n as he, o as ge, r as _e, t as ve } from "./useSyncedFloatingRootContext.js";
import { n as q, t as ye } from "./getDisabledMountTransitionStyles.js";
import { t as be } from "./useFocus.js";
import { t as J } from "./useHoverFloatingInteraction.js";
import { n as xe, r as Se, t as Y } from "./getPseudoElementBounds.js";
import { n as Ce, t as we } from "./useOpenInteractionType.js";
import { t as Te } from "./ToolbarRootContext.js";
import { t as Ee } from "./Separator.js";
import { t as De } from "./useCompositeItem.js";
import * as X from "react";
import { Fragment as Oe, jsx as Z, jsxs as ke } from "react/jsx-runtime";
import * as Ae from "react-dom";
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/menu/positioner/MenuPositionerContext.js
var je = /* @__PURE__ */ X.createContext(void 0);
process.env.NODE_ENV !== "production" && (je.displayName = "MenuPositionerContext");
function Me(e) {
	let t = X.useContext(je);
	if (t === void 0 && !e) throw Error(process.env.NODE_ENV === "production" ? w(33) : "Base UI: MenuPositionerContext is missing. MenuPositioner parts must be placed within <Menu.Positioner>.");
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/menu/root/MenuRootContext.js
var Ne = /* @__PURE__ */ X.createContext(void 0);
process.env.NODE_ENV !== "production" && (Ne.displayName = "MenuRootContext");
function Q(e) {
	let t = X.useContext(Ne);
	if (t === void 0 && !e) throw Error(process.env.NODE_ENV === "production" ? w(36) : "Base UI: MenuRootContext is missing. Menu parts must be placed within <Menu.Root>.");
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/context-menu/root/ContextMenuRootContext.js
var Pe = /* @__PURE__ */ X.createContext(void 0);
process.env.NODE_ENV !== "production" && (Pe.displayName = "ContextMenuRootContext");
function Fe(e = !0) {
	let t = X.useContext(Pe);
	if (t === void 0 && !e) throw Error(process.env.NODE_ENV === "production" ? w(25) : "Base UI: ContextMenuRootContext is missing. ContextMenu parts must be placed within <ContextMenu.Root>.");
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/menu/item/useMenuItem.js
var Ie = { type: "regular-item" };
function Le(e) {
	let { closeOnClick: t, disabled: n = !1, highlighted: r, id: i, store: a, nativeButton: o, itemMetadata: s, nodeId: c } = e, l = X.useRef(null), u = Fe(!0), d = u !== void 0, { events: f } = a.useState("floatingTreeRoot"), { getButtonProps: p, buttonRef: m } = ae({
		disabled: n,
		focusableWhenDisabled: !0,
		native: o
	}), h = X.useCallback((e) => x({
		id: i,
		role: "menuitem",
		tabIndex: r ? 0 : -1,
		onMouseMove(e) {
			c && f.emit("itemhover", {
				nodeId: c,
				target: e.currentTarget
			});
		},
		onMouseEnter() {
			s.type === "submenu-trigger" && s.setActive();
		},
		onKeyUp(e) {
			e.key === " " && a.context.typingRef.current && e.preventBaseUIHandler();
		},
		onClick(e) {
			t && f.emit("close", {
				domEvent: e,
				reason: M
			});
		},
		onMouseUp(e) {
			if (u) {
				let t = u.initialCursorPointRef.current;
				if (u.initialCursorPointRef.current = null, d && t && Math.abs(e.clientX - t.x) <= 1 && Math.abs(e.clientY - t.y) <= 1) return;
			}
			l.current && a.context.allowMouseUpTriggerRef.current && (!d || e.button === 2) && s.type === "regular-item" && l.current.click();
		}
	}, e, p), [
		i,
		r,
		p,
		t,
		f,
		a,
		d,
		u,
		s,
		c
	]), g = T(l, m);
	return X.useMemo(() => ({
		getItemProps: h,
		itemRef: g
	}), [h, g]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/menu/checkbox-item/MenuCheckboxItemDataAttributes.js
var Re = /* @__PURE__ */ function(e) {
	return e.checked = "data-checked", e.unchecked = "data-unchecked", e.disabled = "data-disabled", e.highlighted = "data-highlighted", e;
}({}), ze = {
	checked(e) {
		return e ? { [Re.checked]: "" } : { [Re.unchecked]: "" };
	},
	...re
}, Be = /* @__PURE__ */ X.createContext(void 0);
process.env.NODE_ENV !== "production" && (Be.displayName = "MenuGroupContext");
function Ve() {
	let e = X.useContext(Be);
	if (e === void 0) throw Error(process.env.NODE_ENV === "production" ? w(31) : "Base UI: MenuGroupRootContext is missing. Menu group parts must be used within <Menu.Group>.");
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/menu/group/MenuGroup.js
var He = /* @__PURE__ */ X.forwardRef(function(e, t) {
	let { render: n, className: r, ...i } = e, [a, o] = X.useState(void 0), s = X.useMemo(() => ({ setLabelId: o }), [o]), c = D("div", e, {
		ref: t,
		props: {
			role: "group",
			"aria-labelledby": a,
			...i
		}
	});
	return /* @__PURE__ */ Z(Be.Provider, {
		value: s,
		children: c
	});
});
process.env.NODE_ENV !== "production" && (He.displayName = "MenuGroup");
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/menu/group-label/MenuGroupLabel.js
var Ue = /* @__PURE__ */ X.forwardRef(function(e, t) {
	let { className: n, render: r, id: i, ...a } = e, o = V(i), { setLabelId: s } = Ve();
	return A(() => (s(o), () => {
		s(void 0);
	}), [s, o]), D("div", e, {
		ref: t,
		props: {
			id: o,
			role: "presentation",
			...a
		}
	});
});
process.env.NODE_ENV !== "production" && (Ue.displayName = "MenuGroupLabel");
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/menu/item/MenuItem.js
var $ = /* @__PURE__ */ X.forwardRef(function(e, t) {
	let { render: n, className: r, id: i, label: a, nativeButton: o = !1, disabled: s = !1, closeOnClick: c = !0, ...l } = e, u = B({ label: a }), d = Me(!0), f = V(i), { store: p } = Q(), m = p.useState("isActive", u.index), h = p.useState("itemProps"), { getItemProps: g, itemRef: _ } = Le({
		closeOnClick: c,
		disabled: s,
		highlighted: m,
		id: f,
		store: p,
		nativeButton: o,
		nodeId: d?.nodeId,
		itemMetadata: Ie
	});
	return D("div", e, {
		state: X.useMemo(() => ({
			disabled: s,
			highlighted: m
		}), [s, m]),
		props: [
			h,
			l,
			g
		],
		ref: [
			_,
			t,
			u.ref
		]
	});
});
process.env.NODE_ENV !== "production" && ($.displayName = "MenuItem");
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/menu/popup/MenuPopup.js
var We = {
	...m,
	...re
}, Ge = /* @__PURE__ */ X.forwardRef(function(e, t) {
	let { render: n, className: r, finalFocus: i, ...a } = e, { store: o } = Q(), { side: s, align: c } = Me(), l = Te(!0) != null, u = o.useState("open"), d = o.useState("transitionStatus"), f = o.useState("popupProps"), p = o.useState("mounted"), m = o.useState("instantType"), h = o.useState("activeTriggerElement"), g = o.useState("parent"), _ = o.useState("lastOpenChangeReason"), ee = o.useState("rootId"), v = o.useState("floatingRootContext"), y = o.useState("floatingTreeRoot"), b = o.useState("closeDelay"), x = o.useState("activeTriggerElement");
	H({
		open: u,
		ref: o.context.popupRef,
		onComplete() {
			u && o.context.onOpenChangeComplete?.(!0);
		}
	}), X.useEffect(() => {
		function e(e) {
			o.setOpen(!1, z(e.reason, e.domEvent));
		}
		return y.events.on("close", e), () => {
			y.events.off("close", e);
		};
	}, [y.events, o]);
	let S = o.useState("hoverEnabled"), C = o.useState("disabled");
	J(v, {
		enabled: S && !C && g.type !== "context-menu" && g.type !== "menubar",
		closeDelay: b
	});
	let w = D("div", e, {
		state: X.useMemo(() => ({
			transitionStatus: d,
			side: s,
			align: c,
			open: u,
			nested: g.type === "menu",
			instant: m
		}), [
			d,
			s,
			c,
			u,
			g.type,
			m
		]),
		ref: [t, o.context.popupRef],
		stateAttributesMapping: We,
		props: [
			f,
			{ onKeyDown(e) {
				l && oe.has(e.key) && e.stopPropagation();
			} },
			ye(d),
			a,
			{ "data-rootownerid": ee }
		]
	}), T = g.type === void 0 || g.type === "context-menu";
	return (h || g.type === "menubar" && _ !== "outside-press") && (T = !0), /* @__PURE__ */ Z(ce, {
		context: v,
		modal: !1,
		disabled: !p,
		returnFocus: i === void 0 ? T : i,
		initialFocus: g.type !== "menu",
		restoreFocus: !0,
		externalTree: g.type === "menubar" ? void 0 : y,
		previousFocusableElement: x,
		nextFocusableElement: g.type === void 0 ? o.context.triggerFocusTargetRef : void 0,
		beforeContentFocusGuardRef: g.type === void 0 ? o.context.beforeContentFocusGuardRef : void 0,
		children: w
	});
});
process.env.NODE_ENV !== "production" && (Ge.displayName = "MenuPopup");
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/menu/portal/MenuPortalContext.js
var Ke = /* @__PURE__ */ X.createContext(void 0);
process.env.NODE_ENV !== "production" && (Ke.displayName = "MenuPortalContext");
function qe() {
	let e = X.useContext(Ke);
	if (e === void 0) throw Error(process.env.NODE_ENV === "production" ? w(32) : "Base UI: <Menu.Portal> is missing.");
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/menu/portal/MenuPortal.js
var Je = /* @__PURE__ */ X.forwardRef(function(e, t) {
	let { keepMounted: n = !1, ...r } = e, { store: i } = Q();
	return i.useState("mounted") || n ? /* @__PURE__ */ Z(Ke.Provider, {
		value: n,
		children: /* @__PURE__ */ Z(ee, {
			ref: t,
			...r
		})
	}) : null;
});
process.env.NODE_ENV !== "production" && (Je.displayName = "MenuPortal");
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/menu/positioner/MenuPositioner.js
var Ye = /* @__PURE__ */ X.forwardRef(function(e, t) {
	let { anchor: r, positionMethod: i = "absolute", className: a, render: o, side: s, align: c, sideOffset: l = 0, alignOffset: u = 0, collisionBoundary: d = "clipping-ancestors", collisionPadding: f = 5, arrowPadding: p = 5, sticky: h = !1, disableAnchorTracking: g = !1, collisionAvoidance: _ = C, ...ee } = e, { store: v } = Q(), y = qe(), b = Fe(!0), x = v.useState("parent"), S = v.useState("floatingRootContext"), w = v.useState("floatingTreeRoot"), T = v.useState("mounted"), E = v.useState("open"), O = v.useState("modal"), k = v.useState("activeTriggerElement"), A = v.useState("lastOpenChangeReason"), M = v.useState("floatingNodeId"), N = v.useState("floatingParentNodeId"), P = r, F = l, I = u, L = c;
	x.type === "context-menu" && (P = r ?? x.context?.anchor, L ??= "start", !s && L !== "center" && (I = e.alignOffset ?? 2, F = e.sideOffset ?? -5));
	let R = s, B = L;
	x.type === "menu" ? (R ??= "inline-end", B ??= "start") : x.type === "menubar" && (R ??= "bottom", B ??= "start");
	let ne = x.type === "context-menu", V = q({
		anchor: P,
		floatingRootContext: S,
		positionMethod: b ? "fixed" : i,
		mounted: T,
		side: R,
		sideOffset: F,
		align: B,
		alignOffset: I,
		arrowPadding: ne ? 0 : p,
		collisionBoundary: d,
		collisionPadding: f,
		sticky: h,
		nodeId: M,
		keepMounted: y,
		disableAnchorTracking: g,
		collisionAvoidance: _,
		shiftCrossAxis: ne,
		externalTree: w
	}), re = X.useMemo(() => {
		let e = {};
		return E || (e.pointerEvents = "none"), {
			role: "presentation",
			hidden: !T,
			style: {
				...V.positionerStyles,
				...e
			}
		};
	}, [
		E,
		T,
		V.positionerStyles
	]);
	X.useEffect(() => {
		function e(e) {
			e.open ? (e.parentNodeId === M && v.set("hoverEnabled", !1), e.nodeId !== M && e.parentNodeId === v.select("floatingParentNodeId") && v.setOpen(!1, z(j))) : e.parentNodeId === M && e.reason !== "sibling-open" && v.set("hoverEnabled", !0);
		}
		return w.events.on("menuopenchange", e), () => {
			w.events.off("menuopenchange", e);
		};
	}, [
		v,
		w.events,
		M
	]), X.useEffect(() => {
		if (v.select("floatingParentNodeId") == null) return;
		function e(e) {
			if (e.open || e.nodeId !== v.select("floatingParentNodeId")) return;
			let t = e.reason ?? "sibling-open";
			v.setOpen(!1, z(t));
		}
		return w.events.on("menuopenchange", e), () => {
			w.events.off("menuopenchange", e);
		};
	}, [w.events, v]), X.useEffect(() => {
		function e(e) {
			!E || e.nodeId !== v.select("floatingParentNodeId") || e.target && k && k !== e.target && v.setOpen(!1, z(j));
		}
		return w.events.on("itemhover", e), () => {
			w.events.off("itemhover", e);
		};
	}, [
		w.events,
		E,
		k,
		v
	]), X.useEffect(() => {
		let e = {
			open: E,
			nodeId: M,
			parentNodeId: N,
			reason: v.select("lastOpenChangeReason")
		};
		w.events.emit("menuopenchange", e);
	}, [
		w.events,
		E,
		v,
		M,
		N
	]);
	let ie = X.useMemo(() => ({
		open: E,
		side: V.side,
		align: V.align,
		anchorHidden: V.anchorHidden,
		nested: x.type === "menu"
	}), [
		E,
		V.side,
		V.align,
		V.anchorHidden,
		x.type
	]), H = X.useMemo(() => ({
		side: V.side,
		align: V.align,
		arrowRef: V.arrowRef,
		arrowUncentered: V.arrowUncentered,
		arrowStyles: V.arrowStyles,
		nodeId: V.context.nodeId
	}), [
		V.side,
		V.align,
		V.arrowRef,
		V.arrowUncentered,
		V.arrowStyles,
		V.context.nodeId
	]), U = D("div", e, {
		state: ie,
		stateAttributesMapping: m,
		ref: [t, v.useStateSetter("positionerElement")],
		props: [re, ee]
	}), ae = T && x.type !== "menu" && (x.type !== "menubar" && O && A !== "trigger-hover" || x.type === "menubar" && x.context.modal), W = null;
	return x.type === "menubar" ? W = x.context.contentElement : x.type === void 0 && (W = k), /* @__PURE__ */ ke(je.Provider, {
		value: H,
		children: [ae && /* @__PURE__ */ Z(le, {
			ref: x.type === "context-menu" || x.type === "nested-context-menu" ? x.context.internalBackdropRef : null,
			inert: K(!E),
			cutout: W
		}), /* @__PURE__ */ Z(n, {
			id: M,
			children: /* @__PURE__ */ Z(te, {
				elementsRef: v.context.itemDomElements,
				labelsRef: v.context.itemLabels,
				children: U
			})
		})]
	});
});
process.env.NODE_ENV !== "production" && (Ye.displayName = "MenuPositioner");
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/menu/radio-group/MenuRadioGroupContext.js
var Xe = /* @__PURE__ */ X.createContext(void 0);
process.env.NODE_ENV !== "production" && (Xe.displayName = "MenuRadioGroupContext");
function Ze() {
	let e = X.useContext(Xe);
	if (e === void 0) throw Error(process.env.NODE_ENV === "production" ? w(34) : "Base UI: MenuRadioGroupContext is missing. MenuRadioGroup parts must be placed within <Menu.RadioGroup>.");
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/menu/radio-group/MenuRadioGroup.js
var Qe = /* @__PURE__ */ X.memo(/* @__PURE__ */ X.forwardRef(function(e, t) {
	let { render: n, className: r, value: i, defaultValue: a, onValueChange: o, disabled: s = !1, ...c } = e, [l, u] = y({
		controlled: i,
		default: a,
		name: "MenuRadioGroup"
	}), d = N(o), f = N((e, t) => {
		d?.(e, t), !t.isCanceled && u(e);
	}), p = D("div", e, {
		state: X.useMemo(() => ({ disabled: s }), [s]),
		ref: t,
		props: {
			role: "group",
			"aria-disabled": s || void 0,
			...c
		}
	}), m = X.useMemo(() => ({
		value: l,
		setValue: f,
		disabled: s
	}), [
		l,
		f,
		s
	]);
	return /* @__PURE__ */ Z(Xe.Provider, {
		value: m,
		children: p
	});
}));
process.env.NODE_ENV !== "production" && (Qe.displayName = "MenuRadioGroup");
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/menu/radio-item/MenuRadioItemContext.js
var $e = /* @__PURE__ */ X.createContext(void 0);
process.env.NODE_ENV !== "production" && ($e.displayName = "MenuRadioItemContext");
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/menu/radio-item/MenuRadioItem.js
var et = /* @__PURE__ */ X.forwardRef(function(e, t) {
	let { render: n, className: r, id: i, label: a, nativeButton: o = !1, disabled: s = !1, closeOnClick: c = !1, value: l, ...u } = e, d = B({ label: a }), f = Me(!0), p = V(i), { store: m } = Q(), h = m.useState("isActive", d.index), g = m.useState("itemProps"), { value: _, setValue: ee, disabled: v } = Ze(), y = v || s, b = _ === l, { getItemProps: x, itemRef: S } = Le({
		closeOnClick: c,
		disabled: y,
		highlighted: h,
		id: p,
		store: m,
		nativeButton: o,
		nodeId: f?.nodeId,
		itemMetadata: Ie
	}), C = X.useMemo(() => ({
		disabled: y,
		highlighted: h,
		checked: b
	}), [
		y,
		h,
		b
	]), w = N((e) => {
		ee(l, {
			...z(M, e.nativeEvent),
			preventUnmountOnClose: () => {}
		});
	}), T = D("div", e, {
		state: C,
		stateAttributesMapping: ze,
		props: [
			g,
			{
				role: "menuitemradio",
				"aria-checked": b,
				onClick: w
			},
			u,
			x
		],
		ref: [
			S,
			t,
			d.ref
		]
	});
	return /* @__PURE__ */ Z($e.Provider, {
		value: C,
		children: T
	});
});
process.env.NODE_ENV !== "production" && (et.displayName = "MenuRadioItem");
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/menubar/MenubarContext.js
var tt = /* @__PURE__ */ X.createContext(null);
process.env.NODE_ENV !== "production" && (tt.displayName = "MenubarContext");
function nt(e) {
	let t = X.useContext(tt);
	if (t === null && !e) throw Error(process.env.NODE_ENV === "production" ? w(5) : "Base UI: MenubarContext is missing. Menubar parts must be placed within <Menubar>.");
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/menu/store/MenuStore.js
var rt = {
	..._e,
	disabled: u((e) => e.parent.type === "menubar" && e.parent.context.disabled || e.disabled),
	modal: u((e) => (e.parent.type === void 0 || e.parent.type === "context-menu") && (e.modal ?? !0)),
	allowMouseEnter: u((e) => e.parent.type === "menu" ? e.parent.store.select("allowMouseEnter") : e.allowMouseEnter),
	stickIfOpen: u((e) => e.stickIfOpen),
	parent: u((e) => e.parent),
	rootId: u((e) => e.parent.type === "menu" ? e.parent.store.select("rootId") : e.parent.type === void 0 ? e.rootId : e.parent.context.rootId),
	activeIndex: u((e) => e.activeIndex),
	isActive: u((e, t) => e.activeIndex === t),
	hoverEnabled: u((e) => e.hoverEnabled),
	instantType: u((e) => e.instantType),
	lastOpenChangeReason: u((e) => e.openChangeReason),
	floatingTreeRoot: u((e) => e.parent.type === "menu" ? e.parent.store.select("floatingTreeRoot") : e.floatingTreeRoot),
	floatingNodeId: u((e) => e.floatingNodeId),
	floatingParentNodeId: u((e) => e.floatingParentNodeId),
	itemProps: u((e) => e.itemProps),
	closeDelay: u((e) => e.closeDelay),
	keyboardEventRelay: u((e) => {
		if (e.keyboardEventRelay) return e.keyboardEventRelay;
		if (e.parent.type === "menu") return e.parent.store.select("keyboardEventRelay");
	})
}, it = class e extends l {
	constructor(e) {
		super({
			...at(),
			...e
		}, {
			positionerRef: /* @__PURE__ */ X.createRef(),
			popupRef: /* @__PURE__ */ X.createRef(),
			typingRef: { current: !1 },
			itemDomElements: { current: [] },
			itemLabels: { current: [] },
			allowMouseUpTriggerRef: { current: !1 },
			triggerFocusTargetRef: /* @__PURE__ */ X.createRef(),
			beforeContentFocusGuardRef: /* @__PURE__ */ X.createRef(),
			onOpenChangeComplete: void 0,
			triggerElements: new h()
		}, rt), this.observe(u((e) => e.allowMouseEnter), (e, t) => {
			this.state.parent.type === "menu" && e !== t && this.state.parent.store.set("allowMouseEnter", e);
		}), this.unsubscribeParentListener = this.observe("parent", (e) => {
			if (this.unsubscribeParentListener?.(), e.type === "menu") {
				this.unsubscribeParentListener = e.store.subscribe(() => {
					this.notifyAll();
				}), this.context.allowMouseUpTriggerRef = e.store.context.allowMouseUpTriggerRef;
				return;
			}
			e.type !== void 0 && (this.context.allowMouseUpTriggerRef = e.context.allowMouseUpTriggerRef), this.unsubscribeParentListener = null;
		});
	}
	setOpen(e, t) {
		this.state.floatingRootContext.context.events.emit("setOpen", {
			open: e,
			eventDetails: t
		});
	}
	static useStore(t, n) {
		return S(() => t ?? new e(n)).current;
	}
	unsubscribeParentListener = null;
};
function at() {
	return {
		...he(),
		disabled: !1,
		modal: !0,
		allowMouseEnter: !0,
		stickIfOpen: !0,
		parent: { type: void 0 },
		rootId: void 0,
		activeIndex: null,
		hoverEnabled: !0,
		instantType: void 0,
		openChangeReason: null,
		floatingTreeRoot: new f(),
		floatingNodeId: void 0,
		floatingParentNodeId: null,
		itemProps: b,
		keyboardEventRelay: void 0,
		closeDelay: 0
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/menu/submenu-root/MenuSubmenuRootContext.js
var ot = /* @__PURE__ */ X.createContext(void 0);
process.env.NODE_ENV !== "production" && (ot.displayName = "MenuSubmenuRootContext");
function st() {
	return X.useContext(ot);
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/menu/root/MenuRoot.js
function ct(e) {
	let { children: n, open: r, onOpenChange: i, onOpenChangeComplete: s, defaultOpen: l = !1, disabled: u = !1, modal: f, loopFocus: m = !0, orientation: h = "vertical", actionsRef: g, closeParentOnEsc: _ = !0, handle: ee, triggerId: v, defaultTriggerId: y = null, highlightItemOnHover: b = !0 } = e, S = Fe(!0), C = Q(!0), w = nt(!0), T = st(), D = X.useMemo(() => T && C ? {
		type: "menu",
		store: C.store
	} : w ? {
		type: "menubar",
		context: w
	} : S && !C ? {
		type: "context-menu",
		context: S
	} : { type: void 0 }, [
		S,
		C,
		w,
		T
	]), k = it.useStore(ee?.store, { parent: D }), j = k.useState("floatingTreeRoot"), M = o(j), P = p();
	A(() => {
		S && !C ? k.update({
			parent: {
				type: "context-menu",
				context: S
			},
			floatingNodeId: M,
			floatingParentNodeId: P
		}) : C && k.update({
			floatingNodeId: M,
			floatingParentNodeId: P
		});
	}, [
		S,
		C,
		M,
		P,
		k
	]), k.useControlledProp("open", r, l), k.useControlledProp("activeTriggerId", v, y), k.useContextCallback("onOpenChangeComplete", s);
	let I = k.useState("open"), L = k.useState("activeTriggerElement"), R = k.useState("positionerElement"), B = k.useState("hoverEnabled"), te = k.useState("modal"), V = k.useState("disabled"), re = k.useState("lastOpenChangeReason"), H = k.useState("parent"), U = k.useState("activeIndex"), ae = k.useState("payload"), W = k.useState("floatingParentNodeId"), G = X.useRef(null), oe = W != null, K;
	process.env.NODE_ENV !== "production" && H.type !== void 0 && f !== void 0 && console.warn("Base UI: The `modal` prop is not supported on nested menus. It will be ignored."), k.useSyncedValues({
		disabled: u,
		modal: H.type === void 0 ? f : void 0,
		rootId: F()
	});
	let { openMethod: ce, triggerProps: le, reset: ue } = we(I);
	me(k);
	let { forceUnmount: de } = pe(I, k, () => {
		k.update({
			allowMouseEnter: !1,
			stickIfOpen: !0
		}), ue();
	}), fe = X.useRef(H.type !== "context-menu"), he = a();
	X.useEffect(() => {
		if (I || (G.current = null), H.type === "context-menu") {
			if (!I) {
				he.clear(), fe.current = !1;
				return;
			}
			he.start(500, () => {
				fe.current = !0;
			});
		}
	}, [
		he,
		I,
		H.type
	]), se(I && te && re !== "trigger-hover" && ce !== "touch", R), A(() => {
		!I && !B && k.set("hoverEnabled", !0);
	}, [
		I,
		B,
		k
	]);
	let ge = X.useRef(!0), _e = a(), q = N((e, t) => {
		let n = t.reason;
		if (I === e && t.trigger === L || (t.preventUnmountOnClose = () => {
			k.set("preventUnmountingOnClose", !0);
		}, !e && t.trigger == null && (t.trigger = L ?? void 0), i?.(e, t), t.isCanceled)) return;
		let r = {
			open: e,
			nativeEvent: t.event,
			reason: t.reason,
			nested: oe
		};
		K?.emit("openchange", r);
		let a = t.event;
		if (e === !1 && a?.type === "click" && a.pointerType === "touch" && !ge.current) return;
		if (!e && U !== null) {
			let e = k.context.itemDomElements.current[U];
			queueMicrotask(() => {
				e?.setAttribute("tabindex", "-1");
			});
		}
		e && n === "trigger-focus" ? (ge.current = !1, _e.start(300, () => {
			ge.current = !0;
		})) : (ge.current = !0, _e.clear());
		let o = (n === "trigger-press" || n === "item-press") && a.detail === 0 && a?.isTrusted, s = !e && (n === "escape-key" || n == null);
		function c() {
			let r = {
				open: e,
				openChangeReason: n
			};
			G.current = t.event ?? null;
			let i = t.trigger?.id ?? null;
			(i || e) && (r.activeTriggerId = i, r.activeTriggerElement = t.trigger ?? null), k.update(r);
		}
		n === "trigger-hover" ? Ae.flushSync(c) : c(), H.type === "menubar" && (n === "trigger-focus" || n === "focus-out" || n === "trigger-hover" || n === "list-navigation" || n === "sibling-open") ? k.set("instantType", "group") : o || s ? k.set("instantType", o ? "click" : "dismiss") : k.set("instantType", void 0);
	}), ye = X.useCallback((e) => {
		let t = z(e);
		return t.preventUnmountOnClose = () => {
			k.set("preventUnmountingOnClose", !0);
		}, t;
	}, [k]), be = X.useCallback(() => {
		k.setOpen(!1, ye(O));
	}, [k, ye]);
	X.useImperativeHandle(g, () => ({
		unmount: de,
		close: be
	}), [de, be]);
	let J;
	H.type === "context-menu" && (J = H.context), X.useImperativeHandle(J?.positionerRef, () => R, [R]), X.useImperativeHandle(J?.actionsRef, () => ({ setOpen: q }), [q]);
	let Y = ve({
		popupStore: k,
		onOpenChange: q
	});
	K = Y.context.events, X.useEffect(() => {
		let e = ({ open: e, eventDetails: t }) => q(e, t);
		return K.on("setOpen", e), () => {
			K?.off("setOpen", e);
		};
	}, [K, q]);
	let Te = d(Y, {
		enabled: !V,
		bubbles: _ && H.type === "menu",
		outsidePress() {
			return H.type !== "context-menu" || G.current?.type === "contextmenu" ? !0 : fe.current;
		},
		externalTree: oe ? j : void 0
	}), Ee = Ce(Y, { role: "menu" }), De = ne(), Oe = X.useCallback((e) => {
		k.select("activeIndex") !== e && k.set("activeIndex", e);
	}, [k]), ke = Se(Y, {
		enabled: !V,
		listRef: k.context.itemDomElements,
		activeIndex: U,
		nested: H.type !== void 0,
		loopFocus: m,
		orientation: h,
		parentOrientation: H.type === "menubar" ? H.context.orientation : void 0,
		rtl: De === "rtl",
		disabledIndices: E,
		onNavigate: Oe,
		openOnArrowKeyDown: H.type !== "context-menu",
		externalTree: oe ? j : void 0,
		focusItemOnHover: b
	}), je = X.useCallback((e) => {
		k.context.typingRef.current = e;
	}, [k]), { getReferenceProps: Me, getFloatingProps: Pe, getItemProps: Ie, getTriggerProps: Le } = c([
		Te,
		Ee,
		ke,
		xe(Y, {
			listRef: k.context.itemLabels,
			activeIndex: U,
			resetMs: 500,
			onMatch: (e) => {
				I && e !== U && k.set("activeIndex", e);
			},
			onTypingChange: je
		})
	]), Re = X.useMemo(() => {
		let e = x(Me(), {
			onMouseEnter() {
				k.set("hoverEnabled", !0);
			},
			onMouseMove() {
				k.set("allowMouseEnter", !0);
			}
		}, le);
		return delete e.role, e;
	}, [
		Me,
		k,
		le
	]), ze = X.useMemo(() => {
		let e = Le();
		if (!e) return e;
		let { role: t, "aria-controls": n, ...r } = e;
		return r;
	}, [Le]), Be = ie(), Ve = X.useMemo(() => Pe({
		onMouseEnter() {
			H.type === "menu" && Be.request(() => k.set("hoverEnabled", !1));
		},
		onMouseMove() {
			k.set("allowMouseEnter", !0);
		},
		onClick() {
			k.select("hoverEnabled") && k.set("hoverEnabled", !1);
		},
		onKeyDown(e) {
			let t = k.select("keyboardEventRelay");
			t && !e.isPropagationStopped() && t(e);
		}
	}), [
		Pe,
		H.type,
		Be,
		k
	]), He = X.useMemo(() => Ie(), [Ie]);
	k.useSyncedValues({
		floatingRootContext: Y,
		activeTriggerProps: Re,
		inactiveTriggerProps: ze,
		popupProps: Ve,
		itemProps: He
	});
	let Ue = X.useMemo(() => ({
		store: k,
		parent: D
	}), [k, D]), $ = /* @__PURE__ */ Z(Ne.Provider, {
		value: Ue,
		children: typeof n == "function" ? n({ payload: ae }) : n
	});
	return H.type === void 0 || H.type === "context-menu" ? /* @__PURE__ */ Z(t, {
		externalTree: j,
		children: $
	}) : $;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/composite/item/CompositeItem.js
function lt(e) {
	let { render: t, className: n, state: r = b, props: i = E, refs: a = E, metadata: o, stateAttributesMapping: s, tag: c = "div", ...l } = e, { compositeProps: u, compositeRef: d } = De({ metadata: o });
	return D(c, e, {
		state: r,
		ref: [...a, d],
		props: [
			u,
			...i,
			l
		],
		stateAttributesMapping: s
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/menu/utils/findRootOwnerId.js
function ut(e) {
	if (L(e) && e.hasAttribute("data-rootownerid")) return e.getAttribute("data-rootownerid") ?? void 0;
	if (!R(e)) return ut(I(e));
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/utils/useMixedToggleClickHander.js
function dt(e) {
	let { enabled: t = !0, mouseDownAction: n, open: r } = e, i = X.useRef(!1);
	return X.useMemo(() => t ? {
		onMouseDown: (e) => {
			(n === "open" && !r || n === "close" && r) && (i.current = !0, G(e.currentTarget).addEventListener("click", () => {
				i.current = !1;
			}, { once: !0 }));
		},
		onClick: (e) => {
			i.current && (i.current = !1, e.preventBaseUIHandler());
		}
	} : b, [
		t,
		n,
		r
	]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/menu/trigger/MenuTrigger.js
var ft = 2, pt = /* @__PURE__ */ X.forwardRef(function(t, n) {
	let { render: l, className: u, disabled: d = !1, nativeButton: m = !0, id: h, openOnHover: ee, delay: y = 100, closeDelay: x = 0, handle: S, payload: C, ...T } = t, E = Q(!0), O = S?.store ?? E?.store;
	if (!O) throw Error(process.env.NODE_ENV === "production" ? w(85) : "Base UI: <Menu.Trigger> must be either used within a <Menu.Root> component or provided with a handle.");
	let A = V(h), j = O.useState("isTriggerActive", A), M = O.useState("floatingRootContext"), F = O.useState("isOpenedByTrigger", A), I = X.useRef(null), L = ht(), R = U(!0), B = e(), te = X.useMemo(() => B ?? new f(), [B]), { registerTrigger: ne, isMountedByThisTrigger: re } = ge(A, I, O, {
		payload: C,
		closeDelay: x,
		parent: L,
		floatingTreeRoot: te,
		floatingNodeId: o(te),
		floatingParentNodeId: p(),
		keyboardEventRelay: R?.relayKeyboardEvent
	}), ie = O.useState("disabled"), H = d || ie || L.type === "menubar" && L.context.disabled, { getButtonProps: oe, buttonRef: se } = ae({
		disabled: H,
		native: m
	});
	X.useEffect(() => {
		!F && L.type === void 0 && (O.context.allowMouseUpTriggerRef.current = !1);
	}, [
		O,
		F,
		L.type
	]);
	let K = X.useRef(null), ce = a(), le = N((e) => {
		if (!K.current) return;
		ce.clear(), O.context.allowMouseUpTriggerRef.current = !1;
		let t = e.target;
		if (W(K.current, t) || W(O.select("positionerElement"), t) || t === K.current || t != null && ut(t) === O.select("rootId")) return;
		let n = Y(K.current);
		e.clientX >= n.left - ft && e.clientX <= n.right + ft && e.clientY >= n.top - ft && e.clientY <= n.bottom + ft || te.events.emit("close", {
			domEvent: e,
			reason: P
		});
	});
	X.useEffect(() => {
		F && O.select("lastOpenChangeReason") === "trigger-hover" && G(K.current).addEventListener("mouseup", le, { once: !0 });
	}, [
		F,
		le,
		O
	]);
	let pe = L.type === "menubar" && L.context.hasSubmenuOpen, me = ue(M, {
		enabled: (ee ?? pe ?? !1) && !H && L.type !== "context-menu" && (L.type !== "menubar" || pe && !re),
		handleClose: de({ blockPointerEvents: L.type !== "menubar" }),
		mouseOnly: !0,
		move: !1,
		restMs: L.type === void 0 ? y : void 0,
		delay: { close: x },
		triggerElementRef: I,
		externalTree: te,
		isActiveTrigger: j
	}), he = mt(F, O.select("lastOpenChangeReason")), _e = fe(M, {
		enabled: !H && L.type !== "context-menu",
		event: F && L.type === "menubar" ? "click" : "mousedown",
		toggle: !0,
		ignoreMouse: !1,
		stickIfOpen: L.type === void 0 ? he : !1
	}), ve = be(M, { enabled: !H && (L.type !== "menubar" && F || pe) }), q = dt({
		open: F,
		enabled: L.type === "menubar",
		mouseDownAction: "open"
	}), ye = c([_e, ve]), J = L.type === "menubar", xe = X.useMemo(() => ({
		disabled: H,
		open: F
	}), [H, F]), Se = O.useState("triggerProps", re), Ce = [
		K,
		n,
		se,
		ne,
		I
	], we = [
		ye.getReferenceProps(),
		me ?? b,
		Se,
		{
			"aria-haspopup": "menu",
			id: A,
			onMouseDown: (e) => {
				O.select("open") || (ce.start(200, () => {
					O.context.allowMouseUpTriggerRef.current = !0;
				}), G(e.currentTarget).addEventListener("mouseup", le, { once: !0 }));
			}
		},
		J ? { role: "menuitem" } : {},
		q,
		T,
		oe
	], Te = X.useRef(null), Ee = N((e) => {
		Ae.flushSync(() => {
			O.setOpen(!1, z(k, e.nativeEvent, e.currentTarget));
		}), i(Te.current)?.focus();
	}), De = N((e) => {
		let t = O.select("positionerElement");
		if (t && v(e, t)) O.context.beforeContentFocusGuardRef.current?.focus();
		else {
			Ae.flushSync(() => {
				O.setOpen(!1, z(k, e.nativeEvent, e.currentTarget));
			});
			let n = r(I.current);
			for (; n !== null && W(t, n) || n?.hasAttribute("aria-hidden");) {
				let e = n;
				if (n = s(n), n === e) break;
			}
			n?.focus();
		}
	}), Oe = D("button", t, {
		enabled: !J,
		stateAttributesMapping: g,
		state: xe,
		ref: Ce,
		props: we
	});
	return J ? /* @__PURE__ */ Z(lt, {
		tag: "button",
		render: l,
		className: u,
		state: xe,
		refs: Ce,
		props: we,
		stateAttributesMapping: g
	}) : F ? /* @__PURE__ */ ke(X.Fragment, { children: [
		/* @__PURE__ */ Z(_, {
			ref: Te,
			onFocus: Ee
		}, `${A}-pre-focus-guard`),
		/* @__PURE__ */ Z(X.Fragment, { children: Oe }, A),
		/* @__PURE__ */ Z(_, {
			ref: O.context.triggerFocusTargetRef,
			onFocus: De
		}, `${A}-post-focus-guard`)
	] }) : /* @__PURE__ */ Z(X.Fragment, { children: Oe }, A);
});
process.env.NODE_ENV !== "production" && (pt.displayName = "MenuTrigger");
function mt(e, t) {
	let n = a(), [r, i] = X.useState(!1);
	return A(() => {
		e && t === "trigger-hover" ? (i(!0), n.start(500, () => {
			i(!1);
		})) : e || (n.clear(), i(!1));
	}, [
		e,
		t,
		n
	]), r;
}
function ht() {
	let e = Fe(!0), t = Q(!0), n = nt(!0);
	return X.useMemo(() => n ? {
		type: "menubar",
		context: n
	} : e && !t ? {
		type: "context-menu",
		context: e
	} : { type: void 0 }, [
		e,
		t,
		n
	]);
}
//#endregion
//#region src/stories/molecules/_shared/dropdownItems.tsx
function gt({ children: e, ...t }) {
	return /* @__PURE__ */ Z("a", {
		...t,
		children: e
	});
}
function _t(e, t) {
	return t ? /* @__PURE__ */ ke(Oe, { children: [/* @__PURE__ */ Z("span", {
		"aria-hidden": "true",
		children: t
	}), e] }) : /* @__PURE__ */ Z(Oe, { children: e });
}
function vt(e) {
	return e.reduce((e, t) => {
		let n = t.type === "radio", r = e[e.length - 1];
		return r && r.radio === n ? r.items.push(t) : e.push({
			radio: n,
			items: [t]
		}), e;
	}, []);
}
function yt({ items: e, itemClass: t, separatorClass: n, renderLink: r, labelClass: i, radioValue: a, onRadioValueChange: o }) {
	let s = (e, a) => {
		if (e.type === "separator") return /* @__PURE__ */ Z(Ee, { className: n }, a);
		if (e.type === "label") return i ? /* @__PURE__ */ Z(He, { children: /* @__PURE__ */ Z(Ue, {
			className: i,
			children: e.label
		}) }, a) : null;
		if (e.type === "radio") return /* @__PURE__ */ Z(et, {
			className: t(),
			value: e.value,
			disabled: e.disabled,
			children: _t(e.label, e.icon)
		}, a);
		let o = _t(e.label, e.icon);
		return e.type === "link" ? e.disabled ? /* @__PURE__ */ Z($, {
			className: t(e.destructive),
			disabled: !0,
			children: o
		}, a) : /* @__PURE__ */ Z($, {
			className: t(e.destructive),
			render: (n) => r({
				...n,
				href: e.href,
				className: n.className ?? t(e.destructive),
				children: o
			})
		}, a) : /* @__PURE__ */ Z($, {
			className: t(e.destructive),
			disabled: e.disabled,
			closeOnClick: e.closeOnSelect !== !1,
			onClick: e.disabled ? void 0 : () => {
				if (e.closeOnSelect === !1) {
					e.onClick();
					return;
				}
				setTimeout(() => e.onClick(), 0);
			},
			children: o
		}, a);
	}, c = e;
	if (!c.some((e) => e.type === "radio")) return c.map(s);
	let l = 0;
	return vt(c).map((e, t) => {
		let n = l;
		l += e.items.length;
		let r = e.items.map((e, t) => s(e, n + t));
		return e.radio ? /* @__PURE__ */ Z(Qe, {
			value: a,
			onValueChange: (e) => o?.(String(e)),
			children: r
		}, `radio-${t}`) : r;
	});
}
//#endregion
export { Ye as a, $ as c, Le as d, Q as f, ct as i, ze as l, yt as n, Je as o, Me as p, pt as r, Ge as s, gt as t, Ie as u };

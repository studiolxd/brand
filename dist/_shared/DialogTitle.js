import { a as e, c as t, d as n, f as r, n as i, o as a, t as o, x as s } from "./popupStateMapping.js";
import { h as c, m as l, t as u } from "./useRenderElement.js";
import { C as d, D as f, R as p, x as m } from "./floating-ui.utils.dom.js";
import { t as h } from "./useBaseUiId.js";
import { i as g, t as _ } from "./useOpenChangeComplete.js";
import { t as v } from "./useButton.js";
import { C as y, E as b } from "./owner.js";
import { s as x } from "./composite2.js";
import { a as S, n as C, r as w, t as T } from "./InternalBackdrop.js";
import { a as E, i as D, n as O, r as k, t as A } from "./useSyncedFloatingRootContext.js";
import { n as j, t as M } from "./useOpenInteractionType.js";
import * as N from "react";
import { jsx as P, jsxs as F } from "react/jsx-runtime";
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/dialog/root/DialogRootContext.js
var I = /* @__PURE__ */ N.createContext(void 0);
process.env.NODE_ENV !== "production" && (I.displayName = "DialogRootContext");
function L(e) {
	let t = N.useContext(I);
	if (e === !1 && t === void 0) throw Error(process.env.NODE_ENV === "production" ? l(27) : "Base UI: DialogRootContext is missing. Dialog parts must be placed within <Dialog.Root>.");
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/dialog/backdrop/DialogBackdrop.js
var R = {
	...i,
	...g
}, z = /* @__PURE__ */ N.forwardRef(function(e, t) {
	let { render: n, className: r, forceRender: i = !1, ...a } = e, { store: o } = L(), s = o.useState("open"), c = o.useState("nested"), l = o.useState("mounted"), d = o.useState("transitionStatus");
	return u("div", e, {
		state: N.useMemo(() => ({
			open: s,
			transitionStatus: d
		}), [s, d]),
		ref: [o.context.backdropRef, t],
		stateAttributesMapping: R,
		props: [{
			role: "presentation",
			hidden: !l,
			style: {
				userSelect: "none",
				WebkitUserSelect: "none"
			}
		}, a],
		enabled: i || !c
	});
});
process.env.NODE_ENV !== "production" && (z.displayName = "DialogBackdrop");
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/dialog/close/DialogClose.js
var B = /* @__PURE__ */ N.forwardRef(function(e, t) {
	let { render: n, className: r, disabled: i = !1, nativeButton: a = !0, ...o } = e, { store: s } = L(), c = s.useState("open");
	function l(e) {
		c && s.setOpen(!1, m(d, e.nativeEvent));
	}
	let { getButtonProps: f, buttonRef: p } = v({
		disabled: i,
		native: a
	});
	return u("button", e, {
		state: N.useMemo(() => ({ disabled: i }), [i]),
		ref: [t, p],
		props: [
			{ onClick: l },
			o,
			f
		]
	});
});
process.env.NODE_ENV !== "production" && (B.displayName = "DialogClose");
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/dialog/description/DialogDescription.js
var V = /* @__PURE__ */ N.forwardRef(function(e, t) {
	let { render: n, className: r, id: i, ...a } = e, { store: o } = L(), s = h(i);
	return o.useSyncedValueWithCleanup("descriptionElementId", s), u("p", e, {
		ref: t,
		props: [{ id: s }, a]
	});
});
process.env.NODE_ENV !== "production" && (V.displayName = "DialogDescription");
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/dialog/popup/DialogPopupCssVars.js
var H = /* @__PURE__ */ function(e) {
	return e.nestedDialogs = "--nested-dialogs", e;
}({}), U = function(e) {
	return e[e.open = o.open] = "open", e[e.closed = o.closed] = "closed", e[e.startingStyle = o.startingStyle] = "startingStyle", e[e.endingStyle = o.endingStyle] = "endingStyle", e.nested = "data-nested", e.nestedDialogOpen = "data-nested-dialog-open", e;
}({}), W = /* @__PURE__ */ N.createContext(void 0);
process.env.NODE_ENV !== "production" && (W.displayName = "DialogPortalContext");
function G() {
	let e = N.useContext(W);
	if (e === void 0) throw Error(process.env.NODE_ENV === "production" ? l(26) : "Base UI: <Dialog.Portal> is missing.");
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/dialog/popup/DialogPopup.js
var K = {
	...i,
	...g,
	nestedDialogOpen(e) {
		return e ? { [U.nestedDialogOpen]: "" } : null;
	}
}, q = /* @__PURE__ */ N.forwardRef(function(e, t) {
	let { className: n, finalFocus: r, initialFocus: i, render: a, ...o } = e, { store: s } = L(), c = s.useState("descriptionElementId"), l = s.useState("disablePointerDismissal"), d = s.useState("floatingRootContext"), f = s.useState("popupProps"), p = s.useState("modal"), m = s.useState("mounted"), h = s.useState("nested"), g = s.useState("nestedOpenDialogCount"), v = s.useState("open"), y = s.useState("openMethod"), b = s.useState("titleElementId"), S = s.useState("transitionStatus"), C = s.useState("role");
	G(), _({
		open: v,
		ref: s.context.popupRef,
		onComplete() {
			v && s.context.onOpenChangeComplete?.(!0);
		}
	});
	function T(e) {
		return e === "touch" ? s.context.popupRef.current : !0;
	}
	let E = i === void 0 ? T : i, D = g > 0, O = u("div", e, {
		state: N.useMemo(() => ({
			open: v,
			nested: h,
			transitionStatus: S,
			nestedDialogOpen: D
		}), [
			v,
			h,
			S,
			D
		]),
		props: [
			f,
			{
				"aria-labelledby": b ?? void 0,
				"aria-describedby": c ?? void 0,
				role: C,
				tabIndex: -1,
				hidden: !m,
				onKeyDown(e) {
					x.has(e.key) && e.stopPropagation();
				},
				style: { [H.nestedDialogs]: g }
			},
			o
		],
		ref: [
			t,
			s.context.popupRef,
			s.useStateSetter("popupElement")
		],
		stateAttributesMapping: K
	});
	return /* @__PURE__ */ P(w, {
		context: d,
		openInteractionType: y,
		disabled: !m,
		closeOnFocusOut: !l,
		initialFocus: E,
		returnFocus: r,
		modal: p !== !1,
		restoreFocus: "popup",
		children: O
	});
});
process.env.NODE_ENV !== "production" && (q.displayName = "DialogPopup");
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/dialog/portal/DialogPortal.js
var J = /* @__PURE__ */ N.forwardRef(function(e, t) {
	let { keepMounted: n = !1, ...r } = e, { store: i } = L(), a = i.useState("mounted"), o = i.useState("modal");
	return a || n ? /* @__PURE__ */ P(W.Provider, {
		value: n,
		children: /* @__PURE__ */ F(s, {
			ref: t,
			...r,
			children: [a && o === !0 && /* @__PURE__ */ P(T, {
				ref: i.context.internalBackdropRef,
				inert: C(!open)
			}), e.children]
		})
	}) : null;
});
process.env.NODE_ENV !== "production" && (J.displayName = "DialogPortal");
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/dialog/root/useDialogRoot.js
function Y(t) {
	let { store: n, parentContext: i, actionsRef: a } = t, o = n.useState("open"), s = n.useState("disablePointerDismissal"), c = n.useState("modal"), l = n.useState("popupElement"), { openMethod: u, triggerProps: d, reset: h } = M(o);
	D(n);
	let { forceUnmount: g } = E(o, n, () => {
		h();
	}), _ = p((e) => {
		let t = m(e);
		return t.preventUnmountOnClose = () => {
			n.set("preventUnmountingOnClose", !0);
		}, t;
	}), v = N.useCallback(() => {
		n.setOpen(!1, _(f));
	}, [n, _]);
	N.useImperativeHandle(a, () => ({
		unmount: g,
		close: v
	}), [g, v]);
	let x = A({
		popupStore: n,
		onOpenChange: n.setOpen,
		treatPopupAsFloatingElement: !0,
		noEmit: !0
	}), [C, w] = N.useState(0), T = C === 0, O = j(x), k = r(x, {
		outsidePressEvent() {
			return n.context.internalBackdropRef.current || n.context.backdropRef.current ? "intentional" : {
				mouse: c === "trap-focus" ? "sloppy" : "intentional",
				touch: "sloppy"
			};
		},
		outsidePress(e) {
			if ("button" in e && e.button !== 0 || "touches" in e && e.touches.length !== 1) return !1;
			let t = b(e);
			if (T && !s) {
				let e = t;
				return c && (n.context.internalBackdropRef.current || n.context.backdropRef.current) ? n.context.internalBackdropRef.current === e || n.context.backdropRef.current === e || y(e, l) && !e?.hasAttribute("data-base-ui-portal") : !0;
			}
			return !1;
		},
		escapeKey: T
	});
	S(o && c === !0, l);
	let { getReferenceProps: P, getFloatingProps: F, getTriggerProps: I } = e([O, k]);
	n.useContextCallback("onNestedDialogOpen", (e) => {
		w(e + 1);
	}), n.useContextCallback("onNestedDialogClose", () => {
		w(0);
	}), N.useEffect(() => (i?.onNestedDialogOpen && o && i.onNestedDialogOpen(C), i?.onNestedDialogClose && !o && i.onNestedDialogClose(), () => {
		i?.onNestedDialogClose && o && i.onNestedDialogClose();
	}), [
		o,
		i,
		C
	]);
	let L = N.useMemo(() => P(d), [P, d]), R = N.useMemo(() => I(d), [I, d]), z = N.useMemo(() => F(), [F]);
	n.useSyncedValues({
		openMethod: u,
		activeTriggerProps: L,
		inactiveTriggerProps: R,
		popupProps: z,
		floatingRootContext: x,
		nestedOpenDialogCount: C
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/dialog/store/DialogStore.js
var X = {
	...k,
	modal: n((e) => e.modal),
	nested: n((e) => e.nested),
	nestedOpenDialogCount: n((e) => e.nestedOpenDialogCount),
	disablePointerDismissal: n((e) => e.disablePointerDismissal),
	openMethod: n((e) => e.openMethod),
	descriptionElementId: n((e) => e.descriptionElementId),
	titleElementId: n((e) => e.titleElementId),
	viewportElement: n((e) => e.viewportElement),
	role: n((e) => e.role)
}, Z = class extends t {
	constructor(e) {
		super(Q(e), {
			popupRef: /* @__PURE__ */ N.createRef(),
			backdropRef: /* @__PURE__ */ N.createRef(),
			internalBackdropRef: /* @__PURE__ */ N.createRef(),
			triggerElements: new a(),
			onOpenChange: void 0,
			onOpenChangeComplete: void 0
		}, X);
	}
	setOpen = (e, t) => {
		if (t.preventUnmountOnClose = () => {
			this.set("preventUnmountingOnClose", !0);
		}, !e && t.trigger == null && this.state.activeTriggerId != null && (t.trigger = this.state.activeTriggerElement ?? void 0), this.context.onOpenChange?.(e, t), t.isCanceled) return;
		let n = {
			open: e,
			nativeEvent: t.event,
			reason: t.reason,
			nested: this.state.nested
		};
		this.state.floatingRootContext.context.events?.emit("openchange", n);
		let r = { open: e }, i = t.trigger?.id ?? null;
		(i || e) && (r.activeTriggerId = i, r.activeTriggerElement = t.trigger ?? null), this.update(r);
	};
};
function Q(e = {}) {
	return {
		...O(),
		modal: !0,
		disablePointerDismissal: !1,
		popupElement: null,
		viewportElement: null,
		descriptionElementId: void 0,
		titleElementId: void 0,
		openMethod: null,
		nested: !1,
		nestedOpenDialogCount: 0,
		role: "dialog",
		...e
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/dialog/root/DialogRoot.js
function ee(e) {
	let { children: t, open: n, defaultOpen: r = !1, onOpenChange: i, onOpenChangeComplete: a, disablePointerDismissal: o = !1, modal: s = !0, actionsRef: l, handle: u, triggerId: d, defaultTriggerId: f = null } = e, p = L(!0), m = !!p, h = c(() => u?.store ?? new Z({
		open: n ?? r,
		activeTriggerId: d === void 0 ? f : d,
		modal: s,
		disablePointerDismissal: o,
		nested: m
	})).current;
	h.useControlledProp("open", n, r), h.useControlledProp("activeTriggerId", d, f), h.useSyncedValues({
		disablePointerDismissal: o,
		nested: m,
		modal: s
	}), h.useContextCallback("onOpenChange", i), h.useContextCallback("onOpenChangeComplete", a);
	let g = h.useState("payload");
	Y({
		store: h,
		actionsRef: l,
		parentContext: p?.store.context,
		onOpenChange: i,
		triggerIdProp: d
	});
	let _ = N.useMemo(() => ({ store: h }), [h]);
	return /* @__PURE__ */ P(I.Provider, {
		value: _,
		children: typeof t == "function" ? t({ payload: g }) : t
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/dialog/title/DialogTitle.js
var $ = /* @__PURE__ */ N.forwardRef(function(e, t) {
	let { render: n, className: r, id: i, ...a } = e, { store: o } = L(), s = h(i);
	return o.useSyncedValueWithCleanup("titleElementId", s), u("h2", e, {
		ref: t,
		props: [{ id: s }, a]
	});
});
process.env.NODE_ENV !== "production" && ($.displayName = "DialogTitle");
//#endregion
export { V as a, L as c, q as i, ee as n, B as o, J as r, z as s, $ as t };

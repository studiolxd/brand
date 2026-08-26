import { N as e, a as t, d as n, f as r, l as i, n as a, r as o, u as s, x as c } from "./popupStateMapping.js";
import { t as l } from "./useControlled.js";
import { d as u, h as d, i as f, m as p, p as m, s as h, t as g } from "./useRenderElement.js";
import { A as _, E as v, I as y, L as b, O as x, R as S, S as C, l as w, x as T } from "./floating-ui.utils.dom.js";
import { n as E, r as D, t as O } from "./useCompositeListItem.js";
import { a as ee, i as k, l as A, n as te, t as ne } from "./useOpenChangeComplete.js";
import { t as j } from "./useButton.js";
import { d as M } from "./event.js";
import { C as N, T as P, t as F } from "./owner.js";
import { s as I } from "./composite2.js";
import { a as re, n as L, r as R, t as z } from "./InternalBackdrop.js";
import { t as B } from "./visuallyHidden.js";
import { t as V } from "./useClick.js";
import { i as ie, n as ae, t as H } from "./getDisabledMountTransitionStyles.js";
import { n as oe, r as U, t as se } from "./getPseudoElementBounds.js";
import { t as ce } from "./ToolbarRootContext.js";
import { a as W, i as G, n as le, o as K, r as ue, t as de } from "./useValueChanged.js";
import { t as fe } from "./useLabelableId.js";
import * as q from "react";
import { jsx as J, jsxs as pe } from "react/jsx-runtime";
import * as Y from "react-dom";
//#region node_modules/.pnpm/@base-ui-components+utils@0.2.2_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/utils/esm/useOnFirstRender.js
function me(e) {
	let t = q.useRef(!0);
	t.current && (t.current = !1, e());
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/select/root/SelectRootContext.js
var he = /* @__PURE__ */ q.createContext(null);
process.env.NODE_ENV !== "production" && (he.displayName = "SelectRootContext");
var ge = /* @__PURE__ */ q.createContext(null);
process.env.NODE_ENV !== "production" && (ge.displayName = "SelectFloatingContext");
function X() {
	let e = q.useContext(he);
	if (e === null) throw Error(process.env.NODE_ENV === "production" ? p(60) : "Base UI: SelectRootContext is missing. Select parts must be placed within <Select.Root>.");
	return e;
}
function _e() {
	let e = q.useContext(ge);
	if (e === null) throw Error(process.env.NODE_ENV === "production" ? p(61) : "Base UI: SelectFloatingContext is missing. Select parts must be placed within <Select.Root>.");
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/utils/itemEquality.js
var ve = (e, t) => Object.is(e, t);
function Z(e, t, n) {
	return e == null || t == null ? Object.is(e, t) : n(e, t);
}
function ye(e, t, n) {
	return !e || e.length === 0 ? !1 : e.some((e) => e === void 0 ? !1 : Z(e, t, n));
}
function be(e, t, n) {
	return !e || e.length === 0 ? -1 : e.findIndex((e) => e === void 0 ? !1 : Z(e, t, n));
}
function xe(e, t, n) {
	return e.filter((e) => !Z(e, t, n));
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/utils/serializeValue.js
function Se(e) {
	if (e == null) return "";
	if (typeof e == "string") return e;
	try {
		return JSON.stringify(e);
	} catch {
		return String(e);
	}
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/utils/resolveValueLabel.js
function Ce(e) {
	return e != null && e.length > 0 && typeof e[0] == "object" && e[0] != null && "items" in e[0];
}
function we(e, t) {
	if (t && e != null) return t(e) ?? "";
	if (e && typeof e == "object") {
		if ("label" in e && e.label != null) return String(e.label);
		if ("value" in e) return String(e.value);
	}
	return Se(e);
}
function Te(e, t) {
	return t && e != null ? t(e) ?? "" : e && typeof e == "object" && "value" in e && "label" in e ? Se(e.value) : Se(e);
}
function Ee(e, t, n) {
	if (n && e != null) return n(e);
	if (e && typeof e == "object" && "label" in e && e.label != null) return e.label;
	if (t && !Array.isArray(t)) return t[e] ?? we(e, n);
	if (Array.isArray(t)) {
		let r = Ce(t) ? t.flatMap((e) => e.items) : t;
		if (e == null) {
			let t = r.find((e) => e.value == null);
			return t && t.label != null ? t.label : we(e, n);
		}
		if (typeof e != "object") {
			let t = r.find((t) => t && t.value === e);
			return t && t.label != null ? t.label : we(e, n);
		}
		if ("value" in e) {
			let t = r.find((t) => t && t.value === e.value);
			if (t && t.label != null) return t.label;
		}
	}
	return we(e, n);
}
function De(e, t) {
	return !Array.isArray(e) || e.length === 0 ? "" : e.map((e) => we(e, t)).join(", ");
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/select/store.js
var Q = {
	id: n((e) => e.id),
	modal: n((e) => e.modal),
	multiple: n((e) => e.multiple),
	items: n((e) => e.items),
	itemToStringLabel: n((e) => e.itemToStringLabel),
	itemToStringValue: n((e) => e.itemToStringValue),
	isItemEqualToValue: n((e) => e.isItemEqualToValue),
	value: n((e) => e.value),
	open: n((e) => e.open),
	mounted: n((e) => e.mounted),
	forceMount: n((e) => e.forceMount),
	transitionStatus: n((e) => e.transitionStatus),
	touchModality: n((e) => e.touchModality),
	activeIndex: n((e) => e.activeIndex),
	selectedIndex: n((e) => e.selectedIndex),
	isActive: n((e, t) => e.activeIndex === t),
	isSelected: n((e, t, n) => {
		let r = e.isItemEqualToValue, i = e.value;
		return e.multiple ? Array.isArray(i) && i.some((e) => Z(e, n, r)) : e.selectedIndex === t && e.selectedIndex !== null ? !0 : Z(i, n, r);
	}),
	isSelectedByFocus: n((e, t) => e.selectedIndex === t),
	popupProps: n((e) => e.popupProps),
	triggerProps: n((e) => e.triggerProps),
	triggerElement: n((e) => e.triggerElement),
	positionerElement: n((e) => e.positionerElement),
	listElement: n((e) => e.listElement),
	scrollUpArrowVisible: n((e) => e.scrollUpArrowVisible),
	scrollDownArrowVisible: n((e) => e.scrollDownArrowVisible),
	hasScrollArrows: n((e) => e.hasScrollArrows),
	serializedValue: n((e) => {
		let { multiple: t, value: n, itemToStringValue: r } = e;
		return t && Array.isArray(n) && n.length === 0 ? "" : Te(n, r);
	})
};
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/select/root/SelectRoot.js
function Oe(e) {
	let { id: n, value: a, defaultValue: o = null, onValueChange: c, open: u, defaultOpen: f = !1, onOpenChange: p, name: g, disabled: v = !1, readOnly: y = !1, required: x = !1, modal: C = !0, actionsRef: w, inputRef: E, onOpenChangeComplete: D, items: O, multiple: k = !1, itemToStringLabel: A, itemToStringValue: j, isItemEqualToValue: M = ve, highlightItemOnHover: N = !0, children: P } = e, { clearErrors: F } = G(), { setDirty: I, shouldValidateOnChange: re, validityData: L, setFilled: R, name: z, disabled: ae, validation: H } = W(), { controlId: se } = le(), ce = fe({ id: n }), K = ae || v, Y = z ?? g, [X, _e] = l({
		controlled: a,
		default: k ? o ?? h : o,
		name: "Select",
		state: "value"
	}), [Z, ye] = l({
		controlled: u,
		default: f,
		name: "Select",
		state: "open"
	}), xe = q.useRef([]), Se = q.useRef([]), Ce = q.useRef(null), we = q.useRef(null), Ee = q.useRef(0), De = q.useRef(null), Oe = q.useRef([]), ke = q.useRef(!1), Ae = q.useRef(!1), je = q.useRef(null), Me = q.useRef({
		allowSelectedMouseUp: !1,
		allowUnselectedMouseUp: !1
	}), Ne = q.useRef(!1), { mounted: Pe, setMounted: Fe, transitionStatus: Ie } = ee(Z), $ = d(() => new i({
		id: ce,
		modal: C,
		multiple: k,
		itemToStringLabel: A,
		itemToStringValue: j,
		isItemEqualToValue: M,
		value: X,
		open: Z,
		mounted: Pe,
		transitionStatus: Ie,
		items: O,
		forceMount: !1,
		touchModality: !1,
		activeIndex: null,
		selectedIndex: null,
		popupProps: {},
		triggerProps: {},
		triggerElement: null,
		positionerElement: null,
		listElement: null,
		scrollUpArrowVisible: !1,
		scrollDownArrowVisible: !1,
		hasScrollArrows: !1
	})).current, Le = s($, Q.activeIndex), Re = s($, Q.selectedIndex), ze = s($, Q.triggerElement), Be = s($, Q.positionerElement), Ve = q.useMemo(() => k && Array.isArray(X) && X.length === 0 ? "" : Te(X, j), [
		k,
		X,
		j
	]), He = te($.state.triggerElement);
	ue({
		id: ce,
		commit: H.commit,
		value: X,
		controlRef: He,
		name: Y,
		getValue: () => X
	});
	let Ue = q.useRef(X);
	b(() => {
		X !== Ue.current && $.set("forceMount", !0);
	}, [$, X]), b(() => {
		R(X !== null);
	}, [X, R]), b(function() {
		if (Z) return;
		let e = Oe.current;
		if (k) {
			let t = Array.isArray(X) ? X : [];
			if (t.length === 0) {
				$.set("selectedIndex", null);
				return;
			}
			let n = t[t.length - 1], r = be(e, n, M);
			$.set("selectedIndex", r === -1 ? null : r);
			return;
		}
		let t = be(e, X, M);
		$.set("selectedIndex", t === -1 ? null : t);
	}, [
		k,
		Z,
		X,
		Oe,
		M,
		$
	]), de(X, () => {
		F(Y), I(X !== L.initialValue), re() ? H.commit(X) : H.commit(X, !0);
	});
	let We = S((e, t) => {
		if (p?.(e, t), !t.isCanceled && (ye(e), !e && $.state.activeIndex !== null)) {
			let e = xe.current[$.state.activeIndex];
			queueMicrotask(() => {
				e?.setAttribute("tabindex", "-1");
			});
		}
	}), Ge = S(() => {
		Fe(!1), $.set("activeIndex", null), D?.(!1);
	});
	ne({
		enabled: !w,
		open: Z,
		ref: Ce,
		onComplete() {
			Z || Ge();
		}
	}), q.useImperativeHandle(w, () => ({ unmount: Ge }), [Ge]);
	let Ke = S((e, t) => {
		c?.(e, t), !t.isCanceled && _e(e);
	}), qe = S(() => {
		let e = $.state.listElement || Ce.current;
		if (!e) return;
		let t = e.scrollTop, n = e.scrollTop + e.clientHeight, r = t > 1, i = n < e.scrollHeight - 1;
		$.state.scrollUpArrowVisible !== r && $.set("scrollUpArrowVisible", r), $.state.scrollDownArrowVisible !== i && $.set("scrollDownArrowVisible", i);
	}), Je = ie({
		open: Z,
		onOpenChange: We,
		elements: {
			reference: ze,
			floating: Be
		}
	}), { getReferenceProps: Ye, getFloatingProps: Xe, getItemProps: Ze } = t([
		V(Je, {
			enabled: !y && !K,
			event: "mousedown"
		}),
		r(Je, { bubbles: !1 }),
		U(Je, {
			enabled: !y && !K,
			listRef: xe,
			activeIndex: Le,
			selectedIndex: Re,
			disabledIndices: h,
			onNavigate(e) {
				e === null && !Z || $.set("activeIndex", e);
			},
			focusItemOnHover: !1
		}),
		oe(Je, {
			enabled: !y && !K && (Z || !k),
			listRef: Se,
			activeIndex: Le,
			selectedIndex: Re,
			onMatch(e) {
				Z ? $.set("activeIndex", e) : Ke(Oe.current[e], T("none"));
			},
			onTypingChange(e) {
				ke.current = e;
			}
		})
	]);
	me(() => {
		$.update({
			popupProps: Xe(),
			triggerProps: Ye()
		});
	}), b(() => {
		$.update({
			id: ce,
			modal: C,
			multiple: k,
			value: X,
			open: Z,
			mounted: Pe,
			transitionStatus: Ie,
			popupProps: Xe(),
			triggerProps: Ye(),
			items: O,
			itemToStringLabel: A,
			itemToStringValue: j,
			isItemEqualToValue: M
		});
	}, [
		$,
		ce,
		C,
		k,
		X,
		Z,
		Pe,
		Ie,
		Xe,
		Ye,
		O,
		A,
		j,
		M
	]);
	let Qe = q.useMemo(() => ({
		store: $,
		name: Y,
		required: x,
		disabled: K,
		readOnly: y,
		multiple: k,
		itemToStringLabel: A,
		itemToStringValue: j,
		highlightItemOnHover: N,
		setValue: Ke,
		setOpen: We,
		listRef: xe,
		popupRef: Ce,
		scrollHandlerRef: we,
		handleScrollArrowVisibility: qe,
		scrollArrowsMountedCountRef: Ee,
		getItemProps: Ze,
		events: Je.context.events,
		valueRef: De,
		valuesRef: Oe,
		labelsRef: Se,
		typingRef: ke,
		selectionRef: Me,
		selectedItemTextRef: je,
		validation: H,
		onOpenChangeComplete: D,
		keyboardActiveRef: Ae,
		alignItemWithTriggerActiveRef: Ne,
		initialValueRef: Ue
	}), [
		$,
		Y,
		x,
		K,
		y,
		k,
		A,
		j,
		N,
		Ke,
		We,
		Ze,
		Je.context.events,
		H,
		D,
		qe
	]), $e = m(E, H.inputRef), et = k && Array.isArray(X) && X.length > 0, tt = q.useMemo(() => !k || !Array.isArray(X) || !Y ? null : X.map((e) => {
		let t = Te(e, j);
		return /* @__PURE__ */ J("input", {
			type: "hidden",
			name: Y,
			value: t
		}, t);
	}), [
		k,
		X,
		Y,
		j
	]);
	return /* @__PURE__ */ J(he.Provider, {
		value: Qe,
		children: /* @__PURE__ */ pe(ge.Provider, {
			value: Je,
			children: [
				P,
				/* @__PURE__ */ J("input", {
					...H.getInputValidationProps({
						onFocus() {
							$.state.triggerElement?.focus();
						},
						onChange(e) {
							if (e.nativeEvent.defaultPrevented) return;
							let t = e.target.value, n = T(_, e.nativeEvent);
							function r() {
								if (k) return;
								let e = Oe.current.find((e) => Te(e, j).toLowerCase() === t.toLowerCase());
								e != null && (I(e !== L.initialValue), Ke(e, n), re() && H.commit(e));
							}
							$.set("forceMount", !0), queueMicrotask(r);
						}
					}),
					id: n || se || void 0,
					name: k ? void 0 : Y,
					value: Ve,
					disabled: K,
					required: x && !et,
					readOnly: y,
					ref: $e,
					style: B,
					tabIndex: -1,
					"aria-hidden": !0
				}),
				tt
			]
		})
	});
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/select/trigger/SelectTrigger.js
var ke = 2, Ae = {
	...o,
	...K,
	value: () => null
}, je = /* @__PURE__ */ q.forwardRef(function(t, n) {
	let { render: r, className: i, disabled: a = !1, nativeButton: o = !0, ...c } = t, { setTouched: l, setFocused: d, validationMode: f, state: p, disabled: h } = W(), { labelId: _ } = le(), { store: y, setOpen: b, selectionRef: x, validation: w, readOnly: E, alignItemWithTriggerActiveRef: D, disabled: O, keyboardActiveRef: ee } = X(), k = h || O || a, A = s(y, Q.open), ne = s(y, Q.value), M = s(y, Q.triggerProps), I = s(y, Q.positionerElement), re = s(y, Q.listElement), L = s(y, Q.serializedValue), R = te(I), z = q.useRef(null), B = e(), V = e(), { getButtonProps: ie, buttonRef: ae } = j({
		disabled: k,
		native: o
	}), H = m(n, z, ae, S((e) => {
		y.set("triggerElement", e);
	})), oe = e(), U = e();
	q.useEffect(() => {
		if (A) return U.start(200, () => {
			x.current.allowUnselectedMouseUp = !0, oe.start(200, () => {
				x.current.allowSelectedMouseUp = !0;
			});
		}), () => {
			oe.clear(), U.clear();
		};
		x.current = {
			allowSelectedMouseUp: !1,
			allowUnselectedMouseUp: !1
		}, V.clear();
	}, [
		A,
		x,
		V,
		oe,
		U
	]);
	let ce = q.useMemo(() => re?.id ?? P(I)?.id, [re, I]), G = u(M, {
		role: "combobox",
		"aria-expanded": A ? "true" : "false",
		"aria-haspopup": "listbox",
		"aria-controls": A ? ce : void 0,
		"aria-labelledby": _,
		"aria-readonly": E || void 0,
		tabIndex: k ? -1 : 0,
		ref: H,
		onFocus(e) {
			d(!0), A && D.current && b(!1, T(v, e.nativeEvent)), B.start(0, () => {
				y.set("forceMount", !0);
			});
		},
		onBlur() {
			l(!0), d(!1), f === "onBlur" && w.commit(ne);
		},
		onPointerMove({ pointerType: e }) {
			ee.current = !1, y.set("touchModality", e === "touch");
		},
		onPointerDown({ pointerType: e }) {
			y.set("touchModality", e === "touch");
		},
		onKeyDown() {
			ee.current = !0;
		},
		onMouseDown(e) {
			if (A) return;
			let t = F(e.currentTarget);
			function n(e) {
				if (!z.current) return;
				let t = e.target;
				if (N(z.current, t) || N(R.current, t) || t === z.current) return;
				let n = se(z.current);
				e.clientX >= n.left - ke && e.clientX <= n.right + ke && e.clientY >= n.top - ke && e.clientY <= n.bottom + ke || b(!1, T(C, e));
			}
			V.start(0, () => {
				t.addEventListener("mouseup", n, { once: !0 });
			});
		}
	}, w.getValidationProps, c, ie);
	G.role = "combobox";
	let K = q.useMemo(() => ({
		...p,
		open: A,
		disabled: k,
		value: ne,
		readOnly: E,
		placeholder: !L
	}), [
		p,
		A,
		k,
		ne,
		E,
		L
	]);
	return g("button", t, {
		ref: [n, z],
		state: K,
		stateAttributesMapping: Ae,
		props: G
	});
});
process.env.NODE_ENV !== "production" && (je.displayName = "SelectTrigger");
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/select/value/SelectValue.js
var Me = { value: () => null }, Ne = /* @__PURE__ */ q.forwardRef(function(e, t) {
	let { className: n, render: r, children: i, ...a } = e, { store: o, valueRef: c } = X(), l = s(o, Q.value), u = s(o, Q.items), d = s(o, Q.itemToStringLabel), f = s(o, Q.serializedValue), p = q.useMemo(() => ({
		value: l,
		placeholder: !f
	}), [l, f]), m = typeof i == "function" ? i(l) : i ?? (Array.isArray(l) ? De(l, d) : Ee(l, u, d));
	return g("span", e, {
		state: p,
		ref: [t, c],
		props: [{ children: m }, a],
		stateAttributesMapping: Me
	});
});
process.env.NODE_ENV !== "production" && (Ne.displayName = "SelectValue");
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/select/portal/SelectPortalContext.js
var Pe = /* @__PURE__ */ q.createContext(void 0);
process.env.NODE_ENV !== "production" && (Pe.displayName = "SelectPortalContext");
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/select/portal/SelectPortal.js
var Fe = /* @__PURE__ */ q.forwardRef(function(e, t) {
	let { store: n } = X(), r = s(n, Q.mounted), i = s(n, Q.forceMount);
	return r || i ? /* @__PURE__ */ J(Pe.Provider, {
		value: !0,
		children: /* @__PURE__ */ J(c, {
			ref: t,
			...e
		})
	}) : null;
});
process.env.NODE_ENV !== "production" && (Fe.displayName = "SelectPortal");
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/select/positioner/SelectPositionerContext.js
var Ie = /* @__PURE__ */ q.createContext(void 0);
process.env.NODE_ENV !== "production" && (Ie.displayName = "SelectPositionerContext");
function $() {
	let e = q.useContext(Ie);
	if (!e) throw Error(process.env.NODE_ENV === "production" ? p(59) : "Base UI: SelectPositionerContext is missing. SelectPositioner parts must be placed within <Select.Positioner>.");
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/select/popup/utils.js
function Le(e, t) {
	e && Object.assign(e.style, t);
}
var Re = {
	position: "relative",
	maxHeight: "100%",
	overflowX: "hidden",
	overflowY: "auto"
}, ze = { position: "fixed" }, Be = /* @__PURE__ */ q.forwardRef(function(e, t) {
	let { anchor: n, positionMethod: r = "absolute", className: i, render: o, side: c = "bottom", align: l = "center", sideOffset: u = 0, alignOffset: d = 0, collisionBoundary: p = "clipping-ancestors", collisionPadding: m, arrowPadding: h = 5, sticky: v = !1, disableAnchorTracking: y, alignItemWithTrigger: x = !0, collisionAvoidance: C = f, ...w } = e, { store: E, listRef: O, labelsRef: ee, alignItemWithTriggerActiveRef: k, selectedItemTextRef: A, valuesRef: te, initialValueRef: ne, popupRef: j, setValue: M } = X(), N = _e(), P = s(E, Q.open), F = s(E, Q.mounted), I = s(E, Q.modal), R = s(E, Q.value), B = s(E, Q.touchModality), V = s(E, Q.positionerElement), ie = s(E, Q.triggerElement), H = s(E, Q.isItemEqualToValue), oe = q.useRef(null), U = q.useRef(null), [se, ce] = q.useState(x), W = F && se && !B;
	!F && se !== x && ce(x), b(() => {
		F || (Q.scrollUpArrowVisible(E.state) && E.set("scrollUpArrowVisible", !1), Q.scrollDownArrowVisible(E.state) && E.set("scrollDownArrowVisible", !1));
	}, [E, F]), q.useImperativeHandle(k, () => W), re((W || I) && P && !B, ie);
	let G = ae({
		anchor: n,
		floatingRootContext: N,
		positionMethod: r,
		mounted: F,
		side: c,
		sideOffset: u,
		align: l,
		alignOffset: d,
		arrowPadding: h,
		collisionBoundary: p,
		collisionPadding: m,
		sticky: v,
		disableAnchorTracking: y ?? W,
		collisionAvoidance: C,
		keepMounted: !0
	}), le = W ? "none" : G.side, K = W ? ze : G.positionerStyles, ue = q.useMemo(() => {
		let e = {};
		return P || (e.pointerEvents = "none"), {
			role: "presentation",
			hidden: !F,
			style: {
				...K,
				...e
			}
		};
	}, [
		P,
		F,
		K
	]), de = q.useMemo(() => ({
		open: P,
		side: le,
		align: G.align,
		anchorHidden: G.anchorHidden
	}), [
		P,
		le,
		G.align,
		G.anchorHidden
	]), fe = g("div", e, {
		ref: [t, S((e) => {
			E.set("positionerElement", e);
		})],
		state: de,
		stateAttributesMapping: a,
		props: [ue, w]
	}), Y = q.useRef(0), me = S((e) => {
		if (e.size === 0 && Y.current === 0 || te.current.length === 0) return;
		let t = Y.current;
		if (Y.current = e.size, e.size === t) return;
		let n = T(_);
		if (t !== 0 && !E.state.multiple && R !== null && be(te.current, R, H) === -1) {
			let e = ne.current, t = e != null && ye(te.current, e, H) ? e : null;
			M(t, n), t === null && (E.set("selectedIndex", null), A.current = null);
		}
		if (t !== 0 && E.state.multiple && Array.isArray(R)) {
			let e = R.filter((e) => ye(te.current, e, H));
			(e.length !== R.length || e.some((e) => !ye(R, e, H))) && (M(e, n), e.length === 0 && (E.set("selectedIndex", null), A.current = null));
		}
		if (P && W) {
			E.update({
				scrollUpArrowVisible: !1,
				scrollDownArrowVisible: !1
			});
			let e = { height: "" };
			Le(V, e), Le(j.current, e);
		}
	}), he = q.useMemo(() => ({
		...G,
		side: le,
		alignItemWithTriggerActive: W,
		setControlledAlignItemWithTrigger: ce,
		scrollUpArrowRef: oe,
		scrollDownArrowRef: U
	}), [
		G,
		le,
		W,
		ce
	]);
	return /* @__PURE__ */ J(D, {
		elementsRef: O,
		labelsRef: ee,
		onMapChange: me,
		children: /* @__PURE__ */ pe(Ie.Provider, {
			value: he,
			children: [F && I && /* @__PURE__ */ J(z, {
				inert: L(!P),
				cutout: ie
			}), fe]
		})
	});
});
process.env.NODE_ENV !== "production" && (Be.displayName = "SelectPositioner");
//#endregion
//#region node_modules/.pnpm/@base-ui-components+utils@0.2.2_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/utils/esm/isMouseWithinBounds.js
function Ve(e) {
	let t = e.currentTarget.getBoundingClientRect();
	return t.top + 1 <= e.clientY && e.clientY <= t.bottom - 1 && t.left + 1 <= e.clientX && e.clientX <= t.right - 1;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/utils/styles.js
var He = "base-ui-disable-scrollbar", Ue = {
	className: He,
	element: /* @__PURE__ */ J("style", {
		href: He,
		precedence: "base-ui:low",
		children: `.${He}{scrollbar-width:none}.${He}::-webkit-scrollbar{display:none}`
	})
}, We = {
	...a,
	...k
}, Ge = /* @__PURE__ */ q.forwardRef(function(t, n) {
	let { render: r, className: i, ...a } = t, { store: o, popupRef: c, onOpenChangeComplete: l, setOpen: u, valueRef: d, selectedItemTextRef: f, keyboardActiveRef: p, multiple: m, handleScrollArrowVisibility: h, scrollHandlerRef: _ } = X(), { side: v, align: x, alignItemWithTriggerActive: C, setControlledAlignItemWithTrigger: E, scrollDownArrowRef: D, scrollUpArrowRef: O } = $(), ee = ce(!0) != null, k = _e(), te = e(), j = s(o, Q.id), N = s(o, Q.open), P = s(o, Q.mounted), re = s(o, Q.popupProps), L = s(o, Q.transitionStatus), z = s(o, Q.triggerElement), B = s(o, Q.positionerElement), V = s(o, Q.listElement), ie = q.useRef(0), ae = q.useRef(!1), oe = q.useRef(0), U = q.useRef(!1), se = q.useRef({}), W = A(), G = S((e) => {
		if (!B || !c.current || !U.current) return;
		if (ae.current || !C) {
			h();
			return;
		}
		let t = B.style.top === "0px", n = B.style.bottom === "0px", r = B.getBoundingClientRect().height, i = F(B), a = getComputedStyle(B), o = parseFloat(a.marginTop), s = parseFloat(a.marginBottom), l = i.documentElement.clientHeight - o - s, u = e.scrollTop, d = e.scrollHeight - e.clientHeight, f = null, p = null, m = !1;
		if (t) {
			let e = r + (d - u), t = Math.min(e, l);
			f = t, t === l ? m = !0 : p = d;
		} else if (n) {
			let e = u - 0, t = r + e, n = Math.min(t, l), i = t - l;
			f = n, n === l ? (m = !0, u < d && (p = u - (e - i))) : p = 0;
		}
		f != null && (B.style.height = `${f}px`), p != null && (e.scrollTop = p), m && (ae.current = !0), h();
	});
	q.useImperativeHandle(_, () => G, [G]), ne({
		open: N,
		ref: c,
		onComplete() {
			N && l?.(!0);
		}
	});
	let le = q.useMemo(() => ({
		open: N,
		transitionStatus: L,
		side: v,
		align: x
	}), [
		N,
		L,
		v,
		x
	]);
	b(() => {
		!B || !c.current || Object.keys(se.current).length || (se.current = {
			top: B.style.top || "0",
			left: B.style.left || "0",
			right: B.style.right,
			height: B.style.height,
			bottom: B.style.bottom,
			minHeight: B.style.minHeight,
			maxHeight: B.style.maxHeight,
			marginTop: B.style.marginTop,
			marginBottom: B.style.marginBottom
		});
	}, [c, B]), b(() => {
		P || C || (U.current = !1, ae.current = !1, ie.current = 0, oe.current = 0, Le(B, se.current));
	}, [
		P,
		C,
		B,
		c
	]), b(() => {
		let e = c.current;
		if (!(!P || !z || !B || !e)) {
			if (!C) {
				U.current = !0, W.request(h);
				return;
			}
			queueMicrotask(() => {
				let t = getComputedStyle(B), n = getComputedStyle(e), r = F(z), i = w(B), a = z.getBoundingClientRect(), o = B.getBoundingClientRect(), s = a.left, c = a.height, l = V || e, u = l.scrollHeight, p = parseFloat(n.borderBottomWidth), m = parseFloat(t.marginTop) || 10, g = parseFloat(t.marginBottom) || 10, _ = parseFloat(t.minHeight) || 100, v = r.documentElement.clientHeight - m - g, y = r.documentElement.clientWidth, b = v - a.bottom + c, x = f.current, S = d.current, C = 0, T = 0;
				if (x && S) {
					let e = S.getBoundingClientRect(), t = x.getBoundingClientRect(), n = e.left - s, r = t.left - o.left, i = e.top - a.top + e.height / 2, c = t.top - o.top + t.height / 2;
					C = n - r, T = c - i;
				}
				let D = b + T + g + p, O = Math.min(v, D), ee = v - m - g, k = D - O, A = Math.max(5, s + C), te = y - 5, ne = Math.max(0, A + o.width - te);
				B.style.left = `${A - ne}px`, B.style.height = `${O}px`, B.style.maxHeight = "auto", B.style.marginTop = `${m}px`, B.style.marginBottom = `${g}px`, e.style.height = "100%";
				let j = l.scrollHeight - l.clientHeight, N = k >= j;
				N && (O = Math.min(v, o.height) - (k - j));
				let P = a.top < 20 || a.bottom > v - 20 || O < Math.min(u, _), I = (i.visualViewport?.scale ?? 1) !== 1 && M;
				if (P || I) {
					U.current = !0, Le(B, se.current), Y.flushSync(() => E(!1));
					return;
				}
				if (N) {
					let e = Math.max(0, v - D);
					B.style.top = o.height >= ee ? "0" : `${e}px`, B.style.height = `${O}px`, l.scrollTop = l.scrollHeight - l.clientHeight, ie.current = Math.max(_, O);
				} else B.style.bottom = "0", ie.current = Math.max(_, O), l.scrollTop = k;
				ie.current === v && (ae.current = !0), h(), setTimeout(() => {
					U.current = !0;
				});
			});
		}
	}, [
		o,
		P,
		B,
		z,
		d,
		f,
		c,
		h,
		C,
		E,
		W,
		D,
		O,
		V
	]), q.useEffect(() => {
		if (!C || !B || !P) return;
		let e = w(B);
		function t(e) {
			u(!1, T(y, e));
		}
		return e.addEventListener("resize", t), () => {
			e.removeEventListener("resize", t);
		};
	}, [
		u,
		C,
		B,
		P
	]);
	let K = {
		...V ? {
			role: "presentation",
			"aria-orientation": void 0
		} : {
			role: "listbox",
			"aria-multiselectable": m || void 0,
			id: `${j}-list`
		},
		onKeyDown(e) {
			p.current = !0, ee && I.has(e.key) && e.stopPropagation();
		},
		onMouseMove() {
			p.current = !1;
		},
		onPointerLeave(e) {
			if (Ve(e) || e.pointerType === "touch") return;
			let t = e.currentTarget;
			te.start(0, () => {
				o.set("activeIndex", null), t.focus({ preventScroll: !0 });
			});
		},
		onScroll(e) {
			V || _.current?.(e.currentTarget);
		},
		...C && { style: V ? { height: "100%" } : Re }
	}, ue = g("div", t, {
		ref: [n, c],
		state: le,
		stateAttributesMapping: We,
		props: [
			re,
			K,
			H(L),
			{ className: !V && C ? Ue.className : void 0 },
			a
		]
	});
	return /* @__PURE__ */ pe(q.Fragment, { children: [Ue.element, /* @__PURE__ */ J(R, {
		context: k,
		modal: !1,
		disabled: !P,
		restoreFocus: !0,
		children: ue
	})] });
});
process.env.NODE_ENV !== "production" && (Ge.displayName = "SelectPopup");
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/select/item/SelectItemContext.js
var Ke = /* @__PURE__ */ q.createContext(void 0);
process.env.NODE_ENV !== "production" && (Ke.displayName = "SelectItemContext");
function qe() {
	let e = q.useContext(Ke);
	if (!e) throw Error(process.env.NODE_ENV === "production" ? p(57) : "Base UI: SelectItemContext is missing. SelectItem parts must be placed within <Select.Item>.");
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/select/item/SelectItem.js
var Je = /* @__PURE__ */ q.memo(/* @__PURE__ */ q.forwardRef(function(t, n) {
	let { render: r, className: i, value: a = null, label: o, disabled: c = !1, nativeButton: l = !1, ...u } = t, d = q.useRef(null), f = E({
		label: o,
		textRef: d,
		indexGuessBehavior: O.GuessFromOrder
	}), { store: p, getItemProps: m, setOpen: h, setValue: _, selectionRef: v, typingRef: y, valuesRef: S, keyboardActiveRef: C, multiple: w, highlightItemOnHover: D } = X(), ee = e(), k = s(p, Q.isActive, f.index), A = s(p, Q.isSelected, f.index, a), ne = s(p, Q.isSelectedByFocus, f.index), M = s(p, Q.isItemEqualToValue), N = f.index, P = N !== -1, F = q.useRef(null), I = te(N);
	b(() => {
		if (!P) return;
		let e = S.current;
		return e[N] = a, () => {
			delete e[N];
		};
	}, [
		P,
		N,
		a,
		S
	]), b(() => {
		if (!P) return;
		let e = p.state.value, t = e;
		w && Array.isArray(e) && e.length > 0 && (t = e[e.length - 1]), t !== void 0 && Z(t, a, M) && p.set("selectedIndex", N);
	}, [
		P,
		N,
		w,
		M,
		p,
		a
	]);
	let re = q.useMemo(() => ({
		disabled: c,
		selected: A,
		highlighted: k
	}), [
		c,
		A,
		k
	]), L = m({
		active: k,
		selected: A
	});
	L.onFocus = void 0, L.id = void 0;
	let R = q.useRef(null), z = q.useRef("mouse"), B = q.useRef(!1), { getButtonProps: V, buttonRef: ie } = j({
		disabled: c,
		focusableWhenDisabled: !0,
		native: l
	});
	function ae(e) {
		let t = p.state.value;
		if (w) {
			let n = Array.isArray(t) ? t : [];
			_(A ? xe(n, a, M) : [...n, a], T(x, e));
		} else _(a, T(x, e)), h(!1, T(x, e));
	}
	let H = {
		role: "option",
		"aria-selected": A,
		"aria-disabled": c || void 0,
		tabIndex: k ? 0 : -1,
		onFocus() {
			p.set("activeIndex", N);
		},
		onMouseEnter() {
			!C.current && p.state.selectedIndex === null && p.set("activeIndex", N);
		},
		onMouseMove() {
			D && p.set("activeIndex", N);
		},
		onMouseLeave(e) {
			!D || C.current || Ve(e) || ee.start(0, () => {
				p.state.activeIndex === N && p.set("activeIndex", null);
			});
		},
		onTouchStart() {
			v.current = {
				allowSelectedMouseUp: !1,
				allowUnselectedMouseUp: !1
			};
		},
		onKeyDown(e) {
			R.current = e.key, p.set("activeIndex", N);
		},
		onClick(e) {
			B.current = !1, !(e.type === "keydown" && R.current === null) && (c || R.current === " " && y.current || z.current !== "touch" && !k || (R.current = null, ae(e.nativeEvent)));
		},
		onPointerEnter(e) {
			z.current = e.pointerType;
		},
		onPointerDown(e) {
			z.current = e.pointerType, B.current = !0;
		},
		onMouseUp(e) {
			if (c) return;
			if (B.current) {
				B.current = !1;
				return;
			}
			let t = !v.current.allowSelectedMouseUp && A, n = !v.current.allowUnselectedMouseUp && !A;
			t || n || z.current !== "touch" && !k || ae(e.nativeEvent);
		}
	}, oe = g("div", t, {
		ref: [
			ie,
			n,
			f.ref,
			F
		],
		state: re,
		props: [
			L,
			H,
			u,
			V
		]
	}), U = q.useMemo(() => ({
		selected: A,
		indexRef: I,
		textRef: d,
		selectedByFocus: ne,
		hasRegistered: P
	}), [
		A,
		I,
		d,
		ne,
		P
	]);
	return /* @__PURE__ */ J(Ke.Provider, {
		value: U,
		children: oe
	});
}));
process.env.NODE_ENV !== "production" && (Je.displayName = "SelectItem");
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/select/item-text/SelectItemText.js
var Ye = /* @__PURE__ */ q.memo(/* @__PURE__ */ q.forwardRef(function(e, t) {
	let { indexRef: n, textRef: r, selectedByFocus: i, hasRegistered: a } = qe(), { selectedItemTextRef: o } = X(), { className: s, render: c, ...l } = e;
	return g("div", e, {
		ref: [
			q.useCallback((e) => {
				if (!e || !a) return;
				let t = o.current === null || !o.current.isConnected;
				(i || t && n.current === 0) && (o.current = e);
			}, [
				o,
				n,
				i,
				a
			]),
			t,
			r
		],
		props: l
	});
}));
process.env.NODE_ENV !== "production" && (Ye.displayName = "SelectItemText");
//#endregion
export { Fe as a, Oe as c, Be as i, Je as n, Ne as o, Ge as r, je as s, Ye as t };

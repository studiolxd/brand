import { t as e } from "./useControlled.js";
import { c as t, d as n, l as r, m as i, p as a, t as o } from "./useRenderElement.js";
import { A as s, L as c, R as l, x as ee } from "./floating-ui.utils.dom.js";
import { t as u } from "./useBaseUiId.js";
import { a as d, i as te, t as ne } from "./useOpenChangeComplete.js";
import { t as f } from "./useButton.js";
import { t as p } from "./visuallyHidden.js";
import { a as m, i as h, n as g, o as _, r as re, t as ie } from "./useValueChanged.js";
import * as v from "react";
import { forwardRef as y } from "react";
import { jsx as b, jsxs as ae } from "react/jsx-runtime";
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/checkbox/root/CheckboxRootDataAttributes.js
var x = /* @__PURE__ */ function(e) {
	return e.checked = "data-checked", e.unchecked = "data-unchecked", e.disabled = "data-disabled", e.readonly = "data-readonly", e.required = "data-required", e.valid = "data-valid", e.invalid = "data-invalid", e.touched = "data-touched", e.dirty = "data-dirty", e.filled = "data-filled", e.focused = "data-focused", e;
}({});
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/checkbox/utils/useStateAttributesMapping.js
function S(e) {
	return v.useMemo(() => ({
		checked(t) {
			return e.indeterminate ? {} : t ? { [x.checked]: "" } : { [x.unchecked]: "" };
		},
		..._
	}), [e.indeterminate]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/field/item/FieldItemContext.js
var C = /* @__PURE__ */ v.createContext({ disabled: !1 });
process.env.NODE_ENV !== "production" && (C.displayName = "FieldItemContext");
function oe() {
	return v.useContext(C);
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/checkbox-group/CheckboxGroupContext.js
var w = /* @__PURE__ */ v.createContext(void 0);
process.env.NODE_ENV !== "production" && (w.displayName = "CheckboxGroupContext");
function se(e = !0) {
	let t = v.useContext(w);
	if (t === void 0 && !e) throw Error(process.env.NODE_ENV === "production" ? i(3) : "Base UI: CheckboxGroupContext is missing. CheckboxGroup parts must be placed within <CheckboxGroup>.");
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/checkbox/root/CheckboxRootContext.js
var T = /* @__PURE__ */ v.createContext(void 0);
process.env.NODE_ENV !== "production" && (T.displayName = "CheckboxRootContext");
function E() {
	let e = v.useContext(T);
	if (e === void 0) throw Error(process.env.NODE_ENV === "production" ? i(14) : "Base UI: CheckboxRootContext is missing. Checkbox parts must be placed within <Checkbox.Root>.");
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/checkbox/root/CheckboxRoot.js
var ce = "data-parent", D = /* @__PURE__ */ v.forwardRef(function(i, d) {
	let { checked: te, className: ne, defaultChecked: _ = !1, disabled: y = !1, id: x, indeterminate: C = !1, inputRef: w, name: E, onCheckedChange: D, parent: O = !1, readOnly: k = !1, render: le, required: A = !1, uncheckedValue: ue, value: j, nativeButton: de = !1, ...fe } = i, { clearErrors: pe } = h(), { disabled: me, name: he, setDirty: ge, setFilled: M, setFocused: N, setTouched: _e, state: P, validationMode: ve, validityData: ye, shouldValidateOnChange: be, validation: xe } = m(), Se = oe(), { labelId: Ce, controlId: we, setControlId: F, getDescriptionProps: I } = g(), L = se(), R = L?.parent, z = R && L.allValues, B = me || Se.disabled || L?.disabled || y, V = he ?? E, H = j ?? V, U = u(), Te = u(), W = we;
	z ? W = O ? Te : `${R.id}-${H}` : x && (W = x);
	let G = {};
	z && (O ? G = L.parent.getParentProps() : H && (G = L.parent.getChildProps(H)));
	let Ee = l(D), { checked: K = te, indeterminate: q = C, onCheckedChange: De, ...Oe } = G, J = L?.value, ke = L?.setValue, Ae = L?.defaultValue, Y = v.useRef(null), { getButtonProps: je, buttonRef: Me } = f({
		disabled: B,
		native: de
	}), X = L?.validation ?? xe, [Z, Ne] = e({
		controlled: H && J && !O ? J.includes(H) : K,
		default: H && Ae && !O ? Ae.includes(H) : _,
		name: "Checkbox",
		state: "checked"
	});
	c(() => {
		if (F !== r) return F(W), () => {
			F(void 0);
		};
	}, [
		W,
		L,
		F,
		O
	]), re({
		enabled: !L,
		id: U,
		commit: X.commit,
		value: Z,
		controlRef: Y,
		name: V,
		getValue: () => Z
	});
	let Q = v.useRef(null), Pe = a(w, Q, X.inputRef);
	c(() => {
		Q.current && (Q.current.indeterminate = q, Z && M(!0));
	}, [
		Z,
		q,
		M
	]), ie(Z, () => {
		L && !O || (pe(V), M(Z), ge(Z !== ye.initialValue), be() ? X.commit(Z) : X.commit(Z, !0));
	});
	let Fe = n({
		checked: Z,
		disabled: B,
		name: O ? void 0 : V,
		id: W ?? void 0,
		required: A,
		ref: Pe,
		style: p,
		tabIndex: -1,
		type: "checkbox",
		"aria-hidden": !0,
		onChange(e) {
			if (e.nativeEvent.defaultPrevented) return;
			let t = e.target.checked, n = ee(s, e.nativeEvent);
			De?.(t, n), Ee(t, n), !n.isCanceled && (Ne(t), H && J && ke && !O && ke(t ? [...J, H] : J.filter((e) => e !== H), n));
		},
		onFocus() {
			Y.current?.focus();
		}
	}, j === void 0 ? t : { value: (L ? Z && j : j) || "" }, I, L ? X.getValidationProps : X.getInputValidationProps), Ie = z ? !!K : Z, Le = z && q || C;
	v.useEffect(() => {
		R && H && R.disabledStatesRef.current.set(H, B);
	}, [
		R,
		B,
		H
	]);
	let $ = v.useMemo(() => ({
		...P,
		checked: Ie,
		disabled: B,
		readOnly: k,
		required: A,
		indeterminate: Le
	}), [
		P,
		Ie,
		B,
		k,
		A,
		Le
	]), Re = S($), ze = o("span", i, {
		state: $,
		ref: [
			Me,
			Y,
			d,
			L?.registerControlRef
		],
		props: [
			{
				id: U,
				role: "checkbox",
				"aria-checked": q ? "mixed" : Z,
				"aria-readonly": k || void 0,
				"aria-required": A || void 0,
				"aria-labelledby": Ce,
				[ce]: O ? "" : void 0,
				onFocus() {
					N(!0);
				},
				onBlur() {
					let e = Q.current;
					e && (_e(!0), N(!1), ve === "onBlur" && X.commit(L ? J : e.checked));
				},
				onClick(e) {
					k || B || (e.preventDefault(), Q.current?.click());
				}
			},
			I,
			X.getValidationProps,
			fe,
			Oe,
			je
		],
		stateAttributesMapping: Re
	});
	return /* @__PURE__ */ ae(T.Provider, {
		value: $,
		children: [
			ze,
			!Z && !L && V && !O && ue !== void 0 && /* @__PURE__ */ b("input", {
				type: "hidden",
				name: V,
				value: ue
			}),
			/* @__PURE__ */ b("input", { ...Fe })
		]
	});
});
process.env.NODE_ENV !== "production" && (D.displayName = "CheckboxRoot");
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/checkbox/indicator/CheckboxIndicator.js
var O = /* @__PURE__ */ v.forwardRef(function(e, t) {
	let { render: n, className: r, keepMounted: i = !1, ...a } = e, s = E(), c = s.checked || s.indeterminate, { transitionStatus: l, setMounted: ee } = d(c), u = v.useRef(null), f = v.useMemo(() => ({
		...s,
		transitionStatus: l
	}), [s, l]);
	ne({
		open: c,
		ref: u,
		onComplete() {
			c || ee(!1);
		}
	});
	let p = S(s), m = v.useMemo(() => ({
		...p,
		...te,
		..._
	}), [p]), h = i || c, g = o("span", e, {
		enabled: h,
		ref: [t, u],
		state: f,
		stateAttributesMapping: m,
		props: a
	});
	return h ? g : null;
});
process.env.NODE_ENV !== "production" && (O.displayName = "CheckboxIndicator");
//#endregion
//#region src/stories/atoms/Checkbox/Checkbox.tsx
var k = y(function({ size: e = "md", className: t, checked: n, indeterminate: r, ...i }, a) {
	let o = [
		"checkbox",
		e === "md" ? "" : `checkbox--${e}`,
		t ?? ""
	].filter(Boolean).join(" "), s = n === "indeterminate" || r;
	return /* @__PURE__ */ b(D, {
		ref: a,
		className: o,
		checked: n === "indeterminate" ? !1 : n,
		indeterminate: s,
		"aria-checked": s ? "mixed" : void 0,
		...i,
		children: /* @__PURE__ */ b(O, {
			className: "checkbox__indicator",
			keepMounted: !0
		})
	});
});
//#endregion
export { k as t };

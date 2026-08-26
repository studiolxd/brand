import { t as e } from "./useControlled.js";
import { c as t, d as n, l as ee, m as r, p as i, t as a } from "./useRenderElement.js";
import { A as o, L as s, R as c, x as l } from "./floating-ui.utils.dom.js";
import { t as u } from "./useBaseUiId.js";
import { a as te, i as ne, t as re } from "./useOpenChangeComplete.js";
import { t as d } from "./useButton.js";
import { t as f } from "./visuallyHidden.js";
import { a as p, i as m, n as h, o as g, r as ie, t as ae } from "./useValueChanged.js";
import * as _ from "react";
import { forwardRef as oe } from "react";
import { jsx as v, jsxs as se } from "react/jsx-runtime";
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/checkbox/root/CheckboxRootDataAttributes.js
var y = /* @__PURE__ */ function(e) {
	return e.checked = "data-checked", e.unchecked = "data-unchecked", e.disabled = "data-disabled", e.readonly = "data-readonly", e.required = "data-required", e.valid = "data-valid", e.invalid = "data-invalid", e.touched = "data-touched", e.dirty = "data-dirty", e.filled = "data-filled", e.focused = "data-focused", e;
}({});
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/checkbox/utils/useStateAttributesMapping.js
function b(e) {
	return _.useMemo(() => ({
		checked(t) {
			return e.indeterminate ? {} : t ? { [y.checked]: "" } : { [y.unchecked]: "" };
		},
		...g
	}), [e.indeterminate]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/field/item/FieldItemContext.js
var x = /* @__PURE__ */ _.createContext({ disabled: !1 });
process.env.NODE_ENV !== "production" && (x.displayName = "FieldItemContext");
function ce() {
	return _.useContext(x);
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/checkbox-group/CheckboxGroupContext.js
var S = /* @__PURE__ */ _.createContext(void 0);
process.env.NODE_ENV !== "production" && (S.displayName = "CheckboxGroupContext");
function le(e = !0) {
	let t = _.useContext(S);
	if (t === void 0 && !e) throw Error(process.env.NODE_ENV === "production" ? r(3) : "Base UI: CheckboxGroupContext is missing. CheckboxGroup parts must be placed within <CheckboxGroup>.");
	return t;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/checkbox/root/CheckboxRootContext.js
var C = /* @__PURE__ */ _.createContext(void 0);
process.env.NODE_ENV !== "production" && (C.displayName = "CheckboxRootContext");
function w() {
	let e = _.useContext(C);
	if (e === void 0) throw Error(process.env.NODE_ENV === "production" ? r(14) : "Base UI: CheckboxRootContext is missing. Checkbox parts must be placed within <Checkbox.Root>.");
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/checkbox/root/CheckboxRoot.js
var ue = "data-parent", T = /* @__PURE__ */ _.forwardRef(function(r, te) {
	let { checked: ne, className: re, defaultChecked: g = !1, disabled: oe = !1, id: y, indeterminate: x = !1, inputRef: S, name: w, onCheckedChange: T, parent: E = !1, readOnly: D = !1, render: de, required: O = !1, uncheckedValue: k, value: A, nativeButton: fe = !1, ...pe } = r, { clearErrors: me } = m(), { disabled: he, name: ge, setDirty: _e, setFilled: j, setFocused: M, setTouched: ve, state: N, validationMode: ye, validityData: be, shouldValidateOnChange: xe, validation: Se } = p(), Ce = ce(), { labelId: we, controlId: Te, setControlId: P, getDescriptionProps: Ee } = h(), F = le(), I = F?.parent, L = I && F.allValues, R = he || Ce.disabled || F?.disabled || oe, z = ge ?? w, B = A ?? z, V = u(), De = u(), H = Te;
	L ? H = E ? De : `${I.id}-${B}` : y && (H = y);
	let U = {};
	L && (E ? U = F.parent.getParentProps() : B && (U = F.parent.getChildProps(B)));
	let Oe = c(T), { checked: W = ne, indeterminate: G = x, onCheckedChange: ke, ...Ae } = U, K = F?.value, q = F?.setValue, J = F?.defaultValue, Y = _.useRef(null), { getButtonProps: je, buttonRef: Me } = d({
		disabled: R,
		native: fe
	}), X = F?.validation ?? Se, [Z, Ne] = e({
		controlled: B && K && !E ? K.includes(B) : W,
		default: B && J && !E ? J.includes(B) : g,
		name: "Checkbox",
		state: "checked"
	});
	s(() => {
		if (P !== ee) return P(H), () => {
			P(void 0);
		};
	}, [
		H,
		F,
		P,
		E
	]), ie({
		enabled: !F,
		id: V,
		commit: X.commit,
		value: Z,
		controlRef: Y,
		name: z,
		getValue: () => Z
	});
	let Q = _.useRef(null), Pe = i(S, Q, X.inputRef);
	s(() => {
		Q.current && (Q.current.indeterminate = G, Z && j(!0));
	}, [
		Z,
		G,
		j
	]), ae(Z, () => {
		F && !E || (me(z), j(Z), _e(Z !== be.initialValue), xe() ? X.commit(Z) : X.commit(Z, !0));
	});
	let Fe = n({
		checked: Z,
		disabled: R,
		name: E ? void 0 : z,
		id: H ?? void 0,
		required: O,
		ref: Pe,
		style: f,
		tabIndex: -1,
		type: "checkbox",
		"aria-hidden": !0,
		onChange(e) {
			if (e.nativeEvent.defaultPrevented) return;
			let t = e.target.checked, n = l(o, e.nativeEvent);
			ke?.(t, n), Oe(t, n), !n.isCanceled && (Ne(t), B && K && q && !E && q(t ? [...K, B] : K.filter((e) => e !== B), n));
		},
		onFocus() {
			Y.current?.focus();
		}
	}, A === void 0 ? t : { value: (F ? Z && A : A) || "" }, Ee, F ? X.getValidationProps : X.getInputValidationProps), Ie = L ? !!W : Z, Le = L && G || x;
	_.useEffect(() => {
		I && B && I.disabledStatesRef.current.set(B, R);
	}, [
		I,
		R,
		B
	]);
	let $ = _.useMemo(() => ({
		...N,
		checked: Ie,
		disabled: R,
		readOnly: D,
		required: O,
		indeterminate: Le
	}), [
		N,
		Ie,
		R,
		D,
		O,
		Le
	]), Re = b($), ze = a("span", r, {
		state: $,
		ref: [
			Me,
			Y,
			te,
			F?.registerControlRef
		],
		props: [
			{
				id: V,
				role: "checkbox",
				"aria-checked": G ? "mixed" : Z,
				"aria-readonly": D || void 0,
				"aria-required": O || void 0,
				"aria-labelledby": we,
				[ue]: E ? "" : void 0,
				onFocus() {
					M(!0);
				},
				onBlur() {
					let e = Q.current;
					e && (ve(!0), M(!1), ye === "onBlur" && X.commit(F ? K : e.checked));
				},
				onClick(e) {
					D || R || (e.preventDefault(), Q.current?.click());
				}
			},
			Ee,
			X.getValidationProps,
			pe,
			Ae,
			je
		],
		stateAttributesMapping: Re
	});
	return /* @__PURE__ */ se(C.Provider, {
		value: $,
		children: [
			ze,
			!Z && !F && z && !E && k !== void 0 && /* @__PURE__ */ v("input", {
				type: "hidden",
				name: z,
				value: k
			}),
			/* @__PURE__ */ v("input", { ...Fe })
		]
	});
});
process.env.NODE_ENV !== "production" && (T.displayName = "CheckboxRoot");
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/checkbox/indicator/CheckboxIndicator.js
var E = /* @__PURE__ */ _.forwardRef(function(e, t) {
	let { render: n, className: ee, keepMounted: r = !1, ...i } = e, o = w(), s = o.checked || o.indeterminate, { transitionStatus: c, setMounted: l } = te(s), u = _.useRef(null), d = _.useMemo(() => ({
		...o,
		transitionStatus: c
	}), [o, c]);
	re({
		open: s,
		ref: u,
		onComplete() {
			s || l(!1);
		}
	});
	let f = b(o), p = _.useMemo(() => ({
		...f,
		...ne,
		...g
	}), [f]), m = r || s, h = a("span", e, {
		enabled: m,
		ref: [t, u],
		state: d,
		stateAttributesMapping: p,
		props: i
	});
	return m ? h : null;
});
process.env.NODE_ENV !== "production" && (E.displayName = "CheckboxIndicator");
//#endregion
//#region src/stories/atoms/Checkbox/Checkbox.tsx
var D = oe(function({ size: e = "md", className: t, checked: n, indeterminate: ee, onCheckedChange: r, ...i }, a) {
	let o = [
		"checkbox",
		e === "md" ? "" : `checkbox--${e}`,
		t ?? ""
	].filter(Boolean).join(" "), s = n === "indeterminate" || ee;
	return /* @__PURE__ */ v(T, {
		ref: a,
		className: o,
		render: /* @__PURE__ */ v("button", { type: "button" }),
		nativeButton: !0,
		checked: n === "indeterminate" ? !1 : n,
		indeterminate: s,
		"aria-checked": s ? "mixed" : void 0,
		onCheckedChange: r ? (e) => r(e) : void 0,
		...i,
		children: /* @__PURE__ */ v(E, {
			className: "checkbox__indicator",
			keepMounted: !0
		})
	});
});
//#endregion
export { D as t };

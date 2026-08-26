import { t as e } from "./useControlled.js";
import { d as t, m as n, p as r, t as i } from "./useRenderElement.js";
import { A as a, L as o, R as s, x as ee } from "./floating-ui.utils.dom.js";
import { t as c } from "./useBaseUiId.js";
import { t as l } from "./useButton.js";
import { t as u } from "./visuallyHidden.js";
import { a as d, i as f, n as p, o as m, r as te, t as ne } from "./useValueChanged.js";
import { t as re } from "./useLabelableId.js";
import * as h from "react";
import { forwardRef as g, useCallback as _ } from "react";
import { jsx as v, jsxs as y } from "react/jsx-runtime";
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/switch/root/SwitchRootContext.js
var b = /* @__PURE__ */ h.createContext(void 0);
process.env.NODE_ENV !== "production" && (b.displayName = "SwitchRootContext");
function x() {
	let e = h.useContext(b);
	if (e === void 0) throw Error(process.env.NODE_ENV === "production" ? n(63) : "Base UI: SwitchRootContext is missing. Switch parts must be placed within <Switch.Root>.");
	return e;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/switch/root/SwitchRootDataAttributes.js
var S = /* @__PURE__ */ function(e) {
	return e.checked = "data-checked", e.unchecked = "data-unchecked", e.disabled = "data-disabled", e.readonly = "data-readonly", e.required = "data-required", e.valid = "data-valid", e.invalid = "data-invalid", e.touched = "data-touched", e.dirty = "data-dirty", e.filled = "data-filled", e.focused = "data-focused", e;
}({}), C = {
	...m,
	checked(e) {
		return e ? { [S.checked]: "" } : { [S.unchecked]: "" };
	}
}, w = /* @__PURE__ */ h.forwardRef(function(n, m) {
	let { checked: g, className: _, defaultChecked: x, id: S, inputRef: w, name: T, nativeButton: E = !1, onCheckedChange: D, readOnly: O = !1, required: k = !1, disabled: ie = !1, render: ae, uncheckedValue: A, ...oe } = n, { clearErrors: se } = f(), { state: j, setTouched: M, setDirty: N, validityData: P, setFilled: F, setFocused: I, shouldValidateOnChange: L, validationMode: R, disabled: z, name: B, validation: V } = d(), { labelId: H } = p(), U = z || ie, W = B ?? T, G = s(D), K = h.useRef(null), q = r(K, w, V.inputRef), J = h.useRef(null), Y = c(), X = re({
		id: S,
		implicit: !1,
		controlRef: J
	}), [Z, Q] = e({
		controlled: g,
		default: !!x,
		name: "Switch",
		state: "checked"
	});
	te({
		id: Y,
		commit: V.commit,
		value: Z,
		controlRef: J,
		name: W,
		getValue: () => Z
	}), o(() => {
		K.current && F(K.current.checked);
	}, [K, F]), ne(Z, () => {
		se(W), N(Z !== P.initialValue), F(Z), L() ? V.commit(Z) : V.commit(Z, !0);
	});
	let { getButtonProps: ce, buttonRef: le } = l({
		disabled: U,
		native: E
	}), ue = {
		id: Y,
		role: "switch",
		"aria-checked": Z,
		"aria-readonly": O || void 0,
		"aria-labelledby": H,
		onFocus() {
			U || I(!0);
		},
		onBlur() {
			let e = K.current;
			!e || U || (M(!0), I(!1), R === "onBlur" && V.commit(e.checked));
		},
		onClick(e) {
			O || U || (e.preventDefault(), K?.current?.click());
		}
	}, de = h.useMemo(() => t({
		checked: Z,
		disabled: U,
		id: X,
		name: W,
		required: k,
		style: u,
		tabIndex: -1,
		type: "checkbox",
		"aria-hidden": !0,
		ref: q,
		onChange(e) {
			if (e.nativeEvent.defaultPrevented) return;
			let t = e.target.checked, n = ee(a, e.nativeEvent);
			G?.(t, n), !n.isCanceled && Q(t);
		},
		onFocus() {
			J.current?.focus();
		}
	}, V.getInputValidationProps), [
		Z,
		U,
		q,
		X,
		W,
		G,
		k,
		Q,
		V
	]), $ = h.useMemo(() => ({
		...j,
		checked: Z,
		disabled: U,
		readOnly: O,
		required: k
	}), [
		j,
		Z,
		U,
		O,
		k
	]), fe = i("span", n, {
		state: $,
		ref: [
			m,
			J,
			le
		],
		props: [
			ue,
			V.getValidationProps,
			oe,
			ce
		],
		stateAttributesMapping: C
	});
	return /* @__PURE__ */ y(b.Provider, {
		value: $,
		children: [
			fe,
			!Z && W && A !== void 0 && /* @__PURE__ */ v("input", {
				type: "hidden",
				name: W,
				value: A
			}),
			/* @__PURE__ */ v("input", { ...de })
		]
	});
});
process.env.NODE_ENV !== "production" && (w.displayName = "SwitchRoot");
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/switch/thumb/SwitchThumb.js
var T = /* @__PURE__ */ h.forwardRef(function(e, t) {
	let { render: n, className: r, ...a } = e, { state: o } = d(), s = x();
	return i("span", e, {
		state: {
			...o,
			...s
		},
		ref: t,
		stateAttributesMapping: C,
		props: a
	});
});
process.env.NODE_ENV !== "production" && (T.displayName = "SwitchThumb");
//#endregion
//#region src/stories/atoms/Switcher/Switcher.tsx
var E = g(function({ size: e = "md", className: t, value: n, ...r }, i) {
	return /* @__PURE__ */ v(w, {
		ref: i,
		className: [
			"switcher",
			e === "md" ? "" : `switcher--${e}`,
			t ?? ""
		].filter(Boolean).join(" "),
		inputRef: _((e) => {
			e && n !== void 0 && (e.value = n);
		}, [n]),
		...r,
		children: /* @__PURE__ */ v(T, { className: "switcher__thumb" })
	});
});
//#endregion
export { E as t };

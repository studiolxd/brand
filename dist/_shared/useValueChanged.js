import { c as e, l as t, m as n } from "./useRenderElement.js";
import { L as r, R as i } from "./floating-ui.utils.dom.js";
import * as a from "react";
import * as o from "react-dom";
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/field/control/FieldControlDataAttributes.js
var s = /* @__PURE__ */ function(e) {
	return e.disabled = "data-disabled", e.valid = "data-valid", e.invalid = "data-invalid", e.touched = "data-touched", e.dirty = "data-dirty", e.filled = "data-filled", e.focused = "data-focused", e;
}({}), c = {
	badInput: !1,
	customError: !1,
	patternMismatch: !1,
	rangeOverflow: !1,
	rangeUnderflow: !1,
	stepMismatch: !1,
	tooLong: !1,
	tooShort: !1,
	typeMismatch: !1,
	valid: null,
	valueMissing: !1
}, l = { valid(e) {
	return e === null ? null : e ? { [s.valid]: "" } : { [s.invalid]: "" };
} }, u = /* @__PURE__ */ a.createContext({
	invalid: void 0,
	name: void 0,
	validityData: {
		state: c,
		errors: [],
		error: "",
		value: "",
		initialValue: null
	},
	setValidityData: t,
	disabled: void 0,
	touched: !1,
	setTouched: t,
	dirty: !1,
	setDirty: t,
	filled: !1,
	setFilled: t,
	focused: !1,
	setFocused: t,
	validate: () => null,
	validationMode: "onSubmit",
	validationDebounceTime: 0,
	shouldValidateOnChange: () => !1,
	state: {
		disabled: !1,
		valid: null,
		touched: !1,
		dirty: !1,
		filled: !1,
		focused: !1
	},
	markedDirtyRef: { current: !1 },
	validation: {
		getValidationProps: (t = e) => t,
		getInputValidationProps: (t = e) => t,
		inputRef: { current: null },
		commit: async () => {}
	}
});
process.env.NODE_ENV !== "production" && (u.displayName = "FieldRootContext");
function d(e = !0) {
	let r = a.useContext(u);
	if (r.setValidityData === t && !e) throw Error(process.env.NODE_ENV === "production" ? n(28) : "Base UI: FieldRootContext is missing. Field parts must be placed within <Field.Root>.");
	return r;
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/field/utils/getCombinedFieldValidityData.js
function f(e, t) {
	return {
		...e,
		state: {
			...e.state,
			valid: !t && e.state.valid
		}
	};
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/form/FormContext.js
var p = /* @__PURE__ */ a.createContext({
	formRef: { current: { fields: /* @__PURE__ */ new Map() } },
	errors: {},
	clearErrors: t,
	validationMode: "onSubmit",
	submitAttemptedRef: { current: !1 }
});
process.env.NODE_ENV !== "production" && (p.displayName = "FormContext");
function m() {
	return a.useContext(p);
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/field/useField.js
function h(e) {
	let { enabled: t = !0, value: n, id: a, name: s, controlRef: c, commit: l } = e, { formRef: u } = m(), { invalid: p, markedDirtyRef: h, validityData: g, setValidityData: _ } = d(), v = i(e.getValue);
	r(() => {
		if (!t) return;
		let e = n;
		e === void 0 && (e = v()), g.initialValue === null && e !== null && _((t) => ({
			...t,
			initialValue: e
		}));
	}, [
		t,
		_,
		n,
		g.initialValue,
		v
	]), r(() => {
		!t || !a || u.current.fields.set(a, {
			getValue: v,
			name: s,
			controlRef: c,
			validityData: f(g, p),
			validate() {
				let e = n;
				e === void 0 && (e = v()), h.current = !0, o.flushSync(() => l(e));
			}
		});
	}, [
		l,
		c,
		t,
		u,
		v,
		a,
		p,
		h,
		s,
		g,
		n
	]), r(() => {
		let e = u.current.fields;
		return () => {
			a && e.delete(a);
		};
	}, [u, a]);
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/labelable-provider/LabelableContext.js
var g = /* @__PURE__ */ a.createContext({
	controlId: void 0,
	setControlId: t,
	labelId: void 0,
	setLabelId: t,
	messageIds: [],
	setMessageIds: t,
	getDescriptionProps: (e) => e
});
process.env.NODE_ENV !== "production" && (g.displayName = "LabelableContext");
function _() {
	return a.useContext(g);
}
//#endregion
//#region node_modules/.pnpm/@base-ui-components+react@1.0.0-rc.0_@types+react@19.2.14_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/@base-ui-components/react/esm/utils/useValueChanged.js
function v(e, t) {
	let n = a.useRef(e), o = i(t);
	r(() => {
		n.current !== e && o(n.current);
	}, [e, o]), r(() => {
		n.current = e;
	}, [e]);
}
//#endregion
export { d as a, m as i, _ as n, l as o, h as r, v as t };

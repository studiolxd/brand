'use client';
import './form-field.css';
"use client";
import { Label as e } from "./label.js";
import { jsx as t } from "react/jsx-runtime";
import n, { createContext as r, useContext as i, useId as a } from "react";
import { Slot as o } from "@radix-ui/react-slot";
//#region node_modules/react-hook-form/dist/index.esm.mjs
var s = (e) => e.type === "checkbox", c = (e) => e.type === "file", l = (e) => e instanceof Date, u = (e) => e == null, d = (e) => typeof e == "object", f = (e) => !u(e) && !Array.isArray(e) && d(e) && !l(e), p = (e) => f(e) && e.target ? s(e.target) ? e.target.checked : c(e.target) ? e.target.files : e.target.value : e, m = (e, t) => t.split(".").some((t, n, r) => !isNaN(Number(t)) && e.has(r.slice(0, n).join("."))), h = typeof window < "u" && window.HTMLElement !== void 0 && typeof document < "u";
function g(e) {
	if (typeof e != "object" || !e) return e;
	if (e instanceof Date) return new Date(e);
	let t = typeof FileList < "u" && e instanceof FileList;
	if (h && (e instanceof Blob || t)) return e;
	let n = Array.isArray(e);
	if (!n && e.constructor !== Object) return e;
	let r = n ? [] : Object.create(Object.getPrototypeOf(e));
	for (let t in e) Object.prototype.hasOwnProperty.call(e, t) && (r[t] = g(e[t]));
	return r;
}
var _ = {
	BLUR: "blur",
	FOCUS_OUT: "focusout",
	CHANGE: "change",
	SUBMIT: "submit",
	TRIGGER: "trigger",
	VALID: "valid"
}, v = {
	onBlur: "onBlur",
	onChange: "onChange",
	onSubmit: "onSubmit",
	onTouched: "onTouched",
	all: "all"
}, y = [
	"__proto__",
	"constructor",
	"prototype"
], b = /^\w*$/, x = (e) => b.test(e), S = (e) => e === void 0, C = /[.[\]'"]/, w = (e) => e.split(C).filter(Boolean), T = (e, t, n) => {
	if (!t || !f(e)) return n;
	let r = x(t) ? [t] : w(t);
	if (r.some((e) => y.includes(e))) return n;
	let i = r.reduce((e, t) => u(e) ? void 0 : e[t], e);
	return S(i) || i === e ? S(e[t]) ? n : e[t] : i;
}, E = (e) => typeof e == "boolean", D = (e) => typeof e == "function", O = (e, t, n) => {
	let r = -1, i = x(t) ? [t] : w(t), a = i.length, o = a - 1;
	for (; ++r < a;) {
		let t = i[r], a = n;
		if (r !== o) {
			let n = e[t];
			a = f(n) || Array.isArray(n) ? n : isNaN(+i[r + 1]) ? {} : [];
		}
		if (y.includes(t)) return;
		e[t] = a, e = e[t];
	}
}, k = n.createContext(null);
k.displayName = "HookFormControlContext";
var A = () => n.useContext(k), j = (e, t, n, r = !0) => {
	let i = {};
	for (let a in e) Object.defineProperty(i, a, { get: () => {
		let i = a;
		return t._proxyFormState[i] !== v.all && (t._proxyFormState[i] = !r || v.all), n && (n[i] = !0), e[i];
	} });
	return i;
}, M = h ? n.useLayoutEffect : n.useEffect, N = (e) => {
	let t = e.constructor && e.constructor.prototype;
	return f(t) && t.hasOwnProperty("isPrototypeOf");
}, P = (e) => u(e) || !d(e), F = (e, t) => t.length === 0 && !Array.isArray(e) && !N(e);
function I(e, t, n = /* @__PURE__ */ new WeakMap()) {
	if (e === t) return !0;
	if (P(e) || P(t)) return Object.is(e, t);
	if (l(e) && l(t)) return Object.is(e.getTime(), t.getTime());
	let r = Object.keys(e), i = Object.keys(t);
	if (r.length !== i.length) return !1;
	if (F(e, r) || F(t, i)) return Object.is(e, t);
	if (!r.length && Array.isArray(e) !== Array.isArray(t)) return !1;
	let a = n.get(e);
	if (a && a.has(t)) return !0;
	if (a) a.add(t);
	else {
		let r = /* @__PURE__ */ new WeakSet();
		r.add(t), n.set(e, r);
	}
	for (let i of r) {
		let r = e[i];
		if (!(i in t)) return !1;
		if (i !== "ref") {
			let e = t[i];
			if (l(r) && l(e) || (f(r) || Array.isArray(r)) && (f(e) || Array.isArray(e)) ? !I(r, e, n) : !Object.is(r, e)) return !1;
		}
	}
	return !0;
}
function L() {
	let e = n.useRef(!1), t = n.useRef(void 0);
	return {
		resyncIfNeeded: n.useCallback((n, r, i) => {
			if (n && e.current) {
				let e = r();
				I(t.current, e) || i(e);
			}
			e.current = !0;
		}, []),
		snapshot: n.useCallback((e, n) => {
			e && (t.current = g(n()));
		}, [])
	};
}
function R(e) {
	let t = A(), { control: r = t, disabled: i, name: a, exact: o } = e || {}, [s, c] = n.useState(() => ({
		...r._formState,
		defaultValues: r._defaultValues
	})), l = n.useRef({
		isDirty: !1,
		isLoading: !1,
		dirtyFields: !1,
		touchedFields: !1,
		validatingFields: !1,
		isValidating: !1,
		isValid: !1,
		errors: !1
	}), { resyncIfNeeded: u, snapshot: d } = L();
	return M(() => {
		let e = () => ({
			...r._formState,
			defaultValues: r._defaultValues
		});
		u(!i, e, c);
		let t = r._subscribe({
			name: a,
			formState: l.current,
			exact: o,
			callback: (e) => {
				!i && c({
					...r._formState,
					...e,
					defaultValues: r._defaultValues
				});
			}
		});
		return () => {
			t(), d(!i, e);
		};
	}, [
		a,
		i,
		o,
		u,
		d
	]), n.useEffect(() => {
		l.current.isValid && r._setValid(!0);
	}, [r]), n.useMemo(() => j(s, r, l.current, !1), [s, r]);
}
var z = (e) => typeof e == "string", B = (e, t, n, r, i) => z(e) ? (r && t.watch.add(e), T(n, e, i)) : Array.isArray(e) ? e.map((e) => (r && t.watch.add(e), T(n, e))) : (r && (t.watchAll = !0), n);
function V(e) {
	let t = A(), { control: r = t, name: i, defaultValue: a, disabled: o, exact: s, compute: c } = e || {}, l = n.useRef(a), u = n.useRef(c), d = n.useRef(void 0), f = n.useRef(r), p = n.useRef(i);
	u.current = c;
	let [m, h] = n.useState(() => {
		let e = r._getWatch(i, l.current);
		return u.current ? u.current(e) : e;
	}), g = n.useCallback((e) => {
		let t = B(i, r._names, e || r._formValues, !1, l.current);
		return u.current ? u.current(t) : t;
	}, [
		r._formValues,
		r._names,
		i
	]), _ = n.useCallback((e) => {
		if (!o) {
			let t = B(i, r._names, e || r._formValues, !1, l.current);
			if (u.current) {
				let e = u.current(t);
				I(e, d.current) || (h(e), d.current = e);
			} else h(t);
		}
	}, [
		r._formValues,
		r._names,
		o,
		i
	]), { resyncIfNeeded: v, snapshot: y } = L(), b = n.useRef(_);
	b.current = _;
	let x = n.useRef(g);
	x.current = g, M(() => {
		f.current !== r || !I(p.current, i) ? (f.current = r, p.current = i, b.current()) : v(!o, () => x.current(), (e) => {
			h(e), d.current = e;
		});
		let e = r._subscribe({
			name: i,
			formState: { values: !0 },
			exact: s,
			callback: (e) => {
				b.current(e.values);
			}
		});
		return () => {
			e(), y(!o, () => x.current());
		};
	}, [
		r,
		s,
		i,
		o,
		v,
		y
	]), n.useEffect(() => r._removeUnmounted());
	let S = f.current !== r, C = p.current;
	return n.useMemo(() => {
		if (o) return !1;
		let e = !S && !I(C, i);
		return S || e;
	}, [
		o,
		S,
		i,
		C
	]) ? g() : m;
}
function H(e) {
	let t = A(), { name: r, disabled: i, control: a = t, shouldUnregister: o, defaultValue: s, exact: c = !0 } = e, l = m(a._names.array, r), u = V({
		control: a,
		name: r,
		defaultValue: n.useMemo(() => T(a._formValues, r, T(a._defaultValues, r, s)), [
			a,
			r,
			s
		]),
		exact: c
	}), d = R({
		control: a,
		name: r,
		exact: c
	}), f = n.useRef(e), h = n.useRef(null), v = n.useRef(a.register(r, {
		...e.rules,
		value: u,
		...E(e.disabled) ? { disabled: e.disabled } : {}
	}));
	f.current = e;
	let y = n.useMemo(() => Object.defineProperties({}, {
		invalid: {
			enumerable: !0,
			get: () => !!T(d.errors, r)
		},
		isDirty: {
			enumerable: !0,
			get: () => !!T(d.dirtyFields, r)
		},
		isTouched: {
			enumerable: !0,
			get: () => !!T(d.touchedFields, r)
		},
		isValidating: {
			enumerable: !0,
			get: () => !!T(d.validatingFields, r)
		},
		error: {
			enumerable: !0,
			get: () => T(d.errors, r)
		}
	}), [d, r]), b = n.useCallback((e) => {
		let t = p(e);
		return T(a._fields, r) || (v.current = a.register(r, {
			...f.current.rules,
			value: t
		})), v.current.onChange({
			target: {
				value: p(e),
				name: r
			},
			type: _.CHANGE
		});
	}, [r, a]), x = n.useCallback(() => v.current.onBlur({
		target: {
			value: T(a._formValues, r),
			name: r
		},
		type: _.BLUR
	}), [r, a._formValues]), C = n.useCallback((e) => {
		e && (h.current = {
			focus: () => D(e.focus) && e.focus(),
			select: () => D(e.select) && e.select(),
			setCustomValidity: (t) => D(e.setCustomValidity) && e.setCustomValidity(t),
			reportValidity: () => D(e.reportValidity) && e.reportValidity()
		});
		let t = T(a._fields, r);
		t && t._f && e && (t._f.ref = h.current);
	}, [a._fields, r]), w = n.useMemo(() => ({
		name: r,
		value: u,
		...E(i) || d.disabled ? { disabled: d.disabled || i } : {},
		onChange: b,
		onBlur: x,
		ref: C
	}), [
		r,
		i,
		d.disabled,
		b,
		x,
		C,
		u
	]);
	return n.useEffect(() => {
		let e = a._options.shouldUnregister || o;
		v.current = a.register(r, {
			...f.current.rules,
			...E(f.current.disabled) ? { disabled: f.current.disabled } : {}
		});
		let t = (e, t) => {
			let n = T(a._fields, e);
			n && n._f && (n._f.mount = t);
		};
		if (t(r, !0), e) {
			let e = g(T(o ? a._defaultValues : a._options.values || a._defaultValues, r, T(a._options.defaultValues, r, f.current.defaultValue)));
			O(a._defaultValues, r, e), S(T(a._formValues, r)) && O(a._formValues, r, e);
		}
		if (!l && a.register(r), h.current) {
			let e = T(a._fields, r);
			e && e._f && (e._f.ref = h.current);
		}
		return () => {
			(l ? e && !a._state.action : e) ? a.unregister(r) : t(r, !1);
		};
	}, [
		r,
		a,
		l,
		o
	]), n.useEffect(() => {
		a._setDisabledField({
			disabled: i,
			name: r
		});
	}, [
		i,
		r,
		a
	]), n.useMemo(() => ({
		field: w,
		formState: d,
		fieldState: y
	}), [
		w,
		d,
		y
	]);
}
var U = (e) => e.render(H(e)), W = n.createContext(null);
W.displayName = "HookFormContext";
var G = () => n.useContext(W), K = ({ children: e, watch: t, getValues: r, getErrors: i, getFieldState: a, setError: o, clearErrors: s, setValue: c, setValues: l, trigger: u, formState: d, resetField: f, reset: p, resetDefaultValues: m, handleSubmit: h, unregister: g, control: _, register: v, setFocus: y, subscribe: b }) => {
	let x = n.useMemo(() => ({
		watch: t,
		getValues: r,
		getErrors: i,
		getFieldState: a,
		setError: o,
		clearErrors: s,
		setValue: c,
		setValues: l,
		trigger: u,
		formState: d,
		resetField: f,
		reset: p,
		resetDefaultValues: m,
		handleSubmit: h,
		unregister: g,
		control: _,
		register: v,
		setFocus: y,
		subscribe: b
	}), [
		s,
		_,
		d,
		i,
		a,
		r,
		h,
		v,
		p,
		m,
		f,
		o,
		y,
		c,
		l,
		b,
		u,
		g,
		t
	]);
	return n.createElement(W.Provider, { value: x }, n.createElement(k.Provider, { value: x.control }, e));
};
v.onSubmit, v.onChange;
//#endregion
//#region src/stories/molecules/FormField/FormField.tsx
var q = K, J = r({}), Y = ({ ...e }) => /* @__PURE__ */ t(J.Provider, {
	value: { name: e.name },
	children: /* @__PURE__ */ t(U, { ...e })
}), X = r({});
function Z() {
	let e = i(J), t = i(X), { getFieldState: n, formState: r } = G(), a = n(e.name, r), { id: o } = t;
	return {
		id: o,
		name: e.name,
		formItemId: `${o}-form-item`,
		formDescriptionId: `${o}-form-item-description`,
		formMessageId: `${o}-form-item-message`,
		...a
	};
}
function Q({ className: e, ...n }) {
	let r = a();
	return /* @__PURE__ */ t(X.Provider, {
		value: { id: r },
		children: /* @__PURE__ */ t("div", {
			className: ["form-field", e].filter(Boolean).join(" "),
			...n
		})
	});
}
function $({ ...n }) {
	let { error: r, formItemId: i } = Z();
	return /* @__PURE__ */ t(e, {
		"data-error": !!r,
		htmlFor: i,
		...n
	});
}
function ee({ ...e }) {
	let { error: n, formItemId: r, formDescriptionId: i, formMessageId: a } = Z();
	return /* @__PURE__ */ t(o, {
		id: r,
		"aria-describedby": n ? `${i} ${a}` : i,
		"aria-invalid": !!n,
		...e
	});
}
function te({ className: e, ...n }) {
	let { formDescriptionId: r } = Z();
	return /* @__PURE__ */ t("p", {
		id: r,
		className: ["form-field__description", e].filter(Boolean).join(" "),
		...n
	});
}
function ne({ className: e, children: n, ...r }) {
	let { error: i, formMessageId: a } = Z(), o = i ? String(i?.message ?? "") : n;
	return o ? /* @__PURE__ */ t("p", {
		id: a,
		role: "alert",
		className: ["form-field__message", e].filter(Boolean).join(" "),
		...r,
		children: o
	}) : null;
}
function re({ className: e, ...n }) {
	let { formState: r } = G(), i = r.errors.root?.message;
	return i ? /* @__PURE__ */ t("p", {
		role: "alert",
		className: ["form-error", e].filter(Boolean).join(" "),
		...n,
		children: i
	}) : null;
}
//#endregion
export { ee as FormControl, te as FormDescription, Y as FormField, Q as FormItem, $ as FormLabel, ne as FormMessage, q as FormProvider, re as FormRootMessage, Z as useFormField };

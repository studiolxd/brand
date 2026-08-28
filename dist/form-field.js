'use client';
import './form-field.css';
import { Label as e } from "./label.js";
import { createContext as t, useContext as n, useId as r } from "react";
import { jsx as i } from "react/jsx-runtime";
import { useRender as a } from "@base-ui-components/react/use-render";
import { Controller as o, FormProvider as s, useFormContext as c } from "react-hook-form";
//#region src/stories/molecules/FormField/FormField.tsx
var l = t(void 0);
function u({ translate: e, children: t, ...n }) {
	return /* @__PURE__ */ i(l.Provider, {
		value: e,
		children: /* @__PURE__ */ i(s, {
			...n,
			children: t
		})
	});
}
var d = t({}), f = ({ ...e }) => /* @__PURE__ */ i(d.Provider, {
	value: { name: e.name },
	children: /* @__PURE__ */ i(o, { ...e })
}), p = t({});
function m() {
	let e = n(d), t = n(p), { getFieldState: r, formState: i } = c(), a = r(e.name, i), { id: o } = t;
	return {
		id: o,
		name: e.name,
		formItemId: `${o}-form-item`,
		formDescriptionId: `${o}-form-item-description`,
		formMessageId: `${o}-form-item-message`,
		...a
	};
}
function h({ className: e, ...t }) {
	let n = r();
	return /* @__PURE__ */ i(p.Provider, {
		value: { id: n },
		children: /* @__PURE__ */ i("div", {
			className: ["form-field", e].filter(Boolean).join(" "),
			...t
		})
	});
}
function g({ ...t }) {
	let { error: n, formItemId: r } = m();
	return /* @__PURE__ */ i(e, {
		"data-error": !!n,
		htmlFor: r,
		...t
	});
}
function _({ children: e, ...t }) {
	let { error: n, formItemId: r, formDescriptionId: i, formMessageId: o } = m();
	return a({
		render: e,
		props: {
			id: r,
			"aria-describedby": n ? `${i} ${o}` : i,
			"aria-invalid": !!n,
			...t
		}
	});
}
function v({ className: e, ...t }) {
	let { formDescriptionId: n } = m();
	return /* @__PURE__ */ i("p", {
		id: n,
		className: ["form-field__description", e].filter(Boolean).join(" "),
		...t
	});
}
function y({ className: e, children: t, ...r }) {
	let { error: a, formMessageId: o } = m(), s = n(l), c = a ? String(a?.message ?? "") : "", u = a ? s && c ? s(c) : c : t;
	return u ? /* @__PURE__ */ i("p", {
		id: o,
		role: "alert",
		className: ["form-field__message", e].filter(Boolean).join(" "),
		...r,
		children: u
	}) : null;
}
function b({ className: e, ...t }) {
	let { formState: r } = c(), a = n(l), o = r.errors.root?.message, s = o && a ? a(String(o)) : o;
	return s ? /* @__PURE__ */ i("p", {
		role: "alert",
		className: ["form-error", e].filter(Boolean).join(" "),
		...t,
		children: s
	}) : null;
}
//#endregion
export { _ as FormControl, v as FormDescription, f as FormField, h as FormItem, g as FormLabel, y as FormMessage, u as FormProvider, b as FormRootMessage, m as useFormField };

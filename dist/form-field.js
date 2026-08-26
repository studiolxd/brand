'use client';
import './form-field.css';
import { t as e } from "./_shared/useRender.js";
import { Label as t } from "./label.js";
import { createContext as n, useContext as r, useId as i } from "react";
import { jsx as a } from "react/jsx-runtime";
import { Controller as o, FormProvider as s, useFormContext as c } from "react-hook-form";
//#region src/stories/molecules/FormField/FormField.tsx
var l = s, u = n({}), d = ({ ...e }) => /* @__PURE__ */ a(u.Provider, {
	value: { name: e.name },
	children: /* @__PURE__ */ a(o, { ...e })
}), f = n({});
function p() {
	let e = r(u), t = r(f), { getFieldState: n, formState: i } = c(), a = n(e.name, i), { id: o } = t;
	return {
		id: o,
		name: e.name,
		formItemId: `${o}-form-item`,
		formDescriptionId: `${o}-form-item-description`,
		formMessageId: `${o}-form-item-message`,
		...a
	};
}
function m({ className: e, ...t }) {
	let n = i();
	return /* @__PURE__ */ a(f.Provider, {
		value: { id: n },
		children: /* @__PURE__ */ a("div", {
			className: ["form-field", e].filter(Boolean).join(" "),
			...t
		})
	});
}
function h({ ...e }) {
	let { error: n, formItemId: r } = p();
	return /* @__PURE__ */ a(t, {
		"data-error": !!n,
		htmlFor: r,
		...e
	});
}
function g({ children: t, ...n }) {
	let { error: r, formItemId: i, formDescriptionId: a, formMessageId: o } = p();
	return e({
		render: t,
		props: {
			id: i,
			"aria-describedby": r ? `${a} ${o}` : a,
			"aria-invalid": !!r,
			...n
		}
	});
}
function _({ className: e, ...t }) {
	let { formDescriptionId: n } = p();
	return /* @__PURE__ */ a("p", {
		id: n,
		className: ["form-field__description", e].filter(Boolean).join(" "),
		...t
	});
}
function v({ className: e, children: t, ...n }) {
	let { error: r, formMessageId: i } = p(), o = r ? String(r?.message ?? "") : t;
	return o ? /* @__PURE__ */ a("p", {
		id: i,
		role: "alert",
		className: ["form-field__message", e].filter(Boolean).join(" "),
		...n,
		children: o
	}) : null;
}
function y({ className: e, ...t }) {
	let { formState: n } = c(), r = n.errors.root?.message;
	return r ? /* @__PURE__ */ a("p", {
		role: "alert",
		className: ["form-error", e].filter(Boolean).join(" "),
		...t,
		children: r
	}) : null;
}
//#endregion
export { g as FormControl, _ as FormDescription, d as FormField, m as FormItem, h as FormLabel, v as FormMessage, l as FormProvider, y as FormRootMessage, p as useFormField };

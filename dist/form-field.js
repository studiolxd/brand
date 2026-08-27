'use client';
import './form-field.css';
import { Label as e } from "./label.js";
import { jsx as t } from "react/jsx-runtime";
import { createContext as n, useContext as r, useId as i } from "react";
import { useRender as a } from "@base-ui-components/react/use-render";
import { Controller as o, FormProvider as s, useFormContext as c } from "react-hook-form";
//#region src/stories/molecules/FormField/FormField.tsx
var l = n(void 0);
function u({ translate: e, children: n, ...r }) {
	return /* @__PURE__ */ t(l.Provider, {
		value: e,
		children: /* @__PURE__ */ t(s, {
			...r,
			children: n
		})
	});
}
var d = n({}), f = ({ ...e }) => /* @__PURE__ */ t(d.Provider, {
	value: { name: e.name },
	children: /* @__PURE__ */ t(o, { ...e })
}), p = n({});
function m() {
	let e = r(d), t = r(p), { getFieldState: n, formState: i } = c(), a = n(e.name, i), { id: o } = t;
	return {
		id: o,
		name: e.name,
		formItemId: `${o}-form-item`,
		formDescriptionId: `${o}-form-item-description`,
		formMessageId: `${o}-form-item-message`,
		...a
	};
}
function h({ className: e, ...n }) {
	let r = i();
	return /* @__PURE__ */ t(p.Provider, {
		value: { id: r },
		children: /* @__PURE__ */ t("div", {
			className: ["form-field", e].filter(Boolean).join(" "),
			...n
		})
	});
}
function g({ ...n }) {
	let { error: r, formItemId: i } = m();
	return /* @__PURE__ */ t(e, {
		"data-error": !!r,
		htmlFor: i,
		...n
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
function v({ className: e, ...n }) {
	let { formDescriptionId: r } = m();
	return /* @__PURE__ */ t("p", {
		id: r,
		className: ["form-field__description", e].filter(Boolean).join(" "),
		...n
	});
}
function y({ className: e, children: n, ...i }) {
	let { error: a, formMessageId: o } = m(), s = r(l), c = a ? String(a?.message ?? "") : "", u = a ? s && c ? s(c) : c : n;
	return u ? /* @__PURE__ */ t("p", {
		id: o,
		role: "alert",
		className: ["form-field__message", e].filter(Boolean).join(" "),
		...i,
		children: u
	}) : null;
}
function b({ className: e, ...n }) {
	let { formState: i } = c(), a = r(l), o = i.errors.root?.message, s = o && a ? a(String(o)) : o;
	return s ? /* @__PURE__ */ t("p", {
		role: "alert",
		className: ["form-error", e].filter(Boolean).join(" "),
		...n,
		children: s
	}) : null;
}
//#endregion
export { _ as FormControl, v as FormDescription, f as FormField, h as FormItem, g as FormLabel, y as FormMessage, u as FormProvider, b as FormRootMessage, m as useFormField };

'use client';
import './form-field.css';
import { Label as e } from "./label.js";
import { jsx as t } from "react/jsx-runtime";
import { createContext as n, useContext as r, useId as i } from "react";
import { useRender as a } from "@base-ui-components/react/use-render";
import { Controller as o, FormProvider as s, useFormContext as c } from "react-hook-form";
//#region src/stories/molecules/FormField/FormField.tsx
var l = s, u = n({}), d = ({ ...e }) => /* @__PURE__ */ t(u.Provider, {
	value: { name: e.name },
	children: /* @__PURE__ */ t(o, { ...e })
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
function m({ className: e, ...n }) {
	let r = i();
	return /* @__PURE__ */ t(f.Provider, {
		value: { id: r },
		children: /* @__PURE__ */ t("div", {
			className: ["form-field", e].filter(Boolean).join(" "),
			...n
		})
	});
}
function h({ ...n }) {
	let { error: r, formItemId: i } = p();
	return /* @__PURE__ */ t(e, {
		"data-error": !!r,
		htmlFor: i,
		...n
	});
}
function g({ children: e, ...t }) {
	let { error: n, formItemId: r, formDescriptionId: i, formMessageId: o } = p();
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
function _({ className: e, ...n }) {
	let { formDescriptionId: r } = p();
	return /* @__PURE__ */ t("p", {
		id: r,
		className: ["form-field__description", e].filter(Boolean).join(" "),
		...n
	});
}
function v({ className: e, children: n, ...r }) {
	let { error: i, formMessageId: a } = p(), o = i ? String(i?.message ?? "") : n;
	return o ? /* @__PURE__ */ t("p", {
		id: a,
		role: "alert",
		className: ["form-field__message", e].filter(Boolean).join(" "),
		...r,
		children: o
	}) : null;
}
function y({ className: e, ...n }) {
	let { formState: r } = c(), i = r.errors.root?.message;
	return i ? /* @__PURE__ */ t("p", {
		role: "alert",
		className: ["form-error", e].filter(Boolean).join(" "),
		...n,
		children: i
	}) : null;
}
//#endregion
export { g as FormControl, _ as FormDescription, d as FormField, m as FormItem, h as FormLabel, v as FormMessage, l as FormProvider, y as FormRootMessage, p as useFormField };

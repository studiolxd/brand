'use client';
import './form-field.css';
import { Label as e } from "./label.js";
import { createContext as t, forwardRef as n, useCallback as r, useContext as i, useEffect as a, useId as o, useMemo as s, useState as c } from "react";
import { jsx as l } from "react/jsx-runtime";
import { useRender as u } from "@base-ui/react/use-render";
import { Controller as d, FormProvider as f, useFormContext as p } from "react-hook-form";
//#region src/stories/molecules/FormField/FormField.tsx
var m = t(void 0);
function h({ translate: e, children: t, ...n }) {
	return /* @__PURE__ */ l(m.Provider, {
		value: e,
		children: /* @__PURE__ */ l(f, {
			...n,
			children: t
		})
	});
}
var g = t({}), _ = ({ ...e }) => /* @__PURE__ */ l(g.Provider, {
	value: { name: e.name },
	children: /* @__PURE__ */ l(d, { ...e })
}), v = t({});
function y() {
	let e = i(g), t = i(v), { getFieldState: n, formState: r } = p(), a = n(e.name, r), { id: o, described: s, register: c } = t;
	return {
		id: o,
		name: e.name,
		formItemId: `${o}-form-item`,
		formDescriptionId: `${o}-form-item-description`,
		formMessageId: `${o}-form-item-message`,
		described: s,
		register: c,
		...a
	};
}
var b = n(function({ className: e, ...t }, n) {
	let i = o(), [a, u] = c({
		description: !1,
		message: !1
	}), d = r((e, t) => {
		u((n) => n[e] === t ? n : {
			...n,
			[e]: t
		});
	}, []), f = s(() => ({
		id: i,
		described: a,
		register: d
	}), [
		i,
		a,
		d
	]);
	return /* @__PURE__ */ l(v.Provider, {
		value: f,
		children: /* @__PURE__ */ l("div", {
			ref: n,
			className: ["form-field", e].filter(Boolean).join(" "),
			...t
		})
	});
}), x = n(function({ ...t }, n) {
	let { error: r, formItemId: i } = y();
	return /* @__PURE__ */ l(e, {
		ref: n,
		"data-error": !!r,
		htmlFor: i,
		...t
	});
});
function S({ children: e, ...t }) {
	let { error: n, formItemId: r, formDescriptionId: i, formMessageId: a, described: o } = y(), s = [...[o.description ? i : null, o.message ? a : null], t["aria-describedby"]].filter((e) => typeof e == "string" && e.length > 0).join(" ");
	return u({
		render: e,
		props: {
			id: r,
			"aria-invalid": !!n,
			...t,
			"aria-describedby": s || void 0
		}
	});
}
var C = n(function({ className: e, ...t }, n) {
	let { formDescriptionId: r, register: i } = y();
	return a(() => (i("description", !0), () => i("description", !1)), [i]), /* @__PURE__ */ l("p", {
		ref: n,
		id: r,
		className: ["form-field__description", e].filter(Boolean).join(" "),
		...t
	});
}), w = n(function({ className: e, children: t, ...n }, r) {
	let { error: o, formMessageId: s, register: c } = y(), u = i(m), d = o ? String(o?.message ?? "") : "", f = o ? u && d ? u(d) : d : t, p = !!f;
	return a(() => (c("message", p), () => c("message", !1)), [c, p]), f ? /* @__PURE__ */ l("p", {
		ref: r,
		id: s,
		role: "alert",
		className: ["form-field__message", e].filter(Boolean).join(" "),
		...n,
		children: f
	}) : null;
}), T = n(function({ className: e, ...t }, n) {
	let { formState: r } = p(), a = i(m), o = r.errors.root?.message, s = o && a ? a(String(o)) : o;
	return s ? /* @__PURE__ */ l("p", {
		ref: n,
		role: "alert",
		className: ["form-error", e].filter(Boolean).join(" "),
		...t,
		children: s
	}) : null;
});
//#endregion
export { S as FormControl, C as FormDescription, _ as FormField, b as FormItem, x as FormLabel, w as FormMessage, h as FormProvider, T as FormRootMessage, y as useFormField };

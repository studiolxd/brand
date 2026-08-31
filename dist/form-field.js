'use client';
import './form-field.css';
import { Label as e } from "./label.js";
import { createContext as t, useCallback as n, useContext as r, useEffect as i, useId as a, useMemo as o, useState as s } from "react";
import { jsx as c } from "react/jsx-runtime";
import { useRender as l } from "@base-ui/react/use-render";
import { Controller as u, FormProvider as d, useFormContext as f } from "react-hook-form";
//#region src/stories/molecules/FormField/FormField.tsx
var p = t(void 0);
function m({ translate: e, children: t, ...n }) {
	return /* @__PURE__ */ c(p.Provider, {
		value: e,
		children: /* @__PURE__ */ c(d, {
			...n,
			children: t
		})
	});
}
var h = t({}), g = ({ ...e }) => /* @__PURE__ */ c(h.Provider, {
	value: { name: e.name },
	children: /* @__PURE__ */ c(u, { ...e })
}), _ = t({});
function v() {
	let e = r(h), t = r(_), { getFieldState: n, formState: i } = f(), a = n(e.name, i), { id: o, described: s, register: c } = t;
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
function y({ className: e, ...t }) {
	let r = a(), [i, l] = s({
		description: !1,
		message: !1
	}), u = n((e, t) => {
		l((n) => n[e] === t ? n : {
			...n,
			[e]: t
		});
	}, []), d = o(() => ({
		id: r,
		described: i,
		register: u
	}), [
		r,
		i,
		u
	]);
	return /* @__PURE__ */ c(_.Provider, {
		value: d,
		children: /* @__PURE__ */ c("div", {
			className: ["form-field", e].filter(Boolean).join(" "),
			...t
		})
	});
}
function b({ ...t }) {
	let { error: n, formItemId: r } = v();
	return /* @__PURE__ */ c(e, {
		"data-error": !!n,
		htmlFor: r,
		...t
	});
}
function x({ children: e, ...t }) {
	let { error: n, formItemId: r, formDescriptionId: i, formMessageId: a, described: o } = v(), s = [...[o.description ? i : null, o.message ? a : null], t["aria-describedby"]].filter((e) => typeof e == "string" && e.length > 0).join(" ");
	return l({
		render: e,
		props: {
			id: r,
			"aria-invalid": !!n,
			...t,
			"aria-describedby": s || void 0
		}
	});
}
function S({ className: e, ...t }) {
	let { formDescriptionId: n, register: r } = v();
	return i(() => (r("description", !0), () => r("description", !1)), [r]), /* @__PURE__ */ c("p", {
		id: n,
		className: ["form-field__description", e].filter(Boolean).join(" "),
		...t
	});
}
function C({ className: e, children: t, ...n }) {
	let { error: a, formMessageId: o, register: s } = v(), l = r(p), u = a ? String(a?.message ?? "") : "", d = a ? l && u ? l(u) : u : t, f = !!d;
	return i(() => (s("message", f), () => s("message", !1)), [s, f]), d ? /* @__PURE__ */ c("p", {
		id: o,
		role: "alert",
		className: ["form-field__message", e].filter(Boolean).join(" "),
		...n,
		children: d
	}) : null;
}
function w({ className: e, ...t }) {
	let { formState: n } = f(), i = r(p), a = n.errors.root?.message, o = a && i ? i(String(a)) : a;
	return o ? /* @__PURE__ */ c("p", {
		role: "alert",
		className: ["form-error", e].filter(Boolean).join(" "),
		...t,
		children: o
	}) : null;
}
//#endregion
export { x as FormControl, S as FormDescription, g as FormField, y as FormItem, b as FormLabel, C as FormMessage, m as FormProvider, w as FormRootMessage, v as useFormField };

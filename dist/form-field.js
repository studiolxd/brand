'use client';
import './form-field.css';
import { Label as e } from "./label.js";
import { jsx as t } from "react/jsx-runtime";
import { createContext as n, useCallback as r, useContext as i, useEffect as a, useId as o, useMemo as s, useState as c } from "react";
import { useRender as l } from "@base-ui/react/use-render";
import { Controller as u, FormProvider as d, useFormContext as f } from "react-hook-form";
//#region src/stories/molecules/FormField/FormField.tsx
var p = n(void 0);
function m({ translate: e, children: n, ...r }) {
	return /* @__PURE__ */ t(p.Provider, {
		value: e,
		children: /* @__PURE__ */ t(d, {
			...r,
			children: n
		})
	});
}
var h = n({}), g = ({ ...e }) => /* @__PURE__ */ t(h.Provider, {
	value: { name: e.name },
	children: /* @__PURE__ */ t(u, { ...e })
}), _ = n({});
function v() {
	let e = i(h), t = i(_), { getFieldState: n, formState: r } = f(), a = n(e.name, r), { id: o, described: s, register: c } = t;
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
function y({ className: e, ...n }) {
	let i = o(), [a, l] = c({
		description: !1,
		message: !1
	}), u = r((e, t) => {
		l((n) => n[e] === t ? n : {
			...n,
			[e]: t
		});
	}, []), d = s(() => ({
		id: i,
		described: a,
		register: u
	}), [
		i,
		a,
		u
	]);
	return /* @__PURE__ */ t(_.Provider, {
		value: d,
		children: /* @__PURE__ */ t("div", {
			className: ["form-field", e].filter(Boolean).join(" "),
			...n
		})
	});
}
function b({ ...n }) {
	let { error: r, formItemId: i } = v();
	return /* @__PURE__ */ t(e, {
		"data-error": !!r,
		htmlFor: i,
		...n
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
function S({ className: e, ...n }) {
	let { formDescriptionId: r, register: i } = v();
	return a(() => (i("description", !0), () => i("description", !1)), [i]), /* @__PURE__ */ t("p", {
		id: r,
		className: ["form-field__description", e].filter(Boolean).join(" "),
		...n
	});
}
function C({ className: e, children: n, ...r }) {
	let { error: o, formMessageId: s, register: c } = v(), l = i(p), u = o ? String(o?.message ?? "") : "", d = o ? l && u ? l(u) : u : n, f = !!d;
	return a(() => (c("message", f), () => c("message", !1)), [c, f]), d ? /* @__PURE__ */ t("p", {
		id: s,
		role: "alert",
		className: ["form-field__message", e].filter(Boolean).join(" "),
		...r,
		children: d
	}) : null;
}
function w({ className: e, ...n }) {
	let { formState: r } = f(), a = i(p), o = r.errors.root?.message, s = o && a ? a(String(o)) : o;
	return s ? /* @__PURE__ */ t("p", {
		role: "alert",
		className: ["form-error", e].filter(Boolean).join(" "),
		...n,
		children: s
	}) : null;
}
//#endregion
export { x as FormControl, S as FormDescription, g as FormField, y as FormItem, b as FormLabel, C as FormMessage, m as FormProvider, w as FormRootMessage, v as useFormField };

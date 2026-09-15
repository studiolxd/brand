'use client';
import './select.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { Children as n, createContext as r, forwardRef as i, isValidElement as a, useContext as o, useMemo as s } from "react";
import { Fragment as c, jsx as l, jsxs as u } from "react/jsx-runtime";
import { Select as d } from "@base-ui/react/select";
//#region src/stories/atoms/Select/Select.tsx
function f(e) {
	return Array.isArray(e.options);
}
var p = r(null);
function m(e, t) {
	n.forEach(e, (e) => {
		if (!a(e)) return;
		let n = e.props ?? {};
		if (e.type === b || typeof n.value == "string" && e.type !== h) {
			typeof n.value == "string" && t.set(n.value, n.children);
			return;
		}
		n.children != null && m(n.children, t);
	});
}
function h({ children: e, onValueChange: t, ...n }) {
	let r = s(() => {
		let t = /* @__PURE__ */ new Map();
		return m(e, t), t;
	}, [e]);
	return /* @__PURE__ */ l(p.Provider, {
		value: r,
		children: /* @__PURE__ */ l(d.Root, {
			onValueChange: t ? (e) => t(e) : void 0,
			...n,
			children: e
		})
	});
}
var g = i(function({ placeholder: e, children: t, ...n }, r) {
	let i = o(p);
	return /* @__PURE__ */ l(d.Value, {
		ref: r,
		...n,
		children: (n) => typeof t == "function" ? t(n) : t ?? (n == null || n === "" ? e ?? null : i?.get(n) ?? n)
	});
}), _ = i(function({ className: e, children: t, ...n }, r) {
	let i = ["select__group", e ?? ""].filter(Boolean).join(" ");
	return /* @__PURE__ */ l(d.Group, {
		ref: r,
		className: i,
		...n,
		children: t
	});
}), v = i(function({ size: e = "md", className: n, children: r, ...i }, a) {
	let o = [
		"select",
		e === "md" ? "" : `select--${e}`,
		n ?? ""
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ u(d.Trigger, {
		ref: a,
		className: o,
		...i,
		children: [r, /* @__PURE__ */ l(t, {
			name: "chevron",
			className: "select__icon"
		})]
	});
}), y = i(function({ size: e = "md", container: t, className: n, children: r, side: i = "bottom", align: a = "start", sideOffset: o = -1, ...s }, c) {
	let u = [
		"select__content",
		e === "md" ? "" : `select__content--${e}`,
		n ?? ""
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ l(d.Portal, {
		container: t,
		children: /* @__PURE__ */ l(d.Positioner, {
			className: "select__positioner",
			side: i,
			align: a,
			sideOffset: o,
			alignItemWithTrigger: !1,
			children: /* @__PURE__ */ l(d.Popup, {
				ref: c,
				className: u,
				...s,
				children: r
			})
		})
	});
}), b = i(function({ className: e, children: t, ...n }, r) {
	let i = ["select__item", e ?? ""].filter(Boolean).join(" ");
	return /* @__PURE__ */ l(d.Item, {
		ref: r,
		className: i,
		...n,
		children: /* @__PURE__ */ l(d.ItemText, { children: t })
	});
}), x = i(function({ className: e, children: t, ...n }, r) {
	let i = ["select__label", e ?? ""].filter(Boolean).join(" ");
	return /* @__PURE__ */ l(d.GroupLabel, {
		ref: r,
		className: i,
		...n,
		children: t
	});
}), S = i(function({ className: e, ...t }, n) {
	let r = ["select__separator", e ?? ""].filter(Boolean).join(" ");
	return /* @__PURE__ */ l(d.Separator, {
		ref: n,
		className: r,
		...t
	});
});
function C({ value: e, label: t, "aria-label": n }) {
	return /* @__PURE__ */ l(b, {
		value: e,
		"aria-label": n,
		children: t
	}, e);
}
function w({ override: t }) {
	return /* @__PURE__ */ l(c, { children: e("select")("placeholder", t) });
}
var T = i(function({ options: e, value: t, defaultValue: n, placeholder: r, disabled: i, readOnly: a, size: o = "md", onValueChange: s, id: c, name: d, required: p, onBlur: m, "aria-label": b, "aria-describedby": S, "aria-invalid": T, container: E }, D) {
	return /* @__PURE__ */ u(h, {
		value: t,
		defaultValue: n,
		disabled: i,
		readOnly: a,
		name: d,
		required: p,
		onValueChange: s,
		children: [/* @__PURE__ */ l(v, {
			ref: D,
			size: o,
			id: c,
			onBlur: m,
			"aria-label": b,
			"aria-describedby": S,
			"aria-invalid": T || void 0,
			children: /* @__PURE__ */ l(g, { placeholder: /* @__PURE__ */ l(w, { override: r }) })
		}), /* @__PURE__ */ l(y, {
			size: o,
			container: E,
			children: e.map((e, t) => f(e) ? /* @__PURE__ */ u(_, { children: [/* @__PURE__ */ l(x, { children: e.label }), e.options.map(C)] }, `group-${t}`) : C(e))
		})]
	});
}), E = Object.assign(T, {
	Root: h,
	Trigger: v,
	Value: g,
	Content: y,
	Group: _,
	Label: x,
	Item: b,
	Separator: S
});
//#endregion
export { E as Select, y as SelectContent, _ as SelectGroup, b as SelectItem, x as SelectLabel, h as SelectRoot, S as SelectSeparator, v as SelectTrigger, g as SelectValue, f as isSelectOptionGroup };

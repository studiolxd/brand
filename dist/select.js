'use client';
import './select.css';
import { Icon as e } from "./icon.js";
import { Children as t, createContext as n, forwardRef as r, isValidElement as i, useContext as a, useMemo as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
import { Select as l } from "@base-ui/react/select";
//#region src/stories/atoms/Select/Select.tsx
function u(e) {
	return Array.isArray(e.options);
}
var d = n(null);
function f(e, n) {
	t.forEach(e, (e) => {
		if (!i(e)) return;
		let t = e.props ?? {};
		if (e.type === v || typeof t.value == "string" && e.type !== p) {
			typeof t.value == "string" && n.set(t.value, t.children);
			return;
		}
		t.children != null && f(t.children, n);
	});
}
function p({ children: e, onValueChange: t, ...n }) {
	let r = o(() => {
		let t = /* @__PURE__ */ new Map();
		return f(e, t), t;
	}, [e]);
	return /* @__PURE__ */ s(d.Provider, {
		value: r,
		children: /* @__PURE__ */ s(l.Root, {
			onValueChange: t ? (e) => t(e) : void 0,
			...n,
			children: e
		})
	});
}
var m = r(function({ placeholder: e, children: t, ...n }, r) {
	let i = a(d);
	return /* @__PURE__ */ s(l.Value, {
		ref: r,
		...n,
		children: (n) => typeof t == "function" ? t(n) : t ?? (n == null || n === "" ? e ?? null : i?.get(n) ?? n)
	});
}), h = r(function({ className: e, children: t, ...n }, r) {
	let i = ["select__group", e ?? ""].filter(Boolean).join(" ");
	return /* @__PURE__ */ s(l.Group, {
		ref: r,
		className: i,
		...n,
		children: t
	});
}), g = r(function({ size: t = "md", className: n, children: r, ...i }, a) {
	let o = [
		"select",
		t === "md" ? "" : `select--${t}`,
		n ?? ""
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ c(l.Trigger, {
		ref: a,
		className: o,
		...i,
		children: [r, /* @__PURE__ */ s(e, {
			name: "chevron",
			className: "select__icon",
			size: t === "sm" ? "xs" : t === "lg" ? "md" : "sm"
		})]
	});
}), _ = r(function({ size: e = "md", container: t, className: n, children: r, side: i = "bottom", align: a = "start", sideOffset: o = -1, ...c }, u) {
	let d = [
		"select__content",
		e === "md" ? "" : `select__content--${e}`,
		n ?? ""
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ s(l.Portal, {
		container: t,
		children: /* @__PURE__ */ s(l.Positioner, {
			className: "select__positioner",
			side: i,
			align: a,
			sideOffset: o,
			alignItemWithTrigger: !1,
			children: /* @__PURE__ */ s(l.Popup, {
				ref: u,
				className: d,
				...c,
				children: r
			})
		})
	});
}), v = r(function({ className: e, children: t, ...n }, r) {
	let i = ["select__item", e ?? ""].filter(Boolean).join(" ");
	return /* @__PURE__ */ s(l.Item, {
		ref: r,
		className: i,
		...n,
		children: /* @__PURE__ */ s(l.ItemText, { children: t })
	});
}), y = r(function({ className: e, children: t, ...n }, r) {
	let i = ["select__label", e ?? ""].filter(Boolean).join(" ");
	return /* @__PURE__ */ s(l.GroupLabel, {
		ref: r,
		className: i,
		...n,
		children: t
	});
}), b = r(function({ className: e, ...t }, n) {
	let r = ["select__separator", e ?? ""].filter(Boolean).join(" ");
	return /* @__PURE__ */ s(l.Separator, {
		ref: n,
		className: r,
		...t
	});
});
function x({ value: e, label: t, "aria-label": n }) {
	return /* @__PURE__ */ s(v, {
		value: e,
		"aria-label": n,
		children: t
	}, e);
}
var S = r(function({ options: e, value: t, defaultValue: n, placeholder: r = "Seleccionar…", disabled: i, readOnly: a, size: o = "md", onValueChange: l, id: d, name: f, required: v, onBlur: b, "aria-label": S, "aria-describedby": C, "aria-invalid": w, container: T }, E) {
	return /* @__PURE__ */ c(p, {
		value: t,
		defaultValue: n,
		disabled: i,
		readOnly: a,
		name: f,
		required: v,
		onValueChange: l,
		children: [/* @__PURE__ */ s(g, {
			ref: E,
			size: o,
			id: d,
			onBlur: b,
			"aria-label": S,
			"aria-describedby": C,
			"aria-invalid": w || void 0,
			children: /* @__PURE__ */ s(m, { placeholder: r })
		}), /* @__PURE__ */ s(_, {
			size: o,
			container: T,
			children: e.map((e, t) => u(e) ? /* @__PURE__ */ c(h, { children: [/* @__PURE__ */ s(y, { children: e.label }), e.options.map(x)] }, `group-${t}`) : x(e))
		})]
	});
}), C = Object.assign(S, {
	Root: p,
	Trigger: g,
	Value: m,
	Content: _,
	Group: h,
	Label: y,
	Item: v,
	Separator: b
});
//#endregion
export { C as Select, _ as SelectContent, h as SelectGroup, v as SelectItem, y as SelectLabel, p as SelectRoot, b as SelectSeparator, g as SelectTrigger, m as SelectValue, u as isSelectOptionGroup };

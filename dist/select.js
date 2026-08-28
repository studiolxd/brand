'use client';
import './select.css';
import { Icon as e } from "./icon.js";
import { Children as t, createContext as n, forwardRef as r, isValidElement as i, useContext as a, useMemo as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
import { Select as l } from "@base-ui/react/select";
//#region src/stories/atoms/Select/Select.tsx
var u = n(null);
function d(e, n) {
	t.forEach(e, (e) => {
		if (!i(e)) return;
		let t = e.props ?? {};
		if (e.type === _ || typeof t.value == "string" && e.type !== f) {
			typeof t.value == "string" && n.set(t.value, t.children);
			return;
		}
		t.children != null && d(t.children, n);
	});
}
function f({ children: e, onValueChange: t, ...n }) {
	let r = o(() => {
		let t = /* @__PURE__ */ new Map();
		return d(e, t), t;
	}, [e]);
	return /* @__PURE__ */ s(u.Provider, {
		value: r,
		children: /* @__PURE__ */ s(l.Root, {
			onValueChange: t ? (e) => t(e) : void 0,
			...n,
			children: e
		})
	});
}
var p = r(function({ placeholder: e, children: t, ...n }, r) {
	let i = a(u);
	return /* @__PURE__ */ s(l.Value, {
		ref: r,
		...n,
		children: (n) => typeof t == "function" ? t(n) : t ?? (n == null || n === "" ? e ?? null : i?.get(n) ?? n)
	});
}), m = l.Group, h = r(function({ size: t = "md", className: n, children: r, ...i }, a) {
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
}), g = r(function({ size: e = "md", container: t, className: n, children: r, side: i = "bottom", align: a = "start", sideOffset: o = -1, ...c }, u) {
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
}), _ = r(function({ className: e, children: t, ...n }, r) {
	let i = ["select__item", e ?? ""].filter(Boolean).join(" ");
	return /* @__PURE__ */ s(l.Item, {
		ref: r,
		className: i,
		...n,
		children: /* @__PURE__ */ s(l.ItemText, { children: t })
	});
}), v = r(function({ className: e, children: t, ...n }, r) {
	let i = ["select__label", e ?? ""].filter(Boolean).join(" ");
	return /* @__PURE__ */ s(l.GroupLabel, {
		ref: r,
		className: i,
		...n,
		children: t
	});
}), y = r(function({ className: e, ...t }, n) {
	let r = ["select__separator", e ?? ""].filter(Boolean).join(" ");
	return /* @__PURE__ */ s(l.Separator, {
		ref: n,
		className: r,
		...t
	});
}), b = r(function({ options: e, value: t, defaultValue: n, placeholder: r = "Seleccionar…", disabled: i, readOnly: a, size: o = "md", onValueChange: l, id: u, name: d, required: m, onBlur: v, "aria-label": y, "aria-describedby": b, "aria-invalid": x, container: S }, C) {
	return /* @__PURE__ */ c(f, {
		value: t,
		defaultValue: n,
		disabled: i,
		readOnly: a,
		name: d,
		required: m,
		onValueChange: l,
		children: [/* @__PURE__ */ s(h, {
			ref: C,
			size: o,
			id: u,
			onBlur: v,
			"aria-label": y,
			"aria-describedby": b,
			"aria-invalid": x || void 0,
			children: /* @__PURE__ */ s(p, { placeholder: r })
		}), /* @__PURE__ */ s(g, {
			size: o,
			container: S,
			children: e.map(({ value: e, label: t, "aria-label": n }) => /* @__PURE__ */ s(_, {
				value: e,
				"aria-label": n,
				children: t
			}, e))
		})]
	});
}), x = Object.assign(b, {
	Root: f,
	Trigger: h,
	Value: p,
	Content: g,
	Group: m,
	Label: v,
	Item: _,
	Separator: y
});
//#endregion
export { x as Select, g as SelectContent, m as SelectGroup, _ as SelectItem, v as SelectLabel, f as SelectRoot, y as SelectSeparator, h as SelectTrigger, p as SelectValue };

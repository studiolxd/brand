'use client';
import './select.css';
import { Icon as e } from "./icon.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import { Children as r, createContext as i, forwardRef as a, isValidElement as o, useContext as s, useMemo as c } from "react";
import { Select as l } from "@base-ui-components/react/select";
//#region src/stories/atoms/Select/Select.tsx
var u = i(null);
function d(e, t) {
	r.forEach(e, (e) => {
		if (!o(e)) return;
		let n = e.props ?? {};
		if (e.type === _ || typeof n.value == "string" && e.type !== f) {
			typeof n.value == "string" && t.set(n.value, n.children);
			return;
		}
		n.children != null && d(n.children, t);
	});
}
function f({ children: e, onValueChange: n, ...r }) {
	let i = c(() => {
		let t = /* @__PURE__ */ new Map();
		return d(e, t), t;
	}, [e]);
	return /* @__PURE__ */ t(u.Provider, {
		value: i,
		children: /* @__PURE__ */ t(l.Root, {
			onValueChange: n ? (e) => n(e) : void 0,
			...r,
			children: e
		})
	});
}
var p = a(function({ placeholder: e, children: n, ...r }, i) {
	let a = s(u);
	return /* @__PURE__ */ t(l.Value, {
		ref: i,
		...r,
		children: (t) => typeof n == "function" ? n(t) : n ?? (t == null || t === "" ? e ?? null : a?.get(t) ?? t)
	});
}), m = l.Group, h = a(function({ size: r = "md", className: i, children: a, ...o }, s) {
	let c = [
		"select",
		r === "md" ? "" : `select--${r}`,
		i ?? ""
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ n(l.Trigger, {
		ref: s,
		className: c,
		...o,
		children: [a, /* @__PURE__ */ t(e, {
			name: "chevron",
			className: "select__icon",
			size: r === "sm" ? "xs" : r === "lg" ? "md" : "sm"
		})]
	});
}), g = a(function({ size: e = "md", container: n, className: r, children: i, side: a = "bottom", align: o = "start", sideOffset: s = -1, ...c }, u) {
	let d = [
		"select__content",
		e === "md" ? "" : `select__content--${e}`,
		r ?? ""
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ t(l.Portal, {
		container: n,
		children: /* @__PURE__ */ t(l.Positioner, {
			className: "select__positioner",
			side: a,
			align: o,
			sideOffset: s,
			alignItemWithTrigger: !1,
			children: /* @__PURE__ */ t(l.Popup, {
				ref: u,
				className: d,
				...c,
				children: i
			})
		})
	});
}), _ = a(function({ className: e, children: n, ...r }, i) {
	let a = ["select__item", e ?? ""].filter(Boolean).join(" ");
	return /* @__PURE__ */ t(l.Item, {
		ref: i,
		className: a,
		...r,
		children: /* @__PURE__ */ t(l.ItemText, { children: n })
	});
}), v = a(function({ className: e, children: n, ...r }, i) {
	let a = ["select__label", e ?? ""].filter(Boolean).join(" ");
	return /* @__PURE__ */ t(l.GroupLabel, {
		ref: i,
		className: a,
		...r,
		children: n
	});
}), y = a(function({ className: e, ...n }, r) {
	let i = ["select__separator", e ?? ""].filter(Boolean).join(" ");
	return /* @__PURE__ */ t(l.Separator, {
		ref: r,
		className: i,
		...n
	});
}), b = a(function({ options: e, value: r, defaultValue: i, placeholder: a = "Seleccionar…", disabled: o, readOnly: s, size: c = "md", onValueChange: l, id: u, name: d, required: m, onBlur: v, "aria-label": y, "aria-describedby": b, "aria-invalid": x, container: S }, C) {
	return /* @__PURE__ */ n(f, {
		value: r,
		defaultValue: i,
		disabled: o,
		readOnly: s,
		name: d,
		required: m,
		onValueChange: l,
		children: [/* @__PURE__ */ t(h, {
			ref: C,
			size: c,
			id: u,
			onBlur: v,
			"aria-label": y,
			"aria-describedby": b,
			"aria-invalid": x || void 0,
			children: /* @__PURE__ */ t(p, { placeholder: a })
		}), /* @__PURE__ */ t(g, {
			size: c,
			container: S,
			children: e.map(({ value: e, label: n, "aria-label": r }) => /* @__PURE__ */ t(_, {
				value: e,
				"aria-label": r,
				children: n
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

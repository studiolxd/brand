'use client';
import './select.css';
import { Icon as e } from "./icon.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import { Children as r, createContext as i, forwardRef as a, isValidElement as o, useContext as s, useMemo as c } from "react";
import { Select as l } from "@base-ui/react/select";
//#region src/stories/atoms/Select/Select.tsx
function u(e) {
	return Array.isArray(e.options);
}
var d = i(null);
function f(e, t) {
	r.forEach(e, (e) => {
		if (!o(e)) return;
		let n = e.props ?? {};
		if (e.type === v || typeof n.value == "string" && e.type !== p) {
			typeof n.value == "string" && t.set(n.value, n.children);
			return;
		}
		n.children != null && f(n.children, t);
	});
}
function p({ children: e, onValueChange: n, ...r }) {
	let i = c(() => {
		let t = /* @__PURE__ */ new Map();
		return f(e, t), t;
	}, [e]);
	return /* @__PURE__ */ t(d.Provider, {
		value: i,
		children: /* @__PURE__ */ t(l.Root, {
			onValueChange: n ? (e) => n(e) : void 0,
			...r,
			children: e
		})
	});
}
var m = a(function({ placeholder: e, children: n, ...r }, i) {
	let a = s(d);
	return /* @__PURE__ */ t(l.Value, {
		ref: i,
		...r,
		children: (t) => typeof n == "function" ? n(t) : n ?? (t == null || t === "" ? e ?? null : a?.get(t) ?? t)
	});
}), h = a(function({ className: e, children: n, ...r }, i) {
	let a = ["select__group", e ?? ""].filter(Boolean).join(" ");
	return /* @__PURE__ */ t(l.Group, {
		ref: i,
		className: a,
		...r,
		children: n
	});
}), g = a(function({ size: r = "md", className: i, children: a, ...o }, s) {
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
}), _ = a(function({ size: e = "md", container: n, className: r, children: i, side: a = "bottom", align: o = "start", sideOffset: s = -1, ...c }, u) {
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
}), v = a(function({ className: e, children: n, ...r }, i) {
	let a = ["select__item", e ?? ""].filter(Boolean).join(" ");
	return /* @__PURE__ */ t(l.Item, {
		ref: i,
		className: a,
		...r,
		children: /* @__PURE__ */ t(l.ItemText, { children: n })
	});
}), y = a(function({ className: e, children: n, ...r }, i) {
	let a = ["select__label", e ?? ""].filter(Boolean).join(" ");
	return /* @__PURE__ */ t(l.GroupLabel, {
		ref: i,
		className: a,
		...r,
		children: n
	});
}), b = a(function({ className: e, ...n }, r) {
	let i = ["select__separator", e ?? ""].filter(Boolean).join(" ");
	return /* @__PURE__ */ t(l.Separator, {
		ref: r,
		className: i,
		...n
	});
});
function x({ value: e, label: n, "aria-label": r }) {
	return /* @__PURE__ */ t(v, {
		value: e,
		"aria-label": r,
		children: n
	}, e);
}
var S = a(function({ options: e, value: r, defaultValue: i, placeholder: a = "Seleccionar…", disabled: o, readOnly: s, size: c = "md", onValueChange: l, id: d, name: f, required: v, onBlur: b, "aria-label": S, "aria-describedby": C, "aria-invalid": w, container: T }, E) {
	return /* @__PURE__ */ n(p, {
		value: r,
		defaultValue: i,
		disabled: o,
		readOnly: s,
		name: f,
		required: v,
		onValueChange: l,
		children: [/* @__PURE__ */ t(g, {
			ref: E,
			size: c,
			id: d,
			onBlur: b,
			"aria-label": S,
			"aria-describedby": C,
			"aria-invalid": w || void 0,
			children: /* @__PURE__ */ t(m, { placeholder: a })
		}), /* @__PURE__ */ t(_, {
			size: c,
			container: T,
			children: e.map((e, r) => u(e) ? /* @__PURE__ */ n(h, { children: [/* @__PURE__ */ t(y, { children: e.label }), e.options.map(x)] }, `group-${r}`) : x(e))
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

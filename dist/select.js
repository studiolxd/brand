'use client';
import './select.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { n } from "./_shared/portal-container.js";
import { Children as r, createContext as i, forwardRef as a, isValidElement as o, useContext as s, useMemo as c } from "react";
import { Fragment as l, jsx as u, jsxs as d } from "react/jsx-runtime";
import { Select as f } from "@base-ui/react/select";
//#region src/stories/atoms/Select/Select.tsx
function p(e) {
	return Array.isArray(e.options);
}
var m = i(null);
function h(e, t) {
	r.forEach(e, (e) => {
		if (!o(e)) return;
		let n = e.props ?? {};
		if (e.type === x || typeof n.value == "string" && e.type !== g) {
			typeof n.value == "string" && t.set(n.value, n.children);
			return;
		}
		n.children != null && h(n.children, t);
	});
}
function g({ children: e, onValueChange: t, ...n }) {
	let r = c(() => {
		let t = /* @__PURE__ */ new Map();
		return h(e, t), t;
	}, [e]);
	return /* @__PURE__ */ u(m.Provider, {
		value: r,
		children: /* @__PURE__ */ u(f.Root, {
			onValueChange: t ? (e) => t(e) : void 0,
			...n,
			children: e
		})
	});
}
var _ = a(function({ placeholder: e, children: t, ...n }, r) {
	let i = s(m);
	return /* @__PURE__ */ u(f.Value, {
		ref: r,
		...n,
		children: (n) => typeof t == "function" ? t(n) : t ?? (n == null || n === "" ? e ?? null : i?.get(n) ?? n)
	});
}), v = a(function({ className: e, children: t, ...n }, r) {
	let i = ["select__group", e ?? ""].filter(Boolean).join(" ");
	return /* @__PURE__ */ u(f.Group, {
		ref: r,
		className: i,
		...n,
		children: t
	});
}), y = a(function({ size: e = "md", className: n, children: r, ...i }, a) {
	let o = [
		"select",
		e === "md" ? "" : `select--${e}`,
		n ?? ""
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ d(f.Trigger, {
		ref: a,
		className: o,
		...i,
		children: [r, /* @__PURE__ */ u(t, {
			name: "chevron",
			className: "select__icon"
		})]
	});
}), b = a(function({ size: e = "md", container: t, className: r, children: i, side: a = "bottom", align: o = "start", sideOffset: s = -1, ...c }, l) {
	let d = n(t), p = [
		"select__content",
		e === "md" ? "" : `select__content--${e}`,
		r ?? ""
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ u(f.Portal, {
		container: d,
		children: /* @__PURE__ */ u(f.Positioner, {
			className: "select__positioner",
			side: a,
			align: o,
			sideOffset: s,
			alignItemWithTrigger: !1,
			children: /* @__PURE__ */ u(f.Popup, {
				ref: l,
				className: p,
				...c,
				children: i
			})
		})
	});
}), x = a(function({ className: e, children: t, ...n }, r) {
	let i = ["select__item", e ?? ""].filter(Boolean).join(" ");
	return /* @__PURE__ */ u(f.Item, {
		ref: r,
		className: i,
		...n,
		children: /* @__PURE__ */ u(f.ItemText, { children: t })
	});
}), S = a(function({ className: e, children: t, ...n }, r) {
	let i = ["select__label", e ?? ""].filter(Boolean).join(" ");
	return /* @__PURE__ */ u(f.GroupLabel, {
		ref: r,
		className: i,
		...n,
		children: t
	});
}), C = a(function({ className: e, ...t }, n) {
	let r = ["select__separator", e ?? ""].filter(Boolean).join(" ");
	return /* @__PURE__ */ u(f.Separator, {
		ref: n,
		className: r,
		...t
	});
});
function w({ value: e, label: t, "aria-label": n }) {
	return /* @__PURE__ */ u(x, {
		value: e,
		"aria-label": n,
		children: t
	}, e);
}
function T({ override: t }) {
	return /* @__PURE__ */ u(l, { children: e("select")("placeholder", t) });
}
var E = a(function({ options: e, value: t, defaultValue: n, placeholder: r, disabled: i, readOnly: a, size: o = "md", onValueChange: s, id: c, name: l, required: f, onBlur: m, "aria-label": h, "aria-describedby": x, "aria-invalid": C, container: E }, D) {
	return /* @__PURE__ */ d(g, {
		value: t,
		defaultValue: n,
		disabled: i,
		readOnly: a,
		name: l,
		required: f,
		onValueChange: s,
		children: [/* @__PURE__ */ u(y, {
			ref: D,
			size: o,
			id: c,
			onBlur: m,
			"aria-label": h,
			"aria-describedby": x,
			"aria-invalid": C || void 0,
			children: /* @__PURE__ */ u(_, { placeholder: /* @__PURE__ */ u(T, { override: r }) })
		}), /* @__PURE__ */ u(b, {
			size: o,
			container: E,
			children: e.map((e, t) => p(e) ? /* @__PURE__ */ d(v, { children: [/* @__PURE__ */ u(S, { children: e.label }), e.options.map(w)] }, `group-${t}`) : w(e))
		})]
	});
}), D = Object.assign(E, {
	Root: g,
	Trigger: y,
	Value: _,
	Content: b,
	Group: v,
	Label: S,
	Item: x,
	Separator: C
});
//#endregion
export { D as Select, b as SelectContent, v as SelectGroup, x as SelectItem, S as SelectLabel, g as SelectRoot, C as SelectSeparator, y as SelectTrigger, _ as SelectValue, p as isSelectOptionGroup };

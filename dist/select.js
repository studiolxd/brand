'use client';
import './select.css';
import { Icon as e } from "./icon.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import { forwardRef as r } from "react";
import * as i from "@radix-ui/react-select";
//#region src/stories/atoms/Select/Select.tsx
var a = i.Root, o = i.Value, s = i.Group, c = r(function({ size: r = "md", className: a, children: o, ...s }, c) {
	let l = [
		"select",
		r === "md" ? "" : `select--${r}`,
		a ?? ""
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ n(i.Trigger, {
		ref: c,
		className: l,
		...s,
		children: [o, /* @__PURE__ */ t(i.Icon, {
			asChild: !0,
			children: /* @__PURE__ */ t(e, {
				name: "chevron",
				className: "select__icon",
				size: r === "sm" ? "xs" : r === "lg" ? "md" : "sm"
			})
		})]
	});
}), l = r(function({ size: e = "md", container: n, className: r, children: a, position: o = "popper", sideOffset: s = -1, ...c }, l) {
	let u = [
		"select__content",
		e === "md" ? "" : `select__content--${e}`,
		r ?? ""
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ t(i.Portal, {
		container: n,
		children: /* @__PURE__ */ t(i.Content, {
			ref: l,
			className: u,
			position: o,
			sideOffset: s,
			...c,
			children: /* @__PURE__ */ t(i.Viewport, { children: a })
		})
	});
}), u = r(function({ className: e, children: n, ...r }, a) {
	let o = ["select__item", e ?? ""].filter(Boolean).join(" ");
	return /* @__PURE__ */ t(i.Item, {
		ref: a,
		className: o,
		...r,
		children: /* @__PURE__ */ t(i.ItemText, { children: n })
	});
}), d = r(function({ className: e, children: n, ...r }, a) {
	let o = ["select__label", e ?? ""].filter(Boolean).join(" ");
	return /* @__PURE__ */ t(i.Label, {
		ref: a,
		className: o,
		...r,
		children: n
	});
}), f = r(function({ className: e, ...n }, r) {
	let a = ["select__separator", e ?? ""].filter(Boolean).join(" ");
	return /* @__PURE__ */ t(i.Separator, {
		ref: r,
		className: a,
		...n
	});
});
function p({ options: e, value: r, defaultValue: i, placeholder: s = "Seleccionar…", disabled: d, readOnly: f, size: p = "md", onValueChange: m, id: h, "aria-label": g, container: _ }) {
	return /* @__PURE__ */ n(a, {
		value: r,
		defaultValue: i,
		disabled: d,
		open: f ? !1 : void 0,
		onOpenChange: f ? () => {} : void 0,
		onValueChange: f ? void 0 : m,
		children: [/* @__PURE__ */ t(c, {
			size: p,
			id: h,
			"aria-label": g ?? s,
			"aria-readonly": f || void 0,
			children: /* @__PURE__ */ t(o, { placeholder: s })
		}), /* @__PURE__ */ t(l, {
			size: p,
			container: _,
			children: e.map(({ value: e, label: n, "aria-label": r }) => /* @__PURE__ */ t(u, {
				value: e,
				"aria-label": r,
				children: n
			}, e))
		})]
	});
}
var m = Object.assign(p, {
	Root: a,
	Trigger: c,
	Value: o,
	Content: l,
	Group: s,
	Label: d,
	Item: u,
	Separator: f
});
//#endregion
export { m as Select, l as SelectContent, s as SelectGroup, u as SelectItem, d as SelectLabel, a as SelectRoot, f as SelectSeparator, c as SelectTrigger, o as SelectValue };

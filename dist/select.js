'use client';
import './select.css';
import { Chevron as e } from "./chevron.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import * as r from "@radix-ui/react-select";
//#region src/stories/atoms/Select/Select.tsx
function i({ options: i, value: a, defaultValue: o, placeholder: s = "Seleccionar…", disabled: c, dark: l, size: u = "md", onValueChange: d, id: f, "aria-label": p }) {
	let m = ["select", u === "md" ? "" : `select--${u}`].filter(Boolean).join(" "), h = [
		"select__content",
		u === "md" ? "" : `select__content--${u}`,
		l ? "select__content--dark" : ""
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ n(r.Root, {
		value: a,
		defaultValue: o,
		disabled: c,
		onValueChange: d,
		children: [/* @__PURE__ */ n(r.Trigger, {
			className: m,
			id: f,
			"aria-label": p ?? s,
			children: [/* @__PURE__ */ t(r.Value, { placeholder: s }), /* @__PURE__ */ t(r.Icon, {
				asChild: !0,
				children: /* @__PURE__ */ t(e, {
					className: "select__icon",
					size: u === "sm" ? "xs" : u === "lg" ? "md" : "sm"
				})
			})]
		}), /* @__PURE__ */ t(r.Portal, { children: /* @__PURE__ */ t(r.Content, {
			className: h,
			position: "popper",
			sideOffset: -1,
			children: /* @__PURE__ */ t(r.Viewport, { children: i.map(({ value: e, label: n, "aria-label": i }) => /* @__PURE__ */ t(r.Item, {
				value: e,
				className: "select__item",
				"aria-label": i,
				children: /* @__PURE__ */ t(r.ItemText, { children: n })
			}, e)) })
		}) })]
	});
}
//#endregion
export { i as Select };

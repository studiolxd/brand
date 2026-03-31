'use client';
import './select.css';
import { Chevron as e } from "./chevron.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import * as r from "@radix-ui/react-select";
//#region src/stories/atoms/Select/Select.tsx
function i({ options: i, value: a, defaultValue: o, placeholder: s = "Seleccionar…", disabled: c, dark: l, onValueChange: u, id: d, "aria-label": f }) {
	return /* @__PURE__ */ n(r.Root, {
		value: a,
		defaultValue: o,
		disabled: c,
		onValueChange: u,
		children: [/* @__PURE__ */ n(r.Trigger, {
			className: "select",
			id: d,
			"aria-label": f ?? s,
			children: [/* @__PURE__ */ t(r.Value, { placeholder: s }), /* @__PURE__ */ t(r.Icon, {
				asChild: !0,
				children: /* @__PURE__ */ t(e, {
					className: "select__icon",
					size: "sm"
				})
			})]
		}), /* @__PURE__ */ t(r.Portal, { children: /* @__PURE__ */ t(r.Content, {
			className: ["select__content", l ? "select__content--dark" : ""].filter(Boolean).join(" "),
			position: "popper",
			children: /* @__PURE__ */ t(r.Viewport, { children: i.map(({ value: e, label: n }) => /* @__PURE__ */ t(r.Item, {
				value: e,
				className: "select__item",
				children: /* @__PURE__ */ t(r.ItemText, { children: n })
			}, e)) })
		}) })]
	});
}
//#endregion
export { i as Select };

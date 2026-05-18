'use client';
import './select.css';
import { Chevron as e } from "./chevron.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import * as r from "@radix-ui/react-select";
//#region src/stories/atoms/Select/Select.tsx
function i({ options: i, value: a, defaultValue: o, placeholder: s = "Seleccionar…", disabled: c, readOnly: l, dark: u, size: d = "md", onValueChange: f, id: p, "aria-label": m }) {
	let h = ["select", d === "md" ? "" : `select--${d}`].filter(Boolean).join(" "), g = [
		"select__content",
		d === "md" ? "" : `select__content--${d}`,
		u ? "select__content--dark" : ""
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ n(r.Root, {
		value: a,
		defaultValue: o,
		disabled: c,
		open: l ? !1 : void 0,
		onOpenChange: l ? () => {} : void 0,
		onValueChange: l ? void 0 : f,
		children: [/* @__PURE__ */ n(r.Trigger, {
			className: h,
			id: p,
			"aria-label": m ?? s,
			"aria-readonly": l || void 0,
			children: [/* @__PURE__ */ t(r.Value, { placeholder: s }), /* @__PURE__ */ t(r.Icon, {
				asChild: !0,
				children: /* @__PURE__ */ t(e, {
					className: "select__icon",
					size: d === "sm" ? "xs" : d === "lg" ? "md" : "sm"
				})
			})]
		}), /* @__PURE__ */ t(r.Portal, { children: /* @__PURE__ */ t(r.Content, {
			className: g,
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

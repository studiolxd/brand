'use client';
import './checkbox.css';
import { forwardRef as e } from "react";
import { jsx as t } from "react/jsx-runtime";
import { Checkbox as n } from "@base-ui/react/checkbox";
//#region src/stories/atoms/Checkbox/Checkbox.tsx
var r = e(function({ size: e = "md", className: r, checked: i, indeterminate: a, onCheckedChange: o, id: s, error: c = !1, ...l }, u) {
	let d = [
		"checkbox",
		e === "md" ? "" : `checkbox--${e}`,
		c ? "checkbox--error" : "",
		r ?? ""
	].filter(Boolean).join(" "), f = i === "indeterminate" || a;
	return /* @__PURE__ */ t(n.Root, {
		ref: u,
		className: d,
		render: /* @__PURE__ */ t("button", {
			type: "button",
			id: s
		}),
		nativeButton: !0,
		checked: i === "indeterminate" ? !1 : i,
		indeterminate: f,
		...f ? { "aria-checked": "mixed" } : {},
		"aria-invalid": c || void 0,
		onCheckedChange: o ? (e) => o(e) : void 0,
		...l,
		children: /* @__PURE__ */ t(n.Indicator, {
			className: "checkbox__indicator",
			keepMounted: !0
		})
	});
});
//#endregion
export { r as Checkbox };

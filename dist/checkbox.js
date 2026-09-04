'use client';
import './checkbox.css';
import { jsx as e } from "react/jsx-runtime";
import { forwardRef as t } from "react";
import { Checkbox as n } from "@base-ui/react/checkbox";
//#region src/stories/atoms/Checkbox/Checkbox.tsx
var r = t(function({ size: t = "md", className: r, checked: i, indeterminate: a, onCheckedChange: o, id: s, error: c = !1, ...l }, u) {
	let d = [
		"checkbox",
		t === "md" ? "" : `checkbox--${t}`,
		c ? "checkbox--error" : "",
		r ?? ""
	].filter(Boolean).join(" "), f = i === "indeterminate" || a;
	return /* @__PURE__ */ e(n.Root, {
		ref: u,
		className: d,
		render: /* @__PURE__ */ e("button", {
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
		children: /* @__PURE__ */ e(n.Indicator, {
			className: "checkbox__indicator",
			keepMounted: !0
		})
	});
});
//#endregion
export { r as Checkbox };

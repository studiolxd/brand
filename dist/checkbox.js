'use client';
import './checkbox.css';
import { jsx as e } from "react/jsx-runtime";
import { forwardRef as t } from "react";
import { Checkbox as n } from "@base-ui-components/react/checkbox";
//#region src/stories/atoms/Checkbox/Checkbox.tsx
var r = t(function({ size: t = "md", className: r, checked: i, indeterminate: a, onCheckedChange: o, id: s, ...c }, l) {
	let u = [
		"checkbox",
		t === "md" ? "" : `checkbox--${t}`,
		r ?? ""
	].filter(Boolean).join(" "), d = i === "indeterminate" || a;
	return /* @__PURE__ */ e(n.Root, {
		ref: l,
		className: u,
		render: /* @__PURE__ */ e("button", {
			type: "button",
			id: s
		}),
		nativeButton: !0,
		checked: i === "indeterminate" ? !1 : i,
		indeterminate: d,
		"aria-checked": d ? "mixed" : void 0,
		onCheckedChange: o ? (e) => o(e) : void 0,
		...c,
		children: /* @__PURE__ */ e(n.Indicator, {
			className: "checkbox__indicator",
			keepMounted: !0
		})
	});
});
//#endregion
export { r as Checkbox };

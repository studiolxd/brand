'use client';
import './checkbox.css';
import { jsx as e } from "react/jsx-runtime";
import { forwardRef as t } from "react";
import * as n from "@radix-ui/react-checkbox";
//#region src/stories/atoms/Checkbox/Checkbox.tsx
var r = t(function({ size: t = "md", className: r, ...i }, a) {
	let o = [
		"checkbox",
		t === "md" ? "" : `checkbox--${t}`,
		r ?? ""
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ e(n.Root, {
		ref: a,
		className: o,
		...i,
		children: /* @__PURE__ */ e(n.Indicator, { className: "checkbox__indicator" })
	});
});
//#endregion
export { r as Checkbox };

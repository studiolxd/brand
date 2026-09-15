'use client';
import './dots-button.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { Button as n } from "./button.js";
import { forwardRef as r } from "react";
import { jsx as i } from "react/jsx-runtime";
//#region src/stories/atoms/DotsButton/DotsButton.tsx
var a = r(function({ size: r = "md", orientation: a = "horizontal", "aria-label": o, className: s, ...c }, l) {
	let u = e("dotsButton"), d = [
		"dots-button",
		a === "vertical" ? "dots-button--vertical" : "",
		s
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ i(n, {
		ref: l,
		variant: "ghost",
		iconOnly: !0,
		size: r,
		"aria-label": u("label", o),
		className: d,
		...c,
		children: /* @__PURE__ */ i(t, {
			name: "dots",
			size: r === "lg" ? "md" : "sm"
		})
	});
});
//#endregion
export { a as DotsButton };

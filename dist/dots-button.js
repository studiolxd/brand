'use client';
import './dots-button.css';
import { Icon as e } from "./icon.js";
import { Button as t } from "./button.js";
import { forwardRef as n } from "react";
import { jsx as r } from "react/jsx-runtime";
//#region src/stories/atoms/DotsButton/DotsButton.tsx
var i = n(function({ size: n = "md", orientation: i = "horizontal", "aria-label": a = "Más opciones", className: o, ...s }, c) {
	let l = [
		"dots-button",
		i === "vertical" ? "dots-button--vertical" : "",
		o
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ r(t, {
		ref: c,
		variant: "ghost",
		iconOnly: !0,
		size: n,
		"aria-label": a,
		className: l,
		...s,
		children: /* @__PURE__ */ r(e, {
			name: "dots",
			size: n === "lg" ? "md" : "sm"
		})
	});
});
//#endregion
export { i as DotsButton };

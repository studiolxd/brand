'use client';
import './dots-button.css';
import { Icon as e } from "./icon.js";
import { Button as t } from "./button.js";
import { jsx as n } from "react/jsx-runtime";
import { forwardRef as r } from "react";
//#region src/stories/atoms/DotsButton/DotsButton.tsx
var i = r(function({ size: r = "md", orientation: i = "horizontal", "aria-label": a = "Más opciones", className: o, ...s }, c) {
	let l = [
		"dots-button",
		i === "vertical" ? "dots-button--vertical" : "",
		o
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ n(t, {
		ref: c,
		variant: "ghost",
		iconOnly: !0,
		size: r,
		"aria-label": a,
		className: l,
		...s,
		children: /* @__PURE__ */ n(e, {
			name: "dots",
			size: r === "lg" ? "md" : "sm"
		})
	});
});
//#endregion
export { i as DotsButton };

'use client';
import './dots-button.css';
import { jsx as e, jsxs as t } from "react/jsx-runtime";
import { forwardRef as n } from "react";
//#region src/stories/atoms/DotsButton/DotsButton.tsx
var r = n(function({ size: n = "md", orientation: r = "horizontal", "aria-label": i = "Más opciones", className: a, ...o }, s) {
	return /* @__PURE__ */ t("button", {
		ref: s,
		type: "button",
		className: [
			"dots-button",
			n === "md" ? "" : `dots-button--${n}`,
			r === "vertical" ? "dots-button--vertical" : "",
			a
		].filter(Boolean).join(" "),
		"aria-label": i,
		...o,
		children: [
			/* @__PURE__ */ e("span", {
				className: "dots-button__dot",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ e("span", {
				className: "dots-button__dot",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ e("span", {
				className: "dots-button__dot",
				"aria-hidden": "true"
			})
		]
	});
});
//#endregion
export { r as DotsButton };

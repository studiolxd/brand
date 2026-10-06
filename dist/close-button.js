'use client';
import './close-button.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { forwardRef as n } from "react";
import { jsx as r } from "react/jsx-runtime";
//#region src/stories/atoms/CloseButton/CloseButton.tsx
var i = n(function({ label: n, size: i = "md", className: a, ...o }, s) {
	let c = e("closeButton");
	return /* @__PURE__ */ r("button", {
		ref: s,
		type: "button",
		className: [
			"close-button",
			i === "md" ? "" : `close-button--${i}`,
			a
		].filter(Boolean).join(" "),
		"aria-label": c("label", n),
		...o,
		children: /* @__PURE__ */ r(t, { name: "close" })
	});
});
//#endregion
export { i as CloseButton };

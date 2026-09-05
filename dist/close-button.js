'use client';
import './close-button.css';
import { Icon as e } from "./icon.js";
import { jsx as t } from "react/jsx-runtime";
import { forwardRef as n } from "react";
//#region src/stories/atoms/CloseButton/CloseButton.tsx
var r = n(function({ label: n = "Cerrar", size: r = "md", className: i, ...a }, o) {
	return /* @__PURE__ */ t("button", {
		ref: o,
		type: "button",
		className: [
			"close-button",
			r === "md" ? "" : `close-button--${r}`,
			i
		].filter(Boolean).join(" "),
		"aria-label": n,
		...a,
		children: /* @__PURE__ */ t(e, { name: "close" })
	});
});
//#endregion
export { r as CloseButton };

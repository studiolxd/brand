'use client';
import './banner.css';
import { CloseButton as e } from "./close-button.js";
import { forwardRef as t } from "react";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/molecules/Banner/Banner.tsx
var i = t(function({ variant: t = "info", children: i, actions: a, onDismiss: o, dismissLabel: s = "Descartar aviso", className: c, role: l, "aria-live": u, ...d }, f) {
	let p = [
		"banner",
		`banner--${t}`,
		t === "info" ? "surface-dark" : "",
		o ? "banner--dismissible" : "",
		c ?? ""
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ r("div", {
		ref: f,
		role: l ?? "status",
		"aria-live": u ?? "polite",
		className: p,
		...d,
		children: [
			/* @__PURE__ */ n("div", {
				className: "banner__content",
				children: i
			}),
			a && /* @__PURE__ */ n("div", {
				className: "banner__actions",
				children: a
			}),
			o && /* @__PURE__ */ n(e, {
				className: "banner__close",
				label: s,
				onClick: o
			})
		]
	});
});
//#endregion
export { i as Banner };

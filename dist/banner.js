'use client';
import './banner.css';
import { CloseButton as e } from "./close-button.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import { forwardRef as r } from "react";
//#region src/stories/molecules/Banner/Banner.tsx
var i = r(function({ variant: r = "info", children: i, actions: a, onDismiss: o, dismissLabel: s = "Descartar aviso", className: c, role: l, "aria-live": u, ...d }, f) {
	let p = [
		"banner",
		`banner--${r}`,
		r === "info" ? "surface-dark" : "",
		o ? "banner--dismissible" : "",
		c ?? ""
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ n("div", {
		ref: f,
		role: l ?? "status",
		"aria-live": u ?? "polite",
		className: p,
		...d,
		children: [
			/* @__PURE__ */ t("div", {
				className: "banner__content",
				children: i
			}),
			a && /* @__PURE__ */ t("div", {
				className: "banner__actions",
				children: a
			}),
			o && /* @__PURE__ */ t(e, {
				className: "banner__close",
				label: s,
				onClick: o
			})
		]
	});
});
//#endregion
export { i as Banner };

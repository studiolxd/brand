'use client';
import './banner.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { CloseButton as t } from "./close-button.js";
import { forwardRef as n } from "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/stories/molecules/Banner/Banner.tsx
var a = n(function({ variant: n = "info", children: a, actions: o, onDismiss: s, dismissLabel: c, className: l, role: u, "aria-live": d, ...f }, p) {
	let m = e("banner"), h = [
		"banner",
		`banner--${n}`,
		n === "info" ? "surface-dark" : "",
		s ? "banner--dismissible" : "",
		l ?? ""
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ i("div", {
		ref: p,
		role: u ?? "status",
		"aria-live": d ?? "polite",
		className: h,
		...f,
		children: [
			/* @__PURE__ */ r("div", {
				className: "banner__content",
				children: a
			}),
			o && /* @__PURE__ */ r("div", {
				className: "banner__actions",
				children: o
			}),
			s && /* @__PURE__ */ r(t, {
				className: "banner__close",
				label: m("dismiss", c),
				onClick: s
			})
		]
	});
});
//#endregion
export { a as Banner };

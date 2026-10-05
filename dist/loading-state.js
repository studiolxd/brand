'use client';
import './loading-state.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Spinner as n } from "./spinner.js";
import { Button as r } from "./button.js";
import { useId as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/molecules/LoadingState/LoadingState.tsx
function s({ label: s, labelVisible: c = !1, size: l = "md", fill: u = !1, action: d, className: f, ...p }) {
	let m = e("spinner"), h = i(), g = m("label", s), _ = c && !!s;
	return /* @__PURE__ */ o("div", {
		className: [
			"loading-state",
			l === "sm" ? "loading-state--sm" : "",
			u ? "loading-state--fill" : "",
			f
		].filter(Boolean).join(" "),
		role: "status",
		"aria-busy": "true",
		"aria-labelledby": h,
		"aria-live": "polite",
		"aria-atomic": "false",
		...p,
		children: [
			/* @__PURE__ */ a("span", {
				className: "loading-state__spinner",
				children: /* @__PURE__ */ a(n, {
					size: l === "sm" ? "md" : "lg",
					"aria-hidden": !0
				})
			}),
			_ ? /* @__PURE__ */ a("p", {
				id: h,
				className: "loading-state__label",
				children: g
			}) : /* @__PURE__ */ a(t, {
				id: h,
				children: g
			}),
			d && /* @__PURE__ */ a(r, {
				variant: "outline",
				size: l === "sm" ? "sm" : "md",
				onClick: d.onClick,
				href: d.href,
				children: d.label
			})
		]
	});
}
//#endregion
export { s as LoadingState };

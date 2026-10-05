'use client';
import './loading-state.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Spinner as n } from "./spinner.js";
import { Button as r } from "./button.js";
import { useId as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/molecules/LoadingState/LoadingState.tsx
function s({ label: s, size: c = "md", fill: l = !1, action: u, className: d, ...f }) {
	let p = e("spinner"), m = i(), h = p("label", s);
	return /* @__PURE__ */ o("div", {
		className: [
			"loading-state",
			c === "sm" ? "loading-state--sm" : "",
			l ? "loading-state--fill" : "",
			d
		].filter(Boolean).join(" "),
		role: "status",
		"aria-busy": "true",
		"aria-labelledby": m,
		...f,
		children: [
			/* @__PURE__ */ a("span", {
				className: "loading-state__spinner",
				children: /* @__PURE__ */ a(n, {
					size: c === "sm" ? "md" : "lg",
					"aria-hidden": !0
				})
			}),
			/* @__PURE__ */ a(t, {
				id: m,
				children: h
			}),
			u && /* @__PURE__ */ a(r, {
				variant: "outline",
				size: c === "sm" ? "sm" : "md",
				onClick: u.onClick,
				href: u.href,
				children: u.label
			})
		]
	});
}
//#endregion
export { s as LoadingState };

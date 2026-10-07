'use client';
import './loading-state.css';
import { r as e } from "./_shared/brandmessagescontext.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { t as n } from "./_shared/spinner.js";
import { Spinner as r } from "./spinner.js";
import { Button as i } from "./button.js";
import { useId as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/molecules/LoadingState/LoadingState.tsx
function c({ label: c, labelVisible: l = !1, size: u = "md", fill: d = !1, action: f, className: p, ...m }) {
	let h = e("spinner", n), g = a(), _ = h("label", c), v = l && !!c;
	return /* @__PURE__ */ s("div", {
		className: [
			"loading-state",
			u === "sm" ? "loading-state--sm" : "",
			d ? "loading-state--fill" : "",
			p
		].filter(Boolean).join(" "),
		role: "status",
		"aria-busy": "true",
		"aria-labelledby": g,
		"aria-live": "polite",
		"aria-atomic": "false",
		...m,
		children: [
			/* @__PURE__ */ o("span", {
				className: "loading-state__spinner",
				children: /* @__PURE__ */ o(r, {
					size: u === "sm" ? "md" : "lg",
					"aria-hidden": !0
				})
			}),
			v ? /* @__PURE__ */ o("p", {
				id: g,
				className: "loading-state__label",
				children: _
			}) : /* @__PURE__ */ o(t, {
				id: g,
				children: _
			}),
			f && /* @__PURE__ */ o(i, {
				variant: "outline",
				size: u === "sm" ? "sm" : "md",
				onClick: f.onClick,
				href: f.href,
				children: f.label
			})
		]
	});
}
//#endregion
export { c as LoadingState };

'use client';
import './spinner.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/atoms/Spinner/Spinner.tsx
function i() {
	return /* @__PURE__ */ n("svg", {
		className: "spinner__square",
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		focusable: "false",
		children: /* @__PURE__ */ n("rect", {
			className: "spinner__stroke",
			x: "2",
			y: "2",
			width: "20",
			height: "20"
		})
	});
}
function a({ size: a = "md", label: o, "aria-hidden": s, className: c }) {
	let l = e("spinner"), u = [
		"spinner",
		`spinner--${a}`,
		c
	].filter(Boolean).join(" ");
	if (s) return /* @__PURE__ */ n("span", {
		className: u,
		"aria-hidden": "true",
		children: /* @__PURE__ */ n(i, {})
	});
	let d = l("label", o);
	return /* @__PURE__ */ r("span", {
		className: u,
		role: "status",
		"aria-label": d,
		children: [/* @__PURE__ */ n(i, {}), /* @__PURE__ */ n(t, { children: d })]
	});
}
//#endregion
export { a as Spinner };

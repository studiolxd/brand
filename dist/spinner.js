'use client';
import './spinner.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { t as n } from "./_shared/spinner.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/stories/atoms/Spinner/Spinner.tsx
function a() {
	return /* @__PURE__ */ r("svg", {
		className: "spinner__square",
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		focusable: "false",
		children: /* @__PURE__ */ r("rect", {
			className: "spinner__stroke",
			x: "2",
			y: "2",
			width: "20",
			height: "20"
		})
	});
}
function o({ size: o = "md", label: s, "aria-hidden": c, className: l }) {
	let u = e("spinner", n), d = [
		"spinner",
		`spinner--${o}`,
		l
	].filter(Boolean).join(" ");
	if (c) return /* @__PURE__ */ r("span", {
		className: d,
		"aria-hidden": "true",
		children: /* @__PURE__ */ r(a, {})
	});
	let f = u("label", s);
	return /* @__PURE__ */ i("span", {
		className: d,
		role: "status",
		"aria-label": f,
		children: [/* @__PURE__ */ r(a, {}), /* @__PURE__ */ r(t, { children: f })]
	});
}
//#endregion
export { o as Spinner };

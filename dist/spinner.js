import './spinner.css';
import { VisuallyHidden as e } from "./visually-hidden.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/stories/atoms/Spinner/Spinner.tsx
function r() {
	return /* @__PURE__ */ t("svg", {
		className: "spinner__square",
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		focusable: "false",
		children: /* @__PURE__ */ t("rect", {
			className: "spinner__stroke",
			x: "2",
			y: "2",
			width: "20",
			height: "20",
			pathLength: "100"
		})
	});
}
function i({ size: i = "md", label: a = "Cargando…", "aria-hidden": o }) {
	return o ? /* @__PURE__ */ t("span", {
		className: `spinner spinner--${i}`,
		"aria-hidden": "true",
		children: /* @__PURE__ */ t(r, {})
	}) : /* @__PURE__ */ n("span", {
		className: `spinner spinner--${i}`,
		role: "status",
		"aria-label": a,
		children: [/* @__PURE__ */ t(r, {}), /* @__PURE__ */ t(e, { children: a })]
	});
}
//#endregion
export { i as Spinner };

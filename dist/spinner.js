import './spinner.css';
import { VisuallyHidden as e } from "./visually-hidden.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/stories/atoms/Spinner/Spinner.tsx
function r({ size: r = "md", label: i = "Cargando…", "aria-hidden": a }) {
	return a ? /* @__PURE__ */ t("span", {
		className: `spinner spinner--${r}`,
		"aria-hidden": "true",
		children: /* @__PURE__ */ t("span", { className: "spinner__circle" })
	}) : /* @__PURE__ */ n("span", {
		className: `spinner spinner--${r}`,
		role: "status",
		"aria-label": i,
		children: [/* @__PURE__ */ t("span", {
			className: "spinner__circle",
			"aria-hidden": "true"
		}), /* @__PURE__ */ t(e, { children: i })]
	});
}
//#endregion
export { r as Spinner };

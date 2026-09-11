import '../logo.css';
import { r as e, t } from "./logoassets.js";
import { jsx as n } from "react/jsx-runtime";
//#region src/stories/atoms/Logo/Logo.tsx
function r({ size: r = "md", className: i }) {
	return /* @__PURE__ */ n("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: e,
		className: [
			"logo",
			`logo--${r}`,
			i
		].filter(Boolean).join(" "),
		"aria-hidden": "true",
		children: t.map((e) => /* @__PURE__ */ n("path", { d: e }, e))
	});
}
//#endregion
export { r as t };

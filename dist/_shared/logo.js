import '../logo.css';
import { n as e } from "./env.js";
import { r as t, t as n } from "./logoassets.js";
import { jsx as r } from "react/jsx-runtime";
//#region src/stories/atoms/Logo/Logo.tsx
function i({ size: i = "md", className: a }) {
	return i === "xxl" && e("Logo", "size=\"xxl\"", "`size=\"2xl\"`"), /* @__PURE__ */ r("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: t,
		className: [
			"logo",
			`logo--${i === "xxl" ? "2xl" : i}`,
			a
		].filter(Boolean).join(" "),
		"aria-hidden": "true",
		children: n.map((e) => /* @__PURE__ */ r("path", { d: e }, e))
	});
}
//#endregion
export { i as t };

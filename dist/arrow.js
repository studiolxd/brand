import './arrow.css';
import { jsx as e } from "react/jsx-runtime";
//#region src/stories/atoms/Arrow/Arrow.tsx
function t({ size: t = "md", className: n }) {
	return /* @__PURE__ */ e("svg", {
		className: [
			"arrow",
			t ? `arrow--${t}` : "",
			n ?? ""
		].filter(Boolean).join(" "),
		"aria-hidden": "true",
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "-0.5 5.5 27 13",
		fill: "none",
		stroke: "currentColor",
		children: /* @__PURE__ */ e("path", {
			vectorEffect: "non-scaling-stroke",
			strokeWidth: "1",
			d: "M0 12 H26 M20 6 L26 12 L20 18"
		})
	});
}
//#endregion
export { t as Arrow };

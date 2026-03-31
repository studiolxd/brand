import './chevron.css';
import { jsx as e } from "react/jsx-runtime";
//#region src/stories/atoms/Chevron/Chevron.tsx
function t({ size: t, className: n }) {
	return /* @__PURE__ */ e("svg", {
		className: [
			"chevron",
			t ? `chevron--${t}` : "",
			n ?? ""
		].filter(Boolean).join(" "),
		"aria-hidden": "true",
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 4 12 16",
		fill: "none",
		stroke: "currentColor",
		children: /* @__PURE__ */ e("path", {
			vectorEffect: "non-scaling-stroke",
			strokeWidth: "1",
			d: "M2 6 L8 12 L2 18"
		})
	});
}
//#endregion
export { t as Chevron };

import './close.css';
import { jsx as e } from "react/jsx-runtime";
//#region src/stories/atoms/Close/Close.tsx
function t({ size: t, className: n }) {
	return /* @__PURE__ */ e("svg", {
		className: [
			"close",
			t ? `close--${t}` : "",
			n ?? ""
		].filter(Boolean).join(" "),
		"aria-hidden": "true",
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 12 12",
		fill: "none",
		stroke: "currentColor",
		children: /* @__PURE__ */ e("path", {
			vectorEffect: "non-scaling-stroke",
			strokeWidth: "1",
			d: "M2 2 L10 10 M10 2 L2 10"
		})
	});
}
//#endregion
export { t as Close };

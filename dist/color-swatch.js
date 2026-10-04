import './color-swatch.css';
import { jsx as e } from "react/jsx-runtime";
//#region src/stories/atoms/ColorSwatch/ColorSwatch.tsx
function t({ color: t, size: n = "md", label: r, className: i }) {
	let a = typeof t == "string" && t.trim() !== "";
	return /* @__PURE__ */ e("svg", {
		className: [
			"color-swatch",
			n === "md" ? "" : `color-swatch--${n}`,
			a ? "" : "color-swatch--empty",
			i ?? ""
		].filter(Boolean).join(" "),
		viewBox: "0 0 1 1",
		preserveAspectRatio: "none",
		focusable: "false",
		...r ? {
			role: "img",
			"aria-label": r
		} : { "aria-hidden": !0 },
		children: a && /* @__PURE__ */ e("rect", {
			className: "color-swatch__fill",
			width: "1",
			height: "1",
			fill: t
		})
	});
}
//#endregion
export { t as ColorSwatch };

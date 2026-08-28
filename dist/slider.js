'use client';
import './slider.css';
import { jsx as e, jsxs as t } from "react/jsx-runtime";
import { Slider as n } from "@base-ui/react/slider";
//#region src/stories/atoms/Slider/Slider.tsx
function r({ value: r, defaultValue: i, onValueChange: a, onValueCommitted: o, label: s, thumbLabel: c, showValue: l = !1, orientation: u = "horizontal", className: d, ...f }) {
	let p = r ?? i ?? 0, m = Array.isArray(p) ? p.length : 1, h = c ?? ((e, t) => t === 1 ? s ?? "Valor" : t === 2 ? e === 0 ? "Mínimo" : "Máximo" : `Valor ${e + 1}`), g = [
		"slider",
		u === "vertical" ? "slider--vertical" : "",
		d ?? ""
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ t(n.Root, {
		className: g,
		orientation: u,
		value: r,
		defaultValue: i,
		"aria-label": m === 1 ? void 0 : s,
		onValueChange: a ? (e) => a(e) : void 0,
		onValueCommitted: o ? (e) => o(e) : void 0,
		...f,
		children: [/* @__PURE__ */ e(n.Control, {
			className: "slider__control",
			children: /* @__PURE__ */ t(n.Track, {
				className: "slider__track",
				children: [/* @__PURE__ */ e(n.Indicator, { className: "slider__indicator" }), Array.from({ length: m }, (t, r) => /* @__PURE__ */ e(n.Thumb, {
					index: r,
					className: "slider__thumb",
					getAriaLabel: () => h(r, m)
				}, r))]
			})
		}), l && /* @__PURE__ */ e(n.Value, { className: "slider__value" })]
	});
}
//#endregion
export { r as Slider };

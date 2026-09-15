'use client';
import './slider.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import { Slider as r } from "@base-ui/react/slider";
//#region src/stories/atoms/Slider/Slider.tsx
function i({ value: i, defaultValue: a, onValueChange: o, onValueCommitted: s, label: c, thumbLabel: l, showValue: u = !1, orientation: d = "horizontal", className: f, ...p }) {
	let m = e("slider"), h = i ?? a ?? 0, g = Array.isArray(h) ? h.length : 1, _ = l ?? ((e, t) => t === 1 ? m("value", c) : t === 2 ? m(e === 0 ? "min" : "max") : m("valueAt")(e + 1)), v = [
		"slider",
		d === "vertical" ? "slider--vertical" : "",
		f ?? ""
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ n(r.Root, {
		className: v,
		orientation: d,
		value: i,
		defaultValue: a,
		"aria-label": g === 1 ? void 0 : c,
		onValueChange: o ? (e) => o(e) : void 0,
		onValueCommitted: s ? (e) => s(e) : void 0,
		...p,
		children: [/* @__PURE__ */ t(r.Control, {
			className: "slider__control",
			children: /* @__PURE__ */ n(r.Track, {
				className: "slider__track",
				children: [/* @__PURE__ */ t(r.Indicator, { className: "slider__indicator" }), Array.from({ length: g }, (e, n) => /* @__PURE__ */ t(r.Thumb, {
					index: n,
					className: "slider__thumb",
					getAriaLabel: () => _(n, g)
				}, n))]
			})
		}), u && /* @__PURE__ */ t(r.Value, { className: "slider__value" })]
	});
}
//#endregion
export { i as Slider };

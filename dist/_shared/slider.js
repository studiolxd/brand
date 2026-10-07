import '../slider.css';
import { r as e } from "./brandmessagescontext.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import { Slider as r } from "@base-ui/react/slider";
//#region src/stories/messages/es/slider.ts
var i = {
	value: "Valor",
	min: "Mínimo",
	max: "Máximo",
	valueAt: (e) => `Valor ${e}`
};
//#endregion
//#region src/stories/atoms/Slider/Slider.tsx
function a({ value: a, defaultValue: o, onValueChange: s, onValueCommitted: c, label: l, thumbLabel: u, showValue: d = !1, orientation: f = "horizontal", className: p, ...m }) {
	let h = e("slider", i), g = a ?? o ?? 0, _ = Array.isArray(g) ? g.length : 1, v = u ?? ((e, t) => t === 1 ? h("value", l) : t === 2 ? h(e === 0 ? "min" : "max") : h("valueAt")(e + 1)), y = [
		"slider",
		f === "vertical" ? "slider--vertical" : "",
		p ?? ""
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ n(r.Root, {
		className: y,
		orientation: f,
		value: a,
		defaultValue: o,
		"aria-label": _ === 1 ? void 0 : l,
		onValueChange: s ? (e) => s(e) : void 0,
		onValueCommitted: c ? (e) => c(e) : void 0,
		...m,
		children: [/* @__PURE__ */ t(r.Control, {
			className: "slider__control",
			children: /* @__PURE__ */ n(r.Track, {
				className: "slider__track",
				children: [/* @__PURE__ */ t(r.Indicator, { className: "slider__indicator" }), Array.from({ length: _ }, (e, n) => /* @__PURE__ */ t(r.Thumb, {
					index: n,
					className: "slider__thumb",
					getAriaLabel: () => v(n, _)
				}, n))]
			})
		}), d && /* @__PURE__ */ t(r.Value, { className: "slider__value" })]
	});
}
//#endregion
export { a as t };

import './fieldset.css';
import { n as e } from "./_shared/env.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/stories/atoms/Fieldset/Fieldset.tsx
function r({ legend: r, legendHidden: i = !1, level: a = 2, weight: o, size: s, className: c, id: l, disabled: u, "aria-describedby": d, children: f }) {
	o !== void 0 && e("Fieldset", "weight", "el peso que trae `level` (no tiene efecto)");
	let p = i ? "visually-hidden" : [
		"fieldset__legend",
		`fieldset__legend--${a}`,
		s && `fieldset__legend--size-${s}`
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ n("fieldset", {
		className: ["fieldset", c].filter(Boolean).join(" "),
		id: l,
		disabled: u,
		"aria-describedby": d,
		children: [/* @__PURE__ */ t("legend", {
			className: p,
			children: r
		}), f]
	});
}
//#endregion
export { r as Fieldset };

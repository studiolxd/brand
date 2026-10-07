import './fieldset.css';
import { jsx as e, jsxs as t } from "react/jsx-runtime";
//#region src/stories/atoms/Fieldset/Fieldset.tsx
function n({ legend: n, legendHidden: r = !1, level: i = 2, weight: a, size: o, className: s, id: c, disabled: l, "aria-describedby": u, children: d }) {
	let f = r ? "visually-hidden" : [
		"fieldset__legend",
		`fieldset__legend--${i}`,
		a && `fieldset__legend--${a}`,
		o && `fieldset__legend--size-${o}`
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ t("fieldset", {
		className: ["fieldset", s].filter(Boolean).join(" "),
		id: c,
		disabled: l,
		"aria-describedby": u,
		children: [/* @__PURE__ */ e("legend", {
			className: f,
			children: n
		}), d]
	});
}
//#endregion
export { n as Fieldset };

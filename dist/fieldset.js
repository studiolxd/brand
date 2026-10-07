import './fieldset.css';
import { jsx as e, jsxs as t } from "react/jsx-runtime";
//#region src/stories/atoms/Fieldset/Fieldset.tsx
function n({ legend: n, legendHidden: r = !1, level: i = 2, size: a, className: o, id: s, disabled: c, "aria-describedby": l, children: u }) {
	let d = r ? "visually-hidden" : [
		"fieldset__legend",
		`fieldset__legend--${i}`,
		a && `fieldset__legend--size-${a}`
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ t("fieldset", {
		className: ["fieldset", o].filter(Boolean).join(" "),
		id: s,
		disabled: c,
		"aria-describedby": l,
		children: [/* @__PURE__ */ e("legend", {
			className: d,
			children: n
		}), u]
	});
}
//#endregion
export { n as Fieldset };

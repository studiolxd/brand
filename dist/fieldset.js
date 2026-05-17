import './fieldset.css';
import { jsx as e, jsxs as t } from "react/jsx-runtime";
//#region src/stories/atoms/Fieldset/Fieldset.tsx
function n({ legend: n, level: r = 2, weight: i, size: a, className: o, id: s, disabled: c, children: l }) {
	let u = [
		"fieldset__legend",
		`fieldset__legend--${r}`,
		i && `fieldset__legend--${i}`,
		a && `fieldset__legend--size-${a}`
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ t("fieldset", {
		className: ["fieldset", o].filter(Boolean).join(" "),
		id: s,
		disabled: c,
		children: [/* @__PURE__ */ e("legend", {
			className: u,
			children: n
		}), l]
	});
}
//#endregion
export { n as Fieldset };

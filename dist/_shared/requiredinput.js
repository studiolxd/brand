import { VisuallyHidden as e } from "../visually-hidden.js";
import { jsx as t } from "react/jsx-runtime";
//#region src/stories/molecules/_shared/requiredInput.tsx
var n = () => {};
function r({ name: r, value: i, required: a = !1, focusTarget: o }) {
	return a ? /* @__PURE__ */ t(e, { children: /* @__PURE__ */ t("input", {
		type: "text",
		name: r,
		value: i,
		required: !0,
		tabIndex: -1,
		"aria-hidden": "true",
		autoComplete: "off",
		onChange: n,
		onFocus: () => o?.()?.focus()
	}) }) : r ? /* @__PURE__ */ t("input", {
		type: "hidden",
		name: r,
		value: i
	}) : null;
}
//#endregion
export { r as t };

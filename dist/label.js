import './label.css';
import { jsx as e } from "react/jsx-runtime";
//#region src/stories/atoms/Label/Label.tsx
function t({ htmlFor: t, children: n, hidden: r = !1 }) {
	return /* @__PURE__ */ e("label", {
		htmlFor: t,
		className: ["label", r ? "visually-hidden" : ""].filter(Boolean).join(" "),
		children: n
	});
}
//#endregion
export { t as Label };

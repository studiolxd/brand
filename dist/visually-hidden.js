import './visually-hidden.css';
import { jsx as e } from "react/jsx-runtime";
//#region src/stories/atoms/VisuallyHidden/VisuallyHidden.tsx
function t({ children: t }) {
	return /* @__PURE__ */ e("span", {
		className: "visually-hidden",
		children: t
	});
}
//#endregion
export { t as VisuallyHidden };

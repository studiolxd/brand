import './skip-link.css';
import { jsx as e } from "react/jsx-runtime";
//#region src/stories/atoms/SkipLink/SkipLink.tsx
function t({ href: t, children: n }) {
	return /* @__PURE__ */ e("a", {
		href: t,
		className: "skip-link",
		children: n
	});
}
//#endregion
export { t as SkipLink };

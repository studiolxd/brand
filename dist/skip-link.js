import './skip-link.css';
/* empty css                       */
import { jsx as e } from "react/jsx-runtime";
//#region src/stories/atoms/SkipLink/SkipLink.tsx
function t({ href: t, className: n, children: r, ...i }) {
	return /* @__PURE__ */ e("a", {
		href: t,
		className: [
			"skip-link",
			"visually-hidden",
			n
		].filter(Boolean).join(" "),
		...i,
		children: r
	});
}
//#endregion
export { t as SkipLink };

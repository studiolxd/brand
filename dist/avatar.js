import './avatar.css';
import { jsx as e } from "react/jsx-runtime";
//#region src/stories/atoms/Avatar/Avatar.tsx
function t({ src: t, alt: n, size: r = "md", className: i }) {
	return /* @__PURE__ */ e("img", {
		src: t,
		alt: n,
		className: [
			"avatar",
			`avatar--${r}`,
			i
		].filter(Boolean).join(" ")
	});
}
//#endregion
export { t as Avatar };

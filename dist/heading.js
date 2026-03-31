import './heading.css';
import { jsx as e } from "react/jsx-runtime";
//#region src/stories/atoms/Heading/Heading.tsx
function t({ level: t = 2, weight: n, size: r, className: i, children: a }) {
	return /* @__PURE__ */ e(`h${t}`, {
		className: [
			"heading",
			`heading--${t}`,
			n && `heading--${n}`,
			r && `heading--size-${r}`,
			i
		].filter(Boolean).join(" "),
		children: a
	});
}
//#endregion
export { t as Heading };

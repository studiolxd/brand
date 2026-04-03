import './heading.css';
import { jsx as e } from "react/jsx-runtime";
//#region src/stories/atoms/Heading/Heading.tsx
function t({ level: t = 2, weight: n, size: r, className: i, id: a, children: o }) {
	return /* @__PURE__ */ e(`h${t}`, {
		className: [
			"heading",
			`heading--${t}`,
			n && `heading--${n}`,
			r && `heading--size-${r}`,
			i
		].filter(Boolean).join(" "),
		id: a,
		children: o
	});
}
//#endregion
export { t as Heading };

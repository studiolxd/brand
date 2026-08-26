import './heading.css';
import { jsx as e } from "react/jsx-runtime";
//#region src/stories/atoms/Heading/Heading.tsx
function t({ level: t = 2, size: n, className: r, id: i, children: a }) {
	return /* @__PURE__ */ e(`h${t}`, {
		className: [
			"heading",
			`heading--${t}`,
			n && `heading--size-${n}`,
			r
		].filter(Boolean).join(" "),
		id: i,
		children: a
	});
}
//#endregion
export { t as Heading };

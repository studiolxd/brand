import './highlight.css';
import { jsx as e } from "react/jsx-runtime";
//#region src/stories/atoms/Highlight/Highlight.tsx
function t({ text: t, size: n = 8, weight: r, align: i = "left", textAlign: a, className: o }) {
	return /* @__PURE__ */ e("div", {
		className: [
			"highlight",
			i === "left" ? "" : `highlight--${i}`,
			a ? `highlight--text-${a}` : "",
			n && `highlight--size-${n}`,
			r && `highlight--${r}`,
			o
		].filter(Boolean).join(" "),
		children: /* @__PURE__ */ e("p", { children: t })
	});
}
//#endregion
export { t as Highlight };

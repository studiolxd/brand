import './highlight.css';
import { jsx as e } from "react/jsx-runtime";
//#region src/stories/atoms/Highlight/Highlight.tsx
function t({ text: t, align: n = "left", textAlign: r, className: i }) {
	return /* @__PURE__ */ e("div", {
		className: [
			"highlight",
			n === "left" ? "" : `highlight--${n}`,
			r ? `highlight--text-${r}` : "",
			i
		].filter(Boolean).join(" "),
		children: /* @__PURE__ */ e("p", { children: t })
	});
}
//#endregion
export { t as Highlight };

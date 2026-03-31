import './highlight-section.css';
import { jsx as e } from "react/jsx-runtime";
//#region src/stories/sections/HighlightSection/HighlightSection.tsx
function t({ text: t, align: n = "left", textAlign: r, className: i }) {
	return /* @__PURE__ */ e("section", {
		className: "highlight-section",
		children: /* @__PURE__ */ e("div", {
			className: [
				"highlight-section__container",
				n === "left" ? "" : `highlight-section__container--${n}`,
				r ? `highlight-section__container--text-${r}` : "",
				i
			].filter(Boolean).join(" "),
			children: /* @__PURE__ */ e("p", { children: t })
		})
	});
}
//#endregion
export { t as HighlightSection };

import './highlight-section.css';
import { jsx as e } from "react/jsx-runtime";
//#region src/stories/sections/HighlightSection/HighlightSection.tsx
function t({ id: t, text: n, align: r = "left", textAlign: i, className: a }) {
	return /* @__PURE__ */ e("section", {
		id: t,
		className: "highlight-section",
		children: /* @__PURE__ */ e("div", {
			className: [
				"highlight-section__container",
				r === "left" ? "" : `highlight-section__container--${r}`,
				i ? `highlight-section__container--text-${i}` : "",
				a
			].filter(Boolean).join(" "),
			children: /* @__PURE__ */ e("p", { children: n })
		})
	});
}
//#endregion
export { t as HighlightSection };

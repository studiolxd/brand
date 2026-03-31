import './highlight-section.css';
import { Highlight as e } from "./highlight.js";
import { jsx as t } from "react/jsx-runtime";
//#region src/stories/sections/HighlightSection/HighlightSection.tsx
function n({ id: n, text: r, align: i = "left", textAlign: a, className: o }) {
	return /* @__PURE__ */ t("section", {
		id: n,
		className: "highlight-section",
		children: /* @__PURE__ */ t(e, {
			text: r,
			align: i,
			textAlign: a,
			className: o
		})
	});
}
//#endregion
export { n as HighlightSection };

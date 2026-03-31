import './solutions-section.css';
import { Card as e } from "./card.js";
import { jsx as t } from "react/jsx-runtime";
//#region src/stories/sections/SolutionsSection/SolutionsSection.tsx
function n({ items: n, "aria-label": r }) {
	return /* @__PURE__ */ t("section", {
		className: "solutions-section",
		"aria-label": r,
		children: n.map((n) => /* @__PURE__ */ t(e, { ...n }, n.title))
	});
}
//#endregion
export { n as SolutionsSection };

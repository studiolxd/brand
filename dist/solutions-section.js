import './solutions-section.css';
import { Card as e } from "./card.js";
import { jsx as t } from "react/jsx-runtime";
//#region src/stories/sections/SolutionsSection/SolutionsSection.tsx
function n({ id: n, items: r, "aria-label": i }) {
	return /* @__PURE__ */ t("section", {
		id: n,
		className: "solutions-section",
		"aria-label": i,
		children: r.map((n) => /* @__PURE__ */ t(e, { ...n }, n.title))
	});
}
//#endregion
export { n as SolutionsSection };

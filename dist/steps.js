import './steps.css';
import { Paragraph as e } from "./paragraph.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/stories/organisms/Steps/Steps.tsx
function r({ steps: r, className: i }) {
	return /* @__PURE__ */ t("div", {
		className: ["steps", i].filter(Boolean).join(" "),
		children: r.map((r, i) => /* @__PURE__ */ n("div", {
			className: "steps__item",
			children: [/* @__PURE__ */ t("div", {
				className: "steps__number",
				children: /* @__PURE__ */ t("span", {
					className: "steps__number-inner",
					children: String(i + 1).padStart(2, "0")
				})
			}), /* @__PURE__ */ t("div", {
				className: "steps__text",
				children: /* @__PURE__ */ t(e, {
					size: "large",
					className: "steps__text-inner",
					children: r.text
				})
			})]
		}, r.text))
	});
}
//#endregion
export { r as Steps };

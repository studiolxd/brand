import './empty-state.css';
import { Button as e } from "./button.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/stories/molecules/EmptyState/EmptyState.tsx
function r({ title: r, description: i, icon: a, action: o, size: s = "md" }) {
	return /* @__PURE__ */ n("div", {
		className: ["empty-state", s === "sm" ? "empty-state--sm" : ""].filter(Boolean).join(" "),
		children: [
			a && /* @__PURE__ */ t("div", {
				className: "empty-state__icon",
				children: a
			}),
			/* @__PURE__ */ n("div", {
				className: "empty-state__body",
				children: [/* @__PURE__ */ t("p", {
					className: "empty-state__title",
					children: r
				}), i && /* @__PURE__ */ t("p", {
					className: "empty-state__description",
					children: i
				})]
			}),
			o && /* @__PURE__ */ t(e, {
				variant: "outline",
				size: s === "sm" ? "sm" : "md",
				onClick: o.onClick,
				href: o.href,
				children: o.label
			})
		]
	});
}
//#endregion
export { r as EmptyState };

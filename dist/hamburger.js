'use client';
import './hamburger.css';
import { jsx as e, jsxs as t } from "react/jsx-runtime";
//#region src/stories/atoms/Hamburger/Hamburger.tsx
function n({ isOpen: n = !1, onClick: r, label: i = "Menu" }) {
	return /* @__PURE__ */ t("button", {
		type: "button",
		className: "hamburger",
		"aria-label": i,
		"aria-expanded": n,
		onClick: r,
		children: [
			/* @__PURE__ */ e("span", {
				className: "hamburger__bar",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ e("span", {
				className: "hamburger__bar",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ e("span", {
				className: "hamburger__bar",
				"aria-hidden": "true"
			})
		]
	});
}
//#endregion
export { n as Hamburger };

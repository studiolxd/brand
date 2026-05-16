'use client';
import './sidebar.css';
import { jsx as e, jsxs as t } from "react/jsx-runtime";
//#region src/stories/sections/Sidebar/Sidebar.tsx
function n({ open: n, onOpenChange: r, children: i, id: a }) {
	return /* @__PURE__ */ t("div", {
		className: "sidebar",
		"data-open": n ? "true" : "false",
		id: a,
		children: [/* @__PURE__ */ e("div", {
			className: "sidebar__backdrop",
			onClick: () => r?.(!1),
			"aria-hidden": "true"
		}), /* @__PURE__ */ e("div", {
			className: "sidebar__panel",
			children: i
		})]
	});
}
//#endregion
export { n as Sidebar };

'use client';
import './sidebar.css';
import { t as e } from "./_shared/SidebarContext.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import { useContext as r } from "react";
//#region src/stories/sections/Sidebar/Sidebar.tsx
function i({ open: i, onOpenChange: a, children: o, id: s }) {
	let c = r(e), l = i !== void 0, u = l ? i : c?.open ?? !1, d = () => {
		l ? a?.(!1) : c?.setOpen(!1);
	};
	return /* @__PURE__ */ n("div", {
		className: "sidebar",
		"data-open": u ? "true" : "false",
		id: s,
		children: [/* @__PURE__ */ t("div", {
			className: "sidebar__backdrop",
			onClick: d,
			"aria-hidden": "true"
		}), /* @__PURE__ */ t("div", {
			className: "sidebar__panel",
			children: o
		})]
	});
}
//#endregion
export { i as Sidebar };

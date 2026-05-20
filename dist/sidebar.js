'use client';
import './sidebar.css';
import { Chevron as e } from "./chevron.js";
import { t } from "./_shared/SidebarContext.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { useContext as i, useState as a } from "react";
//#region src/stories/sections/Sidebar/Sidebar.tsx
function o({ logo: o, children: s, id: c }) {
	let l = i(t), [u, d] = a(!1), f = l ? l.collapsed : u, p = l ? l.setCollapsed : d;
	return /* @__PURE__ */ r("div", {
		className: "sidebar",
		"data-collapsed": f ? "true" : "false",
		id: c,
		children: [/* @__PURE__ */ r("div", {
			className: "sidebar__header",
			children: [/* @__PURE__ */ n("div", {
				className: "sidebar__logo",
				children: o
			}), /* @__PURE__ */ n("button", {
				type: "button",
				className: "sidebar__collapse-btn",
				onClick: () => p(!f),
				"aria-expanded": !f,
				"aria-label": f ? "Expandir sidebar" : "Plegar sidebar",
				children: /* @__PURE__ */ n(e, {
					className: "sidebar__collapse-icon",
					size: "sm"
				})
			})]
		}), /* @__PURE__ */ n("div", {
			className: "sidebar__panel",
			children: s
		})]
	});
}
//#endregion
export { o as Sidebar };

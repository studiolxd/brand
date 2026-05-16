'use client';
import './sidebar-nav.css';
import { Accordion as e, AccordionContent as t, AccordionItem as n, AccordionTrigger as r } from "./accordion.js";
import { Fragment as i, jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/molecules/SidebarNav/SidebarNav.tsx
function s({ href: e, children: t, className: n, "aria-current": r }) {
	return /* @__PURE__ */ a("a", {
		href: e,
		className: n,
		"aria-current": r,
		children: t
	});
}
function c({ groups: c, defaultValue: l, value: u, onValueChange: d, renderLink: f = s }) {
	return /* @__PURE__ */ a("nav", {
		className: "sidebar-nav",
		children: /* @__PURE__ */ a(e, {
			className: "sidebar-nav__accordion",
			...u === void 0 ? {
				type: "multiple",
				defaultValue: l
			} : {
				type: "multiple",
				value: u,
				onValueChange: d
			},
			children: c.map((e) => /* @__PURE__ */ o(n, {
				value: e.id,
				className: "sidebar-nav__group",
				children: [/* @__PURE__ */ a(r, {
					className: "sidebar-nav__group-trigger",
					chevronSize: "sm",
					children: /* @__PURE__ */ a("span", {
						className: "sidebar-nav__group-label",
						children: e.label
					})
				}), /* @__PURE__ */ a(t, {
					className: "sidebar-nav__group-content",
					children: /* @__PURE__ */ a("ul", {
						className: "sidebar-nav__items",
						role: "list",
						children: e.items.map((e) => {
							let t = ["sidebar-nav__item", e.active ? "sidebar-nav__item--active" : ""].filter(Boolean).join(" ");
							return /* @__PURE__ */ a("li", { children: f({
								href: e.href,
								className: t,
								"aria-current": e.active ? "page" : void 0,
								children: /* @__PURE__ */ o(i, { children: [e.icon && /* @__PURE__ */ a("span", {
									className: "sidebar-nav__item-icon",
									"aria-hidden": "true",
									children: e.icon
								}), /* @__PURE__ */ a("span", { children: e.label })] })
							}) }, e.id);
						})
					})
				})]
			}, e.id))
		})
	});
}
//#endregion
export { c as SidebarNav };

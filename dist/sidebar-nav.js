'use client';
import './sidebar-nav.css';
import { Icon as e } from "./icon.js";
import * as t from "@radix-ui/react-accordion";
import { Fragment as n, jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/stories/molecules/SidebarNav/SidebarNav.tsx
function a({ href: e, children: t, className: n, title: i, "aria-current": a }) {
	return /* @__PURE__ */ r("a", {
		href: e,
		className: n,
		title: i,
		"aria-current": a,
		children: t
	});
}
function o({ entries: o, defaultValue: s, value: c, onValueChange: l, renderLink: u = a }) {
	let d = c === void 0 ? {
		type: "multiple",
		defaultValue: s
	} : {
		type: "multiple",
		value: c,
		onValueChange: l
	};
	return /* @__PURE__ */ r("nav", {
		className: "sidebar-nav",
		children: /* @__PURE__ */ r(t.Root, {
			className: "sidebar-nav__accordion",
			...d,
			children: o.map((a) => {
				if (a.kind === "link") {
					let e = ["sidebar-nav__top-link", a.active ? "sidebar-nav__top-link--active" : ""].filter(Boolean).join(" ");
					return /* @__PURE__ */ r("div", { children: u({
						href: a.href,
						className: e,
						title: a.label,
						"aria-current": a.active ? "page" : void 0,
						children: /* @__PURE__ */ i(n, { children: [a.icon && /* @__PURE__ */ r("span", {
							className: "sidebar-nav__item-icon",
							"aria-hidden": "true",
							children: a.icon
						}), /* @__PURE__ */ r("span", {
							className: "sidebar-nav__item-label",
							children: a.label
						})] })
					}) }, a.id);
				}
				return /* @__PURE__ */ i(t.Item, {
					value: a.id,
					className: "sidebar-nav__group",
					children: [/* @__PURE__ */ i(t.Header, {
						className: "sidebar-nav__group-header",
						children: [a.href ? u({
							href: a.href,
							className: "sidebar-nav__group-label",
							title: a.label,
							children: /* @__PURE__ */ i(n, { children: [a.icon && /* @__PURE__ */ r("span", {
								className: "sidebar-nav__item-icon",
								"aria-hidden": "true",
								children: a.icon
							}), /* @__PURE__ */ r("span", {
								className: "sidebar-nav__item-label",
								children: a.label
							})] })
						}) : /* @__PURE__ */ i("span", {
							className: "sidebar-nav__group-label",
							title: a.label,
							children: [a.icon && /* @__PURE__ */ r("span", {
								className: "sidebar-nav__item-icon",
								"aria-hidden": "true",
								children: a.icon
							}), /* @__PURE__ */ r("span", {
								className: "sidebar-nav__item-label",
								children: a.label
							})]
						}), /* @__PURE__ */ r(t.Trigger, {
							className: "sidebar-nav__group-chevron",
							children: /* @__PURE__ */ r(e, {
								name: "chevron",
								className: "sidebar-nav__group-chevron-icon",
								size: "sm"
							})
						})]
					}), /* @__PURE__ */ r(t.Content, {
						className: "sidebar-nav__group-content",
						children: /* @__PURE__ */ r("div", {
							className: "sidebar-nav__group-content-inner",
							children: /* @__PURE__ */ r("ul", {
								className: "sidebar-nav__items",
								role: "list",
								children: a.items.map((e) => {
									let t = ["sidebar-nav__item", e.active ? "sidebar-nav__item--active" : ""].filter(Boolean).join(" ");
									return /* @__PURE__ */ r("li", { children: u({
										href: e.href,
										className: t,
										"aria-current": e.active ? "page" : void 0,
										children: /* @__PURE__ */ i(n, { children: [e.icon && /* @__PURE__ */ r("span", {
											className: "sidebar-nav__item-icon",
											"aria-hidden": "true",
											children: e.icon
										}), /* @__PURE__ */ r("span", {
											className: "sidebar-nav__item-label",
											children: e.label
										})] })
									}) }, e.id);
								})
							})
						})
					})]
				}, a.id);
			})
		})
	});
}
//#endregion
export { o as SidebarNav };

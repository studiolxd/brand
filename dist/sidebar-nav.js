'use client';
import './sidebar-nav.css';
import { a as e, i as t, n, r, t as i } from "./_shared/AccordionPanel.js";
import { Icon as a } from "./icon.js";
import { t as o } from "./_shared/Tooltip.js";
import { Menu as s } from "./menu.js";
import { n as c } from "./_shared/SidebarContext.js";
import { Fragment as l, jsx as u, jsxs as d } from "react/jsx-runtime";
//#region src/stories/molecules/SidebarNav/SidebarNav.tsx
function f({ children: e, ...t }) {
	return /* @__PURE__ */ u("a", {
		...t,
		children: e
	});
}
function p({ label: p = "Navegación principal", rail: m, entries: h, defaultValue: g, value: _, onValueChange: v, renderLink: y = f }) {
	let b = _ === void 0 ? { defaultValue: g } : {
		value: _,
		onValueChange: (e) => v?.(e ?? [])
	}, x = c();
	return m ?? x.rail ? /* @__PURE__ */ u("nav", {
		className: "sidebar-nav sidebar-nav--rail",
		"aria-label": p,
		children: /* @__PURE__ */ u("ul", {
			className: "sidebar-nav__rail",
			role: "list",
			children: h.map((e) => {
				let t = /* @__PURE__ */ u("span", {
					className: "sidebar-nav__rail-icon",
					"aria-hidden": "true",
					children: e.icon ?? /* @__PURE__ */ u("span", {
						className: "sidebar-nav__rail-initial",
						children: e.label.charAt(0)
					})
				});
				if (e.kind === "link") return /* @__PURE__ */ u("li", { children: /* @__PURE__ */ u(o, {
					label: e.label,
					side: "right",
					children: y({
						href: e.href,
						className: ["sidebar-nav__rail-item", e.active ? "sidebar-nav__rail-item--active" : ""].filter(Boolean).join(" "),
						"aria-current": e.active ? "page" : void 0,
						"aria-label": e.label,
						children: t
					})
				}) }, e.id);
				let n = e.items.some((e) => e.active);
				return /* @__PURE__ */ u("li", { children: /* @__PURE__ */ u(s, {
					items: [
						e.href ? {
							type: "link",
							label: e.label,
							href: e.href
						} : {
							type: "label",
							label: e.label
						},
						...e.href ? [{ type: "separator" }] : [],
						...e.items.map((e) => ({
							type: "link",
							label: e.label,
							href: e.href
						}))
					],
					side: "right",
					align: "start",
					openOnHover: !0,
					renderLink: (e) => y({
						...e,
						href: e.href,
						className: e.className,
						children: e.children
					}),
					trigger: /* @__PURE__ */ u("button", {
						type: "button",
						className: ["sidebar-nav__rail-item", n ? "sidebar-nav__rail-item--active" : ""].filter(Boolean).join(" "),
						"aria-label": e.label,
						children: t
					})
				}) }, e.id);
			})
		})
	}) : /* @__PURE__ */ u("nav", {
		className: "sidebar-nav",
		"aria-label": p,
		children: /* @__PURE__ */ u(e, {
			className: "sidebar-nav__accordion",
			multiple: !0,
			...b,
			children: h.map((e) => {
				if (e.kind === "link") {
					let t = ["sidebar-nav__top-link", e.active ? "sidebar-nav__top-link--active" : ""].filter(Boolean).join(" ");
					return /* @__PURE__ */ u("div", { children: y({
						href: e.href,
						className: t,
						title: e.label,
						"aria-current": e.active ? "page" : void 0,
						children: /* @__PURE__ */ d(l, { children: [e.icon && /* @__PURE__ */ u("span", {
							className: "sidebar-nav__item-icon",
							"aria-hidden": "true",
							children: e.icon
						}), /* @__PURE__ */ u("span", {
							className: "sidebar-nav__item-label",
							children: e.label
						})] })
					}) }, e.id);
				}
				return /* @__PURE__ */ d(t, {
					value: e.id,
					className: "sidebar-nav__group",
					children: [/* @__PURE__ */ d(r, {
						className: "sidebar-nav__group-header",
						children: [e.href ? y({
							href: e.href,
							className: "sidebar-nav__group-label",
							title: e.label,
							children: /* @__PURE__ */ d(l, { children: [e.icon && /* @__PURE__ */ u("span", {
								className: "sidebar-nav__item-icon",
								"aria-hidden": "true",
								children: e.icon
							}), /* @__PURE__ */ u("span", {
								className: "sidebar-nav__item-label",
								children: e.label
							})] })
						}) : /* @__PURE__ */ d("span", {
							className: "sidebar-nav__group-label",
							title: e.label,
							children: [e.icon && /* @__PURE__ */ u("span", {
								className: "sidebar-nav__item-icon",
								"aria-hidden": "true",
								children: e.icon
							}), /* @__PURE__ */ u("span", {
								className: "sidebar-nav__item-label",
								children: e.label
							})]
						}), /* @__PURE__ */ u(n, {
							className: "sidebar-nav__group-chevron",
							children: /* @__PURE__ */ u(a, {
								name: "chevron",
								className: "sidebar-nav__group-chevron-icon",
								size: "sm"
							})
						})]
					}), /* @__PURE__ */ u(i, {
						className: "sidebar-nav__group-content",
						children: /* @__PURE__ */ u("div", {
							className: "sidebar-nav__group-content-inner",
							children: /* @__PURE__ */ u("ul", {
								className: "sidebar-nav__items",
								role: "list",
								children: e.items.map((e) => {
									let t = ["sidebar-nav__item", e.active ? "sidebar-nav__item--active" : ""].filter(Boolean).join(" ");
									return /* @__PURE__ */ u("li", { children: y({
										href: e.href,
										className: t,
										"aria-current": e.active ? "page" : void 0,
										children: /* @__PURE__ */ d(l, { children: [e.icon && /* @__PURE__ */ u("span", {
											className: "sidebar-nav__item-icon",
											"aria-hidden": "true",
											children: e.icon
										}), /* @__PURE__ */ u("span", {
											className: "sidebar-nav__item-label",
											children: e.label
										})] })
									}) }, e.id);
								})
							})
						})
					})]
				}, e.id);
			})
		})
	});
}
//#endregion
export { p as SidebarNav };

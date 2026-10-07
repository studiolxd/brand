'use client';
import './sidebar-nav.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { Tooltip as n } from "./tooltip.js";
import { t as r } from "./_shared/default-render-link.js";
import { Menu as i } from "./menu.js";
import { n as a } from "./_shared/sidebarcontext.js";
import { useId as o } from "react";
import { Fragment as s, jsx as c, jsxs as l } from "react/jsx-runtime";
import { Accordion as u } from "@base-ui/react/accordion";
//#region src/stories/messages/es/sidebarNav.ts
var d = {
	label: "Navegación principal",
	empty: "sin docs",
	emptyEntry: (e, t) => `${e} — ${t}`
};
//#endregion
//#region src/stories/molecules/SidebarNav/SidebarNav.tsx
function f({ label: f, emptyLabel: p, emptyEntryLabel: m, rail: h, entries: g, defaultValue: _, value: v, onValueChange: y, renderLink: b = r, className: x }) {
	let S = e("sidebarNav", d), C = o(), w = (e) => S("emptyEntry", m)(e, S("empty", p)), T = v === void 0 ? { defaultValue: _ } : {
		value: v,
		onValueChange: (e) => y?.(e ?? [])
	}, E = a();
	return h ?? E.rail ? /* @__PURE__ */ c("nav", {
		className: [
			"sidebar-nav",
			"sidebar-nav--rail",
			x
		].filter(Boolean).join(" "),
		"aria-label": S("label", f),
		children: /* @__PURE__ */ c("ul", {
			className: "sidebar-nav__rail",
			role: "list",
			children: g.map((e) => {
				let t = /* @__PURE__ */ c("span", {
					className: "sidebar-nav__rail-icon",
					"aria-hidden": "true",
					children: e.icon ?? /* @__PURE__ */ c("span", {
						className: "sidebar-nav__rail-initial",
						children: e.label.charAt(0)
					})
				});
				if (e.kind === "link") return e.empty ? /* @__PURE__ */ c("li", { children: /* @__PURE__ */ c(n, {
					label: w(e.label),
					side: "right",
					children: /* @__PURE__ */ c("span", {
						className: "sidebar-nav__rail-item sidebar-nav__rail-item--empty",
						"aria-disabled": "true",
						"aria-label": w(e.label),
						children: t
					})
				}) }, e.id) : /* @__PURE__ */ c("li", { children: /* @__PURE__ */ c(n, {
					label: e.label,
					side: "right",
					children: b({
						href: e.href,
						className: ["sidebar-nav__rail-item", e.active ? "sidebar-nav__rail-item--active" : ""].filter(Boolean).join(" "),
						"aria-current": e.active ? "page" : void 0,
						"aria-label": e.label,
						children: t
					})
				}) }, e.id);
				let r = e.items.some((e) => e.active);
				return /* @__PURE__ */ c("li", { children: /* @__PURE__ */ c(i, {
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
						...e.items.map((e) => e.empty ? {
							type: "label",
							label: w(e.label)
						} : {
							type: "link",
							label: e.label,
							href: e.href
						})
					],
					side: "right",
					align: "start",
					openOnHover: !0,
					renderLink: (e) => b({
						...e,
						href: e.href,
						className: e.className,
						children: e.children
					}),
					trigger: /* @__PURE__ */ c("button", {
						type: "button",
						className: ["sidebar-nav__rail-item", r ? "sidebar-nav__rail-item--active" : ""].filter(Boolean).join(" "),
						"aria-label": e.label,
						children: t
					})
				}) }, e.id);
			})
		})
	}) : /* @__PURE__ */ c("nav", {
		className: ["sidebar-nav", x].filter(Boolean).join(" "),
		"aria-label": S("label", f),
		children: /* @__PURE__ */ c(u.Root, {
			className: "sidebar-nav__accordion",
			multiple: !0,
			...T,
			children: g.map((e) => {
				if (e.kind === "link") {
					let t = ["sidebar-nav__top-link", e.active ? "sidebar-nav__top-link--active" : ""].filter(Boolean).join(" ");
					return e.empty ? /* @__PURE__ */ c("div", { children: /* @__PURE__ */ l("span", {
						className: `${t} sidebar-nav__top-link--empty`,
						"aria-disabled": "true",
						title: e.label,
						children: [
							e.icon && /* @__PURE__ */ c("span", {
								className: "sidebar-nav__item-icon",
								"aria-hidden": "true",
								children: e.icon
							}),
							/* @__PURE__ */ c("span", {
								className: "sidebar-nav__item-label",
								children: e.label
							}),
							/* @__PURE__ */ c("span", {
								className: "sidebar-nav__empty-mark",
								children: S("empty", p)
							})
						]
					}) }, e.id) : /* @__PURE__ */ c("div", { children: b({
						href: e.href,
						className: t,
						title: e.label,
						"aria-current": e.active ? "page" : void 0,
						children: /* @__PURE__ */ l(s, { children: [e.icon && /* @__PURE__ */ c("span", {
							className: "sidebar-nav__item-icon",
							"aria-hidden": "true",
							children: e.icon
						}), /* @__PURE__ */ c("span", {
							className: "sidebar-nav__item-label",
							children: e.label
						})] })
					}) }, e.id);
				}
				let n = `${C}-${e.id}`;
				return /* @__PURE__ */ l(u.Item, {
					value: e.id,
					className: "sidebar-nav__group",
					children: [/* @__PURE__ */ l(u.Header, {
						className: "sidebar-nav__group-header",
						children: [e.href ? b({
							href: e.href,
							className: "sidebar-nav__group-label",
							title: e.label,
							children: /* @__PURE__ */ l(s, { children: [e.icon && /* @__PURE__ */ c("span", {
								className: "sidebar-nav__item-icon",
								"aria-hidden": "true",
								children: e.icon
							}), /* @__PURE__ */ c("span", {
								className: "sidebar-nav__item-label",
								id: n,
								children: e.label
							})] })
						}) : /* @__PURE__ */ l("span", {
							className: "sidebar-nav__group-label",
							title: e.label,
							children: [e.icon && /* @__PURE__ */ c("span", {
								className: "sidebar-nav__item-icon",
								"aria-hidden": "true",
								children: e.icon
							}), /* @__PURE__ */ c("span", {
								className: "sidebar-nav__item-label",
								id: n,
								children: e.label
							})]
						}), /* @__PURE__ */ c(u.Trigger, {
							className: "sidebar-nav__group-chevron",
							"aria-labelledby": n,
							children: /* @__PURE__ */ c(t, {
								name: "chevron",
								className: "sidebar-nav__group-chevron-icon",
								size: "sm"
							})
						})]
					}), /* @__PURE__ */ c(u.Panel, {
						className: "sidebar-nav__group-content",
						"aria-labelledby": n,
						children: /* @__PURE__ */ c("div", {
							className: "sidebar-nav__group-content-inner",
							children: /* @__PURE__ */ c("ul", {
								className: "sidebar-nav__items",
								role: "list",
								children: e.items.map((e) => {
									let t = ["sidebar-nav__item", e.active ? "sidebar-nav__item--active" : ""].filter(Boolean).join(" ");
									return e.empty ? /* @__PURE__ */ c("li", { children: /* @__PURE__ */ l("span", {
										className: `${t} sidebar-nav__item--empty`,
										"aria-disabled": "true",
										children: [
											e.icon && /* @__PURE__ */ c("span", {
												className: "sidebar-nav__item-icon",
												"aria-hidden": "true",
												children: e.icon
											}),
											/* @__PURE__ */ c("span", {
												className: "sidebar-nav__item-label",
												children: e.label
											}),
											/* @__PURE__ */ c("span", {
												className: "sidebar-nav__empty-mark",
												children: S("empty", p)
											})
										]
									}) }, e.id) : /* @__PURE__ */ c("li", { children: b({
										href: e.href,
										className: t,
										"aria-current": e.active ? "page" : void 0,
										children: /* @__PURE__ */ l(s, { children: [e.icon && /* @__PURE__ */ c("span", {
											className: "sidebar-nav__item-icon",
											"aria-hidden": "true",
											children: e.icon
										}), /* @__PURE__ */ c("span", {
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
export { f as SidebarNav };

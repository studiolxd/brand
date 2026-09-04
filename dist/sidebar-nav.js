'use client';
import './sidebar-nav.css';
import { Icon as e } from "./icon.js";
import { Tooltip as t } from "./tooltip.js";
import { Menu as n } from "./menu.js";
import { n as r } from "./_shared/SidebarContext.js";
import { Fragment as i, jsx as a, jsxs as o } from "react/jsx-runtime";
import { Accordion as s } from "@base-ui/react/accordion";
//#region src/stories/molecules/SidebarNav/SidebarNav.tsx
function c({ children: e, ...t }) {
	return /* @__PURE__ */ a("a", {
		...t,
		children: e
	});
}
function l({ label: l = "Navegación principal", emptyLabel: u = "sin docs", rail: d, entries: f, defaultValue: p, value: m, onValueChange: h, renderLink: g = c }) {
	let _ = m === void 0 ? { defaultValue: p } : {
		value: m,
		onValueChange: (e) => h?.(e ?? [])
	}, v = r();
	return d ?? v.rail ? /* @__PURE__ */ a("nav", {
		className: "sidebar-nav sidebar-nav--rail",
		"aria-label": l,
		children: /* @__PURE__ */ a("ul", {
			className: "sidebar-nav__rail",
			role: "list",
			children: f.map((e) => {
				let r = /* @__PURE__ */ a("span", {
					className: "sidebar-nav__rail-icon",
					"aria-hidden": "true",
					children: e.icon ?? /* @__PURE__ */ a("span", {
						className: "sidebar-nav__rail-initial",
						children: e.label.charAt(0)
					})
				});
				if (e.kind === "link") return e.empty ? /* @__PURE__ */ a("li", { children: /* @__PURE__ */ a(t, {
					label: `${e.label} — ${u}`,
					side: "right",
					children: /* @__PURE__ */ a("span", {
						className: "sidebar-nav__rail-item sidebar-nav__rail-item--empty",
						"aria-disabled": "true",
						"aria-label": `${e.label} — ${u}`,
						children: r
					})
				}) }, e.id) : /* @__PURE__ */ a("li", { children: /* @__PURE__ */ a(t, {
					label: e.label,
					side: "right",
					children: g({
						href: e.href,
						className: ["sidebar-nav__rail-item", e.active ? "sidebar-nav__rail-item--active" : ""].filter(Boolean).join(" "),
						"aria-current": e.active ? "page" : void 0,
						"aria-label": e.label,
						children: r
					})
				}) }, e.id);
				let i = e.items.some((e) => e.active);
				return /* @__PURE__ */ a("li", { children: /* @__PURE__ */ a(n, {
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
							label: `${e.label} · ${u}`
						} : {
							type: "link",
							label: e.label,
							href: e.href
						})
					],
					side: "right",
					align: "start",
					openOnHover: !0,
					renderLink: (e) => g({
						...e,
						href: e.href,
						className: e.className,
						children: e.children
					}),
					trigger: /* @__PURE__ */ a("button", {
						type: "button",
						className: ["sidebar-nav__rail-item", i ? "sidebar-nav__rail-item--active" : ""].filter(Boolean).join(" "),
						"aria-label": e.label,
						children: r
					})
				}) }, e.id);
			})
		})
	}) : /* @__PURE__ */ a("nav", {
		className: "sidebar-nav",
		"aria-label": l,
		children: /* @__PURE__ */ a(s.Root, {
			className: "sidebar-nav__accordion",
			multiple: !0,
			..._,
			children: f.map((t) => {
				if (t.kind === "link") {
					let e = ["sidebar-nav__top-link", t.active ? "sidebar-nav__top-link--active" : ""].filter(Boolean).join(" ");
					return t.empty ? /* @__PURE__ */ a("div", { children: /* @__PURE__ */ o("span", {
						className: `${e} sidebar-nav__top-link--empty`,
						"aria-disabled": "true",
						title: t.label,
						children: [
							t.icon && /* @__PURE__ */ a("span", {
								className: "sidebar-nav__item-icon",
								"aria-hidden": "true",
								children: t.icon
							}),
							/* @__PURE__ */ a("span", {
								className: "sidebar-nav__item-label",
								children: t.label
							}),
							/* @__PURE__ */ a("span", {
								className: "sidebar-nav__empty-mark",
								children: u
							})
						]
					}) }, t.id) : /* @__PURE__ */ a("div", { children: g({
						href: t.href,
						className: e,
						title: t.label,
						"aria-current": t.active ? "page" : void 0,
						children: /* @__PURE__ */ o(i, { children: [t.icon && /* @__PURE__ */ a("span", {
							className: "sidebar-nav__item-icon",
							"aria-hidden": "true",
							children: t.icon
						}), /* @__PURE__ */ a("span", {
							className: "sidebar-nav__item-label",
							children: t.label
						})] })
					}) }, t.id);
				}
				return /* @__PURE__ */ o(s.Item, {
					value: t.id,
					className: "sidebar-nav__group",
					children: [/* @__PURE__ */ o(s.Header, {
						className: "sidebar-nav__group-header",
						children: [t.href ? g({
							href: t.href,
							className: "sidebar-nav__group-label",
							title: t.label,
							children: /* @__PURE__ */ o(i, { children: [t.icon && /* @__PURE__ */ a("span", {
								className: "sidebar-nav__item-icon",
								"aria-hidden": "true",
								children: t.icon
							}), /* @__PURE__ */ a("span", {
								className: "sidebar-nav__item-label",
								children: t.label
							})] })
						}) : /* @__PURE__ */ o("span", {
							className: "sidebar-nav__group-label",
							title: t.label,
							children: [t.icon && /* @__PURE__ */ a("span", {
								className: "sidebar-nav__item-icon",
								"aria-hidden": "true",
								children: t.icon
							}), /* @__PURE__ */ a("span", {
								className: "sidebar-nav__item-label",
								children: t.label
							})]
						}), /* @__PURE__ */ a(s.Trigger, {
							className: "sidebar-nav__group-chevron",
							children: /* @__PURE__ */ a(e, {
								name: "chevron",
								className: "sidebar-nav__group-chevron-icon",
								size: "sm"
							})
						})]
					}), /* @__PURE__ */ a(s.Panel, {
						className: "sidebar-nav__group-content",
						children: /* @__PURE__ */ a("div", {
							className: "sidebar-nav__group-content-inner",
							children: /* @__PURE__ */ a("ul", {
								className: "sidebar-nav__items",
								role: "list",
								children: t.items.map((e) => {
									let t = ["sidebar-nav__item", e.active ? "sidebar-nav__item--active" : ""].filter(Boolean).join(" ");
									return e.empty ? /* @__PURE__ */ a("li", { children: /* @__PURE__ */ o("span", {
										className: `${t} sidebar-nav__item--empty`,
										"aria-disabled": "true",
										children: [
											e.icon && /* @__PURE__ */ a("span", {
												className: "sidebar-nav__item-icon",
												"aria-hidden": "true",
												children: e.icon
											}),
											/* @__PURE__ */ a("span", {
												className: "sidebar-nav__item-label",
												children: e.label
											}),
											/* @__PURE__ */ a("span", {
												className: "sidebar-nav__empty-mark",
												children: u
											})
										]
									}) }, e.id) : /* @__PURE__ */ a("li", { children: g({
										href: e.href,
										className: t,
										"aria-current": e.active ? "page" : void 0,
										children: /* @__PURE__ */ o(i, { children: [e.icon && /* @__PURE__ */ a("span", {
											className: "sidebar-nav__item-icon",
											"aria-hidden": "true",
											children: e.icon
										}), /* @__PURE__ */ a("span", {
											className: "sidebar-nav__item-label",
											children: e.label
										})] })
									}) }, e.id);
								})
							})
						})
					})]
				}, t.id);
			})
		})
	});
}
//#endregion
export { l as SidebarNav };

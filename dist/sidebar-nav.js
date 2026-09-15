'use client';
import './sidebar-nav.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { Tooltip as n } from "./tooltip.js";
import { Menu as r } from "./menu.js";
import { n as i } from "./_shared/sidebarcontext.js";
import { Fragment as a, jsx as o, jsxs as s } from "react/jsx-runtime";
import { Accordion as c } from "@base-ui/react/accordion";
//#region src/stories/molecules/SidebarNav/SidebarNav.tsx
function l({ children: e, ...t }) {
	return /* @__PURE__ */ o("a", {
		...t,
		children: e
	});
}
function u({ label: u, emptyLabel: d, rail: f, entries: p, defaultValue: m, value: h, onValueChange: g, renderLink: _ = l }) {
	let v = e("sidebarNav"), y = h === void 0 ? { defaultValue: m } : {
		value: h,
		onValueChange: (e) => g?.(e ?? [])
	}, b = i();
	return f ?? b.rail ? /* @__PURE__ */ o("nav", {
		className: "sidebar-nav sidebar-nav--rail",
		"aria-label": v("label", u),
		children: /* @__PURE__ */ o("ul", {
			className: "sidebar-nav__rail",
			role: "list",
			children: p.map((e) => {
				let t = /* @__PURE__ */ o("span", {
					className: "sidebar-nav__rail-icon",
					"aria-hidden": "true",
					children: e.icon ?? /* @__PURE__ */ o("span", {
						className: "sidebar-nav__rail-initial",
						children: e.label.charAt(0)
					})
				});
				if (e.kind === "link") return e.empty ? /* @__PURE__ */ o("li", { children: /* @__PURE__ */ o(n, {
					label: `${e.label} — ${v("empty", d)}`,
					side: "right",
					children: /* @__PURE__ */ o("span", {
						className: "sidebar-nav__rail-item sidebar-nav__rail-item--empty",
						"aria-disabled": "true",
						"aria-label": `${e.label} — ${v("empty", d)}`,
						children: t
					})
				}) }, e.id) : /* @__PURE__ */ o("li", { children: /* @__PURE__ */ o(n, {
					label: e.label,
					side: "right",
					children: _({
						href: e.href,
						className: ["sidebar-nav__rail-item", e.active ? "sidebar-nav__rail-item--active" : ""].filter(Boolean).join(" "),
						"aria-current": e.active ? "page" : void 0,
						"aria-label": e.label,
						children: t
					})
				}) }, e.id);
				let i = e.items.some((e) => e.active);
				return /* @__PURE__ */ o("li", { children: /* @__PURE__ */ o(r, {
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
							label: `${e.label} · ${v("empty", d)}`
						} : {
							type: "link",
							label: e.label,
							href: e.href
						})
					],
					side: "right",
					align: "start",
					openOnHover: !0,
					renderLink: (e) => _({
						...e,
						href: e.href,
						className: e.className,
						children: e.children
					}),
					trigger: /* @__PURE__ */ o("button", {
						type: "button",
						className: ["sidebar-nav__rail-item", i ? "sidebar-nav__rail-item--active" : ""].filter(Boolean).join(" "),
						"aria-label": e.label,
						children: t
					})
				}) }, e.id);
			})
		})
	}) : /* @__PURE__ */ o("nav", {
		className: "sidebar-nav",
		"aria-label": v("label", u),
		children: /* @__PURE__ */ o(c.Root, {
			className: "sidebar-nav__accordion",
			multiple: !0,
			...y,
			children: p.map((e) => {
				if (e.kind === "link") {
					let t = ["sidebar-nav__top-link", e.active ? "sidebar-nav__top-link--active" : ""].filter(Boolean).join(" ");
					return e.empty ? /* @__PURE__ */ o("div", { children: /* @__PURE__ */ s("span", {
						className: `${t} sidebar-nav__top-link--empty`,
						"aria-disabled": "true",
						title: e.label,
						children: [
							e.icon && /* @__PURE__ */ o("span", {
								className: "sidebar-nav__item-icon",
								"aria-hidden": "true",
								children: e.icon
							}),
							/* @__PURE__ */ o("span", {
								className: "sidebar-nav__item-label",
								children: e.label
							}),
							/* @__PURE__ */ o("span", {
								className: "sidebar-nav__empty-mark",
								children: v("empty", d)
							})
						]
					}) }, e.id) : /* @__PURE__ */ o("div", { children: _({
						href: e.href,
						className: t,
						title: e.label,
						"aria-current": e.active ? "page" : void 0,
						children: /* @__PURE__ */ s(a, { children: [e.icon && /* @__PURE__ */ o("span", {
							className: "sidebar-nav__item-icon",
							"aria-hidden": "true",
							children: e.icon
						}), /* @__PURE__ */ o("span", {
							className: "sidebar-nav__item-label",
							children: e.label
						})] })
					}) }, e.id);
				}
				return /* @__PURE__ */ s(c.Item, {
					value: e.id,
					className: "sidebar-nav__group",
					children: [/* @__PURE__ */ s(c.Header, {
						className: "sidebar-nav__group-header",
						children: [e.href ? _({
							href: e.href,
							className: "sidebar-nav__group-label",
							title: e.label,
							children: /* @__PURE__ */ s(a, { children: [e.icon && /* @__PURE__ */ o("span", {
								className: "sidebar-nav__item-icon",
								"aria-hidden": "true",
								children: e.icon
							}), /* @__PURE__ */ o("span", {
								className: "sidebar-nav__item-label",
								children: e.label
							})] })
						}) : /* @__PURE__ */ s("span", {
							className: "sidebar-nav__group-label",
							title: e.label,
							children: [e.icon && /* @__PURE__ */ o("span", {
								className: "sidebar-nav__item-icon",
								"aria-hidden": "true",
								children: e.icon
							}), /* @__PURE__ */ o("span", {
								className: "sidebar-nav__item-label",
								children: e.label
							})]
						}), /* @__PURE__ */ o(c.Trigger, {
							className: "sidebar-nav__group-chevron",
							children: /* @__PURE__ */ o(t, {
								name: "chevron",
								className: "sidebar-nav__group-chevron-icon",
								size: "sm"
							})
						})]
					}), /* @__PURE__ */ o(c.Panel, {
						className: "sidebar-nav__group-content",
						children: /* @__PURE__ */ o("div", {
							className: "sidebar-nav__group-content-inner",
							children: /* @__PURE__ */ o("ul", {
								className: "sidebar-nav__items",
								role: "list",
								children: e.items.map((e) => {
									let t = ["sidebar-nav__item", e.active ? "sidebar-nav__item--active" : ""].filter(Boolean).join(" ");
									return e.empty ? /* @__PURE__ */ o("li", { children: /* @__PURE__ */ s("span", {
										className: `${t} sidebar-nav__item--empty`,
										"aria-disabled": "true",
										children: [
											e.icon && /* @__PURE__ */ o("span", {
												className: "sidebar-nav__item-icon",
												"aria-hidden": "true",
												children: e.icon
											}),
											/* @__PURE__ */ o("span", {
												className: "sidebar-nav__item-label",
												children: e.label
											}),
											/* @__PURE__ */ o("span", {
												className: "sidebar-nav__empty-mark",
												children: v("empty", d)
											})
										]
									}) }, e.id) : /* @__PURE__ */ o("li", { children: _({
										href: e.href,
										className: t,
										"aria-current": e.active ? "page" : void 0,
										children: /* @__PURE__ */ s(a, { children: [e.icon && /* @__PURE__ */ o("span", {
											className: "sidebar-nav__item-icon",
											"aria-hidden": "true",
											children: e.icon
										}), /* @__PURE__ */ o("span", {
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
export { u as SidebarNav };

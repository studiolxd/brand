'use client';
import './org-switcher.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { n } from "./_shared/portal-container.js";
import { Avatar as r } from "./avatar.js";
import { t as i } from "./_shared/default-render-link.js";
import { t as a } from "./_shared/dropdownitems.js";
import { n as o } from "./_shared/sidebarcontext.js";
import { Fragment as s, jsx as c, jsxs as l } from "react/jsx-runtime";
import { Menu as u } from "@base-ui/react/menu";
//#region src/stories/messages/es/orgSwitcher.ts
var d = { trigger: (e) => `Organización: ${e}` };
//#endregion
//#region src/stories/molecules/OrgSwitcher/OrgSwitcher.tsx
function f({ label: f, block: p = !1, compact: m, current: h, organizations: g, onOrgChange: _, defaultOpen: v, items: y, renderLink: b = i, className: x }) {
	let S = e("orgSwitcher", d), C = n(void 0), w = g.filter((e) => e.id !== h.id), T = o(), E = m ?? T.rail;
	return /* @__PURE__ */ l(u.Root, {
		defaultOpen: v,
		children: [/* @__PURE__ */ l(u.Trigger, {
			className: [
				"org-switcher__trigger",
				p && !E ? "org-switcher__trigger--block" : "",
				E ? "org-switcher__trigger--compact" : "",
				x
			].filter(Boolean).join(" "),
			"aria-label": f ?? S("trigger")(h.name),
			children: [
				/* @__PURE__ */ c(r, {
					src: h.logoUrl,
					name: h.name,
					alt: "",
					size: "sm",
					shape: "square"
				}),
				!E && /* @__PURE__ */ c("span", {
					className: "org-switcher__name",
					children: h.name
				}),
				!E && /* @__PURE__ */ c(t, {
					name: "chevron",
					size: "sm",
					className: "org-switcher__chevron"
				})
			]
		}), /* @__PURE__ */ c(u.Portal, {
			container: C,
			children: /* @__PURE__ */ c(u.Positioner, {
				className: "org-switcher__positioner",
				sideOffset: 4,
				align: "start",
				children: /* @__PURE__ */ l(u.Popup, {
					className: "org-switcher__content",
					children: [
						/* @__PURE__ */ l(u.CheckboxItem, {
							className: "org-switcher__item org-switcher__item--active",
							checked: !0,
							onCheckedChange: () => void 0,
							children: [/* @__PURE__ */ c(r, {
								src: h.logoUrl,
								name: h.name,
								alt: "",
								size: "sm",
								shape: "square"
							}), /* @__PURE__ */ c("span", { children: h.name })]
						}),
						w.map((e) => /* @__PURE__ */ l(u.Item, {
							className: "org-switcher__item",
							onClick: () => _(e.id),
							children: [/* @__PURE__ */ c(r, {
								src: e.logoUrl,
								name: e.name,
								alt: "",
								size: "sm",
								shape: "square"
							}), /* @__PURE__ */ c("span", { children: e.name })]
						}, e.id)),
						y && y.length > 0 && /* @__PURE__ */ l(s, { children: [/* @__PURE__ */ c(u.Separator, { className: "org-switcher__separator" }), a({
							items: y,
							itemClass: (e) => ["org-switcher__item", e ? "org-switcher__item--destructive" : ""].filter(Boolean).join(" "),
							separatorClass: "org-switcher__separator",
							renderLink: b
						})] })
					]
				})
			})
		})]
	});
}
//#endregion
export { f as OrgSwitcher };

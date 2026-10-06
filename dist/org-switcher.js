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
//#region src/stories/molecules/OrgSwitcher/OrgSwitcher.tsx
function d({ label: d, block: f = !1, compact: p, current: m, organizations: h, onOrgChange: g, defaultOpen: _, items: v, renderLink: y = i, className: b }) {
	let x = e("orgSwitcher"), S = n(void 0), C = h.filter((e) => e.id !== m.id), w = o(), T = p ?? w.rail;
	return /* @__PURE__ */ l(u.Root, {
		defaultOpen: _,
		children: [/* @__PURE__ */ l(u.Trigger, {
			className: [
				"org-switcher__trigger",
				f && !T ? "org-switcher__trigger--block" : "",
				T ? "org-switcher__trigger--compact" : "",
				b
			].filter(Boolean).join(" "),
			"aria-label": d ?? x("trigger")(m.name),
			children: [
				/* @__PURE__ */ c(r, {
					src: m.logoUrl,
					name: m.name,
					alt: "",
					size: "sm",
					shape: "square"
				}),
				!T && /* @__PURE__ */ c("span", {
					className: "org-switcher__name",
					children: m.name
				}),
				!T && /* @__PURE__ */ c(t, {
					name: "chevron",
					size: "sm",
					className: "org-switcher__chevron"
				})
			]
		}), /* @__PURE__ */ c(u.Portal, {
			container: S,
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
								src: m.logoUrl,
								name: m.name,
								alt: "",
								size: "sm",
								shape: "square"
							}), /* @__PURE__ */ c("span", { children: m.name })]
						}),
						C.map((e) => /* @__PURE__ */ l(u.Item, {
							className: "org-switcher__item",
							onClick: () => g(e.id),
							children: [/* @__PURE__ */ c(r, {
								src: e.logoUrl,
								name: e.name,
								alt: "",
								size: "sm",
								shape: "square"
							}), /* @__PURE__ */ c("span", { children: e.name })]
						}, e.id)),
						v && v.length > 0 && /* @__PURE__ */ l(s, { children: [/* @__PURE__ */ c(u.Separator, { className: "org-switcher__separator" }), a({
							items: v,
							itemClass: (e) => ["org-switcher__item", e ? "org-switcher__item--destructive" : ""].filter(Boolean).join(" "),
							separatorClass: "org-switcher__separator",
							renderLink: y
						})] })
					]
				})
			})
		})]
	});
}
//#endregion
export { d as OrgSwitcher };

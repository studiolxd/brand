'use client';
import './org-switcher.css';
import { Icon as e } from "./icon.js";
import { Avatar as t } from "./avatar.js";
import { n, t as r } from "./_shared/dropdownItems.js";
import { n as i } from "./_shared/SidebarContext.js";
import { Fragment as a, jsx as o, jsxs as s } from "react/jsx-runtime";
import { Menu as c } from "@base-ui-components/react/menu";
//#region src/stories/molecules/OrgSwitcher/OrgSwitcher.tsx
function l({ label: l, block: u = !1, compact: d, current: f, organizations: p, onOrgChange: m, defaultOpen: h, items: g, renderLink: _ = r }) {
	let v = p.filter((e) => e.id !== f.id), y = i(), b = d ?? y.rail;
	return /* @__PURE__ */ s(c.Root, {
		defaultOpen: h,
		children: [/* @__PURE__ */ s(c.Trigger, {
			className: [
				"org-switcher__trigger",
				u && !b ? "org-switcher__trigger--block" : "",
				b ? "org-switcher__trigger--compact" : ""
			].filter(Boolean).join(" "),
			"aria-label": l ?? `Organización: ${f.name}`,
			children: [
				/* @__PURE__ */ o(t, {
					src: f.logoUrl,
					name: f.name,
					alt: "",
					size: "sm",
					shape: "square"
				}),
				!b && /* @__PURE__ */ o("span", {
					className: "org-switcher__name",
					children: f.name
				}),
				!b && /* @__PURE__ */ o(e, {
					name: "chevron",
					size: "sm",
					className: "org-switcher__chevron"
				})
			]
		}), /* @__PURE__ */ o(c.Portal, { children: /* @__PURE__ */ o(c.Positioner, {
			className: "org-switcher__positioner",
			sideOffset: 4,
			align: "start",
			children: /* @__PURE__ */ s(c.Popup, {
				className: "org-switcher__content",
				children: [
					/* @__PURE__ */ s(c.CheckboxItem, {
						className: "org-switcher__item org-switcher__item--active",
						checked: !0,
						onCheckedChange: () => void 0,
						children: [/* @__PURE__ */ o(t, {
							src: f.logoUrl,
							name: f.name,
							alt: "",
							size: "sm",
							shape: "square"
						}), /* @__PURE__ */ o("span", { children: f.name })]
					}),
					v.map((e) => /* @__PURE__ */ s(c.Item, {
						className: "org-switcher__item",
						onClick: () => m(e.id),
						children: [/* @__PURE__ */ o(t, {
							src: e.logoUrl,
							name: e.name,
							alt: "",
							size: "sm",
							shape: "square"
						}), /* @__PURE__ */ o("span", { children: e.name })]
					}, e.id)),
					g && g.length > 0 && /* @__PURE__ */ s(a, { children: [/* @__PURE__ */ o(c.Separator, { className: "org-switcher__separator" }), n({
						items: g,
						itemClass: (e) => ["org-switcher__item", e ? "org-switcher__item--destructive" : ""].filter(Boolean).join(" "),
						separatorClass: "org-switcher__separator",
						renderLink: _
					})] })
				]
			})
		}) })]
	});
}
//#endregion
export { l as OrgSwitcher };

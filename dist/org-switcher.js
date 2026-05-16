'use client';
import './org-switcher.css';
import { Chevron as e } from "./chevron.js";
import { Avatar as t } from "./avatar.js";
import { Fragment as n, jsx as r, jsxs as i } from "react/jsx-runtime";
import * as a from "@radix-ui/react-dropdown-menu";
//#region src/stories/molecules/OrgSwitcher/OrgSwitcher.tsx
function o({ current: o, organizations: s, onOrgChange: c, defaultOpen: l }) {
	let u = s.filter((e) => e.id !== o.id);
	return /* @__PURE__ */ i(a.Root, {
		defaultOpen: l,
		children: [/* @__PURE__ */ r(a.Trigger, {
			asChild: !0,
			children: /* @__PURE__ */ i("button", {
				type: "button",
				className: "org-switcher__trigger",
				children: [
					/* @__PURE__ */ r(t, {
						src: o.logoUrl,
						name: o.name,
						alt: "",
						size: "sm",
						shape: "square",
						className: "org-switcher__logo"
					}),
					/* @__PURE__ */ r("span", {
						className: "org-switcher__name",
						children: o.name
					}),
					/* @__PURE__ */ r(e, {
						size: "sm",
						className: "org-switcher__chevron"
					})
				]
			})
		}), /* @__PURE__ */ r(a.Portal, { children: /* @__PURE__ */ i(a.Content, {
			className: "org-switcher__content",
			sideOffset: 4,
			align: "start",
			children: [/* @__PURE__ */ i(a.CheckboxItem, {
				className: "org-switcher__item org-switcher__item--active",
				checked: !0,
				onCheckedChange: () => void 0,
				children: [/* @__PURE__ */ r(t, {
					src: o.logoUrl,
					name: o.name,
					alt: "",
					size: "sm",
					shape: "square"
				}), /* @__PURE__ */ r("span", { children: o.name })]
			}), u.length > 0 && /* @__PURE__ */ i(n, { children: [/* @__PURE__ */ r(a.Separator, { className: "org-switcher__separator" }), u.map((e) => /* @__PURE__ */ i(a.Item, {
				className: "org-switcher__item",
				onSelect: () => c(e.id),
				children: [/* @__PURE__ */ r(t, {
					src: e.logoUrl,
					name: e.name,
					alt: "",
					size: "sm",
					shape: "square"
				}), /* @__PURE__ */ r("span", { children: e.name })]
			}, e.id))] })]
		}) })]
	});
}
//#endregion
export { o as OrgSwitcher };

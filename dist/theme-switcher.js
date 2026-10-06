'use client';
import './theme-switcher.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { Button as n } from "./button.js";
import { Menu as r } from "./menu.js";
import { DropdownField as i } from "./dropdown-field.js";
import { useId as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/molecules/ThemeSwitcher/ThemeSwitcher.tsx
var c = [
	{
		value: "light",
		icon: "sun"
	},
	{
		value: "dark",
		icon: "moon"
	},
	{
		value: "system",
		icon: "device-desktop"
	}
];
function l({ value: l, onChange: u, labels: d, id: f, variant: p = "compact", layout: m = "inline", size: h = "md", className: g }) {
	let _ = a(), v = f ?? _, y = e("themeSwitcher"), b = {
		group: () => y("group", d?.group),
		light: () => y("light", d?.light),
		dark: () => y("dark", d?.dark),
		system: () => y("system", d?.system)
	}, x = c.find((e) => e.value === l) ?? c[2];
	if (p === "list") return /* @__PURE__ */ o("div", {
		className: [
			"theme-switcher",
			"theme-switcher--list",
			g
		].filter(Boolean).join(" "),
		role: "group",
		"aria-label": b.group(),
		children: /* @__PURE__ */ o("ul", {
			className: "theme-switcher__list",
			children: c.map(({ value: e, icon: n }) => {
				let r = e === l;
				return /* @__PURE__ */ o("li", { children: /* @__PURE__ */ s("button", {
					type: "button",
					className: ["theme-switcher__option", r ? "theme-switcher__option--current" : ""].filter(Boolean).join(" "),
					"aria-pressed": r,
					onClick: r ? void 0 : () => u?.(e),
					children: [/* @__PURE__ */ o(t, {
						name: n,
						size: "sm"
					}), /* @__PURE__ */ o("span", { children: b[e]() })]
				}) }, e);
			})
		})
	});
	let S = c.map(({ value: e, icon: n }) => ({
		type: "radio",
		value: e,
		label: /* @__PURE__ */ s("span", {
			className: "theme-switcher__item",
			children: [/* @__PURE__ */ o(t, {
				name: n,
				size: "sm"
			}), b[e]()]
		})
	}));
	if (p === "icon") return /* @__PURE__ */ o(r, {
		className: g,
		align: "end",
		size: h,
		value: l,
		onValueChange: (e) => u?.(e),
		items: S,
		trigger: /* @__PURE__ */ o(n, {
			variant: "ghost",
			size: h,
			iconOnly: !0,
			"aria-label": y("trigger", d?.trigger)(b.group(), b[x.value]()),
			children: /* @__PURE__ */ o(t, {
				name: x.icon,
				size: "md"
			})
		})
	});
	let C = [
		"theme-switcher",
		"theme-switcher--compact",
		g
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ s(i, {
		id: v,
		label: b.group(),
		inline: m === "inline",
		size: h,
		className: C,
		value: l,
		onValueChange: (e) => u?.(e),
		items: S,
		children: [/* @__PURE__ */ o(t, {
			name: x.icon,
			size: "sm"
		}), b[x.value]()]
	});
}
//#endregion
export { l as ThemeSwitcher };

'use client';
import './theme-switcher.css';
import { Icon as e } from "./icon.js";
import { Button as t } from "./button.js";
import { Menu as n } from "./menu.js";
import { DropdownField as r } from "./dropdown-field.js";
import { useId as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/molecules/ThemeSwitcher/ThemeSwitcher.tsx
var s = [
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
function c({ value: c, onChange: l, labels: u, id: d, variant: f = "compact", layout: p = "inline", size: m = "md", className: h }) {
	let g = i(), _ = d ?? g, v = {
		group: "Tema",
		light: "Claro",
		dark: "Oscuro",
		system: "Sistema",
		...u
	}, y = s.find((e) => e.value === c) ?? s[2];
	if (f === "list") return /* @__PURE__ */ a("div", {
		className: [
			"theme-switcher",
			"theme-switcher--list",
			h
		].filter(Boolean).join(" "),
		role: "group",
		"aria-label": v.group,
		children: /* @__PURE__ */ a("ul", {
			className: "theme-switcher__list",
			children: s.map(({ value: t, icon: n }) => {
				let r = t === c;
				return /* @__PURE__ */ a("li", { children: /* @__PURE__ */ o("button", {
					type: "button",
					className: ["theme-switcher__option", r ? "theme-switcher__option--current" : ""].filter(Boolean).join(" "),
					"aria-pressed": r,
					onClick: r ? void 0 : () => l?.(t),
					children: [/* @__PURE__ */ a(e, {
						name: n,
						size: "sm"
					}), /* @__PURE__ */ a("span", { children: v[t] })]
				}) }, t);
			})
		})
	});
	let b = s.map(({ value: t, icon: n }) => ({
		type: "radio",
		value: t,
		label: /* @__PURE__ */ o("span", {
			className: "theme-switcher__item",
			children: [/* @__PURE__ */ a(e, {
				name: n,
				size: "sm"
			}), v[t]]
		})
	}));
	if (f === "icon") return /* @__PURE__ */ a(n, {
		className: h,
		align: "end",
		size: m,
		value: c,
		onValueChange: (e) => l?.(e),
		items: b,
		trigger: /* @__PURE__ */ a(t, {
			variant: "ghost",
			size: m,
			iconOnly: !0,
			"aria-label": `${v.group}: ${v[y.value]}`,
			children: /* @__PURE__ */ a(e, {
				name: y.icon,
				size: "md"
			})
		})
	});
	let x = [
		"theme-switcher",
		"theme-switcher--compact",
		h
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ o(r, {
		id: _,
		label: v.group,
		inline: p === "inline",
		size: m,
		className: x,
		value: c,
		onValueChange: (e) => l?.(e),
		items: b,
		children: [/* @__PURE__ */ a(e, {
			name: y.icon,
			size: "sm"
		}), v[y.value]]
	});
}
//#endregion
export { c as ThemeSwitcher };

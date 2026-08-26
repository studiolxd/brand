'use client';
import './theme-switcher.css';
import { Icon as e } from "./icon.js";
import { Button as t } from "./button.js";
import { Menu as n } from "./menu.js";
import { DropdownField as r } from "./dropdown-field.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/stories/molecules/ThemeSwitcher/ThemeSwitcher.tsx
var o = [
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
function s({ value: s, onChange: c, labels: l, id: u = "theme-switcher", variant: d = "compact", className: f }) {
	let p = {
		group: "Tema",
		light: "Claro",
		dark: "Oscuro",
		system: "Sistema",
		...l
	}, m = o.find((e) => e.value === s) ?? o[2];
	if (d === "list") return /* @__PURE__ */ i("div", {
		className: [
			"theme-switcher",
			"theme-switcher--list",
			f
		].filter(Boolean).join(" "),
		role: "group",
		"aria-label": p.group,
		children: /* @__PURE__ */ i("ul", {
			className: "theme-switcher__list",
			children: o.map(({ value: t, icon: n }) => {
				let r = t === s, o = ["theme-switcher__option", r ? "theme-switcher__option--current" : ""].filter(Boolean).join(" ");
				return /* @__PURE__ */ i("li", { children: r ? /* @__PURE__ */ a("span", {
					className: o,
					"aria-current": "true",
					children: [/* @__PURE__ */ i(e, {
						name: n,
						size: "sm"
					}), /* @__PURE__ */ i("span", { children: p[t] })]
				}) : /* @__PURE__ */ a("button", {
					type: "button",
					className: o,
					onClick: () => c?.(t),
					children: [/* @__PURE__ */ i(e, {
						name: n,
						size: "sm"
					}), /* @__PURE__ */ i("span", { children: p[t] })]
				}) }, t);
			})
		})
	});
	let h = o.map(({ value: t, icon: n }) => ({
		type: "radio",
		value: t,
		label: /* @__PURE__ */ a("span", {
			className: "theme-switcher__item",
			children: [/* @__PURE__ */ i(e, {
				name: n,
				size: "sm"
			}), p[t]]
		})
	}));
	if (d === "icon") return /* @__PURE__ */ i(n, {
		className: f,
		align: "end",
		value: s,
		onValueChange: (e) => c?.(e),
		items: h,
		trigger: /* @__PURE__ */ i(t, {
			variant: "ghost",
			size: "md",
			iconOnly: !0,
			"aria-label": `${p.group}: ${p[m.value]}`,
			children: /* @__PURE__ */ i(e, {
				name: m.icon,
				size: "md"
			})
		})
	});
	let g = [
		"theme-switcher",
		"theme-switcher--compact",
		f
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ a(r, {
		id: u,
		label: p.group,
		inline: !0,
		className: g,
		value: s,
		onValueChange: (e) => c?.(e),
		items: h,
		children: [/* @__PURE__ */ i(e, {
			name: m.icon,
			size: "sm"
		}), p[m.value]]
	});
}
//#endregion
export { s as ThemeSwitcher };

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
function s({ value: s, onChange: c, labels: l, id: u = "theme-switcher", variant: d = "compact", size: f = "md", className: p }) {
	let m = {
		group: "Tema",
		light: "Claro",
		dark: "Oscuro",
		system: "Sistema",
		...l
	}, h = o.find((e) => e.value === s) ?? o[2];
	if (d === "list") return /* @__PURE__ */ i("div", {
		className: [
			"theme-switcher",
			"theme-switcher--list",
			p
		].filter(Boolean).join(" "),
		role: "group",
		"aria-label": m.group,
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
					}), /* @__PURE__ */ i("span", { children: m[t] })]
				}) : /* @__PURE__ */ a("button", {
					type: "button",
					className: o,
					onClick: () => c?.(t),
					children: [/* @__PURE__ */ i(e, {
						name: n,
						size: "sm"
					}), /* @__PURE__ */ i("span", { children: m[t] })]
				}) }, t);
			})
		})
	});
	let g = o.map(({ value: t, icon: n }) => ({
		type: "radio",
		value: t,
		label: /* @__PURE__ */ a("span", {
			className: "theme-switcher__item",
			children: [/* @__PURE__ */ i(e, {
				name: n,
				size: "sm"
			}), m[t]]
		})
	}));
	if (d === "icon") return /* @__PURE__ */ i(n, {
		className: p,
		align: "end",
		value: s,
		onValueChange: (e) => c?.(e),
		items: g,
		trigger: /* @__PURE__ */ i(t, {
			variant: "ghost",
			size: f,
			iconOnly: !0,
			"aria-label": `${m.group}: ${m[h.value]}`,
			children: /* @__PURE__ */ i(e, {
				name: h.icon,
				size: "md"
			})
		})
	});
	let _ = [
		"theme-switcher",
		"theme-switcher--compact",
		p
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ a(r, {
		id: u,
		label: m.group,
		inline: !0,
		size: f,
		className: _,
		value: s,
		onValueChange: (e) => c?.(e),
		items: g,
		children: [/* @__PURE__ */ i(e, {
			name: h.icon,
			size: "sm"
		}), m[h.value]]
	});
}
//#endregion
export { s as ThemeSwitcher };

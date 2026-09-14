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
function s({ value: s, onChange: c, labels: l, id: u = "theme-switcher", variant: d = "compact", layout: f = "inline", size: p = "md", className: m }) {
	let h = {
		group: "Tema",
		light: "Claro",
		dark: "Oscuro",
		system: "Sistema",
		...l
	}, g = o.find((e) => e.value === s) ?? o[2];
	if (d === "list") return /* @__PURE__ */ i("div", {
		className: [
			"theme-switcher",
			"theme-switcher--list",
			m
		].filter(Boolean).join(" "),
		role: "group",
		"aria-label": h.group,
		children: /* @__PURE__ */ i("ul", {
			className: "theme-switcher__list",
			children: o.map(({ value: t, icon: n }) => {
				let r = t === s;
				return /* @__PURE__ */ i("li", { children: /* @__PURE__ */ a("button", {
					type: "button",
					className: ["theme-switcher__option", r ? "theme-switcher__option--current" : ""].filter(Boolean).join(" "),
					"aria-pressed": r,
					onClick: r ? void 0 : () => c?.(t),
					children: [/* @__PURE__ */ i(e, {
						name: n,
						size: "sm"
					}), /* @__PURE__ */ i("span", { children: h[t] })]
				}) }, t);
			})
		})
	});
	let _ = o.map(({ value: t, icon: n }) => ({
		type: "radio",
		value: t,
		label: /* @__PURE__ */ a("span", {
			className: "theme-switcher__item",
			children: [/* @__PURE__ */ i(e, {
				name: n,
				size: "sm"
			}), h[t]]
		})
	}));
	if (d === "icon") return /* @__PURE__ */ i(n, {
		className: m,
		align: "end",
		size: p,
		value: s,
		onValueChange: (e) => c?.(e),
		items: _,
		trigger: /* @__PURE__ */ i(t, {
			variant: "ghost",
			size: p,
			iconOnly: !0,
			"aria-label": `${h.group}: ${h[g.value]}`,
			children: /* @__PURE__ */ i(e, {
				name: g.icon,
				size: "md"
			})
		})
	});
	let v = [
		"theme-switcher",
		"theme-switcher--compact",
		m
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ a(r, {
		id: u,
		label: h.group,
		inline: f === "inline",
		size: p,
		className: v,
		value: s,
		onValueChange: (e) => c?.(e),
		items: _,
		children: [/* @__PURE__ */ i(e, {
			name: g.icon,
			size: "sm"
		}), h[g.value]]
	});
}
//#endregion
export { s as ThemeSwitcher };

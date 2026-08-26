'use client';
import './theme-switcher.css';
import { Icon as e } from "./icon.js";
import { DropdownField as t } from "./dropdown-field.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/molecules/ThemeSwitcher/ThemeSwitcher.tsx
var i = [
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
function a({ value: a, onChange: o, labels: s, id: c = "theme-switcher", variant: l = "compact", className: u }) {
	let d = {
		group: "Tema",
		light: "Claro",
		dark: "Oscuro",
		system: "Sistema",
		...s
	}, f = i.find((e) => e.value === a) ?? i[2];
	if (l === "list") return /* @__PURE__ */ n("div", {
		className: [
			"theme-switcher",
			"theme-switcher--list",
			u
		].filter(Boolean).join(" "),
		role: "group",
		"aria-label": d.group,
		children: /* @__PURE__ */ n("ul", {
			className: "theme-switcher__list",
			children: i.map(({ value: t, icon: i }) => {
				let s = t === a, c = ["theme-switcher__option", s ? "theme-switcher__option--current" : ""].filter(Boolean).join(" ");
				return /* @__PURE__ */ n("li", { children: s ? /* @__PURE__ */ r("span", {
					className: c,
					"aria-current": "true",
					children: [/* @__PURE__ */ n(e, {
						name: i,
						size: "sm"
					}), /* @__PURE__ */ n("span", { children: d[t] })]
				}) : /* @__PURE__ */ r("button", {
					type: "button",
					className: c,
					onClick: () => o?.(t),
					children: [/* @__PURE__ */ n(e, {
						name: i,
						size: "sm"
					}), /* @__PURE__ */ n("span", { children: d[t] })]
				}) }, t);
			})
		})
	});
	let p = [
		"theme-switcher",
		"theme-switcher--compact",
		u
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ r(t, {
		id: c,
		label: d.group,
		inline: !0,
		className: p,
		value: a,
		onValueChange: (e) => o?.(e),
		items: i.map(({ value: t, icon: i }) => ({
			type: "radio",
			value: t,
			label: /* @__PURE__ */ r("span", {
				className: "theme-switcher__item",
				children: [/* @__PURE__ */ n(e, {
					name: i,
					size: "sm"
				}), d[t]]
			})
		})),
		children: [/* @__PURE__ */ n(e, {
			name: f.icon,
			size: "sm"
		}), d[f.value]]
	});
}
//#endregion
export { a as ThemeSwitcher };

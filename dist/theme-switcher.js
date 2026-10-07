'use client';
import './theme-switcher.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { Button as n } from "./button.js";
import { Menu as r } from "./menu.js";
import { DropdownField as i } from "./dropdown-field.js";
import { useId as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/stories/messages/es/themeSwitcher.ts
var c = {
	group: "Tema",
	light: "Claro",
	dark: "Oscuro",
	system: "Sistema",
	trigger: (e, t) => `${e}: ${t}`
}, l = [
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
function u({ value: u, onChange: d, labels: f, id: p, variant: m = "compact", layout: h = "inline", size: g = "md", className: _ }) {
	let v = a(), y = p ?? v, b = e("themeSwitcher", c), x = {
		group: () => b("group", f?.group),
		light: () => b("light", f?.light),
		dark: () => b("dark", f?.dark),
		system: () => b("system", f?.system)
	}, S = l.find((e) => e.value === u) ?? l[2];
	if (m === "list") return /* @__PURE__ */ o("div", {
		className: [
			"theme-switcher",
			"theme-switcher--list",
			_
		].filter(Boolean).join(" "),
		role: "group",
		"aria-label": x.group(),
		children: /* @__PURE__ */ o("ul", {
			className: "theme-switcher__list",
			children: l.map(({ value: e, icon: n }) => {
				let r = e === u;
				return /* @__PURE__ */ o("li", { children: /* @__PURE__ */ s("button", {
					type: "button",
					className: ["theme-switcher__option", r ? "theme-switcher__option--current" : ""].filter(Boolean).join(" "),
					"aria-pressed": r,
					onClick: r ? void 0 : () => d?.(e),
					children: [/* @__PURE__ */ o(t, {
						name: n,
						size: "sm"
					}), /* @__PURE__ */ o("span", { children: x[e]() })]
				}) }, e);
			})
		})
	});
	let C = l.map(({ value: e, icon: n }) => ({
		type: "radio",
		value: e,
		label: /* @__PURE__ */ s("span", {
			className: "theme-switcher__item",
			children: [/* @__PURE__ */ o(t, {
				name: n,
				size: "sm"
			}), x[e]()]
		})
	}));
	if (m === "icon") return /* @__PURE__ */ o(r, {
		className: _,
		align: "end",
		size: g,
		value: u,
		onValueChange: (e) => d?.(e),
		items: C,
		trigger: /* @__PURE__ */ o(n, {
			variant: "ghost",
			size: g,
			iconOnly: !0,
			"aria-label": b("trigger", f?.trigger)(x.group(), x[S.value]()),
			children: /* @__PURE__ */ o(t, {
				name: S.icon,
				size: "md"
			})
		})
	});
	let w = [
		"theme-switcher",
		"theme-switcher--compact",
		_
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ s(i, {
		id: y,
		label: x.group(),
		inline: h === "inline",
		size: g,
		className: w,
		value: u,
		onValueChange: (e) => d?.(e),
		items: C,
		children: [/* @__PURE__ */ o(t, {
			name: S.icon,
			size: "sm"
		}), x[S.value]()]
	});
}
//#endregion
export { u as ThemeSwitcher };

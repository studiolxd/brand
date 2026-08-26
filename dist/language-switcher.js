'use client';
import './language-switcher.css';
import { Icon as e } from "./icon.js";
import { Button as t } from "./button.js";
import { Menu as n } from "./menu.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/stories/molecules/LanguageSwitcher/LanguageSwitcher.tsx
function a({ href: e, lang: t, children: n, className: i, "aria-current": a }) {
	return /* @__PURE__ */ r("a", {
		href: e,
		lang: t,
		className: i,
		"aria-current": a,
		children: n
	});
}
function o({ languages: o, value: s, onChange: c, label: l = "Idioma", variant: u = "compact", hrefFor: d, renderLink: f = a, className: p }) {
	return u === "list" ? /* @__PURE__ */ r("nav", {
		className: [
			"language-switcher",
			"language-switcher--list",
			p
		].filter(Boolean).join(" "),
		"aria-label": l,
		children: /* @__PURE__ */ r("ul", {
			className: "language-switcher__list",
			children: o.map(({ code: e, label: t }) => {
				let n = e === s, i = ["language-switcher__option", n ? "language-switcher__option--current" : ""].filter(Boolean).join(" ");
				return /* @__PURE__ */ r("li", { children: n ? /* @__PURE__ */ r("span", {
					lang: e,
					className: i,
					"aria-current": "true",
					children: t
				}) : d ? f({
					href: d(e),
					lang: e,
					className: i,
					children: t
				}) : /* @__PURE__ */ r("button", {
					type: "button",
					lang: e,
					className: i,
					onClick: () => c?.(e),
					children: t
				}) }, e);
			})
		})
	}) : /* @__PURE__ */ r("div", {
		className: [
			"language-switcher",
			"language-switcher--compact",
			p
		].filter(Boolean).join(" "),
		children: /* @__PURE__ */ r(n, {
			align: "end",
			value: s,
			onValueChange: (e) => c?.(e),
			items: o.map(({ code: e, label: t }) => ({
				type: "radio",
				value: e,
				label: /* @__PURE__ */ r("span", {
					lang: e,
					children: t
				})
			})),
			trigger: /* @__PURE__ */ i(t, {
				variant: "ghost",
				size: "md",
				"aria-label": l,
				children: [/* @__PURE__ */ r("span", {
					className: "language-switcher__code",
					"aria-hidden": "true",
					children: s
				}), /* @__PURE__ */ r(e, {
					name: "chevron",
					size: "xs",
					className: "language-switcher__chevron"
				})]
			})
		})
	});
}
//#endregion
export { o as LanguageSwitcher };

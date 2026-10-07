'use client';
import './language-switcher.css';
import { r as e } from "./_shared/brandmessagescontext.js";
import { t } from "./_shared/default-render-link.js";
import { DropdownField as n } from "./dropdown-field.js";
import { useId as r } from "react";
import { jsx as i } from "react/jsx-runtime";
//#region src/stories/messages/es/languageSwitcher.ts
var a = { label: "Idioma" };
//#endregion
//#region src/stories/molecules/LanguageSwitcher/LanguageSwitcher.tsx
function o({ languages: o, value: s, onChange: c, label: l, id: u, labelHidden: d, variant: f = "compact", layout: p = "inline", size: m = "md", hrefFor: h, renderLink: g = t, className: _ }) {
	let v = r(), y = u ?? v, b = e("languageSwitcher", a)("label", l);
	if (f === "list") return /* @__PURE__ */ i("nav", {
		className: [
			"language-switcher",
			"language-switcher--list",
			_
		].filter(Boolean).join(" "),
		"aria-label": b,
		children: /* @__PURE__ */ i("ul", {
			className: "language-switcher__list",
			children: o.map(({ code: e, label: t }) => {
				let n = e === s, r = ["language-switcher__option", n ? "language-switcher__option--current" : ""].filter(Boolean).join(" ");
				return /* @__PURE__ */ i("li", { children: n ? /* @__PURE__ */ i("span", {
					lang: e,
					className: r,
					"aria-current": "true",
					children: t
				}) : h ? g({
					href: h(e),
					lang: e,
					className: r,
					children: t
				}) : /* @__PURE__ */ i("button", {
					type: "button",
					lang: e,
					className: r,
					onClick: () => c?.(e),
					children: t
				}) }, e);
			})
		})
	});
	let x = [
		"language-switcher",
		"language-switcher--compact",
		_
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ i(n, {
		id: y,
		label: b,
		labelHidden: d,
		inline: p === "inline",
		size: m,
		align: "end",
		className: x,
		value: s,
		onValueChange: (e) => c?.(e),
		items: o.map(({ code: e, label: t }) => ({
			type: "radio",
			value: e,
			label: /* @__PURE__ */ i("span", {
				lang: e,
				children: t
			})
		})),
		children: /* @__PURE__ */ i("span", {
			lang: s,
			children: o.find((e) => e.code === s)?.label ?? s
		})
	});
}
//#endregion
export { o as LanguageSwitcher };

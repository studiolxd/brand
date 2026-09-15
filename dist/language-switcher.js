'use client';
import './language-switcher.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { DropdownField as t } from "./dropdown-field.js";
import { jsx as n } from "react/jsx-runtime";
//#region src/stories/molecules/LanguageSwitcher/LanguageSwitcher.tsx
function r({ href: e, lang: t, children: r, className: i, "aria-current": a }) {
	return /* @__PURE__ */ n("a", {
		href: e,
		lang: t,
		className: i,
		"aria-current": a,
		children: r
	});
}
function i({ languages: i, value: a, onChange: o, label: s, id: c = "language-switcher", labelHidden: l, variant: u = "compact", layout: d = "inline", size: f = "md", hrefFor: p, renderLink: m = r, className: h }) {
	let g = e("languageSwitcher")("label", s);
	if (u === "list") return /* @__PURE__ */ n("nav", {
		className: [
			"language-switcher",
			"language-switcher--list",
			h
		].filter(Boolean).join(" "),
		"aria-label": g,
		children: /* @__PURE__ */ n("ul", {
			className: "language-switcher__list",
			children: i.map(({ code: e, label: t }) => {
				let r = e === a, i = ["language-switcher__option", r ? "language-switcher__option--current" : ""].filter(Boolean).join(" ");
				return /* @__PURE__ */ n("li", { children: r ? /* @__PURE__ */ n("span", {
					lang: e,
					className: i,
					"aria-current": "true",
					children: t
				}) : p ? m({
					href: p(e),
					lang: e,
					className: i,
					children: t
				}) : /* @__PURE__ */ n("button", {
					type: "button",
					lang: e,
					className: i,
					onClick: () => o?.(e),
					children: t
				}) }, e);
			})
		})
	});
	let _ = [
		"language-switcher",
		"language-switcher--compact",
		h
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ n(t, {
		id: c,
		label: g,
		labelHidden: l,
		inline: d === "inline",
		size: f,
		align: "end",
		className: _,
		value: a,
		onValueChange: (e) => o?.(e),
		items: i.map(({ code: e, label: t }) => ({
			type: "radio",
			value: e,
			label: /* @__PURE__ */ n("span", {
				lang: e,
				children: t
			})
		})),
		children: /* @__PURE__ */ n("span", {
			lang: a,
			children: i.find((e) => e.code === a)?.label ?? a
		})
	});
}
//#endregion
export { i as LanguageSwitcher };

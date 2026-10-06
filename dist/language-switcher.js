'use client';
import './language-switcher.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { DropdownField as t } from "./dropdown-field.js";
import { useId as n } from "react";
import { jsx as r } from "react/jsx-runtime";
//#region src/stories/molecules/LanguageSwitcher/LanguageSwitcher.tsx
function i({ href: e, lang: t, children: n, className: i, "aria-current": a }) {
	return /* @__PURE__ */ r("a", {
		href: e,
		lang: t,
		className: i,
		"aria-current": a,
		children: n
	});
}
function a({ languages: a, value: o, onChange: s, label: c, id: l, labelHidden: u, variant: d = "compact", layout: f = "inline", size: p = "md", hrefFor: m, renderLink: h = i, className: g }) {
	let _ = n(), v = l ?? _, y = e("languageSwitcher")("label", c);
	if (d === "list") return /* @__PURE__ */ r("nav", {
		className: [
			"language-switcher",
			"language-switcher--list",
			g
		].filter(Boolean).join(" "),
		"aria-label": y,
		children: /* @__PURE__ */ r("ul", {
			className: "language-switcher__list",
			children: a.map(({ code: e, label: t }) => {
				let n = e === o, i = ["language-switcher__option", n ? "language-switcher__option--current" : ""].filter(Boolean).join(" ");
				return /* @__PURE__ */ r("li", { children: n ? /* @__PURE__ */ r("span", {
					lang: e,
					className: i,
					"aria-current": "true",
					children: t
				}) : m ? h({
					href: m(e),
					lang: e,
					className: i,
					children: t
				}) : /* @__PURE__ */ r("button", {
					type: "button",
					lang: e,
					className: i,
					onClick: () => s?.(e),
					children: t
				}) }, e);
			})
		})
	});
	let b = [
		"language-switcher",
		"language-switcher--compact",
		g
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ r(t, {
		id: v,
		label: y,
		labelHidden: u,
		inline: f === "inline",
		size: p,
		align: "end",
		className: b,
		value: o,
		onValueChange: (e) => s?.(e),
		items: a.map(({ code: e, label: t }) => ({
			type: "radio",
			value: e,
			label: /* @__PURE__ */ r("span", {
				lang: e,
				children: t
			})
		})),
		children: /* @__PURE__ */ r("span", {
			lang: o,
			children: a.find((e) => e.code === o)?.label ?? o
		})
	});
}
//#endregion
export { a as LanguageSwitcher };

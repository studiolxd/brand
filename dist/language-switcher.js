'use client';
import './language-switcher.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { t } from "./_shared/default-render-link.js";
import { DropdownField as n } from "./dropdown-field.js";
import { useId as r } from "react";
import { jsx as i } from "react/jsx-runtime";
//#region src/stories/molecules/LanguageSwitcher/LanguageSwitcher.tsx
function a({ languages: a, value: o, onChange: s, label: c, id: l, labelHidden: u, variant: d = "compact", layout: f = "inline", size: p = "md", hrefFor: m, renderLink: h = t, className: g }) {
	let _ = r(), v = l ?? _, y = e("languageSwitcher")("label", c);
	if (d === "list") return /* @__PURE__ */ i("nav", {
		className: [
			"language-switcher",
			"language-switcher--list",
			g
		].filter(Boolean).join(" "),
		"aria-label": y,
		children: /* @__PURE__ */ i("ul", {
			className: "language-switcher__list",
			children: a.map(({ code: e, label: t }) => {
				let n = e === o, r = ["language-switcher__option", n ? "language-switcher__option--current" : ""].filter(Boolean).join(" ");
				return /* @__PURE__ */ i("li", { children: n ? /* @__PURE__ */ i("span", {
					lang: e,
					className: r,
					"aria-current": "true",
					children: t
				}) : m ? h({
					href: m(e),
					lang: e,
					className: r,
					children: t
				}) : /* @__PURE__ */ i("button", {
					type: "button",
					lang: e,
					className: r,
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
	return /* @__PURE__ */ i(n, {
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
			label: /* @__PURE__ */ i("span", {
				lang: e,
				children: t
			})
		})),
		children: /* @__PURE__ */ i("span", {
			lang: o,
			children: a.find((e) => e.code === o)?.label ?? o
		})
	});
}
//#endregion
export { a as LanguageSwitcher };

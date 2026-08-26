'use client';
import './language-switcher.css';
import { DropdownField as e } from "./dropdown-field.js";
import { jsx as t } from "react/jsx-runtime";
//#region src/stories/molecules/LanguageSwitcher/LanguageSwitcher.tsx
function n({ href: e, lang: n, children: r, className: i, "aria-current": a }) {
	return /* @__PURE__ */ t("a", {
		href: e,
		lang: n,
		className: i,
		"aria-current": a,
		children: r
	});
}
function r({ languages: r, value: i, onChange: a, label: o = "Idioma", id: s = "language-switcher", labelHidden: c = !1, variant: l = "compact", size: u = "md", hrefFor: d, renderLink: f = n, className: p }) {
	return l === "list" ? /* @__PURE__ */ t("nav", {
		className: [
			"language-switcher",
			"language-switcher--list",
			p
		].filter(Boolean).join(" "),
		"aria-label": o,
		children: /* @__PURE__ */ t("ul", {
			className: "language-switcher__list",
			children: r.map(({ code: e, label: n }) => {
				let r = e === i, o = ["language-switcher__option", r ? "language-switcher__option--current" : ""].filter(Boolean).join(" ");
				return /* @__PURE__ */ t("li", { children: r ? /* @__PURE__ */ t("span", {
					lang: e,
					className: o,
					"aria-current": "true",
					children: n
				}) : d ? f({
					href: d(e),
					lang: e,
					className: o,
					children: n
				}) : /* @__PURE__ */ t("button", {
					type: "button",
					lang: e,
					className: o,
					onClick: () => a?.(e),
					children: n
				}) }, e);
			})
		})
	}) : /* @__PURE__ */ t(e, {
		id: s,
		label: o,
		labelHidden: c,
		inline: !0,
		size: u,
		align: "end",
		className: [
			"language-switcher",
			"language-switcher--compact",
			p
		].filter(Boolean).join(" "),
		value: i,
		onValueChange: (e) => a?.(e),
		items: r.map(({ code: e, label: n }) => ({
			type: "radio",
			value: e,
			label: /* @__PURE__ */ t("span", {
				lang: e,
				children: n
			})
		})),
		children: /* @__PURE__ */ t("span", {
			lang: i,
			children: r.find((e) => e.code === i)?.label ?? i
		})
	});
}
//#endregion
export { r as LanguageSwitcher };

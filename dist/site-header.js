'use client';
import './site-header.css';
import { Container as e } from "./container.js";
import { MenuButton as t } from "./menu-button.js";
import { Logo as n } from "./logo.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import { useEffect as a, useRef as o, useState as s } from "react";
//#region src/stories/sections/SiteHeader/SiteHeader.tsx
function c({ children: e, ...t }) {
	return /* @__PURE__ */ r("a", {
		...t,
		children: e
	});
}
function l({ logoHref: l = "/", logoLabel: u = "Studio LXD — ir al inicio", menuLabel: d = "Menú de navegación", menuCloseLabel: f, logoSize: p = "xxl", logo: m = /* @__PURE__ */ r(n, { size: p }), menuButtonSize: h = "lg", renderLogoLink: g = c, width: _ = "xl", open: v, onOpenChange: y, children: b, settings: x, panelId: S = "site-header-panel", actions: C, language: w }) {
	let [T, E] = s(!1), D = v !== void 0, O = D ? v : T, k = !!(b || x || w), A = o(null), j = o(null), M = (e) => {
		D || E(e), y?.(e);
	};
	return a(() => {
		if (!O) return;
		let e = (e) => {
			e.key === "Escape" && (M(!1), j.current?.focus());
		}, t = (e) => {
			let t = e.target;
			A.current?.contains(t) || t?.closest("[role=\"menu\"], [role=\"listbox\"], [role=\"dialog\"]") || M(!1);
		};
		document.addEventListener("keydown", e), document.addEventListener("pointerdown", t);
		let n = document.body.style.overflow;
		return document.body.style.overflow = "hidden", () => {
			document.removeEventListener("keydown", e), document.removeEventListener("pointerdown", t), document.body.style.overflow = n;
		};
	}, [O]), /* @__PURE__ */ r("header", {
		ref: A,
		className: "site-header",
		children: /* @__PURE__ */ i(e, {
			width: _,
			innerClassName: "site-header__bar",
			children: [
				g({
					href: l,
					className: "site-header__logo",
					"aria-label": u,
					children: m
				}),
				/* @__PURE__ */ i("div", {
					className: "site-header__controls",
					children: [C, k && /* @__PURE__ */ r(t, {
						ref: j,
						isOpen: O,
						onClick: () => M(!O),
						label: d,
						closeLabel: f,
						size: h,
						"aria-controls": S
					})]
				}),
				k && /* @__PURE__ */ r("div", {
					className: ["site-header__panel", O ? "site-header__panel--open" : ""].filter(Boolean).join(" "),
					id: S,
					inert: !O,
					"aria-hidden": !O,
					children: /* @__PURE__ */ i(e, {
						width: _,
						space: "none",
						innerClassName: "site-header__panel-inner",
						children: [b, (w || x) && /* @__PURE__ */ i("div", {
							className: "site-header__settings",
							children: [w, x]
						})]
					})
				})
			]
		})
	});
}
//#endregion
export { l as SiteHeader };

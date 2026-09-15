'use client';
import './site-header.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Container as t } from "./container.js";
import { MenuButton as n } from "./menu-button.js";
import { t as r } from "./_shared/logo.js";
import { useEffect as i, useRef as a, useState as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/stories/sections/SiteHeader/SiteHeader.tsx
function l({ children: e, ...t }) {
	return /* @__PURE__ */ s("a", {
		...t,
		children: e
	});
}
function u({ logoHref: u = "/", logoLabel: d, menuLabel: f, menuCloseLabel: p, logoSize: m = "xxl", logo: h = /* @__PURE__ */ s(r, { size: m }), menuButtonSize: g = "lg", renderLogoLink: _ = l, width: v = "xl", open: y, onOpenChange: b, children: x, settings: S, panelId: C = "site-header-panel", actions: w, language: T }) {
	let E = e("siteHeader"), [D, O] = o(!1), k = y !== void 0, A = k ? y : D, j = !!(x || S || T), M = a(null), N = a(null), P = (e) => {
		k || O(e), b?.(e);
	};
	return i(() => {
		if (!A) return;
		let e = (e) => {
			e.key === "Escape" && (P(!1), N.current?.focus());
		}, t = (e) => {
			let t = e.target;
			M.current?.contains(t) || t?.closest("[role=\"menu\"], [role=\"listbox\"], [role=\"dialog\"]") || P(!1);
		};
		document.addEventListener("keydown", e), document.addEventListener("pointerdown", t);
		let n = document.body.style.overflow;
		return document.body.style.overflow = "hidden", () => {
			document.removeEventListener("keydown", e), document.removeEventListener("pointerdown", t), document.body.style.overflow = n;
		};
	}, [A]), /* @__PURE__ */ s("header", {
		ref: M,
		className: "site-header",
		children: /* @__PURE__ */ c(t, {
			width: v,
			innerClassName: "site-header__bar",
			children: [
				_({
					href: u,
					className: "site-header__logo",
					"aria-label": E("logo", d),
					children: h
				}),
				/* @__PURE__ */ c("div", {
					className: "site-header__controls",
					children: [w && /* @__PURE__ */ s("div", {
						className: "site-header__actions",
						children: w
					}), j && /* @__PURE__ */ s(n, {
						ref: N,
						isOpen: A,
						onClick: () => P(!A),
						label: f,
						closeLabel: p,
						size: g,
						"aria-controls": C
					})]
				}),
				j && /* @__PURE__ */ s("div", {
					className: ["site-header__panel", A ? "site-header__panel--open" : ""].filter(Boolean).join(" "),
					id: C,
					inert: !A,
					"aria-hidden": !A,
					children: /* @__PURE__ */ c(t, {
						width: v,
						space: "none",
						innerClassName: "site-header__panel-inner",
						children: [x, (T || S) && /* @__PURE__ */ c("div", {
							className: "site-header__settings",
							children: [T, S]
						})]
					})
				})
			]
		})
	});
}
//#endregion
export { u as SiteHeader };

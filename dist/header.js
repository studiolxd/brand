'use client';
import './header.css';
import { Hamburger as e } from "./hamburger.js";
import { Logo as t } from "./logo.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import { useState as i } from "react";
//#region src/stories/sections/Header/Header.tsx
function a({ navItems: a, featuredLink: o, actions: s, logoHref: c = "/", logoLabel: l = "Studio LXD — ir al inicio", navLabel: u = "Main navigation", dark: d = !1 }) {
	let [f, p] = i(!1), m = () => {
		p(!1);
	};
	return /* @__PURE__ */ r("header", {
		className: ["header", d ? "header--dark" : ""].filter(Boolean).join(" "),
		children: [
			/* @__PURE__ */ n("a", {
				href: "#main-content",
				className: "header__skip-link",
				children: "Saltar al contenido principal"
			}),
			/* @__PURE__ */ n("a", {
				href: c,
				className: "header__logo",
				"aria-label": l,
				children: /* @__PURE__ */ n(t, {})
			}),
			/* @__PURE__ */ n(e, {
				isOpen: f,
				onClick: () => p(!f),
				label: f ? "Cerrar menu" : "Abrir menu"
			}),
			/* @__PURE__ */ r("div", {
				className: "header__navbar",
				"aria-hidden": !f,
				children: [
					o && /* @__PURE__ */ n("a", {
						href: o.href,
						className: "header__featured",
						onClick: m,
						children: o.label
					}),
					/* @__PURE__ */ n("nav", {
						"aria-label": u,
						children: a.map((e) => /* @__PURE__ */ n("a", {
							href: e.href,
							className: "header__nav-link",
							onClick: m,
							children: e.label
						}, e.href))
					}),
					s && /* @__PURE__ */ n("div", {
						className: "header__actions",
						children: s
					})
				]
			})
		]
	});
}
//#endregion
export { a as Header };

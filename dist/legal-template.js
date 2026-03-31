'use client';
import './legal-template.css';
import { Button as e } from "./button.js";
import { Chevron as t } from "./chevron.js";
import { Heading as n } from "./heading.js";
import { i as r, n as i, r as a, t as o } from "./_shared/navigation.js";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
import { useState as l } from "react";
//#region src/stories/pages/Legal/Legal.tsx
function u({ section: e, index: r }) {
	let [i, a] = l(!1), o = `legal-section-${r}`;
	return /* @__PURE__ */ c("div", {
		className: `legal-accordion__item${i ? " legal-accordion__item--open" : ""}`,
		children: [/* @__PURE__ */ s(n, {
			level: 2,
			className: "legal-accordion__heading",
			children: /* @__PURE__ */ c("button", {
				className: "legal-accordion__header",
				onClick: () => a((e) => !e),
				"aria-expanded": i,
				"aria-controls": o,
				children: [
					/* @__PURE__ */ s("span", {
						className: "legal-accordion__counter",
						children: String(r + 1).padStart(2, "0")
					}),
					/* @__PURE__ */ s("span", {
						className: "legal-accordion__title",
						children: e.title
					}),
					/* @__PURE__ */ s(t, {
						className: "legal-accordion__chevron",
						size: "lg"
					})
				]
			})
		}), /* @__PURE__ */ s("div", {
			className: "legal-accordion__body",
			id: o,
			role: "region",
			children: /* @__PURE__ */ s("div", {
				className: "legal-accordion__body-inner",
				children: e.content
			})
		})]
	});
}
function d({ title: t, sections: l, navItems: d = i, featuredLink: f = o }) {
	return /* @__PURE__ */ c("div", {
		className: "legal-page",
		children: [
			/* @__PURE__ */ s(r, {
				navItems: d,
				featuredLink: f,
				actions: /* @__PURE__ */ s(e, {
					href: "https://academy.studiolxd.com",
					variant: "primary",
					external: !0,
					children: "Entra a la academia"
				})
			}),
			/* @__PURE__ */ c("main", {
				id: "main-content",
				className: "legal-page__main",
				children: [/* @__PURE__ */ s("div", {
					className: "legal-page__header",
					children: /* @__PURE__ */ s(n, {
						level: 1,
						className: "legal-page__title",
						children: t
					})
				}), /* @__PURE__ */ s("div", {
					className: "legal-accordion",
					children: l.map((e, t) => /* @__PURE__ */ s(u, {
						section: e,
						index: t
					}, e.title))
				})]
			}),
			/* @__PURE__ */ s(a, {})
		]
	});
}
//#endregion
export { d as Legal };

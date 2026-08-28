'use client';
import './steps.css';
import { Icon as e } from "./icon.js";
import { Heading as t } from "./heading.js";
import { Paragraph as n } from "./paragraph.js";
import { NumberBadge as r } from "./number-badge.js";
import { Children as i, createContext as a, useContext as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/stories/organisms/Steps/Steps.tsx
var l = a(null);
function u({ items: a, orientation: o = "vertical", badgeVariant: u = "primary", titleLevel: d = 3, titleSize: f = 4, label: p, children: m, className: h, id: g }) {
	let _ = [
		"steps",
		`steps--${o}`,
		h
	].filter(Boolean).join(" ");
	return m === void 0 ? /* @__PURE__ */ s("ol", {
		id: g,
		className: _,
		"aria-label": p,
		children: (a ?? []).map((i, a) => /* @__PURE__ */ c("li", {
			className: "steps__item",
			children: [/* @__PURE__ */ s("span", {
				className: "steps__marker",
				"aria-hidden": "true",
				children: /* @__PURE__ */ s(r, {
					count: a + 1,
					variant: u,
					className: "steps__number"
				})
			}), /* @__PURE__ */ c("div", {
				className: "steps__body",
				children: [/* @__PURE__ */ c(t, {
					level: d,
					size: f,
					className: "steps__title",
					children: [i.icon && /* @__PURE__ */ s(e, {
						name: i.icon,
						className: "steps__icon"
					}), i.title]
				}), i.description && /* @__PURE__ */ s(n, {
					className: "steps__description",
					children: i.description
				})]
			})]
		}, i.id ?? a))
	}) : /* @__PURE__ */ s("ol", {
		id: g,
		className: _,
		"aria-label": p,
		children: i.map(m, (e, t) => /* @__PURE__ */ s(l.Provider, {
			value: {
				index: t,
				badgeVariant: u,
				titleLevel: d,
				titleSize: f
			},
			children: e
		}))
	});
}
function d({ title: n, icon: i, children: a, className: u, ...d }) {
	let f = o(l);
	if (f === null) throw Error("`Step` solo funciona dentro de `Steps`: de ahí saca su número.");
	let { index: p, badgeVariant: m, titleLevel: h, titleSize: g } = f;
	return /* @__PURE__ */ c("li", {
		className: ["steps__item", u].filter(Boolean).join(" "),
		...d,
		children: [/* @__PURE__ */ s("span", {
			className: "steps__marker",
			"aria-hidden": "true",
			children: /* @__PURE__ */ s(r, {
				count: p + 1,
				variant: m,
				className: "steps__number"
			})
		}), /* @__PURE__ */ c("div", {
			className: "steps__body",
			children: [/* @__PURE__ */ c(t, {
				level: h,
				size: g,
				className: "steps__title",
				children: [i && /* @__PURE__ */ s(e, {
					name: i,
					className: "steps__icon"
				}), n]
			}), a]
		})]
	});
}
//#endregion
export { d as Step, u as Steps };

'use client';
import './steps.css';
import { Icon as e } from "./icon.js";
import { Heading as t } from "./heading.js";
import { Paragraph as n } from "./paragraph.js";
import { NumberBadge as r } from "./number-badge.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
import { Children as o, createContext as s, useContext as c } from "react";
//#region src/stories/organisms/Steps/Steps.tsx
var l = s(null);
function u({ items: s, orientation: c = "vertical", badgeVariant: u = "primary", titleLevel: d = 3, titleSize: f = 4, label: p, children: m, className: h, id: g }) {
	let _ = [
		"steps",
		`steps--${c}`,
		h
	].filter(Boolean).join(" ");
	return m === void 0 ? /* @__PURE__ */ i("ol", {
		id: g,
		className: _,
		"aria-label": p,
		children: (s ?? []).map((o, s) => /* @__PURE__ */ a("li", {
			className: "steps__item",
			children: [/* @__PURE__ */ i("span", {
				className: "steps__marker",
				"aria-hidden": "true",
				children: /* @__PURE__ */ i(r, {
					count: s + 1,
					variant: u,
					className: "steps__number"
				})
			}), /* @__PURE__ */ a("div", {
				className: "steps__body",
				children: [/* @__PURE__ */ a(t, {
					level: d,
					size: f,
					className: "steps__title",
					children: [o.icon && /* @__PURE__ */ i(e, {
						name: o.icon,
						className: "steps__icon"
					}), o.title]
				}), o.description && /* @__PURE__ */ i(n, {
					className: "steps__description",
					children: o.description
				})]
			})]
		}, o.id ?? s))
	}) : /* @__PURE__ */ i("ol", {
		id: g,
		className: _,
		"aria-label": p,
		children: o.map(m, (e, t) => /* @__PURE__ */ i(l.Provider, {
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
function d({ title: n, icon: o, children: s, className: u, ...d }) {
	let f = c(l);
	if (f === null) throw Error("`Step` solo funciona dentro de `Steps`: de ahí saca su número.");
	let { index: p, badgeVariant: m, titleLevel: h, titleSize: g } = f;
	return /* @__PURE__ */ a("li", {
		className: ["steps__item", u].filter(Boolean).join(" "),
		...d,
		children: [/* @__PURE__ */ i("span", {
			className: "steps__marker",
			"aria-hidden": "true",
			children: /* @__PURE__ */ i(r, {
				count: p + 1,
				variant: m,
				className: "steps__number"
			})
		}), /* @__PURE__ */ a("div", {
			className: "steps__body",
			children: [/* @__PURE__ */ a(t, {
				level: h,
				size: g,
				className: "steps__title",
				children: [o && /* @__PURE__ */ i(e, {
					name: o,
					className: "steps__icon"
				}), n]
			}), s]
		})]
	});
}
//#endregion
export { d as Step, u as Steps };

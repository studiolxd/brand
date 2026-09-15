'use client';
import './steps.css';
import { Icon as e } from "./icon.js";
import { Heading as t } from "./heading.js";
import { Paragraph as n } from "./paragraph.js";
import { StepMarker as r } from "./step-marker.js";
import { Children as i, createContext as a, useContext as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/stories/organisms/Steps/Steps.tsx
var l = a(null);
function u({ items: a, orientation: o = "vertical", tone: u, badgeVariant: d, titleLevel: f = 3, titleSize: p = 1, label: m, children: h, className: g, id: _ }) {
	let v = [
		"steps",
		`steps--${o}`,
		g
	].filter(Boolean).join(" "), y = u ?? d ?? "primary";
	return h === void 0 ? /* @__PURE__ */ s("ol", {
		id: _,
		className: v,
		"aria-label": m,
		children: (a ?? []).map((i, a) => /* @__PURE__ */ c("li", {
			className: "steps__item",
			children: [/* @__PURE__ */ s("span", {
				className: "steps__marker",
				children: /* @__PURE__ */ s(r, {
					state: "neutral",
					tone: y,
					count: a + 1,
					icon: i.icon,
					className: "steps__number"
				})
			}), /* @__PURE__ */ c("div", {
				className: "steps__body",
				children: [/* @__PURE__ */ c(t, {
					level: f,
					size: p,
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
		id: _,
		className: v,
		"aria-label": m,
		children: i.map(h, (e, t) => /* @__PURE__ */ s(l.Provider, {
			value: {
				index: t,
				tone: y,
				titleLevel: f,
				titleSize: p
			},
			children: e
		}))
	});
}
function d({ title: n, icon: i, children: a, className: u, ...d }) {
	let f = o(l);
	if (f === null) throw Error("`Step` solo funciona dentro de `Steps`: de ahí saca su número.");
	let { index: p, tone: m, titleLevel: h, titleSize: g } = f;
	return /* @__PURE__ */ c("li", {
		className: ["steps__item", u].filter(Boolean).join(" "),
		...d,
		children: [/* @__PURE__ */ s("span", {
			className: "steps__marker",
			children: /* @__PURE__ */ s(r, {
				state: "neutral",
				tone: m,
				count: p + 1,
				icon: i,
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

'use client';
import './steps.css';
import { Icon as e } from "./icon.js";
import { Heading as t } from "./heading.js";
import { Paragraph as n } from "./paragraph.js";
import { StepMarker as r } from "./step-marker.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
import { Children as o, createContext as s, useContext as c } from "react";
//#region src/stories/organisms/Steps/Steps.tsx
var l = s(null);
function u({ items: s, orientation: c = "vertical", tone: u, badgeVariant: d, titleLevel: f = 3, titleSize: p = 1, label: m, children: h, className: g, id: _ }) {
	let v = [
		"steps",
		`steps--${c}`,
		g
	].filter(Boolean).join(" "), y = u ?? d ?? "primary";
	return h === void 0 ? /* @__PURE__ */ i("ol", {
		id: _,
		className: v,
		"aria-label": m,
		children: (s ?? []).map((o, s) => /* @__PURE__ */ a("li", {
			className: "steps__item",
			children: [/* @__PURE__ */ i("span", {
				className: "steps__marker",
				children: /* @__PURE__ */ i(r, {
					state: "neutral",
					tone: y,
					count: s + 1,
					icon: o.icon,
					className: "steps__number"
				})
			}), /* @__PURE__ */ a("div", {
				className: "steps__body",
				children: [/* @__PURE__ */ a(t, {
					level: f,
					size: p,
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
		id: _,
		className: v,
		"aria-label": m,
		children: o.map(h, (e, t) => /* @__PURE__ */ i(l.Provider, {
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
function d({ title: n, icon: o, children: s, className: u, ...d }) {
	let f = c(l);
	if (f === null) throw Error("`Step` solo funciona dentro de `Steps`: de ahí saca su número.");
	let { index: p, tone: m, titleLevel: h, titleSize: g } = f;
	return /* @__PURE__ */ a("li", {
		className: ["steps__item", u].filter(Boolean).join(" "),
		...d,
		children: [/* @__PURE__ */ i("span", {
			className: "steps__marker",
			children: /* @__PURE__ */ i(r, {
				state: "neutral",
				tone: m,
				count: p + 1,
				icon: o,
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

'use client';
import './annotation-thread.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Tag as t } from "./tag.js";
import "react";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/organisms/AnnotationThread/AnnotationThread.tsx
var i = {
	open: "warning",
	acknowledged: "info",
	resolved: "success"
}, a = {
	day: "numeric",
	month: "short",
	hour: "2-digit",
	minute: "2-digit"
};
function o({ entry: e, locale: t, dateFormat: i, editedLabel: a }) {
	let o = e.date instanceof Date ? e.date : new Date(e.date), s = new Intl.DateTimeFormat(t, i).format(o);
	return /* @__PURE__ */ r("article", {
		className: "annotation-thread__item",
		children: [
			/* @__PURE__ */ r("header", {
				className: "annotation-thread__header",
				children: [
					e.avatar && /* @__PURE__ */ n("span", {
						className: "annotation-thread__avatar",
						children: e.avatar
					}),
					/* @__PURE__ */ n("span", {
						className: "annotation-thread__author",
						children: e.author
					}),
					/* @__PURE__ */ n("time", {
						className: "annotation-thread__date",
						dateTime: o.toISOString(),
						children: s
					}),
					e.edited && /* @__PURE__ */ n("span", {
						className: "annotation-thread__edited",
						children: a()
					}),
					e.meta && /* @__PURE__ */ n("span", {
						className: "annotation-thread__meta",
						children: e.meta
					})
				]
			}),
			/* @__PURE__ */ n("div", {
				className: "annotation-thread__body",
				children: e.body
			}),
			e.actions && /* @__PURE__ */ n("div", {
				className: "annotation-thread__item-actions",
				children: e.actions
			})
		]
	});
}
function s({ annotation: s, replies: c = [], status: l = "open", actions: u, reply: d, locale: f = "es-ES", dateFormat: p = a, openLabel: m, acknowledgedLabel: h, resolvedLabel: g, editedLabel: _, repliesLabel: v, label: y, className: b, ...x }) {
	let S = e("annotationThread");
	return /* @__PURE__ */ r("article", {
		className: [
			"annotation-thread",
			l === "open" ? "" : `annotation-thread--${l}`,
			b ?? ""
		].filter(Boolean).join(" "),
		"aria-label": S("label", y),
		...x,
		children: [
			/* @__PURE__ */ n("div", {
				className: "annotation-thread__status",
				children: /* @__PURE__ */ n(t, {
					variant: i[l],
					children: {
						open: () => S("open", m),
						acknowledged: () => S("acknowledged", h),
						resolved: () => S("resolved", g)
					}[l]()
				})
			}),
			/* @__PURE__ */ n(o, {
				entry: s,
				locale: f,
				dateFormat: p,
				editedLabel: () => S("edited", _)
			}),
			c.length > 0 && /* @__PURE__ */ r("div", {
				className: "annotation-thread__replies",
				children: [/* @__PURE__ */ n("p", {
					className: "annotation-thread__replies-label",
					children: S("replies", v)(c.length)
				}), c.map((e) => /* @__PURE__ */ n(o, {
					entry: e,
					locale: f,
					dateFormat: p,
					editedLabel: () => S("edited", _)
				}, e.id))]
			}),
			d && /* @__PURE__ */ n("div", {
				className: "annotation-thread__reply",
				children: d
			}),
			u && /* @__PURE__ */ n("footer", {
				className: "annotation-thread__actions",
				children: u
			})
		]
	});
}
//#endregion
export { s as AnnotationThread };

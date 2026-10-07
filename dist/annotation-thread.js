'use client';
import './annotation-thread.css';
import { r as e } from "./_shared/brandmessagescontext.js";
import { Tag as t } from "./tag.js";
import "react";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/messages/es/annotationThread.ts
var i = {
	label: "Hilo de anotaciones",
	open: "Abierta",
	acknowledged: "Atendida",
	resolved: "Resuelta",
	edited: "editada",
	replies: (e) => e === 1 ? "1 respuesta" : `${e} respuestas`
}, a = {
	open: "warning",
	acknowledged: "info",
	resolved: "success"
}, o = {
	day: "numeric",
	month: "short",
	hour: "2-digit",
	minute: "2-digit"
};
function s({ entry: e, locale: t, dateFormat: i, editedLabel: a }) {
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
function c({ annotation: c, replies: l = [], status: u = "open", actions: d, reply: f, locale: p = "es-ES", dateFormat: m = o, openLabel: h, acknowledgedLabel: g, resolvedLabel: _, editedLabel: v, repliesLabel: y, label: b, className: x, ...S }) {
	let C = e("annotationThread", i);
	return /* @__PURE__ */ r("article", {
		className: [
			"annotation-thread",
			u === "open" ? "" : `annotation-thread--${u}`,
			x ?? ""
		].filter(Boolean).join(" "),
		"aria-label": C("label", b),
		...S,
		children: [
			/* @__PURE__ */ n("div", {
				className: "annotation-thread__status",
				children: /* @__PURE__ */ n(t, {
					variant: a[u],
					children: {
						open: () => C("open", h),
						acknowledged: () => C("acknowledged", g),
						resolved: () => C("resolved", _)
					}[u]()
				})
			}),
			/* @__PURE__ */ n(s, {
				entry: c,
				locale: p,
				dateFormat: m,
				editedLabel: () => C("edited", v)
			}),
			l.length > 0 && /* @__PURE__ */ r("div", {
				className: "annotation-thread__replies",
				children: [/* @__PURE__ */ n("p", {
					className: "annotation-thread__replies-label",
					children: C("replies", y)(l.length)
				}), l.map((e) => /* @__PURE__ */ n(s, {
					entry: e,
					locale: p,
					dateFormat: m,
					editedLabel: () => C("edited", v)
				}, e.id))]
			}),
			f && /* @__PURE__ */ n("div", {
				className: "annotation-thread__reply",
				children: f
			}),
			d && /* @__PURE__ */ n("footer", {
				className: "annotation-thread__actions",
				children: d
			})
		]
	});
}
//#endregion
export { c as AnnotationThread };

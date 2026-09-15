import './annotation-thread.css';
import { Tag as e } from "./tag.js";
import "react";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/stories/organisms/AnnotationThread/AnnotationThread.tsx
var r = {
	open: "warning",
	acknowledged: "info",
	resolved: "success"
}, i = {
	day: "numeric",
	month: "short",
	hour: "2-digit",
	minute: "2-digit"
};
function a({ entry: e, locale: r, dateFormat: i, editedLabel: a }) {
	let o = e.date instanceof Date ? e.date : new Date(e.date), s = new Intl.DateTimeFormat(r, i).format(o);
	return /* @__PURE__ */ n("article", {
		className: "annotation-thread__item",
		children: [
			/* @__PURE__ */ n("header", {
				className: "annotation-thread__header",
				children: [
					e.avatar && /* @__PURE__ */ t("span", {
						className: "annotation-thread__avatar",
						children: e.avatar
					}),
					/* @__PURE__ */ t("span", {
						className: "annotation-thread__author",
						children: e.author
					}),
					/* @__PURE__ */ t("time", {
						className: "annotation-thread__date",
						dateTime: o.toISOString(),
						children: s
					}),
					e.edited && /* @__PURE__ */ t("span", {
						className: "annotation-thread__edited",
						children: a
					}),
					e.meta && /* @__PURE__ */ t("span", {
						className: "annotation-thread__meta",
						children: e.meta
					})
				]
			}),
			/* @__PURE__ */ t("div", {
				className: "annotation-thread__body",
				children: e.body
			}),
			e.actions && /* @__PURE__ */ t("div", {
				className: "annotation-thread__item-actions",
				children: e.actions
			})
		]
	});
}
function o({ annotation: o, replies: s = [], status: c = "open", actions: l, reply: u, locale: d = "es-ES", dateFormat: f = i, openLabel: p = "Abierta", acknowledgedLabel: m = "Atendida", resolvedLabel: h = "Resuelta", editedLabel: g = "editada", repliesLabel: _ = (e) => e === 1 ? "1 respuesta" : `${e} respuestas`, label: v = "Hilo de anotaciones", className: y, ...b }) {
	return /* @__PURE__ */ n("article", {
		className: [
			"annotation-thread",
			c === "open" ? "" : `annotation-thread--${c}`,
			y ?? ""
		].filter(Boolean).join(" "),
		"aria-label": v,
		...b,
		children: [
			/* @__PURE__ */ t("div", {
				className: "annotation-thread__status",
				children: /* @__PURE__ */ t(e, {
					variant: r[c],
					children: {
						open: p,
						acknowledged: m,
						resolved: h
					}[c]
				})
			}),
			/* @__PURE__ */ t(a, {
				entry: o,
				locale: d,
				dateFormat: f,
				editedLabel: g
			}),
			s.length > 0 && /* @__PURE__ */ n("div", {
				className: "annotation-thread__replies",
				children: [/* @__PURE__ */ t("p", {
					className: "annotation-thread__replies-label",
					children: _(s.length)
				}), s.map((e) => /* @__PURE__ */ t(a, {
					entry: e,
					locale: d,
					dateFormat: f,
					editedLabel: g
				}, e.id))]
			}),
			u && /* @__PURE__ */ t("div", {
				className: "annotation-thread__reply",
				children: u
			}),
			l && /* @__PURE__ */ t("footer", {
				className: "annotation-thread__actions",
				children: l
			})
		]
	});
}
//#endregion
export { o as AnnotationThread };

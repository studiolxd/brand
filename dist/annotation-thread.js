import './annotation-thread.css';
import { Tag as e } from "./tag.js";
import "react";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/stories/organisms/AnnotationThread/AnnotationThread.tsx
var r = {
	day: "numeric",
	month: "short",
	hour: "2-digit",
	minute: "2-digit"
};
function i({ entry: e, locale: r, dateFormat: i, editedLabel: a, esRaiz: o }) {
	let s = e.date instanceof Date ? e.date : new Date(e.date), c = new Intl.DateTimeFormat(r, i).format(s);
	return /* @__PURE__ */ n("article", {
		className: ["annotation-thread__item", o ? "annotation-thread__item--root" : ""].filter(Boolean).join(" "),
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
						dateTime: s.toISOString(),
						children: c
					}),
					e.edited && /* @__PURE__ */ t("span", {
						className: "annotation-thread__edited",
						children: a
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
function a({ annotation: a, replies: o = [], status: s = "open", actions: c, reply: l, locale: u = "es-ES", dateFormat: d = r, openLabel: f = "Abierta", resolvedLabel: p = "Resuelta", editedLabel: m = "editada", repliesLabel: h = (e) => e === 1 ? "1 respuesta" : `${e} respuestas`, label: g = "Hilo de anotaciones", className: _, ...v }) {
	let y = s === "resolved";
	return /* @__PURE__ */ n("article", {
		className: [
			"annotation-thread",
			y ? "annotation-thread--resolved" : "",
			_ ?? ""
		].filter(Boolean).join(" "),
		"aria-label": g,
		"data-status": s,
		...v,
		children: [
			/* @__PURE__ */ t("div", {
				className: "annotation-thread__status",
				children: /* @__PURE__ */ t(e, {
					variant: y ? "success" : "warning",
					children: y ? p : f
				})
			}),
			/* @__PURE__ */ t(i, {
				entry: a,
				locale: u,
				dateFormat: d,
				editedLabel: m,
				esRaiz: !0
			}),
			o.length > 0 && /* @__PURE__ */ n("div", {
				className: "annotation-thread__replies",
				children: [/* @__PURE__ */ t("p", {
					className: "annotation-thread__replies-label",
					children: h(o.length)
				}), o.map((e) => /* @__PURE__ */ t(i, {
					entry: e,
					locale: u,
					dateFormat: d,
					editedLabel: m,
					esRaiz: !1
				}, e.id))]
			}),
			l && /* @__PURE__ */ t("div", {
				className: "annotation-thread__reply",
				children: l
			}),
			c && /* @__PURE__ */ t("footer", {
				className: "annotation-thread__actions",
				children: c
			})
		]
	});
}
//#endregion
export { a as AnnotationThread };

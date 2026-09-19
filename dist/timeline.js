'use client';
import './timeline.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { StepMarker as n } from "./step-marker.js";
import { forwardRef as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/stories/molecules/Timeline/Timeline.tsx
var o = r(function({ items: r, label: o, currentLabel: s, markerSize: c = "sm", className: l, ...u }, d) {
	let f = e("timeline");
	return /* @__PURE__ */ i("ol", {
		ref: d,
		className: ["timeline", l].filter(Boolean).join(" "),
		"aria-label": f("label", o),
		...u,
		children: r.map((e, o) => /* @__PURE__ */ a("li", {
			className: "timeline__item",
			children: [/* @__PURE__ */ a("span", {
				className: "timeline__marker",
				children: [/* @__PURE__ */ i(n, {
					state: e.current ? "current" : "neutral",
					tone: e.tone ?? "neutral",
					size: c,
					icon: e.icon ?? "dot"
				}), o < r.length - 1 ? /* @__PURE__ */ i("span", { className: "timeline__rail" }) : null]
			}), /* @__PURE__ */ a("div", {
				className: "timeline__body",
				children: [
					/* @__PURE__ */ a("p", {
						className: "timeline__title",
						children: [e.title, e.current ? /* @__PURE__ */ i(t, { children: ` (${f("current", s)})` }) : null]
					}),
					e.date || e.author ? /* @__PURE__ */ a("p", {
						className: "timeline__meta",
						children: [e.date ? /* @__PURE__ */ i("span", {
							className: "timeline__date",
							children: e.date
						}) : null, e.author ? /* @__PURE__ */ i("span", {
							className: "timeline__author",
							children: e.author
						}) : null]
					}) : null,
					e.note ? /* @__PURE__ */ i("p", {
						className: "timeline__note",
						children: e.note
					}) : null,
					e.actions ? /* @__PURE__ */ i("div", {
						className: "timeline__actions",
						children: e.actions
					}) : null
				]
			})]
		}, e.id))
	});
});
//#endregion
export { o as Timeline };

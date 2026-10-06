'use client';
import './loading-region.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Skeleton as n } from "./skeleton.js";
import { useId as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/stories/molecules/LoadingRegion/LoadingRegion.tsx
function o({ label: n, announce: o = !0, children: s, className: c, ...l }) {
	let u = e("spinner"), d = r(), f = ["loading-region", c].filter(Boolean).join(" ");
	return o ? /* @__PURE__ */ a("div", {
		className: f,
		role: "status",
		"aria-busy": "true",
		"aria-labelledby": d,
		...l,
		children: [/* @__PURE__ */ i(t, {
			id: d,
			children: u("label", n)
		}), s]
	}) : /* @__PURE__ */ i("div", {
		className: f,
		"aria-hidden": "true",
		...l,
		children: s
	});
}
function s(e) {
	return Array.from({ length: Math.max(0, Math.floor(e)) }, (e, t) => t);
}
function c({ lines: e = 3, className: t }) {
	return /* @__PURE__ */ i("div", {
		className: ["skeleton-text", t].filter(Boolean).join(" "),
		"aria-hidden": "true",
		children: s(e).map((t) => /* @__PURE__ */ i(n, { className: ["skeleton-text__line", t === e - 1 && e > 1 ? "skeleton-text__line--last" : ""].filter(Boolean).join(" ") }, t))
	});
}
function l({ rows: e = 4, className: t }) {
	return /* @__PURE__ */ i("div", {
		className: ["skeleton-list", t].filter(Boolean).join(" "),
		"aria-hidden": "true",
		children: s(e).map((e) => /* @__PURE__ */ i(n, { className: "skeleton-list__row" }, e))
	});
}
function u({ rows: e = 4, className: t }) {
	return /* @__PURE__ */ a("div", {
		className: ["skeleton-table", t].filter(Boolean).join(" "),
		"aria-hidden": "true",
		children: [/* @__PURE__ */ i(n, { className: "skeleton-table__header" }), s(e).map((e) => /* @__PURE__ */ i(n, { className: "skeleton-table__row" }, e))]
	});
}
function d({ columns: e = 3, rows: t = 2, className: r }) {
	return /* @__PURE__ */ i("div", {
		className: ["skeleton-grid", r].filter(Boolean).join(" "),
		"data-columns": e,
		"aria-hidden": "true",
		children: s(e * t).map((e) => /* @__PURE__ */ i(n, { className: "skeleton-grid__item" }, e))
	});
}
//#endregion
export { o as LoadingRegion, d as SkeletonGrid, l as SkeletonList, u as SkeletonTable, c as SkeletonText };

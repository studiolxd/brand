'use client';
import './loading-region.css';
import { r as e } from "./_shared/brandmessagescontext.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { t as n } from "./_shared/spinner.js";
import { Skeleton as r } from "./skeleton.js";
import { useId as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/stories/molecules/LoadingRegion/LoadingRegion.tsx
function s({ label: r, announce: s = !0, children: c, className: l, ...u }) {
	let d = e("spinner", n), f = i(), p = ["loading-region", l].filter(Boolean).join(" ");
	return s ? /* @__PURE__ */ o("div", {
		className: p,
		role: "status",
		"aria-busy": "true",
		"aria-labelledby": f,
		...u,
		children: [/* @__PURE__ */ a(t, {
			id: f,
			children: d("label", r)
		}), c]
	}) : /* @__PURE__ */ a("div", {
		className: p,
		"aria-hidden": "true",
		...u,
		children: c
	});
}
function c(e) {
	return Array.from({ length: Math.max(0, Math.floor(e)) }, (e, t) => t);
}
function l({ lines: e = 3, className: t }) {
	return /* @__PURE__ */ a("div", {
		className: ["skeleton-text", t].filter(Boolean).join(" "),
		"aria-hidden": "true",
		children: c(e).map((t) => /* @__PURE__ */ a(r, { className: ["skeleton-text__line", t === e - 1 && e > 1 ? "skeleton-text__line--last" : ""].filter(Boolean).join(" ") }, t))
	});
}
function u({ rows: e = 4, className: t }) {
	return /* @__PURE__ */ a("div", {
		className: ["skeleton-list", t].filter(Boolean).join(" "),
		"aria-hidden": "true",
		children: c(e).map((e) => /* @__PURE__ */ a(r, { className: "skeleton-list__row" }, e))
	});
}
function d({ rows: e = 4, className: t }) {
	return /* @__PURE__ */ o("div", {
		className: ["skeleton-table", t].filter(Boolean).join(" "),
		"aria-hidden": "true",
		children: [/* @__PURE__ */ a(r, { className: "skeleton-table__header" }), c(e).map((e) => /* @__PURE__ */ a(r, { className: "skeleton-table__row" }, e))]
	});
}
function f({ columns: e = 3, rows: t = 2, className: n }) {
	return /* @__PURE__ */ a("div", {
		className: ["skeleton-grid", n].filter(Boolean).join(" "),
		"data-columns": e,
		"aria-hidden": "true",
		children: c(e * t).map((e) => /* @__PURE__ */ a(r, { className: "skeleton-grid__item" }, e))
	});
}
//#endregion
export { s as LoadingRegion, f as SkeletonGrid, u as SkeletonList, d as SkeletonTable, l as SkeletonText };

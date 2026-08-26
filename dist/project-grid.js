'use client';
import './project-grid.css';
import { ProjectCard as e } from "./project-card.js";
import { useState as t } from "react";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/organisms/ProjectGrid/ProjectGrid.tsx
function i({ projects: i, hideTags: a = !1, className: o }) {
	let [s, c] = t(() => new Set(i.map((e) => e.tagVariant ?? "neutral"))), l = i.reduce((e, t) => {
		let n = t.tagVariant ?? "neutral";
		return e.some((e) => e.variant === n) || e.push({
			variant: n,
			label: t.category
		}), e;
	}, []), u = i.map((e) => e.tagVariant ?? "neutral"), d = (e) => {
		c((t) => {
			let n = new Set(t);
			return n.has(e) ? n.delete(e) : n.add(e), n.size === 0 ? new Set(u) : n;
		});
	}, f = i.filter((e) => s.has(e.tagVariant ?? "neutral")), p = (2 - f.length % 2) % 2, m = f.length >= 7 ? (6 - (f.length - 7) % 6) % 6 : 7 - f.length, h = Math.max(p, m), g = Math.min(p, m);
	return /* @__PURE__ */ r("div", {
		className: ["project-grid-wrapper", o].filter(Boolean).join(" "),
		children: [!a && /* @__PURE__ */ n("div", {
			className: "project-grid__filter",
			children: l.map(({ variant: e, label: t }) => /* @__PURE__ */ n("button", {
				className: [
					"tag",
					`tag--${e}`,
					s.has(e) ? "project-grid__tag--active" : ""
				].filter(Boolean).join(" "),
				onClick: () => d(e),
				children: t
			}, e))
		}), /* @__PURE__ */ r("div", {
			className: "project-grid",
			children: [f.map((t) => /* @__PURE__ */ n(e, {
				project: t,
				hideTag: a
			}, t.id)), Array.from({ length: h }).map((e, t) => /* @__PURE__ */ n("div", {
				className: [
					"project-grid__empty",
					t >= g && m > p && "project-grid__empty--xl-only",
					t >= g && p > m && "project-grid__empty--md-only"
				].filter(Boolean).join(" "),
				"aria-hidden": "true"
			}, `empty-${t}`))]
		})]
	});
}
//#endregion
export { i as ProjectGrid };

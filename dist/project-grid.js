'use client';
import './project-grid.css';
import { ProjectCard as e } from "./project-card.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import { useState as r } from "react";
//#region src/stories/organisms/ProjectGrid/ProjectGrid.tsx
function i({ projects: i, hideTags: a = !1, className: o }) {
	let [s, c] = r(() => new Set(i.map((e) => e.tagVariant ?? "default"))), l = i.reduce((e, t) => {
		let n = t.tagVariant ?? "default";
		return e.some((e) => e.variant === n) || e.push({
			variant: n,
			label: t.category
		}), e;
	}, []), u = i.map((e) => e.tagVariant ?? "default"), d = (e) => {
		c((t) => {
			let n = new Set(t);
			return n.has(e) ? n.delete(e) : n.add(e), n.size === 0 ? new Set(u) : n;
		});
	}, f = i.filter((e) => s.has(e.tagVariant ?? "default")), p = (2 - f.length % 2) % 2, m = f.length >= 7 ? (6 - (f.length - 7) % 6) % 6 : 7 - f.length, h = Math.max(p, m), g = Math.min(p, m);
	return /* @__PURE__ */ n("div", {
		className: ["project-grid-wrapper", o].filter(Boolean).join(" "),
		children: [!a && /* @__PURE__ */ t("div", {
			className: "project-grid__filter",
			children: l.map(({ variant: e, label: n }) => /* @__PURE__ */ t("button", {
				className: [
					"tag",
					`tag--${e}`,
					s.has(e) ? "project-grid__tag--active" : ""
				].filter(Boolean).join(" "),
				onClick: () => d(e),
				children: n
			}, e))
		}), /* @__PURE__ */ n("div", {
			className: "project-grid",
			children: [f.map((n) => /* @__PURE__ */ t(e, {
				project: n,
				hideTag: a
			}, n.id)), Array.from({ length: h }).map((e, n) => /* @__PURE__ */ t("div", {
				className: [
					"project-grid__empty",
					n >= g && m > p && "project-grid__empty--xl-only",
					n >= g && p > m && "project-grid__empty--md-only"
				].filter(Boolean).join(" "),
				"aria-hidden": "true"
			}, `empty-${n}`))]
		})]
	});
}
//#endregion
export { i as ProjectGrid };

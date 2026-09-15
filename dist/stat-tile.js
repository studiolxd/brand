import './stat-tile.css';
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Tag as n } from "./tag.js";
import { forwardRef as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/stories/molecules/StatTile/StatTile.tsx
var o = {
	up: "positive",
	down: "negative",
	flat: "neutral"
}, s = {
	positive: "success",
	negative: "danger",
	neutral: "neutral"
}, c = {
	up: "Sube",
	down: "Baja",
	flat: "Sin cambio"
}, l = r(function({ label: r, value: l, delta: u, description: d, icon: f, size: p = "md", className: m, ...h }, g) {
	let _ = [
		"stat-tile",
		p === "md" ? "" : `stat-tile--${p}`,
		m ?? ""
	].filter(Boolean).join(" "), v = u?.direction ?? "flat", y = u?.tone ?? o[v], b = u?.label ?? c[v];
	return /* @__PURE__ */ a("div", {
		ref: g,
		className: _,
		...h,
		children: [
			/* @__PURE__ */ a("p", {
				className: "stat-tile__label",
				children: [f && /* @__PURE__ */ i("span", {
					className: "stat-tile__icon",
					"aria-hidden": "true",
					children: f
				}), r]
			}),
			/* @__PURE__ */ i("p", {
				className: "stat-tile__value",
				children: l
			}),
			u && /* @__PURE__ */ a(n, {
				variant: s[y],
				className: "stat-tile__delta",
				children: [
					/* @__PURE__ */ i(e, {
						name: "arrow",
						size: "sm",
						className: `stat-tile__delta-icon stat-tile__delta-icon--${v}`
					}),
					/* @__PURE__ */ i(t, { children: b }),
					u.value
				]
			}),
			d && /* @__PURE__ */ i("p", {
				className: "stat-tile__description",
				children: d
			})
		]
	});
});
//#endregion
export { l as StatTile };

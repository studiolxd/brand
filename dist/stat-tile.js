import './stat-tile.css';
import { Icon as e } from "./icon.js";
import { VisuallyHidden as t } from "./visually-hidden.js";
import { Tag as n } from "./tag.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import { forwardRef as a } from "react";
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
}, l = a(function({ label: a, value: l, delta: u, description: d, icon: f, size: p = "md", className: m, ...h }, g) {
	let _ = [
		"stat-tile",
		p === "md" ? "" : `stat-tile--${p}`,
		m ?? ""
	].filter(Boolean).join(" "), v = u?.direction ?? "flat", y = u?.tone ?? o[v], b = u?.label ?? c[v];
	return /* @__PURE__ */ i("div", {
		ref: g,
		className: _,
		...h,
		children: [
			/* @__PURE__ */ i("p", {
				className: "stat-tile__label",
				children: [f && /* @__PURE__ */ r("span", {
					className: "stat-tile__icon",
					"aria-hidden": "true",
					children: f
				}), a]
			}),
			/* @__PURE__ */ r("p", {
				className: "stat-tile__value",
				children: l
			}),
			u && /* @__PURE__ */ i(n, {
				variant: s[y],
				className: "stat-tile__delta",
				children: [
					/* @__PURE__ */ r(e, {
						name: "arrow",
						size: "sm",
						className: `stat-tile__delta-icon stat-tile__delta-icon--${v}`
					}),
					/* @__PURE__ */ r(t, { children: b }),
					u.value
				]
			}),
			d && /* @__PURE__ */ r("p", {
				className: "stat-tile__description",
				children: d
			})
		]
	});
});
//#endregion
export { l as StatTile };

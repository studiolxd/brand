'use client';
import './org-chart.css';
import { r as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { Button as n } from "./button.js";
import { t as r } from "./_shared/css-properties.js";
import { forwardRef as i, useState as a } from "react";
import { Fragment as o, jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/stories/messages/es/orgChart.ts
var l = {
	label: "Organigrama",
	managers: "Responsables",
	members: "Equipo",
	noManagers: "Sin responsable",
	noMembers: "Sin equipo",
	collapse: (e) => `Plegar ${e}`,
	expand: (e) => `Desplegar ${e}`,
	zoomIn: "Acercar",
	zoomOut: "Alejar",
	zoomReset: "Tamaño natural"
}, u = (e, t, n) => Math.min(n, Math.max(t, e)), d = i(function({ nodes: i, collapsed: d, defaultCollapsed: f, onCollapsedChange: p, zoom: m, defaultZoom: h = 1, onZoomChange: g, minZoom: _ = .5, maxZoom: v = 1.5, zoomStep: y = .1, showZoom: b = !0, toolbar: x, showPeople: S = !0, label: C, managersLabel: w, membersLabel: T, className: E, ...D }, O) {
	let k = e("orgChart", l), [A, j] = a(f ?? []), M = d ?? A, [N, P] = a(h), F = u(m ?? N, _, v), I = r({ "--org-chart-zoom": String(F) }), L = (e) => {
		let t = M.includes(e) ? M.filter((t) => t !== e) : [...M, e];
		d === void 0 && j(t), p?.(t);
	}, R = (e) => {
		let t = u(Number(e.toFixed(4)), _, v);
		m === void 0 && P(t), g?.(t);
	}, z = (e, t, n) => /* @__PURE__ */ c("div", {
		className: "org-chart__group",
		children: [/* @__PURE__ */ s("span", {
			className: "org-chart__group-label",
			children: t
		}), e && e.length > 0 ? /* @__PURE__ */ s("ul", {
			className: "org-chart__people",
			children: e.map((e) => /* @__PURE__ */ c("li", {
				className: "org-chart__person",
				children: [e.label ?? e.name, e.role ? /* @__PURE__ */ s("span", {
					className: "org-chart__role",
					children: e.role
				}) : null]
			}, e.id))
		}) : /* @__PURE__ */ s("span", {
			className: "org-chart__empty",
			children: n
		})]
	}), B = (e, r) => /* @__PURE__ */ s("ul", {
		className: ["org-chart__level", r ? "org-chart__level--root" : "org-chart__level--children"].join(" "),
		children: e.map((e) => {
			let r = e.children ?? [], i = M.includes(e.id), a = r.length > 0 && !i;
			return /* @__PURE__ */ c("li", {
				className: "org-chart__node",
				children: [/* @__PURE__ */ c("div", {
					className: "org-chart__card",
					children: [/* @__PURE__ */ c("div", {
						className: "org-chart__header",
						children: [/* @__PURE__ */ s("p", {
							className: "org-chart__name",
							children: e.label ?? e.name
						}), r.length > 0 ? /* @__PURE__ */ s(n, {
							type: "button",
							variant: "ghost",
							size: "sm",
							iconOnly: !0,
							"aria-label": i ? k("expand")(e.name) : k("collapse")(e.name),
							"aria-expanded": !i,
							onClick: () => L(e.id),
							children: /* @__PURE__ */ s(t, {
								name: i ? "chevron-right" : "chevron-down",
								size: "sm"
							})
						}) : null]
					}), S ? /* @__PURE__ */ c("div", { children: [z(e.managers, k("managers", w), k("noManagers")), z(e.members, k("members", T), k("noMembers"))] }) : null]
				}), a ? B(r, !1) : null]
			}, e.id);
		})
	});
	return /* @__PURE__ */ c("div", {
		ref: O,
		className: ["org-chart", E].filter(Boolean).join(" "),
		...D,
		children: [b || x ? /* @__PURE__ */ c("div", {
			className: "org-chart__toolbar",
			children: [b ? /* @__PURE__ */ c(o, { children: [
				/* @__PURE__ */ s(n, {
					type: "button",
					variant: "outline",
					size: "sm",
					iconOnly: !0,
					"aria-label": k("zoomOut"),
					disabled: F <= _,
					onClick: () => R(F - y),
					children: /* @__PURE__ */ s(t, {
						name: "zoom-out",
						size: "sm"
					})
				}),
				/* @__PURE__ */ s(n, {
					type: "button",
					variant: "outline",
					size: "sm",
					iconOnly: !0,
					"aria-label": k("zoomIn"),
					disabled: F >= v,
					onClick: () => R(F + y),
					children: /* @__PURE__ */ s(t, {
						name: "zoom-in",
						size: "sm"
					})
				}),
				/* @__PURE__ */ s(n, {
					type: "button",
					variant: "text",
					size: "sm",
					disabled: F === 1,
					onClick: () => R(1),
					children: k("zoomReset")
				})
			] }) : null, x]
		}) : null, /* @__PURE__ */ s("div", {
			className: "org-chart__viewport",
			tabIndex: 0,
			role: "group",
			"aria-label": k("label", C),
			children: /* @__PURE__ */ s("div", {
				className: "org-chart__canvas",
				ref: I,
				children: B(i, !0)
			})
		})]
	});
});
//#endregion
export { d as OrgChart };

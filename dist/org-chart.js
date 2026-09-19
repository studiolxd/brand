'use client';
import './org-chart.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { Button as n } from "./button.js";
import { t as r } from "./_shared/css-properties.js";
import { forwardRef as i, useState as a } from "react";
import { Fragment as o, jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/stories/organisms/OrgChart/OrgChart.tsx
var l = (e, t, n) => Math.min(n, Math.max(t, e)), u = i(function({ nodes: i, collapsed: u, defaultCollapsed: d, onCollapsedChange: f, zoom: p, defaultZoom: m = 1, onZoomChange: h, minZoom: g = .5, maxZoom: _ = 1.5, zoomStep: v = .1, showZoom: y = !0, toolbar: b, showPeople: x = !0, label: S, managersLabel: C, membersLabel: w, className: T, ...E }, D) {
	let O = e("orgChart"), [k, A] = a(d ?? []), j = u ?? k, [M, N] = a(m), P = l(p ?? M, g, _), F = r({ "--org-chart-zoom": String(P) }), I = (e) => {
		let t = j.includes(e) ? j.filter((t) => t !== e) : [...j, e];
		u === void 0 && A(t), f?.(t);
	}, L = (e) => {
		let t = l(Number(e.toFixed(4)), g, _);
		p === void 0 && N(t), h?.(t);
	}, R = (e, t, n) => /* @__PURE__ */ c("div", {
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
	}), z = (e, r) => /* @__PURE__ */ s("ul", {
		className: ["org-chart__level", r ? "org-chart__level--root" : "org-chart__level--children"].join(" "),
		children: e.map((e) => {
			let r = e.children ?? [], i = j.includes(e.id), a = r.length > 0 && !i;
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
							"aria-label": i ? O("expand")(e.name) : O("collapse")(e.name),
							"aria-expanded": !i,
							onClick: () => I(e.id),
							children: /* @__PURE__ */ s(t, {
								name: i ? "chevron-right" : "chevron-down",
								size: "sm"
							})
						}) : null]
					}), x ? /* @__PURE__ */ c("div", { children: [R(e.managers, O("managers", C), O("noManagers")), R(e.members, O("members", w), O("noMembers"))] }) : null]
				}), a ? z(r, !1) : null]
			}, e.id);
		})
	});
	return /* @__PURE__ */ c("div", {
		ref: D,
		className: ["org-chart", T].filter(Boolean).join(" "),
		...E,
		children: [y || b ? /* @__PURE__ */ c("div", {
			className: "org-chart__toolbar",
			children: [y ? /* @__PURE__ */ c(o, { children: [
				/* @__PURE__ */ s(n, {
					type: "button",
					variant: "outline",
					size: "sm",
					iconOnly: !0,
					"aria-label": O("zoomOut"),
					disabled: P <= g,
					onClick: () => L(P - v),
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
					"aria-label": O("zoomIn"),
					disabled: P >= _,
					onClick: () => L(P + v),
					children: /* @__PURE__ */ s(t, {
						name: "zoom-in",
						size: "sm"
					})
				}),
				/* @__PURE__ */ s(n, {
					type: "button",
					variant: "text",
					size: "sm",
					disabled: P === 1,
					onClick: () => L(1),
					children: O("zoomReset")
				})
			] }) : null, b]
		}) : null, /* @__PURE__ */ s("div", {
			className: "org-chart__viewport",
			tabIndex: 0,
			role: "group",
			"aria-label": O("label", S),
			children: /* @__PURE__ */ s("div", {
				className: "org-chart__canvas",
				ref: F,
				children: z(i, !0)
			})
		})]
	});
});
//#endregion
export { u as OrgChart };

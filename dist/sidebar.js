'use client';
import './sidebar.css';
import { r as e } from "./_shared/brandmessagescontext.js";
import { n as t, t as n } from "./_shared/sidebarcontext.js";
import { t as r } from "./_shared/appshellcontext.js";
import { useCallback as i, useContext as a, useEffect as o, useRef as s, useState as c } from "react";
import { jsx as l, jsxs as u } from "react/jsx-runtime";
//#region src/stories/messages/es/sidebar.ts
var d = {
	label: "Barra lateral",
	resizer: "Ancho de la barra lateral",
	resizerValue: (e) => `${e} píxeles`
};
//#endregion
//#region src/stories/sections/Sidebar/Sidebar.tsx
function f(e, t) {
	let n = document.createElement("div");
	n.style.position = "absolute", n.style.inlineSize = `var(${t})`, e.appendChild(n);
	let r = parseFloat(getComputedStyle(n).inlineSize);
	return n.remove(), r;
}
function p({ logo: t, children: p, footer: m, id: h, label: g, resizerLabel: _, resizerValueText: v, mode: y, className: b }) {
	let x = e("sidebar", d), S = a(r), C = S ? S.sidebar : y ?? "open", w = S ? S.isDesktop : !0, T = w && C === "rail", E = !w, D = s(null), O = s(null), [k, A] = c(null);
	o(() => {
		let e = D.current;
		if (!e) return;
		let t = {
			min: f(e, "--sidebar-min-width"),
			max: f(e, "--sidebar-max-width"),
			rail: f(e, "--sidebar-rail-width"),
			base: f(e, "--sidebar-width")
		};
		Object.values(t).every(Number.isFinite) && A(t);
	}, []);
	let j = (e) => {
		!E || !S || e.target.closest("a[href], [aria-haspopup=\"dialog\"]") && S.closeSidebar();
	}, M = i((e) => {
		let t = D.current;
		if (!t || !S) return;
		let n = f(t, "--sidebar-min-width"), r = f(t, "--sidebar-max-width");
		e < f(t, "--sidebar-rail-width") ? S.setSidebar("closed") : e < n ? S.setSidebar("rail") : (S.setSidebar("open"), S.setSidebarWidth(Math.min(r, Math.round(e))));
	}, [S]), N = (e) => {
		if (!D.current) return;
		e.preventDefault();
		let t = e.currentTarget;
		t.setPointerCapture(e.pointerId), t.dataset.dragging = "true";
		let n = D.current.getBoundingClientRect().left, r = (e) => M(e.clientX - n), i = () => {
			delete t.dataset.dragging, t.removeEventListener("pointermove", r), t.removeEventListener("pointerup", i), t.removeEventListener("pointercancel", i);
		};
		t.addEventListener("pointermove", r), t.addEventListener("pointerup", i), t.addEventListener("pointercancel", i);
	}, P = (e) => {
		if (!D.current || !S) return;
		let t = f(D.current, "--sidebar-resize-step-px"), n = D.current.getBoundingClientRect().width;
		e.key === "ArrowLeft" && (e.preventDefault(), M(n - t)), e.key === "ArrowRight" && (e.preventDefault(), C === "open" ? M(n + t) : S.setSidebar("open")), e.key === "Home" && (e.preventDefault(), S.setSidebar("rail")), e.key === "End" && (e.preventDefault(), M(f(D.current, "--sidebar-max-width")));
	};
	o(() => {
		if (!E) return;
		if (C === "open") {
			O.current = document.activeElement, D.current?.focus();
			return;
		}
		let e = D.current, t = document.activeElement;
		(e && t instanceof Node && e.contains(t) || t === document.body || t === null) && O.current?.focus?.(), O.current = null;
	}, [E, C]);
	let F = Math.round(C === "rail" ? k?.rail ?? 0 : (S?.sidebarWidth || k?.base) ?? 0), I = [
		"sidebar",
		E ? "sidebar--drawer" : `sidebar--${C}`,
		b
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ l(n.Provider, {
		value: { rail: T },
		children: /* @__PURE__ */ u("aside", {
			ref: D,
			id: h,
			className: I,
			"aria-label": x("label", g),
			role: E && C === "open" ? "dialog" : void 0,
			"aria-modal": E && C === "open" ? !0 : void 0,
			"data-state": C,
			tabIndex: E ? -1 : void 0,
			inert: E && C === "closed" ? !0 : void 0,
			onClick: j,
			children: [/* @__PURE__ */ u("div", {
				className: "sidebar__inner",
				children: [
					t && /* @__PURE__ */ l("div", {
						className: "sidebar__header",
						children: t
					}),
					/* @__PURE__ */ l("div", {
						className: "sidebar__panel",
						children: p
					}),
					m && /* @__PURE__ */ l("div", {
						className: "sidebar__footer",
						children: m
					})
				]
			}), w && S && C !== "closed" && /* @__PURE__ */ l("div", {
				className: "sidebar__resizer",
				role: "separator",
				"aria-orientation": "vertical",
				"aria-label": x("resizer", _),
				"aria-valuenow": F,
				"aria-valuemin": k ? Math.round(k.rail) : void 0,
				"aria-valuemax": k ? Math.round(k.max) : void 0,
				"aria-valuetext": x("resizerValue", v)(F),
				tabIndex: 0,
				onPointerDown: N,
				onKeyDown: P
			})]
		})
	});
}
function m({ className: e, ...t }) {
	return /* @__PURE__ */ l("div", {
		className: ["sidebar__group", e].filter(Boolean).join(" "),
		...t
	});
}
function h({ className: e, ...t }) {
	return /* @__PURE__ */ l("div", {
		className: ["sidebar__group-content", e].filter(Boolean).join(" "),
		...t
	});
}
function g({ className: e, ...t }) {
	return /* @__PURE__ */ l("hr", {
		className: ["sidebar__separator", e].filter(Boolean).join(" "),
		...t
	});
}
//#endregion
export { p as Sidebar, m as SidebarGroup, h as SidebarGroupContent, g as SidebarSeparator, t as useSidebar };

'use client';
import './sidebar.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { n as t, t as n } from "./_shared/sidebarcontext.js";
import { t as r } from "./_shared/appshellcontext.js";
import { useCallback as i, useContext as a, useEffect as o, useRef as s, useState as c } from "react";
import { jsx as l, jsxs as u } from "react/jsx-runtime";
//#region src/stories/sections/Sidebar/Sidebar.tsx
function d(e, t) {
	let n = document.createElement("div");
	n.style.position = "absolute", n.style.inlineSize = `var(${t})`, e.appendChild(n);
	let r = parseFloat(getComputedStyle(n).inlineSize);
	return n.remove(), r;
}
function f({ logo: t, children: f, footer: p, id: m, label: h, resizerLabel: g, resizerValueText: _, mode: v, className: y }) {
	let b = e("sidebar"), x = a(r), S = x ? x.sidebar : v ?? "open", C = x ? x.isDesktop : !0, w = C && S === "rail", T = !C, E = s(null), D = s(null), [O, k] = c(null);
	o(() => {
		let e = E.current;
		if (!e) return;
		let t = {
			min: d(e, "--sidebar-min-width"),
			max: d(e, "--sidebar-max-width"),
			rail: d(e, "--sidebar-rail-width"),
			base: d(e, "--sidebar-width")
		};
		Object.values(t).every(Number.isFinite) && k(t);
	}, []);
	let A = (e) => {
		!T || !x || e.target.closest("a[href], [aria-haspopup=\"dialog\"]") && x.closeSidebar();
	}, j = i((e) => {
		let t = E.current;
		if (!t || !x) return;
		let n = d(t, "--sidebar-min-width"), r = d(t, "--sidebar-max-width");
		e < d(t, "--sidebar-rail-width") ? x.setSidebar("closed") : e < n ? x.setSidebar("rail") : (x.setSidebar("open"), x.setSidebarWidth(Math.min(r, Math.round(e))));
	}, [x]), M = (e) => {
		if (!E.current) return;
		e.preventDefault();
		let t = e.currentTarget;
		t.setPointerCapture(e.pointerId), t.dataset.dragging = "true";
		let n = E.current.getBoundingClientRect().left, r = (e) => j(e.clientX - n), i = () => {
			delete t.dataset.dragging, t.removeEventListener("pointermove", r), t.removeEventListener("pointerup", i), t.removeEventListener("pointercancel", i);
		};
		t.addEventListener("pointermove", r), t.addEventListener("pointerup", i), t.addEventListener("pointercancel", i);
	}, N = (e) => {
		if (!E.current || !x) return;
		let t = d(E.current, "--sidebar-resize-step-px"), n = E.current.getBoundingClientRect().width;
		e.key === "ArrowLeft" && (e.preventDefault(), j(n - t)), e.key === "ArrowRight" && (e.preventDefault(), S === "open" ? j(n + t) : x.setSidebar("open")), e.key === "Home" && (e.preventDefault(), x.setSidebar("rail")), e.key === "End" && (e.preventDefault(), j(d(E.current, "--sidebar-max-width")));
	};
	o(() => {
		if (!T) return;
		if (S === "open") {
			D.current = document.activeElement, E.current?.focus();
			return;
		}
		let e = E.current, t = document.activeElement;
		(e && t instanceof Node && e.contains(t) || t === document.body || t === null) && D.current?.focus?.(), D.current = null;
	}, [T, S]);
	let P = Math.round(S === "rail" ? O?.rail ?? 0 : (x?.sidebarWidth || O?.base) ?? 0), F = [
		"sidebar",
		T ? "sidebar--drawer" : `sidebar--${S}`,
		y
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ l(n.Provider, {
		value: { rail: w },
		children: /* @__PURE__ */ u("aside", {
			ref: E,
			id: m,
			className: F,
			"aria-label": b("label", h),
			role: T && S === "open" ? "dialog" : void 0,
			"aria-modal": T && S === "open" ? !0 : void 0,
			"data-state": S,
			tabIndex: T ? -1 : void 0,
			inert: T && S === "closed" ? !0 : void 0,
			onClick: A,
			children: [/* @__PURE__ */ u("div", {
				className: "sidebar__inner",
				children: [
					t && /* @__PURE__ */ l("div", {
						className: "sidebar__header",
						children: t
					}),
					/* @__PURE__ */ l("div", {
						className: "sidebar__panel",
						children: f
					}),
					p && /* @__PURE__ */ l("div", {
						className: "sidebar__footer",
						children: p
					})
				]
			}), C && x && S !== "closed" && /* @__PURE__ */ l("div", {
				className: "sidebar__resizer",
				role: "separator",
				"aria-orientation": "vertical",
				"aria-label": b("resizer", g),
				"aria-valuenow": P,
				"aria-valuemin": O ? Math.round(O.rail) : void 0,
				"aria-valuemax": O ? Math.round(O.max) : void 0,
				"aria-valuetext": b("resizerValue", _)(P),
				tabIndex: 0,
				onPointerDown: M,
				onKeyDown: N
			})]
		})
	});
}
function p({ className: e, ...t }) {
	return /* @__PURE__ */ l("div", {
		className: ["sidebar__group", e].filter(Boolean).join(" "),
		...t
	});
}
function m({ className: e, ...t }) {
	return /* @__PURE__ */ l("div", {
		className: ["sidebar__group-content", e].filter(Boolean).join(" "),
		...t
	});
}
function h({ className: e, ...t }) {
	return /* @__PURE__ */ l("hr", {
		className: ["sidebar__separator", e].filter(Boolean).join(" "),
		...t
	});
}
//#endregion
export { f as Sidebar, p as SidebarGroup, m as SidebarGroupContent, h as SidebarSeparator, t as useSidebar };

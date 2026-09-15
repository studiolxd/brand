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
function f({ logo: t, children: f, footer: p, id: m, label: h, resizerLabel: g, resizerValueText: _, mode: v }) {
	let y = e("sidebar"), b = a(r), x = b ? b.sidebar : v ?? "open", S = b ? b.isDesktop : !0, C = S && x === "rail", w = !S, T = s(null), E = s(null), [D, O] = c(null);
	o(() => {
		let e = T.current;
		if (!e) return;
		let t = {
			min: d(e, "--sidebar-min-width"),
			max: d(e, "--sidebar-max-width"),
			rail: d(e, "--sidebar-rail-width"),
			base: d(e, "--sidebar-width")
		};
		Object.values(t).every(Number.isFinite) && O(t);
	}, []);
	let k = (e) => {
		!w || !b || e.target.closest("a[href], [aria-haspopup=\"dialog\"]") && b.closeSidebar();
	}, A = i((e) => {
		let t = T.current;
		if (!t || !b) return;
		let n = d(t, "--sidebar-min-width"), r = d(t, "--sidebar-max-width");
		e < d(t, "--sidebar-rail-width") ? b.setSidebar("closed") : e < n ? b.setSidebar("rail") : (b.setSidebar("open"), b.setSidebarWidth(Math.min(r, Math.round(e))));
	}, [b]), j = (e) => {
		if (!T.current) return;
		e.preventDefault();
		let t = e.currentTarget;
		t.setPointerCapture(e.pointerId), t.dataset.dragging = "true";
		let n = T.current.getBoundingClientRect().left, r = (e) => A(e.clientX - n), i = () => {
			delete t.dataset.dragging, t.removeEventListener("pointermove", r), t.removeEventListener("pointerup", i), t.removeEventListener("pointercancel", i);
		};
		t.addEventListener("pointermove", r), t.addEventListener("pointerup", i), t.addEventListener("pointercancel", i);
	}, M = (e) => {
		if (!T.current || !b) return;
		let t = d(T.current, "--sidebar-resize-step-px"), n = T.current.getBoundingClientRect().width;
		e.key === "ArrowLeft" && (e.preventDefault(), A(n - t)), e.key === "ArrowRight" && (e.preventDefault(), x === "open" ? A(n + t) : b.setSidebar("open")), e.key === "Home" && (e.preventDefault(), b.setSidebar("rail")), e.key === "End" && (e.preventDefault(), A(d(T.current, "--sidebar-max-width")));
	};
	o(() => {
		if (!w) return;
		if (x === "open") {
			E.current = document.activeElement, T.current?.focus();
			return;
		}
		let e = T.current, t = document.activeElement;
		(e && t instanceof Node && e.contains(t) || t === document.body || t === null) && E.current?.focus?.(), E.current = null;
	}, [w, x]);
	let N = Math.round(x === "rail" ? D?.rail ?? 0 : (b?.sidebarWidth || D?.base) ?? 0), P = ["sidebar", w ? "sidebar--drawer" : `sidebar--${x}`].join(" ");
	return /* @__PURE__ */ l(n.Provider, {
		value: { rail: C },
		children: /* @__PURE__ */ u("aside", {
			ref: T,
			id: m,
			className: P,
			"aria-label": y("label", h),
			role: w && x === "open" ? "dialog" : void 0,
			"aria-modal": w && x === "open" ? !0 : void 0,
			"data-state": x,
			tabIndex: w ? -1 : void 0,
			inert: w && x === "closed" ? !0 : void 0,
			onClick: k,
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
			}), S && b && x !== "closed" && /* @__PURE__ */ l("div", {
				className: "sidebar__resizer",
				role: "separator",
				"aria-orientation": "vertical",
				"aria-label": y("resizer", g),
				"aria-valuenow": N,
				"aria-valuemin": D ? Math.round(D.rail) : void 0,
				"aria-valuemax": D ? Math.round(D.max) : void 0,
				"aria-valuetext": y("resizerValue", _)(N),
				tabIndex: 0,
				onPointerDown: j,
				onKeyDown: M
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

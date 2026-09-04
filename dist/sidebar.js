'use client';
import './sidebar.css';
import { n as e, t } from "./_shared/SidebarContext.js";
import { t as n } from "./_shared/AppShellContext.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import { useCallback as a, useContext as o, useEffect as s, useRef as c, useState as l } from "react";
//#region src/stories/sections/Sidebar/Sidebar.tsx
function u(e, t) {
	let n = document.createElement("div");
	n.style.position = "absolute", n.style.inlineSize = `var(${t})`, e.appendChild(n);
	let r = parseFloat(getComputedStyle(n).inlineSize);
	return n.remove(), r;
}
function d({ logo: e, children: d, footer: f, id: p, label: m = "Barra lateral", resizerLabel: h = "Ancho de la barra lateral", resizerValueText: g = (e) => `${e} píxeles`, mode: _ }) {
	let v = o(n), y = v ? v.sidebar : _ ?? "open", b = v ? v.isDesktop : !0, x = b && y === "rail", S = !b, C = c(null), w = c(null), [T, E] = l(null);
	s(() => {
		let e = C.current;
		if (!e) return;
		let t = {
			min: u(e, "--sidebar-min-width"),
			max: u(e, "--sidebar-max-width"),
			rail: u(e, "--sidebar-rail-width"),
			base: u(e, "--sidebar-width")
		};
		Object.values(t).every(Number.isFinite) && E(t);
	}, []);
	let D = (e) => {
		!S || !v || e.target.closest("a[href]") && v.closeSidebar();
	}, O = a((e) => {
		let t = C.current;
		if (!t || !v) return;
		let n = u(t, "--sidebar-min-width"), r = u(t, "--sidebar-max-width");
		e < u(t, "--sidebar-rail-width") ? v.setSidebar("closed") : e < n ? v.setSidebar("rail") : (v.setSidebar("open"), v.setSidebarWidth(Math.min(r, Math.round(e))));
	}, [v]), k = (e) => {
		if (!C.current) return;
		e.preventDefault();
		let t = e.currentTarget;
		t.setPointerCapture(e.pointerId), t.dataset.dragging = "true";
		let n = C.current.getBoundingClientRect().left, r = (e) => O(e.clientX - n), i = () => {
			delete t.dataset.dragging, t.removeEventListener("pointermove", r), t.removeEventListener("pointerup", i), t.removeEventListener("pointercancel", i);
		};
		t.addEventListener("pointermove", r), t.addEventListener("pointerup", i), t.addEventListener("pointercancel", i);
	}, A = (e) => {
		if (!C.current || !v) return;
		let t = u(C.current, "--sidebar-resize-step-px"), n = C.current.getBoundingClientRect().width;
		e.key === "ArrowLeft" && (e.preventDefault(), O(n - t)), e.key === "ArrowRight" && (e.preventDefault(), y === "open" ? O(n + t) : v.setSidebar("open")), e.key === "Home" && (e.preventDefault(), v.setSidebar("rail")), e.key === "End" && (e.preventDefault(), O(u(C.current, "--sidebar-max-width")));
	};
	s(() => {
		if (!S) return;
		if (y === "open") {
			w.current = document.activeElement, C.current?.focus();
			return;
		}
		let e = C.current, t = document.activeElement;
		(e && t instanceof Node && e.contains(t) || t === document.body || t === null) && w.current?.focus?.(), w.current = null;
	}, [S, y]);
	let j = Math.round(y === "rail" ? T?.rail ?? 0 : (v?.sidebarWidth || T?.base) ?? 0), M = ["sidebar", S ? "sidebar--drawer" : `sidebar--${y}`].join(" ");
	return /* @__PURE__ */ r(t.Provider, {
		value: { rail: x },
		children: /* @__PURE__ */ i("aside", {
			ref: C,
			id: p,
			className: M,
			"aria-label": m,
			role: S && y === "open" ? "dialog" : void 0,
			"aria-modal": S && y === "open" ? !0 : void 0,
			"data-state": y,
			tabIndex: S ? -1 : void 0,
			inert: S && y === "closed" ? !0 : void 0,
			onClick: D,
			children: [/* @__PURE__ */ i("div", {
				className: "sidebar__inner",
				children: [
					e && /* @__PURE__ */ r("div", {
						className: "sidebar__header",
						children: e
					}),
					/* @__PURE__ */ r("div", {
						className: "sidebar__panel",
						children: d
					}),
					f && /* @__PURE__ */ r("div", {
						className: "sidebar__footer",
						children: f
					})
				]
			}), b && v && y !== "closed" && /* @__PURE__ */ r("div", {
				className: "sidebar__resizer",
				role: "separator",
				"aria-orientation": "vertical",
				"aria-label": h,
				"aria-valuenow": j,
				"aria-valuemin": T ? Math.round(T.rail) : void 0,
				"aria-valuemax": T ? Math.round(T.max) : void 0,
				"aria-valuetext": g(j),
				tabIndex: 0,
				onPointerDown: k,
				onKeyDown: A
			})]
		})
	});
}
function f({ className: e, ...t }) {
	return /* @__PURE__ */ r("div", {
		className: ["sidebar__group", e].filter(Boolean).join(" "),
		...t
	});
}
function p({ className: e, ...t }) {
	return /* @__PURE__ */ r("div", {
		className: ["sidebar__group-content", e].filter(Boolean).join(" "),
		...t
	});
}
function m({ className: e, ...t }) {
	return /* @__PURE__ */ r("hr", {
		className: ["sidebar__separator", e].filter(Boolean).join(" "),
		...t
	});
}
//#endregion
export { d as Sidebar, f as SidebarGroup, p as SidebarGroupContent, m as SidebarSeparator, e as useSidebar };

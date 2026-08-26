'use client';
import './sidebar.css';
import { n as e, t } from "./_shared/SidebarContext.js";
import { t as n } from "./_shared/AppShellContext.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import { useCallback as a, useContext as o, useEffect as s, useRef as c } from "react";
//#region src/stories/sections/Sidebar/Sidebar.tsx
function l(e, t) {
	let n = document.createElement("div");
	n.style.position = "absolute", n.style.inlineSize = `var(${t})`, e.appendChild(n);
	let r = parseFloat(getComputedStyle(n).inlineSize);
	return n.remove(), r;
}
function u({ logo: e, children: u, footer: d, id: f, label: p = "Barra lateral", resizerLabel: m = "Ancho de la barra lateral", mode: h }) {
	let g = o(n), _ = g ? g.sidebar : h ?? "open", v = g ? g.isDesktop : !0, y = v && _ === "rail", b = !v, x = c(null), S = (e) => {
		!b || !g || e.target.closest("a[href]") && g.closeSidebar();
	}, C = a((e) => {
		let t = x.current;
		if (!t || !g) return;
		let n = l(t, "--sidebar-min-width"), r = l(t, "--sidebar-max-width");
		e < l(t, "--sidebar-rail-width") ? g.setSidebar("closed") : e < n ? g.setSidebar("rail") : g.setSidebarWidth(Math.min(r, Math.round(e)));
	}, [g]), w = (e) => {
		if (!x.current) return;
		e.preventDefault();
		let t = e.currentTarget;
		t.setPointerCapture(e.pointerId), t.dataset.dragging = "true";
		let n = x.current.getBoundingClientRect().left, r = (e) => C(e.clientX - n), i = () => {
			delete t.dataset.dragging, t.removeEventListener("pointermove", r), t.removeEventListener("pointerup", i), t.removeEventListener("pointercancel", i);
		};
		t.addEventListener("pointermove", r), t.addEventListener("pointerup", i), t.addEventListener("pointercancel", i);
	}, T = (e) => {
		if (!x.current || !g) return;
		let t = l(x.current, "--sidebar-resize-step-px"), n = x.current.getBoundingClientRect().width;
		e.key === "ArrowLeft" && (e.preventDefault(), C(n - t)), e.key === "ArrowRight" && (e.preventDefault(), _ === "open" ? C(n + t) : g.setSidebar("open")), e.key === "Home" && (e.preventDefault(), g.setSidebar("rail")), e.key === "End" && (e.preventDefault(), C(l(x.current, "--sidebar-max-width")));
	};
	s(() => {
		b && _ === "open" && x.current?.focus();
	}, [b, _]);
	let E = ["sidebar", b ? "sidebar--drawer" : `sidebar--${_}`].join(" ");
	return /* @__PURE__ */ r(t.Provider, {
		value: { rail: y },
		children: /* @__PURE__ */ i("aside", {
			ref: x,
			id: f,
			className: E,
			"aria-label": p,
			"data-state": _,
			tabIndex: b ? -1 : void 0,
			inert: b && _ === "closed" ? !0 : void 0,
			onClick: S,
			children: [
				e && /* @__PURE__ */ r("div", {
					className: "sidebar__header",
					children: e
				}),
				/* @__PURE__ */ r("div", {
					className: "sidebar__panel",
					children: u
				}),
				d && /* @__PURE__ */ r("div", {
					className: "sidebar__footer",
					children: d
				}),
				v && g && _ !== "closed" && /* @__PURE__ */ r("div", {
					className: "sidebar__resizer",
					role: "separator",
					"aria-orientation": "vertical",
					"aria-label": m,
					"aria-valuenow": _ === "open" ? Math.round(g.sidebarWidth || 0) || void 0 : 0,
					tabIndex: 0,
					onPointerDown: w,
					onKeyDown: T
				})
			]
		})
	});
}
function d({ className: e, ...t }) {
	return /* @__PURE__ */ r("div", {
		className: ["sidebar__group", e].filter(Boolean).join(" "),
		...t
	});
}
function f({ className: e, ...t }) {
	return /* @__PURE__ */ r("div", {
		className: ["sidebar__group-content", e].filter(Boolean).join(" "),
		...t
	});
}
function p({ className: e, ...t }) {
	return /* @__PURE__ */ r("hr", {
		className: ["sidebar__separator", e].filter(Boolean).join(" "),
		...t
	});
}
//#endregion
export { u as Sidebar, d as SidebarGroup, f as SidebarGroupContent, p as SidebarSeparator, e as useSidebar };

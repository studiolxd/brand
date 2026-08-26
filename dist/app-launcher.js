'use client';
import './app-launcher.css';
import { Icon as e } from "./icon.js";
import { i as t, n, r, t as i } from "./_shared/PopoverPopup.js";
import { t as a } from "./_shared/PopoverTrigger.js";
import { Tag as o } from "./tag.js";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/stories/molecules/AppLauncher/AppLauncher.tsx
function l(e) {
	return e.trim().slice(0, 1).toUpperCase();
}
function u({ apps: u, labels: d, currentAppId: f, open: p, defaultOpen: m, onOpenChange: h }) {
	return /* @__PURE__ */ c(t, {
		open: p,
		defaultOpen: m,
		onOpenChange: (e) => h?.(e),
		children: [/* @__PURE__ */ s(a, { render: /* @__PURE__ */ s("button", {
			type: "button",
			className: "app-launcher__trigger",
			"aria-label": d.open,
			children: /* @__PURE__ */ s(e, {
				name: "grid",
				size: "md"
			})
		}) }), /* @__PURE__ */ s(r, { children: /* @__PURE__ */ s(n, {
			className: "app-launcher__positioner",
			sideOffset: 4,
			align: "end",
			children: /* @__PURE__ */ s(i, {
				className: "app-launcher__content",
				children: /* @__PURE__ */ s("ul", {
					className: "app-launcher__grid",
					role: "list",
					children: u.map((e) => {
						let t = e.id === f;
						return /* @__PURE__ */ s("li", { children: /* @__PURE__ */ c("a", {
							href: e.url,
							className: `app-launcher__tile${t ? " app-launcher__tile--active" : ""}`,
							"aria-current": t ? "page" : void 0,
							children: [
								/* @__PURE__ */ s("span", {
									className: "app-launcher__tile-icon",
									style: { backgroundColor: e.accent },
									"aria-hidden": "true",
									children: l(e.name)
								}),
								/* @__PURE__ */ s("span", {
									className: "app-launcher__tile-name",
									children: e.name
								}),
								e.isNew && /* @__PURE__ */ s(o, {
									variant: "info",
									className: "app-launcher__tile-badge",
									children: d.new
								})
							]
						}) }, e.id);
					})
				})
			})
		}) })]
	});
}
//#endregion
export { u as AppLauncher };

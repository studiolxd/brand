'use client';
import './app-launcher.css';
import { Icon as e } from "./icon.js";
import { Tag as t } from "./tag.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
import * as i from "@radix-ui/react-popover";
//#region src/stories/molecules/AppLauncher/AppLauncher.tsx
function a(e) {
	return e.trim().slice(0, 1).toUpperCase();
}
function o({ apps: o, labels: s, currentAppId: c, open: l, defaultOpen: u, onOpenChange: d }) {
	return /* @__PURE__ */ r(i.Root, {
		open: l,
		defaultOpen: u,
		onOpenChange: d,
		children: [/* @__PURE__ */ n(i.Trigger, {
			asChild: !0,
			children: /* @__PURE__ */ n("button", {
				type: "button",
				className: "app-launcher__trigger",
				"aria-label": s.open,
				children: /* @__PURE__ */ n(e, {
					name: "grid",
					size: "md"
				})
			})
		}), /* @__PURE__ */ n(i.Portal, { children: /* @__PURE__ */ n(i.Content, {
			className: "app-launcher__content",
			sideOffset: 4,
			align: "end",
			children: /* @__PURE__ */ n("ul", {
				className: "app-launcher__grid",
				role: "list",
				children: o.map((e) => {
					let i = e.id === c;
					return /* @__PURE__ */ n("li", { children: /* @__PURE__ */ r("a", {
						href: e.url,
						className: `app-launcher__tile${i ? " app-launcher__tile--active" : ""}`,
						"aria-current": i ? "page" : void 0,
						children: [
							/* @__PURE__ */ n("span", {
								className: "app-launcher__tile-icon",
								style: { backgroundColor: e.accent },
								"aria-hidden": "true",
								children: a(e.name)
							}),
							/* @__PURE__ */ n("span", {
								className: "app-launcher__tile-name",
								children: e.name
							}),
							e.isNew && /* @__PURE__ */ n(t, {
								variant: "info",
								className: "app-launcher__tile-badge",
								children: s.new
							})
						]
					}) }, e.id);
				})
			})
		}) })]
	});
}
//#endregion
export { o as AppLauncher };

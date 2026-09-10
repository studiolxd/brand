'use client';
import './app-launcher.css';
import { Icon as e } from "./icon.js";
import { Tag as t } from "./tag.js";
import { t as n } from "./_shared/css-properties.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
import { Popover as a } from "@base-ui/react/popover";
//#region src/stories/molecules/AppLauncher/AppLauncher.tsx
function o(e) {
	return e.trim().slice(0, 1).toUpperCase();
}
function s({ app: e, isCurrent: a, newLabel: s }) {
	let c = n({ "background-color": e.accent });
	return /* @__PURE__ */ i("a", {
		href: e.url,
		className: `app-launcher__tile${a ? " app-launcher__tile--active" : ""}`,
		"aria-current": a ? "page" : void 0,
		children: [
			/* @__PURE__ */ r("span", {
				ref: c,
				className: "app-launcher__tile-icon",
				"aria-hidden": "true",
				children: o(e.name)
			}),
			/* @__PURE__ */ r("span", {
				className: "app-launcher__tile-name",
				children: e.name
			}),
			e.isNew && /* @__PURE__ */ r(t, {
				variant: "info",
				className: "app-launcher__tile-badge",
				children: s
			})
		]
	});
}
function c({ apps: t, labels: n, currentAppId: o, open: c, defaultOpen: l, onOpenChange: u }) {
	return /* @__PURE__ */ i(a.Root, {
		open: c,
		defaultOpen: l,
		onOpenChange: (e) => u?.(e),
		children: [/* @__PURE__ */ r(a.Trigger, { render: n.trigger ? /* @__PURE__ */ i("button", {
			type: "button",
			className: "app-launcher__trigger app-launcher__trigger--label",
			children: [/* @__PURE__ */ r(e, {
				name: "grid",
				size: "md"
			}), /* @__PURE__ */ r("span", {
				className: "app-launcher__trigger-label",
				children: n.trigger
			})]
		}) : /* @__PURE__ */ r("button", {
			type: "button",
			className: "app-launcher__trigger",
			"aria-label": n.open,
			children: /* @__PURE__ */ r(e, {
				name: "grid",
				size: "md"
			})
		}) }), /* @__PURE__ */ r(a.Portal, { children: /* @__PURE__ */ r(a.Positioner, {
			className: "app-launcher__positioner",
			sideOffset: 4,
			align: "end",
			children: /* @__PURE__ */ r(a.Popup, {
				className: "app-launcher__content",
				children: /* @__PURE__ */ r("ul", {
					className: "app-launcher__grid",
					role: "list",
					children: t.map((e) => /* @__PURE__ */ r("li", { children: /* @__PURE__ */ r(s, {
						app: e,
						isCurrent: e.id === o,
						newLabel: n.new
					}) }, e.id))
				})
			})
		}) })]
	});
}
//#endregion
export { c as AppLauncher };

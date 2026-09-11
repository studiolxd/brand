'use client';
import './app-launcher.css';
import { Icon as e } from "./icon.js";
import { Tag as t } from "./tag.js";
import { Modal as n } from "./modal.js";
import { t as r } from "./_shared/css-properties.js";
import { Fragment as i, jsx as a, jsxs as o } from "react/jsx-runtime";
import { useState as s } from "react";
import { Popover as c } from "@base-ui/react/popover";
//#region src/stories/molecules/AppLauncher/AppLauncher.tsx
function l(e) {
	return e.trim().slice(0, 1).toUpperCase();
}
function u({ app: e, isCurrent: n, newLabel: i }) {
	let s = r({ "background-color": e.accent });
	return /* @__PURE__ */ o("a", {
		href: e.url,
		className: `app-launcher__tile${n ? " app-launcher__tile--active" : ""}`,
		"aria-current": n ? "page" : void 0,
		children: [
			/* @__PURE__ */ a("span", {
				ref: s,
				className: "app-launcher__tile-icon",
				"aria-hidden": "true",
				children: l(e.name)
			}),
			/* @__PURE__ */ a("span", {
				className: "app-launcher__tile-name",
				children: e.name
			}),
			e.isNew && /* @__PURE__ */ a(t, {
				variant: "info",
				className: "app-launcher__tile-badge",
				children: i
			})
		]
	});
}
function d({ apps: e, currentAppId: t, newLabel: n }) {
	return /* @__PURE__ */ a("ul", {
		className: "app-launcher__grid",
		role: "list",
		children: e.map((e) => /* @__PURE__ */ a("li", { children: /* @__PURE__ */ a(u, {
			app: e,
			isCurrent: e.id === t,
			newLabel: n
		}) }, e.id))
	});
}
function f({ apps: t, labels: n, currentAppId: r, open: i, defaultOpen: s, onOpenChange: l }) {
	return /* @__PURE__ */ o(c.Root, {
		open: i,
		defaultOpen: s,
		onOpenChange: (e) => l?.(e),
		children: [/* @__PURE__ */ a(c.Trigger, { render: n.trigger ? /* @__PURE__ */ o("button", {
			type: "button",
			className: "app-launcher__trigger app-launcher__trigger--label",
			children: [/* @__PURE__ */ a(e, {
				name: "grid",
				size: "md"
			}), /* @__PURE__ */ a("span", {
				className: "app-launcher__trigger-label",
				children: n.trigger
			})]
		}) : /* @__PURE__ */ a("button", {
			type: "button",
			className: "app-launcher__trigger",
			"aria-label": n.open,
			children: /* @__PURE__ */ a(e, {
				name: "grid",
				size: "md"
			})
		}) }), /* @__PURE__ */ a(c.Portal, { children: /* @__PURE__ */ a(c.Positioner, {
			className: "app-launcher__positioner",
			sideOffset: 4,
			align: "end",
			children: /* @__PURE__ */ a(c.Popup, {
				className: "app-launcher__content",
				children: /* @__PURE__ */ a(d, {
					apps: t,
					currentAppId: r,
					newLabel: n.new
				})
			})
		}) })]
	});
}
function p(e, t, n) {
	let [r, i] = s(t ?? !1);
	return [e ?? r, (t) => {
		e === void 0 && i(t), n?.(t);
	}];
}
function m({ apps: t, labels: r, currentAppId: s, open: c, defaultOpen: l, onOpenChange: u }) {
	let [f, m] = p(c, l, u);
	return /* @__PURE__ */ o(i, { children: [r.trigger ? /* @__PURE__ */ o("button", {
		type: "button",
		className: "app-launcher__trigger app-launcher__trigger--label",
		"aria-haspopup": "dialog",
		onClick: () => m(!0),
		children: [/* @__PURE__ */ a(e, {
			name: "grid",
			size: "md"
		}), /* @__PURE__ */ a("span", {
			className: "app-launcher__trigger-label",
			children: r.trigger
		})]
	}) : /* @__PURE__ */ a("button", {
		type: "button",
		className: "app-launcher__trigger",
		"aria-label": r.open,
		"aria-haspopup": "dialog",
		onClick: () => m(!0),
		children: /* @__PURE__ */ a(e, {
			name: "grid",
			size: "md"
		})
	}), /* @__PURE__ */ a(n, {
		open: f,
		onClose: () => m(!1),
		title: r.title ?? "Aplicaciones",
		children: /* @__PURE__ */ a(d, {
			apps: t,
			currentAppId: s,
			newLabel: r.new
		})
	})] });
}
function h({ presentation: e = "modal", ...t }) {
	return a(e === "popover" ? f : m, { ...t });
}
//#endregion
export { h as AppLauncher };

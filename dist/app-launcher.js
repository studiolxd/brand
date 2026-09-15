'use client';
import './app-launcher.css';
import { Icon as e } from "./icon.js";
import { Tag as t } from "./tag.js";
import { Modal as n } from "./modal.js";
import { useState as r } from "react";
import { Fragment as i, jsx as a, jsxs as o } from "react/jsx-runtime";
import { Popover as s } from "@base-ui/react/popover";
//#region src/stories/molecules/AppLauncher/AppLauncher.tsx
function c({ app: e, isCurrent: n, newLabel: r }) {
	return /* @__PURE__ */ o("a", {
		href: e.url,
		className: `app-launcher__tile${n ? " app-launcher__tile--active" : ""}`,
		"aria-current": n ? "page" : void 0,
		children: [/* @__PURE__ */ a("span", {
			className: "app-launcher__tile-name",
			children: e.name
		}), e.isNew && /* @__PURE__ */ a(t, {
			variant: "info",
			className: "app-launcher__tile-badge",
			children: r
		})]
	});
}
function l({ apps: e, currentAppId: t, newLabel: n }) {
	return /* @__PURE__ */ a("ul", {
		className: "app-launcher__grid",
		role: "list",
		children: e.map((e) => /* @__PURE__ */ a("li", { children: /* @__PURE__ */ a(c, {
			app: e,
			isCurrent: e.id === t,
			newLabel: n
		}) }, e.id))
	});
}
function u({ apps: t, labels: n, currentAppId: r, open: i, defaultOpen: c, onOpenChange: u }) {
	return /* @__PURE__ */ o(s.Root, {
		open: i,
		defaultOpen: c,
		onOpenChange: (e) => u?.(e),
		children: [/* @__PURE__ */ a(s.Trigger, { render: n.trigger ? /* @__PURE__ */ o("button", {
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
		}) }), /* @__PURE__ */ a(s.Portal, { children: /* @__PURE__ */ a(s.Positioner, {
			className: "app-launcher__positioner",
			sideOffset: 4,
			align: "end",
			children: /* @__PURE__ */ a(s.Popup, {
				className: "app-launcher__content",
				children: /* @__PURE__ */ a(l, {
					apps: t,
					currentAppId: r,
					newLabel: n.new
				})
			})
		}) })]
	});
}
function d(e, t, n) {
	let [i, a] = r(t ?? !1);
	return [e ?? i, (t) => {
		e === void 0 && a(t), n?.(t);
	}];
}
function f({ apps: t, labels: r, currentAppId: s, open: c, defaultOpen: u, onOpenChange: f }) {
	let [p, m] = d(c, u, f);
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
		open: p,
		onClose: () => m(!1),
		title: r.title ?? "Aplicaciones",
		children: /* @__PURE__ */ a(l, {
			apps: t,
			currentAppId: s,
			newLabel: r.new
		})
	})] });
}
function p({ presentation: e = "modal", ...t }) {
	return a(e === "popover" ? u : f, { ...t });
}
//#endregion
export { p as AppLauncher };

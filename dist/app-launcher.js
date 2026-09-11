'use client';
import './app-launcher.css';
import { Icon as e } from "./icon.js";
import { Tag as t } from "./tag.js";
import { Modal as n } from "./modal.js";
import { Fragment as r, jsx as i, jsxs as a } from "react/jsx-runtime";
import { useState as o } from "react";
import { Popover as s } from "@base-ui/react/popover";
//#region src/stories/molecules/AppLauncher/AppLauncher.tsx
function c({ app: e, isCurrent: n, newLabel: r }) {
	return /* @__PURE__ */ a("a", {
		href: e.url,
		className: `app-launcher__tile${n ? " app-launcher__tile--active" : ""}`,
		"aria-current": n ? "page" : void 0,
		children: [/* @__PURE__ */ i("span", {
			className: "app-launcher__tile-name",
			children: e.name
		}), e.isNew && /* @__PURE__ */ i(t, {
			variant: "info",
			className: "app-launcher__tile-badge",
			children: r
		})]
	});
}
function l({ apps: e, currentAppId: t, newLabel: n }) {
	return /* @__PURE__ */ i("ul", {
		className: "app-launcher__grid",
		role: "list",
		children: e.map((e) => /* @__PURE__ */ i("li", { children: /* @__PURE__ */ i(c, {
			app: e,
			isCurrent: e.id === t,
			newLabel: n
		}) }, e.id))
	});
}
function u({ apps: t, labels: n, currentAppId: r, open: o, defaultOpen: c, onOpenChange: u }) {
	return /* @__PURE__ */ a(s.Root, {
		open: o,
		defaultOpen: c,
		onOpenChange: (e) => u?.(e),
		children: [/* @__PURE__ */ i(s.Trigger, { render: n.trigger ? /* @__PURE__ */ a("button", {
			type: "button",
			className: "app-launcher__trigger app-launcher__trigger--label",
			children: [/* @__PURE__ */ i(e, {
				name: "grid",
				size: "md"
			}), /* @__PURE__ */ i("span", {
				className: "app-launcher__trigger-label",
				children: n.trigger
			})]
		}) : /* @__PURE__ */ i("button", {
			type: "button",
			className: "app-launcher__trigger",
			"aria-label": n.open,
			children: /* @__PURE__ */ i(e, {
				name: "grid",
				size: "md"
			})
		}) }), /* @__PURE__ */ i(s.Portal, { children: /* @__PURE__ */ i(s.Positioner, {
			className: "app-launcher__positioner",
			sideOffset: 4,
			align: "end",
			children: /* @__PURE__ */ i(s.Popup, {
				className: "app-launcher__content",
				children: /* @__PURE__ */ i(l, {
					apps: t,
					currentAppId: r,
					newLabel: n.new
				})
			})
		}) })]
	});
}
function d(e, t, n) {
	let [r, i] = o(t ?? !1);
	return [e ?? r, (t) => {
		e === void 0 && i(t), n?.(t);
	}];
}
function f({ apps: t, labels: o, currentAppId: s, open: c, defaultOpen: u, onOpenChange: f }) {
	let [p, m] = d(c, u, f);
	return /* @__PURE__ */ a(r, { children: [o.trigger ? /* @__PURE__ */ a("button", {
		type: "button",
		className: "app-launcher__trigger app-launcher__trigger--label",
		"aria-haspopup": "dialog",
		onClick: () => m(!0),
		children: [/* @__PURE__ */ i(e, {
			name: "grid",
			size: "md"
		}), /* @__PURE__ */ i("span", {
			className: "app-launcher__trigger-label",
			children: o.trigger
		})]
	}) : /* @__PURE__ */ i("button", {
		type: "button",
		className: "app-launcher__trigger",
		"aria-label": o.open,
		"aria-haspopup": "dialog",
		onClick: () => m(!0),
		children: /* @__PURE__ */ i(e, {
			name: "grid",
			size: "md"
		})
	}), /* @__PURE__ */ i(n, {
		open: p,
		onClose: () => m(!1),
		title: o.title ?? "Aplicaciones",
		children: /* @__PURE__ */ i(l, {
			apps: t,
			currentAppId: s,
			newLabel: o.new
		})
	})] });
}
function p({ presentation: e = "modal", ...t }) {
	return i(e === "popover" ? u : f, { ...t });
}
//#endregion
export { p as AppLauncher };

'use client';
import './app-launcher.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { n } from "./_shared/portal-container.js";
import { Tag as r } from "./tag.js";
import { Modal as i } from "./modal.js";
import { useState as a } from "react";
import { Fragment as o, jsx as s, jsxs as c } from "react/jsx-runtime";
import { Popover as l } from "@base-ui/react/popover";
//#region src/stories/molecules/AppLauncher/AppLauncher.tsx
function u({ app: t, isCurrent: n, newLabel: i }) {
	let a = e("appLauncher"), l = t.badge ?? (t.isNew ? a("new", i) : void 0), u = /* @__PURE__ */ c(o, { children: [/* @__PURE__ */ s("span", {
		className: "app-launcher__tile-badge-row",
		children: l && /* @__PURE__ */ s(r, {
			variant: t.disabled ? "neutral" : "info",
			className: "app-launcher__tile-badge",
			children: l
		})
	}), /* @__PURE__ */ s("span", {
		className: "app-launcher__tile-name",
		children: t.name
	})] });
	return t.disabled ? /* @__PURE__ */ s("span", {
		className: "app-launcher__tile app-launcher__tile--disabled",
		role: "link",
		"aria-disabled": "true",
		children: u
	}) : /* @__PURE__ */ s("a", {
		href: t.url,
		className: `app-launcher__tile${n ? " app-launcher__tile--active" : ""}`,
		"aria-current": n ? "page" : void 0,
		children: u
	});
}
function d({ apps: e, currentAppId: t, newLabel: n }) {
	return /* @__PURE__ */ s("ul", {
		className: "app-launcher__grid",
		role: "list",
		children: e.map((e) => /* @__PURE__ */ s("li", { children: /* @__PURE__ */ s(u, {
			app: e,
			isCurrent: e.id === t,
			newLabel: n
		}) }, e.id))
	});
}
function f({ apps: r, labels: i, currentAppId: a, open: o, defaultOpen: u, onOpenChange: f }) {
	let p = e("appLauncher"), m = n(void 0);
	return /* @__PURE__ */ c(l.Root, {
		open: o,
		defaultOpen: u,
		onOpenChange: (e) => f?.(e),
		children: [/* @__PURE__ */ s(l.Trigger, { render: i.trigger ? /* @__PURE__ */ c("button", {
			type: "button",
			className: "app-launcher__trigger app-launcher__trigger--label",
			children: [/* @__PURE__ */ s(t, {
				name: "grid",
				size: "md"
			}), /* @__PURE__ */ s("span", {
				className: "app-launcher__trigger-label",
				children: i.trigger
			})]
		}) : /* @__PURE__ */ s("button", {
			type: "button",
			className: "app-launcher__trigger",
			"aria-label": p("open", i.open),
			children: /* @__PURE__ */ s(t, {
				name: "grid",
				size: "md"
			})
		}) }), /* @__PURE__ */ s(l.Portal, {
			container: m,
			children: /* @__PURE__ */ s(l.Positioner, {
				className: "app-launcher__positioner",
				sideOffset: 4,
				align: "end",
				children: /* @__PURE__ */ s(l.Popup, {
					className: "app-launcher__content",
					children: /* @__PURE__ */ s(d, {
						apps: r,
						currentAppId: a,
						newLabel: i.new
					})
				})
			})
		})]
	});
}
function p(e, t, n) {
	let [r, i] = a(t ?? !1);
	return [e ?? r, (t) => {
		e === void 0 && i(t), n?.(t);
	}];
}
function m({ apps: n, labels: r, currentAppId: a, open: l, defaultOpen: u, onOpenChange: f }) {
	let m = e("appLauncher"), [h, g] = p(l, u, f);
	return /* @__PURE__ */ c(o, { children: [r.trigger ? /* @__PURE__ */ c("button", {
		type: "button",
		className: "app-launcher__trigger app-launcher__trigger--label",
		"aria-haspopup": "dialog",
		onClick: () => g(!0),
		children: [/* @__PURE__ */ s(t, {
			name: "grid",
			size: "md"
		}), /* @__PURE__ */ s("span", {
			className: "app-launcher__trigger-label",
			children: r.trigger
		})]
	}) : /* @__PURE__ */ s("button", {
		type: "button",
		className: "app-launcher__trigger",
		"aria-label": m("open", r.open),
		"aria-haspopup": "dialog",
		onClick: () => g(!0),
		children: /* @__PURE__ */ s(t, {
			name: "grid",
			size: "md"
		})
	}), /* @__PURE__ */ s(i, {
		open: h,
		onClose: () => g(!1),
		title: m("title", r.title),
		children: /* @__PURE__ */ s(d, {
			apps: n,
			currentAppId: a,
			newLabel: r.new
		})
	})] });
}
function h({ presentation: e = "modal", labels: t = {}, ...n }) {
	return s(e === "popover" ? f : m, {
		labels: t,
		...n
	});
}
//#endregion
export { h as AppLauncher };

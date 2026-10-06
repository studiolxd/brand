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
function f(e, t) {
	return [
		"app-launcher__trigger",
		e ? "app-launcher__trigger--label" : "",
		t
	].filter(Boolean).join(" ");
}
function p({ apps: r, labels: i, currentAppId: a, open: o, defaultOpen: u, onOpenChange: p, className: m }) {
	let h = e("appLauncher"), g = n(void 0);
	return /* @__PURE__ */ c(l.Root, {
		open: o,
		defaultOpen: u,
		onOpenChange: (e) => p?.(e),
		children: [/* @__PURE__ */ s(l.Trigger, { render: i.trigger ? /* @__PURE__ */ c("button", {
			type: "button",
			className: f(!0, m),
			children: [/* @__PURE__ */ s(t, {
				name: "grid",
				size: "md"
			}), /* @__PURE__ */ s("span", {
				className: "app-launcher__trigger-label",
				children: i.trigger
			})]
		}) : /* @__PURE__ */ s("button", {
			type: "button",
			className: f(!1, m),
			"aria-label": h("open", i.open),
			children: /* @__PURE__ */ s(t, {
				name: "grid",
				size: "md"
			})
		}) }), /* @__PURE__ */ s(l.Portal, {
			container: g,
			children: /* @__PURE__ */ s(l.Positioner, {
				className: "app-launcher__positioner",
				sideOffset: 4,
				align: "end",
				children: /* @__PURE__ */ s(l.Popup, {
					className: "app-launcher__content",
					"aria-label": h("title", i.title),
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
function m(e, t, n) {
	let [r, i] = a(t ?? !1);
	return [e ?? r, (t) => {
		e === void 0 && i(t), n?.(t);
	}];
}
function h({ apps: n, labels: r, currentAppId: a, open: l, defaultOpen: u, onOpenChange: p, className: h }) {
	let g = e("appLauncher"), [_, v] = m(l, u, p);
	return /* @__PURE__ */ c(o, { children: [r.trigger ? /* @__PURE__ */ c("button", {
		type: "button",
		className: f(!0, h),
		"aria-haspopup": "dialog",
		onClick: () => v(!0),
		children: [/* @__PURE__ */ s(t, {
			name: "grid",
			size: "md"
		}), /* @__PURE__ */ s("span", {
			className: "app-launcher__trigger-label",
			children: r.trigger
		})]
	}) : /* @__PURE__ */ s("button", {
		type: "button",
		className: f(!1, h),
		"aria-label": g("open", r.open),
		"aria-haspopup": "dialog",
		onClick: () => v(!0),
		children: /* @__PURE__ */ s(t, {
			name: "grid",
			size: "md"
		})
	}), /* @__PURE__ */ s(i, {
		open: _,
		onClose: () => v(!1),
		title: g("title", r.title),
		children: /* @__PURE__ */ s(d, {
			apps: n,
			currentAppId: a,
			newLabel: r.new
		})
	})] });
}
function g({ presentation: e = "modal", labels: t = {}, ...n }) {
	return s(e === "popover" ? p : h, {
		labels: t,
		...n
	});
}
//#endregion
export { g as AppLauncher };

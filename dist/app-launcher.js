'use client';
import './app-launcher.css';
import { r as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { n } from "./_shared/portal-container.js";
import { Tag as r } from "./tag.js";
import { t as i } from "./_shared/modal.js";
import { useState as a } from "react";
import { Fragment as o, jsx as s, jsxs as c } from "react/jsx-runtime";
import { Popover as l } from "@base-ui/react/popover";
//#region src/stories/messages/es/appLauncher.ts
var u = {
	open: "Abrir el lanzador de aplicaciones",
	new: "Nuevo",
	title: "Aplicaciones"
};
//#endregion
//#region src/stories/molecules/AppLauncher/AppLauncher.tsx
function d({ app: t, isCurrent: n, newLabel: i }) {
	let a = e("appLauncher", u), l = t.badge ?? (t.isNew ? a("new", i) : void 0), d = /* @__PURE__ */ c(o, { children: [/* @__PURE__ */ s("span", {
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
		children: d
	}) : /* @__PURE__ */ s("a", {
		href: t.url,
		className: `app-launcher__tile${n ? " app-launcher__tile--active" : ""}`,
		"aria-current": n ? "page" : void 0,
		children: d
	});
}
function f({ apps: e, currentAppId: t, newLabel: n }) {
	return /* @__PURE__ */ s("ul", {
		className: "app-launcher__grid",
		role: "list",
		children: e.map((e) => /* @__PURE__ */ s("li", { children: /* @__PURE__ */ s(d, {
			app: e,
			isCurrent: e.id === t,
			newLabel: n
		}) }, e.id))
	});
}
function p(e, t) {
	return [
		"app-launcher__trigger",
		e ? "app-launcher__trigger--label" : "",
		t
	].filter(Boolean).join(" ");
}
function m({ apps: r, labels: i, currentAppId: a, open: o, defaultOpen: d, onOpenChange: m, className: h }) {
	let g = e("appLauncher", u), _ = n(void 0);
	return /* @__PURE__ */ c(l.Root, {
		open: o,
		defaultOpen: d,
		onOpenChange: (e) => m?.(e),
		children: [/* @__PURE__ */ s(l.Trigger, { render: i.trigger ? /* @__PURE__ */ c("button", {
			type: "button",
			className: p(!0, h),
			children: [/* @__PURE__ */ s(t, {
				name: "grid",
				size: "md"
			}), /* @__PURE__ */ s("span", {
				className: "app-launcher__trigger-label",
				children: i.trigger
			})]
		}) : /* @__PURE__ */ s("button", {
			type: "button",
			className: p(!1, h),
			"aria-label": g("open", i.open),
			children: /* @__PURE__ */ s(t, {
				name: "grid",
				size: "md"
			})
		}) }), /* @__PURE__ */ s(l.Portal, {
			container: _,
			children: /* @__PURE__ */ s(l.Positioner, {
				className: "app-launcher__positioner",
				sideOffset: 4,
				align: "end",
				children: /* @__PURE__ */ s(l.Popup, {
					className: "app-launcher__content",
					"aria-label": g("title", i.title),
					children: /* @__PURE__ */ s(f, {
						apps: r,
						currentAppId: a,
						newLabel: i.new
					})
				})
			})
		})]
	});
}
function h(e, t, n) {
	let [r, i] = a(t ?? !1);
	return [e ?? r, (t) => {
		e === void 0 && i(t), n?.(t);
	}];
}
function g({ apps: n, labels: r, currentAppId: a, open: l, defaultOpen: d, onOpenChange: m, className: g }) {
	let _ = e("appLauncher", u), [v, y] = h(l, d, m);
	return /* @__PURE__ */ c(o, { children: [r.trigger ? /* @__PURE__ */ c("button", {
		type: "button",
		className: p(!0, g),
		"aria-haspopup": "dialog",
		onClick: () => y(!0),
		children: [/* @__PURE__ */ s(t, {
			name: "grid",
			size: "md"
		}), /* @__PURE__ */ s("span", {
			className: "app-launcher__trigger-label",
			children: r.trigger
		})]
	}) : /* @__PURE__ */ s("button", {
		type: "button",
		className: p(!1, g),
		"aria-label": _("open", r.open),
		"aria-haspopup": "dialog",
		onClick: () => y(!0),
		children: /* @__PURE__ */ s(t, {
			name: "grid",
			size: "md"
		})
	}), /* @__PURE__ */ s(i, {
		open: v,
		onOpenChange: y,
		title: _("title", r.title),
		children: /* @__PURE__ */ s(f, {
			apps: n,
			currentAppId: a,
			newLabel: r.new
		})
	})] });
}
function _({ presentation: e = "modal", labels: t = {}, ...n }) {
	return s(e === "popover" ? m : g, {
		labels: t,
		...n
	});
}
//#endregion
export { _ as AppLauncher };

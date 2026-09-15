'use client';
import './app-launcher.css';
import { n as e } from "./_shared/brandmessagescontext.js";
import { Icon as t } from "./icon.js";
import { Tag as n } from "./tag.js";
import { Modal as r } from "./modal.js";
import { useState as i } from "react";
import { Fragment as a, jsx as o, jsxs as s } from "react/jsx-runtime";
import { Popover as c } from "@base-ui/react/popover";
//#region src/stories/molecules/AppLauncher/AppLauncher.tsx
function l({ app: t, isCurrent: r, newLabel: i }) {
	let a = e("appLauncher");
	return /* @__PURE__ */ s("a", {
		href: t.url,
		className: `app-launcher__tile${r ? " app-launcher__tile--active" : ""}`,
		"aria-current": r ? "page" : void 0,
		children: [/* @__PURE__ */ o("span", {
			className: "app-launcher__tile-name",
			children: t.name
		}), t.isNew && /* @__PURE__ */ o(n, {
			variant: "info",
			className: "app-launcher__tile-badge",
			children: a("new", i)
		})]
	});
}
function u({ apps: e, currentAppId: t, newLabel: n }) {
	return /* @__PURE__ */ o("ul", {
		className: "app-launcher__grid",
		role: "list",
		children: e.map((e) => /* @__PURE__ */ o("li", { children: /* @__PURE__ */ o(l, {
			app: e,
			isCurrent: e.id === t,
			newLabel: n
		}) }, e.id))
	});
}
function d({ apps: n, labels: r, currentAppId: i, open: a, defaultOpen: l, onOpenChange: d }) {
	let f = e("appLauncher");
	return /* @__PURE__ */ s(c.Root, {
		open: a,
		defaultOpen: l,
		onOpenChange: (e) => d?.(e),
		children: [/* @__PURE__ */ o(c.Trigger, { render: r.trigger ? /* @__PURE__ */ s("button", {
			type: "button",
			className: "app-launcher__trigger app-launcher__trigger--label",
			children: [/* @__PURE__ */ o(t, {
				name: "grid",
				size: "md"
			}), /* @__PURE__ */ o("span", {
				className: "app-launcher__trigger-label",
				children: r.trigger
			})]
		}) : /* @__PURE__ */ o("button", {
			type: "button",
			className: "app-launcher__trigger",
			"aria-label": f("open", r.open),
			children: /* @__PURE__ */ o(t, {
				name: "grid",
				size: "md"
			})
		}) }), /* @__PURE__ */ o(c.Portal, { children: /* @__PURE__ */ o(c.Positioner, {
			className: "app-launcher__positioner",
			sideOffset: 4,
			align: "end",
			children: /* @__PURE__ */ o(c.Popup, {
				className: "app-launcher__content",
				children: /* @__PURE__ */ o(u, {
					apps: n,
					currentAppId: i,
					newLabel: r.new
				})
			})
		}) })]
	});
}
function f(e, t, n) {
	let [r, a] = i(t ?? !1);
	return [e ?? r, (t) => {
		e === void 0 && a(t), n?.(t);
	}];
}
function p({ apps: n, labels: i, currentAppId: c, open: l, defaultOpen: d, onOpenChange: p }) {
	let m = e("appLauncher"), [h, g] = f(l, d, p);
	return /* @__PURE__ */ s(a, { children: [i.trigger ? /* @__PURE__ */ s("button", {
		type: "button",
		className: "app-launcher__trigger app-launcher__trigger--label",
		"aria-haspopup": "dialog",
		onClick: () => g(!0),
		children: [/* @__PURE__ */ o(t, {
			name: "grid",
			size: "md"
		}), /* @__PURE__ */ o("span", {
			className: "app-launcher__trigger-label",
			children: i.trigger
		})]
	}) : /* @__PURE__ */ o("button", {
		type: "button",
		className: "app-launcher__trigger",
		"aria-label": m("open", i.open),
		"aria-haspopup": "dialog",
		onClick: () => g(!0),
		children: /* @__PURE__ */ o(t, {
			name: "grid",
			size: "md"
		})
	}), /* @__PURE__ */ o(r, {
		open: h,
		onClose: () => g(!1),
		title: m("title", i.title),
		children: /* @__PURE__ */ o(u, {
			apps: n,
			currentAppId: c,
			newLabel: i.new
		})
	})] });
}
function m({ presentation: e = "modal", labels: t = {}, ...n }) {
	return o(e === "popover" ? d : p, {
		labels: t,
		...n
	});
}
//#endregion
export { m as AppLauncher };

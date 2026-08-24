import './sidebar.css';
import { jsx as e, jsxs as t } from "react/jsx-runtime";
//#region src/stories/sections/Sidebar/Sidebar.tsx
function n({ logo: n, children: r, footer: i, id: a, expanded: o }) {
	return /* @__PURE__ */ t("div", {
		className: o ? "sidebar sidebar--expanded" : "sidebar",
		id: a,
		children: [
			n && /* @__PURE__ */ e("div", {
				className: "sidebar__header",
				children: /* @__PURE__ */ e("div", {
					className: "sidebar__logo",
					children: n
				})
			}),
			/* @__PURE__ */ e("div", {
				className: "sidebar__panel",
				children: r
			}),
			i && /* @__PURE__ */ e("div", {
				className: "sidebar__footer",
				children: i
			})
		]
	});
}
function r({ className: t, ...n }) {
	return /* @__PURE__ */ e("div", {
		className: ["sidebar__group", t].filter(Boolean).join(" "),
		...n
	});
}
function i({ className: t, ...n }) {
	return /* @__PURE__ */ e("div", {
		className: ["sidebar__group-content", t].filter(Boolean).join(" "),
		...n
	});
}
function a({ className: t, ...n }) {
	return /* @__PURE__ */ e("hr", {
		className: ["sidebar__separator", t].filter(Boolean).join(" "),
		...n
	});
}
//#endregion
export { n as Sidebar, r as SidebarGroup, i as SidebarGroupContent, a as SidebarSeparator };

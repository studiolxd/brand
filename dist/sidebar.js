import './sidebar.css';
import { jsx as e, jsxs as t } from "react/jsx-runtime";
//#region src/stories/sections/Sidebar/Sidebar.tsx
function n({ logo: n, children: r, footer: i, id: a }) {
	return /* @__PURE__ */ t("div", {
		className: "sidebar",
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
//#endregion
export { n as Sidebar };

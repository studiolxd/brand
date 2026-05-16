import './app-shell.css';
import { jsx as e, jsxs as t } from "react/jsx-runtime";
//#region src/stories/sections/AppShell/AppShell.tsx
function n({ sidebar: n, children: r }) {
	return /* @__PURE__ */ t("div", {
		className: "app-shell",
		children: [n, /* @__PURE__ */ e("div", {
			className: "app-shell__content",
			children: r
		})]
	});
}
//#endregion
export { n as AppShell };

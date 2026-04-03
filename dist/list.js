import './list.css';
import { jsx as e } from "react/jsx-runtime";
//#region src/stories/atoms/List/List.tsx
function t({ type: t = "unordered", className: n, children: r }) {
	return /* @__PURE__ */ e(t === "ordered" ? "ol" : "ul", {
		className: `list list--${t}${n ? ` ${n}` : ""}`,
		children: r
	});
}
//#endregion
export { t as List };

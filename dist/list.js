import './list.css';
import { jsx as e } from "react/jsx-runtime";
//#region src/stories/atoms/List/List.tsx
function t({ type: t = "unordered", children: n }) {
	return /* @__PURE__ */ e(t === "ordered" ? "ol" : "ul", {
		className: `list list--${t}`,
		children: n
	});
}
//#endregion
export { t as List };

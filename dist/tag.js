import './tag.css';
import { jsx as e } from "react/jsx-runtime";
//#region src/stories/atoms/Tag/Tag.tsx
function t({ variant: t = "default", children: n }) {
	return /* @__PURE__ */ e("span", {
		className: ["tag", `tag--${t}`].join(" "),
		children: n
	});
}
//#endregion
export { t as Tag };

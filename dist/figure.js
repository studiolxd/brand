import './figure.css';
import { forwardRef as e } from "react";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
import { useRender as r } from "@base-ui/react/use-render";
//#region src/stories/atoms/Figure/Figure.tsx
var i = {
	"1:1": "figure__media--ratio-1-1",
	"4:3": "figure__media--ratio-4-3",
	"3:2": "figure__media--ratio-3-2",
	"16:9": "figure__media--ratio-16-9",
	"21:9": "figure__media--ratio-21-9"
}, a = e(function({ src: e, alt: a = "", caption: o, ratio: s = "auto", fit: c = "cover", render: l, className: u, children: d, ...f }, p) {
	let m = ["figure", u ?? ""].filter(Boolean).join(" "), h = [
		"figure__media",
		s === "auto" ? "" : i[s],
		s !== "auto" && c === "contain" ? "figure__media--contain" : ""
	].filter(Boolean).join(" "), g = r({
		render: l,
		enabled: l !== void 0,
		props: { className: "figure__img" }
	});
	return /* @__PURE__ */ n("figure", {
		ref: p,
		className: m,
		...f,
		children: [/* @__PURE__ */ t("div", {
			className: h,
			children: g ?? (e === void 0 ? d : /* @__PURE__ */ t("img", {
				className: "figure__img",
				src: e,
				alt: a
			}))
		}), o !== void 0 && /* @__PURE__ */ t("figcaption", {
			className: "figure__caption",
			children: o
		})]
	});
});
//#endregion
export { a as Figure };

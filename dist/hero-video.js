import './hero-video.css';
import { jsx as e, jsxs as t } from "react/jsx-runtime";
//#region src/stories/atoms/HeroVideo/HeroVideo.tsx
function n({ landscape: n, portrait: r }) {
	return /* @__PURE__ */ t("div", {
		className: "hero-video",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ e("div", {
			className: "hero-video__landscape",
			children: /* @__PURE__ */ t("video", {
				autoPlay: !0,
				loop: !0,
				muted: !0,
				playsInline: !0,
				children: [n.webm && /* @__PURE__ */ e("source", {
					src: n.webm,
					type: "video/webm"
				}), n.mp4 && /* @__PURE__ */ e("source", {
					src: n.mp4,
					type: "video/mp4"
				})]
			})
		}), /* @__PURE__ */ e("div", {
			className: "hero-video__portrait",
			children: /* @__PURE__ */ t("video", {
				autoPlay: !0,
				loop: !0,
				muted: !0,
				playsInline: !0,
				children: [r.webm && /* @__PURE__ */ e("source", {
					src: r.webm,
					type: "video/webm"
				}), r.mp4 && /* @__PURE__ */ e("source", {
					src: r.mp4,
					type: "video/mp4"
				})]
			})
		})]
	});
}
//#endregion
export { n as HeroVideo };

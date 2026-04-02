'use client';
import './hero-video.css';
import { jsx as e, jsxs as t } from "react/jsx-runtime";
import { useEffect as n, useRef as r } from "react";
//#region src/stories/atoms/HeroVideo/HeroVideo.tsx
function i({ landscape: i, portrait: a }) {
	let o = r(null), s = r(null);
	return n(() => {
		o.current && (o.current.muted = !0), s.current && (s.current.muted = !0);
	}, []), /* @__PURE__ */ t("div", {
		className: "hero-video",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ e("div", {
			className: "hero-video__landscape",
			children: /* @__PURE__ */ t("video", {
				ref: o,
				autoPlay: !0,
				loop: !0,
				muted: !0,
				playsInline: !0,
				children: [i.webm && /* @__PURE__ */ e("source", {
					src: i.webm,
					type: "video/webm"
				}), i.mp4 && /* @__PURE__ */ e("source", {
					src: i.mp4,
					type: "video/mp4"
				})]
			})
		}), /* @__PURE__ */ e("div", {
			className: "hero-video__portrait",
			children: /* @__PURE__ */ t("video", {
				ref: s,
				autoPlay: !0,
				loop: !0,
				muted: !0,
				playsInline: !0,
				children: [a.webm && /* @__PURE__ */ e("source", {
					src: a.webm,
					type: "video/webm"
				}), a.mp4 && /* @__PURE__ */ e("source", {
					src: a.mp4,
					type: "video/mp4"
				})]
			})
		})]
	});
}
//#endregion
export { i as HeroVideo };

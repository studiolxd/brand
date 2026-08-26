'use client';
import './hero-video.css';
import { useEffect as e, useRef as t } from "react";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/stories/atoms/HeroVideo/HeroVideo.tsx
function i({ landscape: i, portrait: a }) {
	let o = t(null), s = t(null);
	return e(() => {
		o.current && (o.current.muted = !0), s.current && (s.current.muted = !0);
	}, []), /* @__PURE__ */ r("div", {
		className: "hero-video",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ n("div", {
			className: "hero-video__landscape",
			children: /* @__PURE__ */ r("video", {
				ref: o,
				autoPlay: !0,
				loop: !0,
				muted: !0,
				playsInline: !0,
				poster: i.poster,
				children: [i.webm && /* @__PURE__ */ n("source", {
					src: i.webm,
					type: "video/webm"
				}), i.mp4 && /* @__PURE__ */ n("source", {
					src: i.mp4,
					type: "video/mp4"
				})]
			})
		}), /* @__PURE__ */ n("div", {
			className: "hero-video__portrait",
			children: /* @__PURE__ */ r("video", {
				ref: s,
				autoPlay: !0,
				loop: !0,
				muted: !0,
				playsInline: !0,
				poster: a.poster,
				children: [a.webm && /* @__PURE__ */ n("source", {
					src: a.webm,
					type: "video/webm"
				}), a.mp4 && /* @__PURE__ */ n("source", {
					src: a.mp4,
					type: "video/mp4"
				})]
			})
		})]
	});
}
//#endregion
export { i as HeroVideo };

import '../imagecropdialog.css';
import { n as e } from "./brandmessagescontext.js";
import { Spinner as t } from "../spinner.js";
import { Button as n } from "../button.js";
import { Alert as r } from "../alert.js";
import { Modal as i } from "../modal.js";
import { useRef as a, useState as o } from "react";
import { Fragment as s, jsx as c, jsxs as l } from "react/jsx-runtime";
import u, { centerCrop as d, makeAspectCrop as f } from "react-image-crop";
//#region src/stories/molecules/ImageCropDialog/crop.ts
async function p(e, t, n = {}) {
	let r = n.outputSize ?? 512, i = n.mimeType ?? "image/jpeg", a = n.quality ?? .9, o = document.createElement("canvas");
	o.width = r, o.height = r;
	let s = o.getContext("2d");
	if (!s) throw Error("Failed to acquire 2D canvas context");
	let c = e.naturalWidth / e.width, l = e.naturalHeight / e.height;
	return s.drawImage(e, t.x * c, t.y * l, t.width * c, t.height * l, 0, 0, r, r), new Promise((e, t) => {
		o.toBlob((n) => n ? e(n) : t(/* @__PURE__ */ Error("Canvas toBlob returned null")), i, a);
	});
}
function m(e, t, n) {
	return d(f(t / n >= e ? {
		unit: "%",
		height: 100
	} : {
		unit: "%",
		width: 100
	}, e, t, n), t, n);
}
//#endregion
//#region src/stories/molecules/ImageCropDialog/ImageCropDialog.tsx
function h({ sourceUrl: d, title: f, description: h, circularCrop: g = !1, aspect: _ = 1, outputSize: v = 512, outputMimeType: y, busy: b = !1, cancelLabel: x, confirmLabel: S, closeLabel: C, loadingLabel: w, errorMessage: T, onConfirm: E, onClose: D, className: O }) {
	let k = e("imageCropDialog"), A = a(null), [j, M] = o(), [N, P] = o(), [F, I] = o("loading"), [L, R] = o(d);
	d !== L && (R(d), I("loading"), M(void 0), P(void 0));
	let z = () => {
		M(void 0), P(void 0), D();
	}, B = async () => {
		let e = A.current;
		!e || !N || N.width === 0 || (await E(await p(e, N, {
			mimeType: y,
			outputSize: v
		})), z());
	};
	return /* @__PURE__ */ c(i, {
		open: d !== null,
		onClose: () => {
			b || z();
		},
		title: f,
		...C ? { closeLabel: C } : {},
		...h == null ? {} : { description: h },
		footerClassName: "image-crop-dialog__actions",
		footer: /* @__PURE__ */ l(s, { children: [/* @__PURE__ */ c(n, {
			variant: "outline",
			disabled: b,
			onClick: z,
			children: x
		}), /* @__PURE__ */ c(n, {
			disabled: b || !N?.width,
			onClick: B,
			children: S
		})] }),
		children: /* @__PURE__ */ c("div", {
			className: ["image-crop-dialog", O].filter(Boolean).join(" "),
			children: /* @__PURE__ */ l("div", {
				className: "image-crop-dialog__area",
				children: [
					F === "loading" && /* @__PURE__ */ c(t, {
						size: "lg",
						label: k("loading", w)
					}),
					F === "error" && /* @__PURE__ */ c(r, {
						variant: "error",
						description: k("error", T),
						className: "image-crop-dialog__error"
					}),
					d && F !== "error" && /* @__PURE__ */ c(u, {
						crop: j,
						onChange: (e, t) => M(t),
						onComplete: (e) => P(e),
						aspect: _,
						circularCrop: g,
						minWidth: 64,
						keepSelection: !0,
						children: /* @__PURE__ */ c("img", {
							ref: A,
							src: d,
							alt: "",
							onLoad: (e) => {
								let { width: t, height: n } = e.currentTarget;
								I("ready"), M(m(_, t, n));
							},
							onError: () => I("error")
						})
					})
				]
			})
		})
	});
}
//#endregion
export { h as t };

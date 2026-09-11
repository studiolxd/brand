import { n as e, t } from "./_shared/tokens.js";
import { r as n, t as r } from "./_shared/logoassets.js";
import { createElement as i } from "react";
//#region src/stories/og/ogTypeface.ts
var a = t("--font-family-sans").split(",")[0].trim().replace(/^["']|["']$/g, ""), o = {
	width: 1200,
	height: 630
}, s = "image/png", c = t("--color-primary"), l = t("--color-accent-1"), u = e("--spacing-8"), [, , d, f] = n.split(" ").map(Number), p = 2 * Number.parseFloat(e("--logo-height-xl")), m = Math.round(p * d / f), h = Number(t("--font-weight-default")), g = Number(t("--font-weight-emphasis"));
function _({ title: s, subtitle: d, eyebrow: f }) {
	let _ = i("div", {
		key: "firma",
		style: {
			display: "flex",
			justifyContent: "flex-end",
			alignItems: "flex-start"
		}
	}, i("svg", {
		key: "marca",
		width: m,
		height: p,
		viewBox: n,
		fill: c,
		children: r.map((e, t) => i("path", {
			key: t,
			d: e
		}))
	})), v = i("div", {
		key: "cuerpo",
		style: {
			display: "flex",
			flexDirection: "column",
			flexGrow: 1,
			justifyContent: "center",
			gap: e("--spacing-5")
		}
	}, i("div", {
		key: "titular",
		style: {
			display: "flex",
			flexDirection: "column",
			gap: e("--spacing-2")
		}
	}, f ? i("div", {
		key: "eyebrow",
		style: {
			display: "flex",
			fontSize: e("--site-shell-heading-size-6"),
			fontWeight: g,
			color: c
		}
	}, f) : null, i("div", {
		key: "titulo",
		style: {
			display: "flex",
			fontSize: e("--site-shell-heading-size-9"),
			fontWeight: g,
			lineHeight: Number(t("--line-height-tight")),
			color: c
		}
	}, s)), d ? i("div", {
		key: "subtitulo",
		style: {
			display: "flex",
			fontSize: e("--site-shell-heading-size-7"),
			fontWeight: h,
			lineHeight: Number(t("--line-height-snug")),
			color: c
		}
	}, d) : null), y = i("div", {
		key: "contenido",
		style: {
			display: "flex",
			flexDirection: "column",
			flexGrow: 1,
			paddingTop: u,
			paddingBottom: u,
			paddingLeft: u,
			paddingRight: u
		}
	}, _, v);
	return i("div", { style: {
		display: "flex",
		flexDirection: "column",
		width: o.width,
		height: o.height,
		backgroundColor: l,
		color: c,
		fontFamily: a
	} }, y);
}
//#endregion
//#region src/stories/og/ogFonts.ts
var v = [{
	weight: Number(t("--font-weight-default")),
	file: "google-sans-flex-normal-300.ttf"
}, {
	weight: Number(t("--font-weight-emphasis")),
	file: "google-sans-flex-normal-500.ttf"
}], y = ["./assets/fonts/google-sans-flex/", "../../assets/fonts/google-sans-flex/"];
function b(e) {
	return e.buffer.slice(e.byteOffset, e.byteOffset + e.byteLength);
}
async function x() {
	let { readFile: e } = await import("node:fs/promises");
	return Promise.all(v.map(async ({ weight: t, file: n }) => {
		let r;
		for (let i of y) try {
			return {
				name: a,
				data: b(await e(new URL(i + n, import.meta.url))),
				weight: t,
				style: "normal"
			};
		} catch (e) {
			r = e;
		}
		throw Error(`No se encontró la fuente ${n} junto al módulo`, { cause: r });
	}));
}
//#endregion
export { s as OG_CONTENT_TYPE, a as OG_FONT_FAMILY, o as OG_SIZE, _ as ogCard, x as ogFonts };

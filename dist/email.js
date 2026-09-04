import { Body as e, Button as t, Container as n, Font as r, Head as i, Heading as a, Html as o, Img as s, Link as c, Preview as l, Section as u, Text as d } from "react-email";
import { Fragment as f, jsx as p, jsxs as m } from "react/jsx-runtime";
//#region src/stories/email/emailTokens.ts
var h = {
	"--email-max-width": "600px",
	"--email-font-family": "\"Google Sans Flex\", system-ui, sans-serif",
	"--email-font-size": "20px",
	"--email-font-weight": "300",
	"--email-font-weight-range": "1 1000",
	"--email-line-height": "1.5",
	"--email-border-width": "1px",
	"--email-canvas-padding-block": "24px",
	"--email-canvas-padding-inline": "12px",
	"--email-padding-block": "24px",
	"--email-padding-inline": "24px",
	"--email-brand-padding-block": "16px",
	"--email-brand-padding-inline": "16px",
	"--email-opt-out-margin-block-start": "16px",
	"--email-heading-font-size": "24px",
	"--email-heading-font-weight": "500",
	"--email-heading-line-height": "1.3",
	"--email-heading-margin-block-end": "12px",
	"--email-text-margin-block-end": "16px",
	"--email-note-font-size": "16px",
	"--email-note-line-height": "1.65",
	"--email-button-bg": "#baabff",
	"--email-button-color": "#111e30",
	"--email-button-font-size": "20px",
	"--email-button-font-weight": "300",
	"--email-button-padding-block": "16px",
	"--email-button-width": "100%",
	"--email-button-fallback-margin-block-start": "12px",
	"--email-button-margin-block-end": "24px",
	"--email-logo-mark-size": "48px",
	"--email-logo-padding": "8px",
	"--email-canvas-bg": "#ffffff",
	"--email-bg": "#ffffff",
	"--email-color": "#111e30",
	"--email-muted-color": "#4a4a4a",
	"--email-border-color": "#111e30"
};
//#endregion
//#region src/stories/email/emailTheme.ts
function g(e) {
	return h[e];
}
var _ = {
	canvas: g("--email-canvas-bg"),
	background: g("--email-bg"),
	text: g("--email-color"),
	muted: g("--email-muted-color"),
	border: g("--email-border-color")
}, v = g("--email-font-family"), y = g("--email-font-weight-range"), b = g("--email-max-width"), x = {
	size: Number.parseFloat(g("--email-logo-mark-size")) + Number.parseFloat(g("--email-logo-padding")) * 2,
	filename: "logo-v1.png"
}, S = "https://slxd.app/brand/email", C = "google-sans-flex-normal-latin-v1.woff2", w = {
	heading: {
		color: _.text,
		fontFamily: v,
		fontSize: g("--email-heading-font-size"),
		fontWeight: Number(g("--email-heading-font-weight")),
		lineHeight: g("--email-heading-line-height"),
		margin: `0 0 ${g("--email-heading-margin-block-end")}`
	},
	text: {
		color: _.text,
		fontFamily: v,
		fontWeight: Number(g("--email-font-weight")),
		fontSize: g("--email-font-size"),
		lineHeight: g("--email-line-height"),
		margin: `0 0 ${g("--email-text-margin-block-end")}`
	},
	muted: {
		color: _.muted,
		fontFamily: v,
		fontWeight: Number(g("--email-font-weight")),
		fontSize: g("--email-note-font-size"),
		lineHeight: g("--email-note-line-height"),
		margin: 0
	},
	footnote: {
		color: _.text,
		fontFamily: v,
		fontWeight: Number(g("--email-font-weight")),
		fontSize: g("--email-note-font-size"),
		lineHeight: g("--email-note-line-height"),
		margin: 0
	},
	button: {
		backgroundColor: g("--email-button-bg"),
		color: g("--email-button-color"),
		display: "block",
		width: g("--email-button-width"),
		textAlign: "center",
		fontFamily: v,
		fontSize: g("--email-button-font-size"),
		fontWeight: Number(g("--email-button-font-weight")),
		padding: `${g("--email-button-padding-block")} 0`,
		textDecoration: "none",
		marginBottom: g("--email-button-margin-block-end")
	},
	buttonFallback: {
		color: _.muted,
		fontFamily: v,
		fontSize: g("--email-note-font-size"),
		fontWeight: Number(g("--email-font-weight")),
		lineHeight: g("--email-note-line-height"),
		margin: `${g("--email-button-fallback-margin-block-start")} 0 ${g("--email-button-margin-block-end")}`
	},
	buttonFallbackUrl: {
		color: _.text,
		wordBreak: "break-all",
		wordWrap: "break-word"
	},
	link: {
		color: _.text,
		fontFamily: v,
		fontWeight: Number(g("--email-font-weight")),
		textDecoration: "underline"
	}
}, T = "\n  a:hover { text-decoration: none !important; }\n";
//#endregion
//#region src/stories/email/EmailLayout.tsx
function E({ unsubscribeUrl: e, preferencesUrl: t, manageLabel: n = "Para dejar de recibir estos avisos,", unsubscribeLabel: r = t ? "Darse de baja" : "date de baja", manageBeforeLabel: i = " o ", managePreferencesLabel: a = "gestiona tus preferencias", manageAfterLabel: o = "." }) {
	let s = /* @__PURE__ */ p(c, {
		href: e,
		style: w.link,
		children: r
	});
	return t ? /* @__PURE__ */ m(d, {
		style: w.footnote,
		children: [
			s,
			i,
			/* @__PURE__ */ p(c, {
				href: t,
				style: w.link,
				children: a
			}),
			o
		]
	}) : /* @__PURE__ */ m(d, {
		style: w.footnote,
		children: [
			n,
			" ",
			s
		]
	});
}
function D({ preview: t, appName: a, locale: c = "es", assetsBaseUrl: d = S, logoAlt: f, optOut: h, children: v }) {
	let D = d.replace(/\/$/, "");
	return /* @__PURE__ */ m(o, {
		lang: c,
		children: [
			/* @__PURE__ */ m(i, { children: [/* @__PURE__ */ p(r, {
				fontFamily: "Google Sans Flex",
				fallbackFontFamily: "sans-serif",
				webFont: {
					url: `${D}/${C}`,
					format: "woff2"
				},
				fontWeight: y,
				fontStyle: "normal"
			}), /* @__PURE__ */ p("style", { dangerouslySetInnerHTML: { __html: T } })] }),
			/* @__PURE__ */ p(l, { children: t }),
			/* @__PURE__ */ p(e, {
				style: {
					backgroundColor: _.canvas,
					color: _.text,
					fontFamily: w.text.fontFamily,
					fontSize: w.text.fontSize,
					fontWeight: w.text.fontWeight,
					lineHeight: w.text.lineHeight,
					margin: 0,
					padding: 0
				},
				children: /* @__PURE__ */ m(u, {
					style: {
						backgroundColor: _.canvas,
						padding: `${g("--email-canvas-padding-block")} ${g("--email-canvas-padding-inline")}`,
						width: "100%"
					},
					children: [
						/* @__PURE__ */ p(n, {
							style: {
								backgroundColor: _.background,
								margin: "0 auto",
								maxWidth: b,
								padding: `${g("--email-brand-padding-block")} ${g("--email-brand-padding-inline")}`
							},
							children: /* @__PURE__ */ p(s, {
								src: `${D}/${x.filename}`,
								alt: f ?? a,
								width: x.size,
								height: x.size,
								style: {
									border: 0,
									display: "block"
								}
							})
						}),
						/* @__PURE__ */ p(n, {
							style: {
								backgroundColor: _.background,
								border: `${g("--email-border-width")} solid ${_.border}`,
								borderRadius: 0,
								margin: "0 auto",
								maxWidth: b,
								padding: `${g("--email-padding-block")} ${g("--email-padding-inline")}`
							},
							children: /* @__PURE__ */ p(u, { children: v })
						}),
						h && /* @__PURE__ */ p(n, {
							style: {
								backgroundColor: _.canvas,
								margin: "0 auto",
								maxWidth: b,
								padding: `${g("--email-opt-out-margin-block-start")} 0 0`
							},
							children: /* @__PURE__ */ p(E, { ...h })
						})
					]
				})
			})
		]
	});
}
//#endregion
//#region src/stories/email/EmailPrimitives.tsx
function O({ children: e, style: t }) {
	return /* @__PURE__ */ p(a, {
		style: {
			...w.heading,
			...t
		},
		children: e
	});
}
function k({ children: e, style: t }) {
	return /* @__PURE__ */ p(d, {
		style: {
			...w.text,
			...t
		},
		children: e
	});
}
function A({ children: e, tone: t = "muted", style: n }) {
	return /* @__PURE__ */ p(d, {
		style: {
			...t === "muted" ? w.muted : w.footnote,
			...n
		},
		children: e
	});
}
function j({ href: e, children: t, style: n }) {
	return /* @__PURE__ */ p(c, {
		href: e,
		style: {
			...w.link,
			...n
		},
		children: t
	});
}
function M({ href: e, children: n, fallbackLabel: r, style: i }) {
	return /* @__PURE__ */ m(f, { children: [/* @__PURE__ */ p(t, {
		href: e,
		style: {
			...w.button,
			marginBottom: 0,
			...i
		},
		children: n
	}), /* @__PURE__ */ m(d, {
		style: w.buttonFallback,
		children: [
			r,
			" ",
			/* @__PURE__ */ p("span", {
				style: w.buttonFallbackUrl,
				children: e
			})
		]
	})] });
}
//#endregion
export { M as EmailButton, O as EmailHeading, D as EmailLayout, j as EmailLink, A as EmailNote, k as EmailText, S as emailAssetsBaseUrl, v as emailFontFamily, C as emailFontFilename, x as emailLogo, b as emailMaxWidth, _ as emailPalette, T as emailStyleSheet, w as emailStyles };

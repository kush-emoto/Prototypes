"use client";

import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { useContent } from "@/context/content-context";
import type { HomeContent, Market } from "@/lib/types";

const sectionLabels: Record<keyof HomeContent["enabledSections"], string> = {
  products: "Featured products",
  intro: "Brand statement",
  benefits: "Benefits",
  reviews: "Rider reviews",
  newsletter: "Newsletter",
};

export default function StudioPage() {
  const { market, setMarket, content, save, reset } = useContent();
  const [draft, setDraft] = useState(content);
  const [status, setStatus] = useState("All changes saved in this browser");
  // A market switch replaces the editing document rather than merging drafts.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setDraft(content), [content]);

  function updateHero(field: keyof HomeContent["hero"], value: string) {
    setDraft((current) => ({ ...current, hero: { ...current.hero, [field]: value } }));
    setStatus("Unpublished changes");
  }

  function upload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 1_500_000) { setStatus("Choose an image below 1.5 MB for this browser demo"); return; }
    const reader = new FileReader();
    reader.onload = () => setDraft((current) => ({ ...current, hero: { ...current.hero, mediaUrl: String(reader.result), mediaType: "image" } }));
    reader.readAsDataURL(file);
    setStatus("Image ready to publish");
  }

  function publish() {
    save({ ...draft, updatedAt: new Date().toISOString() });
    setStatus(`Published locally at ${new Date().toLocaleTimeString()}`);
  }

  return (
    <div className="studio">
      <aside className="studio-nav">
        <img src="/emotorad-logo.png" alt="EMotorad"/>
        <p className="studio-label">CONTENT STUDIO</p>
        <button className="active">⌂ Home page</button><button>▦ Product catalogue</button><button>◆ Navigation</button><button>★ Reviews</button><button>⚑ Campaigns</button><button>◎ SEO & redirects</button>
        <div className="studio-note"><strong>Prototype mode</strong><p>Content persists in this browser. Connect Sanity for shared publishing, roles and asset storage.</p></div>
      </aside>
      <section className="studio-main">
        <header className="studio-toolbar"><div><p>Home page</p><span className="status-dot"/> {status}</div><div><select value={market} onChange={(e) => setMarket(e.target.value as Market)}><option value="IN">India · EN</option><option value="ES">Spain · ES</option></select><Link className="button outline small" href="/" target="_blank">Preview ↗</Link><button className="button dark small" onClick={publish}>Publish</button></div></header>
        <div className="studio-content">
          <div className="editor">
            <div className="editor-title"><div><p className="eyebrow">Homepage document</p><h1>{market === "IN" ? "India storefront" : "Spain storefront"}</h1></div><button className="text-button" onClick={() => { reset(market); setStatus("Reset to prototype defaults"); }}>Reset defaults</button></div>
            <fieldset><legend>Announcement bar</legend><label>Message<input value={draft.announcement} onChange={(e) => setDraft({ ...draft, announcement: e.target.value })}/></label></fieldset>
            <fieldset><legend>Hero</legend><div className="field-pair"><label>Eyebrow<input value={draft.hero.eyebrow} onChange={(e) => updateHero("eyebrow", e.target.value)}/></label><label>Media type<select value={draft.hero.mediaType} onChange={(e) => updateHero("mediaType", e.target.value)}><option value="video">Video</option><option value="image">Image</option></select></label></div><label>Headline<input value={draft.hero.title} onChange={(e) => updateHero("title", e.target.value)}/></label><label>Description<textarea rows={3} value={draft.hero.subtitle} onChange={(e) => updateHero("subtitle", e.target.value)}/></label><div className="field-pair"><label>CTA label<input value={draft.hero.ctaLabel} onChange={(e) => updateHero("ctaLabel", e.target.value)}/></label><label>CTA destination<input value={draft.hero.ctaHref} onChange={(e) => updateHero("ctaHref", e.target.value)}/></label></div><label>Media URL<input value={draft.hero.mediaUrl} onChange={(e) => updateHero("mediaUrl", e.target.value)}/></label><label className="upload">Upload replacement image<input type="file" accept="image/*" onChange={upload}/><span>Choose image</span><small>Browser demo limit: 1.5 MB</small></label></fieldset>
            <fieldset><legend>Brand statement</legend><label>Title<input value={draft.intro.title} onChange={(e) => setDraft({ ...draft, intro: { ...draft.intro, title: e.target.value } })}/></label><label>Body<textarea rows={3} value={draft.intro.body} onChange={(e) => setDraft({ ...draft, intro: { ...draft.intro, body: e.target.value } })}/></label></fieldset>
            <fieldset><legend>Page sections</legend><p className="help">Enable or hide homepage modules by market.</p>{Object.entries(sectionLabels).map(([key, label]) => <label className="toggle-row" key={key}><span><strong>{label}</strong><small>{key === "products" ? "Products remain sourced from the catalogue." : "Managed homepage module."}</small></span><input type="checkbox" checked={draft.enabledSections[key as keyof HomeContent["enabledSections"]]} onChange={(e) => setDraft({ ...draft, enabledSections: { ...draft.enabledSections, [key]: e.target.checked } })}/></label>)}</fieldset>
          </div>
          <aside className="live-preview"><div className="phone-bar"><span>Live preview</span><span>1440px ▾</span></div><div className="mini-site"><div className="mini-nav"><img src="/emotorad-logo.png" alt=""/><span>BIKES&nbsp;&nbsp; TEST RIDE&nbsp;&nbsp; SUPPORT</span></div><div className="mini-hero">{draft.hero.mediaType === "video" ? <video src={draft.hero.mediaUrl} autoPlay muted loop/> : <img src={draft.hero.mediaUrl} alt="Hero preview"/>}<div><small>{draft.hero.eyebrow}</small><h2>{draft.hero.title}</h2><p>{draft.hero.subtitle}</p><button>{draft.hero.ctaLabel}</button></div></div><div className="mini-block"><small>FIND YOUR RIDE</small><strong>Built for wherever you go</strong><div><i/><i/><i/></div></div></div></aside>
        </div>
      </section>
    </div>
  );
}

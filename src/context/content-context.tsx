"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { defaultContent } from "@/data/default-content";
import type { HomeContent, Market } from "@/lib/types";

const STORAGE_KEY = "emotorad-prototype-content-v1";
const EVENT_NAME = "emotorad-content-updated";

type ContentState = {
  market: Market;
  setMarket: (market: Market) => void;
  content: HomeContent;
  save: (content: HomeContent) => void;
  reset: (market: Market) => void;
};

const Context = createContext<ContentState | null>(null);

function readAll(): Record<Market, HomeContent> {
  if (typeof window === "undefined") return defaultContent;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? { ...defaultContent, ...JSON.parse(saved) } : defaultContent;
  } catch {
    return defaultContent;
  }
}

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [market, setMarket] = useState<Market>("IN");
  const [all, setAll] = useState<Record<Market, HomeContent>>(defaultContent);

  const refresh = useCallback(() => setAll(readAll()), []);
  useEffect(() => {
    // Hydrate from browser storage after SSR, then subscribe to CMS publishes.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener(EVENT_NAME, refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener(EVENT_NAME, refresh);
    };
  }, [refresh]);

  const save = useCallback((content: HomeContent) => {
    const next = { ...readAll(), [content.market]: content };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setAll(next);
    window.dispatchEvent(new Event(EVENT_NAME));
  }, []);

  const reset = useCallback((target: Market) => {
    const next = { ...readAll(), [target]: defaultContent[target] };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setAll(next);
    window.dispatchEvent(new Event(EVENT_NAME));
  }, []);

  const value = useMemo(() => ({ market, setMarket, content: all[market], save, reset }), [all, market, reset, save]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useContent() {
  const value = useContext(Context);
  if (!value) throw new Error("useContent must be used inside ContentProvider");
  return value;
}

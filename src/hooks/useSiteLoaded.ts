"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "aastha-intro-seen";

export function useSiteLoaded(showIntroLoader = true) {
  const [loaded, setLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem(STORAGE_KEY) === "1";
    if (seen || !showIntroLoader) {
      setLoaded(true);
      setShowLoader(false);
    } else {
      setShowLoader(true);
    }
  }, [showIntroLoader]);

  const onLoaderDone = useCallback(() => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setLoaded(true);
    setShowLoader(false);
  }, []);

  return { loaded, showLoader, onLoaderDone };
}

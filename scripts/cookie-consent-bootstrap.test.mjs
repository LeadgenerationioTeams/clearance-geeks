import assert from "node:assert/strict";
import test from "node:test";
import vm from "node:vm";

const { cookieBannerBootstrapScript, COOKIE_BAR_INITIAL_HEIGHT } = await import(
  "../src/lib/cookie-consent-bootstrap.ts",
);

test("cookieBannerBootstrapScript parses without syntax errors", () => {
  assert.doesNotThrow(() => {
    new Function(cookieBannerBootstrapScript);
  });
});

test("cookieBannerBootstrapScript sets banner attribute and --cookie-bar-h", () => {
  const storage = new Map();
  const styleProps = new Map();
  const documentElement = {
    dataset: {},
    style: {
      setProperty(name, value) {
        styleProps.set(name, value);
      },
    },
  };

  const context = {
    localStorage: {
      getItem(key) {
        return storage.get(key) ?? null;
      },
    },
    document: { documentElement },
  };

  vm.runInNewContext(cookieBannerBootstrapScript, context);

  assert.equal(documentElement.dataset.cookieBanner, "open");
  assert.equal(styleProps.get("--cookie-bar-h"), COOKIE_BAR_INITIAL_HEIGHT);
});

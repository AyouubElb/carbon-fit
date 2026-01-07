export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

export const pageview = (): void => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "PageView");
  }
};

export const event = (name: string, options: FBPixelEventParams = {}): void => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", name, options);
  }
};

// E-commerce events
export const trackViewContent = (productId: string, value: number): void => {
  event("ViewContent", {
    content_ids: [productId],
    content_type: "product",
    value,
    currency: "USD",
  });
};

export const trackAddToCart = (productId: string, value: number): void => {
  event("AddToCart", {
    content_ids: [productId],
    content_type: "product",
    value,
    currency: "USD",
  });
};

export const trackPurchase = (
  value: number,
  items: Array<{ id: string }>
): void => {
  event("Purchase", {
    content_ids: items.map((i) => i.id),
    content_type: "product",
    value,
    currency: "USD",
    num_items: items.length,
  });
};

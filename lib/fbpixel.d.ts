interface FBPixelEventParams {
  content_ids?: string[];
  content_type?: string;
  value?: number;
  currency?: string;
  num_items?: number;
  content_name?: string;
  content_category?: string;
  search_string?: string;
}

interface Window {
  fbq: (
    action: "track" | "init" | "trackCustom",
    eventName: string,
    params?: FBPixelEventParams
  ) => void;
  _fbq?: Window["fbq"];
}

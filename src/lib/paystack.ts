declare global {
  interface Window {
    PaystackPop?: {
      setup: (options: Record<string, unknown>) => {
        openIframe: () => void;
      };
    };
  }
}

let scriptPromise: Promise<void> | null = null;

export function loadPaystackScript(): Promise<void> {
  if (!scriptPromise) {
    scriptPromise = new Promise<void>((resolve, reject) => {
      if (window.PaystackPop) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v1/inline.js";
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => {
        scriptPromise = null;
        reject(new Error("Failed to load Paystack script"));
      };
      document.head.appendChild(script);
    });
  }
  return scriptPromise;
}

export type PaystackHandlers = {
  onSuccess?: (reference: string) => void;
  onClose?: () => void;
  onError?: () => void;
};

export async function openPaystackPopup(params: {
  email: string;
  amountKobo: number;
  reference: string;
  metadata?: Record<string, string>;
  handlers?: PaystackHandlers;
}) {
  await loadPaystackScript();
  if (!window.PaystackPop) {
    throw new Error("Paystack is unavailable");
  }

  const handler = window.PaystackPop.setup({
    key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    email: params.email,
    amount: params.amountKobo,
    ref: params.reference,
    currency: "NGN",
    metadata: params.metadata,
    callback: () => params.handlers?.onSuccess?.(params.reference),
    onClose: () => params.handlers?.onClose?.(),
  });

  handler.openIframe();
}

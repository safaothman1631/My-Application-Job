declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
          }) => void;
          prompt: (notification?: (notification: any) => void) => void;
          renderButton: (
            parent: HTMLElement,
            options: {
              theme?: 'outline' | 'filled_blue' | 'filled_black';
              size?: 'large' | 'medium' | 'small';
              type?: 'standard' | 'icon';
              shape?: 'rectangular' | 'pill' | 'circle' | 'square';
              text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
              logo_alignment?: 'left' | 'center';
              width?: string | number;
            }
          ) => void;
        };
      };
    };
  }
}

export interface GoogleAuthResponse {
  credential: string;
}

export interface GoogleAuthConfig {
  clientId: string;
  onSuccess: (response: GoogleAuthResponse) => void;
  onError?: (error: any) => void;
}

export const initializeGoogleAuth = (config: GoogleAuthConfig) => {
  if (typeof window === 'undefined') return;

  // Load Google Identity Services script
  const script = document.createElement('script');
  script.src = 'https://accounts.google.com/gsi/client';
  script.async = true;
  script.defer = true;
  
  script.onload = () => {
    window.google?.accounts.id.initialize({
      client_id: config.clientId,
      callback: config.onSuccess,
      auto_select: false,
      cancel_on_tap_outside: true,
    });
  };

  document.head.appendChild(script);
};

export const triggerGoogleOneTap = () => {
  if (typeof window === 'undefined' || !window.google) return;
  
  window.google.accounts.id.prompt((notification: any) => {
    if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
      console.log('Google One Tap was not displayed or was skipped');
    }
  });
};

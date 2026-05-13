package com.darmon.capoeria;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Insets;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.speech.tts.TextToSpeech;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowInsets;
import android.webkit.JavascriptInterface;
import android.webkit.MimeTypeMap;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;
import android.widget.Toast;
import java.io.IOException;
import java.io.InputStream;
import java.util.Locale;

public final class MainActivity extends Activity {
    private static final String ORIGIN = "https://darmon.local";
    private static final String ASSET_ROOT = "public/";
    private static final int NIGHT = 0xFF151313;
    private FrameLayout rootView;
    private WebView webView;
    private TextToSpeech textToSpeech;
    private boolean ttsReady;
    private String pendingSpeech;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        configureSystemBars();

        rootView = new FrameLayout(this);
        rootView.setBackgroundColor(NIGHT);
        applySystemInsets(rootView);

        webView = new WebView(this);
        webView.setBackgroundColor(NIGHT);
        webView.setOverScrollMode(View.OVER_SCROLL_NEVER);

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setAllowContentAccess(false);
        settings.setAllowFileAccess(false);
        settings.setBuiltInZoomControls(false);
        settings.setDisplayZoomControls(false);

        textToSpeech = new TextToSpeech(
                this,
                status -> {
                    if (status == TextToSpeech.SUCCESS) {
                        Locale hebrew = new Locale("he", "IL");
                        int result = textToSpeech.setLanguage(hebrew);
                        if (result == TextToSpeech.LANG_MISSING_DATA
                                || result == TextToSpeech.LANG_NOT_SUPPORTED) {
                            textToSpeech.setLanguage(Locale.getDefault());
                        }
                        textToSpeech.setSpeechRate(0.92f);
                        ttsReady = true;
                        if (pendingSpeech != null) {
                            speakNow(pendingSpeech);
                            pendingSpeech = null;
                        }
                    }
                });

        webView.addJavascriptInterface(new TtsBridge(), "AndroidTts");
        webView.addJavascriptInterface(new LinkBridge(), "AndroidLinks");
        webView.setWebViewClient(new LocalAssetClient());
        rootView.addView(
                webView,
                new FrameLayout.LayoutParams(
                        ViewGroup.LayoutParams.MATCH_PARENT,
                        ViewGroup.LayoutParams.MATCH_PARENT));
        setContentView(rootView);
        webView.loadUrl(ORIGIN + "/");
    }

    private void configureSystemBars() {
        Window window = getWindow();
        window.setStatusBarColor(NIGHT);
        window.setNavigationBarColor(NIGHT);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            window.setDecorFitsSystemWindows(false);
        }
    }

    private void applySystemInsets(View view) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            view.setOnApplyWindowInsetsListener(
                    (target, insets) -> {
                        Insets bars = insets.getInsets(WindowInsets.Type.systemBars());
                        target.setPadding(bars.left, bars.top, bars.right, bars.bottom);
                        return WindowInsets.CONSUMED;
                    });
            return;
        }
        view.setFitsSystemWindows(true);
    }

    @Override
    public void onBackPressed() {
        if ((webView != null) && webView.canGoBack()) {
            webView.goBack();
            return;
        }
        super.onBackPressed();
    }

    @Override
    protected void onDestroy() {
        if (textToSpeech != null) {
            textToSpeech.stop();
            textToSpeech.shutdown();
            textToSpeech = null;
        }
        if (webView != null) {
            webView.destroy();
            webView = null;
        }
        super.onDestroy();
    }

    private void speakNow(String text) {
        if (textToSpeech == null) {
            return;
        }
        textToSpeech.stop();
        textToSpeech.speak(text, TextToSpeech.QUEUE_FLUSH, null, "darmon-capoeira-tts");
    }

    private final class TtsBridge {
        @JavascriptInterface
        public void speak(String text) {
            runOnUiThread(() -> {
                if (!ttsReady) {
                    pendingSpeech = text;
                    return;
                }
                speakNow(text);
            });
        }

        @JavascriptInterface
        public void stop() {
            runOnUiThread(() -> {
                pendingSpeech = null;
                if (textToSpeech != null) {
                    textToSpeech.stop();
                }
            });
        }
    }

    private final class LinkBridge {
        @JavascriptInterface
        public void open(String url) {
            runOnUiThread(() -> {
                try {
                    Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                    startActivity(intent);
                } catch (RuntimeException exception) {
                    Toast.makeText(MainActivity.this, "לא הצלחתי לפתוח וידאו", Toast.LENGTH_SHORT).show();
                }
            });
        }
    }

    private final class LocalAssetClient extends WebViewClient {
        @Override
        public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
            return loadAsset(request.getUrl());
        }

        @SuppressWarnings("deprecation")
        @Override
        public WebResourceResponse shouldInterceptRequest(WebView view, String url) {
            return loadAsset(Uri.parse(url));
        }

        private WebResourceResponse loadAsset(Uri uri) {
            if (!"https".equals(uri.getScheme()) || !"darmon.local".equals(uri.getHost())) {
                return null;
            }

            String path = uri.getPath();
            if ((path == null) || "/".equals(path)) {
                path = "/index.html";
            }

            if (path.contains("..")) {
                return null;
            }

            String assetPath = ASSET_ROOT + path.substring(1);
            try {
                InputStream input = getAssets().open(assetPath);
                return new WebResourceResponse(mimeType(assetPath), "UTF-8", input);
            } catch (IOException ignored) {
                return null;
            }
        }

        private String mimeType(String assetPath) {
            if (assetPath.endsWith(".webmanifest")) {
                return "application/manifest+json";
            }
            String extension = MimeTypeMap.getFileExtensionFromUrl(assetPath);
            String type = MimeTypeMap.getSingleton().getMimeTypeFromExtension(extension);
            if (type != null) {
                return type;
            }
            if (assetPath.endsWith(".js")) {
                return "application/javascript";
            }
            if (assetPath.endsWith(".css")) {
                return "text/css";
            }
            return "text/plain";
        }
    }
}

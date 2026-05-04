#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ANDROID_TOOLING="/localdrive/users/giladdar/android-tooling"
GRADLE="$ANDROID_TOOLING/gradle-8.10.2/bin/gradle"
ANDROID_HOME="$ANDROID_TOOLING/sdk"
WRAPPER_DIR="$SCRIPT_DIR/android-wrapper"
VERSION_FILE="$SCRIPT_DIR/version.properties"
KEYSTORE_FILE="$SCRIPT_DIR/keystores/darmon-upload.jks"
KEYSTORE_PROPS="$SCRIPT_DIR/keystore.properties"

if [ ! -x "$GRADLE" ]; then
  echo "Missing Gradle at: $GRADLE" >&2
  exit 1
fi

if [ ! -f "$KEYSTORE_FILE" ] || [ ! -f "$KEYSTORE_PROPS" ]; then
  mkdir -p "$SCRIPT_DIR/keystores"
  STORE_PASS="$(openssl rand -base64 24 | tr -d '\n')"
  KEY_PASS="$(openssl rand -base64 24 | tr -d '\n')"
  keytool -genkeypair \
    -v \
    -keystore "$KEYSTORE_FILE" \
    -storetype PKCS12 \
    -alias darmon-upload \
    -keyalg RSA \
    -keysize 2048 \
    -validity 10000 \
    -storepass "$STORE_PASS" \
    -keypass "$KEY_PASS" \
    -dname "CN=Gilad Darmon, OU=CapoeiraMath, O=Darmon, L=Tel Aviv, ST=Israel, C=IL"
  {
    echo "storeFile=keystores/darmon-upload.jks"
    echo "storePassword=$STORE_PASS"
    echo "keyAlias=darmon-upload"
    echo "keyPassword=$KEY_PASS"
  } > "$KEYSTORE_PROPS"
fi

VERSION_CODE=$(grep versionCode "$VERSION_FILE" | cut -d= -f2)
VERSION_NAME=$(grep versionName "$VERSION_FILE" | cut -d= -f2)
NEW_CODE=$((VERSION_CODE + 1))
sed -i "s/versionCode=.*/versionCode=$NEW_CODE/" "$VERSION_FILE"

echo "Building Darmon Capoeira Play bundle v$VERSION_NAME (code $NEW_CODE)..."

PUBLIC_DIR="$WRAPPER_DIR/app/src/main/assets/public"
rm -rf "$PUBLIC_DIR"
mkdir -p "$PUBLIC_DIR"
cp "$SCRIPT_DIR/index.html"            "$PUBLIC_DIR/index.html"
cp "$SCRIPT_DIR/styles.css"            "$PUBLIC_DIR/styles.css"
cp "$SCRIPT_DIR/app.js"                "$PUBLIC_DIR/app.js"
cp "$SCRIPT_DIR/privacy-policy.html"   "$PUBLIC_DIR/privacy-policy.html"
cp "$SCRIPT_DIR/manifest.webmanifest"  "$PUBLIC_DIR/manifest.webmanifest"
cp "$SCRIPT_DIR/service-worker.js"     "$PUBLIC_DIR/service-worker.js"
cp -R "$SCRIPT_DIR/assets"             "$PUBLIC_DIR/assets"

ANDROID_HOME="$ANDROID_HOME" "$GRADLE" -p "$WRAPPER_DIR" bundleRelease

BUNDLE_SRC="$WRAPPER_DIR/app/build/outputs/bundle/release/app-release.aab"
BUNDLE_OUT="$SCRIPT_DIR/darmon-capoeira-$VERSION_NAME.aab"
cp "$BUNDLE_SRC" "$BUNDLE_OUT"

echo ""
echo "AAB ready: $BUNDLE_OUT"
echo "Version: $VERSION_NAME (code $NEW_CODE)"
echo ""
echo "Upload this AAB to Google Play Console."

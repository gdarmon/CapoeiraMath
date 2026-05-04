#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ANDROID_TOOLING="/localdrive/users/giladdar/android-tooling"
GRADLE="$ANDROID_TOOLING/gradle-8.10.2/bin/gradle"
ANDROID_HOME="$ANDROID_TOOLING/sdk"
WRAPPER_DIR="$SCRIPT_DIR/android-wrapper"
VERSION_FILE="$SCRIPT_DIR/version.properties"

# Read current versions
VERSION_CODE=$(grep versionCode "$VERSION_FILE" | cut -d= -f2)
VERSION_NAME=$(grep versionName "$VERSION_FILE" | cut -d= -f2)

# Auto-increment versionCode (Google Play requires strictly increasing codes)
NEW_CODE=$((VERSION_CODE + 1))
sed -i "s/versionCode=.*/versionCode=$NEW_CODE/" "$VERSION_FILE"

echo "Building Darmon Capoeira v$VERSION_NAME (code $NEW_CODE)..."

# Sync web assets into Android project
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

# Build
ANDROID_HOME="$ANDROID_HOME" "$GRADLE" -p "$WRAPPER_DIR" assembleDebug

# Copy APK with versioned name
APK_SRC="$WRAPPER_DIR/app/build/outputs/apk/debug/app-debug.apk"
APK_OUT="$SCRIPT_DIR/darmon-capoeira-$VERSION_NAME.apk"
cp "$APK_SRC" "$APK_OUT"
cp "$APK_SRC" "$SCRIPT_DIR/DarmonGinga-debug.apk"

echo ""
echo "APK ready: $APK_OUT"
echo "Stable debug copy: $SCRIPT_DIR/DarmonGinga-debug.apk"
echo "Version: $VERSION_NAME (code $NEW_CODE)"
echo ""
echo "Upload to: https://play.google.com/console -> Internal app sharing"

#!/bin/bash
set -e

echo "=== 1. Checking / Generating Release Keystore ==="
if [ ! -f /workspace/android/app/release.keystore ]; then
  keytool -genkey -v -keystore /workspace/android/app/release.keystore -alias aww2ww -keyalg RSA -keysize 2048 -validity 10000 -storepass aww2ww123 -keypass aww2ww123 -dname "CN=aww2ww, OU=Mobile, O=Artistwala, L=Kolkata, ST=WB, C=IN"
  echo "Keystore generated successfully!"
else
  echo "Release keystore already exists."
fi

echo "=== 2. Installing Android SDK 36 Platform & Accepting Licenses ==="
yes | sdkmanager --licenses > /dev/null 2>&1 || true
sdkmanager "platforms;android-36" > /dev/null 2>&1 || true

echo "=== 3. Building Release Android App Bundle (.AAB) ==="
chmod +x /workspace/android/gradlew
cd /workspace/android
./gradlew bundleRelease --no-daemon

echo "=== 4. Build Finished! ==="
ls -lh /workspace/android/app/build/outputs/bundle/release/

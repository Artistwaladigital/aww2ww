#!/bin/bash
set -e

echo "=== 1. Checking / Generating Release Keystore ==="
if [ ! -f /workspace/app/release.keystore ]; then
  keytool -genkey -v -keystore /workspace/app/release.keystore -alias aww2ww -keyalg RSA -keysize 2048 -validity 10000 -storepass aww2ww123 -keypass aww2ww123 -dname "CN=aww2ww, OU=Mobile, O=Artistwala, L=Kolkata, ST=WB, C=IN"
  echo "Keystore generated successfully!"
else
  echo "Release keystore already exists."
fi

echo "=== 2. Building Release Android App Bundle (.AAB) ==="
chmod +x /workspace/gradlew
cd /workspace
./gradlew bundleRelease --no-daemon

echo "=== 3. Build Finished! ==="
ls -lh /workspace/app/build/outputs/bundle/release/

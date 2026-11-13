#!/bin/bash
set -e

echo "=== 1. Checking / Generating Release Keystore ==="
if [ ! -f /workspace/android/app/release.keystore ]; then
  keytool -genkey -v -keystore /workspace/android/app/release.keystore -alias aww2ww -keyalg RSA -keysize 2048 -validity 10000 -storepass aww2ww123 -keypass aww2ww123 -dname "CN=aww2ww, OU=Mobile, O=Artistwala, L=Kolkata, ST=WB, C=IN"
  echo "Keystore generated successfully!"
else
  echo "Release keystore already exists."
fi

echo "=== 2. Exporting Public Certificate for Google Play Console ==="
keytool -export -rfc -keystore /workspace/android/app/release.keystore -alias aww2ww -storepass aww2ww123 -file /workspace/android/app/aww2ww_certificate.pem -noprompt || true
keytool -export -keystore /workspace/android/app/release.keystore -alias aww2ww -storepass aww2ww123 -file /workspace/android/app/aww2ww_cert.der -noprompt || true

echo "=== 3. Installing Android SDK 36 Platform & Accepting Licenses ==="
yes | sdkmanager --licenses > /dev/null 2>&1 || true
sdkmanager "platforms;android-36" > /dev/null 2>&1 || true

echo "=== 4. Ensuring Gradle Binary is ready ==="
if [ ! -f /workspace/gradle-bin/bin/gradle ]; then
  echo "Downloading Gradle 8.14.3 from GitHub release mirror..."
  mkdir -p /workspace/gradle-bin
  curl -sSL https://github.com/gradle/gradle-distributions/releases/download/v8.14.3/gradle-8.14.3-bin.zip -o /tmp/gradle.zip
  unzip -q /tmp/gradle.zip -d /tmp/gradle-extracted
  mv /tmp/gradle-extracted/gradle-8.14.3/* /workspace/gradle-bin/
  rm -rf /tmp/gradle.zip /tmp/gradle-extracted
fi

export PATH="/workspace/gradle-bin/bin:$PATH"

echo "=== 5. Building Release Android App Bundle (.AAB) and Release APK (.APK) ==="
cd /workspace/android
gradle bundleRelease assembleRelease --no-daemon

echo "=== 6. Build Finished Successfully! ==="
ls -lh /workspace/android/app/build/outputs/bundle/release/
ls -lh /workspace/android/app/build/outputs/apk/release/
ls -lh /workspace/android/app/aww2ww_certificate.pem

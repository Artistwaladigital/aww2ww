package com.aww2ww.app.ui.main

import android.Manifest
import android.annotation.SuppressLint
import android.app.DownloadManager
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.os.Environment
import android.view.View
import android.webkit.CookieManager
import android.webkit.DownloadListener
import android.webkit.PermissionRequest
import android.webkit.URLUtil
import android.webkit.ValueCallback
import android.webkit.WebChromeClient
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.activity.OnBackPressedCallback
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import com.aww2ww.app.databinding.ActivityMainBinding

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    private var filePathCallback: ValueCallback<Array<Uri>>? = null
    private var lastBackPressTime: Long = 0

    companion object {
        const val BASE_URL = "https://aww2ww.com"
        const val APP_USER_AGENT_SUFFIX = " aww2ww-Android-App/1.0.0 (Mobile)"
    }

    // File Chooser Launcher (Images, Videos, Camera)
    private val fileChooserLauncher = registerForActivityResult(
        ActivityResultContracts.StartActivityForResult()
    ) { result ->
        if (result.resultCode == RESULT_OK) {
            val intentData = result.data
            val uris = when {
                intentData?.clipData != null -> {
                    val count = intentData.clipData!!.itemCount
                    val list = mutableListOf<Uri>()
                    for (i in 0 until count) {
                        list.add(intentData.clipData!!.getItemAt(i).uri)
                    }
                    list.toTypedArray()
                }
                intentData?.data != null -> {
                    arrayOf(intentData.data!!)
                }
                else -> null
            }
            filePathCallback?.onReceiveValue(uris)
        } else {
            filePathCallback?.onReceiveValue(null)
        }
        filePathCallback = null
    }

    // Runtime Permission Launcher
    private val requestPermissionsLauncher = registerForActivityResult(
        ActivityResultContracts.RequestMultiplePermissions()
    ) { permissions ->
        // Permissions handled
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        checkAndRequestPermissions()
        setupWebView()
        setupSwipeRefresh()
        setupBackNavigation()
        setupRetryButton()

        // Load production web application
        loadUrl(BASE_URL)
    }

    private fun checkAndRequestPermissions() {
        val permissions = mutableListOf(
            Manifest.permission.CAMERA,
            Manifest.permission.RECORD_AUDIO
        )

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            permissions.add(Manifest.permission.READ_MEDIA_IMAGES)
            permissions.add(Manifest.permission.READ_MEDIA_VIDEO)
        } else {
            permissions.add(Manifest.permission.READ_EXTERNAL_STORAGE)
        }

        val needed = permissions.filter {
            ContextCompat.checkSelfPermission(this, it) != PackageManager.PERMISSION_GRANTED
        }

        if (needed.isNotEmpty()) {
            requestPermissionsLauncher.launch(needed.toTypedArray())
        }
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun setupWebView() {
        val webView = binding.webView

        // Enable Cookies
        val cookieManager = CookieManager.getInstance()
        cookieManager.setAcceptCookie(true)
        cookieManager.setAcceptThirdPartyCookies(webView, true)

        // WebSettings
        val settings = webView.settings
        settings.javaScriptEnabled = true
        settings.domStorageEnabled = true
        settings.databaseEnabled = true
        settings.allowFileAccess = true
        settings.allowContentAccess = true
        settings.useWideViewPort = true
        settings.loadWithOverviewMode = true
        settings.cacheMode = WebSettings.LOAD_DEFAULT
        settings.mediaPlaybackRequiresUserGesture = false // Enable auto-playing reels
        settings.mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW

        // Set Mobile App User-Agent
        settings.userAgentString = settings.userAgentString + APP_USER_AGENT_SUFFIX

        // WebChromeClient (File uploads, camera, progress)
        webView.webChromeClient = object : WebChromeClient() {
            override fun onProgressChanged(view: WebView?, newProgress: Int) {
                if (newProgress < 100) {
                    binding.progressBar.visibility = View.VISIBLE
                    binding.progressBar.progress = newProgress
                } else {
                    binding.progressBar.visibility = View.GONE
                    binding.splashOverlay.visibility = View.GONE
                }
            }

            override fun onShowFileChooser(
                webView: WebView?,
                filePathCallback: ValueCallback<Array<Uri>>?,
                fileChooserParams: FileChooserParams?
            ): Boolean {
                this@MainActivity.filePathCallback?.onReceiveValue(null)
                this@MainActivity.filePathCallback = filePathCallback

                val contentIntent = Intent(Intent.ACTION_GET_CONTENT).apply {
                    addCategory(Intent.CATEGORY_OPENABLE)
                    type = "*/*"
                    putExtra(Intent.EXTRA_MIME_TYPES, arrayOf("image/*", "video/*"))
                    putExtra(Intent.EXTRA_ALLOW_MULTIPLE, true)
                }

                val chooserIntent = Intent.createChooser(contentIntent, "Choose Media or Camera")
                fileChooserLauncher.launch(chooserIntent)
                return true
            }

            override fun onPermissionRequest(request: PermissionRequest?) {
                request?.grant(request.resources)
            }
        }

        // WebViewClient (URL overrides, error handling)
        webView.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
                val url = request?.url?.toString() ?: return false

                // Keep aww2ww urls inside WebView
                if (url.contains("aww2ww.com") || url.contains("201.18.203.238")) {
                    return false
                }

                // Handle external apps (mailto, tel, whatsapp, etc.)
                return try {
                    val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
                    startActivity(intent)
                    true
                } catch (e: Exception) {
                    false
                }
            }

            override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
                binding.offlineView.visibility = View.GONE
            }

            override fun onPageFinished(view: WebView?, url: String?) {
                binding.swipeRefreshLayout.isRefreshing = false
                binding.splashOverlay.visibility = View.GONE
                CookieManager.getInstance().flush()
            }

            override fun onReceivedError(
                view: WebView?,
                request: WebResourceRequest?,
                error: WebResourceError?
            ) {
                if (request?.isForMainFrame == true) {
                    binding.swipeRefreshLayout.isRefreshing = false
                    binding.splashOverlay.visibility = View.GONE
                    binding.offlineView.visibility = View.VISIBLE
                }
            }
        }

        // Download Listener (APK, certificate, images)
        webView.setDownloadListener(DownloadListener { url, userAgent, contentDisposition, mimetype, contentLength ->
            try {
                val request = DownloadManager.Request(Uri.parse(url))
                request.setMimeType(mimetype)
                val cookies = CookieManager.getInstance().getCookie(url)
                request.addRequestHeader("cookie", cookies)
                request.addRequestHeader("User-Agent", userAgent)
                request.setDescription("Downloading file from aww2ww...")
                request.setTitle(URLUtil.guessFileName(url, contentDisposition, mimetype))
                request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED)
                request.setDestinationInExternalPublicDir(
                    Environment.DIRECTORY_DOWNLOADS,
                    URLUtil.guessFileName(url, contentDisposition, mimetype)
                )

                val dm = getSystemService(Context.DOWNLOAD_SERVICE) as DownloadManager
                dm.enqueue(request)
                Toast.makeText(this, "Downloading file...", Toast.LENGTH_SHORT).show()
            } catch (e: Exception) {
                // Fallback to external browser
                val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
                startActivity(intent)
            }
        })
    }

    private fun setupSwipeRefresh() {
        val refresh = binding.swipeRefreshLayout
        refresh.setColorSchemeColors(
            ContextCompat.getColor(this, com.aww2ww.app.R.color.primary),
            ContextCompat.getColor(this, com.aww2ww.app.R.color.secondary)
        )

        // Only allow refresh when at top of webView
        refresh.setOnChildScrollUpCallback { _, _ ->
            binding.webView.scrollY > 0
        }

        refresh.setOnRefreshListener {
            binding.webView.reload()
        }
    }

    private fun setupBackNavigation() {
        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (binding.webView.canGoBack()) {
                    binding.webView.goBack()
                } else {
                    if (System.currentTimeMillis() - lastBackPressTime < 2000) {
                        finish()
                    } else {
                        lastBackPressTime = System.currentTimeMillis()
                        Toast.makeText(this@MainActivity, "Press back again to exit", Toast.LENGTH_SHORT).show()
                    }
                }
            }
        })
    }

    private fun setupRetryButton() {
        binding.btnRetry.setOnClickListener {
            binding.offlineView.visibility = View.GONE
            binding.splashOverlay.visibility = View.VISIBLE
            loadUrl(BASE_URL)
        }
    }

    private fun loadUrl(url: String) {
        binding.webView.loadUrl(url)
    }

    override fun onResume() {
        super.onResume()
        binding.webView.onResume()
        CookieManager.getInstance().flush()
    }

    override fun onPause() {
        super.onPause()
        binding.webView.onPause()
        CookieManager.getInstance().flush()
    }

    override fun onDestroy() {
        binding.webView.destroy()
        super.onDestroy()
    }
}

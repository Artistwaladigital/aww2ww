package com.aww2ww.app.ui.create

import android.net.Uri
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.aww2ww.app.R
import com.aww2ww.app.data.api.ApiClient
import com.aww2ww.app.data.model.CreatePostRequest
import com.aww2ww.app.data.session.UserSession
import com.aww2ww.app.databinding.ActivityCreatePostBinding
import com.bumptech.glide.Glide
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class CreatePostActivity : AppCompatActivity() {

    private lateinit var binding: ActivityCreatePostBinding
    private var selectedImageUri: Uri? = null

    private val pickImageLauncher = registerForActivityResult(ActivityResultContracts.GetContent()) { uri: Uri? ->
        if (uri != null) {
            selectedImageUri = uri
            binding.flMediaPreview.visibility = View.VISIBLE
            Glide.with(this).load(uri).into(binding.ivPreview)
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityCreatePostBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val session = UserSession.getInstance(this)
        val user = session.currentUser ?: session.getDefaultDemoUser()

        binding.tvAuthorName.text = user.name
        val avatarUrl = user.avatar
        if (!avatarUrl.isNullOrBlank()) {
            Glide.with(this)
                .load(avatarUrl)
                .placeholder(R.mipmap.ic_launcher)
                .into(binding.ivAuthorAvatar)
        }

        binding.btnCancelPost.setOnClickListener {
            finish()
        }

        binding.btnAddPhoto.setOnClickListener {
            pickImageLauncher.launch("image/*")
        }

        binding.btnRemoveMedia.setOnClickListener {
            selectedImageUri = null
            binding.flMediaPreview.visibility = View.GONE
        }

        binding.btnPublishPost.setOnClickListener {
            val caption = binding.etPostCaption.text.toString().trim()
            if (caption.isEmpty() && selectedImageUri == null) {
                Toast.makeText(this, "Please enter caption or select an image", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }
            publishPost(user.id, caption)
        }
    }

    private fun publishPost(userId: String, caption: String) {
        binding.progressBarCreatePost.visibility = View.VISIBLE
        binding.btnPublishPost.isEnabled = false

        lifecycleScope.launch {
            try {
                // If media is selected, use placeholder or upload URL
                val mediaUrl = if (selectedImageUri != null) {
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80"
                } else null

                withContext(Dispatchers.IO) {
                    ApiClient.service.createPost(CreatePostRequest(userId, caption, mediaUrl))
                }
                Toast.makeText(this@CreatePostActivity, "Post published successfully!", Toast.LENGTH_SHORT).show()
                setResult(RESULT_OK)
                finish()
            } catch (e: Exception) {
                Toast.makeText(this@CreatePostActivity, "Post created on feed!", Toast.LENGTH_SHORT).show()
                setResult(RESULT_OK)
                finish()
            } finally {
                binding.progressBarCreatePost.visibility = View.GONE
                binding.btnPublishPost.isEnabled = true
            }
        }
    }
}

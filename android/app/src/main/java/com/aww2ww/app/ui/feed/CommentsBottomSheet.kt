package com.aww2ww.app.ui.feed

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.lifecycle.lifecycleScope
import com.aww2ww.app.data.api.ApiClient
import com.aww2ww.app.data.model.AddCommentRequest
import com.aww2ww.app.data.model.Post
import com.aww2ww.app.data.model.PostComment
import com.aww2ww.app.data.session.UserSession
import com.aww2ww.app.databinding.BottomSheetCommentsBinding
import com.google.android.material.bottomsheet.BottomSheetDialogFragment
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class CommentsBottomSheet(
    private val post: Post
) : BottomSheetDialogFragment() {

    private var _binding: BottomSheetCommentsBinding? = null
    private val binding get() = _binding!!

    private lateinit var adapter: CommentsAdapter
    private val commentsList = mutableListOf<PostComment>()

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = BottomSheetCommentsBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        adapter = CommentsAdapter(commentsList)
        binding.rvComments.adapter = adapter

        // Load initial comments from post object if available
        post.comments?.let {
            commentsList.addAll(it)
            adapter.updateComments(commentsList)
        }

        fetchComments()

        binding.btnSendComment.setOnClickListener {
            val text = binding.etCommentInput.text.toString().trim()
            if (text.isNotEmpty()) {
                submitComment(text)
            }
        }
    }

    private fun fetchComments() {
        lifecycleScope.launch {
            try {
                binding.progressBarComments.visibility = View.VISIBLE
                val comments = withContext(Dispatchers.IO) {
                    ApiClient.service.getComments(post.id)
                }
                commentsList.clear()
                commentsList.addAll(comments)
                adapter.updateComments(commentsList)
            } catch (e: Exception) {
                // If API endpoint fails, we already have initial comments from post object
            } finally {
                binding.progressBarComments.visibility = View.GONE
            }
        }
    }

    private fun submitComment(text: String) {
        val session = UserSession.getInstance(requireContext())
        val user = session.currentUser ?: session.getDefaultDemoUser()

        val optimisticComment = PostComment(
            id = "c_${System.currentTimeMillis()}",
            userId = user.id,
            userName = user.name,
            userAvatar = user.avatar,
            text = text,
            timestamp = "Just now"
        )
        commentsList.add(optimisticComment)
        adapter.updateComments(commentsList)
        binding.rvComments.scrollToPosition(commentsList.size - 1)
        binding.etCommentInput.setText("")

        lifecycleScope.launch {
            try {
                withContext(Dispatchers.IO) {
                    ApiClient.service.addComment(post.id, AddCommentRequest(user.id, text))
                }
            } catch (e: Exception) {
                Toast.makeText(context, "Comment saved locally", Toast.LENGTH_SHORT).show()
            }
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}

package com.aww2ww.app.ui.feed

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.lifecycleScope
import com.aww2ww.app.data.api.ApiClient
import com.aww2ww.app.data.model.Post
import com.aww2ww.app.data.model.ReactRequest
import com.aww2ww.app.data.model.Story
import com.aww2ww.app.databinding.FragmentFeedBinding
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class FeedFragment : Fragment() {

    private var _binding: FragmentFeedBinding? = null
    private val binding get() = _binding!!

    private lateinit var storyAdapter: StoryAdapter
    private lateinit var postAdapter: PostAdapter

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentFeedBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setupRecyclerViews()
        loadFeedData()

        binding.swipeRefresh.setOnRefreshListener {
            loadFeedData()
        }
    }

    private fun setupRecyclerViews() {
        storyAdapter = StoryAdapter(emptyList()) { story ->
            Toast.makeText(context, "Viewing story by ${story.user?.name ?: "User"}", Toast.LENGTH_SHORT).show()
        }
        binding.rvStories.adapter = storyAdapter

        postAdapter = PostAdapter(
            emptyList(),
            onLikeClick = { post, isLiked ->
                handleLike(post, isLiked)
            },
            onCommentClick = { post ->
                val bottomSheet = CommentsBottomSheet(post)
                bottomSheet.show(parentFragmentManager, "CommentsBottomSheet")
            }
        )
        binding.rvPosts.adapter = postAdapter
    }

    private fun loadFeedData() {
        lifecycleScope.launch {
            binding.progressBarFeed.visibility = View.VISIBLE
            try {
                val posts = withContext(Dispatchers.IO) {
                    ApiClient.service.getPosts()
                }
                postAdapter.updatePosts(posts)

                try {
                    val stories = withContext(Dispatchers.IO) {
                        ApiClient.service.getStories()
                    }
                    storyAdapter.updateStories(stories)
                } catch (e: Exception) {
                    // Stories optional fallback
                }
            } catch (e: Exception) {
                context?.let {
                    Toast.makeText(it, "Unable to refresh feed: ${e.message}", Toast.LENGTH_SHORT).show()
                }
            } finally {
                binding.progressBarFeed.visibility = View.GONE
                binding.swipeRefresh.isRefreshing = false
            }
        }
    }

    private fun handleLike(post: Post, isLiked: Boolean) {
        lifecycleScope.launch(Dispatchers.IO) {
            try {
                ApiClient.service.reactToPost(post.id, ReactRequest(if (isLiked) "like" else "unlike"))
            } catch (e: Exception) {
                // Ignore silent like failure
            }
        }
    }

    override fun onResume() {
        super.onResume()
        loadFeedData()
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}

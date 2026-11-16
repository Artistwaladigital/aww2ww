package com.aww2ww.app.ui.feed

import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.aww2ww.app.R
import com.aww2ww.app.data.model.Post
import com.aww2ww.app.databinding.ItemPostBinding
import com.bumptech.glide.Glide

class PostAdapter(
    private var posts: List<Post>,
    private val onLikeClick: (Post, Boolean) -> Unit,
    private val onCommentClick: (Post) -> Unit
) : RecyclerView.Adapter<PostAdapter.PostViewHolder>() {

    private val likedPosts = mutableSetOf<String>()

    fun updatePosts(newPosts: List<Post>) {
        posts = newPosts
        likedPosts.clear()
        newPosts.forEach { post ->
            if (post.reactions?.userReaction != null) {
                likedPosts.add(post.id)
            }
        }
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): PostViewHolder {
        val binding = ItemPostBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return PostViewHolder(binding)
    }

    override fun onBindViewHolder(holder: PostViewHolder, position: Int) {
        holder.bind(posts[position])
    }

    override fun getItemCount(): Int = posts.size

    inner class PostViewHolder(private val binding: ItemPostBinding) : RecyclerView.ViewHolder(binding.root) {
        fun bind(post: Post) {
            val user = post.user
            binding.tvPostUserName.text = user?.name ?: user?.username ?: "User"
            binding.tvPostTime.text = post.timestamp ?: "Just now"
            binding.ivPostVerified.visibility = if (user?.isVerified == true) View.VISIBLE else View.GONE

            // User avatar
            val avatarUrl = user?.avatar
            if (!avatarUrl.isNullOrBlank()) {
                Glide.with(binding.root.context)
                    .load(avatarUrl)
                    .placeholder(R.mipmap.ic_launcher)
                    .error(R.mipmap.ic_launcher)
                    .into(binding.ivPostUserAvatar)
            } else {
                binding.ivPostUserAvatar.setImageResource(R.mipmap.ic_launcher)
            }

            // Caption
            if (!post.caption.isNullOrBlank()) {
                binding.tvPostCaption.text = post.caption
                binding.tvPostCaption.visibility = View.VISIBLE
            } else {
                binding.tvPostCaption.visibility = View.GONE
            }

            // Media Image
            val mediaUrl = post.firstImageUrl
            if (!mediaUrl.isNullOrBlank()) {
                binding.ivPostImage.visibility = View.VISIBLE
                Glide.with(binding.root.context)
                    .load(mediaUrl)
                    .into(binding.ivPostImage)
            } else {
                binding.ivPostImage.visibility = View.GONE
            }

            // Likes
            var baseLikes = post.reactions?.totalLikes ?: 0
            val isLiked = likedPosts.contains(post.id)
            updateLikeUi(isLiked, baseLikes)

            binding.btnLike.setOnClickListener {
                val nowLiked = !likedPosts.contains(post.id)
                if (nowLiked) {
                    likedPosts.add(post.id)
                    baseLikes++
                } else {
                    likedPosts.remove(post.id)
                    if (baseLikes > 0) baseLikes--
                }
                updateLikeUi(nowLiked, baseLikes)
                onLikeClick(post, nowLiked)
            }

            // Comments
            val count = if (post.commentsCount > 0) post.commentsCount else (post.comments?.size ?: 0)
            binding.tvCommentCount.text = count.toString()
            binding.btnComment.setOnClickListener {
                onCommentClick(post)
            }

            // Share (Native Android Intent)
            binding.btnShare.setOnClickListener {
                val shareText = "${post.caption ?: ""}\n\nShared via aww2ww: http://aww2ww.com"
                val intent = Intent(Intent.ACTION_SEND).apply {
                    type = "text/plain"
                    putExtra(Intent.EXTRA_SUBJECT, "aww2ww Post")
                    putExtra(Intent.EXTRA_TEXT, shareText)
                }
                binding.root.context.startActivity(Intent.createChooser(intent, "Share post via"))
            }
        }

        private fun updateLikeUi(isLiked: Boolean, count: Int) {
            binding.tvLikeCount.text = count.toString()
            if (isLiked) {
                binding.ivLikeIcon.setImageResource(R.drawable.ic_heart_filled)
                binding.tvLikeCount.setTextColor(binding.root.context.getColor(R.color.like_red))
            } else {
                binding.ivLikeIcon.setImageResource(R.drawable.ic_heart_outline)
                binding.tvLikeCount.setTextColor(binding.root.context.getColor(R.color.text_secondary))
            }
        }
    }
}

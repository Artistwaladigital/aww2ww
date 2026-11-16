package com.aww2ww.app.ui.feed

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.aww2ww.app.R
import com.aww2ww.app.data.model.PostComment
import com.aww2ww.app.databinding.ItemCommentBinding
import com.bumptech.glide.Glide

class CommentsAdapter(
    private var comments: List<PostComment>
) : RecyclerView.Adapter<CommentsAdapter.CommentViewHolder>() {

    fun updateComments(newComments: List<PostComment>) {
        comments = newComments
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CommentViewHolder {
        val binding = ItemCommentBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return CommentViewHolder(binding)
    }

    override fun onBindViewHolder(holder: CommentViewHolder, position: Int) {
        holder.bind(comments[position])
    }

    override fun getItemCount(): Int = comments.size

    inner class CommentViewHolder(private val binding: ItemCommentBinding) : RecyclerView.ViewHolder(binding.root) {
        fun bind(comment: PostComment) {
            binding.tvCommentUser.text = comment.userName
            binding.tvCommentText.text = comment.text

            val avatarUrl = comment.userAvatar
            if (!avatarUrl.isNullOrBlank()) {
                Glide.with(binding.root.context)
                    .load(avatarUrl)
                    .placeholder(R.mipmap.ic_launcher)
                    .error(R.mipmap.ic_launcher)
                    .into(binding.ivCommentAvatar)
            } else {
                binding.ivCommentAvatar.setImageResource(R.mipmap.ic_launcher)
            }
        }
    }
}

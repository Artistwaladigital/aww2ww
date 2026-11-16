package com.aww2ww.app.ui.feed

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.aww2ww.app.R
import com.aww2ww.app.data.model.Story
import com.aww2ww.app.databinding.ItemStoryBinding
import com.bumptech.glide.Glide

class StoryAdapter(
    private var stories: List<Story>,
    private val onStoryClick: (Story) -> Unit
) : RecyclerView.Adapter<StoryAdapter.StoryViewHolder>() {

    fun updateStories(newStories: List<Story>) {
        stories = newStories
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): StoryViewHolder {
        val binding = ItemStoryBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return StoryViewHolder(binding)
    }

    override fun onBindViewHolder(holder: StoryViewHolder, position: Int) {
        holder.bind(stories[position])
    }

    override fun getItemCount(): Int = stories.size

    inner class StoryViewHolder(private val binding: ItemStoryBinding) : RecyclerView.ViewHolder(binding.root) {
        fun bind(story: Story) {
            val user = story.user
            val name = user?.name ?: user?.username ?: "Story"
            val firstName = name.split(" ").firstOrNull() ?: name
            binding.tvStoryUsername.text = firstName

            val avatarUrl = user?.avatar ?: story.mediaUrl
            if (!avatarUrl.isNullOrBlank()) {
                Glide.with(binding.root.context)
                    .load(avatarUrl)
                    .placeholder(R.mipmap.ic_launcher)
                    .error(R.mipmap.ic_launcher)
                    .into(binding.ivStoryAvatar)
            } else {
                binding.ivStoryAvatar.setImageResource(R.mipmap.ic_launcher)
            }

            binding.root.setOnClickListener {
                onStoryClick(story)
            }
        }
    }
}

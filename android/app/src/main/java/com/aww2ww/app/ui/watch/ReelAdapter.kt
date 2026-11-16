package com.aww2ww.app.ui.watch

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.aww2ww.app.R
import com.aww2ww.app.data.model.Reel
import com.aww2ww.app.databinding.ItemReelBinding
import com.bumptech.glide.Glide

class ReelAdapter(
    private var reels: List<Reel>,
    private val onReelClick: (Reel) -> Unit
) : RecyclerView.Adapter<ReelAdapter.ReelViewHolder>() {

    fun updateReels(newReels: List<Reel>) {
        reels = newReels
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ReelViewHolder {
        val binding = ItemReelBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return ReelViewHolder(binding)
    }

    override fun onBindViewHolder(holder: ReelViewHolder, position: Int) {
        holder.bind(reels[position])
    }

    override fun getItemCount(): Int = reels.size

    inner class ReelViewHolder(private val binding: ItemReelBinding) : RecyclerView.ViewHolder(binding.root) {
        fun bind(reel: Reel) {
            val user = reel.user
            binding.tvReelUsername.text = user?.username ?: user?.name ?: "Creator"
            binding.tvReelCaption.text = reel.caption ?: "Inspiring moment on aww2ww ✨"
            binding.tvReelLikes.text = "❤️ ${if (reel.likes > 0) reel.likes else 1250} likes"

            // Avatar
            val avatarUrl = user?.avatar
            if (!avatarUrl.isNullOrBlank()) {
                Glide.with(binding.root.context)
                    .load(avatarUrl)
                    .placeholder(R.mipmap.ic_launcher)
                    .error(R.mipmap.ic_launcher)
                    .into(binding.ivReelAvatar)
            } else {
                binding.ivReelAvatar.setImageResource(R.mipmap.ic_launcher)
            }

            binding.root.setOnClickListener {
                onReelClick(reel)
            }
        }
    }
}

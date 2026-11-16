package com.aww2ww.app.ui.messages

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.aww2ww.app.R
import com.aww2ww.app.data.model.Chat
import com.aww2ww.app.databinding.ItemChatBinding
import com.bumptech.glide.Glide

class ChatAdapter(
    private var chats: List<Chat>,
    private val onChatClick: (Chat) -> Unit
) : RecyclerView.Adapter<ChatAdapter.ChatViewHolder>() {

    fun updateChats(newChats: List<Chat>) {
        chats = newChats
        notifyDataSetChanged()
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ChatViewHolder {
        val binding = ItemChatBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return ChatViewHolder(binding)
    }

    override fun onBindViewHolder(holder: ChatViewHolder, position: Int) {
        holder.bind(chats[position])
    }

    override fun getItemCount(): Int = chats.size

    inner class ChatViewHolder(private val binding: ItemChatBinding) : RecyclerView.ViewHolder(binding.root) {
        fun bind(chat: Chat) {
            val user = chat.participant
            val name = if (chat.isGroup) (chat.groupName ?: "Group Chat") else (user?.name ?: "User")
            binding.tvChatName.text = name
            binding.tvChatLastMessage.text = chat.lastMessage ?: "Tap to start conversation"
            binding.tvChatTime.text = chat.timestamp ?: ""

            // Online indicator
            binding.viewOnlineDot.visibility = if (user?.isOnline == true) View.VISIBLE else View.GONE

            // Unread badge
            if (chat.unreadCount > 0) {
                binding.tvChatUnread.text = chat.unreadCount.toString()
                binding.tvChatUnread.visibility = View.VISIBLE
            } else {
                binding.tvChatUnread.visibility = View.GONE
            }

            // Avatar
            val avatarUrl = user?.avatar
            if (!avatarUrl.isNullOrBlank()) {
                Glide.with(binding.root.context)
                    .load(avatarUrl)
                    .placeholder(R.mipmap.ic_launcher)
                    .error(R.mipmap.ic_launcher)
                    .into(binding.ivChatAvatar)
            } else {
                binding.ivChatAvatar.setImageResource(R.mipmap.ic_launcher)
            }

            binding.root.setOnClickListener {
                onChatClick(chat)
            }
        }
    }
}

package com.aww2ww.app.ui.messages

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.aww2ww.app.data.model.ChatMessage
import com.aww2ww.app.databinding.ItemMessageIncomingBinding
import com.aww2ww.app.databinding.ItemMessageOutgoingBinding

class MessageListAdapter(
    private var messages: List<ChatMessage>,
    private val currentUserId: String
) : RecyclerView.Adapter<RecyclerView.ViewHolder>() {

    companion object {
        private const val VIEW_TYPE_OUTGOING = 1
        private const val VIEW_TYPE_INCOMING = 2
    }

    fun updateMessages(newMessages: List<ChatMessage>) {
        messages = newMessages
        notifyDataSetChanged()
    }

    override fun getItemViewType(position: Int): Int {
        val msg = messages[position]
        return if (msg.senderId == currentUserId || msg.senderId.startsWith("me")) {
            VIEW_TYPE_OUTGOING
        } else {
            VIEW_TYPE_INCOMING
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        val inflater = LayoutInflater.from(parent.context)
        return if (viewType == VIEW_TYPE_OUTGOING) {
            val binding = ItemMessageOutgoingBinding.inflate(inflater, parent, false)
            OutgoingViewHolder(binding)
        } else {
            val binding = ItemMessageIncomingBinding.inflate(inflater, parent, false)
            IncomingViewHolder(binding)
        }
    }

    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
        val msg = messages[position]
        if (holder is OutgoingViewHolder) {
            holder.bind(msg)
        } else if (holder is IncomingViewHolder) {
            holder.bind(msg)
        }
    }

    override fun getItemCount(): Int = messages.size

    inner class OutgoingViewHolder(private val binding: ItemMessageOutgoingBinding) : RecyclerView.ViewHolder(binding.root) {
        fun bind(message: ChatMessage) {
            binding.tvMessageText.text = message.text ?: "[Media]"
            binding.tvMessageTime.text = message.timestamp ?: ""
        }
    }

    inner class IncomingViewHolder(private val binding: ItemMessageIncomingBinding) : RecyclerView.ViewHolder(binding.root) {
        fun bind(message: ChatMessage) {
            binding.tvMessageText.text = message.text ?: "[Media]"
            binding.tvMessageTime.text = message.timestamp ?: ""
        }
    }
}

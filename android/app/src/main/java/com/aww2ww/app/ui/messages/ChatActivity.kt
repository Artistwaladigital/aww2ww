package com.aww2ww.app.ui.messages

import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.aww2ww.app.R
import com.aww2ww.app.data.api.ApiClient
import com.aww2ww.app.data.model.Chat
import com.aww2ww.app.data.model.ChatMessage
import com.aww2ww.app.data.model.SendMessageRequest
import com.aww2ww.app.data.session.UserSession
import com.aww2ww.app.databinding.ActivityChatBinding
import com.bumptech.glide.Glide
import com.google.gson.Gson
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

class ChatActivity : AppCompatActivity() {

    private lateinit var binding: ActivityChatBinding
    private lateinit var adapter: MessageListAdapter
    private val messagesList = mutableListOf<ChatMessage>()

    private var chatId: String = ""
    private var recipientName: String = ""
    private var recipientAvatar: String? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityChatBinding.inflate(layoutInflater)
        setContentView(binding.root)

        chatId = intent.getStringExtra("chat_id") ?: ""
        recipientName = intent.getStringExtra("recipient_name") ?: "Chat"
        recipientAvatar = intent.getStringExtra("recipient_avatar")

        val session = UserSession.getInstance(this)
        val currentUserId = session.currentUser?.id ?: "user_tania"

        binding.tvHeaderName.text = recipientName
        if (!recipientAvatar.isNullOrBlank()) {
            Glide.with(this)
                .load(recipientAvatar)
                .placeholder(R.mipmap.ic_launcher)
                .into(binding.ivHeaderAvatar)
        }

        binding.btnBack.setOnClickListener {
            finish()
        }

        adapter = MessageListAdapter(messagesList, currentUserId)
        binding.rvMessages.adapter = adapter

        // If chat object was passed with pre-populated messages
        val chatJson = intent.getStringExtra("chat_json")
        if (!chatJson.isNullOrBlank()) {
            try {
                val chat = Gson().fromJson(chatJson, Chat::class.java)
                chat.messages?.let {
                    messagesList.addAll(it)
                    adapter.updateMessages(messagesList)
                    scrollToBottom()
                }
            } catch (e: Exception) {
                // Ignore parse errors
            }
        }

        fetchMessages()

        binding.btnSendMessage.setOnClickListener {
            val text = binding.etMessageInput.text.toString().trim()
            if (text.isNotEmpty()) {
                sendMessage(text, currentUserId)
            }
        }
    }

    private fun fetchMessages() {
        if (chatId.isBlank()) return
        lifecycleScope.launch {
            try {
                val messages = withContext(Dispatchers.IO) {
                    ApiClient.service.getMessages(chatId)
                }
                if (messages.isNotEmpty()) {
                    messagesList.clear()
                    messagesList.addAll(messages)
                    adapter.updateMessages(messagesList)
                    scrollToBottom()
                }
            } catch (e: Exception) {
                // Ignore message fetch fallback
            }
        }
    }

    private fun sendMessage(text: String, currentUserId: String) {
        val timeFormat = SimpleDateFormat("h:mm a", Locale.getDefault())
        val currentTime = timeFormat.format(Date())

        val optimisticMsg = ChatMessage(
            id = "m_${System.currentTimeMillis()}",
            senderId = currentUserId,
            text = text,
            timestamp = currentTime
        )

        messagesList.add(optimisticMsg)
        adapter.updateMessages(messagesList)
        scrollToBottom()
        binding.etMessageInput.setText("")

        lifecycleScope.launch {
            try {
                withContext(Dispatchers.IO) {
                    ApiClient.service.sendMessage(chatId, SendMessageRequest(currentUserId, text))
                }
            } catch (e: Exception) {
                Toast.makeText(this@ChatActivity, "Message sent locally", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun scrollToBottom() {
        if (messagesList.isNotEmpty()) {
            binding.rvMessages.scrollToPosition(messagesList.size - 1)
        }
    }
}

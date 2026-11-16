package com.aww2ww.app.ui.messages

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.lifecycleScope
import com.aww2ww.app.data.api.ApiClient
import com.aww2ww.app.databinding.FragmentMessagesBinding
import com.google.gson.Gson
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class MessagesFragment : Fragment() {

    private var _binding: FragmentMessagesBinding? = null
    private val binding get() = _binding!!

    private lateinit var chatAdapter: ChatAdapter

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentMessagesBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        chatAdapter = ChatAdapter(emptyList()) { chat ->
            val intent = Intent(requireContext(), ChatActivity::class.java).apply {
                putExtra("chat_id", chat.id)
                putExtra("recipient_name", chat.participant?.name ?: "Chat")
                putExtra("recipient_avatar", chat.participant?.avatar)
                putExtra("chat_json", Gson().toJson(chat))
            }
            startActivity(intent)
        }
        binding.rvChats.adapter = chatAdapter

        loadChats()

        binding.swipeRefreshMessages.setOnRefreshListener {
            loadChats()
        }
    }

    private fun loadChats() {
        lifecycleScope.launch {
            binding.progressBarMessages.visibility = View.VISIBLE
            try {
                val chats = withContext(Dispatchers.IO) {
                    ApiClient.service.getChats()
                }
                chatAdapter.updateChats(chats)
            } catch (e: Exception) {
                context?.let {
                    Toast.makeText(it, "Unable to load messages: ${e.message}", Toast.LENGTH_SHORT).show()
                }
            } finally {
                binding.progressBarMessages.visibility = View.GONE
                binding.swipeRefreshMessages.isRefreshing = false
            }
        }
    }

    override fun onResume() {
        super.onResume()
        loadChats()
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}

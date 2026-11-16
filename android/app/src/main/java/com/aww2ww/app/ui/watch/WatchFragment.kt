package com.aww2ww.app.ui.watch

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.lifecycle.lifecycleScope
import com.aww2ww.app.data.api.ApiClient
import com.aww2ww.app.databinding.FragmentWatchBinding
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class WatchFragment : Fragment() {

    private var _binding: FragmentWatchBinding? = null
    private val binding get() = _binding!!

    private lateinit var adapter: ReelAdapter

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentWatchBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        adapter = ReelAdapter(emptyList()) { reel ->
            Toast.makeText(context, "Playing reel by ${reel.user?.name ?: "Creator"}", Toast.LENGTH_SHORT).show()
        }
        binding.rvReels.adapter = adapter

        loadReels()

        binding.swipeRefreshWatch.setOnRefreshListener {
            loadReels()
        }
    }

    private fun loadReels() {
        lifecycleScope.launch {
            binding.progressBarWatch.visibility = View.VISIBLE
            try {
                val reels = withContext(Dispatchers.IO) {
                    ApiClient.service.getReels()
                }
                adapter.updateReels(reels)
            } catch (e: Exception) {
                // Ignore reel fetch fallback
            } finally {
                binding.progressBarWatch.visibility = View.GONE
                binding.swipeRefreshWatch.isRefreshing = false
            }
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}

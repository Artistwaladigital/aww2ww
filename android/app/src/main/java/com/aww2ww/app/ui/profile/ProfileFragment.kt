package com.aww2ww.app.ui.profile

import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AlertDialog
import androidx.fragment.app.Fragment
import com.aww2ww.app.R
import com.aww2ww.app.data.session.UserSession
import com.aww2ww.app.databinding.FragmentProfileBinding
import com.aww2ww.app.ui.auth.AuthActivity
import com.bumptech.glide.Glide

class ProfileFragment : Fragment() {

    private var _binding: FragmentProfileBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentProfileBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val session = UserSession.getInstance(requireContext())
        val user = session.currentUser ?: session.getDefaultDemoUser()

        binding.tvProfileName.text = user.name
        binding.tvProfileUsername.text = "@${user.username}"
        binding.ivProfileVerified.visibility = if (user.isVerified) View.VISIBLE else View.GONE
        binding.tvProfileBio.text = user.bio ?: "Welcome to aww2ww ✨"

        binding.tvProfilePostsCount.text = user.postsCount?.toString() ?: "186"
        binding.tvProfileFollowersCount.text = user.followers?.toString() ?: "1.8M"
        binding.tvProfileFollowingCount.text = user.following?.toString() ?: "420"

        // Load Avatar
        val avatarUrl = user.avatar
        if (!avatarUrl.isNullOrBlank()) {
            Glide.with(this)
                .load(avatarUrl)
                .placeholder(R.mipmap.ic_launcher)
                .into(binding.ivProfileAvatar)
        }

        // Load Cover
        val coverUrl = user.coverImage
        if (!coverUrl.isNullOrBlank()) {
            Glide.with(this)
                .load(coverUrl)
                .placeholder(R.drawable.splash)
                .into(binding.ivCoverImage)
        }

        binding.btnLogout.setOnClickListener {
            AlertDialog.Builder(requireContext())
                .setTitle("Log Out")
                .setMessage("Are you sure you want to log out of aww2ww?")
                .setPositiveButton("Log Out") { _, _ ->
                    session.logout()
                    val intent = Intent(requireContext(), AuthActivity::class.java)
                    intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
                    startActivity(intent)
                }
                .setNegativeButton("Cancel", null)
                .show()
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}

package com.aww2ww.app.ui.main

import android.content.Intent
import android.os.Bundle
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import com.aww2ww.app.R
import com.aww2ww.app.data.session.UserSession
import com.aww2ww.app.databinding.ActivityMainBinding
import com.aww2ww.app.ui.auth.AuthActivity
import com.aww2ww.app.ui.create.CreatePostActivity
import com.aww2ww.app.ui.feed.FeedFragment
import com.aww2ww.app.ui.messages.MessagesFragment
import com.aww2ww.app.ui.profile.ProfileFragment
import com.aww2ww.app.ui.watch.WatchFragment

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    private val feedFragment by lazy { FeedFragment() }
    private val watchFragment by lazy { WatchFragment() }
    private val messagesFragment by lazy { MessagesFragment() }
    private val profileFragment by lazy { ProfileFragment() }

    private val createPostLauncher = registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
        if (result.resultCode == RESULT_OK) {
            // If currently on feed, refresh feed
            val currentFragment = supportFragmentManager.findFragmentById(R.id.fragmentContainer)
            if (currentFragment is FeedFragment) {
                currentFragment.onResume()
            } else {
                switchFragment(feedFragment)
                binding.bottomNavigation.selectedItemId = R.id.nav_feed
            }
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val session = UserSession.getInstance(this)
        if (!session.isLoggedIn) {
            val intent = Intent(this, AuthActivity::class.java)
            intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
            startActivity(intent)
            finish()
            return
        }

        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Set default fragment
        if (savedInstanceState == null) {
            switchFragment(feedFragment)
        }

        binding.bottomNavigation.setOnItemSelectedListener { item ->
            when (item.itemId) {
                R.id.nav_feed -> {
                    switchFragment(feedFragment)
                    true
                }
                R.id.nav_reels -> {
                    switchFragment(watchFragment)
                    true
                }
                R.id.nav_messages -> {
                    switchFragment(messagesFragment)
                    true
                }
                R.id.nav_profile -> {
                    switchFragment(profileFragment)
                    true
                }
                else -> false
            }
        }

        binding.btnCreatePost.setOnClickListener {
            val intent = Intent(this, CreatePostActivity::class.java)
            createPostLauncher.launch(intent)
        }
    }

    private fun switchFragment(fragment: Fragment) {
        supportFragmentManager.beginTransaction()
            .replace(R.id.fragmentContainer, fragment)
            .commit()
    }
}

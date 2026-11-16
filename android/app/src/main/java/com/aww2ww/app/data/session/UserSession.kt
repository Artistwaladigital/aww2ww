package com.aww2ww.app.data.session

import android.content.Context
import android.content.SharedPreferences
import com.aww2ww.app.data.model.User
import com.google.gson.Gson

class UserSession(context: Context) {
    private val prefs: SharedPreferences = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE)
    private val gson = Gson()

    companion object {
        private const val PREF_NAME = "aww2ww_session"
        private const val KEY_IS_LOGGED_IN = "is_logged_in"
        private const val KEY_USER_DATA = "user_data"
        private const val KEY_TOKEN = "auth_token"

        @Volatile
        private var instance: UserSession? = null

        fun getInstance(context: Context): UserSession {
            return instance ?: synchronized(this) {
                instance ?: UserSession(context.applicationContext).also { instance = it }
            }
        }
    }

    var isLoggedIn: Boolean
        get() = prefs.getBoolean(KEY_IS_LOGGED_IN, false)
        set(value) = prefs.edit().putBoolean(KEY_IS_LOGGED_IN, value).apply()

    var token: String?
        get() = prefs.getString(KEY_TOKEN, null)
        set(value) = prefs.edit().putString(KEY_TOKEN, value).apply()

    var currentUser: User?
        get() {
            val json = prefs.getString(KEY_USER_DATA, null) ?: return getDefaultDemoUser()
            return try {
                gson.fromJson(json, User::class.java) ?: getDefaultDemoUser()
            } catch (e: Exception) {
                getDefaultDemoUser()
            }
        }
        set(user) {
            if (user != null) {
                val json = gson.toJson(user)
                prefs.edit().putString(KEY_USER_DATA, json).putBoolean(KEY_IS_LOGGED_IN, true).apply()
            } else {
                prefs.edit().remove(KEY_USER_DATA).putBoolean(KEY_IS_LOGGED_IN, false).apply()
            }
        }

    fun login(user: User, token: String? = null) {
        this.currentUser = user
        this.token = token
        this.isLoggedIn = true
    }

    fun logout() {
        prefs.edit().clear().apply()
    }

    fun getDefaultDemoUser(): User {
        return User(
            id = "user_tania",
            name = "Tania Roy",
            username = "taniaroy",
            email = "taniaroy@aww2ww.com",
            avatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
            coverImage = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
            bio = "Living my happiest chapter ✨ Kolkata & Beyond 🌸 Life is about real moments!",
            category = "Creator",
            verified = true,
            followers = "1.8M",
            following = "420",
            postsCount = 186,
            online = true
        )
    }
}

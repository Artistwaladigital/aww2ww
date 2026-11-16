package com.aww2ww.app.data.model

import com.google.gson.annotations.SerializedName

data class User(
    val id: String = "",
    val name: String = "",
    val username: String = "",
    val email: String? = null,
    val avatar: String? = null,
    @SerializedName("cover_image")
    val coverImage: String? = null,
    val bio: String? = null,
    val category: String? = null,
    val verified: Any? = null, // can be Boolean or Int from SQLite
    val followers: Any? = null,
    val following: Any? = null,
    @SerializedName("posts_count")
    val postsCount: Any? = null,
    val online: Any? = null
) {
    val isVerified: Boolean
        get() = verified == true || verified == 1 || verified == "1"

    val isOnline: Boolean
        get() = online == true || online == 1 || online == "1"
}

data class PostMedia(
    val type: String? = "image",
    val url: String = "",
    val views: String? = null
)

data class Reactions(
    val like: Int = 0,
    val love: Int = 0,
    val care: Int = 0,
    val haha: Int = 0,
    val wow: Int = 0,
    val sad: Int = 0,
    val angry: Int = 0,
    val userReaction: String? = null
) {
    val totalLikes: Int
        get() = like + love + care + haha + wow + sad + angry
}

data class PostComment(
    val id: String = "",
    val userId: String = "",
    val userName: String = "",
    val userAvatar: String? = null,
    val text: String = "",
    val likes: Int = 0,
    val timestamp: String? = null
)

data class Post(
    val id: String = "",
    val user: User? = null,
    val timestamp: String? = null,
    val caption: String? = null,
    val media: List<PostMedia>? = null,
    val reactions: Reactions? = null,
    val commentsCount: Int = 0,
    val sharesCount: Int = 0,
    val viewsCount: String? = null,
    val pinned: Boolean = false,
    val comments: List<PostComment>? = null
) {
    val firstImageUrl: String?
        get() = media?.firstOrNull { it.url.isNotBlank() }?.url
}

data class Story(
    val id: String = "",
    val userId: String = "",
    val user: User? = null,
    val mediaUrl: String? = null,
    val isViewed: Boolean = false
)

data class ChatMessage(
    val id: String = "",
    val senderId: String = "",
    val text: String? = null,
    val mediaUrl: String? = null,
    val mediaType: String? = null,
    val status: String? = "sent",
    val timestamp: String? = null
)

data class Chat(
    val id: String = "",
    val isGroup: Boolean = false,
    val groupName: String? = null,
    val participant: User? = null,
    val lastMessage: String? = null,
    val timestamp: String? = null,
    val unreadCount: Int = 0,
    val messages: List<ChatMessage>? = null
)

data class Reel(
    val id: String = "",
    val user: User? = null,
    val videoUrl: String? = null,
    val caption: String? = null,
    val likes: Int = 0,
    val comments: Int = 0
)

data class AuthResponse(
    val success: Boolean = false,
    val user: User? = null,
    val token: String? = null,
    val message: String? = null,
    val error: String? = null
)

data class LoginRequest(
    val usernameOrEmail: String,
    val password: String? = null
)

data class RegisterRequest(
    val name: String,
    val username: String,
    val email: String? = null,
    val password: String? = null,
    val avatar: String? = null,
    val bio: String? = null
)

data class CreatePostRequest(
    val userId: String,
    val caption: String,
    val mediaUrl: String? = null
)

data class ReactRequest(
    val reactionType: String = "like"
)

data class AddCommentRequest(
    val userId: String,
    val text: String
)

data class SendMessageRequest(
    val senderId: String,
    val text: String?,
    val mediaUrl: String? = null
)

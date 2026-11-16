package com.aww2ww.app.data.api

import com.aww2ww.app.data.model.*
import retrofit2.http.*

interface ApiService {
    @GET("posts")
    suspend fun getPosts(): List<Post>

    @POST("posts")
    suspend fun createPost(@Body req: CreatePostRequest): Post

    @POST("posts/{id}/react")
    suspend fun reactToPost(@Path("id") id: String, @Body req: ReactRequest): Map<String, Any>

    @GET("posts/{id}/comments")
    suspend fun getComments(@Path("id") id: String): List<PostComment>

    @POST("posts/{id}/comments")
    suspend fun addComment(@Path("id") id: String, @Body req: AddCommentRequest): PostComment

    @GET("stories")
    suspend fun getStories(): List<Story>

    @GET("reels")
    suspend fun getReels(): List<Reel>

    @GET("chats")
    suspend fun getChats(): List<Chat>

    @GET("chats/{id}/messages")
    suspend fun getMessages(@Path("id") id: String): List<ChatMessage>

    @POST("chats/{id}/messages")
    suspend fun sendMessage(@Path("id") id: String, @Body req: SendMessageRequest): ChatMessage

    @POST("users/login")
    suspend fun login(@Body req: LoginRequest): AuthResponse

    @POST("users/register")
    suspend fun register(@Body req: RegisterRequest): AuthResponse

    @GET("users")
    suspend fun getUsers(): List<User>

    @GET("users/{id}")
    suspend fun getUserProfile(@Path("id") id: String): User
}

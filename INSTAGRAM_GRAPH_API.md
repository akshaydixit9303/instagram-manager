# Instagram Graph API — Complete Feature Reference

## 1. PROFILE & ACCOUNT

| Feature | Endpoint | Description |
|---------|----------|-------------|
| Get Profile Info | `GET /{user-id}` | Username, name, bio, profile pic, followers count, following count, media count |
| Get Business Discovery | `GET /{user-id}?fields=business_discovery` | Any public account's info (competitor analysis) |

## 2. MEDIA (Posts)

| Feature | Endpoint | Description |
|---------|----------|-------------|
| Get All Media | `GET /{user-id}/media` | List all posts (image, video, carousel, reels) |
| Get Single Post | `GET /{media-id}` | Post detail — caption, timestamp, like count, comments count, permalink |
| Get Media Insights | `GET /{media-id}/insights` | Post analytics — reach, impressions, engagement, saves, shares |
| Get Album/Carousel | `GET /{media-id}/children` | All slides inside a carousel |

## 3. PUBLISH CONTENT

| Feature | Endpoint | Description |
|---------|----------|-------------|
| Create Photo Post | `POST /{user-id}/media` + `POST /{user-id}/media_publish` | Publish single image post |
| Create Carousel | Multi-step container creation | Post multiple images as carousel |
| Create Reel | `POST /{user-id}/media` (video) | Upload reel/video |
| Create Story | `POST /{user-id}/media` (stories) | Post story (image/video) |
| Schedule Post | `published=false` + publish later | Schedule posts for future |

## 4. COMMENTS

| Feature | Endpoint | Description |
|---------|----------|-------------|
| Get Comments | `GET /{media-id}/comments` | Read all comments on a post |
| Reply to Comment | `POST /{comment-id}/replies` | Reply to a comment |
| Delete Comment | `DELETE /{comment-id}` | Delete a comment |
| Hide Comment | `POST /{comment-id}` (hide=true) | Hide a comment |
| Get Comment Replies | `GET /{comment-id}/replies` | View replies to a comment |

## 5. INSIGHTS & ANALYTICS

| Feature | Endpoint | Description |
|---------|----------|-------------|
| Account Insights | `GET /{user-id}/insights` | Follower demographics, reach, impressions, profile views |
| Media Insights | `GET /{media-id}/insights` | Per-post performance — reach, saves, shares, engagement |
| Story Insights | `GET /{story-id}/insights` | Story views, replies, exits, taps forward/back |
| Reel Insights | `GET /{media-id}/insights` | Reel plays, reach, likes, comments, shares, saves |
| Online Followers | `GET /{user-id}/insights` (online_followers) | When followers are online (best posting time) |
| Audience Demographics | `GET /{user-id}/insights` | Age, gender, city, country breakdown |

## 6. HASHTAGS

| Feature | Endpoint | Description |
|---------|----------|-------------|
| Search Hashtag | `GET /ig_hashtag_search` | Find hashtag ID |
| Top Media by Hashtag | `GET /{hashtag-id}/top_media` | Top posts for a hashtag |
| Recent Media by Hashtag | `GET /{hashtag-id}/recent_media` | Latest posts for a hashtag |
| Get Hashtag Info | `GET /{hashtag-id}` | Total post count |

## 7. MENTIONS & TAGS

| Feature | Endpoint | Description |
|---------|----------|-------------|
| Get Tagged Media | `GET /{user-id}/tags` | Posts where you are tagged |
| Get Mentioned Media | `GET /{user-id}/mentioned_media` | Stories where you are mentioned |
| Get Mentioned Comment | `GET /{user-id}/mentioned_comment` | Comments where you are mentioned |

## 8. DIRECT MESSAGES (DM)

| Feature | Endpoint | Description |
|---------|----------|-------------|
| Get Conversations | `GET /{user-id}/conversations` | List DM conversations |
| Get Messages | `GET /{conversation-id}/messages` | Read messages in a conversation |
| Send Message | `POST /{user-id}/messages` | Send DM (text, image, template) |
| Send Ice Breaker | Message templates | Pre-defined quick replies |

## 9. WEBHOOKS (Real-time)

| Feature | Endpoint | Description |
|---------|----------|-------------|
| Comment Webhook | Subscribe | Real-time notification on new comments |
| DM Webhook | Subscribe | Notification on new messages |
| Mention Webhook | Subscribe | Alert when mentioned |
| Story Insights Webhook | Subscribe | Activity alerts on stories |

## 10. PRODUCT CATALOG (Shopping)

| Feature | Endpoint | Description |
|---------|----------|-------------|
| Get Product Catalog | `GET /{user-id}/catalog` | View product catalog |
| Tag Products | In media creation | Tag products in posts |
| Get Product Tags | `GET /{media-id}` | View product tags on a post |

---

## API Limits
- **Rate limit**: 200 calls/hour per user
- **Token expiry**: Long-lived token = 60 days (can be refreshed)
- **Media upload**: Max 10 images per carousel, 100MB video
- **Hashtag search**: 30 unique hashtags per 7-day rolling window

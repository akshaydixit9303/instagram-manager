/**
 * Instagram Graph API Service
 * All API calls centralized here
 */
const BASE = 'https://graph.facebook.com/v21.0';

function api(endpoint, token, params = {}) {
  const url = new URL(`${BASE}${endpoint}`);
  url.searchParams.set('access_token', token);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  return fetch(url).then(r => r.json());
}

function post(endpoint, token, body = {}) {
  return fetch(`${BASE}${endpoint}?access_token=${token}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then(r => r.json());
}

function del(endpoint, token) {
  return fetch(`${BASE}${endpoint}?access_token=${token}`, { method: 'DELETE' }).then(r => r.json());
}

// ─── PROFILE ───
export const getProfile = (userId, token) =>
  api(`/${userId}`, token, {
    fields: 'id,name,username,biography,profile_picture_url,followers_count,follows_count,media_count,website'
  });

export const getBusinessDiscovery = (userId, token, targetUsername) =>
  api(`/${userId}`, token, {
    fields: `business_discovery.fields(id,name,username,biography,profile_picture_url,followers_count,follows_count,media_count,media.limit(12){id,caption,media_type,media_url,thumbnail_url,timestamp,like_count,comments_count,permalink}).username(${targetUsername})`
  });

// ─── MEDIA ───
export const getMedia = (userId, token, limit = 25) =>
  api(`/${userId}/media`, token, {
    fields: 'id,caption,media_type,media_url,thumbnail_url,timestamp,like_count,comments_count,permalink,children{media_url,media_type}',
    limit: String(limit),
  });

export const getMediaDetail = (mediaId, token) =>
  api(`/${mediaId}`, token, {
    fields: 'id,caption,media_type,media_url,thumbnail_url,timestamp,like_count,comments_count,permalink,children{media_url,media_type}'
  });

export const getMediaInsights = (mediaId, token) =>
  api(`/${mediaId}/insights`, token, {
    metric: 'impressions,reach,engagement,saved,shares'
  });

// ─── PUBLISH ───
export const createMediaContainer = (userId, token, { image_url, caption, is_carousel_item = false }) =>
  post(`/${userId}/media`, token, {
    image_url, caption, is_carousel_item,
  });

export const createCarouselContainer = (userId, token, { children, caption }) =>
  post(`/${userId}/media`, token, {
    media_type: 'CAROUSEL', children, caption,
  });

export const publishMedia = (userId, token, creationId) =>
  post(`/${userId}/media_publish`, token, { creation_id: creationId });

export const createReelContainer = (userId, token, { video_url, caption }) =>
  post(`/${userId}/media`, token, {
    media_type: 'REELS', video_url, caption,
  });

// ─── COMMENTS ───
export const getComments = (mediaId, token) =>
  api(`/${mediaId}/comments`, token, {
    fields: 'id,text,username,timestamp,like_count,replies{id,text,username,timestamp}'
  });

export const replyToComment = (commentId, token, message) =>
  post(`/${commentId}/replies`, token, { message });

export const deleteComment = (commentId, token) =>
  del(`/${commentId}`, token);

export const hideComment = (commentId, token, hide = true) =>
  post(`/${commentId}`, token, { hide });

// ─── INSIGHTS ───
export const getAccountInsights = (userId, token, period = 'day', since, until) => {
  const params = {
    metric: 'impressions,reach,profile_views,follower_count',
    period,
  };
  if (since) params.since = since;
  if (until) params.until = until;
  return api(`/${userId}/insights`, token, params);
};

export const getOnlineFollowers = (userId, token) =>
  api(`/${userId}/insights`, token, {
    metric: 'online_followers', period: 'lifetime'
  });

export const getAudienceDemographics = (userId, token) =>
  api(`/${userId}/insights`, token, {
    metric: 'follower_demographics',
    period: 'lifetime',
    metric_type: 'total_value',
    breakdown: 'city,country,age,gender',
  });

// ─── HASHTAGS ───
export const searchHashtag = (userId, token, query) =>
  api('/ig_hashtag_search', token, { user_id: userId, q: query });

export const getHashtagTopMedia = (hashtagId, userId, token) =>
  api(`/${hashtagId}/top_media`, token, {
    user_id: userId,
    fields: 'id,caption,media_type,media_url,like_count,comments_count,permalink'
  });

export const getHashtagRecentMedia = (hashtagId, userId, token) =>
  api(`/${hashtagId}/recent_media`, token, {
    user_id: userId,
    fields: 'id,caption,media_type,media_url,like_count,comments_count,permalink'
  });

// ─── MENTIONS & TAGS ───
export const getTaggedMedia = (userId, token) =>
  api(`/${userId}/tags`, token, {
    fields: 'id,caption,media_type,media_url,timestamp,permalink'
  });

export const getMentionedMedia = (userId, token) =>
  api(`/${userId}/mentioned_media`, token, {
    fields: 'id,caption,media_type,timestamp'
  });

// ─── MESSAGES ───
export const getConversations = (userId, token) =>
  api(`/${userId}/conversations`, token, {
    fields: 'id,participants,updated_time,messages{message,from,created_time}'
  });

export const sendMessage = (userId, token, recipientId, message) =>
  post(`/${userId}/messages`, token, {
    recipient: { id: recipientId }, message: { text: message }
  });

// ─── STORIES ───
export const getStories = (userId, token) =>
  api(`/${userId}/stories`, token, {
    fields: 'id,media_type,media_url,timestamp'
  });

export const getStoryInsights = (storyId, token) =>
  api(`/${storyId}/insights`, token, {
    metric: 'impressions,reach,replies,taps_forward,taps_back,exits'
  });

// ─── TOKEN ───
export const refreshToken = (token) =>
  api('/oauth/access_token', token, {
    grant_type: 'fb_exchange_token',
    client_id: '', // fill from env
    client_secret: '', // fill from env
    fb_exchange_token: token,
  });

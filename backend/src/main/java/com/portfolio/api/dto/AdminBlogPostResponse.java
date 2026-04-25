package com.portfolio.api.dto;

import java.time.Instant;
import java.util.List;

public record AdminBlogPostResponse(
        Long id,
        String slug,
        String title,
        String excerpt,
        String content,
        String coverImage,
        List<String> tags,
        boolean published,
        Instant createdAt,
        Instant updatedAt
) {
}

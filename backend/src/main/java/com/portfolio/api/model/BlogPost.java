package com.portfolio.api.model;

import java.time.Instant;
import java.util.List;

public record BlogPost(
        String id,
        String title,
        String excerpt,
        String content,
        String coverImage,
        List<String> tags,
        Instant createdAt
) {
}

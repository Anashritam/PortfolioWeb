package com.portfolio.api.dto;

import java.util.List;

public record AdminProjectResponse(
        Long id,
        String slug,
        String title,
        String category,
        String description,
        List<String> techStack,
        String image,
        String githubUrl,
        String liveUrl,
        boolean featured,
        int sortOrder
) {
}

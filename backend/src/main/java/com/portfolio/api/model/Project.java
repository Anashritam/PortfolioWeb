package com.portfolio.api.model;

import java.util.List;

public record Project(
        String id,
        String title,
        String category,
        String description,
        List<String> techStack,
        String image,
        String githubUrl,
        String liveUrl,
        boolean featured
) {
}

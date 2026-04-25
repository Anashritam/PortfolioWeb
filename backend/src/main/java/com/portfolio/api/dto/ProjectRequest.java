package com.portfolio.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import java.util.List;

public record ProjectRequest(
        @NotBlank @Size(max = 120) String slug,
        @NotBlank @Size(max = 160) String title,
        @NotBlank @Size(max = 80) String category,
        @NotBlank @Size(max = 1200) String description,
        @NotEmpty List<@NotBlank @Size(max = 80) String> techStack,
        @NotBlank @Size(max = 500) String image,
        @Size(max = 500) String githubUrl,
        @Size(max = 500) String liveUrl,
        boolean featured,
        int sortOrder
) {
}

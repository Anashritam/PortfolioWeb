package com.portfolio.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

public record BlogPostRequest(
        @NotBlank @Size(max = 200) String slug,
        @NotBlank @Size(max = 200) String title,
        @NotBlank @Size(max = 500) String excerpt,
        @NotBlank @Size(max = 10000) String content,
        @Size(max = 500) String coverImage,
        List<@Size(max = 80) String> tags,
        boolean published
) {
}

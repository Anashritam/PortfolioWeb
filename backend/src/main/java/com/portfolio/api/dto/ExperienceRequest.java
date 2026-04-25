package com.portfolio.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ExperienceRequest(
        @NotBlank @Size(max = 80) String period,
        @NotBlank @Size(max = 160) String title,
        @NotBlank @Size(max = 160) String organization,
        @NotBlank @Size(max = 1200) String description,
        int sortOrder
) {
}

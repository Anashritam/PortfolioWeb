package com.portfolio.api.dto;

public record AdminExperienceResponse(
        Long id,
        String period,
        String title,
        String organization,
        String description,
        int sortOrder
) {
}

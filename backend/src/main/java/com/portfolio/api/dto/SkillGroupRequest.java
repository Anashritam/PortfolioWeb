package com.portfolio.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import java.util.List;

public record SkillGroupRequest(
        @NotBlank @Size(max = 120) String title,
        @NotEmpty List<@NotBlank @Size(max = 80) String> skills,
        int sortOrder
) {
}

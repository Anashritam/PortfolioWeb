package com.portfolio.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

import java.util.List;

public record ProfileRequest(
        @NotBlank @Size(max = 120) String name,
        @NotBlank @Size(max = 160) String role,
        @NotBlank @Size(max = 120) String location,
        @NotBlank @Size(max = 1200) String summary,
        @NotEmpty List<@NotBlank @Size(max = 180) String> highlights,
        @NotEmpty List<@NotBlank @Size(max = 180) String> socialLinks,
        @Size(max = 500) String resumeUrl
) {
}

package com.portfolio.api.dto;

import java.util.List;

public record AdminSkillGroupResponse(
        Long id,
        String title,
        List<String> skills,
        int sortOrder
) {
}
